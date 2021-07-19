import Tweet from "components/Tweet";
import { dbService, storageService } from "fBase";
import React, { useEffect, useState } from "react";
import {v4 as uuidv4} from "uuid";


const Home = ({userObj}) => {
    const [tweet,setTweet]=useState("");
    const [tweets,setTweets]= useState([]);
    const [attachment,setAttachment] = useState("");
    
    useEffect(()=>{
        // 💡 orderBy를 해야지 시간 순으로 뜬다!
        dbService.collection("tweets").orderBy("createdAt","desc").onSnapshot(snapshot => {
            const tweetArray = snapshot.docs.map( doc => ({
                id: doc.id,
                ...doc.data(),
            }));
           setTweets(tweetArray);
        })
    }, []);
    const onFileChange = (event) =>{
        const {target : {files}}=event;
        const theFile=files[0];
        const reader =  new FileReader();
        reader.onloadend= (finishedEvent) => {
            const { currentTarget : { result }} = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
    }
    const onClearAttachmentClick = () => {
        setAttachment(null);
        document.getElementById("imgSrc").value="";
    }

    const onSubmit = async (event)=>{
        event.preventDefault();
        let attachmentUrl = "";
        if(attachment !== ""){
            // 1. 파일에 대한 레퍼런스를 만든다.
            const attachmentRef=storageService.ref().child(`${userObj.uid}/${uuidv4()}`);

            // 2. 파일 데이터를 레퍼런스로 보낸다.
            const response= await attachmentRef.putString(attachment, "data_url");

            // 3. 다운로드 url
            attachmentUrl= await response.ref.getDownloadURL();
        }
        
        const tweetObj = {
            // 💡 tweet는 document key!
            text:tweet,
            createdAt: Date.now(),
            createrId:userObj.uid,
            attachmentUrl
        }
        await dbService.collection("tweets").add(tweetObj);
        setTweet("");
        setAttachment("");
        document.getElementById("imgSrc").value="";
    };
    const onChange =(event)=>{
        const {target:{value}}=event;
        setTweet(value);
    };

    return (
        <div>
        <form onSubmit={onSubmit}>
            <input type="text" value={tweet} onChange={onChange} placeholder="What's on your mind?" maxLength={120}/>
            <input type="file" accept="image/*" id="imgSrc" onChange = {onFileChange}/>
            <input type="submit" value ="tweet"/>
            {attachment && (
                <div>
                    <img src={attachment} width="50px" height="50px"/>
                    <button onClick={onClearAttachmentClick} >Clear</button>
                </div>
            )}
        </form>
        <div >
            {tweets.map(tweet => 
                <Tweet key= {tweet.id} tweetObj={tweet} isOwner={tweet.createrId===userObj.uid}/>
            )}
        </div>
    </div>
    );
   
}
export default Home;
import TweetDetail from "routes/TweetDetail";
import { dbService, storageService } from "fBase";
import React, { useDebugValue, useEffect, useState } from "react";
import {v4 as uuidv4} from "uuid";
import "./TweetFactoryStyle.scss";
import {VscTools} from 'react-icons/vsc';

const TweetFactory = ({ userObj }) =>{
    const [tweet,setTweet]=useState("");
    const [attachment,setAttachment] = useState("");
    const [password,setPassword] =  useState("");

    const onFileChange = (event) =>{
        const {target : {files}}=event;
        const theFile=files[0];
        const reader =  new FileReader();
        reader.onloadend= (finishedEvent) => {
            const { currentTarget : { result }} = finishedEvent;
            setAttachment(result);
            console.log("사진 트윗 : ", attachment);
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
        
        
        const tweetObj = { // tweet obj 생성
            // 💡 tweet는 document key!
            text:tweet,
            createdAt: Date.now(),
            createrId:userObj.uid,
            attachmentUrl,
            password
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
    const onChangePW = (event)=>{
       
        const {target:{value}}=event;
        if(isNaN(value)){
            alert("❗ ONLY NUMBER !");
        }
        setPassword(value);
    }
    return (
        <form onSubmit={onSubmit}>
            <input required type="text" value={tweet} onChange={onChange} placeholder="Required) Room Name" maxLength={20}/>
            <input type="password"  value={password} onChange={onChangePW} placeholder="Option) Password"  minLength={4} maxLength={4}/>
            <input className="addImg" type="file" accept="image/*" id="imgSrc" onChange = {onFileChange} />
            <button type="submit">  
               <span class="icon-right"></span><span class="icon-right after"></span>
                ROOM
            </button>
      
            {attachment && (
                <div className="addPhoto">
                    <img src={attachment} width="150px" height="150px"/>
                    <button className="btnClear"onClick={onClearAttachmentClick} >Clear</button>
                </div>
            )}
        </form>
    );
}
export default TweetFactory;
import Tweet from "components/Tweet";
import { dbService } from "fBase";
import React, { useEffect, useState } from "react";

const Home = ({userObj}) => {
    const [tweet,setTweet]=useState("");
    const [tweets,setTweets]= useState([]);

    
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
    
    const onSubmit = async (event)=>{
        event.preventDefault();
        await dbService.collection("tweets").add({
            // 💡 tweet는 document key!
            text:tweet,
            createdAt: Date.now(),
            createrId:userObj.uid,
        });
        setTweet("");
    };
    const onChange =(event)=>{
        const {target:{value}}=event;
        setTweet(value);
    };

    return (
        <div>
        <form onSubmit={onSubmit}>
            <input type="text" value={tweet} onChange={onChange} placeholder="What's on your mind?" maxLength={120}/>
            <input type="submit" value ="tweet"/>
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
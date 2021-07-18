import { dbService } from "fBase";
import React, { useEffect, useState } from "react";

const Home = () => {
    const [tweet,setTweet]=useState("");
    const [tweets,setTweets]= useState([]);

    const getTweets= async() => {
        const dbTweets = await dbService.collection("tweets").get();
        dbTweets.forEach((document) => {
            const tweetObject = {
                ...document.data(), // 💡 데이터를 가져와서 풀어냄
                id: document.id,
            }
            // 💡 가장 최근 document + 이전 documents ...
            setTweets(prev => [tweetObject, ...prev]);
        });
    }
    useEffect(()=>{
        // 💡 getTweets 함수는 async 이기때문에 따로 빼서 쓴다
        getTweets();
    }, []);
    
    const onSubmit = async (event)=>{
        event.preventDefault();
        await dbService.collection("tweets").add({
            // 💡 tweet는 document key!
            tweet,
            createdAt: Date.now()
        });
        setTweet("");
    };
    const onChange =(event)=>{
        const {target:{value}}=event;
        setTweet(value);
    };
    console.log(tweets);
    return (
        <div>
        <form onSubmit={onSubmit}>
            <input type="text" value={tweet} onChange={onChange} placeholder="What's on your mind?" maxLength={120}/>
            <input type="submit" value ="tweet"/>
        </form>
        <div key={tweet.id}>
            {tweets.map(tweet => 
            <div>
                <h4>{tweet.tweet}</h4>
            </div>)}
        </div>
    </div>
    );
   
}
export default Home;
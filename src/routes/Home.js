import Tweet from "components/Tweet";
import TweetFactory from "components/TweetFactory";
import { dbService, storageService } from "fBase";
import React, { useEffect, useState } from "react";



const Home = ({userObj}) => {

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
    
        
        
    return (
        <div>
        <TweetFactory userObj={userObj} />
        <div >
            {tweets.map(tweet => 
                <Tweet key= {tweet.id} tweetObj={tweet} isOwner={tweet.createrId===userObj.uid}/>
            )}
        </div>
    </div>
    );
   
}
export default Home;
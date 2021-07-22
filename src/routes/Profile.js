import { authService, dbService } from "fBase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default ({ refreshUser, userObj }) => {
    const history=useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    
    const onLogOutClick =() => {
        authService.signOut(); 
        history.push("/");
    };
    const getMyTweets = async() =>{
        // 💡 filtering
        // 💡 쿼리 작성을 하려면 파이어베이스에 가서 색인생성을 해줘야함..
        const tweets = await dbService
        .collection("tweets")
        .where("createrId", "==", userObj.uid)
        .orderBy("createdAt")
        .get();
       
    }
    useEffect(()=>{
        getMyTweets();
    },[]);

    const onSubmit = async (event) => {
        event.preventDefault();
        if(userObj.displayName !== newDisplayName){
            await userObj.updateProfile({
                displayName: newDisplayName
            });
        }else{
            alert("이미 있는 이름입니다.")
        }
       
    }
    const onChange = (event) => {
        const { target : {value} } = event;
        setNewDisplayName(value);
    }
    return (
        <>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} type="text" placeholder={newDisplayName} />
                <input type="submit" value="Update Profile" />
            </form>
            <button onClick={onLogOutClick}> Log Out </button>
        </>
    );
};
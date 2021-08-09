import React, { useEffect, useState } from "react";
import { dbService, storageService } from "fBase";
import './TweetDetailStyle.scss';
import {MdContentCopy} from 'react-icons/md';
const TweetDetail =(props) =>{

    const [roomId, setRoomId]= useState(props.location.state.tweetId);
    const [roomName, setRoomName] =useState(props.location.state.tweetText);
    const [roomImg, setRoomImg] = useState(props.location.state.tweetAttachment);
    const [userId,setUserId] = useState(props.location.state.userId)
    const [userName,setUserName] = useState(props.location.state.userName);
    const [photoURL, setPhotoURL] = useState(props.location.state.photoURL);

    const [comment,setComment]= useState("");
    const [comments,setComments]= useState([]);

    console.log(props.location.state);
    useEffect(()=>{
        // 💡 orderBy를 해야지 시간 순으로 뜬다!
        dbService.collection("comments")
        .orderBy("createdAt")
        .where("roomId","==",roomId)
        .onSnapshot(snapshot => {
            const commentArr = snapshot.docs.map( doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setComments(commentArr);
        })
    }, []);

    const onSubmit = async (event) =>{
        event.preventDefault();
        const commentObj = {
            roomId:roomId,
            text : comment,
            createdAt: Date.now(),
            userName: userName,
            photoURL: photoURL
        }
        await dbService.collection("comments").add(commentObj);
        document.getElementById("comment").value="";
        setComment("");
    }
    const onChange = (event) =>{
        const {target: {value}}= event;
        setComment(value);
    }
    return (
        <div className="roomDetail">
            <div className="roomInfo">
                <div className="roomName">{roomName}</div>
                <div className="roomCode"><MdContentCopy/> {roomId} </div>
            </div>
           
            {roomImg &&  <img src={roomImg} width="200px" height="200px" />}
            <div>
                {comments.map( comment => 
                <div className="history">
                     <img src ={comment.photoURL} width ="30px" height="30px" />
                     <span>{comment.userName}</span>
                     <span className="comments">
                    {comment.text}</span>
                 
                </div>
                    )}
            </div>
            <form onSubmit={ onSubmit }>
               <div className="comment">
                    <div> <img src ={photoURL} width ="50px" height="50px" /></div>
                   <div className="username"> <span></span><span>{userName}</span></div>
                   <div><input onChange={ onChange }placeholder="comment..." type="text" id="comment"/></div>
               </div>
                <button>enter</button>
            </form>
        </div>
    );
}
export default TweetDetail;
import React, { useEffect, useState } from "react";
import { dbService, storageService } from "fBase";

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
        <div>
            <h1>{roomName}</h1>
            <h5>방 코드 {roomId} </h5>
            {roomImg &&  <img src={roomImg} width="100px" height="100px" />}
            <div>
                {comments.map( comment => 
                <div>
                     <img src ={comment.photoURL} width ="30px" height="30px" />
                    <span>{comment.userName}</span>
                    {comment.text}
                </div>
                    )}
            </div>
            <form onSubmit={ onSubmit }>
                <img src ={photoURL} width ="30px" height="30px" /><span>{userName}</span>
                <input onChange={ onChange }placeholder="comment..." type="text" id="comment"/>
                <button>enter</button>
            </form>
        </div>
    );
}
export default TweetDetail;
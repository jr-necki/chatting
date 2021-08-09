import { authService, dbService, storageService } from "fBase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {v4 as uuidv4} from "uuid";
import './ProfileStyle.scss';

export default ({ refreshUser, userObj }) => {
    const history=useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const [userPhotoURL, serUserPhotoURL] =useState(userObj.user);
    const [newPhotoURL, setNewPhotoURL] = useState("");


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
            refreshUser();
            alert("🎉 success !");
        }else if(userObj.displayName==''){
            alert("❗ write your name !")
        }else{
            alert("❗ same name !")
        }

    }

    const onSubmitURL = async (event) => {
        event.preventDefault();
        let attachmentUrl = "";
        if(userPhotoURL !== ""){
            // 1. 파일에 대한 레퍼런스를 만든다.
            const attachmentRef=storageService.ref().child(`${userObj.uid}/${uuidv4()}`);

            // 2. 파일 데이터를 레퍼런스로 보낸다.
            const response= await attachmentRef.putString(userPhotoURL, "data_url");

            // 3. 다운로드 url
            attachmentUrl= await response.ref.getDownloadURL();

            userObj.updateProfile({
                photoURL: attachmentUrl
              }).then(() => {
                console.log("새 유저 프로필 "+userObj.photoURL);
                alert("🎉 success !");
              }).catch((error) => {
                console.log("새 url "+attachmentUrl);
              });  

        }
    }
    const onChange = (event) => {
        const { target : {value} } = event;
        setNewDisplayName(value);
    }
    const onFileChange = (event) =>{
        const {target : {files}}=event;
        const theFile=files[0];
        const reader =  new FileReader();
        reader.onloadend= (finishedEvent) => {
            const { currentTarget : { result }} = finishedEvent;
            serUserPhotoURL(result);
            console.log("바뀐 파일: ", userPhotoURL);
        };
        reader.readAsDataURL(theFile);
    }
    const onClearAttachmentClick = () => {
        serUserPhotoURL(null);
        document.getElementById("imgSrc").value="";
    }
    return (
        <>
        <div className="profileEdit">

            <form onSubmit={onSubmit} className="profile">
                <div>
                <input type="file" accept="image/*" id="imgSrc" onChange = {onFileChange}/>
                
                {userPhotoURL && (
                    <div className="photoInfo">
                        <div><img src = {userPhotoURL} width = "100px" height ="100px" /></div>
                        <div><button className="photoBtn" onClick={onClearAttachmentClick} >Clear</button></div>
                    </div>
                )}
                 <button  onClick ={ onSubmitURL }>OK</button>
                </div>
                <div>
                    <input onChange={onChange} type="text" placeholder={newDisplayName} />
                    <button type="submit">Update Profile</button>
                </div>
               
            </form>
                 <button onClick={onLogOutClick} className="login">
                    Log out
                </button>
             
        </div>
        </>
    );
};
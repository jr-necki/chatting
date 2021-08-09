import { dbService, storageService } from "fBase";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {AiOutlineDelete, AiOutlineEdit} from "react-icons/ai"
import {GiEntryDoor} from "react-icons/gi"
import './tweetStyle.scss';

const Tweet =({tweetObj,isOwner,userObj}) => {
    const [editing,setEditing]=useState(false);
    const [newTweet,setNewTweet]= useState(tweetObj.text);

    const onDeleteClick =async() =>{
        const ok = window.confirm("are you sure you want to delete this tweet?");
        if(ok){
           await dbService.doc(`tweets/${tweetObj.id}`).delete();
           if(tweetObj.attachmentUrl !== "" ){
            await storageService.refFromURL(tweetObj.attachmentUrl).delete();
            }
        }
    };
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async (event) =>{
        event.preventDefault();

        await dbService.doc(`tweets/${tweetObj.id}`).update({
            text:newTweet
        });
        setEditing(false);
    }
    const onChange = (event) => {
        const {target:{value}}=event;
        setNewTweet(value);
    }
    return (
        <div className="editSection">
          {editing ? (
            <>
              <form className="editForm" onSubmit={onSubmit}>
                <input 
                  type="text"
                  placeholder="Edit your tweet"
                  value={newTweet}
                  required
                  onChange={onChange}
                  maxLength={20}
                />
                <div >
                  <button className="btn" width="30px" heigh="10px" type="submit" value="Update">Update</button>
                  <button className="btn" width="30px" heigh="10px" onClick={toggleEditing}>Cancel</button>
                </div>
               
              </form>
            
            </>
          ) : (
            <>
            <div className="tweet">

           
              <div className="contents">
                <div>
                {tweetObj.attachmentUrl && <img src={tweetObj.attachmentUrl} width="150px" height="150px" />}
                </div>
                <div>{tweetObj.text}</div>
              </div>
              <Link to={
                {
                  pathname: `tweet/${tweetObj.id}`,
                  state:{
                    tweetId: tweetObj.id,
                    tweetAttachment: tweetObj.attachmentUrl,
                    tweetText: tweetObj.text,
                    userId:userObj.uid,
                    userName:userObj.displayName,
                    isOwner,
                    photoURL: userObj.photoURL
                  }
                }
              }>
              <GiEntryDoor size="80"/>
              </Link>
             
              {isOwner && (
                <>
                  <button onClick={onDeleteClick}><AiOutlineDelete/></button>
                  <button onClick={toggleEditing}><AiOutlineEdit/></button>
                </>
              )}
              
            </div>
            </>
          )}
        </div>
        
      );
};

export default Tweet;
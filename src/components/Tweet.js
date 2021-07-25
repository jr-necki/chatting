import { dbService, storageService } from "fBase";
import React, { useState } from "react";
import { Link } from "react-router-dom";

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
        <div>
          {editing ? (
            <>
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  placeholder="Edit your tweet"
                  value={newTweet}
                  required
                  onChange={onChange}
                />
                <input type="submit" value="Update Tweet" />
              </form>
              <button onClick={toggleEditing}>Cancel</button>
            </>
          ) : (
            <>
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
                <h4>{tweetObj.text}</h4>
              </Link>
              
              {tweetObj.attachmentUrl && <img src={tweetObj.attachmentUrl} width="50px" height="50px" />}
              {isOwner && (
                <>
                  <button onClick={onDeleteClick}>Delete Tweet</button>
                  <button onClick={toggleEditing}>Edit Tweet</button>
                </>
              )}
            </>
          )}
        </div>
      );
};

export default Tweet;
import { authService, firebaseInstance } from "fBase";
import React, { useState } from "react";
import  "./AuthStyle.scss";

import {AiFillGithub,AiFillGoogleCircle} from 'react-icons/ai';

// 💡 이렇게 써야 외부에서 사용할 때 자동으로 임포트 됨.
const Auth = () => {

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [newAccount,setNewAccount]=useState(true);
    const [error,setError]=useState("");

    const onChange=(event)=>{
        // 💡 target 안에는 name과 value가 들어있다.
        const {target: {name,value}}=event;
        if(name==="email"){
            setEmail(value);
        }else{
            setPassword(value);
        }
    };
    const onSubmit= async (event)=>{
        // 💡 새로고침 방지.
        event.preventDefault();

        try{
            let data;
            if(newAccount){
                data= await authService.createUserWithEmailAndPassword(email,password);
            }else{
                data= await authService.signInWithEmailAndPassword(email,password);
            }
            console.log(data);
        }catch(e){
            console.log(e);
            setError(e.message);
        }
    }
    
    const onSocialClick= async (event)=>{
        const {target:{name},
        }=event;

        let provider;
        if(name=== "google"){
            provider=new firebaseInstance.auth.GoogleAuthProvider();
        }else if(name === "github"){
            provider=new firebaseInstance.auth.GithubAuthProvider();
        }
        const data= await authService.signInWithPopup(provider);
        
        console.log(data);
    }

    const toggleAccount =()=> setNewAccount(prev=> !prev);
    return (
    <div  className="auth_body">
      <div className="form_body">
          <h1>             
            Hello Universe
          </h1>
        <form className="login_form"onSubmit={onSubmit}>
            <div className="form_input"> 
                <div>
                <input className="input" type="email" placeholder="Email" name="email" 
                required value={email} onChange={onChange} />
                </div>
                <div>
                <input className="input" type="password" placeholder="Password" name="password"
                required value={password} onChange={onChange} />
                </div>
            </div>
            <div className="form_button">
            <button className="login">
                {newAccount? "Create Account": "Sign In"}
           </button>
                
            </div>
            {error}
        </form>
        <span onClick={toggleAccount}>{newAccount ? "Sign In" : "Create Account"}</span>
        <div className="icons">
            <button className="iconBtn" onClick={onSocialClick} name="google">
                <span class="icon-right"></span><span class="icon-right after"></span>
                Continue with <AiFillGoogleCircle size="30"/> 
            </button>
            <button className="iconBtn" onClick={onSocialClick} name="github">
                <span class="icon-right"></span><span class="icon-right after"></span>
                Continue with <AiFillGithub size="30" />
            </button>
        </div>
        
     </div>
    </div>
    );
}
export default Auth;
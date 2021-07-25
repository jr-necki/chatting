import { authService, firebaseInstance } from "fBase";
import React, { useState } from "react";
import AuthForm from "components/AuthForm";
// 💡 이렇게 써야 외부에서 사용할 때 자동으로 임포트 됨.
const Auth = () => {
    
    
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
    return (
    <div>
        <AuthForm  />
        <button onClick={onSocialClick} name="google">Continue with Google</button>
        <button onClick={onSocialClick} name="github">Continue with Github</button>
    </div>
    );
}
export default Auth;
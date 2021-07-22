import React, { useState } from "react";
import { authService, firebaseInstance } from "fBase";
const AuthForm = () =>{
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
    const toggleAccount =()=> setNewAccount(prev=> !prev);
    return (
        <>
        <form onSubmit={onSubmit}>
            <input type="email" placeholder="Email" name="email" 
            required value={email} onChange={onChange} />

            <input type="password" placeholder="Password" name="password"
            required value={password} onChange={onChange} />

            <input type="submit" value={newAccount? "Create Account": "Sign In"} />
            {error}
        </form>
        <span onClick={toggleAccount}>{newAccount ? "Sign In" : "Create Account"}</span>
        </>
    )
}

export default AuthForm;
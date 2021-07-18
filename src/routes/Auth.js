import { authService } from "fBase";
import React, { useState } from "react";

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
    const toggleAccount =()=> setNewAccount(prev=> !prev);

    return (
    <div>
        <form onSubmit={onSubmit}>
            <input type="email" placeholder="Email" name="email" 
            required value={email} onChange={onChange} />

            <input type="password" placeholder="Password" name="password"
            required value={password} onChange={onChange} />

            <input type="submit" value={newAccount? "Create Account": "Sign In"} />
            {error}
        </form>
        <span onClick={toggleAccount}>{newAccount ? "Sign In" : "Create Account"}</span>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
    </div>
    );
}
export default Auth;
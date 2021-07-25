import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fBase";

function App() {
  // 로그인 여부를 알 수 있음.
  // 그러나 firebase가 로드하는걸 기다릴 시간 없어서 로그아웃이됨..
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const [init,setInit]=useState(false);
  const [userObj,setUserObj]= useState(null);

   // useEffect로 변화 감지
  useEffect(()=>{
    // 💡 로그인 로그아웃 할 때 발생
    authService.onAuthStateChanged((user)=> {
      if(user){    
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          photoURL: user.photoURL,
          updateProfile: (args) => user.updateProfile(args), // 💡 함수도 넣을수 있었네..
        });
        console.log(user);
        console.log("App :   "+user.displayName);
        console.log("App :   "+user.photoURL);
      }else{
        setUserObj(null);
      }
      setInit(true);
    });
  },[]);
  
  const refreshUser =()=>{
    const user =  authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      photoURL: user.photoURL,
      updateProfile: (args) => user.updateProfile(args), // 💡 함수도 넣을수 있었네..
    });
  }
  return (
    <>
  { init ? <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj} />:"Initializing....."}
 <footer>&copy; {new Date().getFullYear()}Twitter</footer>
  </>
  );
}

export default App;

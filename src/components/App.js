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
        setUserObj(user);
      }else{
        setUserObj(null);
      }
      setInit(true);
    });
  },[]);
    
  return (
    <>
  { init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />:"Initializing....."}
 <footer>&copy; {new Date().getFullYear()}Twitter</footer>
  </>
  );
}

export default App;

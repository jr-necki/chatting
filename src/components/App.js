import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fBase";

function App() {
  // 로그인 여부를 알 수 있음.
  // 그러나 firebase가 로드하는걸 기다릴 시간 없어서 로그아웃이됨..
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const [init,setInit]=useState(false);

   // useEffect로 변화 감지
  useEffect(()=>{
    authService.onAuthStateChanged((user)=> {
      if(user){
        setIsLoggedIn(true);
      }else{
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  },[]);
    
  return (
    <>
  { init ? <AppRouter isLoggedIn={isLoggedIn}/>:"Initializing....."}
 <footer>&copy; {new Date().getFullYear()}Twitter</footer>
  </>
  );
}

export default App;

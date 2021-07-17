import React, { useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fBase";

function App() {
  // 로그인 여부를 알 수 있음.
  const [isLoggedIn,setIsLoggedIn]=useState(authService.currentUser);
  return (
  <>
  <AppRouter isLoggedIn={isLoggedIn}/>
  <footer>&copy; Twitter {new Date().getFullYear()} Twitter</footer>
  </>
  );
  
}

export default App;

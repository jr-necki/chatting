import React from "react";
import { Link } from "react-router-dom";
import './NavigationStyle.scss'
import LogoLogin from './LogoLogin'
import {AiOutlineRocket} from 'react-icons/ai';
import {GiAstronautHelmet} from 'react-icons/gi';

const Navigation = ({ userObj }) => (
  <>
   
    <nav>
      <div className="logo"><LogoLogin/></div>
      <div><Link className="button" to="/">HOME <AiOutlineRocket/></Link></div>
      <div><Link className="button" to="/profile">{userObj.displayName}'s Profile <GiAstronautHelmet/></Link></div>
  </nav>
  </>
);
export default Navigation;
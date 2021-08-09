import React from "react";
import {SiGrav} from "react-icons/si"
import './FooterStyle.scss';

const Footer =()=>{
    return (
        <>
        <div className="footer">
           
        
        <div className="sign">
        <SiGrav size="20"/>Hong
        </div>
        &copy; {new Date().getFullYear()} COSMOS Ver.1
        </div>
        </>
    )
}

export default Footer;
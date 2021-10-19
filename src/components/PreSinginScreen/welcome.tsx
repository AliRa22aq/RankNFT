import React from "react"
import './style.css';
import LOGO from '../assets/NFT_Sniper_logo.png'


const Welcome = () => {
    return(
        <div className="welcome-container">
            <div className = "welcome-LOGO">
                <img src={LOGO} alt="LOGO" height="400" width="400"/>
            </div>
            <div className = "welcome-text">
                Welcome to NFT Sniper, Please sign in
            </div>
        </div>
    )
}

export default Welcome;
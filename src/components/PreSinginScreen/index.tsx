import React from "react"
import './style.css';
import { useSelector } from 'react-redux';
import NotSubscriber from './notNotSubscriber'
import NotWhiteListed from './notWhiteListed'
import Welcome from './welcome'


const PreSignInScreen = () => {

    const {isOwner , isDeveloper, loading, isWaletConnect, isWhiteListed, isSubscriber} = useSelector((state: any) => state);

    
    if(loading) return <div>Loading . . . </div>
    
    return (
    <div className = "container">

        {
            !isWaletConnect ?
                <Welcome /> :
            
            isWaletConnect && (isOwner || isDeveloper) ? null :

            isWaletConnect && !isWhiteListed ?
                <NotWhiteListed /> :

            isWaletConnect && isWhiteListed && !isSubscriber?
                <NotSubscriber /> : 

                null

        }

    </div>
  );
}

export default PreSignInScreen;
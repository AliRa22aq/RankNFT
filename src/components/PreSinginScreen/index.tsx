import React from "react"
import './style.css';
import { useSelector } from 'react-redux';
import NotSubscriber from './notNotSubscriber'
import NotWhiteListed from './notWhiteListed'
import Welcome from './welcome'
// import { setLoading, setActiveUser, userWalletconnected, isWhiteListed, isSubscriber } from '../store';



const PreSignInScreen = () => {

    // const dispatch = useDispatch()
    const {userAddress, owner,  isWaletConnect, isWhiteListed, isSubscriber} = useSelector((state: any) => state);

    if(userAddress == owner) return <div></div>;

    return (
    <div className = "container">

        {
            !isWaletConnect ?
                <Welcome /> :
            
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
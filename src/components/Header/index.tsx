import React from "react"
import Web3 from "web3";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setLogout, setSignedIn, clearState, setActiveUser, userWalletconnected, setWhiteListed, setSubscriber, setOwner } from '../store';
import InfoModal from './InfoModel'


const Header = () => {

  const dispatch = useDispatch()
  const {isWaletConnect, ContractData, isSubscriber} = useSelector((state: any) => state);

  
  window.ethereum.on('accountsChanged', function (accounts: string[]) {
    dispatch(setActiveUser(accounts[0]))
    dispatch(clearState())
    
  })

  const signIn = async () => {

    dispatch(setLoading(true))
    
    let userCurrentAddress; 

    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      dispatch(userWalletconnected(true))
      console.log(window.web3.currentProvider.isMetaMask)
      
      // Get current logged in user address
      const accounts = await window.web3.eth.getAccounts()
      userCurrentAddress = accounts[0];
      dispatch(setActiveUser(accounts[0]))

    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      dispatch(userWalletconnected(true))
      const accounts = await window.web3.eth.getAccounts()
      dispatch(setActiveUser(accounts[0]))
      userCurrentAddress = accounts[0];

    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
    
    const whitelistStatus = await ContractData.methods.is_whitelisted(userCurrentAddress).call();

    const owner = await ContractData.methods.owner().call();
    dispatch(setOwner(owner));



    if (whitelistStatus){ 

        dispatch(setWhiteListed(true));
        const subscriptionStatus = await ContractData.methods.is_subscriber(userCurrentAddress).call();
        console.log(subscriptionStatus)

        if(subscriptionStatus){
          dispatch(setSubscriber(true));
          dispatch(setSignedIn(true));         
          dispatch(setLoading(false))
          
        } else{
          dispatch(setSubscriber(false));
          dispatch(setSignedIn(false));   
          dispatch(setLoading(false))

        }
    } else {
      dispatch(setWhiteListed(false));
      dispatch(setSubscriber(false));
      dispatch(setSignedIn(false));     
      dispatch(setLoading(false))

    }

    dispatch(setLoading(false))

  }


  const logOut = async () => {
    dispatch(setLogout())
  }


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              NFT Sniper
          </Typography>

          {
            !isWaletConnect ?
              <Button onClick={signIn} color="inherit">
                <Typography component="div" sx={{ flexGrow: 1 }}>
                    Sign In
                </Typography>
              </Button>
               :
               null
          }

          {
            isSubscriber && ( <InfoModal /> )
          }

          {
            isSubscriber && (
              <Button onClick= {logOut} color="inherit"> 
                <Typography component="div" sx={{ flexGrow: 1 }}>
                    Logout
                </Typography>
              </Button>
              )
          }

        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;

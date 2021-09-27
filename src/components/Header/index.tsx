import React from "react"
import Web3 from "web3";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveUser, userWalletconnected, isWhiteListed, isSubscriber, setOwner } from '../store';

// import { RankNFT as RankNFTType } from '../../../types/web3-v1-contracts/RankNFT';
// const RankNFTABI = require("../../abis/RankNFT.json");



const Header = () => {

  const dispatch = useDispatch()
  const {isWaletConnect, ContractData} = useSelector((state: any) => state);


  window.ethereum.on('accountsChanged', function (accounts: string[]) {
    dispatch(setActiveUser(accounts[0]))
  })

  const signIn = async () => {

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

        dispatch(isWhiteListed(true));
        const subscriptionStatus = await ContractData.methods.is_subscriber(userCurrentAddress).call();
        console.log(subscriptionStatus)

        if(subscriptionStatus){
          dispatch(isSubscriber(true));
        } else{
          dispatch(isSubscriber(false));
        }
    } else {
      dispatch(isWhiteListed(false));
      dispatch(isSubscriber(false));
    }

  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            RankNFTs
          </Typography>

          {
            !isWaletConnect ?
              <Button onClick={signIn} color="inherit"> Sign In </Button>
               :
               null
              }

        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;





// <Button onClick={connectWallet} color="inherit">
// <img
//   src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/2048px-MetaMask_Fox.svg.png"
//   alt="metamask"
//   width="50"
//   height="50"
//   // style={{marginLeft: "10px"}}
// />
// </Button>
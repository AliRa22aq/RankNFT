import React, { useEffect, useState } from "react"
import Web3 from "web3";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Header = () => {
  const [data, setData] = useState({
    userAddress: "",
    // ERCToken: null,
    // DEXContract: null,
    // loading: false,
    // DEXAddress: null,
    // approvedTokens: 0,
    // userBalance: { ethers: 0, tokens: 0 },
    // dexBalance: { ethers: 0, tokens: 0 },
    // updateBalance: false
  });

  const connectWallet = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      console.log(window.web3.currentProvider.isMetaMask)

      // Get current logged in user address
      const accounts = await window.web3.eth.getAccounts()
      setData(pre => { return { ...pre, userAddress: accounts[0] } })
      console.log(accounts[0])

    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
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
            data.userAddress ?
            <div>
              Your address: {data.userAddress}
            </div>  
               :
            <div onClick={connectWallet}>
              {/* <Button onClick={onSignin} color="inherit">Login</Button> */}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/2048px-MetaMask_Fox.svg.png"
                alt="metamask"
                width="50"
                height="50"
                // style={{marginLeft: "10px"}}
              />
              {/* https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/2048px-MetaMask_Fox.svg.png */}
            </div>
          }

        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
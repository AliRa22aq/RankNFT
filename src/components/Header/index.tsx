import React from "react";
import Web3 from "web3";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  setDeveloper,
  setLoading,
  setLogout,
  setSignedIn,
  setActiveUser,
  userWalletconnected,
  setWhiteListed,
  setSubscriber,
  setOwner,
  clearState,
  reSetSnipping
} from "../store";
import InfoModal from "./InfoModel";
import LOGO from '../assets/NFT_Sniper_logo.png'


const Header = () => {
  const dispatch = useDispatch();
  const { isOwner, isDeveloper, isWaletConnect, ContractData, isSubscriber } = useSelector(
    (state: any) => state
  );

  window.ethereum.on("accountsChanged", function (accounts: string[]) {
    dispatch(setActiveUser(accounts[0]));
    dispatch(setLogout());
  });

  window.ethereum.on("disconnect", () => {
    dispatch(setLogout());
  });

  const signIn = async () => {

    // dispatch(clearState());
    dispatch(setLoading(true));

    let userCurrentAddress;

    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      dispatch(userWalletconnected(true));
      // console.log(window.web3.currentProvider.isMetaMask);

      // Get current logged in user address
      const accounts = await window.web3.eth.getAccounts();
      userCurrentAddress = accounts[0];
      dispatch(setActiveUser(accounts[0]));
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      dispatch(userWalletconnected(true));
      const accounts = await window.web3.eth.getAccounts();
      dispatch(setActiveUser(accounts[0]));
      userCurrentAddress = accounts[0];
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }

    const owner = await ContractData.methods.owner().call();
    if (owner === userCurrentAddress) {
      dispatch(setOwner(true));
      dispatch(setLoading(false));
    }

    const developer = await ContractData.methods.developer_address().call();
    if (developer === userCurrentAddress) {
      dispatch(setDeveloper(developer === userCurrentAddress));
      dispatch(setLoading(false));
    }

    const whitelistStatus = await ContractData.methods
      .is_whitelisted(userCurrentAddress)
      .call();

    if (whitelistStatus) {
      dispatch(setWhiteListed(true));
      const subscriptionStatus = await ContractData.methods
        .is_subscriber(userCurrentAddress)
        .call();
      // console.log(subscriptionStatus);

      if (subscriptionStatus) {
        dispatch(setSubscriber(true));
        dispatch(setSignedIn(true));
        dispatch(setLoading(false));
      } else {
        dispatch(setSubscriber(false));
        dispatch(setSignedIn(false));
        dispatch(setLoading(false));
      }
    } else {
      dispatch(setWhiteListed(false));
      dispatch(setSubscriber(false));
      dispatch(setSignedIn(false));
      dispatch(setLoading(false));
    }

    dispatch(setLoading(false));
  };

  const logOut = async () => {
    dispatch(setLogout());
    dispatch(reSetSnipping())
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ backgroundColor: "white", maxHeight: 80 }}> 
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginTop: 3 }}>
            {/* NFT Sniper */}
            <img src={LOGO} alt="LOGO" width="100" height="100" />
          </Typography>

          {!isWaletConnect ? (
            <Button onClick={signIn} >
              <Typography component="div" sx={{ flexGrow: 1 }}>
                Sign In
              </Typography>
            </Button>
          ) : null}

          {(isDeveloper || isOwner || isSubscriber) && <InfoModal />}

          {(isDeveloper || isOwner || isSubscriber) && (
            <Button onClick={logOut} >
              <Typography component="div" sx={{ flexGrow: 1 }}>
                Logout
              </Typography>
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;

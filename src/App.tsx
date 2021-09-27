import React, {useEffect} from 'react';
import Web3 from "web3";
import { useDispatch, useSelector} from 'react-redux';
import { setContractData } from './components/store';

import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import PreSignInScreen from './components/PreSinginScreen';
import PostSignInScreen from './components/PostSinginScreen';

import { RankNFT as RankNFTType } from '../types/web3-v1-contracts/RankNFT'
const RankNFTABI = require("./abis/RankNFT.json");



const App = () => {
  const dispatch = useDispatch()
  const { owner, isWaletConnect, isWhiteListed, isSubscriber, ContractData} = useSelector((state: any) => state);
  const contractAddress = "0x02b857D07F0405F5724652702807314054f17F49";


  useEffect(()=> {
    const web3 = new Web3(window.ethereum);  
    const ContractData = (new web3.eth.Contract(RankNFTABI.abi, contractAddress) as any) as RankNFTType;
    dispatch(setContractData(ContractData));
  }, [])

  return (
    <div>
      <Header />

      <PreSignInScreen />
      
      {
        isWaletConnect && isWhiteListed && isSubscriber && ( <PostSignInScreen /> )
      }


      <Footer />
    </div>

  );
}

export default App;

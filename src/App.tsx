import React, {useEffect} from 'react';
import './App.css';
import Web3 from "web3";
import { useDispatch, useSelector} from 'react-redux';
import { setContractData, setContractAddress } from './components/store';
import Header from './components/Header';
import Footer from './components/Footer';
import PreSignInScreen from './components/PreSinginScreen';
import PostSignInScreen from './components/PostSinginScreen';
import { RankNFT as RankNFTType } from '../types/web3-v1-contracts/RankNFT'
const RankNFTABI = require("./abis/RankNFT.json");

const App = () => {

  const dispatch = useDispatch()
  
  const { isDeveloper, isOwner, isWaletConnect, isWhiteListed, isSubscriber} = useSelector((state: any) => state);
  
  const contractAddress = "0xcC28dfE0cfe54C86AE725C8a8ae5598aE44e970C";

  dispatch(setContractAddress(contractAddress));

  const loadContract = async () => {
    const web3 = new Web3(window.ethereum);  
    const ContractData = await (new web3.eth.Contract(RankNFTABI.abi, contractAddress) as any) as RankNFTType;
    dispatch(setContractData(ContractData));
  }

  useEffect(()=> {
    loadContract()
  }, [])

  return (
    <div>
      <Header />
        <PreSignInScreen />
        
      {
         isDeveloper || isOwner || (isWaletConnect && isWhiteListed && isSubscriber) ?
          <PostSignInScreen /> : null
      }

      <Footer />
    </div>

  );
}

export default App;

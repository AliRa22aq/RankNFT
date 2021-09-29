import React, {useEffect, useState} from "react";
import "./style.css";
// import { intervalToDuration, formatDistanceToNow } from 'date-fns'
import { useSelector } from 'react-redux';
// import { setSubscriptionPeriod, setWhitelistPeriod } from '../store';
// import Grid from "@mui/material/Grid";
// import { Form, Formik, Field } from "formik";
// import { TextField} from 'formik-material-ui';
// import TextField from "@mui/material/TextField";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import App from '../nftCardModel'
const Web3 = require("web3");


// import { OpenSeaPort, Network  } from 'opensea-js'

interface Data {
  totalSupply: string, 
  name: string,
  baseTokenURI: string,
  // attributes: any
}

const NFTCards = () => {
  
  const { uploadedContractAddress } = useSelector((state: any) => state);
  const [data, setData] = useState<Data | null>();
  
  // const seaport = new OpenSeaPort(provider, { networkName: Network.Main });

  useEffect(() => {

    const fetchData = async () => {
      
      var web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/92a3eada72834b629e28ff80ba4af4d0'))
      // const contractAdrs = "0x02aa731631c6d7f8241d74f906f5b51724ab98f8";
      const contractAdrs = uploadedContractAddress;
      

      const uri = `https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAdrs}&apikey=WKEB4C6A8MPPIYF5699I3A1ZEII57MXG2A`
      const abii = await fetch(uri)
      const abi = await abii.json()   
      
      var MyContract = new web3.eth.Contract(JSON.parse(abi.result), contractAdrs)
      console.log("asset ", MyContract)

      const name = await MyContract.methods.name().call();
      const totalSupply = await MyContract.methods.totalSupply().call();
      const tokenURI = await MyContract.methods.tokenURI(1).call();
      const baseTokenURI = tokenURI.substring(0, tokenURI.lastIndexOf('/'))

      // const tokenuri = tokenURI.replace("https", "http");
      // const asset = await fetch(tokenuri)
      // const data = await asset.json()

      console.log("asset ", tokenURI.replace("https", "http"))

      setData(pre => {return {...pre, totalSupply, name, baseTokenURI}})

      // attributes: data.attributes
      // const asset = await seaport.api.getAsset({
      //   tokenAddress: "0x02aa731631c6d7f8241d74f906f5b51724ab98f8",
      //   tokenId: 1
      // })

    }
    fetchData()
  }, [uploadedContractAddress])

  return (
    <div className="cards-container">
      <div className="cards-header"> NFTs </div>

       
      

        <div> Name : {data?.name} </div>
        <div> TotalSupply : {data?.totalSupply} </div>
        <div> BaseTokenURI : {data?.baseTokenURI} </div>
        {/* <div> Attributes : {JSON.stringify(data?.attributes.trait_type)} </div> */}

        

        


    </div>

  );
};

export default NFTCards;

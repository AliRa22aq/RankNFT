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
import { useNft } from "use-nft"


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

  // const reTrying = () => {

  // }


  // useEffect(() => {

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
      console.log("asset ", name)
      console.log("asset ", totalSupply)


      try{
        console.log("asset ", "trying 1")

        const tokenURI1 = await MyContract.methods.tokenURI(1).call();
        let baseTokenURI1 = tokenURI1.substring(0, tokenURI1.lastIndexOf('/'))
        baseTokenURI1 = baseTokenURI1?.replace("https", "http")
        console.log("asset ", baseTokenURI1)
        setData(pre => {return {...pre, totalSupply, name, baseTokenURI: baseTokenURI1}}) 
        
      } catch(error) {
        console.log("asset Error fetching URI from ABI. Now trying from useNFT hook")
        
        try{
          console.log("asset ", "trying 2")
          
          const {nft } = useNft(
            contractAdrs,
            "2"
            )
            console.log("asset ", nft)
            
            const tokenURI2 = nft?.metadataUrl
            console.log("asset ", tokenURI2)

            if(tokenURI2){
              console.log("asset ", tokenURI2)
              let baseTokenURI2 = tokenURI2.substring(0, tokenURI2.lastIndexOf('/'))
              baseTokenURI2 = baseTokenURI2?.replace("https", "http")
              setData(pre => {return {...pre, totalSupply, name, baseTokenURI: baseTokenURI2}})
              console.log("asset ", baseTokenURI2)
              
            }
            
          } catch(error){    
            console.log("asset ", "Error fetching URI from useNFT hook too")
            alert("Please provide NFT URI")
            
          }
          
        }


          // console.log("asset ", "trying 2")
                
          // const {nft } = await useNft(
          //   uploadedContractAddress,
          //   "2"
          //   )
          //   console.log("asset ", nft)
            
          //   const tokenURI2 = nft?.metadataUrl
          //   console.log("asset", tokenURI2)
    

      // const tokenuri = tokenURI.replace("https", "http");
      // const asset = await fetch(tokenuri)
      // const data = await asset.json()


      // attributes: data.attributes
      // const asset = await seaport.api.getAsset({
      //   tokenAddress: "0x02aa731631c6d7f8241d74f906f5b51724ab98f8",
      //   tokenId: 1
      // })

    }
    // fetchData()
  // }, [uploadedContractAddress])

  return (
    <div className="cards-container">
      <div className="cards-header"> NFTs </div>

       
      

        {/* <div> Name : {data?.name} </div>
        <div> TotalSupply : {data?.totalSupply} </div>
        <div> BaseTokenURI : {data?.baseTokenURI} </div> */}
        {/* <div> Attributes : {JSON.stringify(data?.attributes.trait_type)} </div> */}

        <br />
        <div> Crypto Kitties: 0x06012c8cf97bead5deae237070f9587f8e7a266d </div>
        <div> Crypto Punks: 0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb </div>
        <div> BearsOnTheBlock: 0x02aa731631c6d7f8241d74f906f5b51724ab98f8 </div>
        <div> Testing: 0x2cfcbf304415d87611E89fd284Ed362Cf6bA5141 </div>
        <div> Testing: 0xA66CC78067fd1E6Aa3eEC4CcdFF88D81527F92c1 </div>


    </div>


  );
};

export default NFTCards;

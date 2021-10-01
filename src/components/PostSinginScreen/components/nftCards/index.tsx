import React, {useEffect, useState} from "react";
import "./style.css";
// import { intervalToDuration, formatDistanceToNow } from 'date-fns'
import { useSelector } from 'react-redux';
import { Attribute } from '../../../store';
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
  
  const { NFTattributes } = useSelector((state: any) => state);



  return (
    <div className="cards-container">
      <div className="cards-header"> NFTs </div>
  

        
        {
          NFTattributes ?
          <>
                  <div> Attributes : </div> 
          {
              NFTattributes.map((attribute: Attribute, key: number) => {
                return (
                  <span> {`${key+1}) ${attribute.trait_type}      `} </span>
              )
          })}
          
          </> : null
        }
        <br />
        <br />
        <br />
        <br />
        <div> Crypto Kitties: 0x06012c8cf97bead5deae237070f9587f8e7a266d </div>
        <div> Crypto Punks: 0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb </div>
        <div> BearsOnTheBlock: 0x02aa731631c6d7f8241d74f906f5b51724ab98f8 </div>
        <div> Testing: 0x2cfcbf304415d87611E89fd284Ed362Cf6bA5141 </div>
        <div> Testing: 0xA66CC78067fd1E6Aa3eEC4CcdFF88D81527F92c1 </div>
        <div> WannabeMusicClub: 0x402491a577373995fF3382e6da3c282cb0564902 </div>
        <div> WannabeMusicClub: 0xc1a1e381389cb927f1d57511e144b644ef0c6385 </div>

        

        


    </div>


  );
};

export default NFTCards;

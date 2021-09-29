import React from "react";
import "./style.css";
// import { intervalToDuration, formatDistanceToNow } from 'date-fns'
// import { useDispatch, useSelector } from 'react-redux';
// import { setSubscriptionPeriod, setWhitelistPeriod } from '../store';
// import Grid from "@mui/material/Grid";
// import { Form, Formik, Field } from "formik";
// import { TextField} from 'formik-material-ui';
// import TextField from "@mui/material/TextField";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import App from '../nftCardModel'


import { useNft } from "use-nft"


const NFTCards = () => {

  const something = [1,2,3,4,5,6,7,8,9,10]

  const data = something.map(one => {
    const nftData = useNft( 
      "0x06012c8cf97bead5deae237070f9587f8e7a266d",
      String(one)   
     )
    return nftData;
  })

  return (
    <>
      <div className="cards-header"> NFTs </div>

      {
        data.map(nft => {
          if(nft?.loading) return <div>Loading . . . . </div>
          if(nft?.error) return <div>{nft?.error.message}</div>
          return ( 
            <section>
            <h1>{nft?.nft?.name}</h1>
            <img src={nft?.nft?.image} alt="" height="200" width="200"/>
            <p>{nft?.nft?.description}</p>
            <p>Owner: {nft?.nft?.owner}</p>
            <p>Metadata URL: {nft?.nft?.metadataUrl}</p>
            </section>
          )
        })
      }

    </>

  );
};

export default NFTCards;

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

  const something = [1]

  const data = something.map(one => {
    const nftData = useNft( 
      "0xd07dc4262bcdbf85190c01c996b4c06a461d2430",
      "90473"   
     )
    return nftData;
  })

  // // nft.loading is true during load.
  // if (loading) return <>Loading…</>

  // // nft.error is an Error instance in case of error.
  // if (error || !nft) return <>Error.</>

  // You can now display the NFT metadata.
  return (
    <>
      <div className="cards-header"> NFTs </div>
      {/* <App /> */}

      {
        data.map(nft => {
          if(nft?.loading) return <div>Loading . . . . </div>
          if(nft?.error) return <div>{nft?.error.message}</div>
          return ( 
            <section>
            <h1>{nft?.nft?.name}</h1>
            <h1>{nft?.status}</h1>
            {/* <h1>{nft?.reload()}</h1> */}
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

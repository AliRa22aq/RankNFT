import React, {useEffect,useState, FC} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import './styles.css'
import {  Attribute, AttributesOfEachToekn } from '../../../store';
import Web3 from "web3";
import ether from '../../../assets/eth.svg'
import OpenSea from '../../../assets/OpenSea.svg'
// @ts-ignore
import CornerRibbon from "react-corner-ribbon";
import undefined from '../../../assets/undefined.png'
import NFTtable from './NFTtable';
// import { SSL_OP_PKCS1_CHECK_2 } from 'constants';



interface Props {
  token : AttributesOfEachToekn,
  normalization: boolean,
}

const NFTCard: FC<Props> = ({token, normalization}) => {

  const web3 = new Web3(window.ethereum);  
  const [isVideo, setIsVideo] = useState(false);
  const {projectInfo, onlyOnSale} = useSelector((state: any) => state);

  const {attributes} = token


  let imageOfNFT = token.image;

  if(token.image.includes("ipfs://")){
    imageOfNFT = token.image.replace("ipfs://", "https://ipfs.io/ipfs/")
  }
  else if(token.image.includes("https://gateway.pinata.cloud/ipfs/")){
    imageOfNFT = token.image.replace("https://gateway.pinata.cloud/ipfs/", "https://ipfs.io/ipfs/")
  }


  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true)
  };
  const handleClose = () => setOpen(false);
  const onSale = token.opensea.saleType === "onSale" ? true:false; 


  // export interface Attribute {
  //   [trait_type :string] : {
  //     [trait_value: string] : {
  //         trait_type :string, 
  //         value: string,
  //         value_rarity_score: number,
  //         value_normalized_rarity_score: number
  //     }
  //   }
  // }

  // let attributes2 = [...Object.values(attributes)] 
  // console.log("attributes2", attributes2)
  // // console.log("attributes2", attributes2[attributes2.trait_value])

  // // let attributes3 = [...Object.values(attributes2)] 
  
  // let sortedAttributes = attributes2.sort((a:any, b:any) => {return b[b.trait_value].value_rarity_score - a[a.trait_value].value_rarity_score })
  // console.log("sortedAttributes", sortedAttributes)
  
  return (
    <div>
    <Card sx={{ height: 335, width: 210 }} >
      
        <div>Rank #  {normalization ? token.normalized_rank : token.rank}</div>
      
      <CardActionArea>
        {
          token.opensea.saleType === "onSale" ?
            <CornerRibbon 
                backgroundColor="#2c7" 
                fontColor="#f0f0f0" 
                style={{zIndex:1}} 
                > 
                  on sale
            </CornerRibbon> :

          token.opensea.saleType === "onAuction" ?
            <CornerRibbon 
                backgroundColor="#4287f5" 
                fontColor="#f0f0f0" 
                style={{zIndex:1}} 
                > 
                  on Auction
            </CornerRibbon> :
            
            null
        }

        {
          // isVideo ?

          // <video id="video" >
          //       <source src={imageOfNFT} />
          // </video> 

          // :

          <CardMedia
            component="img"
            height="200"
            image={imageOfNFT}
            alt={undefined}
            onClick={handleOpen}
          />
        }
      </CardActionArea>

        <CardContent>
          <Typography gutterBottom variant="caption" component="div">
            {token.name? token.name.slice(0,25): "Name unavailable"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Rarity Score: { normalization ? token.normalized_rarity_score.toFixed(2) : token.rarity_score.toFixed(2)}
          </Typography>          
          
            {
              onSale? 
              <div className="price-container"> 
                Price: 
                <span className="price">
                <img className="price" src={ether} alt="ether" width="10px" height="10px" />
                </span>
                {token.opensea.price} 

                </div>: 
                <div> Price: - </div>  
            }
            {
              token.opensea.permalink?
                <a href={token.opensea.permalink}  target="_blank" > 
                     <img className="openseaSVG" src={OpenSea}  alt="opensea"  width="100px" height="20px" /> 
                </a> :
              null
            }
            
        </CardContent>
    </Card>

    

    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 1000,
            height: 500,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
      }}>

        <div className="NFT-container"> 

        <div className="NFT-image"> 
            <div>

              <img src={imageOfNFT} alt={token.name} height="400" width="400" /> 
            </div>
            <div className="NFT-Opensea-Container">
            <div> {onSale ? "Open to sale": "Not open to sale"} </div>
            {
              onSale? 
              <div className="price-container"> 
                Price: 
                <span className="price">
                <img src={ether} alt="ether" width="13px" height="13px" />
                </span>
                {token.opensea.price} 
                </div>:
              null 
            }
            {
              token.opensea.permalink?
              <a href={token.opensea.permalink}  target="_blank" > 
                <img className="openseaSVG2" src={OpenSea}  alt="opensea"  width="150px" height="30px" /> 
              </a>:
              null
            }
            </div>

        </div>
        
        <div className="NFT-rarity-detail">

          <div className="NFT-rarity-details-header"> Rank # {token.rank} </div>

          <div className="NFT-rarity-details-main"> 
          {/* <div> Token ID: {token.tokenID} </div> */}
          <div> Name: {token.name ? token.name : null} </div>
          <div> Rarity Score: { 
                normalization ? token.normalized_rarity_score.toFixed(2) : 
                                token.rarity_score.toFixed(2) } 
          </div>
          </div>
          
          <div className="NFT-rarity-details-attributes-heading"> Attributes and Scores</div>
          <div className="NFT-rarity-details-attributes"> 
            <NFTtable attributes={[...Object.values(attributes)]} normalization={normalization}/>
          </div>

          <div className="NFT-rarity-details" > {token.description ? token.description : null} </div>
        </div>

        </div>
      </Box>
    </Modal>


    </div>
  );
}

export default NFTCard;


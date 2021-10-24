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
import { SSL_OP_PKCS1_CHECK_2 } from 'constants';



interface Props {
  token : AttributesOfEachToekn,
  normalization: boolean,
}

const NFTCard: FC<Props> = ({token, normalization}) => {

  const web3 = new Web3(window.ethereum);  
  const {projectInfo} = useSelector((state: any) => state);

  // console.log("image", token.image)

  const check = token.image.includes("ipfs://");
  let imageOfNFT = check ? 
                     token.image?.replace("ipfs://", "https://ipfs.io/ipfs/") :
                     token.image

  const check2 = token.image.includes("https://gateway.pinata.cloud/ipfs/");
  imageOfNFT = check2 ? 
              token.image?.replace("https://gateway.pinata.cloud/ipfs/", "https://ipfs.io/ipfs/") :
              token.image


  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true)
  };
  const handleClose = () => setOpen(false);

  // const onSale = token?.opensea_data?.sell_orders && token?.opensea_data?.sell_orders[0]? true:false; 
  // const onSale = token.opensea.price && Number(token.opensea.price) > 0 ? true:false; 
  const onSale = token.opensea.saleType === "onSale" ? true:false; 
  // console.log("===> price in card " , token.opensea.price)

  // const saleType = token.opensea.saleType === "onsale" ? "onsale" : "on"

  let sortedAttributes = [...token.attributes]
  sortedAttributes = sortedAttributes.sort((a:any, b:any) => {return b.value_rarity_score - a.value_rarity_score})

  return (
    <div>
    <Card sx={{ height: 335, width: 200 }} >
      
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

          <CardMedia
            component="img"
            height="200"
            image={imageOfNFT}
            alt={undefined}
            onClick={handleOpen}
          />
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
                {/* {web3.utils.fromWei((token.opensea.price).toString(), "ether") }  */}
                {token.opensea.price} 

                </div>:
                <div> Price: - </div>  
            }
            {
              token.opensea.permalink?
              //  <div className="openseaSVG-container">
                <a href={token.opensea.permalink}  target="_blank" > 
                     <img className="openseaSVG" src={OpenSea}  alt="opensea"  width="100px" height="20px" /> 
                </a> :
              //  </div>:
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
                {/* {web3.utils.fromWei((token.opensea.price).toString(), "ether") }  */}
                {token.opensea.price} 
                </div>:
              null 
            }
            {
              token.opensea.permalink?
              <a href={token.opensea.permalink}  target="_blank" > 
                <img className="openseaSVG2" src={OpenSea}  alt="opensea"  width="150px" height="30px" /> 
              </a>:
              //  <div><a href={token.opensea.permalink}  target="_blank" > see on Opensea </a> </div>:
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
            <NFTtable attributes={sortedAttributes} normalization={normalization}/>
            {/* {
               sortedAttributes?.map((attribute: Attribute, key:number) => {
                return(
                  <div key={key}> 
                   { `${attribute.trait_type} : ${attribute.value}` }
                   { normalization ? 
                    ` (${Math.round(attribute.value_normalized_rarity_score) * 100 / projectInfo.totalSupply } %)` : 
                    ` (${Math.round(attribute.value_rarity_score) * 100 / projectInfo.totalSupply } %)`
                   }
                  </div>
                )
              })
            } */}
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


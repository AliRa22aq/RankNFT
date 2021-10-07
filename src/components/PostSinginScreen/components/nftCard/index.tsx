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
import ether from '../../../assets/etherSymbol.png'
// @ts-ignore
import CornerRibbon from "react-corner-ribbon";



interface Props {
  token : AttributesOfEachToekn,
  normalization: boolean
}

const NFTCard: FC<Props> = ({token, normalization}) => {
  
  const web3 = new Web3(window.ethereum);  

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true)
  };
  const handleClose = () => setOpen(false);

  const onSale = token?.opensea_data?.sell_orders && token?.opensea_data?.sell_orders[0]? true:false; 

  return (
    <div>
    <Card sx={{ height: 300, width: 200 }} onClick={handleOpen}>
      <CardActionArea>
        {
          onSale ?
          // <div className="ribbon">
            <CornerRibbon 
                backgroundColor="#2c7" 
                fontColor="#f0f0f0" 
                style={{zIndex:1}} 
                > 
                  on sale
                </CornerRibbon> :
          null
        }
          <CardMedia
            component="img"
            height="200"
            image={token.image}
            alt={token.name? token.name: "nothing"}
          />
        <CardContent>
          <Typography gutterBottom variant="body1" component="div">
            {token.name? token.name: "No name avaiable"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Token ID: {token.tokenID}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Rarity Score: { normalization ? Math.round(token.normalized_rarity_score) : Math.round(token.rarity_score)}
          </Typography>          
        </CardContent>
      </CardActionArea>
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
            width: 650,
            height: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
      }}>

        <div className="NFT-container"> 

        <div className="NFT-image"> 
            <div>

              <img src={token.image} alt={token.name} height="300" width="300" /> 
            </div>
            <div className="NFT-Opensea-Container">
              <div> {token.opensea_data?.sell_orders ? "Open to sale": "Not open to sale"} </div>
            {
              onSale? 
              <div className="price-container"> 
                Price: 
                <span className="price">
                <img src={ether} alt="ether" width="12px" height="15px" />
                </span>
                {web3.utils.fromWei(Math.round(token.opensea_data?.sell_orders[0]?.current_price).toString(), "ether") } 
                </div>:
              null
            }
            {
              token.opensea_data?.permalink ?
               <div><a href={token.opensea_data?.permalink}  target="_blank" > see on Opensea </a> </div>:
              null
            }
            </div>

        </div>
        
        <div className="NFT-rarity-detail">

          <div className="NFT-rarity-details-header"> Details </div>

          <div className="NFT-rarity-details-main"> 
          <div> Token ID: {token.tokenID} </div>
          <div> Name: {token.name ? token.name : null} </div>
          <div> Rarity Score: { normalization ? Math.round(token.normalized_rarity_score) : Math.round(token.rarity_score)} </div>
          </div>
          
          <div className="NFT-rarity-details-attributes-heading"> Attributes and Scores</div>
          <div className="NFT-rarity-details-attributes"> 
            {
              token.attributes && token.attributes?.map((attribute: Attribute) => {
                return(
                  <div>
                   {` ${attribute.trait_type} : ${attribute.value} (${normalization ? 
                    Math.round(attribute.value_normalized_rarity_score) : Math.round(attribute.value_rarity_score)})`}
                  </div>
                )
              })
            
            } 
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

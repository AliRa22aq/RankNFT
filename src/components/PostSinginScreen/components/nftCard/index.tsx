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
import {  Attribute, AttributesOfEachToekn, CountOfEachAttribute } from '../../../store';


interface Props {
  token : AttributesOfEachToekn,
  normalization: boolean
}

const NFTCard: FC<Props> = ({token, normalization}) => {
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <div>
    <Card sx={{ height: 300, width: 200 }} onClick={handleOpen}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={token.image}
          alt={token.name? token.name: "nothing"}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
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
            width: 600,
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
              <div> Price: 5 Eth </div>
              <div> On sale </div>
            </div>

        </div>
        
        <div className="NFT-rarity-details">
          <div> Details </div>
          <div> TokenID: {token.tokenID} </div>
          <div> Name: {token.name ? token.name : null} </div>
          <div> Rarity Score: { normalization ? Math.round(token.normalized_rarity_score) : Math.round(token.rarity_score)} </div>

          
          <div> 
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

          <div> {token.description ? token.description : null} </div>
        </div>

        </div>
      </Box>
    </Modal>


    </div>
  );
}

export default NFTCard;

// interface AttributesOfEachToekn {
//   tokenID: string
//   attributes: Attribute[],
//   rarity_score: number, 
//   normalized_rarity_score: number, 
//   image: string,
//   title?: string
//   description?: string,
//   name?: string,
// }
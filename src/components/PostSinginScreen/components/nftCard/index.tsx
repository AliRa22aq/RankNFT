import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

interface Props{
    image:string,
    name?: string,
    tokenID: string,
    rarity_score: number
}

const NFTCard: React.FC<Props> = ({image, name, tokenID, rarity_score }) => {
  return (
    <Card sx={{ height: 300, width: 200 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt={name? name: "nothing"}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name? name: "No name avaiable"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Token ID: {tokenID}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Rarity Score: { Math.round(rarity_score)}
          </Typography>

          
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default NFTCard;
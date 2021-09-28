import React, {FC} from "react"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface Data {
  id: number,
  days: string,
  price: string,
  day: string,
}

interface Props {
  subscriptionData : Data,
  buySubscription: (id: number)=> void
}

const SubscriptionCard: FC<Props> = ({subscriptionData, buySubscription}) => {

console.log(subscriptionData)


  return (
    <Box sx={{ minWidth: 275 }}>

      <Card variant="outlined">
      <React.Fragment>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Plan {subscriptionData.id}
          </Typography>
          <Typography variant="h6" component="div">
            {subscriptionData.days} Subscription
          </Typography>
          <Typography variant="body2">
            {subscriptionData.price} Ethers for {subscriptionData.day}
          </Typography>
        </CardContent>

        <CardActions style={{alignContent: "center", justifyContent: "center"}}>
          <Button 
            disabled = {subscriptionData.id === 1 || subscriptionData.id === 3 ? false:true}
            onClick={() => buySubscription(subscriptionData.id)} 
            variant="contained">
              {
                subscriptionData.id === 1 || subscriptionData.id === 3 ?
                "Buy" :
                "Comming Soon"

              }
            
            </Button>
        </CardActions>
      </React.Fragment>

      </Card>
    </Box>
  );
}


export default SubscriptionCard;




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
  price : string,
  index: number,
  buySubscription: (id: number)=> void
}


let subscriptionData: Data[] = [
  {
    id: 1,
    days: "One Day",
    price: "0.03",
    day: "1 day",
  },
  {
    id: 2,
    days: "Seven Days",
    price: "0.06",
    day: "7 days",
  },
  {
    id: 3,
    days: "One Month",
    price: "0.15",
    day: "30 days",
  },
  {
    id: 4,
    days: "Six Months",
    price: "0.7",
    day: "180 days",
  },
];

const SubscriptionCard: FC<Props> = ({price, index,  buySubscription}) => {

console.log(subscriptionData)


  return (
    <Box sx={{ minWidth: 275 }}>

      <Card variant="outlined">
      <React.Fragment>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Plan {subscriptionData[index].id}
          </Typography>
          <Typography variant="h6" component="div">
            {subscriptionData[index].days} Subscription
          </Typography>
          <Typography variant="body2">
            {price} Ethers for {subscriptionData[index].day}
          </Typography>
        </CardContent>

        <CardActions style={{alignContent: "center", justifyContent: "center"}}>
          <Button 
            disabled = {subscriptionData[index].id === 1 || subscriptionData[index].id === 3 ? false:true}
            onClick={() => buySubscription(subscriptionData[index].id)} 
            variant="contained">
              {
                subscriptionData[index].id === 1 || subscriptionData[index].id === 3 ?
                "Buy" :
                "Coming Soon"
              }
            
            </Button>
        </CardActions>
      </React.Fragment>

      </Card>
    </Box>
  );
}


export default SubscriptionCard;




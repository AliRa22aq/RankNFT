import React, {useEffect, useState, FC} from "react"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import {setLoading, setActiveUser, userWalletconnected, isWhiteListed, isSubscriber } from '../../store';
// import { useSelector, useDispatch } from 'react-redux';
// import web3 from "web3"
// import {BN} from 'bn.js';


// subscriptionData= {subscriptionData} buySubscription
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

// const priceInString = String(subscriptionData.price);

  return (
    <Box sx={{ minWidth: 250 }}>

      <Card variant="outlined">
      <React.Fragment>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Plan {subscriptionData.id}
          </Typography>
          <Typography variant="subtitle1" component="div">
            {subscriptionData.days} Subscription
          </Typography>
          <Typography variant="body2">
            {subscriptionData.price} Ethers for {subscriptionData.day}
          </Typography>
        </CardContent>

        <CardActions style={{alignContent: "center", justifyContent: "center"}}>
          <Button onClick={() => buySubscription(subscriptionData.id)} variant="outlined">Buy</Button>
        </CardActions>
      </React.Fragment>

      </Card>
    </Box>
  );
}


export default SubscriptionCard;




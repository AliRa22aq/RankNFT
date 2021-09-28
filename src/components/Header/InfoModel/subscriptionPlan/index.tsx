import React, {useEffect, useState} from "react"
import './style.css';
// import { setLoading, setActiveUser, userWalletconnected, setWhiteListed, setSubscriber } from '../store';
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import SubscriptionCard from './card';
import web3 from "web3"


const SubscriptionCards = () => {

    const {ContractData, userAddress} = useSelector((state: any) => state);
    const [prices, setPrices] = useState<string[]>(["0.03", "0.06", "0.15", "0.7"])

    const SubscriptionData = [
        {
          id: 1,
          days: "One Day",
          price: prices[0],
          day: "1 day",
        },
        {
          id: 2,
          days: "Seven Days",
          price: prices[1],
          day: "7 days",
        },
        {
          id: 3,
          days: "One Month",
          price: prices[2],
          day: "30 days",
        },
        {
          id: 4,
          days: "Six Months",
          price: prices[3],
          day: "180 days",
        },
      
      ]

const getSubscriptionData = async () => {
    
    const days: number[] = [1,7,30,180];
    setPrices([])
    
    days.map(async (day: number) => {
        let cost = await ContractData.methods.get_cost_of_subscription(day).call();
        cost = web3.utils.fromWei(cost, "ether")
        setPrices(pre => {return [...pre, cost]})
    })
    }
  
      
useEffect(()=> {
    getSubscriptionData();
}, [])
        
const buySubscription = async (id: number) => {
    console.log("buySubscription called")

    if(id === 1){
        await ContractData.methods.get_single_day_subscription().send({from: userAddress, value: web3.utils.toWei(prices[0], "ether")});
    }
    if(id === 2){
        await ContractData.methods.get_seven_days_subscription().send({from: userAddress, value: web3.utils.toWei(prices[1], "ether")});
    }
    if(id === 3){
        await ContractData.methods.get_seven_days_subscription().send({from: userAddress, value: web3.utils.toWei(prices[2], "ether")});
    }
    if(id === 4){
        await ContractData.methods.get_six_month_subscription().send({from: userAddress, value: web3.utils.toWei(prices[3], "ether")});        
    }
}


    return(

        <div>

            <Grid container className="model-card-container">

                <Grid item xs={12} className="card">
                <Typography variant="h6" component="h2">
                    Update your plan
                </Typography>
                </Grid>
            

                <Grid container >

                {
                    SubscriptionData.map((subscriptionData) => {
                        return ( 
                            <Grid item xs={3} className="card">
                                <SubscriptionCard subscriptionData= {subscriptionData} buySubscription={buySubscription}/>
                            </Grid >
                        )
                    })
                }

                </Grid>

            
            </Grid>
            
        </div>

    )
}

export default SubscriptionCards;
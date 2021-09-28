import React, { useEffect, useState } from "react"
import './style.css';
import { intervalToDuration, formatDistanceToNow } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux';
import { setSubscriptionPeriod, setWhitelistPeriod } from '../../../store';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


const Periods = () => {

  const [whitelistTime, setWhitelistTimeTime] = useState<string>("")
  const [subscriptionTime, seSubscriptionTimeTime] = useState<string>("")
  const [time, setTime] = useState<any>({whitelistTimeDistance: 0, subscriptionTimeDistance: 0});
  const dispatch = useDispatch()

  const { userAddress, whitelistPeriod, subscriptionPeriod, ContractData} = useSelector((state: any) => state);
  

  const checkUserInfo = async () => {
    const whitelistingPeriod = await ContractData.methods.whitelisting_period(userAddress).call();
    dispatch(setWhitelistPeriod(whitelistingPeriod));
    
    const SubscriptionPeriod = await ContractData.methods.subscription_period(userAddress).call();
    dispatch(setSubscriptionPeriod(SubscriptionPeriod));
    

    const whitelistTimeDistance = formatDistanceToNow(new Date(Number(whitelistingPeriod) * 1000))   
    const subscriptionTimeDistance = formatDistanceToNow(new Date(Number(SubscriptionPeriod) * 1000))
    setTime({whitelistTimeDistance, subscriptionTimeDistance})

    const whitelistTime = intervalToDuration({
      start: new Date(Date.now()),
      end: new Date(Number(whitelistingPeriod) * 1000),
    })
        
    const subscriptionTime = intervalToDuration({
      start: new Date(Date.now()),
      end: new Date(Number(SubscriptionPeriod) * 1000),
    })
    
    setWhitelistTimeTime(`Days: ${whitelistTime.days}, Hours: ${whitelistTime.hours}, Minutes: ${whitelistTime.minutes}`)
    seSubscriptionTimeTime(`Days: ${subscriptionTime.days}, Hours: ${subscriptionTime.hours}, Minutes: ${subscriptionTime.minutes}`)

  }

    setInterval(()=> {
    const whitelistTimeDistance = formatDistanceToNow(new Date(Number(whitelistPeriod) * 1000))   
    const subscriptionTimeDistance = formatDistanceToNow(new Date(Number(subscriptionPeriod) * 1000))
    
    setTime({whitelistTimeDistance, subscriptionTimeDistance})
    
    const whitelistTime = intervalToDuration({
      start: new Date(Date.now()),
      end: new Date(Number(whitelistPeriod) * 1000),
    })
    
    const subscriptionTime = intervalToDuration({
      start: new Date(Date.now()),
      end: new Date(Number(subscriptionPeriod) * 1000),
    })
    
    setWhitelistTimeTime(`Days: ${whitelistTime.days}, Hours: ${whitelistTime.hours}, Minutes: ${whitelistTime.minutes}`)
    seSubscriptionTimeTime(`Days: ${subscriptionTime.days}, Hours: ${subscriptionTime.hours}, Minutes: ${subscriptionTime.minutes}`)
    
  }, 1000*60)


  useEffect(()=> {
    checkUserInfo()
  }, [])
  
  return (
    <div className = "period-container">

              <Grid container>

                <Grid item xs={12}>
                  <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                      Your Subscription
                  </Typography>
                </Grid>

                <Grid container>
                  {
                    time && (
                      <Grid container style={{width: '80%', justifyContent: "center", alignItems: "center", margin: "10px" }} >
                      <Grid item xs={6}>
                        Remaining whiteListing period : {time.whitelistTimeDistance} <br />
                      {whitelistTime}
                      </Grid>

                      <br />
                      <br />

                      <Grid item xs={6}>
                        Remaining subscription period: {time.subscriptionTimeDistance} <br />
                      {subscriptionTime}
                      </Grid>
                      </Grid>
                    )
                  }

                </Grid>
                
              </Grid>

    </div>
  );
}

export default Periods;
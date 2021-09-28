import React, { useEffect, useState } from "react"
import './style.css';
import { intervalToDuration, formatDistanceToNow } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux';
import { setSubscriptionPeriod, setWhitelistPeriod } from '../../../store';


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
    <div className = "container">

              <div>

                {
                  time && (
                    <>
                    Remaining whiteListing period : {time.whitelistTimeDistance} <br />
                    {whitelistTime}
                    <br />
                    <br />
                    Remaining subscription period: {time.subscriptionTimeDistance} <br />
                    {subscriptionTime}

                    </>
                  )
                }

              </div>

    </div>
  );
}

export default Periods;
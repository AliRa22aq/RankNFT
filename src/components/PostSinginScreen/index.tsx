import React from "react"
import './style.css';
// import { intervalToDuration, formatDistanceToNow } from 'date-fns'
// import { useDispatch, useSelector } from 'react-redux';
// import { setSubscriptionPeriod, setWhitelistPeriod } from '../store';
import Grid from "@mui/material/Grid";
import NFTForm from './components/form';
import NFTCards from './components/nftCards';


const PostSignInScreen = () => {


  // const { userAddress, whitelistPeriod, subscriptionPeriod, ContractData} = useSelector((state: any) => state);
  
  
  return (
    <div className = "postsignin-container">

              <Grid container>

                <Grid item xs={3}>

                  <NFTForm />

                </Grid>

                {/* <Grid item xs={1}>

                <Divider orientation="vertical" flexItem />

                </Grid> */}

                <Grid item xs={9}>
                  <NFTCards />
                </Grid>


              </Grid>

    </div>
  );
}

export default PostSignInScreen;
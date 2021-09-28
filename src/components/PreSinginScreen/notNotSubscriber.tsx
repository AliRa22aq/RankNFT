import React from "react"
import './style.css';
// import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
// import web3 from "web3"
import SubscriptionCards from './components/SubscriptionCards'

const NotSubscriber = () => {

    return(

        <div className="container">
            <Grid container>
            <Grid item xs={12} className = "notNotSubscriber-text">
                Sorry, You are not a subscriber. Please Buy one of the following subscription plan
            </Grid>

            <SubscriptionCards />
            
            </Grid>
        </div>

    )
}

export default NotSubscriber;
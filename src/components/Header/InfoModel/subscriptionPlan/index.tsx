import React, { useEffect, useState } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import SubscriptionCard from "../../../PreSinginScreen/components/card";
import web3 from "web3";
import { setSubscriber } from "../../../store";


interface Prices {
  one : string,
  seven : string,
  thrity : string,
  oneEighty : string
}

const SubscriptionCards = () => {
  const dispatch = useDispatch();

  const initialPrices: Prices = {
    one : "1",
    seven : "1",
    thrity : "1",
    oneEighty : "1"
  }

  const { ContractData, userAddress } = useSelector((state: any) => state);
  const [prices, setPrices] = useState<Prices> (initialPrices)

  useEffect(() => {
    getSubscriptionData();
  }, []);

  const getSubscriptionData = async () => {

    Object.keys(initialPrices).map( async (key, index) => {
      if(key === "one"){
        let cost = await ContractData.methods.get_cost_of_subscription(1).call();
        cost = web3.utils.fromWei(cost, "ether");
        setPrices(pre => {return {...pre , one: cost}})
      }
      if(key === "seven"){
        let cost = await ContractData.methods.get_cost_of_subscription(7).call();
        cost = web3.utils.fromWei(cost, "ether");
        setPrices(pre => {return {...pre , seven: cost}})
      }
      if(key === "thrity"){
        let cost = await ContractData.methods.get_cost_of_subscription(30).call();
        cost = web3.utils.fromWei(cost, "ether");
        setPrices(pre => {return {...pre , thrity: cost}})
      }
      if(key === "oneEighty"){
        let cost = await ContractData.methods.get_cost_of_subscription(180).call();
        cost = web3.utils.fromWei(cost, "ether");
        setPrices(pre => {return {...pre , oneEighty: cost}})
      }

    });


  };


  const buySubscription = async (id: number) => {
    
    if (id === 1 ) {
      const subscription = await ContractData.methods
        .get_single_day_subscription()
        .send({
          from: userAddress,
          value: web3.utils.toWei(prices.one, "ether"),
        })
        .on("confirmation", (confirmationNumber: any, receipt: any) => {
          dispatch(setSubscriber(true));
        })
        .on("error", (error: any) => {
          alert(error.message);
        });
    }
    if (id === 2 ) {
      await ContractData.methods
        .get_seven_days_subscription()
        .send({
          from: userAddress,
          value: web3.utils.toWei(prices.seven, "ether"),
        })
        .on("confirmation", (confirmationNumber: any, receipt: any) => {
          dispatch(setSubscriber(true));
        })
        .on("error", (error: any) => {
          alert(error.message);
        });
    }
    if (id === 3 ) {
      await ContractData.methods
        .get_seven_days_subscription()
        .send({
          from: userAddress,
          value: web3.utils.toWei(prices.thrity, "ether"),
        })
        .on("confirmation", (confirmationNumber: any, receipt: any) => {
          dispatch(setSubscriber(true));
        })
        .on("error", (error: any) => {
          alert(error.message);
        });
    }
    if (id === 4 ) {
      await ContractData.methods
        .get_six_month_subscription()
        .send({
          from: userAddress,
          value: web3.utils.toWei(prices.oneEighty, "ether"),
        })
        .on("confirmation", (confirmationNumber: any, receipt: any) => {
          dispatch(setSubscriber(true));
        })
        .on("error", (error: any) => {
          alert(error.message);
        });
    }
  };

  return (
    <div>
      <Grid container className="model-card-container">
        <Grid item xs={12} className="card">
          <Typography variant="h6" component="h2">
            Update your plan
          </Typography>
        </Grid>

        <Grid container>
          {
            Object.values(prices).map((price: string, key: number) => {
            return (
              <Grid item xs={3} className="card" key={key}>
                <SubscriptionCard
                  price={price}
                  index = {key}
                  buySubscription={buySubscription}
                />
              </Grid>
            );
          })
        }
        </Grid>
      </Grid>
    </div>
  );
};

export default SubscriptionCards;

import React, { useEffect } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import SubscriptionCard from "../../../PreSinginScreen/components/card";
import web3 from "web3";
import { setSubscriber } from "../../../store";

interface Data {
  id: number;
  days: string;
  price: string;
  day: string;
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

const SubscriptionCards = () => {
  const dispatch = useDispatch();
  const { ContractData, userAddress } = useSelector((state: any) => state);

  const getSubscriptionData = async () => {
    const days: number[] = [1, 7, 30, 180];
    days.map(async (day: number, key: number) => {
      let cost = await ContractData.methods
        .get_cost_of_subscription(day)
        .call();
      cost = web3.utils.fromWei(cost, "ether");
      subscriptionData[key].price = cost;
    });
  };

  useEffect(() => {
    getSubscriptionData();
  }, []);

  const buySubscription = async (id: number) => {
    if (id === 1) {
      const subscription = await ContractData.methods
        .get_single_day_subscription()
        .send({
          from: userAddress,
          value: web3.utils.toWei(subscriptionData[0].price, "ether"),
        })
        .on("confirmation", (confirmationNumber: any, receipt: any) => {
          dispatch(setSubscriber(true));
        })
        .on("error", (error: any) => {
          alert(error.message);
        });
    }
    if (id === 2) {
      await ContractData.methods
        .get_seven_days_subscription()
        .send({
          from: userAddress,
          value: web3.utils.toWei(subscriptionData[1].price, "ether"),
        })
        .on("confirmation", (confirmationNumber: any, receipt: any) => {
          dispatch(setSubscriber(true));
        })
        .on("error", (error: any) => {
          alert(error.message);
        });
    }
    if (id === 3) {
      await ContractData.methods
        .get_seven_days_subscription()
        .send({
          from: userAddress,
          value: web3.utils.toWei(subscriptionData[2].price, "ether"),
        })
        .on("confirmation", (confirmationNumber: any, receipt: any) => {
          dispatch(setSubscriber(true));
        })
        .on("error", (error: any) => {
          alert(error.message);
        });
    }
    if (id === 4) {
      await ContractData.methods
        .get_six_month_subscription()
        .send({
          from: userAddress,
          value: web3.utils.toWei(subscriptionData[3].price, "ether"),
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
          {subscriptionData.map((data: Data) => {
            return (
              <Grid item xs={3} className="card">
                <SubscriptionCard
                  subscriptionData={data}
                  buySubscription={buySubscription}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
};

export default SubscriptionCards;

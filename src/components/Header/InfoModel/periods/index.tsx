import React, { useEffect, useState } from "react";
import "./style.css";
import { intervalToDuration, formatDistanceToNow } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { setSubscriptionPeriod, setWhitelistPeriod } from "../../../store";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

interface Time {
  whitelistTimeDistance: string;
  subscriptionTimeDistance: string;
}

const Periods: React.FC<{open: boolean}> = ({open}) => {
  const [whitelistTime, setWhitelistTimeTime] = useState<string>(
    "Days: 0, Hours: 0, Minutes: 0"
  );
  const [subscriptionTime, seSubscriptionTimeTime] = useState<string>(
    "Days: 0, Hours: 0, Minutes: 0"
  );
  const [time, setTime] = useState<Time>({
    whitelistTimeDistance: "0",
    subscriptionTimeDistance: "0",
  });
  const dispatch = useDispatch();

  const { userAddress, whitelistPeriod, subscriptionPeriod, ContractData } =
    useSelector((state: any) => state);

  const checkUserInfo = async () => {
    const whitelistingPeriod = await ContractData.methods
      .whitelisting_period(userAddress)
      .call();
    dispatch(setWhitelistPeriod(whitelistingPeriod));

    const SubscriptionPeriod = await ContractData.methods
      .subscription_period(userAddress)
      .call();
    dispatch(setSubscriptionPeriod(SubscriptionPeriod));

    if (whitelistingPeriod * 1000 > Date.now()) {
      const whitelistTimeDistance = formatDistanceToNow(
        new Date(Number(whitelistingPeriod) * 1000)
      );
      setTime((pre) => {
        return { ...pre, whitelistTimeDistance: whitelistTimeDistance };
      });
      const whitelistTime = intervalToDuration({
        start: new Date(Date.now()),
        end: new Date(Number(whitelistingPeriod) * 1000),
      });

      console.log("whitelistTime", whitelistTime)

      setWhitelistTimeTime(
        whitelistTime.months?
        `Months: ${whitelistTime.months}, Days: ${whitelistTime.days}, Hours: ${whitelistTime.hours}, Minutes: ${whitelistTime.minutes}`:
        whitelistTime.days?
        `Days: ${whitelistTime.days}, Hours: ${whitelistTime.hours}, Minutes: ${whitelistTime.minutes}`:
        `Hours: ${whitelistTime.hours}, Minutes: ${whitelistTime.minutes}`
      );
    }

    if (SubscriptionPeriod * 1000 > Date.now()) {
      const subscriptionTimeDistance = formatDistanceToNow(
        new Date(Number(SubscriptionPeriod) * 1000)
      );
      setTime((pre) => {
        return { ...pre, subscriptionTimeDistance: subscriptionTimeDistance };
      });
      const subscriptionTime = intervalToDuration({
        start: new Date(Date.now()),
        end: new Date(Number(SubscriptionPeriod) * 1000),
      });
      seSubscriptionTimeTime(
        subscriptionTime.months?
        `Months: ${subscriptionTime.months}, Days: ${subscriptionTime.days}, Hours: ${subscriptionTime.hours}, Minutes: ${subscriptionTime.minutes}`:
        subscriptionTime.days?
        `Days: ${subscriptionTime.days}, Hours: ${subscriptionTime.hours}, Minutes: ${subscriptionTime.minutes}`:
        `Hours: ${subscriptionTime.hours}, Minutes: ${subscriptionTime.minutes}`
      );
      console.log("subscriptionTime", subscriptionTime)

    }
  };

  setInterval(() => {
    if (whitelistPeriod * 1000 > Date.now()) {
      const whitelistTimeDistance = formatDistanceToNow(
        new Date(Number(whitelistPeriod) * 1000)
      );
      setTime((pre) => {
        return { ...pre, whitelistTimeDistance: whitelistTimeDistance };
      });
      const whitelistTime = intervalToDuration({
        start: new Date(Date.now()),
        end: new Date(Number(whitelistPeriod) * 1000),
      });
      setWhitelistTimeTime(
        whitelistTime.months?
        `Months: ${whitelistTime.months}, Days: ${whitelistTime.days}, Hours: ${whitelistTime.hours}, Minutes: ${whitelistTime.minutes}`:
        whitelistTime.days?
        `Days: ${whitelistTime.days}, Hours: ${whitelistTime.hours}, Minutes: ${whitelistTime.minutes}`:
        `Hours: ${whitelistTime.hours}, Minutes: ${whitelistTime.minutes}`
      );
    } else {
      setTime((pre) => {
        return { ...pre, whitelistTimeDistance: "0" };
      });
      setWhitelistTimeTime("Days: 0, Hours: 0, Minutes: 0");
    }

    if (subscriptionPeriod * 1000 > Date.now()) {
      const subscriptionTimeDistance = formatDistanceToNow(
        new Date(Number(subscriptionPeriod) * 1000)
      );
      setTime((pre) => {
        return { ...pre, subscriptionTimeDistance: subscriptionTimeDistance };
      });
      const subscriptionTime = intervalToDuration({
        start: new Date(Date.now()),
        end: new Date(Number(subscriptionPeriod) * 1000),
      });
      seSubscriptionTimeTime(
        subscriptionTime.months?
        `Months: ${subscriptionTime.months}, Days: ${subscriptionTime.days}, Hours: ${subscriptionTime.hours}, Minutes: ${subscriptionTime.minutes}`:
        subscriptionTime.days?
        `Days: ${subscriptionTime.days}, Hours: ${subscriptionTime.hours}, Minutes: ${subscriptionTime.minutes}`:
        `Hours: ${subscriptionTime.hours}, Minutes: ${subscriptionTime.minutes}`
      );
    } else {
      setTime((pre) => {
        return { ...pre, subscriptionTimeDistance: "0" };
      });
      seSubscriptionTimeTime("Days: 0, Hours: 0, Minutes: 0");
    }
  }, 1000 * 60);

  useEffect(() => {
    checkUserInfo();
  }, [open]);

  return (
    <div className="period-container">
      <Grid container>
        <Grid item xs={12}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Your Subscription
          </Typography>
        </Grid>

        <Grid container>
          {time && (
            <Grid
              container
              style={{
                width: "80%",
                justifyContent: "center",
                alignItems: "center",
                margin: "10px",
              }}
            >
              <Grid item xs={6}>
                Remaining whiteListing period : {time.whitelistTimeDistance}{" "}
                <br />
                {whitelistTime}
              </Grid>

              <br />
              <br />

              <Grid item xs={6}>
                Remaining subscription period: {time.subscriptionTimeDistance}{" "}
                <br />
                {subscriptionTime}
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Periods;

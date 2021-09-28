import React from "react";
import "./style.css";
// import { intervalToDuration, formatDistanceToNow } from 'date-fns'
// import { useDispatch, useSelector } from 'react-redux';
// import { setSubscriptionPeriod, setWhitelistPeriod } from '../store';
import Grid from "@mui/material/Grid";
import { Form, Formik, Field } from "formik";
// import { TextField} from 'formik-material-ui';
import TextField from "@mui/material/TextField";
// import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const NFTForm = () => {
  const initialValues = { link: "", from: 0, to: 0 };

  const onSubmit = async () => {
    alert("Hello World");
  };

  return (
    <>
      <div className="form-text"> Snip an NFT </div>

      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {() => (
          <Form>
            <br />

            <Grid container spacing={1} className="form">
              <Grid item xs={12} className="form-component">
                <Field
                  component={TextField}
                  type="text"
                  name="link"
                  label="Link"
                  fullWidth
                />
              </Grid>

              <Grid item xs={6}>
                <Field
                  component={TextField}
                  type="number"
                  name="to"
                  label="To"
                  fullWidth
                />
              </Grid>

              <Grid item xs={6}>
                <Field
                  component={TextField}
                  type="number"
                  name="from"
                  label="From"
                  fullWidth
                />
              </Grid>

              <div className="form-button-container">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className="form-button"
                >
                  <div >Snip</div>
                </Button>
              </div>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default NFTForm;

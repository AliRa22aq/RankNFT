import React from "react";
import "./style.css";
// import { intervalToDuration, formatDistanceToNow } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux';
import { setUploadedContractAddress } from '../../../store';
import Grid from "@mui/material/Grid";
import { Form, Formik, Field } from "formik";
// import { TextField} from 'formik-material-ui';
import TextField from "@mui/material/TextField";
// import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// import * as Yup from 'yup';


// interface MyFormValues {
//   address: string;
// }

const NFTForm = () => {

  const dispatch = useDispatch();

  return (
    <div> 
    <Formik 
   initialValues={{
     address: '',
       }}  
  onSubmit={(values, { setSubmitting }) => {3
    
    dispatch(setUploadedContractAddress(values.address))

   setTimeout(() => {
     alert(JSON.stringify(values, null, 2));
     setSubmitting(false);
   }, 400);
 }}

>

 {(handleChange) => (
   <Form>
     <br />

     <Grid container spacing={1} className="form">
       <Grid item xs={12} className="form-component">
         <Field
          //  component={TextField}
           type="text"
           name="address"
           label="Conrtact Address"
          //  fullWidth
         />
       </Grid>

       {/* <Grid item xs={6}>
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
       </Grid> */}

        <div className="form-button-container">
         <Button
           variant="contained"
           color="primary"
           type="submit"
           className="form-button"
         >
           <div >Load</div>
         </Button>

       </div>
     </Grid>
   </Form>
 )}
 
</Formik> 

    </div>

    )
 };

export default NFTForm;

{/* <div>
<div className="form-text"> Snip an NFT </div> */}






    // const initialValues: MyFormValues = { address: '' };
    // return (
    //   <div>
    //     <h1>My Example</h1>
    //     <Formik
    //       initialValues={initialValues}
    //       onSubmit={(values, actions) => {
    //         console.log({ values, actions });
    //         alert(JSON.stringify(values, null, 2));
    //         actions.setSubmitting(false);
    //       }}
    //     >
    //       <Form>
    //       <Grid item xs={12} className="form-component">
    //             <Field
    //               component={TextField}
    //               type="text"
    //               name="address"
    //               label="Conrtact Address"
    //               fullWidth
    //             />
    //           </Grid>

    //         <button type="submit">Load</button>
    //       </Form>
    //     </Formik>
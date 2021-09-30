import React, {useState} from "react";
import "./style.css";
// import { intervalToDuration, formatDistanceToNow } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux';
import { setUploadedContractAddress } from '../../../store';
import Grid from "@mui/material/Grid";
import { Form, Formik, Field } from "formik";
import { TextField} from 'formik-material-ui';
// import TextField from "@mui/material"
// import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// import * as Yup from 'yup';
const Web3 = require("web3");


interface Data {
  totalSupply: string | null, 
  name: string | null,
  baseTokenURI: string  | null,
  attributes: any  |  null,
  uri : string | null
}
const initialData = {
  totalSupply:  null, 
  name:  null,
  baseTokenURI: null,
  attributes: null,
  uri : null
}


const NFTForm = () => {

  const dispatch = useDispatch();

  const [data, setData] = useState<Data>(initialData);


  const [loading, setLoading] = useState(false);
  const [needURI, setneedURI] = useState(false);
  const [needRange, setNeedrange] = useState(false);

  const [url, setUri] = useState("");


  const fetchData = async  (contractAdrs : string) => {

    setData(initialData) 
    setNeedrange(false)
    setLoading(true)
      
      var web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/92a3eada72834b629e28ff80ba4af4d0'))  

      const uri = `https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAdrs}&apikey=WKEB4C6A8MPPIYF5699I3A1ZEII57MXG2A`
      const abii = await fetch(uri)
      const abi = await abii.json()   
      
      var MyContract = new web3.eth.Contract(JSON.parse(abi.result), contractAdrs)
      console.log("asset ", MyContract)

      const name = await MyContract.methods.name().call();
      const totalSupply = await MyContract.methods.totalSupply().call();
      console.log("asset ", name)
      console.log("asset ", totalSupply)

      setData(pre => {return {...pre, totalSupply, name }}) 

      try{
        console.log("asset ", "trying 1")
        const tokenURI1 = await MyContract.methods.tokenURI(1).call();
        let baseTokenURI1 = tokenURI1.substring(0, tokenURI1.lastIndexOf('/'))
        baseTokenURI1 = baseTokenURI1?.replace("https", "http")
        console.log("asset ", baseTokenURI1)
        setData(pre => {return {...pre, baseTokenURI: baseTokenURI1}}) 
        setneedURI(false)
        setNeedrange(true)
        setLoading(false)

        
      }  catch(error){    
            console.log("asset ", "Error fetching URI from useNFT hook too")
            alert("Please provide NFT URI")
            setData(pre => {return {...pre,  baseTokenURI: null}}) 
            setneedURI(true)
            setLoading(false)
      }
  }


  const fetchURI = (uri: string) => {
    setData(pre => {return {...pre, baseTokenURI:  uri}}) 
  }


  return (
   <div className="parent-container"> 

    <div className="form-container" >

    <Formik initialValues={{ address: '', uri: '' }}  
            onSubmit={async (values, { setSubmitting, resetForm, setFieldValue,  }) => {
            
              if(!values.uri){
                dispatch(setUploadedContractAddress(values.address))
                fetchData(values.address)    
                // resetForm()
                setSubmitting(false)
              }
              if(values.uri){
                // setNeedrange(false)
                setData(pre => {return {...pre, baseTokenURI:  values.uri}}) 
                setFieldValue(values.uri,"")
                // resetForm()
                setneedURI(false)
                setSubmitting(false)
                setNeedrange(true)
              }
            }}>

    {() => (
      <Form>
        <Grid container spacing={2}>

          <Grid item xs={12} >
            <Field
              component={TextField}
              type="text"
              name="address"
              label="Conrtact Address"
              fullWidth
            />
          </Grid>

       {
         needURI ? 
        //  <div className="form-component">
          <Grid item xs={12}>
              <Field
                component={TextField}
                type="text"
                name="uri"
                label={`NFT URI ${(needURI ? "(Needed)" : "(Optional)")}`}
                fullWidth
              />
          </Grid> 
          // </div>
          : 
          null
       } 

        <div className="form-button-container">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="form-button"
          >
            {
              needURI ?
                  <div >Enter URI </div> :    
                  <div >Load Contract</div>
            }
          </Button>
         </div>


       {
         loading ? 
           <div> Loading . . . </div> : 
           <div className="project-detail-container">

              {
                data?.name || data?.totalSupply || data?.baseTokenURI ?
                <div className="project-detail-header"> Project Details </div> :
                null
              }
              {
                data?.name ? 
                <div> Name : {data?.name} </div> :
                null
              }
              {
                data?.totalSupply ? 
                <div> TotalSupply : {data?.totalSupply} </div>  :
                null
              }
              {
                data?.baseTokenURI ? 
                <div> BaseTokenURI : {data?.baseTokenURI} </div> : 
                null
              }

          </div>
        }


     </Grid>
   </Form>
 )}
 
</Formik> 


</div>


    <div className="form-container" >

{
      needRange ?
        <Formik initialValues={{ from: 0, to: 20 }}  
            onSubmit={async (values, { setSubmitting, resetForm, setFieldValue,  }) => {}}
            >
            {() => (
              <Form>    
                {/* <div className="sub-container"> */}
                  <div className="range-header"> Enter Range you want to snip </div>
                  <Grid container spacing={4} >


                  <Grid item xs={6}>
                    <Field
                      component={TextField}
                      type="number"
                      name="from"
                      label="From"
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

                  <div className="form-button-container">
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      className="form-button"
                      >
                    <div >Snip </div> 

                    </Button>
                  </div>
        
                </Grid>  
                
              {/* </div> */}
              </Form>
            )}
        </Formik> :
        null
    }

            
      </div>


    </div>

    )
 };

export default NFTForm;


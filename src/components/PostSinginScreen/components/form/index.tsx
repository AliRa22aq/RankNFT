import React, {useState, useEffect} from "react";
import "./style.css";
import { useDispatch, useSelector } from 'react-redux';
import { Attribute, setInitalCountOfAllAttribute, setCountOfAllAttribute, setUploadedContractAddress, setAvailableAttributes, CountOfEachAttribute, addTokenInList, AttributesOfEachToekn } from '../../../store';
import Grid from "@mui/material/Grid";
import { Form, Formik, Field } from "formik";
import { TextField} from 'formik-material-ui';
import Button from "@mui/material/Button";
// import * as Yup from 'yup';
const Web3 = require("web3");
import axios from "axios";


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


  
  const fetchAllTokenData = async (tokenURI: string, from: number, to: number) => {
    try{
      let url = tokenURI
      if(url){
        let fetchAPI =  await axios.get( url ) as any          
        console.log("new", fetchAPI.data.attributes)
        if(fetchAPI){



          const countOfAllAttribute: CountOfEachAttribute[] | null = [];


          fetchAPI.data.attributes.map((attribute: Attribute) => {

            const dataToDispatch: CountOfEachAttribute = {
                  trait_type :attribute.trait_type, 
                  trait_count: null,
                  total_variations: 0
            }
            dispatch(setAvailableAttributes(dataToDispatch as CountOfEachAttribute))
            
            if(dataToDispatch){
              countOfAllAttribute.push(dataToDispatch)
            }
          })
          if(countOfAllAttribute){
            dispatch(setInitalCountOfAllAttribute(countOfAllAttribute as CountOfEachAttribute[])) 
          }
          // if(countOfAllAttribute){
          // }

          // if(countOfEachAttribute){
          // }

          const range = to - from + 1
          console.log("to and from: ", to, from)
          console.log("ready with range: ", range)

          for(var i = from;  i <= range;  i++ ) {
              let activeURL =  url.replace("1" , String(i))
              console.log("activeURL", activeURL)

              let activefetchAPI =  await axios.get( activeURL ) as any          
              console.log(activefetchAPI.data.attributes)
              dispatch(addTokenInList({tokenID: String(i) , attributes: activefetchAPI.data.attributes} as AttributesOfEachToekn))
              activefetchAPI.data.attributes.map((attribute: Attribute)=> {
                        dispatch(setCountOfAllAttribute(attribute));
              })

          // interface CountOfEachAttribute {
          //   trait_type :string, 
          //   trait_count: {value: string, count: number}[],
          //   total_variations: number
          // }
          // activefetchAPI.data.attributes.map((attribute: any) => {
          //   const dataToDispatch = {
          //     trait_type: attribute.trait_type, 
          //     value: attribute.value
          //   }

            // dispatch(setCountOfAllAttribute(dataToDispatch))

           // })



          }


        }
        
      }
    }
    catch(e) { alert("Unable to get information of the token. Please use another") }

  }


  const fetchData = async  (contractAdrs : string) => {
    setData(initialData)
    setNeedrange(false)
    setLoading(true)
    dispatch(addTokenInList(null))
    dispatch(setAvailableAttributes(null))

      
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
        setData(pre => {return {...pre, baseTokenURI: tokenURI1}}) 
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

  const fetchAttributes = async (from: number, to: number) => {
    
    // if(data?.baseTokenURI === null) return;

    let check;

    check = data?.baseTokenURI?.includes("ipfs://");
    if(check && data?.baseTokenURI) {
      let url = data?.baseTokenURI?.replace("ipfs://", "https://ipfs.io/ipfs/");
      fetchAllTokenData(url, from, to)
    }

    check = data?.baseTokenURI?.includes("https://"); 
    if(check && data?.baseTokenURI){
      let url = data?.baseTokenURI
      fetchAllTokenData(url, from, to)
    }
      







  }

  return (
   <div className="parent-container"> 

    <div className="form-container" >

    <Formik initialValues={{ address: '0xc1a1e381389cb927f1d57511e144b644ef0c6385', uri: '' }}  
            onSubmit={async (values, { setSubmitting, setFieldValue,  }) => {
            
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
          <Grid item xs={12}>
              <Field
                component={TextField}
                type="text"
                name="uri"
                label={`NFT URI ${(needURI ? "(Needed)" : "(Optional)")}`}
                fullWidth
              />
          </Grid> 
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
        <Formik initialValues={{ from: 1, to: 5 }}  
            onSubmit={async (values, { setSubmitting, resetForm, setFieldValue,  }) => {
              fetchAttributes(values.from, values.to)
            }}
            >
            {() => (
              <Form>    
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


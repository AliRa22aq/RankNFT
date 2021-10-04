import React, {useState, useEffect} from "react";
import "./style.css";
import { useDispatch, useSelector } from 'react-redux';
import { setIsSnipping, setLoadingNFTs, setProjectRange, setProjectInfo, ProjectInfo, Attribute, setInitalCountOfAllAttribute, setCountOfAllAttribute, setUploadedContractAddress, setAvailableAttributes, CountOfEachAttribute, addTokenInList, AttributesOfEachToekn } from '../../../store';
import Grid from "@mui/material/Grid";
import { Form, Formik, Field } from "formik";
import { TextField} from 'formik-material-ui';
import Button from "@mui/material/Button";
// import * as Yup from 'yup';
const Web3 = require("web3");
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import { OpenSeaPort, Network} from 'opensea-js'
// import * as yup from 'yup';



interface Data {
  contractInfo: {contractFunctions: any, contractAddrs: string},
  totalSupply: string | null, 
  name: string | null,
  baseTokenURI: string  | null,
  attributes: any  |  null,
  uri : string | null
}
const initialData = {
  contractInfo: {contractFunctions: null, contractAddrs: ""},
  totalSupply:  null, 
  name:  null,
  baseTokenURI: null,
  attributes: null,
  uri : null
}


const NFTForm = () => {

  const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io')

  const seaport = new OpenSeaPort(provider, {
    networkName: Network.Main
  })
  
  const dispatch = useDispatch();
  const [data, setData] = useState<Data>(initialData);
  const [loading, setLoading] = useState(false);
  const [needURI, setneedURI] = useState(false);
  const [needRange, setNeedrange] = useState(false);


  // let schema = yup.object().shape({
  //   name: yup.string().required(),
  //   age: yup.number().required().positive().integer(),
  //   email: yup.string().email(),
  //   website: yup.string().url(),
  //   createdOn: yup.date().default(function () {
  //     return new Date();
  //   }),
  // });
  
  const fetchAllTokenData = async (tokenURI: string, from: number, to: number) => {
    // dispatch(setLoadingNFTs(true))

    console.log("step 1: Snipping started with URL ", tokenURI)
    try{
      let url = tokenURI;
      // await data.contractFunctions.methods.tokenURI(1).call();

      if(url){
        let fetchAPI =  await axios.get( url ) as any          
        console.log("new", fetchAPI.data.attributes)
        console.log("step 2: Fetched attributes from URL ", fetchAPI.data.attributes)

        if(fetchAPI){

          const countOfAllAttribute: CountOfEachAttribute[] | null = [];

          fetchAPI.data.attributes.map((attribute: Attribute, key: number) => {
        
          // console.log(`step 3.${key}: Star looping over each attribute`, attribute)
        

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


          const range = to - from + 1

          console.log(`step 4: Going to start loop to get attributes of each token Range`, range)

          for(var i = from;  i <= to;  i++ ) {

          console.log(`step 5: Star looping over each NFT attribute, TokenID`, i)

              let activeURL =  url.replace("1" , String(i))
              // console.log("activeURL", activeURL)
              console.log(`step 6: active URl of NFT`, i, activeURL )


              const opensea_api = `https://api.opensea.io/api/v1/assets?asset_contract_address=${data.contractInfo.contractAddrs}&token_ids=${i}`
              let opensea_api_res =  await axios.get( opensea_api ) as any
              console.log("opensea_api_res", opensea_api_res.data.assets[0])  

              // console.log(`step 7: Response from opensea`, i, opensea_api_res.data.assets[0] )


              let activefetchAPI =  await axios.get( activeURL ) as any          
              console.log(`step 7: Response from axios`, i, activefetchAPI.data )


              dispatch(addTokenInList({
                tokenID: String(i), 
                attributes: activefetchAPI.data.attributes,
                opensea_data: opensea_api_res.data.assets[0],
                rarity_score: 0,
                normalized_rarity_score: 0,
                image: activefetchAPI.data.image,
                title: activefetchAPI.data.title? activefetchAPI.data.title: "" ,
                name: activefetchAPI.data.name? activefetchAPI.data.name: "" 


              } as AttributesOfEachToekn))
              activefetchAPI.data.attributes.map((attribute: Attribute)=> {
                        dispatch(setCountOfAllAttribute(attribute));
              })
          }

        }
        
      }
        dispatch(setIsSnipping({action: "completed"}))
      // dispatch(setLoadingNFTs(false))

    }
    catch(e) { 
      alert("Unable to get information of the token. Please use another")
      // dispatch(setLoadingNFTs(false)
      dispatch(setIsSnipping({action: "completed"}))
    }

  }

  const fetchData = async  (contractAdrs : string) => {
    setData(initialData)
    setNeedrange(false)
    setLoading(true)
    dispatch(addTokenInList(null))
    dispatch(setAvailableAttributes(null))



      // TODO: Ask ben to provide Infure API Kye
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

      setData(pre => {return {...pre, totalSupply, name,   
        contractInfo: {contractFunctions: MyContract, contractAddrs: contractAdrs}
      }}) 

      try{
        console.log("asset ", "trying 1")
        const tokenURI1 = await MyContract.methods.tokenURI(1).call();
        setData(pre => {return {...pre, baseTokenURI: tokenURI1}}) 

        dispatch(setProjectInfo({
                contractAddress: contractAdrs,
                totalSupply:  Number(totalSupply), 
                name:  name, 
                baseTokenURI: tokenURI1,
                range: null
              }))

        setneedURI(false)
        setNeedrange(true)
        setLoading(false)

        
      }  catch(error){    
            console.log("asset ", "Error fetching URI from useNFT hook too")
            alert("Please provide NFT URI")
            setData(pre => {return {...pre,  baseTokenURI: null}}) 
            dispatch(setProjectInfo({
                contractAddress: contractAdrs, 
                totalSupply:  Number(totalSupply), 
                name:  name, 
                baseTokenURI: null, 
                range: null
              }))
            setneedURI(true)
            setLoading(false)
      }
  }

  const startSnipping = async (from: number, to: number) => {

    dispatch(setLoadingNFTs(false))
    dispatch(setIsSnipping({action: "started"})) 

    dispatch(setProjectRange({from: from, to: to, range: to - from + 1}))
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
           <div className="loading-contractDetails"> <CircularProgress /> </div> : 
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
              startSnipping(values.from, values.to)
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


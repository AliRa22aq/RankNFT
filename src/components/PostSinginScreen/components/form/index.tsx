import React, {useState, useEffect} from "react";
import "./style.css";
import { useDispatch, useSelector } from 'react-redux';
import {setCountOfAllAttribute3, setOpenseaData2, addTokenInList3, addTokenInList2, setCountOfAllAttribute2, setInitialCountOfAllAttribute2, setOpenseaData, TraitCount, reSetSnipping, setIsSnipping, setLoadingNFTs, setProjectRange, setProjectInfo, ProjectInfo, Attribute, setInitalCountOfAllAttribute, setCountOfAllAttribute, setUploadedContractAddress, setAvailableAttributes, CountOfEachAttribute, addTokenInList, AttributesOfEachToekn } from '../../../store';
import Grid from "@mui/material/Grid";
import { Form, Formik, Field } from "formik";
import { TextField} from 'formik-material-ui';
import Button from "@mui/material/Button";
const Web3 = require("web3");
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
// import { OpenSeaPort, Network} from 'opensea-js'
import * as yup from 'yup';
import async  from "async";
// import parallel from 'async/parallel';

 

 



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

  const { countOfAllAttribute2, list_of_all_tokens2 } = useSelector((state: any) => state);
  // console.log("countOfAllAttribute2", countOfAllAttribute2)
  // console.log("list_of_all_tokens2", list_of_all_tokens2)

  const dispatch = useDispatch();


  
  const [data, setData] = useState<Data>(initialData);
  const [loading, setLoading] = useState(false);
  const [needURI, setneedURI] = useState(false);
  const [needRange, setNeedrange] = useState(false);
  const [delayNFT, setDelayNFT] = useState(20);
  const [delayOpensea, setDelayOpensea] = useState(20);

  const handleDelayNFT = (ms: any) => {
    setDelayNFT(ms)
    console.log("ms: ", ms)
  }

  const handleDelayOpensea = (ms: any) => {
    setDelayOpensea(ms)
    console.log("ms: ", ms)

  }

  let schema1 = yup.object().shape({
    address: yup.string().length(42, "not a contract address").required(),
    uri: yup.string()
  });

  let schema2 = yup.object().shape({
    from: yup.number().positive().moreThan(0, "should be more than 1").lessThan(yup.ref("to"), "not a valid range ").required(),
    to: yup.number().positive().moreThan(yup.ref("from"), "not a valid range ").moreThan(1, "should be more than 1").required()
  });

  
  const fetchAllTokenData = async (tokenURI: string, from: number, to: number) => {


    console.log("step 1: Snipping started with URL ", tokenURI)
    try{
      let url1 = tokenURI;
      let url = tokenURI.replace("321" , "extension");

      if(url){
        let fetchAPI =  await axios.get( url1 ) as any          
           
        if(fetchAPI){
          
          dispatch(setInitialCountOfAllAttribute2(fetchAPI.data.attributes as Attribute[]))
          
          dispatch(setIsSnipping({action: "started"}))         
          // const range = to-from + 1
          const delayFn = (ms:number) => new Promise((r) => setTimeout(r, ms));
            

            let allTokens: any = [];
            let allAttributes: any = [];
            let allRequests:any = [];


            // for(var i = from;  i <= to;  i=i+1) {
            //   let activeURL =  url.replace("extension" , String(i))
            //   console.log(`step 6: active URl of NFT`, i, activeURL )
            //   let API =  axios.get( activeURL,  {data: i} ) as any  
            //   allRequests = [...allRequests  ,  API]
            // }
            
            //   const responses:any = await Promise.allSettled(allRequests); 
              
            //   responses.forEach((result:any, key: number) => {
            //           if(result.status == 'fulfilled'){
            //           const newTokens: any = {
            //             tokenID: result.value.config.data,  
            //             attributes: result.value.data.attributes,
            //             opensea: {price: 0, permalink: ""},
            //             rarity_score: 0,
            //             normalized_rarity_score: 0,
            //             image: result.value.data.image,
            //             title: result.value.data.title? result.value.title: "",
            //             name: result.value.data.name? result.value.data.name: "" 
            //           }
            //           allTokens.push(newTokens)
            //           allAttributes.push( result.value.data.attributes)
            //           console.log("done")
            //       } else {
            //         console.error("Unable to fetch")
            //       }

            //   });

            //   console.log("allTokens", allTokens)
            //   dispatch(addTokenInList3(allTokens))
            //   console.log("allAttributes", allAttributes)
            //   dispatch(setCountOfAllAttribute3(allAttributes))              
            

              
            //   let allRequest2: any = [];
            //   let allOpenSeaResponses:any = [];
            //   let flatResponse:any = [];


            //   for(var i = from;  i <= to;  i=i+30) {
            //     const opensea_api = `https://api.opensea.io/api/v1/assets?asset_contract_address=${data.contractInfo.contractAddrs}&token_ids=${i}&token_ids=${i+1}&token_ids=${i+2}&token_ids=${i+3}&token_ids=${i+4}&token_ids=${i+5}&token_ids=${i+6}&token_ids=${i+7}&token_ids=${i+8}&token_ids=${i+9}&token_ids=${i+10}&token_ids=${i+11}&token_ids=${i+12}&token_ids=${i+13}&token_ids=${i+14}&token_ids=${i+15}&token_ids=${i+16}&token_ids=${i+17}&token_ids=${i+18}&token_ids=${i+19}&token_ids=${i+20}&token_ids=${i+21}&token_ids=${i+22}&token_ids=${i+23}&token_ids=${i+24}&token_ids=${i+25}&token_ids=${i+26}&token_ids=${i+27}&token_ids=${i+28}&token_ids=${i+29}&limit=30`
            //     console.log("open_sea Api", opensea_api)
            //     let API =  axios.get( opensea_api,  {data: i} ) as any  
            //     allRequest2 = [...allRequest2  , API]            
            //   }

            //   const responses2:any = await Promise.allSettled(allRequest2);
            //   console.log("Combined responses of opensea ", responses2)

            //   responses2.map((result: any, key: number) => {
            //     if(result.status == 'fulfilled'){
            //       console.log(result.value.data.assets)
            //       allOpenSeaResponses.push(result.value.data.assets)
            //     } else {
            //       console.error("Unable to fetch")
            //     }

            //   })
            //   console.log("all OpenSea Responses ",  allOpenSeaResponses.flat())
            //   dispatch(setOpenseaData2(allOpenSeaResponses.flat()))

            // dispatch(setIsSnipping({action: "completed"}))



              // for(var i = from;  i <= to;  i=i+1) {
              //   let activeURL =  url.replace("extension" , String(i))
              //   console.log(`step 6: active URl of NFT`, i, activeURL )
              //   let API =  axios.get( activeURL,  {data: i} ) as any  
              //   allRequests = [...allRequests  , API]            
              // }
              
              // const responses = await axios.all(allRequests);
              // console.log("Combined responses ", responses)

              // responses.map((res: any) => {
              // console.log("waited res of Loop #", res.config.data, res)
              //     const newTokens: any = {
              //       tokenID: res.config.data,  
              //       attributes: res.data.attributes,
              //       opensea: {price: 0, permalink: ""},
              //       rarity_score: 0,
              //       normalized_rarity_score: 0,
              //       image: res.data.image,
              //       title: res.data.title? res.data.title: "",
              //       name: res.data.name? res.data.name: "" 
              //     }
              //   allTokens.push(newTokens)
              //   allAttributes.push(res.data.attributes)
              // })

              // // await delayFn(1000);
              // console.log("allTokens", allTokens)
              // dispatch(addTokenInList3(allTokens))
              // console.log("allAttributes", allAttributes)
              // dispatch(setCountOfAllAttribute3(allAttributes))              

              
              // let allRequest2: any = [];
              // let allOpenSeaResponses:any = [];
              // let flatResponse:any = [];


              // for(var i = from;  i <= to;  i=i+30) {
              //   const opensea_api = `https://api.opensea.io/api/v1/assets?asset_contract_address=${data.contractInfo.contractAddrs}&token_ids=${i}&token_ids=${i+1}&token_ids=${i+2}&token_ids=${i+3}&token_ids=${i+4}&token_ids=${i+5}&token_ids=${i+6}&token_ids=${i+7}&token_ids=${i+8}&token_ids=${i+9}&token_ids=${i+10}&token_ids=${i+11}&token_ids=${i+12}&token_ids=${i+13}&token_ids=${i+14}&token_ids=${i+15}&token_ids=${i+16}&token_ids=${i+17}&token_ids=${i+18}&token_ids=${i+19}&token_ids=${i+20}&token_ids=${i+21}&token_ids=${i+22}&token_ids=${i+23}&token_ids=${i+24}&token_ids=${i+25}&token_ids=${i+26}&token_ids=${i+27}&token_ids=${i+28}&token_ids=${i+29}&limit=30`
              //   console.log("open_sea Api", opensea_api)
              //   let API =  axios.get( opensea_api,  {data: i} ) as any  
              //   allRequest2 = [...allRequest2  , API]            
              // }

              // const responses2 = await axios.all(allRequest2);
              // console.log("Combined responses of opensea ", responses2)

              // responses2.map((res: any) => {
              //   allOpenSeaResponses.push(res.data.assets)
              // })
              // console.log("allOpenSeaResponses ",  allOpenSeaResponses.flat())
              // dispatch(setOpenseaData2(allOpenSeaResponses.flat()))

              // dispatch(setIsSnipping({action: "completed"}))



              // Solution 3

              for(var i = from;  i <= to;  i=i+1) {
                console.log("Loop delayNFT", delayNFT )
                await delayFn(delayNFT);

                let activeURL =  url.replace("extension" , String(i))
                console.log("Loop #",  i, activeURL )
                     
                axios.get( activeURL,  {data: i})
                .then((res: any) => {
                  console.log("waited res of Loop #", res.config.data, res)

                      const newTokens: any = {
                        tokenID: res.config.data,  
                        attributes: res.data.attributes,
                        opensea: {price: 0, permalink: ""},
                        rarity_score: 0,
                        normalized_rarity_score: 0,
                        image: res.data.image,
                        title: res.data.title? res.data.title: "",
                        name: res.data.name? res.data.name: "" 
                      }

                  allTokens.push(newTokens)
                  allAttributes.push(res.data.attributes)
                })

              }
              await delayFn(3000);
              console.log("allTokens", allTokens)
              dispatch(addTokenInList3(allTokens))
              console.log("allAttributes", allAttributes)
              dispatch(setCountOfAllAttribute3(allAttributes))              


              // await delayFn(5000);

              // dispatch(setCountOfAllAttribute2(res.data.attributes as Attribute[]))

              let request2: any = [];
              let allOpenSeaResponses:any = [];
              let flatResponse:any = [];

              // OK
              console.log("First functions started")
              for(var i = from;  i <= to;  i=i+30) {
                await delayFn(delayOpensea);
                const opensea_api = `https://api.opensea.io/api/v1/assets?asset_contract_address=${data.contractInfo.contractAddrs}&token_ids=${i}&token_ids=${i+1}&token_ids=${i+2}&token_ids=${i+3}&token_ids=${i+4}&token_ids=${i+5}&token_ids=${i+6}&token_ids=${i+7}&token_ids=${i+8}&token_ids=${i+9}&token_ids=${i+10}&token_ids=${i+11}&token_ids=${i+12}&token_ids=${i+13}&token_ids=${i+14}&token_ids=${i+15}&token_ids=${i+16}&token_ids=${i+17}&token_ids=${i+18}&token_ids=${i+19}&token_ids=${i+20}&token_ids=${i+21}&token_ids=${i+22}&token_ids=${i+23}&token_ids=${i+24}&token_ids=${i+25}&token_ids=${i+26}&token_ids=${i+27}&token_ids=${i+28}&token_ids=${i+29}&limit=30`
                console.log("open_sea Api", opensea_api)
                axios.get(opensea_api).then((res: any) => {
                  allOpenSeaResponses.push(res.data.assets)
                })
              }
              await delayFn(3000);
              console.log("allOpenSeaResponses ",  allOpenSeaResponses.flat())
              dispatch(setOpenseaData2(allOpenSeaResponses.flat()))

              dispatch(setIsSnipping({action: "completed"}))


              async.series([
                // async function(){
                //   console.log("First functions started")
                //   for(var i = from;  i <= to;  i=i+30) {
                //     // await delayFn(delayNFT);
                //     const opensea_api = `https://api.opensea.io/api/v1/assets?asset_contract_address=${data.contractInfo.contractAddrs}&token_ids=${i}&token_ids=${i+1}&token_ids=${i+2}&token_ids=${i+3}&token_ids=${i+4}&token_ids=${i+5}&token_ids=${i+6}&token_ids=${i+7}&token_ids=${i+8}&token_ids=${i+9}&token_ids=${i+10}&token_ids=${i+11}&token_ids=${i+12}&token_ids=${i+13}&token_ids=${i+14}&token_ids=${i+15}&token_ids=${i+16}&token_ids=${i+17}&token_ids=${i+18}&token_ids=${i+19}&token_ids=${i+20}&token_ids=${i+21}&token_ids=${i+22}&token_ids=${i+23}&token_ids=${i+24}&token_ids=${i+25}&token_ids=${i+26}&token_ids=${i+27}&token_ids=${i+28}&token_ids=${i+29}&limit=30`
                //     console.log("open_sea Api", opensea_api)
                //     const opensea_api_res: any = await axios.get(opensea_api)
                //     // request2 = [...request2  , opensea_api_res]        
                //     dispatch(setOpenseaData2(opensea_api_res.data.assets))
                //   }
                // },
                // async function(){
                //   console.log("First functions started")
                //   for(var i = from;  i <= to;  i=i+30) {
                //     await delayFn(delayOpensea);
                //     const opensea_api = `https://api.opensea.io/api/v1/assets?asset_contract_address=${data.contractInfo.contractAddrs}&token_ids=${i}&token_ids=${i+1}&token_ids=${i+2}&token_ids=${i+3}&token_ids=${i+4}&token_ids=${i+5}&token_ids=${i+6}&token_ids=${i+7}&token_ids=${i+8}&token_ids=${i+9}&token_ids=${i+10}&token_ids=${i+11}&token_ids=${i+12}&token_ids=${i+13}&token_ids=${i+14}&token_ids=${i+15}&token_ids=${i+16}&token_ids=${i+17}&token_ids=${i+18}&token_ids=${i+19}&token_ids=${i+20}&token_ids=${i+21}&token_ids=${i+22}&token_ids=${i+23}&token_ids=${i+24}&token_ids=${i+25}&token_ids=${i+26}&token_ids=${i+27}&token_ids=${i+28}&token_ids=${i+29}&limit=30`
                //     console.log("open_sea Api", opensea_api)
                //     axios.get(opensea_api).then((res: any) => {
                //       allOpenSeaResponses.push(res.data.assets)
                //     })
                //   }
                //   await delayFn(2000);
                //   console.log("allOpenSeaResponses ",  allOpenSeaResponses.flat())
                //   dispatch(setOpenseaData2(allOpenSeaResponses.flat()))
                // },
                // async function(){
                //   console.log("First functions started")
                //   await delayFn(delayNFT*100);

                //   for(var i = from;  i <= to && i <= 1000;  i=i+30) {
                //     // await delayFn(delayNFT);
                //     const opensea_api = `https://api.opensea.io/api/v1/assets?asset_contract_address=${data.contractInfo.contractAddrs}&token_ids=${i}&token_ids=${i+1}&token_ids=${i+2}&token_ids=${i+3}&token_ids=${i+4}&token_ids=${i+5}&token_ids=${i+6}&token_ids=${i+7}&token_ids=${i+8}&token_ids=${i+9}&token_ids=${i+10}&token_ids=${i+11}&token_ids=${i+12}&token_ids=${i+13}&token_ids=${i+14}&token_ids=${i+15}&token_ids=${i+16}&token_ids=${i+17}&token_ids=${i+18}&token_ids=${i+19}&token_ids=${i+20}&token_ids=${i+21}&token_ids=${i+22}&token_ids=${i+23}&token_ids=${i+24}&token_ids=${i+25}&token_ids=${i+26}&token_ids=${i+27}&token_ids=${i+28}&token_ids=${i+29}&limit=30`
                //     console.log("open_sea Api", opensea_api)
                //     const opensea_api_res = axios.get(opensea_api)
                //     request2 = [...request2  , opensea_api_res]        
                    
                //   }
                //   console.log("First functions Ended")
                //   const responses2 = await axios.all(request2)
                //   responses2.map((response: any) => {
                //     flatResponse = [...flatResponse, response.data.assets]
                //   })
                //   dispatch(setOpenseaData2(flatResponse.flat()))
                //   await delayFn(delayNFT*50);
                //   request2 = [];
                //   flatResponse= [];    
                //   console.log("Nullling ", request2, flatResponse)
                //   await delayFn(delayNFT*300);

                // },
                // async function(){
                //   console.log("Second functions started")
                //   await delayFn(delayNFT*100);

                //   for(var i = 1001;  i <= to && i <= 2000;  i=i+30) {
                //     // await delayFn(delayNFT);
                //     const opensea_api = `https://api.opensea.io/api/v1/assets?asset_contract_address=${data.contractInfo.contractAddrs}&token_ids=${i}&token_ids=${i+1}&token_ids=${i+2}&token_ids=${i+3}&token_ids=${i+4}&token_ids=${i+5}&token_ids=${i+6}&token_ids=${i+7}&token_ids=${i+8}&token_ids=${i+9}&token_ids=${i+10}&token_ids=${i+11}&token_ids=${i+12}&token_ids=${i+13}&token_ids=${i+14}&token_ids=${i+15}&token_ids=${i+16}&token_ids=${i+17}&token_ids=${i+18}&token_ids=${i+19}&token_ids=${i+20}&token_ids=${i+21}&token_ids=${i+22}&token_ids=${i+23}&token_ids=${i+24}&token_ids=${i+25}&token_ids=${i+26}&token_ids=${i+27}&token_ids=${i+28}&token_ids=${i+29}&limit=30`
                //     console.log("open_sea Api", opensea_api)
                //     const opensea_api_res = axios.get(opensea_api)
                //     request2 = [...request2  , opensea_api_res]        
                    
                //   }
                //   console.log("2nd functions Ended")
                //   const responses2 = await axios.all(request2)
                //   responses2.map((response: any) => {
                //     flatResponse = [...flatResponse, response.data.assets]
                //   })
                //   dispatch(setOpenseaData2(flatResponse.flat()))
                //   await delayFn(delayNFT*50);
                //   request2 = [];
                //   flatResponse= [];    
                //   console.log("Nullling ", request2, flatResponse)
                //   await delayFn(delayNFT*300);

                // },
                // async function(){
                //   console.log("3rd functions started")
                //   await delayFn(delayNFT*100);

                //   for(var i = 2001;  i <= to && i <= 3000;  i=i+30) {
                //     // await delayFn(delayNFT);
                //     const opensea_api = `https://api.opensea.io/api/v1/assets?asset_contract_address=${data.contractInfo.contractAddrs}&token_ids=${i}&token_ids=${i+1}&token_ids=${i+2}&token_ids=${i+3}&token_ids=${i+4}&token_ids=${i+5}&token_ids=${i+6}&token_ids=${i+7}&token_ids=${i+8}&token_ids=${i+9}&token_ids=${i+10}&token_ids=${i+11}&token_ids=${i+12}&token_ids=${i+13}&token_ids=${i+14}&token_ids=${i+15}&token_ids=${i+16}&token_ids=${i+17}&token_ids=${i+18}&token_ids=${i+19}&token_ids=${i+20}&token_ids=${i+21}&token_ids=${i+22}&token_ids=${i+23}&token_ids=${i+24}&token_ids=${i+25}&token_ids=${i+26}&token_ids=${i+27}&token_ids=${i+28}&token_ids=${i+29}&limit=30`
                //     console.log("open_sea Api", opensea_api)
                //     const opensea_api_res = axios.get(opensea_api)
                //     request2 = [...request2  , opensea_api_res]        
                    
                //   }
                //   console.log("3rd functions Ended")
                //   const responses2 = await axios.all(request2)
                //   responses2.map((response: any) => {
                //     flatResponse = [...flatResponse, response.data.assets]
                //   })
                //   dispatch(setOpenseaData2(flatResponse.flat()))
                //   await delayFn(delayNFT*50);
                //   request2 = [];
                //   flatResponse= [];    
                //   console.log("Nullling ", request2, flatResponse)
                //   await delayFn(delayNFT*300);

                // },
                // async function(){
                //   console.log("4th functions started")
                //   await delayFn(delayNFT*100);

                //   for(var i = 3001;  i <= to && i <= 4000;  i=i+30) {
                //     // await delayFn(delayNFT);
                //     const opensea_api = `https://api.opensea.io/api/v1/assets?asset_contract_address=${data.contractInfo.contractAddrs}&token_ids=${i}&token_ids=${i+1}&token_ids=${i+2}&token_ids=${i+3}&token_ids=${i+4}&token_ids=${i+5}&token_ids=${i+6}&token_ids=${i+7}&token_ids=${i+8}&token_ids=${i+9}&token_ids=${i+10}&token_ids=${i+11}&token_ids=${i+12}&token_ids=${i+13}&token_ids=${i+14}&token_ids=${i+15}&token_ids=${i+16}&token_ids=${i+17}&token_ids=${i+18}&token_ids=${i+19}&token_ids=${i+20}&token_ids=${i+21}&token_ids=${i+22}&token_ids=${i+23}&token_ids=${i+24}&token_ids=${i+25}&token_ids=${i+26}&token_ids=${i+27}&token_ids=${i+28}&token_ids=${i+29}&limit=30`
                //     console.log("open_sea Api", opensea_api)
                //     const opensea_api_res = axios.get(opensea_api)
                //     request2 = [...request2  , opensea_api_res]        
                    
                //   }
                //   console.log("4th functions Ended")
                //   const responses2 = await axios.all(request2)
                //   responses2.map((response: any) => {
                //     flatResponse = [...flatResponse, response.data.assets]
                //   })
                //   dispatch(setOpenseaData2(flatResponse.flat()))
                //   await delayFn(delayNFT*50);
                //   request2 = [];
                //   flatResponse= [];    
                //   console.log("Nullling ", request2, flatResponse)
                //   await delayFn(delayNFT*300);

                // },
                // async function(){
                //   console.log("5th functions started")
                //   await delayFn(delayNFT*100);

                //   for(var i = 4001;  i <= to && i <= 5000;  i=i+30) {
                //     // await delayFn(delayNFT);
                //     const opensea_api = `https://api.opensea.io/api/v1/assets?asset_contract_address=${data.contractInfo.contractAddrs}&token_ids=${i}&token_ids=${i+1}&token_ids=${i+2}&token_ids=${i+3}&token_ids=${i+4}&token_ids=${i+5}&token_ids=${i+6}&token_ids=${i+7}&token_ids=${i+8}&token_ids=${i+9}&token_ids=${i+10}&token_ids=${i+11}&token_ids=${i+12}&token_ids=${i+13}&token_ids=${i+14}&token_ids=${i+15}&token_ids=${i+16}&token_ids=${i+17}&token_ids=${i+18}&token_ids=${i+19}&token_ids=${i+20}&token_ids=${i+21}&token_ids=${i+22}&token_ids=${i+23}&token_ids=${i+24}&token_ids=${i+25}&token_ids=${i+26}&token_ids=${i+27}&token_ids=${i+28}&token_ids=${i+29}&limit=30`
                //     console.log("open_sea Api", opensea_api)
                //     const opensea_api_res = axios.get(opensea_api)
                //     request2 = [...request2  , opensea_api_res]        
                    
                //   }
                //   console.log("5th functions Ended")
                //   const responses2 = await axios.all(request2)
                //   responses2.map((response: any) => {
                //     flatResponse = [...flatResponse, response.data.assets]
                //   })
                //   dispatch(setOpenseaData2(flatResponse.flat()))
                //   await delayFn(delayNFT*30);
                //   request2 = [];
                //   flatResponse= [];    
                //   console.log("Nullling ", request2, flatResponse)
                //   await delayFn(delayNFT*300);

                // },

            ]);








        }
      }
    }
    catch(e) { 
      alert("Unable to fetch information. Make sure you have installed and enabled Moesif CORS extention")
      // dispatch(setLoadingNFTs(false)
      // dispatch(setIsSnipping({action: "completed"}))
    }

  }

  const fetchData = async  ( contractAdrs : string, URl:string, setFieldValue: any ) => {

      setData(initialData)
      setNeedrange(false)
      setLoading(true)

      // TODO: Ask ben to provide Infure API Kye
      var web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/92a3eada72834b629e28ff80ba4af4d0'))  

      const uri = `https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAdrs}&apikey=WKEB4C6A8MPPIYF5699I3A1ZEII57MXG2A`
      const abii = await fetch(uri)
      const abi = await abii.json()   
        
      
      if(abi.result === 'Contract source code not verified' || abi.message=== "NOTOK" || abi.status === "0"){
        setLoading(false)
        alert("Not a valid contract address")
        throw("Not a valid contract address")
      };

      var MyContract = new web3.eth.Contract(JSON.parse(abi.result), contractAdrs)
      console.log("asset ", MyContract)

      const name = await MyContract.methods.name().call();
      const totalSupply = await MyContract.methods.totalSupply().call();
      console.log("asset ", name)
      console.log("asset ", totalSupply)

      setData(pre => {return {...pre, totalSupply, name,   
        contractInfo: {contractFunctions: MyContract, contractAddrs: contractAdrs}
      }}) 

      if(URl === ""){
        try{
          console.log("asset ", "trying 1")
          const tokenURI1 = await MyContract.methods.tokenURI(321).call();

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

      else {
        try{

          console.log("URi to chck", URl)
          let fetchAPI =  await axios.get(URl) as any          
          console.log("new", fetchAPI.data.attributes)
          console.log("step 2: Fetched attributes from URL ", fetchAPI.data.attributes)
  
          if(fetchAPI  && fetchAPI.data.attributes){
            setData(pre => {return {...pre, baseTokenURI: URl}}) 
  
            dispatch(setProjectInfo({
                    contractAddress: contractAdrs,
                    totalSupply:  Number(totalSupply), 
                    name:  name, 
                    baseTokenURI: URl,
                    range: null
                  }))

            setneedURI(false)
            setNeedrange(true)
            setLoading(false)
            setFieldValue("uri","")


          }
          else {
            setLoading(false)

            alert("Please provide a valid NFT URI and make sure you have installed and enabled Moesif CORS extention ")
            setData(pre => {return {...pre,  baseTokenURI: null}}) 
            dispatch(setProjectInfo({
                contractAddress: contractAdrs, 
                totalSupply:  Number(totalSupply), 
                name:  name, 
                baseTokenURI: null, 
                range: null
              }))
            setneedURI(true)
            
            throw("Not a NFT URL")
          }

        }  catch(error){
              console.error(error)    
              alert("Please provide a valid NFT URI")
              setneedURI(true)
              setLoading(false)
        }
      }


    }

  const startSnipping = async (from: number, to: number) => {
    dispatch(reSetSnipping()) 
    dispatch(setLoadingNFTs(false))
    dispatch(setIsSnipping({action: "requested"}))


    dispatch(setProjectRange({from: from, to: to, range: to - from + 1}))

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
            validationSchema={schema1} 
            onSubmit={async (values, { setSubmitting, setFieldValue  }) => {
            
                dispatch(setUploadedContractAddress(values.address))
                console.log("yesssss")  
                fetchData(values.address, values.uri, setFieldValue)  

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
        <Formik initialValues={{ from: 1, to: 20 }}  
                validationSchema={schema2} 
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

        <div> 
          <p>Set NFT Delay in ms</p>
          <input value={delayNFT} onChange={(e) => handleDelayNFT(e.target.value)} />
          <br />
          <p>Set Opensea Delay in ms</p>
          <input value={delayOpensea} onChange={(e) => handleDelayOpensea(e.target.value)} />
        </div>

    </div>

    )
 };

export default NFTForm;


import React, {useState, useEffect} from "react";
import "./style.css";
import { useDispatch, useSelector } from 'react-redux';
import {Attribute2, AttributesOfEachToekn2, resetProgress, setProgress, setCountOfAllAttribute3, addTokenInList3, reSetSnipping, setIsSnipping, setLoadingNFTs, setProjectRange, setProjectInfo } from '../../../store';
import Grid from "@mui/material/Grid";
import { Form, Formik, Field } from "formik";
import { TextField} from 'formik-material-ui';
import Button from "@mui/material/Button";
const Web3 = require("web3");
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import * as yup from 'yup';
import $ from 'jquery';
import _ from 'underscore';


interface Data {
  contractInfo: {contractFunctions: any, contractAddrs: string},
  totalSupply: string | null, 
  name: string | null,
  minToken: string
  baseTokenURI: string  | null,
}
const initialData = {
  contractInfo: {contractFunctions: null, contractAddrs: ""},
  totalSupply: null, 
  minToken: "1",
  name:  null,
  baseTokenURI: null,
}



const NFTForm = () => {

  // const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io')

  const { projectInfo, isSnipping, progress } = useSelector((state: any) => state);

  const dispatch = useDispatch();


  
  const [data, setData] = useState<Data>(initialData);
  const [loading, setLoading] = useState(false);
  const [needRange, setNeedrange] = useState(false);
  // const [terminate, setTerminate] = useState(false);

  let terminate:boolean = false;
  // let myVar:any;

  // const [revealed, setRevealed] = useState(false);
  // const [stopRetrying, setStopRetrying] = useState(false);
  // const [userDecision, setUserDecision] = useState(false);
  // let flag = false;

  // const getRetryingState = () => {
  //   return progress.retryingToCheckRevealing.ended
  // }
  
  // if(progress.retryingToCheckRevealing.ended){
    // console.log("outside progress.retryingToCheckRevealing.ended", progress.retryingToCheckRevealing.ended);
  // }



  let schema1 = yup.object().shape({
    address: yup.string().length(42, "not a contract address").required(),
    uri: yup.string()
  });

  let schema2 = yup.object().shape({
    from: yup.number().positive().moreThan(projectInfo?.firstTokenIndex - 1, "should be equal or more than minimum token").lessThan(yup.ref("to"), "not a valid range ").required(),
    to: yup.number().positive().moreThan(yup.ref("from"), "not a valid range ").moreThan(1, "should be more than 1").required()
  });

  


  const fetchData = async  ( contractAdrs : string, URl?:string, setFieldValue?: any ) => {

    console.log("fetchData started")

    // console.log("fetchData Started")

      dispatch(setProjectInfo(null))
      setData(initialData)
      setNeedrange(false)
      setLoading(true)

      

      // TODO: Ask ben to provide Infure API Kye
       var web3 = new Web3(new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`)) 
       

      // let uri: string;
      // let abi: any;
      // let abiJSON: any;
      // try{
      //   uri = `https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAdrs}&apikey=*******************`
      //   abi = await fetch(uri)
      //   abiJSON = await abi.json()   
      // } catch(e){
      //   alert("Unabel to find this contract address");
      //   setLoading(false);
      //   throw("Unabel to find this contract address");
      // }

      const uri = `https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAdrs}&apikey=${process.env.REACT_APP_ETHERSCAN_KEY}`
      const abii = await fetch(uri)
      const abi = await abii.json()   
        
      
      if(abi.result === 'Contract source code not verified' || abi.message=== "NOTOK" || abi.status === "0"){
        setLoading(false)
        alert("Not a valid contract address")
        throw("Not a valid contract address")
      };

      var MyContract = new web3.eth.Contract(JSON.parse(abi.result), contractAdrs)

      let name: string = "Undifined";
      let totalSupply: string = "Undifined";
      let minToken: string = "0";
      let tokenURI: string = "";


      try{
        name = await MyContract.methods.name().call();
      } catch(e){
           console.error("Unable to get the name of the project")
      }


      try{
        totalSupply = await MyContract.methods.totalSupply().call();
      } catch(e){

        console.error("Unable to get total supply")
      }


      try{
        minToken = await MyContract.methods.tokenByIndex(0).call();
        if(Number(minToken) > 1){
          minToken = "0"
        }
      } catch(e){
        console.error("Unable to get index of first token")
      }


      try{
        if(totalSupply === "Undifined"){
          tokenURI = await MyContract.methods.tokenURI("123").call();
        } 
        else {
          console.log("tokenURI", String(Number(totalSupply) - 1))
          tokenURI = await MyContract.methods.tokenURI(String(Number(totalSupply) - 1)).call();
          console.log("tokenURI", tokenURI)
        }

      } catch(e){

        do{
          var tokenURIInput = prompt("Please enter Token URI with 'ID' string like in below format  \nhttps://api.lostboy.io/boy/ID \nIncluding token ID ");
          // console.log("tokenURIInput", tokenURIInput)
        } while(tokenURIInput !== null && !tokenURIInput.includes("ID"))   
  
          console.log("tokenURIInput", tokenURIInput)

        if (tokenURIInput != null) {
          console.log("tokenURIInput", tokenURIInput)
          tokenURI = tokenURIInput;
          // 0x06012c8cf97bead5deae237070f9587f8e7a266d
        }
        else {
          console.log("tokenURIInput", tokenURIInput)
          setLoading(false)
          throw("No URL found")
        }
      }
      
      // return;
      // console.log("name ", name)
      // console.log("totalSupply ", totalSupply)
      // console.log("minToken ", minToken)
      // console.log("tokenURI ", tokenURI)
      // console.log("contractInfo: ", {contractFunctions: MyContract, contractAddrs: contractAdrs})
      
      setData({
        totalSupply, 
        name, 
        baseTokenURI: tokenURI,
        minToken : minToken ? minToken : "1", 
        contractInfo: {contractFunctions: MyContract, contractAddrs: contractAdrs}
      })

      dispatch(setProjectInfo({
        contractAddress: contractAdrs,
        totalSupply:  totalSupply, 
        name:  name, 
        baseTokenURI: tokenURI,
        firstTokenIndex: minToken,
        range: null,
        loadingProgree: 0,
        processingProgress: 0
      }))

      setNeedrange(true)
      setLoading(false)



      // if(URl === ""){
      //   try{
      //     console.log("asset ", "trying 1")
      //     const tokenURI1 = await MyContract.methods.tokenURI(String(Number(totalSupply) - 1)).call();

      //     setData(pre => {return {...pre, baseTokenURI: tokenURI1}}) 

      //     dispatch(setProjectInfo({
      //             contractAddress: contractAdrs,
      //             totalSupply:  Number(totalSupply), 
      //             name:  name, 
      //             baseTokenURI: tokenURI1,
      //             range: null,
      //             firstTokenIndex: minToken,
      //             loadingProgree: 0,
      //             processingProgress: 0
      //           }))
            
      //     setneedURI(false)
      //     setNeedrange(true)
      //     setLoading(false)

          
      //   }  catch(error){    
      //         console.log("asset ", "Error fetching URI from useNFT hook too")
      //         alert("Please provide NFT URI")
      //         setData(pre => {return {...pre,  baseTokenURI: null}}) 
      //         dispatch(setProjectInfo({
      //             contractAddress: contractAdrs, 
      //             totalSupply:  Number(totalSupply), 
      //             name:  name, 
      //             baseTokenURI: null, 
      //             range: null,
      //             firstTokenIndex: minToken,
      //             loadingProgree: 0,
      //             processingProgress: 0


      //           }))
      //         setneedURI(true)
      //         setLoading(false)
      //   }
      // }

      // else {
      //   try{

      //     console.log("URi to chck", URl)
      //     let fetchAPI =  await axios.get(URl) as any          
      //     console.log("new", fetchAPI.data.attributes)
      //     console.log("step 2: Fetched attributes from URL ", fetchAPI.data.attributes)
  
      //     if(fetchAPI  && fetchAPI.data.attributes){
      //       setData(pre => {return {...pre, baseTokenURI: URl}}) 
  
      //       dispatch(setProjectInfo({
      //               contractAddress: contractAdrs,
      //               totalSupply:  Number(totalSupply), 
      //               name:  name, 
      //               baseTokenURI: URl,
      //               range: null,
      //               firstTokenIndex: minToken,
      //               loadingProgree: 0,
      //               processingProgress: 0

      //             }))

      //       setneedURI(false)
      //       setNeedrange(true)
      //       setLoading(false)
      //       setFieldValue("uri","")


      //     }
      //     else {
      //       setLoading(false)

      //       alert("Please provide a valid NFT URI and make sure you have installed and enabled Moesif CORS extention ")
      //       setData(pre => {return {...pre,  baseTokenURI: null}}) 
      //       dispatch(setProjectInfo({
      //           contractAddress: contractAdrs, 
      //           totalSupply:  Number(totalSupply), 
      //           name:  name, 
      //           baseTokenURI: null, 
      //           range: null,
      //           firstTokenIndex: minToken,
      //           loadingProgree: 0,
      //           processingProgress: 0


      //         }))
      //       setneedURI(true)
            
      //       throw("Not a NFT URL")
      //     }

      //   }  catch(error){
      //         console.error(error)    
      //         alert("Please provide a valid NFT URI")
      //         setneedURI(true)
      //         setLoading(false)
      //   }
      // }


  }



  const startSnipping = async (from: number, to: number) => {
    dispatch(resetProgress());
    dispatch(reSetSnipping());

    console.log("startSnipping Started", data)

    dispatch(setProgress({action: "snip", status: "started"}));


    dispatch(setLoadingNFTs(false))
    // dispatch(setIsSnipping({action: null}))
    dispatch(setIsSnipping({action: "requested"}))


    dispatch(setProjectRange({from: from, to: to, range: to - from + 1}))

    if(data?.baseTokenURI && data?.baseTokenURI?.includes("ipfs://")) {
      let url = data?.baseTokenURI?.replace("ipfs://", "https://ipfs.io/ipfs/");
      fetchAllTokenData(url, from, to)
    }
    else if(data?.baseTokenURI && data?.baseTokenURI?.includes("https://gateway.pinata.cloud/ipfs/")){
      let url = data?.baseTokenURI?.replace("https://gateway.pinata.cloud/ipfs/", "https://ipfs.io/ipfs/");
      fetchAllTokenData(url, from, to)
    }
    else if(data?.baseTokenURI && data?.baseTokenURI?.includes("http://")){
      let url = data?.baseTokenURI?.replace("http://", "https://")
      fetchAllTokenData(url, from, to)
    }      
    else if(data?.baseTokenURI && data?.baseTokenURI?.includes("https://")){
      let url = data?.baseTokenURI
      fetchAllTokenData(url, from, to)
    }      


  }


  const fetchAllTokenData = async (URI: string, from: number, to: number) => {

    console.log("fetchAllTokenData started")
   
    
    let tokenURI = URI

    if(tokenURI.includes("ID")){
      if(projectInfo.totalSupply === "Undifined"){
        tokenURI = tokenURI.replace("ID", "123")
      }
      else{
        console.log("tokenURI", String(Number(projectInfo.totalSupply) - 1));
        tokenURI = tokenURI.replace("ID", String(Number(projectInfo.totalSupply) - 1))
      }
     }
    
    try{
      let fetchAPI =  await axios.get( tokenURI ) as any
      // console.log("fetchAPI res", fetchAPI)    
    } catch(e){
      alert("Unable to fetch information. Make sure you have installed and enabled Moesif CORS extention and refresh the page")
      dispatch(resetProgress());
      dispatch(reSetSnipping());
      throw("Aborting")
    }
    
              
    let url = tokenURI;    
      
    if(projectInfo?.totalSupply){
      if(projectInfo.totalSupply === "Undifined"){
        url = tokenURI.replace( "123", "extension");
      } 
      else {
        url = tokenURI.replace( String(Number(projectInfo.totalSupply) - 1), "extension");
      }
    }

    const arrayEquals = (a: any, b:any) => {
      // return JSON.stringify(a) == JSON.stringify(b)
      return _.isEqual(a, b);
    // if (a == null || b == null) return false;
    // if (a.length !== b.length) return false;
    // if (a === b) return true;
  

        // Array.isArray(a) &&
        // Array.isArray(b) &&
        // a.length === b.length &&
        // a.every((val, index) => val === b[index]);
    }
  
    const checkURI = (rawURI: string) => {
      if(rawURI.includes("ipfs://")) {
        let url = rawURI.replace("ipfs://", "https://ipfs.io/ipfs/");
        return url;
      }
      else if(rawURI.includes("https://gateway.pinata.cloud/ipfs/")){
        let url = rawURI.replace("https://gateway.pinata.cloud/ipfs/", "https://ipfs.io/ipfs/");
        return url;
      }
      else if(rawURI.includes("http://")){
        let url = rawURI.replace("http://", "https://")
        return url;
      }      
      else if(rawURI.includes("https://")){
        // let url = data?.baseTokenURI
        return rawURI;
      }
      else {
        return rawURI;
      }
    }

    const isRevealed = async () => {

        let freshTokenURI_1 = await data.contractInfo.contractFunctions.methods.tokenURI(1).call();
        freshTokenURI_1 = checkURI(freshTokenURI_1);
        console.log("freshTokenURI", freshTokenURI_1);
        // const url_test_1 = url.replace( "extension", "1");
        // console.log(url_test_1)
        const res_test_1:any = await axios.get(freshTokenURI_1);
        const attributes_1 = res_test_1.data.attributes ? res_test_1.data.attributes : [];
        
        let freshTokenURI_2 = await data.contractInfo.contractFunctions.methods.tokenURI(2).call();
        freshTokenURI_2 = checkURI(freshTokenURI_2);
        console.log("freshTokenURI_2", freshTokenURI_2);
        // const url_test_2 = url.replace( "extension", "2");
        // console.log(url_test_2)
        const res_test_2:any = await axios.get(freshTokenURI_2);
        const attributes_2 = res_test_2.data.attributes ? res_test_2.data.attributes : [];
        
        let freshTokenURI_3 = await data.contractInfo.contractFunctions.methods.tokenURI(3).call();
        freshTokenURI_3 = checkURI(freshTokenURI_3);

        console.log("freshTokenURI_3", freshTokenURI_3);
        // const url_test_3 = url.replace( "extension", "3");
        // console.log(url_test_3)        
        const res_test_3:any = await axios.get(freshTokenURI_3);
        const attributes_3 = res_test_3.data.attributes ? res_test_3.data.attributes : [];
        
        console.log(attributes_1);
        console.log(attributes_2);
        console.log(attributes_3);

        console.log("test 1", arrayEquals(attributes_1, attributes_2));
        console.log("test 2", arrayEquals(attributes_2, attributes_3));
        console.log("test 3", arrayEquals(attributes_1, attributes_3));
        
  
  
        const revealedd = !(arrayEquals(attributes_1, attributes_2) && arrayEquals(attributes_2, attributes_3) && arrayEquals(attributes_1, attributes_3))
        return revealedd
        
      }
            
      let rev:any;
      
      if(!terminate){
        
        rev = await isRevealed();
        console.log("=================================> ")
        console.log("Project revealed status => ", rev)
        console.log("=================================> ")
    

      if(!rev){

            const userDecisionnn = confirm("Not revealed yet. Want to continuesly try again n again to be the first one to see when it will unrevealed")
            // console.log("userDecision => ", userDecisionnn)
            
            if(userDecisionnn){

              dispatch(setProgress({action: "retrying", status: "started"}));

              console.log("terminate outsite => ", terminate)

              const delayFn = (ms:number) => new Promise((r) => setTimeout(r, ms));

              while(!terminate){
                await delayFn(500);

                console.log("retrying")

                let revv = await isRevealed();

                console.log("isRevealed => ", revv)
                console.log("terminate => ", terminate)
            
                
                  
                if(revv){
                  dispatch(setProgress({action: "retrying", status: "ended"}));
                  break;
                }

                if(terminate){
                  dispatch(resetProgress());
                  dispatch(reSetSnipping());
                  // throw("Aborting!!!!!")
                  return;
                  // break;

                }

              }

              // if(terminate){
              //     dispatch(resetProgress());
              //     dispatch(reSetSnipping());
              //     return;
              //         // throw("Aborting!!!!1") 
              // }


            }
            else {
              dispatch(resetProgress());
              dispatch(reSetSnipping());
              throw("Aborting!!!!!")
            }
       }
      } 
      else {
        return;
      }

    console.log("trying to go ahead")

    // const delayFn = (ms:number) => new Promise((r) => setTimeout(r, ms));

    // await delayFn(5000);
    // console.log("trying to go ahead")
    // await delayFn(5000);


    // return;


    let allRequests:any = [];
    const requestingAllAPIs = async (iteration: number, url: string, 
                                    _from: number, _to: number, from: number, to: number) => {

      dispatch(setIsSnipping({action: "started"}))         

      const need = to >= _from;
      if(need){
      
        // console.log("==========================================================")
        // console.log("iteration ",  iteration)
        // console.log("==========================================================")

        const start = iteration === 1 ? from : _from;
        const end = to < _to ? to : _to;
        let requests:any = [];

        for(var i = start;  i <= end;  i=i+1) {         
          let activeURL =  url.replace("extension" , String(i))
          console.log("Loop #",  i, activeURL )
          const request = axios.get( activeURL,  {data: i})
          requests.push(request)              
        }

        const responses:any = await Promise.allSettled(requests);
        // console.log("Combined responses of opensea ", responses)
        allRequests.push(responses)

      }

    }
                  
      // console.log("step 1: Snipping started with URL ", url)
      dispatch(setProgress({action: "dataFetch", status: "started"}));
      // const delayFn = (ms:number) => new Promise((r) => setTimeout(r, ms));

      console.log("Test token data fetching starts")
      console.log("Test", `${new Date().getMinutes()}:${new Date().getSeconds()}`)
      console.log("fetchAllTokenData url", url)


      await requestingAllAPIs(1, url, 0, 1000, from, to)
      await requestingAllAPIs(2, url, 1001, 2000, from, to)
      await requestingAllAPIs(3, url, 2001, 3000, from, to)
      await requestingAllAPIs(4, url, 3001, 4000, from, to)
      await requestingAllAPIs(5, url, 4001, 5000, from, to)
      await requestingAllAPIs(6, url, 5001, 6000, from, to)
      await requestingAllAPIs(7, url, 6001, 7000, from, to)
      await requestingAllAPIs(8, url, 7001, 8000, from, to)
      await requestingAllAPIs(9, url, 8001, 9000, from, to)
      await requestingAllAPIs(10, url, 9001, 10000, from, to)
      await requestingAllAPIs(11, url, 10001, 11000, from, to)
      await requestingAllAPIs(12, url, 11001, 12000, from, to)
      await requestingAllAPIs(13, url, 12001, 13000, from, to)
      await requestingAllAPIs(14, url, 13001, 14000, from, to)
      await requestingAllAPIs(15, url, 14001, 15000, from, to)

      console.log("Test", `${new Date().getMinutes()}:${new Date().getSeconds()}`)
      console.log("Test token data fetching ends")

      dispatch(setProgress({action: "dataFetch", status: "ended"}));


      let allTokens: AttributesOfEachToekn2 = {};
      let allAttributes: any = {};

      dispatch(setProgress({action: "dataProcess", status: "started"}));

      console.log("Test loop over all tokens starts")
      console.log("Test", `${new Date().getMinutes()}:${new Date().getSeconds()}`)


      let allRawTokens: any = allRequests.flat();
      
      allRawTokens.forEach((token :any, key: number) => {

        if(token.status === 'fulfilled'){

          let attributes:any = {}
          let values:any = {}

          let rawAttributes = token.value.data.attributes ? token.value.data.attributes : [];
          let trait_count = token.value.data.attributes ? token.value.data.attributes.length : 0
    
          rawAttributes?.forEach((attribute: any)=> {     

            // console.log(attribute)
            
            if( attribute.trait_type && attribute.value ){
              values["trait_type"] = attribute.trait_type
              values["trait_value"] = attribute.value
              values[attribute.value] = {trait_type: attribute.trait_type, value: attribute.value}
              attributes[attribute.trait_type] = values
              values = {}
            }

            if( attribute.value && (String(attribute.value).toLowerCase() === "none" || String(attribute.value).toLowerCase() === "nothing")){
              if(trait_count > 0){
                trait_count--
              }
            }
          })
    

          values["trait_value"] = trait_count
          values["trait_type"] =  "trait_count"
          values[trait_count] = {trait_type: "trait_count", value: trait_count}
          attributes["trait_count"] = values
          values = {}

          const newTokens: any = {
            rank: 0,
            normalized_rank: 0,
            tokenID: token.value.config.data,
            attributes: attributes,
            opensea: {price: 0, permalink: ""},
            rarity_score: 0,
            normalized_rarity_score: 0,
            image: token.value.data.image,
            title: token.value.data.title? token.value.data.title: "",
            name: token.value.data.name? token.value.data.name: `#${String(token.value.config.data)}`
          }
                        
            allAttributes[newTokens.tokenID] = newTokens.attributes;       
            allTokens[newTokens.tokenID] = newTokens;


        }

      })

      console.log("Test", `${new Date().getMinutes()}:${new Date().getSeconds()}`)
      console.log("Test loop over all tokens ends")

      // console.log(allAttributes)
      // console.log(allTokens)
      
      dispatch(addTokenInList3(allTokens))
      dispatch(setCountOfAllAttribute3(allAttributes as Attribute2))
      
      // return;
      // return;

      ////////////////////////////////////////////////

      dispatch(setProgress({action: "dataProcess", status: "ended"}));
      dispatch(setIsSnipping({action: "completed"}))

  }


  const haltProgram = () => {
    dispatch(setIsSnipping({action: null}))
  }

  $(document).on('click','#end', () => {
    console.log("calling stopFunction  ===========================>")
    terminate = true;
  });

  // $('#end').on('click', () => {
  //     console.log("calling stopFunction  ===========================>")
  //     terminate=true;
  //   });                   

  return (
   <div className="parent-container"> 

    <div className="form-container" >

    <Formik initialValues={{ address: ''}}
            validationSchema={schema1} 
            onSubmit={async (values, { setFieldValue  }) => {
                // dispatch(setUploadedContractAddress(values.address))
                fetchData(values.address)  
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
        //  needURI ? 
        //   <Grid item xs={12}>
        //       <Field
        //         component={TextField}
        //         type="text"
        //         name="uri"
        //         label={`NFT URI ${(needURI ? "(Needed)" : "(Optional)")}`}
        //         fullWidth
        //       />
        //   </Grid> 
        //   : 
        //   null
       } 

        <div className="form-button-container">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="form-button"
          >
                  <div >Load Contract</div>

            {
              // needURI ?
              //     <div >Enter URI </div> :    
              //     <div >Load Contract</div>
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
                <div> Tokens start from : {data?.minToken} </div>  :
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
        <Formik initialValues={{ from: Number(data.minToken), 
          to: data.totalSupply === "Undifined" ? 10000 :
          Number(data.totalSupply) + Number(data.minToken) - 1  
        
        }} 

                validationSchema={schema2} 
                onSubmit={async (values) => {
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
                      minimum={0}
                      fullWidth
                      />
                  </Grid>

                  <Grid item xs={6}>
                    <Field
                      component={TextField}
                      type="number"
                      name="to"
                      label="To"
                      minimum={0}
                      fullWidth
                      />
                  </Grid>

                  <div className="form-button-container">
                    {
                      isSnipping.started && !isSnipping.completed ?
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={haltProgram}
                          className="form-button"
                          // disabled={isSnipping.started? true: false}
                          >
                                    <div >Reset </div>
                        </Button> 
                        :
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          className="form-button"
                          >
                                    <div >Snip </div>
                        </Button>

                    }

                  </div>
        
              {
                progress.retryingToCheckRevealing.started ?
                <div className="form-button-container">
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className="form-button"
                        id="end"
                        >
                                  <div > Stop retrying </div>
                      </Button> 
                </div>: null
              }

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


import React, {useState, useEffect} from "react";
import "./style.css";
import { useDispatch, useSelector } from 'react-redux';
import {setLoadingProgress, setCountOfAllAttribute3, setOpenseaData2, addTokenInList3, addTokenInList2, setCountOfAllAttribute2, setInitialCountOfAllAttribute2, setOpenseaData, TraitCount, reSetSnipping, setIsSnipping, setLoadingNFTs, setProjectRange, setProjectInfo, ProjectInfo, Attribute, setInitalCountOfAllAttribute, setCountOfAllAttribute, setUploadedContractAddress, setAvailableAttributes, CountOfEachAttribute, addTokenInList, AttributesOfEachToekn } from '../../../store';
import Grid from "@mui/material/Grid";
import { Form, Formik, Field } from "formik";
import { TextField} from 'formik-material-ui';
import Button from "@mui/material/Button";
const Web3 = require("web3");
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import * as yup from 'yup';
import async  from "async";
var request = require('request') // https://www.npmjs.com/package/request



interface Data {
  contractInfo: {contractFunctions: any, contractAddrs: string},
  totalSupply: string | null, 
  name: string | null,
  minToken: string
  baseTokenURI: string  | null,
  // attributes: any  |  null,
  // uri : string | null
}
const initialData = {
  contractInfo: {contractFunctions: null, contractAddrs: ""},
  totalSupply:  null, 
  minToken: "1",
  name:  null,
  baseTokenURI: null,
  // attributes: null,
  // uri : null
}


const NFTForm = () => {

  const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io')

  const { projectInfo, isSnipping, countOfAllAttribute2, list_of_all_tokens2, list_of_all_tokens } = useSelector((state: any) => state);
  // console.log("countOfAllAttribute2", countOfAllAttribute2)
  // console.log("list_of_all_tokens2", list_of_all_tokens2)

  const dispatch = useDispatch();


  
  const [data, setData] = useState<Data>(initialData);
  const [loading, setLoading] = useState(false);
  const [needURI, setneedURI] = useState(false);
  const [needRange, setNeedrange] = useState(false);
  const [delayNFT, setDelayNFT] = useState(0);
  const [delayOpensea, setDelayOpensea] = useState(0);

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
    from: yup.number().positive().moreThan(projectInfo?.firstTokenIndex - 1, "should be equal or more than minimum token").lessThan(yup.ref("to"), "not a valid range ").required(),
    to: yup.number().positive().lessThan(projectInfo?.totalSupply + 1, "Should be less then total supply").moreThan(yup.ref("from"), "not a valid range ").moreThan(1, "should be more than 1").required()
  });

  
  const fetchAllTokenData = async (tokenURI: string, from: number, to: number) => {

    try{
      let fetchAPI =  await axios.get( tokenURI ) as any      
      console.log("fetchAPI res", fetchAPI)    
    } catch(e){
      alert("Unable to fetch information. Make sure you have installed and enabled Moesif CORS extention")
      throw("Aborting")
    }
    
                
      let allRequests:any = [];

      const requestingAllAPIs = async (iteration: number, url: string, 
                                      _from: number, _to: number, from: number, to: number) => {

        const need = to >= _from;
        if(need){
        
          console.log("==========================================================")
          console.log("iteration ",  iteration)
          console.log("==========================================================")

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
          console.log("Combined responses of opensea ", responses)
          allRequests.push(responses)

        }

      }
                  
      let url = tokenURI;    
      
      if(projectInfo?.totalSupply){
          url = tokenURI.replace( String(Number(projectInfo.totalSupply) - 1), "extension");
      }

      console.log("step 1: Snipping started with URL ", url)

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

      console.log(allRequests.flat());

      dispatch(setIsSnipping({action: "started"}))         


      let allTokens: any = [];
      let allAttributes: any = [];


      let allRawTokens: any = allRequests.flat();
      allRawTokens.forEach((token :any) => {
        if(token.status === 'fulfilled'){

          console.log(token.value.data)

          let attributes = token.value.data.attributes
          let trait_count = token.value.data.attributes.length
          console.log("trait_count", trait_count)
    
          token.value.data.attributes.forEach((attribute: any)=> {
            if(attribute.value && String(attribute.value).toLowerCase() === "none"){
              console.log("attribute.value matched", attribute.value)
              trait_count--
            }
          })
    
          attributes.push({trait_type: "trait_count", value: trait_count})
          console.log("trait_count", trait_count)
          allAttributes.push(attributes)            
  
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
                name: token.value.data.name? token.value.data.name: "" 
              }
  
          allTokens.push(newTokens)

        }

      })

      console.log("allTokens", allTokens)
      dispatch(addTokenInList3(allTokens))
      dispatch(setCountOfAllAttribute3(allAttributes))          

      ////////////////////////////////////////////////

      dispatch(setIsSnipping({action: "completed"}))


  }

  const fetchData = async  ( contractAdrs : string, URl?:string, setFieldValue?: any ) => {

      setData(initialData)
      setNeedrange(false)
      setLoading(true)

      // TODO: Ask ben to provide Infure API Kye
       var web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/767a0bfaa2ba4ef6b9fc954a84712a26')) 
       

      // let uri: string;
      // let abi: any;
      // let abiJSON: any;
      // try{
      //   uri = `https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAdrs}&apikey=WKEB4C6A8MPPIYF5699I3A1ZEII57MXG2A`
      //   abi = await fetch(uri)
      //   abiJSON = await abi.json()   
      // } catch(e){
      //   alert("Unabel to find this contract address");
      //   setLoading(false);
      //   throw("Unabel to find this contract address");
      // }

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



      let name: string = "";
      let totalSupply: string = "10000";
      let minToken: string = "0";
      let tokenURI: string = "";


      try{
        name = await MyContract.methods.name().call();
      } catch(e){
        do{
          var nameOfProject = prompt("Please enter name of the project \nName i.e. Crypto Kitties");
        } while(nameOfProject === "")   

        if (nameOfProject != null) {
          console.log(nameOfProject)
          name = nameOfProject;
        }
      }


      try{
        totalSupply = await MyContract.methods.totalSupply().call();
      } catch(e){

        console.error("Unable to get total supply")
        totalSupply = "123"
        // do{
        //   var totalSupplyOfProject = prompt("Please enter Total supply of tokens \nTotal supply i.e. 10000 or 9999");
        // } while(totalSupplyOfProject === "")   

        // if (totalSupplyOfProject != null) {
        //   console.log(totalSupplyOfProject)
        //   totalSupply = totalSupplyOfProject;

        // }
      }


      try{
        minToken = await MyContract.methods.tokenByIndex(0).call();
        if(Number(minToken) > 1){
          minToken = "0"
        }
      } catch(e){

        console.error("Unable to get index of first token")

        // do{
        //   var minTokenOfProject = prompt("Please enter first token ID of the porject \ne.i. 0 or 1");
        // } while(minTokenOfProject === "")   

        // if (minTokenOfProject != null) {
        //   console.log(minToken)
        //   minToken = minToken;
        //   if(Number(minToken) > 1){
        //     minToken = "0"
        //   }
        // }
      }


      try{
        tokenURI = await MyContract.methods.tokenURI(String(Number(totalSupply) - 1)).call();
      } catch(e){

        do{
          var tokenURIInput = prompt("Please enter Token URI in below format  \nhttps://api.lostboy.io/boy/5135 \nIncluding token ID ");
        } while(tokenURIInput === "")   

        if (tokenURIInput != null) {
          console.log(tokenURIInput)
          tokenURI = tokenURIInput;
        }
      }
      
      
      console.log("name ", name)
      console.log("totalSupply ", totalSupply)
      console.log("minToken ", minToken)
      console.log("tokenURI ", tokenURI)
      console.log("contractInfo: ", {contractFunctions: MyContract, contractAddrs: contractAdrs})
      
      setData({
        totalSupply, 
        name, 
        baseTokenURI: tokenURI,
        minToken : minToken ? minToken : "1", 
        contractInfo: {contractFunctions: MyContract, contractAddrs: contractAdrs}
      })

      dispatch(setProjectInfo({
        contractAddress: contractAdrs,
        totalSupply:  Number(totalSupply), 
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

    dispatch(reSetSnipping())
    dispatch(setLoadingNFTs(false))
    // dispatch(setIsSnipping({action: null}))
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

  const haltProgram = () => {
    // window.stop();
    dispatch(setIsSnipping({action: null}))

  }

  return (
   <div className="parent-container"> 

    <div className="form-container" >

    <Formik initialValues={{ address: '0xc1a1e381389cb927f1d57511e144b644ef0c6385'}}
            validationSchema={schema1} 
            onSubmit={async (values, { setFieldValue  }) => {
            
                dispatch(setUploadedContractAddress(values.address))
                console.log("yesssss")  
                // fetchData(values.address, values.uri, setFieldValue)  
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
                <div> BaseTokenURI : {data?.baseTokenURI.replace(data?.totalSupply ?  String(Number(data.totalSupply) - 1) : "123", "[ID]")} </div> : 
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
        <Formik initialValues={{ from: Number(data.minToken), to: 100 }}  
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
                          // disabled={isSnipping.started? true: false}
                          >
                                    <div >Snip </div>
                        </Button>

                    }

                  </div>
        
                </Grid>  
                
              </Form>
            )}
        </Formik> :
        null

    }

      </div>

        <div> 
          {/* <p>Set NFT Delay in ms</p>
          <input value={delayNFT} onChange={(e) => handleDelayNFT(e.target.value)} />
          <br />
          <p>Set Opensea Delay in ms</p>
          <input value={delayOpensea} onChange={(e) => handleDelayOpensea(e.target.value)} />  */}
        </div>

    </div>

    )
 };

export default NFTForm;


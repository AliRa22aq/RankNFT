import  React, {useEffect, useState} from "react";
import "./style.css";
// import { intervalToDuration, formatDistanceToNow } from 'date-fns'
import { useSelector, useDispatch } from 'react-redux';
import { setProcessingProgress, setLoadingProgress, setOpenseaData, assignRank, setIsSnipping, setOnlyOnSaleState, setOpenseaData2, getTop20NFTs, addTokenInList3, AttributesOfEachToekn2, setRarityScoreToAttributeValue2, setRarityScoreToEachNFTAttribuValue2, CountOfEachAttribute2Values, CountOfEachAttribute2, sortByPrice, sortByTokenID, sortByRarityScore, RarityScoreOfValue,setRarityScoreToEachNFTAttribuValue, setRarityScoreToAttributeValue, TraitCount, Attribute, AttributesOfEachToekn, CountOfEachAttribute, setCountOfAllAttribute2 } from '../../../store';
const Web3 = require("web3");
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import NFTCard from "../nftCard";
import RarityReport from "../RarityReport/RarityReport";
import ProgressReport from "../RarityReport/ProgressReport";
import axios from "axios";

// import { OpenSeaPort, Network  } from 'opensea-js'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


const NFTCards = () => {
  
  const dispatch = useDispatch();
  const [normalization, setNormalization] = useState(false)
  const [onlyOnSale, setOnlyOnSale] = useState(false)
  const [page, setPage] = useState(1)
  const [list_of_NFTs_for_currentPage, set_list_of_NFTs_for_currentPage] = useState<AttributesOfEachToekn[] | null>([])
  const [sortBy, setSortBy] = useState<number>(1);

  
  const { list_of_all_tokens_remaining, list_of_all_tokens_top_20, countOfAllAttribute2, list_of_all_tokens2, isSnipping, countOfAllAttribute, projectInfo, list_of_all_tokens, rarityScoreOfAllValues } = useSelector((state: any) => state);
  
  
  console.log("list_of_all_tokens", list_of_all_tokens)


  const handleSort = (e: number) => {
    // console.log(e)
    setSortBy(e);
    if(e === 1){
      dispatch(sortByRarityScore("decs"))
    }
    if(e === 2){
      dispatch(sortByRarityScore("accs"))
    }
    if(e === 3){
      dispatch(sortByPrice("decs"))
    }
    if(e === 4){
      dispatch(sortByPrice("accs"))
    }
    if(e === 5){
      dispatch(sortByTokenID("decs"))
    }
    if(e === 6){
      dispatch(sortByTokenID("accs"))
    }
    
  };
      
  const handleNormalization = () => {
    setNormalization(!normalization)
  }

  const handleOnSale = () => {

    if(onlyOnSale === false){
      console.log("onlyOnsale", onlyOnSale)
      setOnlyOnSale(true)
      handlePage(0,1)
      dispatch(setOnlyOnSaleState(!onlyOnSale))
      handleSort(3)  
      // handleSort(1)    

    }
    else if(onlyOnSale === true){
      console.log("onlyOnsale", onlyOnSale)
      setOnlyOnSale(false)
      handlePage(0,1)
      dispatch(setOnlyOnSaleState(!onlyOnSale))
      handleSort(1)    
    }
  }
  

  const findRarityScore = () => {

    // dispatch(setRarityScoreToAttributeValue(null))

    // const totalSupply:number = projectInfo && projectInfo.range.range
    // // console.log("totalSupply ", totalSupply)

    // // Normalized Scoring
    // if(countOfAllAttribute){
  
    //   // console.log("Normalization is on")
    //   let traits_count = 0;
      
    //   countOfAllAttribute.map((eachAttribute: CountOfEachAttribute) => {
    //     traits_count = traits_count + eachAttribute.total_variations
    //   })
      
    //   const attribute_count_in_categories = countOfAllAttribute.length;
    //   const average_trait_count = traits_count/countOfAllAttribute.length;
      
    //   // console.log("traits_count",traits_count )
    //   // console.log("attribute_count_in_categories",attribute_count_in_categories )

    //   countOfAllAttribute.map((eachAttribute: CountOfEachAttribute) => {

    //     eachAttribute.trait_count && eachAttribute.trait_count.map((eachValue: TraitCount) => {

    //       const chance_of_occuring = eachValue.count/totalSupply;
    //       const rarity_score = 1/chance_of_occuring;

    //       const normalized_score = rarity_score * average_trait_count / attribute_count_in_categories;
    //       const final_normalized_score = normalized_score / 2;

    //       // const rarity_score_of_each_value: RarityScoreOfValue = {
    //       //   value: eachValue.value,  rarity_score: rarity_score , normalized_rarity_score:  final_normalized_score
    //       // }
    //       const rarity_score_of_each_value: RarityScoreOfValue = {
    //         trait_type: eachAttribute.trait_type,
    //         value: eachValue.value,  
    //         rarity_score: rarity_score , 
    //         normalized_rarity_score:  final_normalized_score
    //   }

    //       // console.log("aliiiii", rarity_score_of_each_value)
    //       dispatch(setRarityScoreToAttributeValue(rarity_score_of_each_value))
    //       dispatch(setRarityScoreToEachNFTAttribuValue(rarity_score_of_each_value))

    //     })
    //   })
    // }
    // // dispatch(sortByRarityScore())
    // handleInputLength()
    // // setShowNFTs(true)

  }

  const fetchOpenseaData = async (iteration: number, min: number, max?:number) => {

    let arrayOfLinks: any = [];
    let count = 1
    const initialLink = `https://api.opensea.io/api/v1/assets?asset_contract_address=${projectInfo?.contractAddress}`;

    console.log(`Progersss Start - iteration: ${iteration} `)

    if(list_of_all_tokens){
  
      const activeTokens = max? list_of_all_tokens.slice(min,max) : list_of_all_tokens.slice(min)
    
      console.log("top.length ", activeTokens.length)
      
      if(activeTokens.length > 0) {
  
      let link = initialLink;
  
      activeTokens.forEach((token: any, key: number) => {
        console.log(`${key+1} ---> ${token.tokenID} ->  ${token.rarity_score}`)
        link = link.concat(`&token_ids=${token.tokenID}`);
        if(count%30==0 || count === activeTokens.length){
          arrayOfLinks.push(link.concat("&limit=30"))
          link = initialLink;
        }
        count++
      })
  
      console.log("arrayOfLinks", arrayOfLinks)
      // console.log(`arrayOfLinks - ${i} `, arrayOfLinks)
  
      // const delayFn = (ms:number) => new Promise((r) => setTimeout(r, ms));

      
        let opensea_requests: any = [];
        let opensea_responses: any = [];

        for(var i = 0;  i < arrayOfLinks.length;  i=i+1) {
          const request = axios.get(arrayOfLinks[i])
          opensea_requests.push(request)
        }

        const responses:any = await Promise.allSettled(opensea_requests);

        responses.forEach((opensea_each_res: any) => {
          if(opensea_each_res.status === 'fulfilled'){
            opensea_responses.push(opensea_each_res.value.data.assets)
          }
        })
        
        console.log("all OpenSea Responses ", opensea_responses.flat())
        dispatch(setOpenseaData(opensea_responses.flat()))
  
      }
    }
  }

  const getTopRatedNFTs = async () => {
    const delayFn = (ms:number) => new Promise((r) => setTimeout(r, ms));

    await fetchOpenseaData(1, 0, 3300);
    await delayFn(20000)
    await fetchOpenseaData(2, 3301, 6600);
    await delayFn(20000)
    await fetchOpenseaData(2, 6601, 10000);


  }

  const getRemainingNFTs = async () => {
    // const delayFn = (ms:number) => new Promise((r) => setTimeout(r, ms));

    // let arrayOfLinks: any = [];
    // let count = 1
    // const initialLink = `https://api.opensea.io/api/v1/assets?asset_contract_address=${projectInfo?.contractAddress}`;
      
    //   console.log("list_of_all_tokens", list_of_all_tokens)
    //   if(list_of_all_tokens){
      

    //   const ramaining80 = list_of_all_tokens.slice(1500)
    //   let link = initialLink;
    //   ramaining80.forEach((token: any) => {
    //     console.log(`${token.tokenID} ->  ${token.rarity_score}`)
    //     link = link.concat(`&token_ids=${token.tokenID}`);
    //     if(count%30==0 || count === ramaining80.length){
    //       arrayOfLinks.push(link.concat("&limit=30"))
    //       link = initialLink;
    //     }
    //     count++
    //   })

    //   console.log("remaining arrayOfLinks", arrayOfLinks)

    //   await delayFn(5000)

    //   // const opensea_apis: any = [];
    //   const opensea_res: any = [];
    //   // arrayOfLinks.map(async (opensea_api:any)=> {
    //   //     await delayFn(5000)
    //   //     console.log("opensea_link", opensea_api)
    //   //     const res:any = await axios.get(opensea_api)
    //   //     opensea_res.push(res.data.assets)
          
    //   //   })
    //   for(let i = 0; i < arrayOfLinks.length; i++){
    //     await delayFn(5000)
    //     console.log("opensea_link", arrayOfLinks[i])
    //     axios.get(arrayOfLinks[i]).then((res:any)=> {
    //        opensea_res.push(res.data.assets)
    //     })
    //   }
        


    //   await delayFn(5000)

    //   console.log("final opensea_res ",  opensea_res.flat())
    //   dispatch(setOpenseaData(opensea_res.flat()))   
    // }
  }
    
  const findRarityScore2 = async () => {

    // const delayFn = (ms:number) => new Promise((r) => setTimeout(r, ms));


    const totalSupply:number = projectInfo && projectInfo.range && projectInfo.range.range

    // Normalized Scoring
    if(countOfAllAttribute2){
  
      // console.log("Normalization is on")
      let traits_count = 0;

      // console.log("countOfAllAttribute2 ", countOfAllAttribute2)
      
      Object.values(countOfAllAttribute2).map((eachAttribute: any) => {
        // console.log("countOfAllAttribute2 ", eachAttribute)
          traits_count = traits_count + eachAttribute.total_variations
        })
        

        //  console.log("countOfAllAttribute2 Values", Object.keys(countOfAllAttribute2))
        const attribute_count_in_categories = Object.keys(countOfAllAttribute2).length;
        const average_trait_count = traits_count/attribute_count_in_categories;
        
        // console.log("countOfAllAttribute2 attribute_count_in_categories",attribute_count_in_categories )
        // console.log("countOfAllAttribute2 average_trait_count",average_trait_count )
        
          Object.values(countOfAllAttribute2).map((eachAttribute: any, key: number) => {
              
              // dispatch(setProcessingProgress(key+1))
          
              Object.values(eachAttribute.trait_count).map((eachValue: any) => {
            
                  const chance_of_occuring = eachValue.count/totalSupply;
                  const rarity_score = 1/chance_of_occuring;

          const normalized_score = rarity_score * average_trait_count / attribute_count_in_categories;
          const final_normalized_score = normalized_score / 2;

          const rarity_score_of_each_value: RarityScoreOfValue = {
                trait_type: eachAttribute.trait_type,
                value: eachValue.value,  
                rarity_score: rarity_score , 
                normalized_rarity_score:  final_normalized_score
          }

          console.log("countOfAllAttribute2 ", key, rarity_score_of_each_value)
          dispatch(setRarityScoreToAttributeValue2(rarity_score_of_each_value))
          dispatch(setRarityScoreToEachNFTAttribuValue2(rarity_score_of_each_value))
         })
      })
    }
    dispatch(assignRank())
    dispatch(setIsSnipping({action: "startTop20"}))

    
    // setProgramFlow(pre => {return {...pre, starttop20: true}}); 
    
  }

  const handlePage = (event: any, value: number) => {
    setPage(value)
    handleInputLength()
  };

  const numberOfItems = list_of_all_tokens?.length | 0;
  const numberPerPage = 50
  const numberOfPages = Math.ceil(numberOfItems/numberPerPage)

  const handleInputLength = () => {
    set_list_of_NFTs_for_currentPage( list_of_all_tokens && list_of_all_tokens
                                        .slice((page-1)*numberPerPage, page*numberPerPage))
  }


  useEffect(()=> {
    if(isSnipping.showNFTs){
      handleInputLength()
    }
  }, [page, isSnipping.showNFTs])

  useEffect(()=> {
    if(list_of_all_tokens2){
      handlePage(0,1)
    } 
  }, [sortBy])

  useEffect(()=> {
    if(isSnipping.completed === true){
      findRarityScore2()
    }
  }, [isSnipping.completed])

  useEffect(()=> {
    if(isSnipping.startTop20) {
      getTopRatedNFTs()
    }
  }, [isSnipping.startTop20])

  // useEffect(()=> {
  //   if(isSnipping.startRemaining){
  //     // console.log("55555555555555555555555555")
  //     getRemainingNFTs()
  //   }
  // }, [isSnipping.startRemaining])

  useEffect(()=> {
      set_list_of_NFTs_for_currentPage(null)
      handlePage(0,1)
  },[isSnipping.started])


  // console.log("Initially ", isSnipping)

  return (
    <div className="cards-container">
      
          <div className="before-NFT-Secreen">
              {
                  !isSnipping.requested && !isSnipping.started  && !isSnipping.completed && !isSnipping.showNFTs ? 

                 <div className="before-NFT-welcome-Secreen"> 

                   <div className="before-NFT-welcome-Secreen-text1">
                      Welcome. Please Enter an NFT contract address and load it to snip
                  </div>

                  <div className="before-NFT-welcome-Secreen-rules-header">
                      Rules of snipping
                  </div>

                  <div className="before-NFT-welcome-Secreen-rules">
                      <div className="before-NFT-welcome-Secreen-rule">- Rule 1 </div>
                      <div className="before-NFT-welcome-Secreen-rule">- Rule 1 </div>
                      <div className="before-NFT-welcome-Secreen-rule">- Rule 1 </div>
                      <div className="before-NFT-welcome-Secreen-rule">- Rule 1 </div>
                      <div className="before-NFT-welcome-Secreen-rule">- Rule 1 </div>
                      <div className="before-NFT-welcome-Secreen-rule">- Rule 1 </div>
                  </div>

                 </div> :
                  isSnipping.requested && !isSnipping.started  && !isSnipping.completed && !isSnipping.showNFTs? 
                  <div> Wait we are fetching data </div> :                 
                  
                  isSnipping.requested && isSnipping.started  && !isSnipping.completed && !isSnipping.showNFTs? 
                  <div> <RarityReport /> </div> :
                  
                  isSnipping.requested && isSnipping.started  && isSnipping.completed && !isSnipping.showNFTs?
                  // <div> Wait we are processing the data. </div> :
                  <div> <ProgressReport /> </div> :
                  
                  
                  isSnipping.requested && isSnipping.started  && isSnipping.completed && isSnipping.showNFTs? 
                  //  <NFTs /> 
                  <div className="NFT-Secreen">

                  <div className="input-container"> 
                  
                      <div className="normalization-container"> 
                        <FormGroup>
                          <span> <FormControlLabel onChange={handleOnSale} control={<Switch />} label="On sale" /></span>
                          <span> <FormControlLabel onChange={handleNormalization} control={<Switch  />} label="Normalization" /></span>
                        </FormGroup>
                      </div> 
            
                      <div className="selection-container"> 
                            <Box sx={{ minWidth: 150}}>
                              <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label"> Sort By</InputLabel>
                                <Select
                                  variant="standard"
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select-helper"
                                  value={sortBy}
                                  label="Sort By"
                                  onChange={(e) => handleSort(Number(e.target.value))}
                                >
                                  <MenuItem value={1}> {`Rarity Score (high -> low)`} </MenuItem>
                                  <MenuItem value={2}> {`Rarity Score (low -> high)`} </MenuItem>
                                  <MenuItem value={3}> {`Price (high -> low)`} </MenuItem>
                                  <MenuItem value={4}> {`Price (low -> high)`} </MenuItem>
                                  <MenuItem value={5}> {`Token ID (high -> low)`} </MenuItem>
                                  <MenuItem value={6}> {`Token ID (low -> high)`} </MenuItem>
                                </Select>
                              </FormControl>
                            </Box>
                      </div>
            
                  </div>
            
                  <div className="NFTs-container">
                    <Grid container>
                      {
                        list_of_NFTs_for_currentPage && list_of_NFTs_for_currentPage.map((token: AttributesOfEachToekn, key:number) => {  
                            return (
                              <div className="NFTs-card" key={key}> 
                                <Grid item xs={12}>
                                <NFTCard 
                                    token = {token} 
                                    normalization = {normalization}
                                    />
                                </Grid>
                              </div>
                            )            
                        })
                      }
            
                      <div className="pagination-container">
                        <Stack spacing={5}>
                          <Pagination count={numberOfPages} page={page} siblingCount={4} boundaryCount={2} onChange={handlePage}/>
                        </Stack>
                      </div>
            
                    </Grid>
                  </div>
                  
                  </div>
            
                  :
                  null 

              }

          </div>

    </div>

  );
};

export default NFTCards;




  // <div> Crypto Kitties: 0x06012c8cf97bead5deae237070f9587f8e7a266d </div> 
  // <div> Crypto Punks: 0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb </div>
  // <div> BearsOnTheBlock: 0x02aa731631c6d7f8241d74f906f5b51724ab98f8 </div>
  // <div> Testing:                      0x2cfcbf304415d87611E89fd284Ed362Cf6bA5141 </div>
  // <div> Testing: 0xA66CC78067fd1E6Aa3eEC4CcdFF88D81527F92c1 </div>
  // <div> WannabeMusicClub: 0x402491a577373995fF3382e6da3c282cb0564902 </div> https://api.wannabesmusic.club/json/1

  // <div> lostboy: 0xc1a1e381389cb927f1d57511e144b644ef0c6385 </div> https://api.lostboy.io/boy/1
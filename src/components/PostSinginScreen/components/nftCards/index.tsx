import  React, {useEffect, useState} from "react";
import "./style.css";
import { useSelector, useDispatch } from 'react-redux';
import { setProgress, switchNormalization, sortByRankAndPrice, setOpenseaData, assignRank, setIsSnipping, setOnlyOnSaleState, setRarityScoreToAttributeValue2, setRarityScoreToEachNFTAttribuValue2, sortByPrice, sortByTokenID, sortByRarityScore, RarityScoreOfValue, AttributesOfEachToekn } from '../../../store';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import NFTCard from "../nftCard";
import axios from "axios";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import LoadingProgress from "../RarityReport/LoadingProgress";


const NFTCards = () => {
  
  const dispatch = useDispatch();
  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState<number>(0);
  const [list_of_NFTs_for_currentPage, set_list_of_NFTs_for_currentPage] = useState<AttributesOfEachToekn[] | null>([])

  const { progress, onlyOnSale, normalization, countOfAllAttribute2, list_of_all_tokens2, isSnipping, projectInfo, list_of_all_tokens } = useSelector((state: any) => state);
  
  console.log("countOfAllAttribute2", countOfAllAttribute2)
  console.log("list_of_all_tokens2 setRarityScore", list_of_all_tokens2)

  const handleSort = (e: number) => {
    // console.log(e)
    setSortBy(e);
    if(e === 0){
      dispatch(sortByRankAndPrice())
    }
    if(e === 1){
      dispatch(sortByRarityScore("accs"))
    }
    else if(e === 2){
      dispatch(sortByRarityScore("decs"))

    }
    else if(e === 3){
      dispatch(sortByPrice("decs"))
    }
    else if(e === 4){
      dispatch(sortByPrice("accs"))
    }
    else if(e === 5){
      dispatch(sortByTokenID("decs"))
    }
    else if(e === 6){
      dispatch(sortByTokenID("accs"))
    }
    
  };
      
  const handleNormalization = () => {
    if(normalization === true){
      dispatch(switchNormalization())
    }
    else if(normalization === false){
      dispatch(switchNormalization())
    }
  }

  const handleOnSale = () => {
    if(onlyOnSale === false){
      dispatch(setOnlyOnSaleState())
    }
    else if(onlyOnSale === true){
      dispatch(setOnlyOnSaleState())
    }
  }

  const fetchOpenseaData = async (iteration: number, min: number, max?:number) => {

    let arrayOfLinks: any = [];
    let count = 1
    const initialLink = `https://api.opensea.io/api/v1/assets?asset_contract_address=${projectInfo?.contractAddress}`;

    console.log(`Progersss Start - iteration: ${iteration} `)

    if(list_of_all_tokens){
  
      const activeTokens = max? list_of_all_tokens.slice(min,max) : list_of_all_tokens.slice(min)
    
      // console.log("top.length ", activeTokens.length)
      
      if(activeTokens.length > 0) {
  
      let link = initialLink;
  
      activeTokens.forEach((token: any, key: number) => {
        // console.log(`${key+1} ---> ${token.tokenID} ->  ${token.rarity_score}`)
        link = link.concat(`&token_ids=${token.tokenID}`);
        if(count%30==0 || count === activeTokens.length){
          arrayOfLinks.push(link.concat("&limit=30"))
          link = initialLink;
        }
        count++
      })
  
      // console.log("arrayOfLinks", arrayOfLinks)
      // console.log(`arrayOfLinks - ${i} `, arrayOfLinks)
  
      // const delayFn = (ms:number) => new Promise((r) => setTimeout(r, ms));

      
        let opensea_requests: any = [];
        let opensea_responses: any = [];

        for(var i = 0;  i < arrayOfLinks.length;  i=i+1) {
          const request = axios.get(arrayOfLinks[i], {
            // headers: {
            //   'X-API-KEY': 'ca6bb07f094744abb235defe478761f3'
            // }
          })
          opensea_requests.push(request)
        }

        const responses:any = await Promise.allSettled(opensea_requests);

        responses.forEach((opensea_each_res: any) => {
          if(opensea_each_res.status === 'fulfilled'){
            opensea_responses.push(opensea_each_res.value.data.assets)
          }
        })
        
        // console.log("all OpenSea Responses ", opensea_responses.flat())
        dispatch(setOpenseaData(opensea_responses.flat()))
  
      }
    }
  }

  const getTopRatedNFTs = async () => {
    // console.log("getTopRatedNFTs Started")
    console.log("Test Open sea data fetching Started - 0 to 3300")
    console.log("Test", `${new Date().getMinutes()}:${new Date().getSeconds()}`)

    dispatch(setProgress({action: "openseaFetch", status: "started"}));
    const delayFn = (ms:number) => new Promise((r) => setTimeout(r, ms));

    await fetchOpenseaData(1, 0, 3000);
    
    console.log("Test", `${new Date().getMinutes()}:${new Date().getSeconds()}`)
    console.log("Test Open sea data fetching Ended - 0 to 3300")
    dispatch(assignRank())
    dispatch(setProgress({action: "openseaFetch", status: "ended"}));
    
    // handleSort(0)
    // await delayFn(20000)
    // await fetchOpenseaData(2, 1001, 2000);
    // await delayFn(20000)
    // await fetchOpenseaData(3, 2001, 3000);
    // await delayFn(20000)
    // await fetchOpenseaData(4, 3001, 4000);
    // await delayFn(20000)
    // await fetchOpenseaData(5, 4001, 5000);
    // await delayFn(20000)
    // await fetchOpenseaData(6, 50001, 6000);
    // await delayFn(20000)
    // await fetchOpenseaData(7, 60001, 7000);
    // await delayFn(20000)
    // await fetchOpenseaData(8, 70001, 8000);
    // await delayFn(20000)
    // await fetchOpenseaData(9, 8001, 9000);
    // await delayFn(20000)
    // await fetchOpenseaData(10, 9001, 10000);
    // await delayFn(20000)
    // await fetchOpenseaData(11, 10001, 11000);
    // await delayFn(20000)
    // await fetchOpenseaData(12, 11001, 12000);
    // await delayFn(20000)
    // await fetchOpenseaData(13, 12001, 13000);
    // await delayFn(20000)
    // await fetchOpenseaData(14, 13001, 14000);
    // await delayFn(20000)
    // await fetchOpenseaData(15, 14001, 15000);


  }
    
  const findRarityScore2 = async () => {

    console.log("Test find Rarity Score Started")
    console.log("Test", `${new Date().getMinutes()}:${new Date().getSeconds()}`)

    // const delayFn = (ms:number) => new Promise((r) => setTimeout(r, ms));


    const totalSupply:number = projectInfo && projectInfo.range && projectInfo.range.range

    
    // Normalized Scoring
    if(countOfAllAttribute2){
      
      // console.log("Normalization is on")
      let traits_count = 0;
      const attribute_count_in_categories = Object.keys(countOfAllAttribute2).length;
      
      // console.log("countOfAllAttribute2 ", countOfAllAttribute2)
      
      Object.values(countOfAllAttribute2).map((eachAttribute: any) => {
        // console.log("countOfAllAttribute2 ", eachAttribute)
          traits_count = traits_count + eachAttribute.total_variations
        })
        
        //  console.log("countOfAllAttribute2 Values", Object.keys(countOfAllAttribute2))
        const average_trait_count = traits_count/attribute_count_in_categories;
        
        // console.log("countOfAllAttribute2 attribute_count_in_categories",attribute_count_in_categories )
        // console.log("countOfAllAttribute2 average_trait_count",average_trait_count )

        let allValues: any = {};
        let eachValues: any = {};
        let allTraits: any = {};

          Object.values(countOfAllAttribute2).map((eachAttribute: any, key: number) => {
                      
              Object.values(eachAttribute.trait_count).map((eachValue: any) => {
                
                const chance_of_occuring = eachValue.count/totalSupply;
                const rarity_score = 1/chance_of_occuring;
                
                const normalized_score = (rarity_score * average_trait_count) / eachAttribute.total_variations;
                const final_normalized_score = normalized_score / 2;
                

          const rarity_score_of_each_value: RarityScoreOfValue = {
                trait_type: eachAttribute.trait_type,
                value: eachValue.value as string,
                rarity_score: rarity_score,
                normalized_rarity_score:  final_normalized_score,
                presenceInTokens: eachValue.presenceInTokens
          }

          // eachValues["trait_value"] = rarity_score_of_each_value.value
          // eachValues["trait_type"] = eachAttribute.trait_type
          // eachValues[rarity_score_of_each_value.value] = rarity_score_of_each_value

          if(!allValues[eachAttribute.trait_type]){
            allValues[eachAttribute.trait_type] = {}
          }
          allValues[eachAttribute.trait_type][rarity_score_of_each_value.value] = rarity_score_of_each_value

        })
      })

      console.log("Test", `${new Date().getMinutes()}:${new Date().getSeconds()}`)
      console.log("Test find Rarity Score ended")

      console.log("Test allTraits", allValues)
      dispatch(setRarityScoreToEachNFTAttribuValue2(allValues))

  

      dispatch(setProgress({action: "raritiesAssign", status: "ended"}));
      // return;
    }
    // dispatch(assignNormalizedRank())
    // dispatch(assignRank())

    dispatch(setIsSnipping({action: "startTop20"}))


    
  }

  const handlePage = (event: any, value: number) => {
    setPage(value)
    handleInputLength()
  };

  const numberOfItems = list_of_all_tokens?.length | 0;
  const numberPerPage = 50
  const numberOfPages = Math.ceil(numberOfItems/numberPerPage)

  const handleInputLength = () => {
    set_list_of_NFTs_for_currentPage( list_of_all_tokens && list_of_all_tokens.slice((page-1)*numberPerPage, page*numberPerPage))
  }

  useEffect(()=> {
    if(isSnipping.completed === true){
      dispatch(setProgress({action: "raritiesAssign", status: "started"}));
      findRarityScore2()
    }
  }, [isSnipping.completed])

  useEffect(()=> {
    if(isSnipping.startTop20) {
      getTopRatedNFTs()
    }
  }, [isSnipping.startTop20])

  useEffect(()=> {
      set_list_of_NFTs_for_currentPage(null)
      handlePage(0,1)
  },[isSnipping.started])


  useEffect(()=> {
      handleInputLength()
  }, [page])



  useEffect(()=> {
    if(list_of_all_tokens2){
      handlePage(0,1);
      handleInputLength()

    } 
  }, [sortBy])


  useEffect(()=> {
      // setSortBy(sortBy);
      handlePage(0,1);
      handleInputLength()
  }, [onlyOnSale])


  useEffect(()=> {
    setSortBy(0);
    handlePage(0,1);
    handleInputLength()
}, [normalization])


  useEffect(()=> {
   if(progress.openseaFetch.ended ){
      handlePage(0,1);
      handleInputLength()
      dispatch(setIsSnipping({ action: "showNFTs" }));

    } 
  }, [progress.openseaFetch.ended])



  return (
    <div className="cards-container">
      
          <div className="before-NFT-Secreen">
              {
                  !isSnipping.requested && !isSnipping.started  && !isSnipping.completed && !isSnipping.showNFTs ? 

                 <div className="before-NFT-welcome-Secreen"> 

                   <div className="before-NFT-welcome-Secreen-text1">
                        Welcome to NFT Sniper. < br /> < br />
                        Enter an NFT contract address and load it to snip
                  </div>

                 </div> :
                  !isSnipping.showNFTs? 
                  <LoadingProgress /> :

                  isSnipping.showNFTs? 
                  // isSnipping.requested && isSnipping.started  && isSnipping.completed && isSnipping.showNFTs? 
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
                                  <MenuItem value={0}> {`Low Price & Hight Rank`} </MenuItem>
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
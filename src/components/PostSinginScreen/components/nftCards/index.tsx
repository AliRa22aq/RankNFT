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
  // const [normalization, setNormalization] = useState(false)
  const [onlyOnSale, setOnlyOnSale] = useState(false)
  const [page, setPage] = useState(1)
  const [list_of_NFTs_for_currentPage, set_list_of_NFTs_for_currentPage] = useState<AttributesOfEachToekn[] | null>([])
  const [sortBy, setSortBy] = useState<number>(1);

  const { normalization, list_of_all_tokens_not_normalized,list_of_all_tokens_normalized, list_of_all_tokens_remaining, list_of_all_tokens_top_20, countOfAllAttribute2, list_of_all_tokens2, isSnipping, countOfAllAttribute, projectInfo, list_of_all_tokens, rarityScoreOfAllValues } = useSelector((state: any) => state);
  
  console.log("list_of_all_tokens", list_of_all_tokens)

  const handleSort = (e: number) => {
    // console.log(e)
    setSortBy(e);
    if(e === 0){
      // setOnlyOnSale(true)
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
      // setNormalization(!normalization)
      dispatch(switchNormalization())
      setSortBy(1);
      handlePage(0,1)

    }
    else if(normalization === false){
      // setNormalization(!normalization)
      dispatch(switchNormalization())
      setSortBy(1);
      handlePage(0,1)

    }
  }

  const handleOnSale = () => {
    // console.log("Inital onlyOnsale", onlyOnSale)

    if(onlyOnSale === false){
      // console.log("onlyOnsale", onlyOnSale)
      dispatch(setOnlyOnSaleState(!onlyOnSale))
      handleSort(0)  
      setOnlyOnSale(!onlyOnSale)
      // handlePage(0,1)
      // handleSort(1)    

    }
    else if(onlyOnSale === true){
      // console.log("onlyOnsale", onlyOnSale)
      setOnlyOnSale(!onlyOnSale)
      dispatch(setOnlyOnSaleState(!onlyOnSale))
      // handlePage(0,1)
      handleSort(1)    
    }
  }

  const fetchOpenseaData = async (iteration: number, min: number, max?:number) => {

    let arrayOfLinks: any = [];
    let count = 1
    const initialLink = `https://api.opensea.io/api/v1/assets?asset_contract_address=${projectInfo?.contractAddress}`;

    // console.log(`Progersss Start - iteration: ${iteration} `)

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
          const request = axios.get(arrayOfLinks[i])
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
    console.log("getTopRatedNFTs Started")
    dispatch(setProgress({action: "openseaFetch", status: "started"}));

    const delayFn = (ms:number) => new Promise((r) => setTimeout(r, ms));

    await fetchOpenseaData(1, 0, 3300);
    dispatch(setProgress({action: "openseaFetch", status: "ended"}));

    // handleSort(0)
    await delayFn(20000)
    await fetchOpenseaData(2, 3301, 6600);
    await delayFn(20000)
    await fetchOpenseaData(2, 6601, 10000);


  }
    
  const findRarityScore2 = async () => {

    console.log("findRarityScore2 Started")


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
        
          Object.values(countOfAllAttribute2).map((eachAttribute: any, key: number) => {
            
            // dispatch(setProcessingProgress(key+1))
          
              Object.values(eachAttribute.trait_count).map((eachValue: any) => {
                
                const chance_of_occuring = eachValue.count/totalSupply;
                const rarity_score = 1/chance_of_occuring;
                
                const normalized_score = (rarity_score * average_trait_count) / eachAttribute.total_variations;
                const final_normalized_score = normalized_score / 2;
                
                console.log("test name", eachValue.value)
                console.log("test rarity_score", rarity_score)
                console.log("test totalSupply", average_trait_count)
                console.log("test eachValue.count", eachValue.count)
                console.log("test normalized_score", normalized_score)
                console.log("test final_normalized_score", final_normalized_score)
                // return 


          const rarity_score_of_each_value: RarityScoreOfValue = {
                trait_type: eachAttribute.trait_type,
                value: eachValue.value,  
                rarity_score: rarity_score , 
                normalized_rarity_score:  final_normalized_score
          }

          // console.log("countOfAllAttribute2 ", key, rarity_score_of_each_value)
          dispatch(setRarityScoreToAttributeValue2(rarity_score_of_each_value))
          dispatch(setRarityScoreToEachNFTAttribuValue2(rarity_score_of_each_value))
         })
      })
      dispatch(setProgress({action: "raritiesAssign", status: "ended"}));
    }
    // dispatch(assignNormalizedRank())
    dispatch(assignRank())

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
      handlePage(0,1);
      handleInputLength()

    } 
  }, [sortBy, onlyOnSale])

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
    handlePage(0,page)

},[normalization])

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
                                  <MenuItem value={0}> {`Hight Rank + Lowest Price`} </MenuItem>
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
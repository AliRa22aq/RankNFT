import  React, {useEffect, useState} from "react";
import "./style.css";
// import { intervalToDuration, formatDistanceToNow } from 'date-fns'
import { useSelector, useDispatch } from 'react-redux';
import { sortByTokenID, sortByRarityScore, RarityScoreOfValue,setRarityScoreToEachNFTAttribuValue, setRarityScoreToAttributeValue, TraitCount, Attribute, AttributesOfEachToekn, CountOfEachAttribute } from '../../../store';
const Web3 = require("web3");
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import NFTCard from "../nftCard";
import RarityReport from "../RarityReport/RarityReport";
import FinalRarityReport from "../RarityReport/FinalRarityReport";

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
  const [normalization, setNormalization] = useState(true)
  const [showNFTs, setShowNFTs] = useState(false)
  const [page, setPage] = useState(1)
  const [list_of_NFTs_for_currentPage, set_list_of_NFTs_for_currentPage] = useState<AttributesOfEachToekn[] | null>([])
  const [sortBy, setSortBy] = React.useState<number>(1);

  
  const { isSnipping, countOfAllAttribute, projectInfo, list_of_all_tokens, rarityScoreOfAllValues } = useSelector((state: any) => state);
  
  
  console.log("list_of_all_tokens", list_of_all_tokens)
  console.log("rarityScoreOfAllValues",  rarityScoreOfAllValues)

  

  const handleSort = (e: number) => {
    // console.log(e)
    setSortBy(e);
    if(e === 1){
      dispatch(sortByRarityScore())

    }
    if(e === 2){
      dispatch(sortByTokenID())
    }
  };
      
  const handleNormalization = () => {
    setNormalization(!normalization)
  }

  const findRarityScore = () => {

    dispatch(setRarityScoreToAttributeValue(null))


    const totalSupply:number = projectInfo && projectInfo.range.range
    console.log("totalSupply ", totalSupply)

    // Normalized Scoring
    if(countOfAllAttribute){
  
      console.log("Normalization is on")
      let traits_count = 0;
      
      countOfAllAttribute.map((eachAttribute: CountOfEachAttribute) => {
        traits_count = traits_count + eachAttribute.total_variations
      })
      
      const attribute_count_in_categories = countOfAllAttribute.length;
      const average_trait_count = traits_count/countOfAllAttribute.length;
      
      console.log("traits_count",traits_count )
      console.log("attribute_count_in_categories",attribute_count_in_categories )

      countOfAllAttribute.map((eachAttribute: CountOfEachAttribute) => {

        eachAttribute.trait_count && eachAttribute.trait_count.map((eachValue: TraitCount) => {

          const chance_of_occuring = eachValue.count/totalSupply;
          const rarity_score = 1/chance_of_occuring;

          const normalized_score = rarity_score * average_trait_count / attribute_count_in_categories;
          const final_normalized_score = normalized_score / 2;

          const rarity_score_of_each_value: RarityScoreOfValue = {
            value: eachValue.value,  rarity_score: rarity_score , normalized_rarity_score:  final_normalized_score
          }

          console.log("aliiiii", rarity_score_of_each_value)
          dispatch(setRarityScoreToAttributeValue(rarity_score_of_each_value))
          dispatch(setRarityScoreToEachNFTAttribuValue(rarity_score_of_each_value))

        })
      })
    }
    dispatch(sortByRarityScore())
    handleInputLength()
    setShowNFTs(true)

  }
 
  const handlePage = (event: any, value: number) => {
    console.log(value)
    setPage(value)
    handleInputLength()
  };

  const numberOfItems = list_of_all_tokens && list_of_all_tokens.length | 0;
  const numberPerPage = 20
  const numberOfPages = Math.ceil(numberOfItems/numberPerPage)

  const handleInputLength = () => {
    set_list_of_NFTs_for_currentPage(list_of_all_tokens && list_of_all_tokens.slice((page-1)*numberPerPage, page*numberPerPage))
    console.log(list_of_NFTs_for_currentPage)
  }


  useEffect(()=> {
    handleInputLength()
  }, [page])



  useEffect(()=> {
    handlePage(0,1)
  }, [sortBy, showNFTs])



  useEffect(()=> {
    if(list_of_all_tokens === null){
      setShowNFTs(false)
      set_list_of_NFTs_for_currentPage(null)
      handlePage(0,1)
    }
  }, [list_of_all_tokens])



  return (
    <div className="cards-container">
  
      {
        showNFTs ? 
        // <Grid item xs={12} style={{display: "flex",  minWidth: 300}}>
          <div className="NFT-Secreen">

            <div className="input-container"> 
            
                <div className="normalization-container"> 
                  <FormGroup>
                      <FormControlLabel onChange={handleNormalization} control={<Switch defaultChecked />} label="Normalization" />
                  </FormGroup>
                      {/* <Button onClick={findRarityScore} variant="contained"> Check rarity </Button> */}
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
                            <MenuItem value={1} className="menu-item"> {`${" "}Rarity Score`}</MenuItem>
                            <MenuItem value={2}> Token ID</MenuItem>
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
                  <Stack spacing={2}>
                    <Pagination count={numberOfPages} page={page} onChange={handlePage}/>
                  </Stack>
                </div>

              </Grid>
            </div>
            
          </div>

            :

          <div className="before-NFT-Secreen">
              {
                 !isSnipping.started  && !isSnipping.completed ? 
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

                 </div>
                  : 
                 isSnipping.started  && !isSnipping.completed ? 
                 <div>
                   <RarityReport /> 
                </div>                 
                 :
                 isSnipping.started  && isSnipping.completed && !showNFTs ?
                 <div>
                      <div className="check-rarity-text">Amazing. we are ready to check rarity of NFTs. Lets go</div>
                      <div className="check-rarity-button-container"> <Button onClick={()=> findRarityScore()} variant="contained"> Check rarity </Button></div>
                      <FinalRarityReport />
                 </div> 
                 :
                 null
              }

          </div>


      }





    </div>

  );
};

export default NFTCards;



  // <div> Crypto Kitties: 0x06012c8cf97bead5deae237070f9587f8e7a266d </div> 
  // <div> Crypto Punks: 0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb </div>
  // <div> BearsOnTheBlock: 0x02aa731631c6d7f8241d74f906f5b51724ab98f8 </div>
  // <div> Testing: 0x2cfcbf304415d87611E89fd284Ed362Cf6bA5141 </div>
  // <div> Testing: 0xA66CC78067fd1E6Aa3eEC4CcdFF88D81527F92c1 </div>
  // <div> WannabeMusicClub: 0x402491a577373995fF3382e6da3c282cb0564902 </div> https://api.wannabesmusic.club/json/1

  // <div> lostboy: 0xc1a1e381389cb927f1d57511e144b644ef0c6385 </div> https://api.lostboy.io/boy/1
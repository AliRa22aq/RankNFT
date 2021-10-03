import React, {useEffect, useState} from "react";
import "./style.css";
// import { intervalToDuration, formatDistanceToNow } from 'date-fns'
import { useSelector, useDispatch } from 'react-redux';
import { sortByTokenID, sortByRarityScore, setNormalizedRarityScoreToAttributes, RarityScoreOfValue,setRarityScoreToEachNFTAttribuValue, setRarityScoreToAttributeValue, TraitCount, Attribute, AttributesOfEachToekn, CountOfEachAttribute } from '../../../store';
// import Grid from "@mui/material/Grid";
// import { Form, Formik, Field } from "formik";
// import { TextField} from 'formik-material-ui';
// import TextField from "@mui/material/TextField";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import App from '../nftCardModel'
const Web3 = require("web3");
// import { useNft } from "use-nft"
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import NFTCard from "../nftCard";


// import { OpenSeaPort, Network  } from 'opensea-js'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


enum Sort {
  rarityScore = 1,
  tokenID = 2
}

const NFTCards = () => {
  
  const dispatch = useDispatch();
  const [normalization, setNormalization] = useState(true)
  const [showNFTs, setShowNFTs] = useState(false)
  const [sortBy, setSortBy] = React.useState<number>(1);

  
  const { loadingNFTS, countOfAllAttribute, projectInfo, rarityScoreOfAllValues, rarityScoreOfAllAttributes, allAvailableAttributes, list_of_all_tokens } = useSelector((state: any) => state);
  
  
  console.log("list_of_all_tokens", list_of_all_tokens)
  
  

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
      
  const handleChange = () => {
    setNormalization(!normalization)
    findRarityScore()
  }

  const findRarityScore = () => {

    dispatch(setRarityScoreToAttributeValue(null))
    dispatch(setNormalizedRarityScoreToAttributes(null))

    const totalSupply:number = projectInfo && projectInfo.range.range
    console.log("totalSupply ", totalSupply)
    // projectInfo && projectInfo.totalSupply

    // // Normal Scoring
    if(countOfAllAttribute && !normalization){
      console.log("Normalization is off")
      countOfAllAttribute.map((eachAttribute: CountOfEachAttribute) => {
        eachAttribute.trait_count && eachAttribute.trait_count.map((eachValue: TraitCount) => {
          const chance_of_occuring = eachValue.count/totalSupply
          const rarity_score = 1/chance_of_occuring;
          const rarity_score_of_each_value: RarityScoreOfValue = {
            value: eachValue.value,  rarity_score: rarity_score
          }
          //console.log(rarity_score_of_each_value)
          dispatch(setRarityScoreToAttributeValue(rarity_score_of_each_value))
          dispatch(setRarityScoreToEachNFTAttribuValue(rarity_score_of_each_value))
          
        })
      })      
    }

    // Normalized Scoring
    if(countOfAllAttribute && normalization){
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
          const final_score = normalized_score / 2;

          const rarity_score_of_each_value: RarityScoreOfValue = {
            value: eachValue.value,  rarity_score: final_score
          }
          // console.log(rarity_score_of_each_value)
          dispatch(setRarityScoreToAttributeValue(rarity_score_of_each_value))
          dispatch(setRarityScoreToEachNFTAttribuValue(rarity_score_of_each_value))

        })
      })
    }
    dispatch(sortByRarityScore())
    setShowNFTs(true)

  }
 
  const dummyData = [
    {
      image: "https://images-na.ssl-images-amazon.com/images/I/41g6jROgo0L.png",
      name: "Ali",
      tokenID: "1",
      rarity_score: 0
    },
    {
      image: "https://images-na.ssl-images-amazon.com/images/I/41g6jROgo0L.png",
      name: "Ali",
      tokenID: "1",
      rarity_score: 0
    },
    {
      image: "https://images-na.ssl-images-amazon.com/images/I/41g6jROgo0L.png",
      name: "Ali",
      tokenID: "1",
      rarity_score: 0
    },
    {
      image: "https://images-na.ssl-images-amazon.com/images/I/41g6jROgo0L.png",
      name: "Ali",
      tokenID: "1",
      rarity_score: 0
    },
    {
      image: "https://images-na.ssl-images-amazon.com/images/I/41g6jROgo0L.png",
      name: "Ali",
      tokenID: "1",
      rarity_score: 0
    },
    {
      image: "https://images-na.ssl-images-amazon.com/images/I/41g6jROgo0L.png",
      name: "Ali",
      tokenID: "1",
      rarity_score: 0
    },
    {
      image: "https://images-na.ssl-images-amazon.com/images/I/41g6jROgo0L.png",
      name: "Ali",
      tokenID: "1",
      rarity_score: 0
    },
    {
      image: "https://images-na.ssl-images-amazon.com/images/I/41g6jROgo0L.png",
      name: "Ali",
      tokenID: "1",
      rarity_score: 0
    },
    {
      image: "https://images-na.ssl-images-amazon.com/images/I/41g6jROgo0L.png",
      name: "Ali",
      tokenID: "1",
      rarity_score: 0
    },
    {
      image: "https://images-na.ssl-images-amazon.com/images/I/41g6jROgo0L.png",
      name: "Ali",
      tokenID: "1",
      rarity_score: 0
    }
  ]

  return (
    <div className="cards-container">
  
       {/* <Grid container > */}



      {
        countOfAllAttribute ? 
        
        <div className="input-container"> 
          <div className="button-container"> 
            <FormGroup>
                <FormControlLabel onChange={handleChange} control={<Switch defaultChecked />} label="Normalization" />
            </FormGroup>
                <Button onClick={findRarityScore} variant="contained"> Check rarity </Button>
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
        : null 
      }

      {
        showNFTs ? 
        // <Grid item xs={12} style={{display: "flex",  minWidth: 300}}>

          <div className="NFTs-container">
           <Grid container>
          {
            //  list_of_all_tokens && list_of_all_tokens.map((token: AttributesOfEachToekn) => {
              list_of_all_tokens && list_of_all_tokens.map((token: AttributesOfEachToekn) => {
              
                return (
                  <div className="NFTs-card"> 
                    <Grid item xs={12}>
                     <NFTCard image={token.image} name={token.name} tokenID={token.tokenID} rarity_score={token.rarity_score} />
                    </Grid>
                  </div>
                )            
            })
          }
          </Grid>
          </div>
                :    
          <div> 
              {
                 !loadingNFTS ? 
                 <div> 
                    Welcome. Please Enter a NFT contract address and load it to snip
                 </div>
                  : 
                 <div> 
                  {
                    countOfAllAttribute ?
                    <div>

                          <div>
                                  <div> Total Variations in Attributes </div> 
                          {
                              countOfAllAttribute.map((attribute: CountOfEachAttribute, key: number) => {
                                return (
                                  <div key= {key}><b> {key+1}:  {attribute.trait_type}  <span> {attribute.total_variations} </span> </b></div>
                              )
                          })}

                          <br />
                          <br />
                          
                          </div> 

                          <div>
                                      <div> Count of each trait </div> 
                                      <br />

                        {
                          countOfAllAttribute.map((attribute: CountOfEachAttribute) => {

                            return (
                              <div>   
                                    <span><b> {attribute.trait_type} {":"}</b></span>
                                      {
                                        attribute.trait_count && attribute.trait_count.map((attribute_count: TraitCount, key: number) => {
                                          return (
                                          <span key= {key}> {attribute_count.value}:  {attribute_count.count}  </span>
                                          )
                                        })
                                      }  
                                <br />
                                <br />
                              </div>
                            )
                          })
                        }
                    </div> 
                    
                    </div> 
                    : 
                    null
                  }
                 </div>
              }
          </div>
        }



        {/* </Grid> */}

    </div>

  );
};

export default NFTCards;



  {/* {
    list_of_all_tokens !== null  ?
    <>
    {
      list_of_all_tokens.map((attributesOfEachToekn: AttributesOfEachToekn, key: number) => {
        if(attributesOfEachToekn)
        return (
        <div key={key}>
            <div> Attributes of Token : {attributesOfEachToekn.tokenID}</div> 
            {
              attributesOfEachToekn.attributes.map((attribute: Attribute, key: number) => {
                    return (
                      <span key= {key}> {`${attribute.trait_type}: ${attribute.value}    `} </span>
                  )
              })
            }
            <br />
            <br />
       </div>
        )
    })} 
    
    </> : null
  }*/}



{/* 
  <br />
  <br />
  <br />
  <br />
  <div> Crypto Kitties: 0x06012c8cf97bead5deae237070f9587f8e7a266d </div>
  <div> Crypto Punks: 0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb </div>
  <div> BearsOnTheBlock: 0x02aa731631c6d7f8241d74f906f5b51724ab98f8 </div>
  <div> Testing: 0x2cfcbf304415d87611E89fd284Ed362Cf6bA5141 </div>
  <div> Testing: 0xA66CC78067fd1E6Aa3eEC4CcdFF88D81527F92c1 </div>
  <div> WannabeMusicClub: 0x402491a577373995fF3382e6da3c282cb0564902 </div>
  <div> lostboy: 0xc1a1e381389cb927f1d57511e144b644ef0c6385 </div> */}
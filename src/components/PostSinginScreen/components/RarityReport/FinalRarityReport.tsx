import React from "react"
import "./styles.css"
import { useSelector, useDispatch } from 'react-redux';
import { sortByTokenID, sortByRarityScore, setNormalizedRarityScoreToAttributes, RarityScoreOfValue,setRarityScoreToEachNFTAttribuValue, setRarityScoreToAttributeValue, TraitCount, Attribute, AttributesOfEachToekn, CountOfEachAttribute } from '../../../store';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';





const RarityReport = () => {
    const { isSnipping, countOfAllAttribute, projectInfo, rarityScoreOfAllValues, rarityScoreOfAllAttributes, allAvailableAttributes, list_of_all_tokens } = useSelector((state: any) => state);

    return(
        <div className="Loading-NFTs-Data-container">
        {
            countOfAllAttribute ?
            // <div>

                  <div className="Loading-NFTs-Data">
                     
                      {/* <div className="Loading-NFTs-Text1"> 
                          Amazing. we are ready to check rarity of NFTs
                      </div>  */}
                      <div className="Loading-NFTs-Text2"> 
                          Total Variations found in Attributes
                      </div> 
                  {
                      countOfAllAttribute.map((attribute: CountOfEachAttribute, key: number) => {
                        return (
                          // <div key= {key}>{key+1}:  {attribute.trait_type}  <span> {attribute.total_variations} </span> </div>
                          <div key= {key} className="Loading-NFTs-Attribute"> 
                              {`${key+1})  ${attribute.trait_type}:  ${attribute.total_variations}`}
                          </div>
                      )
                  })}
                  
                  </div> 


            : 
            null
          }
     </div>
    )
} 


export default RarityReport;



                  {/* <div>
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
            </div>  */}
            
            // </div> 
import React from "react"
import "./styles.css"
import { useSelector } from 'react-redux';
import { CountOfEachAttribute } from '../../../store';
import CircularProgress from '@mui/material/CircularProgress';

import { CountOfEachAttribute2Values } from '../../../store';

const RarityReport = () => {
    const { countOfAllAttribute2} = useSelector((state: any) => state);

    return(
        <div className="Loading-NFTs-Data-container">
        {
            countOfAllAttribute2 ?
                  <div className="Loading-NFTs-Data">                      
                      <div className="Loading-NFTs-Text1"> 
                          Snipping is in progress. Please wait till we load all the data 
                      </div> 
                      <div className="Loading-NFTs-circle"> 
                                <CircularProgress size={80} thickness={2}/>
                      </div> 
                  {
                      Object.values(countOfAllAttribute2 as CountOfEachAttribute2Values).map((attribute: CountOfEachAttribute, key: number) => {
                        return (
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
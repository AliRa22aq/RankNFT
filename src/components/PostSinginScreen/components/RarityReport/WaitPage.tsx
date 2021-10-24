import React, {useEffect} from "react"
import "./styles.css"
import { useSelector, useDispatch } from 'react-redux';
import { CountOfEachAttribute } from '../../../store';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';



import { CountOfEachAttribute2Values } from '../../../store';





const WaitPage = () => {

    return(
      <div className="Loading-NFTs-Data-container">

      <div className="Loading-NFTs-Data">

          <div className="Loading-NFTs-progress-container">
            <div className="Loading-NFTs-progress"> 
               <LinearProgress  />
             </div>

               <div className="Loading-NFTs-progress-count"> </div>
          </div> 

      </div> 

      <div className="Loading-NFTs-Text1"> Wait we are fetching the data. </div> 
</div>
)
} 


export default WaitPage;



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
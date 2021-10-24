import React, {useEffect} from "react"
import "./styles.css"
import { useSelector, useDispatch } from 'react-redux';
import { CountOfEachAttribute } from '../../../store';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';



import { CountOfEachAttribute2Values } from '../../../store';





const RarityReport = () => {
    const { setLoadingProgress, countOfAllAttribute, countOfAllAttribute2, projectInfo, list_of_all_tokens2 } = useSelector((state: any) => state);

    // console.log("countOfAllAttribute2 ", countOfAllAttribute2)


    let loadingCount = Math.round(projectInfo.loadingProgree)

    return(
        <div className="Loading-NFTs-Data-container">
        {
            countOfAllAttribute2 ?
            // <div>

                  <div className="Loading-NFTs-Data">

                           {/* <LinearProgress />   */}
                      {/* <Box sx={{ width: '100%' }}> */}
                      <div className="Loading-NFTs-progress-container">
                        <div className="Loading-NFTs-progress"> 
                           {/* <LinearProgress variant="determinate" value={loadingCount} /> */}
                           {/* <LinearProgress  /> */}
                        </div>
                           {/* <div className="Loading-NFTs-progress-count">{`${loadingCount}%`}</div> */}
                      </div>

                    {/* </Box> */}
                      
                      <div className="Loading-NFTs-Text1"> 
                          Snipping is in progress. Please wait till we load all the data 
                      </div> 
                      <div className="Loading-NFTs-circle"> 
                                <CircularProgress size={80} thickness={2}/>
                      </div> 
                  {
                      Object.values(countOfAllAttribute2 as CountOfEachAttribute2Values).map((attribute: CountOfEachAttribute, key: number) => {
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
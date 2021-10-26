import React, {useEffect} from "react"
import "./styles.css"
import { useSelector, useDispatch } from 'react-redux';
import { CountOfEachAttribute } from '../../../store';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import { CountOfEachAttribute2Values } from '../../../store';





const LoadingProgress = () => {
    const { setLoadingProgress, countOfAllAttribute, countOfAllAttribute2, projectInfo, list_of_all_tokens2 } = useSelector((state: any) => state);

    return(
        <div className="Loading-NFTs-Data-container">

                  <div > Snipping Started successfully. </div> 
                  <div > Successfully fetched the data of all the tokens. </div> 
                  <div > Successfully assinged rarities to all the tokens. </div> 
                  <div > Successfully fetched the Opensea data of all the tokens. </div> 
                  <div > Wait we are processing the data. </div> 
                  <div > Wait we are processing the data. </div> 
                  
                  <div > 
                          <CircularProgress size={80} thickness={2}/>
                   </div> 

     </div>
    )
} 


export default LoadingProgress;


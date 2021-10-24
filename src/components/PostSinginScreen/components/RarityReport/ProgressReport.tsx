import React, {useEffect} from "react"
import "./styles.css"
import { useSelector, useDispatch } from 'react-redux';
import { CountOfEachAttribute } from '../../../store';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import { CountOfEachAttribute2Values } from '../../../store';





const ProgressReport = () => {
    const { setLoadingProgress, countOfAllAttribute, countOfAllAttribute2, projectInfo, list_of_all_tokens2 } = useSelector((state: any) => state);

    // console.log("countOfAllAttribute2 ", countOfAllAttribute2)

    //  console.log("ProcessesingProgree ", projectInfo.processingProgress)

    let loadingCount = Math.round(projectInfo.processingProgress)

    return(
        <div className="Loading-NFTs-Data-container">

                  <div className="Loading-NFTs-Text1"> Wait we are processing the data. </div> 
                  <div className="Loading-NFTs-circle"> 
                          <CircularProgress size={80} thickness={2}/>
                   </div> 

     </div>
    )
} 


export default ProgressReport;


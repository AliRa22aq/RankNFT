import React, {useEffect} from "react"
import "./styles.css"
import { useDispatch, useSelector } from 'react-redux';
import { setProgress, resetProgress, reSetSnipping } from '../../../store';

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Button from "@mui/material/Button";
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CircularProgress from '@mui/material/CircularProgress';
// import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';




const LoadingProgress = () => {
    const { progress } = useSelector((state: any) => state);
    const dispatch = useDispatch();

    
    // const stopRetrying = () => {
    //     console.log("Trying to stop");
    //     // dispatch(setProgress({action: "retrying", status: "ended"}));

    // }

    return(
        <div className="Loading-NFTs-Data-container">

                    {
                        progress.snip.started ? 
                        <div className="progress"> <CheckBoxIcon color="primary" />  <span className="progress-text">  Successfully started snipping. </span></div> : 
                        <div > Unable to start Snipping. </div>
                    }

                    {
                        progress.retryingToCheckRevealing.started  && !progress.retryingToCheckRevealing.ended ? 
                        <>
                            <div className="progress"> <CircularProgress color="primary" size={20}/> <span className="progress-text">Retrying to check if project is revealed or not.</span> </div>  
                            {/* <Button id="end" variant="contained" color="primary" onClick={stopRetrying} > Stop </Button> */}
                        </> :                        
                        progress.retryingToCheckRevealing.started  && progress.retryingToCheckRevealing.ended ? 
                            <div className="progress"> <CheckBoxIcon color="primary" />  <span className="progress-text"> Project is revealed. </span></div> :
                            null
                    }

                    {
                        !progress.dataFetch.started && !progress.dataFetch.ended ? 
                        <div className="progress"> <HourglassEmptyIcon color="action" /> <span className="progress-text">Waiting to start data fetching.</span> </div> : 
                        progress.dataFetch.started && !progress.dataFetch.ended ? 
                        <div className="progress"> <CircularProgress color="primary" size={20}/> <span className="progress-text">Tokens data fetching started.</span> </div> : 
                        progress.dataFetch.started && progress.dataFetch.ended ? 
                        <div className="progress"> <CheckBoxIcon color="primary" />  <span className="progress-text"> Successfully fetched the data of all the tokens. </span></div> :
                        null
                    }



                    {
                        !progress.dataProcess.started && !progress.dataProcess.ended ? 
                        <div className="progress"> <HourglassEmptyIcon color="action" /> <span className="progress-text">Waiting to start data processing. </span></div> :                         
                        progress.dataProcess.started && !progress.dataProcess.ended ? 
                        <div className="progress"> <CircularProgress color="primary" size={20}/> <span className="progress-text">Data processing started.</span> </div> : 
                        progress.dataProcess.started && progress.dataProcess.ended ? 
                        <div className="progress"> <CheckBoxIcon color="primary" /> <span className="progress-text">Successfully Processed the data of all the tokens. </span></div> :
                        null
                    }

                    {
                        !progress.raritiesAssign.started && !progress.raritiesAssign.ended ? 
                        <div className="progress"> <HourglassEmptyIcon color="action" /> <span className="progress-text">Waiting to start Rarity assingment. </span> </div> :                                                 
                        progress.raritiesAssign.started && !progress.raritiesAssign.ended ? 
                        <div className="progress"> <CircularProgress color="primary" size={20}/> <span className="progress-text">Rarity assingment started. </span> </div> : 
                        progress.raritiesAssign.started && progress.raritiesAssign.ended ? 
                        <div className="progress"> <CheckBoxIcon color="primary" /> <span className="progress-text"> Successfully assinged rarities to all the tokens. </span> </div> :
                        null
                    }

                    {
                        !progress.openseaFetch.started && !progress.openseaFetch.ended ? 
                        <div className="progress"> <HourglassEmptyIcon color="action" /> <span className="progress-text"> Waiting to start Opensea data fetching.</span> </div> :                                                                         
                        progress.openseaFetch.started && !progress.openseaFetch.ended ? 
                        <div className="progress"> <CircularProgress color="primary" size={20}/> <span className="progress-text"> Opensea data fetching started.</span> </div> : 
                        progress.openseaFetch.started && progress.openseaFetch.ended ? 
                        <div className="progress"> <CheckBoxIcon color="primary" /> <span className="progress-text"> Successfully fetched the Opensea data of all the tokens.</span> </div> :
                        null
                    }
                    <br />

                    <div className="progress-loading"> 
                          {/* <CircularProgress size={80} thickness={2}/> */}
                          {/* <CircularProgress /> */}
                        <iframe src="https://giphy.com/embed/feN0YJbVs0fwA" width="250" height="250" frameBorder="0" allowFullScreen />
                    </div> 

     </div>
    )
} 


export default LoadingProgress;


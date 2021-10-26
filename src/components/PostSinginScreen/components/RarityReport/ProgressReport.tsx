import React, {useEffect} from "react"
import "./styles.css"
import CircularProgress from '@mui/material/CircularProgress';




const ProgressReport = () => {

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


import React from "react"
import './style.css';
import Grid from "@mui/material/Grid";
import NFTForm from './components/form';
import NFTCards from './components/nftCards';


const PostSignInScreen = () => {
 
  
  return (
    <div className = "postsignin-container">

              <Grid container>
                
                <Grid item xs={3}>
                  <NFTForm />
                </Grid>

                <Grid item xs={9}>
                  <NFTCards />
                </Grid>

              </Grid>

    </div>
  );
}

export default PostSignInScreen;
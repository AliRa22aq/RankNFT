import React from "react";
import "./style.css";
import Typography from '@mui/material/Typography';

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <a href="https://discord.gg/tgSTXsxrph" target="_blank" >
        <Typography variant="subtitle1" >Contact Admin</Typography> 
        </a>

        <a href="https://discord.gg/tgSTXsxrph" target="_blank" >
        <img
          src="https://cdn.worldvectorlogo.com/logos/discord-6.svg"
          alt="dicord"
          className="SavedLink"
          width="50"
          height="50"
          style={{marginLeft: "10px"}}
        />
        </a>

      </div>
    </div>
  );
};

export default Footer;

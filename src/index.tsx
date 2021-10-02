import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './components/store/store';
import { getDefaultProvider, } from "ethers"
import { NftProvider } from "use-nft"


// We are using the "ethers" fetcher here.
const ethersConfig = {
  provider: getDefaultProvider("homestead"),
}


ReactDOM.render(
  <React.StrictMode>
   <NftProvider fetcher={["ethers", ethersConfig]}>

   <Provider store = {store}>
    <App />
   </Provider>
   
  </NftProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

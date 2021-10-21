const solution1 = () => {

    // for(var i = from;  i <= to;  i=i+1) {
    //   let activeURL =  url.replace("extension" , String(i))
    //   console.log(`step 6: active URl of NFT`, i, activeURL )
    //   let API =  axios.get( activeURL,  {data: i} ) as any  
    //   allRequests = [...allRequests  ,  API]
    // }
    
    //   const responses:any = await Promise.allSettled(allRequests); 
      
    //   responses.forEach((result:any, key: number) => {
    //           if(result.status == 'fulfilled'){
    //           const newTokens: any = {
    //             tokenID: result.value.config.data,  
    //             attributes: result.value.data.attributes,
    //             opensea: {price: 0, permalink: ""},
    //             rarity_score: 0,
    //             normalized_rarity_score: 0,
    //             image: result.value.data.image,
    //             title: result.value.data.title? result.value.title: "",
    //             name: result.value.data.name? result.value.data.name: "" 
    //           }
    //           allTokens.push(newTokens)
    //           allAttributes.push( result.value.data.attributes)
    //           console.log("done")
    //       } else {
    //         console.error("Unable to fetch")
    //       }

    //   });

    //   console.log("allTokens", allTokens)
    //   dispatch(addTokenInList3(allTokens))
    //   console.log("allAttributes", allAttributes)
    //   dispatch(setCountOfAllAttribute3(allAttributes))              
    

      
    //   let allRequest2: any = [];
    //   let allOpenSeaResponses:any = [];
    //   let flatResponse:any = [];


    //   for(var i = from;  i <= to;  i=i+30) {
    //     const opensea_api = `https://api.opensea.io/api/v1/assets?asset_contract_address=${data.contractInfo.contractAddrs}&token_ids=${i}&token_ids=${i+1}&token_ids=${i+2}&token_ids=${i+3}&token_ids=${i+4}&token_ids=${i+5}&token_ids=${i+6}&token_ids=${i+7}&token_ids=${i+8}&token_ids=${i+9}&token_ids=${i+10}&token_ids=${i+11}&token_ids=${i+12}&token_ids=${i+13}&token_ids=${i+14}&token_ids=${i+15}&token_ids=${i+16}&token_ids=${i+17}&token_ids=${i+18}&token_ids=${i+19}&token_ids=${i+20}&token_ids=${i+21}&token_ids=${i+22}&token_ids=${i+23}&token_ids=${i+24}&token_ids=${i+25}&token_ids=${i+26}&token_ids=${i+27}&token_ids=${i+28}&token_ids=${i+29}&limit=30`
    //     console.log("open_sea Api", opensea_api)
    //     let API =  axios.get( opensea_api,  {data: i} ) as any  
    //     allRequest2 = [...allRequest2  , API]            
    //   }

    //   const responses2:any = await Promise.allSettled(allRequest2);
    //   console.log("Combined responses of opensea ", responses2)

    //   responses2.map((result: any, key: number) => {
    //     if(result.status == 'fulfilled'){
    //       console.log(result.value.data.assets)
    //       allOpenSeaResponses.push(result.value.data.assets)
    //     } else {
    //       console.error("Unable to fetch")
    //     }

    //   })
    //   console.log("all OpenSea Responses ",  allOpenSeaResponses.flat())
    //   dispatch(setOpenseaData2(allOpenSeaResponses.flat()))

    // dispatch(setIsSnipping({action: "completed"}))



      // for(var i = from;  i <= to;  i=i+1) {
      //   let activeURL =  url.replace("extension" , String(i))
      //   console.log(`step 6: active URl of NFT`, i, activeURL )
      //   let API =  axios.get( activeURL,  {data: i} ) as any  
      //   allRequests = [...allRequests  , API]            
      // }
      
      // const responses = await axios.all(allRequests);
      // console.log("Combined responses ", responses)

      // responses.map((res: any) => {
      // console.log("waited res of Loop #", res.config.data, res)
      //     const newTokens: any = {
      //       tokenID: res.config.data,  
      //       attributes: res.data.attributes,
      //       opensea: {price: 0, permalink: ""},
      //       rarity_score: 0,
      //       normalized_rarity_score: 0,
      //       image: res.data.image,
      //       title: res.data.title? res.data.title: "",
      //       name: res.data.name? res.data.name: "" 
      //     }
      //   allTokens.push(newTokens)
      //   allAttributes.push(res.data.attributes)
      // })

      // // await delayFn(1000);
      // console.log("allTokens", allTokens)
      // dispatch(addTokenInList3(allTokens))
      // console.log("allAttributes", allAttributes)
      // dispatch(setCountOfAllAttribute3(allAttributes))              

      
      // let allRequest2: any = [];
      // let allOpenSeaResponses:any = [];
      // let flatResponse:any = [];


      // for(var i = from;  i <= to;  i=i+30) {
      //   const opensea_api = `https://api.opensea.io/api/v1/assets?asset_contract_address=${data.contractInfo.contractAddrs}&token_ids=${i}&token_ids=${i+1}&token_ids=${i+2}&token_ids=${i+3}&token_ids=${i+4}&token_ids=${i+5}&token_ids=${i+6}&token_ids=${i+7}&token_ids=${i+8}&token_ids=${i+9}&token_ids=${i+10}&token_ids=${i+11}&token_ids=${i+12}&token_ids=${i+13}&token_ids=${i+14}&token_ids=${i+15}&token_ids=${i+16}&token_ids=${i+17}&token_ids=${i+18}&token_ids=${i+19}&token_ids=${i+20}&token_ids=${i+21}&token_ids=${i+22}&token_ids=${i+23}&token_ids=${i+24}&token_ids=${i+25}&token_ids=${i+26}&token_ids=${i+27}&token_ids=${i+28}&token_ids=${i+29}&limit=30`
      //   console.log("open_sea Api", opensea_api)
      //   let API =  axios.get( opensea_api,  {data: i} ) as any  
      //   allRequest2 = [...allRequest2  , API]            
      // }

      // const responses2 = await axios.all(allRequest2);
      // console.log("Combined responses of opensea ", responses2)

      // responses2.map((res: any) => {
      //   allOpenSeaResponses.push(res.data.assets)
      // })
      // console.log("allOpenSeaResponses ",  allOpenSeaResponses.flat())
      // dispatch(setOpenseaData2(allOpenSeaResponses.flat()))

      // dispatch(setIsSnipping({action: "completed"}))

    } 




      // let allRequest2: any = [];
      // let allOpenSeaResponses:any = [];
      // let flatResponse:any = [];


      // for(var i = from;  i <= to;  i=i+30) {
      //   await delayFn(300)                  
      //   const opensea_api = `https://api.opensea.io/api/v1/assets?asset_contract_address=${data.contractInfo.contractAddrs}&token_ids=${i}&token_ids=${i+1}&token_ids=${i+2}&token_ids=${i+3}&token_ids=${i+4}&token_ids=${i+5}&token_ids=${i+6}&token_ids=${i+7}&token_ids=${i+8}&token_ids=${i+9}&token_ids=${i+10}&token_ids=${i+11}&token_ids=${i+12}&token_ids=${i+13}&token_ids=${i+14}&token_ids=${i+15}&token_ids=${i+16}&token_ids=${i+17}&token_ids=${i+18}&token_ids=${i+19}&token_ids=${i+20}&token_ids=${i+21}&token_ids=${i+22}&token_ids=${i+23}&token_ids=${i+24}&token_ids=${i+25}&token_ids=${i+26}&token_ids=${i+27}&token_ids=${i+28}&token_ids=${i+29}&limit=30`
      //   axios.get(opensea_api).then((API:any) => {
      //     console.log("all OpenSea Responses ",  allOpenSeaResponses)
      //     allOpenSeaResponses.push(API.data.assets)            
      //   })
      // }

      // console.log("all OpenSea Responses ", i,  allOpenSeaResponses)
      // dispatch(setOpenseaData2(allOpenSeaResponses.flat()))



      async.series([
        // async function(){
        //   console.log("First functions started")
        //   for(var i = from;  i <= to;  i=i+30) {
        //     // await delayFn(delayNFT);
        //     const opensea_api = `https://api.opensea.io/api/v1/assets?asset_contract_address=${data.contractInfo.contractAddrs}&token_ids=${i}&token_ids=${i+1}&token_ids=${i+2}&token_ids=${i+3}&token_ids=${i+4}&token_ids=${i+5}&token_ids=${i+6}&token_ids=${i+7}&token_ids=${i+8}&token_ids=${i+9}&token_ids=${i+10}&token_ids=${i+11}&token_ids=${i+12}&token_ids=${i+13}&token_ids=${i+14}&token_ids=${i+15}&token_ids=${i+16}&token_ids=${i+17}&token_ids=${i+18}&token_ids=${i+19}&token_ids=${i+20}&token_ids=${i+21}&token_ids=${i+22}&token_ids=${i+23}&token_ids=${i+24}&token_ids=${i+25}&token_ids=${i+26}&token_ids=${i+27}&token_ids=${i+28}&token_ids=${i+29}&limit=30`
        //     console.log("open_sea Api", opensea_api)
        //     const opensea_api_res: any = await axios.get(opensea_api)
        //     // request2 = [...request2  , opensea_api_res]        
        //     dispatch(setOpenseaData2(opensea_api_res.data.assets))
        //   }
        // },
        // async function(){
        //   console.log("First functions started")
        //   for(var i = from;  i <= to;  i=i+30) {
        //     await delayFn(delayOpensea);
        //     const opensea_api = `https://api.opensea.io/api/v1/assets?asset_contract_address=${data.contractInfo.contractAddrs}&token_ids=${i}&token_ids=${i+1}&token_ids=${i+2}&token_ids=${i+3}&token_ids=${i+4}&token_ids=${i+5}&token_ids=${i+6}&token_ids=${i+7}&token_ids=${i+8}&token_ids=${i+9}&token_ids=${i+10}&token_ids=${i+11}&token_ids=${i+12}&token_ids=${i+13}&token_ids=${i+14}&token_ids=${i+15}&token_ids=${i+16}&token_ids=${i+17}&token_ids=${i+18}&token_ids=${i+19}&token_ids=${i+20}&token_ids=${i+21}&token_ids=${i+22}&token_ids=${i+23}&token_ids=${i+24}&token_ids=${i+25}&token_ids=${i+26}&token_ids=${i+27}&token_ids=${i+28}&token_ids=${i+29}&limit=30`
        //     console.log("open_sea Api", opensea_api)
        //     axios.get(opensea_api).then((res: any) => {
        //       allOpenSeaResponses.push(res.data.assets)
        //     })
        //   }
        //   await delayFn(2000);
        //   console.log("allOpenSeaResponses ",  allOpenSeaResponses.flat())
        //   dispatch(setOpenseaData2(allOpenSeaResponses.flat()))
        // },
        // async function(){
        //   console.log("First functions started")
        //   await delayFn(delayNFT*100);

        //   for(var i = from;  i <= to && i <= 1000;  i=i+30) {
        //     // await delayFn(delayNFT);
        //     const opensea_api = `https://api.opensea.io/api/v1/assets?asset_contract_address=${data.contractInfo.contractAddrs}&token_ids=${i}&token_ids=${i+1}&token_ids=${i+2}&token_ids=${i+3}&token_ids=${i+4}&token_ids=${i+5}&token_ids=${i+6}&token_ids=${i+7}&token_ids=${i+8}&token_ids=${i+9}&token_ids=${i+10}&token_ids=${i+11}&token_ids=${i+12}&token_ids=${i+13}&token_ids=${i+14}&token_ids=${i+15}&token_ids=${i+16}&token_ids=${i+17}&token_ids=${i+18}&token_ids=${i+19}&token_ids=${i+20}&token_ids=${i+21}&token_ids=${i+22}&token_ids=${i+23}&token_ids=${i+24}&token_ids=${i+25}&token_ids=${i+26}&token_ids=${i+27}&token_ids=${i+28}&token_ids=${i+29}&limit=30`
        //     console.log("open_sea Api", opensea_api)
        //     const opensea_api_res = axios.get(opensea_api)
        //     request2 = [...request2  , opensea_api_res]        
            
        //   }
        //   console.log("First functions Ended")
        //   const responses2 = await axios.all(request2)
        //   responses2.map((response: any) => {
        //     flatResponse = [...flatResponse, response.data.assets]
        //   })
        //   dispatch(setOpenseaData2(flatResponse.flat()))
        //   await delayFn(delayNFT*50);
        //   request2 = [];
        //   flatResponse= [];    
        //   console.log("Nullling ", request2, flatResponse)
        //   await delayFn(delayNFT*300);

        // },
        // async function(){
        //   console.log("Second functions started")
        //   await delayFn(delayNFT*100);

        //   for(var i = 1001;  i <= to && i <= 2000;  i=i+30) {
        //     // await delayFn(delayNFT);
        //     const opensea_api = `https://api.opensea.io/api/v1/assets?asset_contract_address=${data.contractInfo.contractAddrs}&token_ids=${i}&token_ids=${i+1}&token_ids=${i+2}&token_ids=${i+3}&token_ids=${i+4}&token_ids=${i+5}&token_ids=${i+6}&token_ids=${i+7}&token_ids=${i+8}&token_ids=${i+9}&token_ids=${i+10}&token_ids=${i+11}&token_ids=${i+12}&token_ids=${i+13}&token_ids=${i+14}&token_ids=${i+15}&token_ids=${i+16}&token_ids=${i+17}&token_ids=${i+18}&token_ids=${i+19}&token_ids=${i+20}&token_ids=${i+21}&token_ids=${i+22}&token_ids=${i+23}&token_ids=${i+24}&token_ids=${i+25}&token_ids=${i+26}&token_ids=${i+27}&token_ids=${i+28}&token_ids=${i+29}&limit=30`
        //     console.log("open_sea Api", opensea_api)
        //     const opensea_api_res = axios.get(opensea_api)
        //     request2 = [...request2  , opensea_api_res]        
            
        //   }
        //   console.log("2nd functions Ended")
        //   const responses2 = await axios.all(request2)
        //   responses2.map((response: any) => {
        //     flatResponse = [...flatResponse, response.data.assets]
        //   })
        //   dispatch(setOpenseaData2(flatResponse.flat()))
        //   await delayFn(delayNFT*50);
        //   request2 = [];
        //   flatResponse= [];    
        //   console.log("Nullling ", request2, flatResponse)
        //   await delayFn(delayNFT*300);

        // },
        // async function(){
        //   console.log("3rd functions started")
        //   await delayFn(delayNFT*100);

        //   for(var i = 2001;  i <= to && i <= 3000;  i=i+30) {
        //     // await delayFn(delayNFT);
        //     const opensea_api = `https://api.opensea.io/api/v1/assets?asset_contract_address=${data.contractInfo.contractAddrs}&token_ids=${i}&token_ids=${i+1}&token_ids=${i+2}&token_ids=${i+3}&token_ids=${i+4}&token_ids=${i+5}&token_ids=${i+6}&token_ids=${i+7}&token_ids=${i+8}&token_ids=${i+9}&token_ids=${i+10}&token_ids=${i+11}&token_ids=${i+12}&token_ids=${i+13}&token_ids=${i+14}&token_ids=${i+15}&token_ids=${i+16}&token_ids=${i+17}&token_ids=${i+18}&token_ids=${i+19}&token_ids=${i+20}&token_ids=${i+21}&token_ids=${i+22}&token_ids=${i+23}&token_ids=${i+24}&token_ids=${i+25}&token_ids=${i+26}&token_ids=${i+27}&token_ids=${i+28}&token_ids=${i+29}&limit=30`
        //     console.log("open_sea Api", opensea_api)
        //     const opensea_api_res = axios.get(opensea_api)
        //     request2 = [...request2  , opensea_api_res]        
            
        //   }
        //   console.log("3rd functions Ended")
        //   const responses2 = await axios.all(request2)
        //   responses2.map((response: any) => {
        //     flatResponse = [...flatResponse, response.data.assets]
        //   })
        //   dispatch(setOpenseaData2(flatResponse.flat()))
        //   await delayFn(delayNFT*50);
        //   request2 = [];
        //   flatResponse= [];    
        //   console.log("Nullling ", request2, flatResponse)
        //   await delayFn(delayNFT*300);

        // },
        // async function(){
        //   console.log("4th functions started")
        //   await delayFn(delayNFT*100);

        //   for(var i = 3001;  i <= to && i <= 4000;  i=i+30) {
        //     // await delayFn(delayNFT);
        //     const opensea_api = `https://api.opensea.io/api/v1/assets?asset_contract_address=${data.contractInfo.contractAddrs}&token_ids=${i}&token_ids=${i+1}&token_ids=${i+2}&token_ids=${i+3}&token_ids=${i+4}&token_ids=${i+5}&token_ids=${i+6}&token_ids=${i+7}&token_ids=${i+8}&token_ids=${i+9}&token_ids=${i+10}&token_ids=${i+11}&token_ids=${i+12}&token_ids=${i+13}&token_ids=${i+14}&token_ids=${i+15}&token_ids=${i+16}&token_ids=${i+17}&token_ids=${i+18}&token_ids=${i+19}&token_ids=${i+20}&token_ids=${i+21}&token_ids=${i+22}&token_ids=${i+23}&token_ids=${i+24}&token_ids=${i+25}&token_ids=${i+26}&token_ids=${i+27}&token_ids=${i+28}&token_ids=${i+29}&limit=30`
        //     console.log("open_sea Api", opensea_api)
        //     const opensea_api_res = axios.get(opensea_api)
        //     request2 = [...request2  , opensea_api_res]        
            
        //   }
        //   console.log("4th functions Ended")
        //   const responses2 = await axios.all(request2)
        //   responses2.map((response: any) => {
        //     flatResponse = [...flatResponse, response.data.assets]
        //   })
        //   dispatch(setOpenseaData2(flatResponse.flat()))
        //   await delayFn(delayNFT*50);
        //   request2 = [];
        //   flatResponse= [];    
        //   console.log("Nullling ", request2, flatResponse)
        //   await delayFn(delayNFT*300);

        // },
        // async function(){
        //   console.log("5th functions started")
        //   await delayFn(delayNFT*100);

        //   for(var i = 4001;  i <= to && i <= 5000;  i=i+30) {
        //     // await delayFn(delayNFT);
        //     const opensea_api = `https://api.opensea.io/api/v1/assets?asset_contract_address=${data.contractInfo.contractAddrs}&token_ids=${i}&token_ids=${i+1}&token_ids=${i+2}&token_ids=${i+3}&token_ids=${i+4}&token_ids=${i+5}&token_ids=${i+6}&token_ids=${i+7}&token_ids=${i+8}&token_ids=${i+9}&token_ids=${i+10}&token_ids=${i+11}&token_ids=${i+12}&token_ids=${i+13}&token_ids=${i+14}&token_ids=${i+15}&token_ids=${i+16}&token_ids=${i+17}&token_ids=${i+18}&token_ids=${i+19}&token_ids=${i+20}&token_ids=${i+21}&token_ids=${i+22}&token_ids=${i+23}&token_ids=${i+24}&token_ids=${i+25}&token_ids=${i+26}&token_ids=${i+27}&token_ids=${i+28}&token_ids=${i+29}&limit=30`
        //     console.log("open_sea Api", opensea_api)
        //     const opensea_api_res = axios.get(opensea_api)
        //     request2 = [...request2  , opensea_api_res]        
            
        //   }
        //   console.log("5th functions Ended")
        //   const responses2 = await axios.all(request2)
        //   responses2.map((response: any) => {
        //     flatResponse = [...flatResponse, response.data.assets]
        //   })
        //   dispatch(setOpenseaData2(flatResponse.flat()))
        //   await delayFn(delayNFT*30);
        //   request2 = [];
        //   flatResponse= [];    
        //   console.log("Nullling ", request2, flatResponse)
        //   await delayFn(delayNFT*300);

        // },

    ]);
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RankNFT as RankNFTType } from '../../../types/web3-v1-contracts/RankNFT'
// import { sort } from 'fast-sort';
import axios from "axios";


export interface Attribute {
  trait_type :string, 
  value: string,
  value_rarity_score: number,
  value_normalized_rarity_score: number
}

export interface Attribute2 {
  [trait_type :string] : Attribute
}

export interface AttributesOfEachToekn {
  tokenID: string
  attributes: Attribute[],
  opensea_data: any,
  opensea: {price: string, permalink: string},
  rarity_score: number, 
  normalized_rarity_score: number, 
  image: string,
  title?: string
  description?: string,
  name?: string,
}

export interface AttributesOfEachToekn2 {
  [tokenID: string] : AttributesOfEachToekn
}

export interface TraitCount {
  value: string,
  count: number
}

export interface CountOfEachAttribute {
  trait_type :string, 
  trait_count: TraitCount[] | null,
  total_variations: number
}


export interface CountOfEachAttribute2Values {
  trait_type: string,
  trait_count: any, 
  total_variations: number
}

export interface CountOfEachAttribute2 {
  [key: string]: CountOfEachAttribute2Values
}


export interface RarityScoreOfValue {
  trait_type: string,
  value :string, 
  rarity_score: number ,
  normalized_rarity_score: number ,
}

export interface RarityScoreOfValue2 {
  [value :string] : RarityScoreOfValue
}


interface Range {
  from: number, to: number, range: number
}

export interface ProjectInfo {
    contractAddress?: string,
    totalSupply:  number,
    firstTokenIndex: number | null,
    name:  string,
    baseTokenURI?: string | null,
    range: Range | null
  }

export interface Loading {
  requested: boolean,
  started: boolean,
  completed: boolean
}

interface DataType {
    userAddress: string,
    isOwner: boolean,
    isDeveloper: boolean,
    ContractData: RankNFTType | null,
    loading: boolean,
    loadingNFTS: boolean,
    transectionProgress: boolean,
    contractAddress: string | null,
    isWaletConnect: boolean,
    isWhiteListed: boolean,
    isSignedIn: boolean,
    isSubscriber: boolean,
    whitelistPeriod: number,
    subscriptionPeriod: number,
    uploadedContractAddress: string,
    allAvailableAttributes: CountOfEachAttribute[] | null,

    list_of_all_tokens: AttributesOfEachToekn[] | null,
    // list_of_all_tokens_onSale: AttributesOfEachToekn[] | null,
    list_of_all_tokens_top_20: AttributesOfEachToekn[] | null,
    list_of_all_tokens_remaining: AttributesOfEachToekn[] | null,
    list_of_all_tokens2: AttributesOfEachToekn2,

    countOfAllAttribute: CountOfEachAttribute[] | null,
    countOfAllAttribute2:CountOfEachAttribute2

    rarityScoreOfAllValues: RarityScoreOfValue[] | null,
    rarityScoreOfAllValues2: RarityScoreOfValue2,


    projectInfo: ProjectInfo | null,
    loading_contractData: Loading,
    isSnipping: Loading,

    

  }

const initialState: DataType = {
    userAddress: "",
    isOwner: false,
    isDeveloper: false,
    ContractData: null,
    loading: false,
    loadingNFTS: false,
    transectionProgress: false,
    contractAddress: "",
    isWaletConnect: false,
    isWhiteListed: false,
    isSignedIn: false,
    isSubscriber: false,
    whitelistPeriod: 0,
    subscriptionPeriod: 0,
    uploadedContractAddress: "",
    allAvailableAttributes: null,
    list_of_all_tokens: null,
    // list_of_all_tokens_onSale: null,
    list_of_all_tokens_top_20: null,
    list_of_all_tokens_remaining: null,
    list_of_all_tokens2: {},
    countOfAllAttribute: null,
    countOfAllAttribute2: {},
    rarityScoreOfAllValues: null,
    rarityScoreOfAllValues2: {},

    projectInfo: null,
    loading_contractData: {requested: false, started: false, completed: false},
    isSnipping: {requested: false, started: false, completed: false},


}

// First, define the reducer and action creators via `createSlice`
const dataSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearState(state) {
      return initialState;
    },
    setOwner(state, { payload }: PayloadAction<boolean>) {
      // Use a "state machine" approach for loading state instead of booleans
      state.isOwner = payload;
    },
    setDeveloper(state, { payload }: PayloadAction<boolean>) {
      // Use a "state machine" approach for loading state instead of booleans
      state.isDeveloper = payload;
    },
    setContractAddress(state, { payload }: PayloadAction<string>) {
      // Use a "state machine" approach for loading state instead of booleans
      state.contractAddress = payload;
    },
    setActiveUser(state, { payload }: PayloadAction<string>) {
      // Use a "state machine" approach for loading state instead of booleans
      state.userAddress = payload;
    },
    userWalletconnected(state, { payload }: PayloadAction<boolean>) {
      // Use a "state machine" approach for loading state instead of booleans
      state.isWaletConnect = payload;
    },
    setWhiteListed(state, { payload }: PayloadAction<boolean>) {
      // Use a "state machine" approach for loading state instead of booleans
      state.isWhiteListed = payload;
    },
    setSubscriber(state, { payload }: PayloadAction<boolean>) {
      // Use a "state machine" approach for loading state instead of booleans
      state.isSubscriber = payload;
    },
    setSignedIn(state, { payload }: PayloadAction<boolean>) {
      // Use a "state machine" approach for loading state instead of booleans
      state.isSignedIn = payload;
    },
    setLogout(state) {
      // Use a "state machine" approach for loading state instead of booleans
      state.isSignedIn = false;
      state.isSubscriber = false;
      state.isWhiteListed = false;
      state.isWaletConnect = false;
      state.isOwner = false;
      state.isDeveloper = false;
    },
    setContractData(state, { payload }: PayloadAction<RankNFTType>) {
      // Use a "state machine" approach for loading state instead of booleans
      state.ContractData = payload;
    },
    setLoading(state, { payload }: PayloadAction<boolean>) {
      // Use a "state machine" approach for loading state instead of booleans
      state.loading = payload;
    },
    setTransectionProgress(state, { payload }: PayloadAction<boolean>) {
      // Use a "state machine" approach for loading state instead of booleans
      state.loading = payload;
    },
    setWhitelistPeriod(state, { payload }: PayloadAction<number>) {
      state.whitelistPeriod = payload;
    },
    setSubscriptionPeriod(state, { payload }: PayloadAction<number>) {
      state.subscriptionPeriod = payload;
    },
    setUploadedContractAddress(state, { payload }: PayloadAction<string>) {
      state.uploadedContractAddress = payload;
    },

    setProjectRange(state, { payload }: PayloadAction<Range>) {
      if (state.projectInfo) {
        state.projectInfo.range = payload;
      }
    },

    setProjectInfo(state, { payload }: PayloadAction<ProjectInfo | null>) {
      if (payload === null) {
        state.projectInfo = null;
      } else {
        state.projectInfo = payload;
      }
    },

    setLoadingNFTs(state, { payload }: PayloadAction<boolean>) {
      // Use a "state machine" approach for loading state instead of booleans
      state.loadingNFTS = payload;
    },

    sortByRarityScore(state,  { payload }: PayloadAction<"accs"|"decs">) {
      console.log("Sorting start by Rarity", state.list_of_all_tokens)

      if(state.list_of_all_tokens){
        if(payload === "decs"){
          state.list_of_all_tokens = state.list_of_all_tokens.sort( (a, b) => {
              return b.rarity_score - a.rarity_score;
            });
        }
        if(payload === "accs"){
          state.list_of_all_tokens = state.list_of_all_tokens.sort( (a, b) => {
              return a.rarity_score - b.rarity_score;
            });
        }
      }
      console.log("Sorting End by Rarity", state.list_of_all_tokens)
    },

    sortByTokenID(state,  { payload }: PayloadAction<"accs"|"decs">) {
      console.log("Sorting start by ID", state.list_of_all_tokens)
      if(state.list_of_all_tokens){
        if(payload === "accs"){
        state.list_of_all_tokens.sort( (a, b) => {
            return Number(b.tokenID) - Number(a.tokenID);
          });
        }
        if(payload === "decs"){
          state.list_of_all_tokens.sort( (a, b) => {
              return Number(a.tokenID) - Number(b.tokenID);
            });
          }
      }
      console.log("Sorting End by ID" , state.list_of_all_tokens)
    },

    sortByPrice(state,  { payload }: PayloadAction<"accs"|"decs">) {
      console.log("Sorting start by price", state.list_of_all_tokens)
      if(state.list_of_all_tokens){
          if(payload === "decs"){
              state.list_of_all_tokens.sort( (a, b) => {
                return Number(b.opensea.price) - Number(a.opensea.price);
              });
            }
            if(payload === "accs"){
                state.list_of_all_tokens.sort( (a, b) => {
                  return Number(a.opensea.price) - Number(b.opensea.price);
                });
              }
      }
      console.log("Sorting End by price", state.list_of_all_tokens)
    },


    setAvailableAttributes(
      state,
      { payload }: PayloadAction<CountOfEachAttribute | null>
    ) {
      if (payload === null) {
        state.allAvailableAttributes = null;
      } else {
        if (state.allAvailableAttributes !== null) {
          state.allAvailableAttributes = [
            ...state.allAvailableAttributes,
            payload,
          ];
        } else {
          state.allAvailableAttributes = [payload];
        }
      }
    },

    addTokenInList( state, { payload }: PayloadAction<AttributesOfEachToekn[] | null> ) {
      // console.log("payload added ", payload)
      if (payload === null) {
        state.list_of_all_tokens = null;
      } else {
        if (state.list_of_all_tokens !== null) {
          state.list_of_all_tokens = [...state.list_of_all_tokens, ...payload];
        } else {
          state.list_of_all_tokens = payload;
        }
      }
    },

    
    addTokenInList2( state, { payload }: PayloadAction<AttributesOfEachToekn> ) {
      console.log("payload in addTokenInList2 ", payload)

          state.list_of_all_tokens2[payload.tokenID] = payload


      
    },

    addTokenInList3( state, { payload }: PayloadAction<AttributesOfEachToekn[]> ) {
      console.log("payload in addTokenInList3 ", payload)

      payload.map((token: AttributesOfEachToekn) => {
        state.list_of_all_tokens2[token.tokenID] = token        
      })


      
    },

    setRarityScoreToAttributeValue(

      state,
      { payload }: PayloadAction<RarityScoreOfValue | null>
    ) {
      if (payload === null) {
        state.rarityScoreOfAllValues = null;
      } else {
        if (state.rarityScoreOfAllValues === null) {
          state.rarityScoreOfAllValues = [payload];
        } else {
          state.rarityScoreOfAllValues = [
            ...state.rarityScoreOfAllValues,
            payload,
          ];
        }
      }

    },

    setRarityScoreToEachNFTAttribuValue( state, { payload }: PayloadAction<RarityScoreOfValue> ) {
      
      console.log("lis of all tokens ", state.list_of_all_tokens)

      state.list_of_all_tokens?.map(
        (token: AttributesOfEachToekn) => {
          
          token.attributes.map((attribute: Attribute) => {
            if (attribute.value === payload.value) {
              
              attribute.value_rarity_score = payload.rarity_score;
              attribute.value_normalized_rarity_score = payload.normalized_rarity_score;

              token.rarity_score = token.rarity_score + payload.rarity_score;
              token.normalized_rarity_score = token.normalized_rarity_score + payload.normalized_rarity_score;
            }
          });
        });
       
    },

    setRarityScoreToAttributeValue2(state, { payload }: PayloadAction<RarityScoreOfValue> ) {

      state.rarityScoreOfAllValues2[payload.value] = payload;

    },


    setRarityScoreToEachNFTAttribuValue2( state, { payload }: PayloadAction<RarityScoreOfValue> ) {
              
              // state.list_of_all_tokens2[payload.trait_type].attributes?.map((attribute) => {
              //   if(attribute.value === payload.value){
              //     attribute.value_rarity_score = payload.rarity_score
              //     attribute.value_normalized_rarity_score = payload.normalized_rarity_score
              //   }
              // });
              
              // state.list_of_all_tokens2[payload.trait_type].rarity_score += payload.rarity_score;
              // state.list_of_all_tokens2[payload.trait_type].normalized_rarity_score += payload.normalized_rarity_score;

      Object.values(state.list_of_all_tokens2).map((token) => {

        token.attributes.map((attribute) => {
            if (attribute.value === payload.value) {
              
              attribute.value_rarity_score = payload.rarity_score;
              attribute.value_normalized_rarity_score = payload.normalized_rarity_score;

              token.rarity_score = token.rarity_score + payload.rarity_score;
              token.normalized_rarity_score = token.normalized_rarity_score + payload.normalized_rarity_score;
            }
        })

      })



      if(state.list_of_all_tokens_top_20 === null){
        state.list_of_all_tokens_top_20 = Object.values(state.list_of_all_tokens2)
      }
      else if (state.list_of_all_tokens_remaining === null){
        state.list_of_all_tokens_remaining = Object.values(state.list_of_all_tokens2)
        state.list_of_all_tokens = Object.values(state.list_of_all_tokens2)
        console.log("state.list_of_all_tokens", state.list_of_all_tokens)
      }
      else {
        state.list_of_all_tokens = Object.values(state.list_of_all_tokens2)
        // state.list_of_all_tokens_onSale = state.list_of_all_tokens.filter(onSaleFiler)
      }
       
    },

    setOnlyOnSaleState(state, { payload }: PayloadAction<boolean>){
      console.log("setOnlyOnSaleState")
      if(payload === true){
        state.list_of_all_tokens = state.list_of_all_tokens && state.list_of_all_tokens.filter((token) => {
          return Number(token.opensea.price) !== 0
        })
        // state.list_of_all_tokens = state.list_of_all_tokens.sort((a, b) => {
        //   return Number(a.tokenID) - Number(b.tokenID);
        // });
      }
      if(payload === false){
        state.list_of_all_tokens = Object.values(state.list_of_all_tokens2).sort((a, b) => {
          return Number(a.tokenID) - Number(b.tokenID);
        });
      }
    },

    getTop20NFTs(state){

      // const sorted = Object.values(state.list_of_all_tokens2).sort( (a, b) => {
      //   return b.rarity_score - a.rarity_score;
      // });

      // const delayFn = (ms:number) => new Promise((r) => setTimeout(r, ms));

      // let tope20OpenSeaResponses:any = [];
      // let arrayOfLinks: any = [];
      // let count = 1
      // const initialLink = `https://api.opensea.io/api/v1/assets?asset_contract_address=${state?.projectInfo?.contractAddress}`;
      
      // // const opensea_api  = `https://api.opensea.io/api/v1/assets?asset_contract_address=${state?.projectInfo?.contractAddress}&token_ids=${i}&token_ids=${i+1}&token_ids=${i+2}&token_ids=${i+3}&token_ids=${i+4}&token_ids=${i+5}&token_ids=${i+6}&token_ids=${i+7}&token_ids=${i+8}&token_ids=${i+9}&token_ids=${i+10}&token_ids=${i+11}&token_ids=${i+12}&token_ids=${i+13}&token_ids=${i+14}&token_ids=${i+15}&token_ids=${i+16}&token_ids=${i+17}&token_ids=${i+18}&token_ids=${i+19}&token_ids=${i+20}&token_ids=${i+21}&token_ids=${i+22}&token_ids=${i+23}&token_ids=${i+24}&token_ids=${i+25}&token_ids=${i+26}&token_ids=${i+27}&token_ids=${i+28}&token_ids=${i+29}&limit=30`
      
      // const top20 = sorted.slice(0,100)
      // let link = initialLink;
      // top20.forEach((token) => {
      //   console.log(`${token.tokenID} ->  ${token.rarity_score}`)

      //   link = link.concat(`&token_ids=${token.tokenID}`);

      //   if(count%30==0 || count === top20.length){
      //     arrayOfLinks.push(link.concat("&limit=30"))
      //     link = initialLink;
      //   }

      //   count++
      // })

      // console.log("arrayOfLinks", arrayOfLinks)
      
      // arrayOfLinks.forEach(async (opensea_api:any)=> {
      //     await delayFn(300);

      //     const res:any = await axios.get(opensea_api)
      //     // .then((res: any) => {
      //     console.log("open_sea Api res", res.data.assets)
      //     tope20OpenSeaResponses.push(res.data.assets)
      //   // })

      // })




      // console.log("tope20OpenSeaResponses", tope20OpenSeaResponses.flat())

      // tope20OpenSeaResponses.flat().map((openseaAsset: any) => {
      //   console.log("opensea Asset", openseaAsset)
      //   const onSale = openseaAsset?.sell_orders && openseaAsset?.sell_orders[0] ? true:false;
      //   const price = onSale ? Math.round(openseaAsset?.sell_orders[0].current_price) : 0

      //   if(state.list_of_all_tokens2[openseaAsset.token_id]){
      //     state.list_of_all_tokens2[openseaAsset.token_id].opensea.permalink = openseaAsset.permalink
      //     state.list_of_all_tokens2[openseaAsset.token_id].opensea.price = price    
      //     console.log(" opensea token after update", state.list_of_all_tokens2[openseaAsset.token_id])
      //   }

      // })

      // state.list_of_all_tokens = Object.values(state.list_of_all_tokens2).sort( (a, b) => {
      //   return b.rarity_score - a.rarity_score;
      // });


    },

    setInitalCountOfAllAttribute( state, { payload }: PayloadAction<CountOfEachAttribute[] | null> ) {
      if (payload === null) {
        state.countOfAllAttribute = null;
      } else {
        state.countOfAllAttribute = payload;
      }
    },

    setCountOfAllAttribute(state, { payload }: PayloadAction<Attribute[] >) {

      if (state.countOfAllAttribute !== null) {
        state.countOfAllAttribute.forEach(
          (countOfEachAttribute: CountOfEachAttribute) => {

            payload.forEach((attribute: Attribute) => {

            // Find the trait type
              // if (state.countOfAllAttribute?.find(e => e.trait_type == attribute.trait_type)){ 
                 if (countOfEachAttribute.trait_type === attribute.trait_type) {

                // initiate the trait count array to store all the trait values and add first trait value
                if (countOfEachAttribute.trait_count === null) {
                  const new_trait_count = { value: attribute.value, count: 1 };
                  countOfEachAttribute.trait_count = [new_trait_count];
                  countOfEachAttribute.total_variations++;
                }

                // Trait array already existed. 
                else {

                  // Check if value already present or not
                  // const checkValue = (obj: any) => obj.value === String(attribute.value);
                  // const isPresent = countOfEachAttribute.trait_count.some(checkValue)
                  const isPresent = countOfEachAttribute.trait_count.find(e => e.value == attribute.value)

                   // Value matched, increase its count by one
                    if (isPresent) {
                    // countOfEachAttribute.trait_count &&
                      countOfEachAttribute.trait_count.forEach((trait) => {
                        if (trait.value === attribute.value) {
                          trait.count++;
                        }
                      });
                  } 

                  // Value doesn't match, add a new entry and increase the count of variations by one
                  else {
                    const new_trait_count = { value: attribute.value, count: 1 };
                    countOfEachAttribute.trait_count = [
                      ...countOfEachAttribute.trait_count,
                      new_trait_count,
                    ];
                    countOfEachAttribute.total_variations++;
                  }
                }
              }
            })
          }
        )
      }
    },

    setInitialCountOfAllAttribute2(state, { payload }: PayloadAction<Attribute[] >) {
      payload.forEach((attribute) => {
        state.countOfAllAttribute2[attribute.trait_type] = {trait_type: attribute.trait_type, trait_count: {}, total_variations: 0};

      })

    },

    setCountOfAllAttribute2(state, { payload }: PayloadAction<Attribute[] >) {

      console.log("payload in setCOunt", payload)
      payload.forEach((attribute) => {
        if (!state.countOfAllAttribute2[attribute.trait_type])
            state.countOfAllAttribute2[attribute.trait_type] = {trait_type: attribute.trait_type, trait_count: {}, total_variations: 0};

        if (!state.countOfAllAttribute2[attribute.trait_type].trait_count[attribute.value]) {
            state.countOfAllAttribute2[attribute.trait_type].trait_count[attribute.value] = {value: attribute.value, count: 1};
            state.countOfAllAttribute2[attribute.trait_type].total_variations+=1;
        }
        else state.countOfAllAttribute2[attribute.trait_type].trait_count[attribute.value].count +=1;
      })

    },

    setCountOfAllAttribute3(state, { payload }: PayloadAction<Attribute[][] >) {

      payload.forEach((attributes) => {
        attributes.forEach((attribute) => {
          if (!state.countOfAllAttribute2[attribute.trait_type])
          state.countOfAllAttribute2[attribute.trait_type] = {trait_type: attribute.trait_type, trait_count: {}, total_variations: 0};

          if (!state.countOfAllAttribute2[attribute.trait_type].trait_count[attribute.value]) {
              state.countOfAllAttribute2[attribute.trait_type].trait_count[attribute.value] = {value: attribute.value, count: 1};
              state.countOfAllAttribute2[attribute.trait_type].total_variations+=1;
          }
          else state.countOfAllAttribute2[attribute.trait_type].trait_count[attribute.value].count +=1;
        })    
      })

      console.log("countOfAllAttribute2", state.countOfAllAttribute2)

    },

    setOpenseaData(state, {payload}:PayloadAction< any>){
      state?.list_of_all_tokens?.map((token:AttributesOfEachToekn ) => {
        payload.map((openseaAsset: any) => {
          if(token.tokenID === openseaAsset.token_id){
            const onSale = openseaAsset?.sell_orders && openseaAsset?.sell_orders[0] ? true:false;
            const price = onSale ? Math.round(openseaAsset?.sell_orders[0].current_price) : 0

            // console.log("openseaAsset matched with Token", openseaAsset, JSON.stringify(token))
            token.opensea_data = openseaAsset

            token.opensea = {price: String(price), permalink: openseaAsset.permalink}
          }
        })
      })
    },

    setOpenseaData2(state, {payload}:PayloadAction< any>){

      console.log("opensea payload", payload)

        payload.map((openseaAsset: any) => {
          console.log("opensea Asset", openseaAsset)
          const onSale = openseaAsset?.sell_orders && openseaAsset?.sell_orders[0] ? true:false;
          const price = onSale ? Math.round(openseaAsset?.sell_orders[0].current_price) : 0

          if(state.list_of_all_tokens2[openseaAsset.token_id]){
            state.list_of_all_tokens2[openseaAsset.token_id].opensea.permalink = openseaAsset.permalink
            state.list_of_all_tokens2[openseaAsset.token_id].opensea.price = String(price)    
            console.log(" opensea token after update", state.list_of_all_tokens2[openseaAsset.token_id])
          }

        })

        state.list_of_all_tokens = Object.values(state.list_of_all_tokens2).sort( (a, b) => {
            return b.rarity_score - a.rarity_score;
          });

    },

    setLoadingContractData(state, {payload}: PayloadAction<{action: "started"|"completed", value: boolean}>){

      if(payload.action === "started"){
        state.loading_contractData =  {...state.loading_contractData, started: payload.value}
      }

      if(payload.action === "completed"){
        state.loading_contractData =  {...state.loading_contractData, completed: payload.value}
      }

    },

    setIsSnipping(state, {payload}: PayloadAction<{action: "allowSnipping"|"requested"|"started"|"completed"| null}>){

      if(payload.action === null){
        state.isSnipping =  {requested: false, started: false, completed: false}
      }
      else {
        if(payload.action === "requested"){
          state.isSnipping =  {requested: true, started: false, completed: false}
        }

        if(payload.action === "started"){
          state.isSnipping =  {requested: true, started: true, completed: false}
        }
  
        if(payload.action === "completed"){
          state.isSnipping =  {requested: true, started: true, completed: true}
        }
        if(payload.action === "allowSnipping"){
          state.isSnipping =  {requested: true, started: false, completed: true}
        }
        
      }
    },

    reSetSnipping(state){

      state.allAvailableAttributes= null,
      state.countOfAllAttribute2 = {},      
      state.list_of_all_tokens= null,
      state.list_of_all_tokens2= {},
      state.list_of_all_tokens_top_20 =  null,
      state.list_of_all_tokens_remaining = null,
      state.countOfAllAttribute= null,
      state.countOfAllAttribute2 = {},
      state.rarityScoreOfAllValues= null,
      state.isSnipping= { requested: false, started: false, completed: false }
  
    
    },

    convertInList(state){
      state.list_of_all_tokens = Object.values(state.list_of_all_tokens2)
    }
      


  }
    

});
  


  
// Extract the action creators object and the reducer
const { actions, reducer } = dataSlice
// Extract and export each action creator by name
export const  {setOnlyOnSaleState, getTop20NFTs, setCountOfAllAttribute3, convertInList, setRarityScoreToAttributeValue2, setRarityScoreToEachNFTAttribuValue2, addTokenInList3, setOpenseaData2, addTokenInList2, setCountOfAllAttribute2, setInitialCountOfAllAttribute2, sortByPrice, setOpenseaData, reSetSnipping, setIsSnipping, setLoadingContractData, setLoadingNFTs, sortByTokenID, sortByRarityScore, setRarityScoreToEachNFTAttribuValue, setRarityScoreToAttributeValue, setProjectRange, setProjectInfo, setInitalCountOfAllAttribute, setCountOfAllAttribute, addTokenInList, setAvailableAttributes, setUploadedContractAddress, setContractAddress, setDeveloper, setTransectionProgress, setLogout, setSignedIn, clearState, setOwner, setWhitelistPeriod, setSubscriptionPeriod, setContractData, setActiveUser, setSubscriber, setWhiteListed, userWalletconnected, setLoading } = actions
// Export the reducer, either as a default or named export
export default reducer

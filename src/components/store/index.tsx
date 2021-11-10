import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RankNFT as RankNFTType } from '../../../types/web3-v1-contracts/RankNFT'
import web3 from 'web3';
var _ = require('lodash');


// export interface AttributeStats {
//   [trait_value: string] : {
//       trait_type :string, 
//       value: string,
//       value_rarity_score: number,
//       value_normalized_rarity_score: number
//   }
// }

// {
//   trait_type :string,
//   trait_value :string,
//   attributeStats: AttributeStats
// }

export interface Attribute {
[trait_type: string] : any
}


export interface Attribute2 {
  [tokenID :string] : Attribute
}

export interface AttributesOfEachToekn {
  rank: number,
  normalized_rank: number,
  tokenID: number
  attributes: Attribute,
  opensea_data: any,
  opensea: {saleType: string, price: number, permalink: string},
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
  total_variations: number,
  // presenceInTokens: string[] 
}

export interface CountOfEachAttribute2 {
  [trait_type: string]: CountOfEachAttribute2Values
}

export interface RarityScoreOfValue {
  trait_type: string,
  value :string, 
  rarity_score: number ,
  normalized_rarity_score: number,
  presenceInTokens: string[] 
}

export interface RarityScoreOfValue2 {
  [value :string] : RarityScoreOfValue
}

interface Range {
  from: number, to: number, range: number
}

export interface ProjectInfo {
    contractAddress: string,
    totalSupply:  string,
    firstTokenIndex: string | null,
    name:  string,
    baseTokenURI?: string | null,
    range: Range | null,
    loadingProgree: number,
    processingProgress: number
  }

export interface Loading {
  requested: boolean,
  started: boolean,
  completed: boolean,
  showNFTs: boolean,
  openSeaDataArrived: boolean,
  startTop20: boolean,
  startRemaining: boolean,
}

export interface Progress {
  snip : {started: boolean, ended: boolean},
  dataFetch : {started: boolean, ended: boolean},
  dataProcess : {started: boolean, ended: boolean},
  raritiesAssign : {started: boolean, ended: boolean},
  openseaFetch : {started: boolean, ended: boolean},
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
    list_of_all_tokens_normalized: AttributesOfEachToekn[] | null,
    list_of_all_tokens_not_normalized: AttributesOfEachToekn[] | null,
    list_of_all_tokensBackup: AttributesOfEachToekn[] | null,

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
    progress: Progress,    
    isSnipping: Loading,
    normalization: boolean,
    onlyOnSale: boolean,
    sortType: number

    

    

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
    list_of_all_tokens_normalized: null,
    list_of_all_tokens_not_normalized: null,
    list_of_all_tokensBackup: null,
    // list_of_all_tokens_onSale: null,
    list_of_all_tokens_top_20: null,
    list_of_all_tokens_remaining: null,
    list_of_all_tokens2: {},
    countOfAllAttribute: null,
    countOfAllAttribute2: {},
    rarityScoreOfAllValues: null,
    rarityScoreOfAllValues2: {},

    projectInfo: null,
    loading_contractData: {requested: false, started: false, completed: false, showNFTs: false, openSeaDataArrived: false, startTop20: false, startRemaining: false},
    isSnipping: {requested: false, started: false, completed: false, showNFTs: false, openSeaDataArrived: false, startTop20: false, startRemaining: false},

    normalization: false,
    onlyOnSale: false,
    sortType: 0,


    progress : {
      snip : {started: false, ended: false},
      dataFetch : {started: false, ended: false},
      dataProcess : {started: false, ended: false},
      raritiesAssign : {started: false, ended: false},
      openseaFetch : {started: false, ended: false},
    }

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

    setLoadingProgress(state, { payload }: PayloadAction<number>) {
      if (state.projectInfo && state.projectInfo.range) {
        console.log("pay load in setProgress");
        state.projectInfo.loadingProgree =
          (payload * 100) / state.projectInfo.range.range;
      }
    },

    setProcessingProgress(state, { payload }: PayloadAction<number>) {
      // console.log("ProcessesingProgree payload ", payload)
      if (state.projectInfo) {
        state.projectInfo.processingProgress =
          (payload * 100) / Object.keys(state.countOfAllAttribute2).length;
        // console.log("ProcessesingProgree ", state.projectInfo.processingProgress)
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

    assignRank(state) {
      if (state.list_of_all_tokens) {
        // console.log("normalized ranking started")

        state.list_of_all_tokens = state.list_of_all_tokens?.sort((a, b) => {
          return b.normalized_rarity_score - a.normalized_rarity_score;
        });

        state.list_of_all_tokens.forEach((token, index) => {
          token.normalized_rank = index + 1;
        });

        state.list_of_all_tokens_normalized = state.list_of_all_tokens;

        state.list_of_all_tokens = state.list_of_all_tokens?.sort((a, b) => {
          return b.rarity_score - a.rarity_score;
        });

        state.list_of_all_tokens.forEach((token, index) => {
          token.rank = index + 1;
        });

        state.list_of_all_tokens_not_normalized = state.list_of_all_tokens;
      }
    },

    assignNormalizedRank(state) {},

    switchNormalization(state) {

      if (state.normalization === true) {

        state.list_of_all_tokens?.sort((a, b) => {
          if (a.opensea.price === b.opensea.price) {
            return b.rarity_score - a.rarity_score;
          }
          return a.opensea.price - b.opensea.price;
        });

        state.list_of_all_tokensBackup?.sort((a, b) => {
          if (a.opensea.price === b.opensea.price) {
            return b.rarity_score - a.rarity_score;
          }
          return a.opensea.price - b.opensea.price;
        });

        state.normalization = !state.normalization;

      }

        else if (state.normalization === false) {

          state.list_of_all_tokens?.sort((a, b) => {
            if (a.opensea.price === b.opensea.price) {
              return b.normalized_rarity_score - a.normalized_rarity_score;
            }
            return a.opensea.price - b.opensea.price;
          });
  
          state.list_of_all_tokensBackup?.sort((a, b) => {
            if (a.opensea.price === b.opensea.price) {
              return b.normalized_rarity_score - a.normalized_rarity_score;
            }
            return a.opensea.price - b.opensea.price;
          });

          state.normalization = !state.normalization;
        
        }


    },

    sortByRarityScore( state, { payload }: PayloadAction<"accs" | "decs" | "Ratity+Price">) {
        if (payload === "decs") {

          state.list_of_all_tokens?.sort((a, b) => {
            if (state.normalization === true) {
              return b.normalized_rank - a.normalized_rank;
            } else {
              return b.rank - a.rank;
            }
          });

          state.list_of_all_tokensBackup?.sort((a, b) => {
                if (state.normalization === true) {
                  return b.normalized_rank - a.normalized_rank;
                } else {
                  return b.rank - a.rank;
                }
              });
        } 
        
        else if (payload === "accs") {

          state.list_of_all_tokens?.sort((a, b) => {
            if (state.normalization === true) {
                return a.normalized_rank - b.normalized_rank;
            } else {
                return a.rank - b.rank;
            }
          });

          state.list_of_all_tokensBackup?.sort((a, b) => {
              if (state.normalization === true) {
                  return a.normalized_rank - b.normalized_rank;
              } else {
                  return a.rank - b.rank;
              }
              });
          }
    },

    sortByTokenID(state, { payload }: PayloadAction<"accs" | "decs">) {
      // console.log("Sorting start by ID", state.list_of_all_tokens)
        if (payload === "accs") {
          state.list_of_all_tokens?.sort((a, b) => {
            return Number(a.tokenID) - Number(b.tokenID);
          });

          state.list_of_all_tokensBackup?.sort((a, b) => {
            return Number(a.tokenID) - Number(b.tokenID);
          });
        }

        else if (payload === "decs") {

          state.list_of_all_tokens?.sort((a, b) => {
            return Number(b.tokenID) - Number(a.tokenID);
          });

          state.list_of_all_tokensBackup?.sort((a, b) => {
            return Number(b.tokenID) - Number(a.tokenID);
          });
          
        }
    },

    sortByPrice(state, { payload }: PayloadAction<"accs" | "decs">) {
      if (payload === "decs") {

        state.list_of_all_tokens?.sort((a, b) => {
          return Number(b.opensea.price) - Number(a.opensea.price);
        });

        state.list_of_all_tokensBackup?.sort((a, b) => {
          return Number(b.opensea.price) - Number(a.opensea.price);
        });
      } 
      
      else if (payload === "accs") {

        state.list_of_all_tokens?.sort((a, b) => {
          return Number(a.opensea.price) - Number(b.opensea.price);
        });

        state.list_of_all_tokensBackup?.sort((a, b) => {
          return Number(a.opensea.price) - Number(b.opensea.price);
        });
      }
    },

    sortByRankAndPrice(state) {
      if (state.normalization === true) {
        
        state.list_of_all_tokens?.sort((a, b) => {
          if (a.opensea.price === b.opensea.price) {
            return b.normalized_rarity_score - a.normalized_rarity_score;
          }
          return a.opensea.price - b.opensea.price;
        });

        state.list_of_all_tokensBackup?.sort((a, b) => {
          if (a.opensea.price === b.opensea.price) {
            return b.normalized_rarity_score - a.normalized_rarity_score;
          }
          return a.opensea.price - b.opensea.price;
        });
      } 
      
      else if (state.normalization === false) {

        state.list_of_all_tokens?.sort((a, b) => {
          if (a.opensea.price === b.opensea.price) {
            return b.rarity_score - a.rarity_score;
          }
          return a.opensea.price - b.opensea.price;
        });

        state.list_of_all_tokensBackup?.sort((a, b) => {
          if (a.opensea.price === b.opensea.price) {
            return b.rarity_score - a.rarity_score;
          }
          return a.opensea.price - b.opensea.price;
        });
      }
    },

    setOnlyOnSaleState(state) {
      // console.log("setOnlyOnSaleState")
      if (state.list_of_all_tokens && state.onlyOnSale === false) {
        state.list_of_all_tokensBackup = state.list_of_all_tokens;
        state.list_of_all_tokens = state.list_of_all_tokens.filter((token) => {
          return token.opensea.saleType === "onSale";
        });
        state.onlyOnSale = !state.onlyOnSale;
      } 
      
      else if (state.list_of_all_tokensBackup && state.onlyOnSale === true) {
        state.list_of_all_tokens = state.list_of_all_tokensBackup;
        state.onlyOnSale = !state.onlyOnSale;
      }
    },

    setSortType(state, { payload }: PayloadAction<number>) {
      state.sortType;
    },

    // setAvailableAttributes(
    //   state,
    //   { payload }: PayloadAction<CountOfEachAttribute | null>
    // ) {
    //   if (payload === null) {
    //     state.allAvailableAttributes = null;
    //   } else {
    //     if (state.allAvailableAttributes !== null) {
    //       state.allAvailableAttributes = [
    //         ...state.allAvailableAttributes,
    //         payload,
    //       ];
    //     } else {
    //       state.allAvailableAttributes = [payload];
    //     }
    //   }
    // },

    // addTokenInList(
    //   state,
    //   { payload }: PayloadAction<AttributesOfEachToekn[] | null>
    // ) {
    //   // console.log("payload added ", payload)
    //   if (payload === null) {
    //     state.list_of_all_tokens = null;
    //   } else {
    //     if (state.list_of_all_tokens !== null) {
    //       state.list_of_all_tokens = [...state.list_of_all_tokens, ...payload];
    //     } else {
    //       state.list_of_all_tokens = payload;
    //     }
    //   }
    // },

    // addTokenInList2(state, { payload }: PayloadAction<AttributesOfEachToekn>) {
    //   // console.log("payload in addTokenInList2 ", payload)

    //   state.list_of_all_tokens2[payload.tokenID] = payload;
    // },

    addTokenInList3( state, { payload }: PayloadAction<AttributesOfEachToekn2>) {

        state.list_of_all_tokens2 = payload;
      
    },

    // setRarityScoreToAttributeValue(
    //   state,
    //   { payload }: PayloadAction<RarityScoreOfValue | null>
    // ) {
    //   if (payload === null) {
    //     state.rarityScoreOfAllValues = null;
    //   } else {
    //     if (state.rarityScoreOfAllValues === null) {
    //       state.rarityScoreOfAllValues = [payload];
    //     } else {
    //       state.rarityScoreOfAllValues = [
    //         ...state.rarityScoreOfAllValues,
    //         payload,
    //       ];
    //     }
    //   }
    // },

    // setRarityScoreToEachNFTAttribuValue(
    //   state,
    //   { payload }: PayloadAction<RarityScoreOfValue>
    // ) {
    //   // console.log("lis of all tokens ", state.list_of_all_tokens)

    //   state.list_of_all_tokens?.map((token: AttributesOfEachToekn) => {
    //     token.attributes.map((attribute: Attribute) => {
    //       if (attribute.value === payload.value) {
    //         attribute.value_rarity_score = payload.rarity_score;
    //         attribute.value_normalized_rarity_score =
    //           payload.normalized_rarity_score;

    //         token.rarity_score = token.rarity_score + payload.rarity_score;
    //         token.normalized_rarity_score =
    //           token.normalized_rarity_score + payload.normalized_rarity_score;
    //       }
    //     });
    //   });
    // },

    setRarityScoreToAttributeValue2(
      state,
      { payload }: PayloadAction<RarityScoreOfValue>
    ) {
      state.rarityScoreOfAllValues2[payload.value] = payload;
    },


    setRarityScoreToEachNFTAttribuValue2( state, { payload }: PayloadAction<RarityScoreOfValue> ) {

      // Object.values(state.list_of_all_tokens2).map((token) => {

      
        state.rarityScoreOfAllValues2[payload.value] = payload;

        payload.presenceInTokens.map((tokenID) => {

        // if ( attribute.trait_type === payload.trait_type && attribute.value === payload.value ) {

          // attribute.value_rarity_score = payload.rarity_score;
          // attribute.value_normalized_rarity_score = payload.normalized_rarity_score;
      
          // token.rarity_score = token.rarity_score + payload.rarity_score;
          // token.normalized_rarity_score = token.normalized_rarity_score + payload.normalized_rarity_score;

          // state.list_of_all_tokens2[tokenID].attributes.map((attribute)=> {
          //   if(attribute.trait_type === payload.trait_type && attribute.value === payload.value){
              
          //     attribute.value_rarity_score = payload.rarity_score;
          //     attribute.value_normalized_rarity_score = payload.normalized_rarity_score;
              
          //     state.list_of_all_tokens2[tokenID].rarity_score += payload.rarity_score;
          //     state.list_of_all_tokens2[tokenID].normalized_rarity_score += payload.normalized_rarity_score;              
          //   }
          
          // })

          console.log("payload matched in setRarityScore outside => ", payload)

          if(
            state.list_of_all_tokens2[tokenID].attributes
            &&
            state.list_of_all_tokens2[tokenID].attributes[payload.trait_type]
            &&
            state.list_of_all_tokens2[tokenID].attributes[payload.trait_type][payload.value]
            ){

            console.log("payload matched in setRarityScore inside => ", payload)

            state.list_of_all_tokens2[tokenID].attributes[payload.trait_type][payload.value].value_rarity_score = payload.rarity_score
            state.list_of_all_tokens2[tokenID].attributes[payload.trait_type][payload.value].value_normalized_rarity_score = payload.normalized_rarity_score
            
            state.list_of_all_tokens2[tokenID].rarity_score = state.list_of_all_tokens2[tokenID].rarity_score +  payload.rarity_score;
            state.list_of_all_tokens2[tokenID].normalized_rarity_score = state.list_of_all_tokens2[tokenID].normalized_rarity_score + payload.normalized_rarity_score;

          }
          

      });
    // });


      // state.list_of_all_tokens2[payload.trait_type].attributes.forEach((attribute) => {

      //   console.log("Yes", state.list_of_all_tokens2[payload.trait_type])
        
      //   attribute.value_rarity_score = payload.rarity_score;
      //   attribute.value_normalized_rarity_score = payload.normalized_rarity_score;

      //   state.list_of_all_tokens2[payload.trait_type].rarity_score = state.list_of_all_tokens2[payload.trait_type].rarity_score + payload.rarity_score;
      //   state.list_of_all_tokens2[payload.trait_type].normalized_rarity_score = state.list_of_all_tokens2[payload.trait_type].normalized_rarity_score +  payload.normalized_rarity_score;

      // })

      state.list_of_all_tokens = Object.values(state.list_of_all_tokens2);


    },

    // setInitalCountOfAllAttribute(
    //   state,
    //   { payload }: PayloadAction<CountOfEachAttribute[] | null>
    // ) {
    //   if (payload === null) {
    //     state.countOfAllAttribute = null;
    //   } else {
    //     state.countOfAllAttribute = payload;
    //   }
    // },

    // setCountOfAllAttribute(state, { payload }: PayloadAction<Attribute[]>) {
    //   if (state.countOfAllAttribute !== null) {
    //     state.countOfAllAttribute.forEach(
    //       (countOfEachAttribute: CountOfEachAttribute) => {
    //         payload.forEach((attribute: Attribute) => {
    //           // Find the trait type
    //           // if (state.countOfAllAttribute?.find(e => e.trait_type == attribute.trait_type)){
    //           if (countOfEachAttribute.trait_type === attribute.trait_type) {
    //             // initiate the trait count array to store all the trait values and add first trait value
    //             if (countOfEachAttribute.trait_count === null) {
    //               const new_trait_count = { value: attribute.value, count: 1 };
    //               countOfEachAttribute.trait_count = [new_trait_count];
    //               countOfEachAttribute.total_variations++;
    //             }

    //             // Trait array already existed.
    //             else {
    //               // Check if value already present or not
    //               // const checkValue = (obj: any) => obj.value === String(attribute.value);
    //               // const isPresent = countOfEachAttribute.trait_count.some(checkValue)
    //               const isPresent = countOfEachAttribute.trait_count.find((e) => e.value == attribute.value);

    //               // Value matched, increase its count by one
    //               if (isPresent) {
    //                 // countOfEachAttribute.trait_count &&
    //                 countOfEachAttribute.trait_count.forEach((trait) => {
    //                   if (trait.value === attribute.value) {
    //                     trait.count++;
    //                   }
    //                 });
    //               }

    //               // Value doesn't match, add a new entry and increase the count of variations by one
    //               else {
    //                 const new_trait_count = {
    //                   value: attribute.value,
    //                   count: 1,
    //                 };
    //                 countOfEachAttribute.trait_count = [
    //                   ...countOfEachAttribute.trait_count,
    //                   new_trait_count,
    //                 ];
    //                 countOfEachAttribute.total_variations++;
    //               }
    //             }
    //           }
    //         });
    //       }
    //     );
    //   }
    // },

    // setInitialCountOfAllAttribute2(
    //   state,
    //   { payload }: PayloadAction<Attribute[]>
    // ) {
    //   payload.forEach((attribute) => {
    //     state.countOfAllAttribute2[attribute.trait_type] = {
    //       trait_type: attribute.trait_type,
    //       trait_count: {},
    //       total_variations: 0,
    //     };
    //   });
    // },

    // setCountOfAllAttribute2(state, { payload }: PayloadAction<Attribute[]>) {
    //   // console.log("payload in setCOunt", payload)
    //   payload.forEach((attribute) => {
    //     if (!state.countOfAllAttribute2[attribute.trait_type])
    //       state.countOfAllAttribute2[attribute.trait_type] = {
    //         trait_type: attribute.trait_type,
    //         trait_count: {},
    //         total_variations: 0,
    //       };

    //     if (!state.countOfAllAttribute2[attribute.trait_type].trait_count[attribute.value]) {
    //       state.countOfAllAttribute2[attribute.trait_type].trait_count[attribute.value] = { value: attribute.value, count: 1 };
    //       state.countOfAllAttribute2[attribute.trait_type].total_variations += 1;
    //     } 
    //     else{
    //       state.countOfAllAttribute2[attribute.trait_type].trait_count[attribute.value].count += 1;
    //     }
    //   });
    // },

    setCountOfAllAttribute3(state, { payload }: PayloadAction<Attribute2>) {

      console.log("Counting of attribute starts")
      console.log(new Date().getTime())

      Object.keys(payload).forEach( (tokenID) => {

        console.log(tokenID, payload[tokenID])

        Object.values(payload[tokenID]).forEach((attribute) => {

          if (!state.countOfAllAttribute2[attribute.trait_type] )

            state.countOfAllAttribute2[attribute.trait_type] = {
              trait_type: attribute.trait_type,
              trait_count: {},
              total_variations: 0,
            };

          if (
            !state.countOfAllAttribute2[attribute.trait_type].trait_count[attribute.trait_value]) {

            state.countOfAllAttribute2[attribute.trait_type].trait_count[attribute.trait_value] = { 
              value: attribute.trait_value, count: 1 , presenceInTokens: [] };
              // state.countOfAllAttribute2[attribute.trait_type].trait_count[attribute.value].presenceInTokens.push(tokenID)

            state.countOfAllAttribute2[attribute.trait_type].total_variations += 1;

          } else
            state.countOfAllAttribute2[attribute.trait_type].trait_count[attribute.trait_value].count += 1;
            state.countOfAllAttribute2[attribute.trait_type].trait_count[attribute.trait_value].presenceInTokens.push(tokenID)

            // state.countOfAllAttribute2[attribute.trait_type].presenceInTokens.push(tokenID)



        });
      });

      console.log(new Date().getTime())
      console.log("Counting of attribute Ends")

      // console.log("countOfAllAttribute2", state.countOfAllAttribute2)
    },

    setOpenseaData(state, { payload }: PayloadAction<any>) {
      console.log("setOpenseaData started", payload)

      // if (state.list_of_all_tokens) {

        // state.list_of_all_tokens.map((token: AttributesOfEachToekn) => {

          payload.map((openseaAsset: any) => {

            // if (token.tokenID == openseaAsset.token_id) {
              // console.log("opensea data matched", token.tokenID)

              const onSale = openseaAsset?.sell_orders && openseaAsset?.sell_orders[0] ? true : false;
              let saleType = "none";

              if (onSale) {
                // console.log("===> payment_token_contract", openseaAsset?.sell_orders[0].payment_token_contract.symbol)

                if (
                  openseaAsset?.sell_orders[0].payment_token_contract.symbol ===
                  "ETH"
                ) {
                  saleType = "onSale";
                } else if (
                  openseaAsset?.sell_orders[0].payment_token_contract.symbol ===
                  "WETH"
                ) {
                  saleType = "onAuction";
                }
              }
              // console.log("===> payment_token_contract", openseaAsset )

              const price = onSale
                ? Number(
                    web3.utils.fromWei(
                      openseaAsset?.sell_orders[0].base_price,
                      "ether"
                    )
                  )
                : 0;

              // if(price>0){
              //   console.log("===> converted price", price)
              // }

              state.list_of_all_tokens2[openseaAsset.token_id].opensea_data = openseaAsset;
              state.list_of_all_tokens2[openseaAsset.token_id].opensea = {
                price: price,
                permalink: openseaAsset.permalink,
                saleType,
              };

          });

        state.list_of_all_tokens = Object.values(state.list_of_all_tokens2);
        
    },

    // setOpenseaData2(state, { payload }: PayloadAction<any>) {
    //   // console.log("opensea payload", payload)

    //   payload.map((openseaAsset: any) => {
    //     // console.log("opensea Asset", openseaAsset)
    //     const onSale =
    //       openseaAsset?.sell_orders && openseaAsset?.sell_orders[0]
    //         ? true
    //         : false;
    //     const price = onSale
    //       ? Math.round(openseaAsset?.sell_orders[0].current_price)
    //       : 0;

    //     if (state.list_of_all_tokens2[openseaAsset.token_id]) {
    //       state.list_of_all_tokens2[openseaAsset.token_id].opensea.permalink =
    //         openseaAsset.permalink;
    //       // state.list_of_all_tokens2[openseaAsset.token_id].opensea.price = String(price)
    //       // console.log(" opensea token after update", state.list_of_all_tokens2[openseaAsset.token_id])
    //     }
    //   });

    //   state.list_of_all_tokens = Object.values(state.list_of_all_tokens2).sort(
    //     (a, b) => {
    //       return b.rarity_score - a.rarity_score;
    //     }
    //   );
    // },

    setLoadingContractData(
      state,
      {
        payload,
      }: PayloadAction<{ action: "started" | "completed"; value: boolean }>
    ) {
      if (payload.action === "started") {
        state.loading_contractData = {
          ...state.loading_contractData,
          started: payload.value,
        };
      }

      if (payload.action === "completed") {
        state.loading_contractData = {
          ...state.loading_contractData,
          completed: payload.value,
        };
      }
    },

    setIsSnipping(
      state,
      {
        payload,
      }: PayloadAction<{
        action:
          | "allowSnipping"
          | "requested"
          | "started"
          | "completed"
          | "showNFTs"
          | "stop"
          | "startTop20"
          | "startRemaining"
          | null;
      }>
    ) {
      if (payload.action === null) {
        state.isSnipping = {
          requested: false,
          started: false,
          completed: false,
          showNFTs: false,
          openSeaDataArrived: false,
          startTop20: false,
          startRemaining: false,
        };
      } else {
        if (payload.action === "requested") {
          state.isSnipping = {
            requested: true,
            started: false,
            completed: false,
            showNFTs: false,
            openSeaDataArrived: false,
            startTop20: false,
            startRemaining: false,
          };
        }

        if (payload.action === "started") {
          state.isSnipping = {
            requested: true,
            started: true,
            completed: false,
            showNFTs: false,
            openSeaDataArrived: false,
            startTop20: false,
            startRemaining: false,
          };
        }

        if (payload.action === "completed") {
          state.isSnipping = {
            requested: true,
            started: true,
            completed: true,
            showNFTs: false,
            openSeaDataArrived: false,
            startTop20: false,
            startRemaining: false,
          };
        }

        // if (payload.action === "showNFTs") {
        //   state.isSnipping = {
        //     requested: true,
        //     started: true,
        //     completed: true,
        //     showNFTs: true,
        //     openSeaDataArrived: false,
        //     startTop20: false,
        //     startRemaining: false,
        //   };
        // }

        if (payload.action === "showNFTs") {
          state.isSnipping.showNFTs = true
        }

        if (payload.action === "startTop20") {
          state.isSnipping = {
            requested: true,
            started: true,
            completed: true,
            showNFTs: false,
            openSeaDataArrived: false,
            startTop20: true,
            startRemaining: false,
          };
        }

        if (payload.action === "startRemaining") {
          state.isSnipping = {
            requested: true,
            started: true,
            completed: true,
            showNFTs: true,
            openSeaDataArrived: false,
            startTop20: false,
            startRemaining: true,
          };
        }

        if (payload.action === "allowSnipping") {
          state.isSnipping = {
            requested: true,
            started: false,
            completed: true,
            showNFTs: true,
            openSeaDataArrived: false,
            startTop20: false,
            startRemaining: false,
          };
        }
        if (payload.action === "stop") {
          state.isSnipping = {
            requested: false,
            started: false,
            completed: false,
            showNFTs: false,
            openSeaDataArrived: true,
            startTop20: false,
            startRemaining: false,
          };
          // state.isSnipping =  {requested: false, started: false, completed: false, showNFTs: false, openSeaDataArrived: false}
        }
      }
    },

    reSetSnipping(state) {
      (state.allAvailableAttributes = null),
        (state.countOfAllAttribute2 = {}),
        (state.list_of_all_tokens = null),
        (state.list_of_all_tokens2 = {}),
        (state.list_of_all_tokens_top_20 = null),
        (state.list_of_all_tokens_remaining = null),
        (state.countOfAllAttribute = null),
        // state.countOfAllAttribute2 = {},
        (state.rarityScoreOfAllValues2 = {});
      (state.rarityScoreOfAllValues = null),
        (state.isSnipping = {
          requested: false,
          started: false,
          completed: false,
          showNFTs: false,
          openSeaDataArrived: false,
          startTop20: false,
          startRemaining: false,
        }),
        (state.normalization = false),
        (state.onlyOnSale = false),
        (state.sortType = 0);
    },



    resetProgress(state) {
      state.progress = {
        snip: { started: false, ended: false },
        dataFetch: { started: false, ended: false },
        dataProcess: { started: false, ended: false },
        raritiesAssign: { started: false, ended: false },
        openseaFetch: { started: false, ended: false },
      };
    },

    setProgress(
      state,
      {
        payload,
      }: PayloadAction<{
        action:
          | "snip"
          | "dataFetch"
          | "dataProcess"
          | "raritiesAssign"
          | "openseaFetch";
        status: "started" | "ended";
      }>
    ) {
      if (payload.action === "snip" && payload.status === "started") {
        state.progress.snip.started = true;
      } else if (payload.action === "snip" && payload.status === "ended") {
        state.progress.snip.ended = true;
      } else if (
        payload.action === "dataFetch" &&
        payload.status === "started"
      ) {
        state.progress.dataFetch.started = true;
      } else if (payload.action === "dataFetch" && payload.status === "ended") {
        state.progress.dataFetch.ended = true;
      } else if (
        payload.action === "dataProcess" &&
        payload.status === "started"
      ) {
        state.progress.dataProcess.started = true;
      } else if (
        payload.action === "dataProcess" &&
        payload.status === "ended"
      ) {
        state.progress.dataProcess.ended = true;
      } else if (
        payload.action === "raritiesAssign" &&
        payload.status === "started"
      ) {
        state.progress.raritiesAssign.started = true;
      } else if (
        payload.action === "raritiesAssign" &&
        payload.status === "ended"
      ) {
        state.progress.raritiesAssign.ended = true;
      } else if (
        payload.action === "openseaFetch" &&
        payload.status === "started"
      ) {
        state.progress.openseaFetch.started = true;
      } else if (
        payload.action === "openseaFetch" &&
        payload.status === "ended"
      ) {
        state.progress.openseaFetch.ended = true;
      }
    },
  },
});
  


  
// Extract the action creators object and the reducer
const { actions, reducer } = dataSlice
// Extract and export each action creator by name
export const  {resetProgress, setProgress, switchNormalization, assignNormalizedRank, sortByRankAndPrice, setProcessingProgress, setLoadingProgress, assignRank, setOnlyOnSaleState, setCountOfAllAttribute3,  setRarityScoreToAttributeValue2, setRarityScoreToEachNFTAttribuValue2, addTokenInList3,  sortByPrice, setOpenseaData, reSetSnipping, setIsSnipping, setLoadingContractData, setLoadingNFTs, sortByTokenID, sortByRarityScore, setProjectRange, setProjectInfo, setUploadedContractAddress, setContractAddress, setDeveloper, setTransectionProgress, setLogout, setSignedIn, clearState, setOwner, setWhitelistPeriod, setSubscriptionPeriod, setContractData, setActiveUser, setSubscriber, setWhiteListed, userWalletconnected, setLoading } = actions
// Export the reducer, either as a default or named export
export default reducer

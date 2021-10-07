import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RankNFT as RankNFTType } from '../../../types/web3-v1-contracts/RankNFT'
import { sort } from 'fast-sort';


export interface Attribute {
  trait_type :string, 
  value: string,
  value_rarity_score: number,
  value_normalized_rarity_score: number
}

export interface AttributesOfEachToekn {
  tokenID: string
  attributes: Attribute[],
  opensea_data?: any
  rarity_score: number, 
  normalized_rarity_score: number, 
  image: string,
  title?: string
  description?: string,
  name?: string,
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

export interface RarityScoreOfValue {
  value :string, 
  rarity_score: number ,
  normalized_rarity_score: number ,
}


interface Range {
  from: number, to: number, range: number
}

export interface ProjectInfo {
    contractAddress?: string,
    totalSupply:  number,
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
    countOfAllAttribute: CountOfEachAttribute[] | null,
    projectInfo: ProjectInfo | null,
    rarityScoreOfAllValues: RarityScoreOfValue[] | null,
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
    countOfAllAttribute: null,
    projectInfo: null,
    rarityScoreOfAllValues: null,
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

    sortByRarityScore(state) {
      console.log("Sorting start", state.list_of_all_tokens)
      if(state.list_of_all_tokens){
        state.list_of_all_tokens = state.list_of_all_tokens.sort( (a, b) => {
            return b.rarity_score - a.rarity_score;
          });
      }
      console.log("Sorting End", state.list_of_all_tokens)
    },

    sortByTokenID(state) {
      console.log("Sorting start", state.list_of_all_tokens)
      if(state.list_of_all_tokens){
        state.list_of_all_tokens.sort( (a, b) => {
            return Number(a.tokenID) - Number(b.tokenID);
          });
      }
      console.log("Sorting End", state.list_of_all_tokens)
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

    addTokenInList(
      state,
      { payload }: PayloadAction<AttributesOfEachToekn[] | null>
    ) {
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

      // actions.sortByRarityScore();
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


    setInitalCountOfAllAttribute( state, { payload }: PayloadAction<CountOfEachAttribute[] | null> ) {
      if (payload === null) {
        state.countOfAllAttribute = null;
      } else {
        state.countOfAllAttribute = payload;
      }
    },

    setCountOfAllAttribute(state, { payload }: PayloadAction<Attribute>) {

      if (state.countOfAllAttribute !== null) {
        state.countOfAllAttribute.map(
          (countOfEachAttribute: CountOfEachAttribute) => {

            // Find the trait type
            if (countOfEachAttribute.trait_type === payload.trait_type) {

              // initiate the trait count array to store all the trait values and add first trait value
              if (countOfEachAttribute.trait_count === null) {
                const new_trait_count = { value: payload.value, count: 1 };
                countOfEachAttribute.trait_count = [new_trait_count];
                countOfEachAttribute.total_variations++;
              } 

              // Trait array already existed. 
              else {

                // Check if value already present or not
                const checkValue = (obj: any) => obj.value === String(payload.value);
                const isPresent = countOfEachAttribute.trait_count.some(checkValue)
                const isPresent2 = countOfEachAttribute.trait_count.find((elem: any) => elem.value === String(payload.value))

                // Value matched, increase its count by one
                  if (isPresent2) {
                  countOfEachAttribute.trait_count &&
                    countOfEachAttribute.trait_count.map((trait) => {
                      if (trait.value === payload.value) {
                        trait.count++;
                      }
                    });
                } 

                // Value doesn't match, add a new entry and increase the count of variations by one
                else {
                  const new_trait_count = { value: payload.value, count: 1 };
                  countOfEachAttribute.trait_count = [
                    ...countOfEachAttribute.trait_count,
                    new_trait_count,
                  ];
                  countOfEachAttribute.total_variations++;
                }
              }
            }
          }
        );
      }
    },

    setLoadingContractData(state, {payload}: PayloadAction<{action: "started"|"completed", value: boolean}>){

      if(payload.action === "started"){
        state.loading_contractData =  {...state.loading_contractData, started: payload.value}
      }

      if(payload.action === "completed"){
        state.loading_contractData =  {...state.loading_contractData, completed: payload.value}
      }

    },

    setIsSnipping(state, {payload}: PayloadAction<{action: "requested"|"started"|"completed"| null}>){

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
      }
    },

    reSetSnipping(state){

      state.allAvailableAttributes= null,
      state.list_of_all_tokens= null,
      state.countOfAllAttribute= null,
      state.rarityScoreOfAllValues= null,
      state.isSnipping= { requested: false, started: false, completed: false }
    
    }
      


  }
    

});
  


  
// Extract the action creators object and the reducer
const { actions, reducer } = dataSlice
// Extract and export each action creator by name
export const {  reSetSnipping, setIsSnipping, setLoadingContractData, setLoadingNFTs, sortByTokenID, sortByRarityScore, setRarityScoreToEachNFTAttribuValue, setRarityScoreToAttributeValue, setProjectRange, setProjectInfo, setInitalCountOfAllAttribute, setCountOfAllAttribute, addTokenInList, setAvailableAttributes, setUploadedContractAddress, setContractAddress, setDeveloper, setTransectionProgress, setLogout, setSignedIn, clearState, setOwner, setWhitelistPeriod, setSubscriptionPeriod, setContractData, setActiveUser, setSubscriber, setWhiteListed, userWalletconnected, setLoading } = actions
// Export the reducer, either as a default or named export
export default reducer

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RankNFT as RankNFTType } from '../../../types/web3-v1-contracts/RankNFT'


export interface Attribute {
  trait_type :string, 
  value: string,
}

export interface AttributesOfEachToekn {
  tokenID: string
  attributes: Attribute[],
}

// export interface CountOfEachAttribute {
//   trait_value: string,
//   count: number
// }

// export interface CountOfAllAttributes {
//   full_list_of_all_attributes: CountOfEachAttribute[]
// }




interface DataType {
    userAddress: string,
    isOwner: boolean,
    isDeveloper: boolean,
    ContractData: RankNFTType | null,
    loading: boolean,
    transectionProgress: boolean,
    contractAddress: string | null,
    isWaletConnect: boolean,
    isWhiteListed: boolean,
    isSignedIn: boolean,
    isSubscriber: boolean,
    whitelistPeriod: number,
    subscriptionPeriod: number,
    uploadedContractAddress: string,
    NFTattributes: Attribute[] | null,
    list_of_all_tokens: AttributesOfEachToekn[] | null
  }

const initialState: DataType = {
    userAddress: "",
    isOwner: false,
    isDeveloper: false,
    ContractData: null,
    loading: false,
    transectionProgress: false,
    contractAddress: "",
    isWaletConnect: false,
    isWhiteListed: false,
    isSignedIn: false,
    isSubscriber: false,
    whitelistPeriod: 0,
    subscriptionPeriod: 0,
    uploadedContractAddress: "",
    NFTattributes: null,
    list_of_all_tokens: null,


}

// First, define the reducer and action creators via `createSlice`
const dataSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
      clearState(state) {
        return initialState   
      },
      setOwner(state, {payload}:PayloadAction<boolean> ) {
        // Use a "state machine" approach for loading state instead of booleans
        state.isOwner = payload;
      },
      setDeveloper(state, {payload}:PayloadAction<boolean> ) {
        // Use a "state machine" approach for loading state instead of booleans
        state.isDeveloper = payload;
      },
      setContractAddress(state, {payload}:PayloadAction<string> ) {
        // Use a "state machine" approach for loading state instead of booleans
        state.contractAddress = payload;
      },
      setActiveUser(state, {payload}:PayloadAction<string> ) {
        // Use a "state machine" approach for loading state instead of booleans
        state.userAddress = payload;
      },
      userWalletconnected(state, {payload}:PayloadAction<boolean> ) {
        // Use a "state machine" approach for loading state instead of booleans
        state.isWaletConnect = payload;
      },
      setWhiteListed(state, {payload}:PayloadAction<boolean> ) {
        // Use a "state machine" approach for loading state instead of booleans
        state.isWhiteListed = payload;
      },
      setSubscriber(state, {payload}:PayloadAction<boolean> ) {
        // Use a "state machine" approach for loading state instead of booleans
        state.isSubscriber = payload;
      },
      setSignedIn(state, {payload}:PayloadAction<boolean> ) {
        // Use a "state machine" approach for loading state instead of booleans
        state.isSignedIn = payload;
      },
      setLogout(state ) {
        // Use a "state machine" approach for loading state instead of booleans
        state.isSignedIn = false;
        state.isSubscriber = false;
        state.isWhiteListed = false;
        state.isWaletConnect = false;
        state.isOwner = false;
        state.isDeveloper = false;
      },
      setContractData(state, {payload}:PayloadAction<RankNFTType> ) {
        // Use a "state machine" approach for loading state instead of booleans
        state.ContractData = payload;
      },
      setLoading(state, {payload}:PayloadAction<boolean>) {
        // Use a "state machine" approach for loading state instead of booleans
        state.loading = payload;
      },
      setTransectionProgress(state, {payload}:PayloadAction<boolean>) {
        // Use a "state machine" approach for loading state instead of booleans
        state.loading = payload;
      },
      setWhitelistPeriod(state, {payload}:PayloadAction<number> ) {
        state.whitelistPeriod = payload
      },
      setSubscriptionPeriod(state, {payload}:PayloadAction<number> ) {
        state.subscriptionPeriod = payload
      },
      setUploadedContractAddress(state, {payload}:PayloadAction<string> ) {
        state.uploadedContractAddress = payload
      },
      setAvailableAttributes(state, {payload}: PayloadAction<Attribute[]  |  null>) {
        if(payload === null){
          state.NFTattributes = null
        } else {
          state.NFTattributes = payload
        }
      },
      addTokenInList(state, {payload}: PayloadAction<AttributesOfEachToekn |  null>) {
        console.log("payload added ", payload)
        if(payload === null){
          state.list_of_all_tokens = null
        }
        else {
            if(state.list_of_all_tokens !== null){
            state.list_of_all_tokens = [...state.list_of_all_tokens, payload]
          } else {
            state.list_of_all_tokens = [ payload ]
          }

        }
        console.log("Ater adding token ", state.list_of_all_tokens)
        
      }
      
    },
  })
  
// Extract the action creators object and the reducer
const { actions, reducer } = dataSlice
// Extract and export each action creator by name
export const { addTokenInList, setAvailableAttributes, setUploadedContractAddress, setContractAddress, setDeveloper, setTransectionProgress, setLogout, setSignedIn, clearState, setOwner, setWhitelistPeriod, setSubscriptionPeriod, setContractData, setActiveUser, setSubscriber, setWhiteListed, userWalletconnected, setLoading } = actions
// Export the reducer, either as a default or named export
export default reducer

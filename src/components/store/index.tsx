import Web3 from "web3";
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RankNFT as RankNFTType } from '../../../types/web3-v1-contracts/RankNFT'


interface DataType {
    userAddress: string,
    owner: string,
    ContractData: RankNFTType | null
    loading: boolean
    contractAddress: string | null,
    isWaletConnect: boolean,
    isWhiteListed: boolean,
    isSubscriber: boolean,
    whitelistPeriod: number,
    subscriptionPeriod: number,
  }

const initialState: DataType = {
    userAddress: "",
    owner: "",
    ContractData: null,
    loading: false,
    contractAddress: "0x521357d3f95427C189199075a970A7d1355606a4",
    isWaletConnect: false,
    isWhiteListed: false,
    isSubscriber: false,
    whitelistPeriod: 0,
    subscriptionPeriod: 0,


}

// First, define the reducer and action creators via `createSlice`
const dataSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
      clearState(state) {
        // Use a "state machine" approach for loading state instead of booleans
        state = initialState;
      },
      setOwner(state, {payload}:PayloadAction<string> ) {
        // Use a "state machine" approach for loading state instead of booleans
        state.owner = payload;
      },
      setActiveUser(state, {payload}:PayloadAction<string> ) {
        // Use a "state machine" approach for loading state instead of booleans
        state.userAddress = payload;
      },
      userWalletconnected(state, {payload}:PayloadAction<boolean> ) {
        // Use a "state machine" approach for loading state instead of booleans
        state.isWaletConnect = payload;
      },
      isWhiteListed(state, {payload}:PayloadAction<boolean> ) {
        // Use a "state machine" approach for loading state instead of booleans
        state.isWhiteListed = payload;
      },
      isSubscriber(state, {payload}:PayloadAction<boolean> ) {
        // Use a "state machine" approach for loading state instead of booleans
        state.isSubscriber = payload;
      },
      setContractData(state, {payload}:PayloadAction<RankNFTType> ) {
        // Use a "state machine" approach for loading state instead of booleans
        state.ContractData = payload;
      },
      setLoading(state) {
        // Use a "state machine" approach for loading state instead of booleans
        state.loading = !state.loading;
      },
      setWhitelistPeriod(state, {payload}:PayloadAction<number> ) {
        state.whitelistPeriod = payload
      },
      setSubscriptionPeriod(state, {payload}:PayloadAction<number> ) {
        state.subscriptionPeriod = payload
      },

    },
  })
  
// Extract the action creators object and the reducer
const { actions, reducer } = dataSlice
// Extract and export each action creator by name
export const { setOwner, setWhitelistPeriod, setSubscriptionPeriod, clearState, setContractData, setActiveUser, isSubscriber, isWhiteListed, userWalletconnected, setLoading } = actions
// Export the reducer, either as a default or named export
export default reducer

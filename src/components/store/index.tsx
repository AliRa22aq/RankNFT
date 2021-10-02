import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RankNFT as RankNFTType } from '../../../types/web3-v1-contracts/RankNFT'
import { is } from 'typescript-is';


export interface Attribute {
  trait_type :string, 
  value: string,
  value_rarity_score?: number
}

export interface AttributesOfEachToekn {
  tokenID: string
  attributes: Attribute[],
  rarity_score: number 
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
  rarity_score: number 
}


// export interface CountOfAllAttributes {
//   full_list_of_all_attributes: CountOfEachAttribute[]
// }

interface Range {
  from: number, to: number
}

export interface ProjectInfo {
    totalSupply:  number, 
    name:  string,
    baseTokenURI?: string | null,
    range: Range
  }


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
    allAvailableAttributes: CountOfEachAttribute[] | null,
    list_of_all_tokens: AttributesOfEachToekn[] | null,
    countOfAllAttribute: CountOfEachAttribute[] | null,
    projectInfo: ProjectInfo | null,
    rarityScoreOfAllValues: RarityScoreOfValue[] | null

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
    allAvailableAttributes: null,
    list_of_all_tokens: null,
    countOfAllAttribute: null,
    projectInfo: null,
    rarityScoreOfAllValues: null


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

      setProjectRange(state, {payload}: PayloadAction< Range >) {
        if(state.projectInfo){
          state.projectInfo.range = payload
        }
      },
      
      setProjectInfo(state, {payload}: PayloadAction< ProjectInfo |  null>) {
        if(payload === null){
          state.projectInfo = null
        } else {
          state.projectInfo = payload
        }

      },


      setAvailableAttributes(state, {payload}: PayloadAction< CountOfEachAttribute |  null>) {
          if(payload === null){
          state.allAvailableAttributes = null
        } 
        
        else {
          if(state.allAvailableAttributes !== null){
          state.allAvailableAttributes = [...state.allAvailableAttributes, payload]
        } else {
          state.allAvailableAttributes = [ payload ]
        }
      }

      },



      addTokenInList(state, {payload}: PayloadAction<AttributesOfEachToekn |  null>) {
        // console.log("payload added ", payload)
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
        
      },

      setRarityScoreToToken(state, {payload}: PayloadAction< {  tokenID: string , rarity_score: number } >) {
        // console.log("payload added ", payload)
        state.list_of_all_tokens && state.list_of_all_tokens.map((token)=> {
          if(token.tokenID === payload.tokenID){
            token.rarity_score = payload.rarity_score
          }
        })
        // console.log("Initial countOfAllAttribute ", state.countOfAllAttribute)
      }, 

      setRarityScoreToAttributeValue(state, {payload}: PayloadAction< RarityScoreOfValue | null >) {
        if(payload === null){
          state.rarityScoreOfAllValues = null
        }
        else {
          if(state.rarityScoreOfAllValues === null) {
            state.rarityScoreOfAllValues = [payload]
          } 
          else {
            state.rarityScoreOfAllValues = [...state.rarityScoreOfAllValues, payload]
          }
        }
      }, 


      // export interface Attribute {
      //   trait_type :string, 
      //   value: string,
      //   value_rarity_score?: number
      // }
      
      // export interface AttributesOfEachToekn {
      //   tokenID: string
      //   attributes: Attribute[],
      //   rarity_score: number 
      //   image: string,
      //   title?: string
      //   description?: string,
      //   name?: string,
      // }
      

      setRarityScoreToEachNFTAttribuValue(state, {payload}: PayloadAction< RarityScoreOfValue >) {

            state.list_of_all_tokens && state.list_of_all_tokens.map((listOfAttributes: AttributesOfEachToekn) => {
              listOfAttributes.attributes.map((attribute: Attribute)=> {
                              if(attribute.value === payload.value) {
                                attribute.value_rarity_score = payload.rarity_score
                              }

              })

            })

      }, 



      setNormalizedRarityScoreToAttributes(state, {payload}: PayloadAction< RarityScoreOfValue | null >) {
        if(payload === null){
          state.rarityScoreOfAllValues = null
        }
        else {
          if(state.rarityScoreOfAllValues === null) {
            state.rarityScoreOfAllValues = [payload]
          } 
          else {
            state.rarityScoreOfAllValues = [...state.rarityScoreOfAllValues, payload]
          }
        }
      }, 

      setInitalCountOfAllAttribute(state, {payload}: PayloadAction< CountOfEachAttribute[] |  null>) {
        // console.log("payload added ", payload)
        if(payload === null){
          state.countOfAllAttribute = null
        }else{
            state.countOfAllAttribute =  payload
        } 
        // console.log("Initial countOfAllAttribute ", state.countOfAllAttribute)
      }, 

      setCountOfAllAttribute(state, {payload}: PayloadAction< Attribute >) {

        console.log("Step 1- payload added ", payload)

        console.log("Step 2- Check if countOfAllAttribute in not null", state.countOfAllAttribute !== null)

        if(state.countOfAllAttribute !== null){

        console.log("Step 3- Not null. Entered with the payload", payload)

        console.log("Step 4- Start mapping on each element of countOfAllAttributes")

        state.countOfAllAttribute.map((countOfEachAttribute:CountOfEachAttribute) => {

        console.log("Step 5- Entered in mapping with the element: ", JSON.stringify(countOfEachAttribute))

        console.log("Step 6- Checking if payload-trait-type matched with element-trait-type: ", countOfEachAttribute.trait_type)
        
        if(countOfEachAttribute.trait_type === payload.trait_type){

        console.log("Step 7- Matched")
        
        console.log("Step 8- Check if element-trait-count array is empty")
          
          if(countOfEachAttribute.trait_count === null ){
            console.log("Step 9- Empty")
            const  new_trait_count =  { value: payload.value, count: 1}
            countOfEachAttribute.trait_count = [new_trait_count]
            countOfEachAttribute.total_variations++
            console.log("Step 10a- new trait value added in element trait count list ", JSON.stringify(new_trait_count))
            console.log("Step 10b- trait count list updated ", JSON.stringify(countOfEachAttribute.trait_count))
          }
          
          else {

                  console.log("Step 11- Not Empty")
                  
                  const checkValue = (obj: any) => obj.value === String(payload.value);
                  console.log("Step 13- Already exist? ", countOfEachAttribute.trait_count.some(checkValue))
                  
                  if(countOfEachAttribute.trait_count.some(checkValue)) {
                    
                    countOfEachAttribute.trait_count && countOfEachAttribute.trait_count.map((trait) => {
                      
                    console.log("Step 12- Star looping over the list of trait-counts to see if any matches")
 
                    console.log("Step 13a- Entered in element's trait-count list with element ", JSON.stringify(trait))
    
                    console.log("Step 13b- checking if any element trait-count list matched with payload value ", payload.value)
  
                    if(trait.value === payload.value){
                    console.log("Step 15- Value matched. Increasing count by one: from ", trait.count)
                        trait.count = trait.count + 1
                    console.log("Step 15- Value matched. Increasing count by one: to ", trait.count)

                    } 
                  })
                }


                  else {

                    const  new_trait_count =  { value: payload.value, count: 1}
                    console.log("Step 13c- Value not matched. Adding a new element", new_trait_count )

                    console.log("Step 113d-  list_of_new_traits before updating ", JSON.stringify(countOfEachAttribute.trait_count))
                    countOfEachAttribute.trait_count = [...countOfEachAttribute.trait_count, new_trait_count];
                    console.log("Step 13e-  list_of_new_traits after updating ", JSON.stringify(countOfEachAttribute.trait_count))
                    countOfEachAttribute.total_variations++

                  }                  
                }
              }
            })      
        }
      }
    }
  })
  


  
// Extract the action creators object and the reducer
const { actions, reducer } = dataSlice
// Extract and export each action creator by name
export const { setNormalizedRarityScoreToAttributes, setRarityScoreToValues, setRarityScoreToToken, setProjectRange, setProjectInfo, setInitalCountOfAllAttribute, setCountOfAllAttribute, addTokenInList, setAvailableAttributes, setUploadedContractAddress, setContractAddress, setDeveloper, setTransectionProgress, setLogout, setSignedIn, clearState, setOwner, setWhitelistPeriod, setSubscriptionPeriod, setContractData, setActiveUser, setSubscriber, setWhiteListed, userWalletconnected, setLoading } = actions
// Export the reducer, either as a default or named export
export default reducer

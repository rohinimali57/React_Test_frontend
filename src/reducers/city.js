import { COUNTRY_LIST } from '../actions/city'

const intialState = {
   countrymasterList:[],
  
}

export default function countrylist (state = intialState, action) {

    switch (action.type) {
        case COUNTRY_LIST :
        return {
            ...state,
            countrymasterList: action.list,
           
        }
        
        default :
        return state
    }
}
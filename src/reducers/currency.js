import { CURRENCY_LIST } from '../actions/currency'
const intialState = {
    
    currencymasterList:[]
 }
 export default function currencylist (state = intialState, action) {

    switch (action.type) {
        case CURRENCY_LIST :
        return {
            ...state,
            currencymasterList: action.list,
           
        }
        default :
        return state
    }
}

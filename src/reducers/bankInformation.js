import { BANK_MASTER } from '../actions/bankMaster'

const intialState = {
    bankcode:  ''
}

export default function ioMasterList (state = intialState, action) {

    switch (action.type) {
        case BANK_MASTER :
        return {
            ...state,
             bankcode:localStorage.getItem("bankdata")
           
        }
         
        default :
        return state
    }
}
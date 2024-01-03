import { EOD_LIST } from '../actions/eodconfig'

const intialState = {
      eodconfigmasterList:[]

}

export default function eodconfiglist (state = intialState, action) {

    switch (action.type) {
        case EOD_LIST :
        return {
            ...state,
            eodconfigmasterList: action.list,
           
        }
        
        default :
        return state
    }
    
}
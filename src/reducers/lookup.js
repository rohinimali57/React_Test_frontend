import { LOOKUP_LIST } from '../actions/lookUp'

const intialState = {
    lookuplistbylookuocode:[]
}

export default function lookup (state = intialState, action) {

    switch (action.type) {
        case LOOKUP_LIST :
        return {
            ...state,
            lookuplistbylookuocode: action.list,
           
        }
        default :
        return state
    }
}
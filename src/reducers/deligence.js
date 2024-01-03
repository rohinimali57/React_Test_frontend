import { DELIGENCE_LIST } from '../actions/delligence'

const intialState = {
    deligencemasterList:[],
    
    
}

export default function  deligenclist (state = intialState, action) {

    switch (action.type) {
        case DELIGENCE_LIST :
        return {
            ...state,
            deligencemasterList: action.list,
           
        }
        
        default :
        return state
    }
}
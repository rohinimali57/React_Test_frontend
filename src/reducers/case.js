import { CASE_LIST,RISK_LIST } from '../actions/case'

const intialState = {
   viewcaseList:[],
   customersRisks:[]
}

export default function caselist (state = intialState, action) {

    switch (action.type) {
        case CASE_LIST :
        return {
            ...state,
            viewcaseList: action.list,
           
        }
        case RISK_LIST :
            return {
                ...state,
                customersRisks: action.list,
               
            }
        default :
        return state
    }
}
import { DEDUP_LIST,TRPROFILE_LIST,RISKGRAPH_LIST,KYCRISK_LIST } from '../actions/dedup'


const intialState = {
    dedupmasterList:[],
    tranctionprofilemasterList:[], 
    riskgraphmasterList:[],
    kycriskmasterList:[]
    
}

export default function deduplist (state = intialState, action) {

    switch (action.type) {
        case DEDUP_LIST :
        return {
            ...state,
            dedupmasterList: action.list,
           
        }
        case TRPROFILE_LIST :
        return {
            ...state,
            tranctionprofilemasterList: action.list,
           
        }
        case RISKGRAPH_LIST :
            return {
                ...state,
                riskgraphmasterList: action.list,
               
            }
            case KYCRISK_LIST :
                return {
                    ...state,
                    kycriskmasterList: action.list,
                   
                }
        default :
        return state
    }
}
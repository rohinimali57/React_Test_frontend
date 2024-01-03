import { BRANCH_LIST,BRANCH_LIST_CODE } from '../actions/branchMaster'

const intialState = {
    branchlistbybankcode:[],
    branchlistbycode:{}

}

export default function branchlist (state = intialState, action) {

    switch (action.type) {
        case BRANCH_LIST :
        return {
            ...state,
            branchlistbybankcode: action.list,
           
        }
        case BRANCH_LIST_CODE :
            return {
                ...state,
                branchlistbycode: action.list,
               
            }
        default :
        return state
    }
}
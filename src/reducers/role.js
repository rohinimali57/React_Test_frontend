import { ROLE_LIST } from '../actions/role'

const intialState = {
    rolemasterList:[]
}

export default function rolelist (state = intialState, action) {

    switch (action.type) {
        case ROLE_LIST :
        return {
            ...state,
            rolemasterList: action.list,
           
        }
        default :
        return state
    }
}
import { ROLERIGHT_LIST } from '../actions/roleRights'

const intialState = {
    rolerightmasterList:[]
}

export default function rolerightlist (state = intialState, action) {

    switch (action.type) {
        case ROLERIGHT_LIST :
        return {
            ...state,
            rolerightmasterList: action.list,
           
        }
        default :
        return state
    }
}
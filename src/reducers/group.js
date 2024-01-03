import { GROUP_LIST } from '../actions/group'

const intialState = {
    groupmasterList:[]
}

export default function grouplist (state = intialState, action) {

    switch (action.type) {
        case GROUP_LIST :
        return {
            ...state,
            groupmasterList: action.list,
           
        }
        default :
        return state
    }
}
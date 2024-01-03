import {GROUPUSER_LIST } from '../actions/userMaster'

const intialState = {
    groupusermasterList:[]
}

export default function userslist (state = intialState, action) {
    switch (action.type) {

        case GROUPUSER_LIST :
        return {
            ...state,
            groupusermasterList: action.list,
           
        }
        default :
        return state
    }
    
}
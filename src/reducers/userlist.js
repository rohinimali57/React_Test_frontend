import { USER_LIST,GROUPUSER_LIST } from '../actions/user'

const intialState = {
    usermasterList:[],
    groupusermasterList:[]
}

export default function userslist (state = intialState, action) {

    switch (action.type) {
        case USER_LIST :
        return {
            ...state,
            usermasterList: action.list,
           
        }
        case GROUPUSER_LIST :
        return {
            ...state,
            groupusermasterList: action.list,
           
        }
        default :
        return state
    }
    
}
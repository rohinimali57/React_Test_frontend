import { SDN_LIST } from '../actions/sdnsearch'

const intialState = {
   sdnsearchList:[],

 }

 export default function sdnlist (state = intialState, action) {

    switch (action.type) {
        case SDN_LIST :
        return {
            ...state,
            sdnsearchList: action.list.sdnList,
           
        }
        default :
        return state
    }
}
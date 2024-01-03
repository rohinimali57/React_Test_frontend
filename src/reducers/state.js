import {  STATE_LIST } from '../actions/state'

const intialState = {
    statemasterList:[],
 }


 export default function statelist (state = intialState, action) {

    switch (action.type) {
        case STATE_LIST :
        return {
            ...state,
            statemasterList: action.list,
           
        }
        default :
        return state
    }
}
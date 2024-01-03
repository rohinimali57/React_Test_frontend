import {  MATERIAL_LIST } from '../actions/bannedMaterial'

const intialState = {
    banmaterialList:[],
 }


 export default function materiallist (state = intialState, action) {

    switch (action.type) {
        case MATERIAL_LIST :
        return {
            ...state,
            banmaterialList: action.list,
           
        }
        default :
        return state
    }
}


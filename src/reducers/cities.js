import {  CITY_LIST } from '../actions/cities'

const intialState = {
   citymasterList:[],
  
}

export default function citieslist (state = intialState, action) {

    switch (action.type) {
      
        case CITY_LIST :
            return {
                ...state,
                citymasterList: action.list,
               
            }
        default :
        return state
    }
}
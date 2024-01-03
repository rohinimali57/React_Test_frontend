import { HOLIDAY_LIST } from '../actions/holiday'

const intialState = {
    
    holidaylistbycode:[]

}

export default function holidaylist (state = intialState, action) {

    switch (action.type) {
        case HOLIDAY_LIST :
        return {
            ...state,
            holidaylistbycode: action.list,
           
        }
        
        default :
        return state
    }
}

import { ALERT_MANAGMENT } from '../actions/alertManagment'

const intialState = {
    bankcode:  ''
}

export default function ioMasterList (state = intialState, action) {

    switch (action.type) {
        case ALERT_MANAGMENT :
        return {
            ...state,
             bankcode:localStorage.getItem("bankdata")
           
        }
         
        default :
        return state
    }
}
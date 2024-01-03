export default function monitorlist (state = intialState, action) {

    switch (action.type) {
        case MONITOR_LIST :
        return {
            ...state,
            monitormasterList: action.list,
           
        }
        default :
        return state
    }
}
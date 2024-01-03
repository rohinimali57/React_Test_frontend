export default function travellist (state = intialState, action) {

    switch (action.type) {
        case TRAVEL_LIST :
        return {
            ...state,
            travelmasterList: action.list,
           
        }
        default :
        return state
    }
}
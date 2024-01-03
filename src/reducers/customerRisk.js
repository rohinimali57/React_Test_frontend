import { CUSTOMERS_RISK,CUSTOMERS_RISK_LIST } from '../actions/customerRisk'

const intialState = {
    
    customersRiskMovement:[],
    customersRiskScoreLists:[]

}

export default function customerrisk (state = intialState, action) {

    switch (action.type) {
        case CUSTOMERS_RISK :
        return {
            ...state,
            customerRisk: action.list,
           
        }
        case CUSTOMERS_RISK_LIST :
                    return{
                        ...state,
                        customersRiskScoreLists: action.list,
                    }
       
        default :
        return state
    }
}
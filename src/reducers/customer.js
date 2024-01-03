import { CUSTOMER_LIST,CUSTOMERS_LIST,CUSTOMERS_ACC_LIST, CUSTOMERS_TRANSACTION_LIST,TRANSACTION_LIST } from '../actions/customer'

const intialState = {
    customerList:[],
    customersLists:[],
    customersaccLists:[],
    customersTransactionLists:[],
    customersTransactionList:[]

}

export default function customerlist (state = intialState, action) {

    switch (action.type) {
        case CUSTOMER_LIST :
        return {
            ...state,
            customerList: action.list,
           
        }
        case CUSTOMERS_LIST :
            return {
                ...state,
                customersLists: action.list,
               
            }
            case CUSTOMERS_ACC_LIST :
                return{
                    ...state,
                    customersaccLists: action.list,
                }
                case CUSTOMERS_TRANSACTION_LIST :
                    return{
                        ...state,
                        customersTransactionLists: action.list,
                    }
                    case TRANSACTION_LIST :
                        return{
                            ...state,
                            customersTransactionList: action.list,
                        }
        default :
        return state
    }
}
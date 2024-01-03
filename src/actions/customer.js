import { getCustomerSearch,getCustomers,getCustomersAccount,getTransactionSearch,getTransaction } from '../common/api'

export const CUSTOMER_LIST = 'CUSTOMER_LIST'
export const CUSTOMERS_LIST = 'CUSTOMERS_LIST'
export const CUSTOMERS_ACC_LIST = 'CUSTOMERS_ACC_LIST'
export const CUSTOMERS_TRANSACTION_LIST = 'CUSTOMERS_TRANSACTION_LIST'
export const TRANSACTION_LIST = 'TRANSACTION_LIST'


export const customerList = (list) =>{
    return {
        type : CUSTOMER_LIST,
        list
    }
}
export const customersLists = (list) =>{
    return {
        type : CUSTOMERS_LIST,
        list
    }
}

export const customersaccLists = (list) =>{
    return {
        type : CUSTOMERS_ACC_LIST,
        list
    }
}

export const customertransactionList = (list) =>{
    return {
        type : CUSTOMERS_TRANSACTION_LIST,
        list
    }
}

export const customersTransaction = (list) =>{
    return {
        type : TRANSACTION_LIST,
        list
    }
}

export const handlegetCustomerSearch = (Data, headers) =>{
    debugger

    return (dispatch) => {
        return getCustomerSearch (Data, headers)
            .then((list) => {
           
               dispatch(customerList(list))
            }).catch((error)=>{
                console.log(error)
            })
    }
}

export const handlegetCustomers = (Data,headers) =>{
    debugger

    return (dispatch) => {
        return getCustomers (Data,headers)
            .then((list) => {
         
               dispatch(customersLists(list))
            }).catch((error)=>{
                console.log(error)
            })
    }
}

export const handlegetCustomersAccount = (custCode,headers) =>{
    debugger

    return (dispatch) => {
        return getCustomersAccount (custCode,headers)
            .then((list) => {
          
               dispatch(customersaccLists(list))
            }).catch((error)=>{
                console.log(error)
            })
    }
}


export const handlegetTransactionSearch = (acctNo,cashflowType,transactionAmount,toDate,fromDate,operator,custCode, headers) =>{
    debugger

    return (dispatch) => {
        return getTransactionSearch (acctNo,cashflowType,transactionAmount,toDate,fromDate,operator,custCode, headers)
            .then((list) => {
          
               dispatch(customertransactionList(list))
            }).catch((error)=>{
                console.log(error)
            })
    }
}

export const handlegetTransaction = (txnNumber,custCode,headers) =>{
    debugger

    return (dispatch) => {
        return getTransaction (txnNumber,custCode,headers)
            .then((list) => {
             
               dispatch(customersTransaction(list))
            }).catch((error)=>{
                console.log(error)
            })
    }
}
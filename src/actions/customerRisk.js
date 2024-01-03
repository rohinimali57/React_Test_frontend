import { getCustomerRisk,getRiskSearch } from '../common/api'


export const CUSTOMERS_RISK = 'CUSTOMERS_RISK'
export const CUSTOMERS_RISK_LIST = 'CUSTOMERS_RISK_LIST'


export const customersRisks = (list) =>{
    return {
        type : CUSTOMERS_RISK,
        list
    }
}

export const customerriskList = (list) =>{
    return {
        type : CUSTOMERS_RISK_LIST,
        list
    }
}


export const handlegetCustomerRisk = (bankCode,headers) =>{
    debugger

    return (dispatch) => {
        // document.getElementById("loader-wrapper").style.visibility = "visible";    
        return getCustomerRisk (bankCode,headers)
            .then((list) => {
               // handleGetStateMasterList()
            //    document.getElementById("loader-wrapper").style.visibility = "hidden";
            //    Alert.success(" Record Found Sucessfully",{ position: 'top' })
               dispatch(customersRisks(list))
             // dispatch(receiveBankMasterResponce(response))
            }).catch((error)=>{
                console.log(error)
            })
    }
}



export const handlegetRiskSearch = (fromDate,toDate,custCode, headers) =>{
    debugger

    return (dispatch) => {
        // document.getElementById("loader-wrapper").style.visibility = "visible";    
        return getRiskSearch (fromDate,toDate,custCode, headers)
            .then((list) => {
               // handleGetStateMasterList()
            //    document.getElementById("loader-wrapper").style.visibility = "hidden";
            //    Alert.success(" Record Found Sucessfully",{ position: 'top' })
               dispatch(customerriskList(list))
             // dispatch(receiveBankMasterResponce(response))
            }).catch((error)=>{
                console.log(error)
            })
    }
}
import { userSavecase, getViewCase, getCase ,UpdateCaseStatus, ConfirmCase} from '../common/api'
export const CASE_LIST = 'CASE_LIST'
export const RISK_LIST = 'RISK_LIST'


export const receiveCaseList = (list) =>{
    return {
        type : CASE_LIST,
        list
    }
}
export const customersRisk = (list) =>{
    return {
        type : RISK_LIST,
        list
    }
}


export const handleSavecase = (data, headers) =>{
    debugger
    return (dispatch) => {

        return userSavecase (data,headers)
            .then((response) => {
            
            }).catch((error)=>{
                console.log(error)
            })
    }
}



//ACTION FOR GET View Case
export const handleGetCaseList = (bankCode, headers) =>{
    debugger
    return (dispatch) => {
        return getViewCase (bankCode, headers)
            .then((list) => {
                dispatch(receiveCaseList(list))
            }).catch((error)=>{
                console.log(error)
            })
    }
}


//ACTION FOR GET Case
export const handlegetCase = (caseID,headers) =>{
    debugger

    return (dispatch) => {
        return getCase (caseID,headers)
            .then((list) => {
      
               dispatch(customersRisk(list))
            }).catch((error)=>{
                console.log(error)
            })
    }
}


//ACTION FOR Update Case
export const handleUpdateCaseStatus= (data,headers) =>{
    debugger
    return (dispatch) => {

        return UpdateCaseStatus (data,headers)
            .then((response) => {
                console.log("updateCaseStatus",response)
               
            }).catch((error)=>{
                console.log(error)
            })
    }
}

//ACTION FOR Confirm Case
export const handleConfirmCase= (data,headers) =>{
    debugger
    return (dispatch) => {

        return ConfirmCase (data,headers)
            .then((response) => {
                console.log("confirmcase",response)
               
            }).catch((error)=>{
                console.log(error)
            })
    }
}
import Swal from 'sweetalert2'
import { getDedupprocess, getRunDeDup,getTransactionRiskProfile,getRiskGraphData,getKYCRiskProfile, saveBannedMaterialMaster } from '../common/api'
export const DEDUP_LIST = 'DEDUP_LIST'

export const TRPROFILE_LIST = 'TRPROFILE_LIST'
export const RISKGRAPH_LIST = 'RISKGRAPH_LIST'
export const KYCRISK_LIST = 'KYCRISK_LIST'

export const receiveKycriskData = (list) =>{
    return {
        type : KYCRISK_LIST,
        list
    }
}
export const receiveTRiskGraphData = (list) =>{
    return {
        type : RISKGRAPH_LIST,
        list
    }
}

export const receiveTranactionProfile = (list) =>{
    return {
        type : TRPROFILE_LIST,
        list
    }
}

export const receivededupList = (list) =>{
    return {
        type : DEDUP_LIST,
        list
    }
}


export const handleDedupprocess = (custCode,custFName,custLName,addr1,addr2,custPAN,custAdhar,custMobile,custDOB,headers) =>{
    debugger

    return (dispatch) => {
        return getDedupprocess (custCode,custFName,custLName,addr1,addr2,custPAN,custAdhar,custMobile,custDOB,headers)
            .then((list) => {
               
               dispatch(receivededupList(list))
            }).catch((error)=>{
                console.log(error)
            })
    }
}
export const handleRunDeDup = (parentCustCode,dedupCustCode,headers) =>{
    debugger

    return (dispatch) => {
        return getRunDeDup (parentCustCode,dedupCustCode,headers)
            .then((list) => {
               
            }).catch((error)=>{
                console.log(error)
            })
    }
}

export const handleTransactionRiskProfile = (custCode,branchCode,headers) =>{
    debugger

    return (dispatch) => {
        return getTransactionRiskProfile(custCode,branchCode,headers)
            .then((list) => {
               
              dispatch(receiveTranactionProfile(list))
            }).catch((error)=>{
                console.log(error)
            })
    }
}

export const handleRiskGraphData = (custCode,branchCode,headers) =>{
    debugger

    return (dispatch) => {
        return getRiskGraphData(custCode,branchCode,headers)
            .then((list) => {
               
              dispatch(receiveTRiskGraphData(list))
            }).catch((error)=>{
                console.log(error)
            })
    }
}

export const handleKYCRiskProfile = (custCode,branchCode,headers) =>{
    debugger

    return (dispatch) => {
        return getKYCRiskProfile(custCode,branchCode,headers)
            .then((list) => {
               
              dispatch(receiveKycriskData(list))
            }).catch((error)=>{
                console.log(error)
            })
    }
}

export const handlesaveAuxilaryInfo = (AuxilaryInfo, headers) =>{
    debugger

    return (dispatch) => {
        return saveBannedMaterialMaster (AuxilaryInfo, headers)
            .then((response) => {
                Swal.fire({
                    title: 'Submitted!',
                    text: 'Your Data Submitted Sucessfully.',
                    icon: 'success',
                  })
            }).catch((error)=>{
                console.log(error)
            })
    }
}

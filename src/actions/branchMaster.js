import {SaveBranchMaster,getbranchCode,getBranchMastByCode} from '../common/api'
import Swal from 'sweetalert2'
export const BRANCH_LIST = 'BRANCH_LIST'
export const BRANCH_LIST_CODE = 'BRANCH_LIST_CODE'


export const receiveBranchist = (list) =>{
    return {
        type : BRANCH_LIST,
        list
    }
}
export const receiveBranchCodeist = (list) =>{
    return {
        type : BRANCH_LIST_CODE,
        list
    }
}

export const handleGetBranchByBankCode = (bankcode,headers) =>{
    debugger
    return (dispatch) => {
        return getbranchCode (bankcode,headers)
            .then((list) => {
                dispatch(receiveBranchist(list))
            }).catch((error)=>{
                console.log(error)
            })
    }
}
export const handleGetBranchByCode = (branchCode,headers) =>{
    debugger
    return (dispatch) => {
        return getBranchMastByCode (branchCode,headers)
            .then((list) => {
                dispatch(receiveBranchCodeist(list))
            }).catch((error)=>{
                console.log(error)
            })
    }
}

export const handlebranchmaster = (data, headers) =>{
    debugger
    return (dispatch) => {

        return SaveBranchMaster (data,headers)
            .then((response) => {
                Swal.fire({
                    title: 'Saved!',
                    text: 'Your Data Saved Sucessfully.',
                    icon: 'success',
                  })
              
            }).catch((error)=>{
                console.log(error)
            })
    }
}

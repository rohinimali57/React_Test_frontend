import { saveBannedMaterialMaster,getBanMaterialByBankCode,updateBanMaterialMst,deleteBanMaterialMst } from '../common/api'
import Swal from 'sweetalert2'

export const MATERIAL_LIST = 'MATERIAL_LIST'

export const receiveMaterialList = (list) =>{
    return {
        type : MATERIAL_LIST,
        list
    }
}
export const handlesaveBannedMaterialMaster = (data, headers) =>{
    debugger

    return (dispatch) => {
        return saveBannedMaterialMaster (data, headers)
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

//ACTION FOR GET state_master
export const handleGetBanMaterialByBankCode = (bankCode,headers) =>{
    debugger
    return (dispatch) => {
        return getBanMaterialByBankCode (bankCode,headers)
            .then((list) => {
                dispatch(receiveMaterialList(list))
            }).catch((error)=>{
                console.log(error)
            })
    }
}
//ACTION FOR UPDATE state_master
export const handleupdateBanMaterialMst = (data, headers) =>{
    debugger

    return (dispatch) => {
        return updateBanMaterialMst (data, headers)
            .then((response) => {
                Swal.fire({
                    title: 'Updated!',
                    text: 'Your Data Updated Sucessfully.',
                    icon: 'success',
                  
                  })
            }).catch((error)=>{
                console.log(error)
            })
    }
}

//ACTION FOR Delete state_master
export const handleDeleteBanMaterialMst = (data, headers) =>{
    debugger
    return (dispatch) => {
        return deleteBanMaterialMst (data, headers)
            .then((response) => {
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your Data Deleted Sucessfully.',
                    icon: 'success', 
                  })
            }).catch((error)=>{
                console.log(error)
            })
    }
}
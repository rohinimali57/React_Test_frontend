import { saveDeDupConfig,getDeDupByBankCode,updateDeDup,deleteDeDup } from '../common/api'
import Swal from 'sweetalert2'

export const MATERIAL_LIST = 'MATERIAL_LIST'

export const receiveMaterialList = (list) =>{
    return {
        type : MATERIAL_LIST,
        list
    }
}

export const handlesaveDeDupConfig = (data, headers) =>{
    debugger

    return (dispatch) => {
        return saveDeDupConfig (data, headers)
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
export const handlegetDeDupByBankCode = (bankCode,headers) =>{
    debugger
    return (dispatch) => {
        return getDeDupByBankCode (bankCode,headers)
            .then((list) => {
                dispatch(receiveMaterialList(list))
            }).catch((error)=>{
                console.log(error)
            })
    }
}
//ACTION FOR UPDATE state_master
export const handleupdateDeDup = (data, headers) =>{
    debugger

    return (dispatch) => {
        return updateDeDup (data, headers)
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
export const handledeleteDeDup= (data, headers) =>{
    debugger
    return (dispatch) => {
        return deleteDeDup (data, headers)
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

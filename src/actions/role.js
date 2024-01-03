import { saveRoleMaster, getRoleData,deleteRoleMaster,updateRoleMaster } from '../common/api'
import Swal from 'sweetalert2'

export const ROLE_LIST = 'ROLE_LIST'

export const receiveRoleList = (list) =>{
    return {
        type : ROLE_LIST,
        list
    }
}

export const handleSaveRoleMaster = (data, headers) =>{
    debugger

    return (dispatch) => {
        return saveRoleMaster (data, headers)
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

export const handleGetRoleMasterList = (bankCode,headers) =>{
    debugger
    return (dispatch) => {
        return getRoleData (bankCode,headers)
            .then((list) => {
                dispatch(receiveRoleList(list))
            }).catch((error)=>{
                console.log(error)
            })
    }
}


//ACTION FOR Delete List user
export const handleDeleteRoleMaster =   (data, headers) =>{
    debugger
    return  (dispatch) => {
        return  deleteRoleMaster   (data, headers) 
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

//ACTION FOR UPDATE role_master
export const handleUpdateRoleMaster = (data, headers) =>{
    debugger

    return (dispatch) => {
        return updateRoleMaster (data, headers)
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

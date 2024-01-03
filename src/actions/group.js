import {saveGroupMaster , getGroupMaster ,updateGroupMaster,deleteGroupMaster} from '../common/api'
import Swal from 'sweetalert2'
export const GROUP_LIST = 'GROUP_LIST'


export const receiveGroupList = (list) =>{
    return {
        type : GROUP_LIST,
        list
    }
}

export const handleGetGroupMasterList = (bankCode,headers) =>{
    debugger
    return (dispatch) => {
        return getGroupMaster (bankCode,headers)
            .then((list) => {
                dispatch(receiveGroupList(list))
            }).catch((error)=>{
                console.log(error)
            })
    }
}

export const handleSaveGroupMaster= (data, headers) =>{
    debugger
    return (dispatch) => {
        return saveGroupMaster (data,headers)
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

export const handleUpdateGroupMaster= (data, headers) =>{
    debugger
    return (dispatch) => {
        return updateGroupMaster (data,headers)
            .then((response) => {
                Swal.fire({
                    title: 'Update!',
                    text: 'Your Data Update Sucessfully.',
                    icon: 'success',
                  })
            }).catch((error)=>{
                console.log(error)
            })
    }
}

//ACTION FOR Delete Group Master
export const handleDeleteGroupMatser =   (data, headers) =>{
    debugger
    return  (dispatch) => {
        return  deleteGroupMaster   (data, headers) 
            .then((response) => {
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your Data Deleted Sucessfully.',
                    icon: 'success',
                    // showCancelButton: true,
                    // confirmButtonText: 'Yes',
                    // cancelButtonText: 'No'
                  })
            }).catch((error)=>{
                console.log(error)
            })
    }
}
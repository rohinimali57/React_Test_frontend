
import { saveStateMaster,updateStateMaster, getStateMaster, deleteStateMaster } from '../common/api'
import Swal from 'sweetalert2'

export const STATE_LIST = 'STATE_LIST'

export const receiveStateList = (list) =>{
    return {
        type : STATE_LIST,
        list
    }
}
//ACTION FOR SAVE state_master
export const handleSaveStateMaster = (data, headers) =>{
    debugger

    return (dispatch) => {
        return saveStateMaster (data, headers)
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

//ACTION FOR UPDATE state_master
export const handleUpdateStateMaster = (data, headers) =>{
    debugger

    return (dispatch) => {
        return updateStateMaster (data, headers)
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
export const handleDeleteStateMaster = (data, headers) =>{
    debugger
    return (dispatch) => {
        return deleteStateMaster (data, headers)
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

//ACTION FOR GET state_master
export const handleGetStateMasterList = (bankCode,headers) =>{
    debugger
    return (dispatch) => {
        return getStateMaster (bankCode,headers)
            .then((list) => {
                dispatch(receiveStateList(list))
            }).catch((error)=>{
                console.log(error)
            })
    }
}
import { saveCountryMaster, updateCountryMaster, getCountryMaster,deleteCountryMaster } from '../common/api'
import Swal from 'sweetalert2'

export const COUNTRY_LIST = 'COUNTRY_LIST'

export const receiveCountryList = (list) =>{
    return {
        type : COUNTRY_LIST,
        list
    }
}

//ACTION FOR SAVE country_master
export const handleSaveCountryMaster = (data, headers) =>{
    debugger

    return (dispatch) => {
        return saveCountryMaster (data, headers)
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
//ACTION FOR UPDATE country_master
export const handleSUpdateCountryMaster= (data, headers) =>{
    debugger

    return (dispatch) => {
        return updateCountryMaster (data, headers)
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
//ACTION FOR GET country_master
export const handleGetCountryMasterList = (bankCode, headers) =>{
    debugger
    return (dispatch) => {
        return getCountryMaster (bankCode, headers)
            .then((list) => {
                dispatch(receiveCountryList(list))
            }).catch((error)=>{
                console.log(error)
            })
    }
}

export const handleDeleteCountryMatser =   (data, headers) =>{
    debugger
    return  (dispatch) => {
        return  deleteCountryMaster(data, headers) 
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
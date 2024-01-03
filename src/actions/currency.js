import { saveCurrencyMaster,getCurrencyMaster,updateCurrencyMaster  } from '../common/api'
import Swal from 'sweetalert2'


export const CURRENCY_LIST = 'CURRENCY_LIST'
export const receiveCurrencyList = (list) =>{
    return {
        type : CURRENCY_LIST,
        list
    }
}

//ACTION FOR Save currency_master
export const handleSaveCurrencyMaster = (data, headers) =>{
    debugger

    return (dispatch) => {
        // document.getElementById("loader-wrapper").style.visibility = "visible";
        return saveCurrencyMaster (data, headers)
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
//ACTION FOR UPDATE currency_master
export const handleUpdateCurrencyMaster = (data, headers) =>{
    debugger

    return (dispatch) => {
        // document.getElementById("loader-wrapper").style.visibility = "visible";
        return updateCurrencyMaster (data, headers)
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

//ACTION FOR GET currency_master
export const handleGetCurrencyMasterList = (bankCode,headers) =>{
    debugger
    return (dispatch) => {
        return getCurrencyMaster (bankCode,headers)
            .then((list) => {
                dispatch(receiveCurrencyList(list))
            }).catch((error)=>{
                console.log(error)
            })
    }
}

import { saveDeligenceMaster,updateDeligenceMaster,getDeligenceMaster,deleteDeligenceMaster } from '../common/api'
 import 'react-s-alert/dist/s-alert-default.css';
 import Swal from 'sweetalert2'

 export const DELIGENCE_LIST = 'DELIGENCE_LIST'

 export const receiveDeligenceMasterList = (list) =>{
    return {
        type : DELIGENCE_LIST,
        list
    }
}
 export const handleSaveDeligenceMaster  = (data, headers) =>{
    debugger

    return (dispatch) => {
        return saveDeligenceMaster (data, headers)
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

//ACTION FOR UPDATE state_master
export const handleUpdateDeligenceMaster = (data, headers) =>{
    debugger

    return (dispatch) => {
        // document.getElementById("loader-wrapper").style.visibility = "visible";
        return updateDeligenceMaster (data, headers)
            .then((response) => {
               // handleGetStateMasterList()
                // // document.getElementById("loader-wrapper").style.visibility = "hidden";
                // Alert.success(" Record Added Sucessfully",{ position: 'top' })
               // dispatch(receiveBankMasterResponce(response))
            }).catch((error)=>{
                console.log(error)
            })
    }
}

export const handleDeleteDeligenceMaster = (data, headers) =>{
    debugger
    return (dispatch) => {
        // document.getElementById("loader-wrapper").style.visibility = "visible";
        return deleteDeligenceMaster (data, headers)
            .then((response) => {
               // handleGetStateMasterList()
                // // document.getElementById("loader-wrapper").style.visibility = "hidden";
                // Alert.success(" Record Added Sucessfully",{ position: 'top' })
               // dispatch(receiveBankMasterResponce(response))
            }).catch((error)=>{
                console.log(error)
            })
    }
}

//ACTION FOR GET state_master
export const handleGetDeligenceMasterList = (bankCode,headers) =>{
    debugger
    return (dispatch) => {
        return getDeligenceMaster (bankCode,headers)
            .then((list) => {
                dispatch(receiveDeligenceMasterList(list))
            }).catch((error)=>{
                console.log(error)
            })
    }
}
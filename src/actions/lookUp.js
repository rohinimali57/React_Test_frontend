import { savelookUP, getLookup, updatelookup, deletelookUP } from '../common/api'
import Swal from 'sweetalert2'
export const LOOKUP_LIST = 'LOOKUP_LIST'


export const receiveLookupList = (list) =>{
    return {
        type : LOOKUP_LIST,
        list
    }
}

export const handleGetLookupData = (data, headers) =>{
    debugger
    return (dispatch) => {
        return savelookUP (data, headers)
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
export const  handleUpdateLookupData = (data, headers) =>{
    debugger

    return (dispatch) => {
        // document.getElementById("loader-wrapper").style.visibility = "visible";
        return updatelookup (data, headers)
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

export const handleDeleteLookupData = (data, headers) =>{
    debugger
    return (dispatch) => {
        // document.getElementById("loader-wrapper").style.visibility = "visible";
        return deletelookUP (data, headers)
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

export const handleGetLookupListBylookUpcode = (lookupCode,headers) =>{
    debugger
    return (dispatch) => {
        return getLookup (lookupCode,headers)
            .then((list) => {
                dispatch(receiveLookupList(list))
            }).catch((error)=>{
                console.log(error)
            })
    }
}
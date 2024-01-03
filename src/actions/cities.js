import { saveCityMaster,updateCityMaster,getCityMaster,deleteCityMaster } from '../common/api'
import Swal from 'sweetalert2'

export const CITY_LIST = 'CITY_LIST'

export const receiveCityList = (list) =>{
    return {
        type : CITY_LIST,
        list
    }
}

//ACTION FOR Save city_master
export const handleSaveCityMaster =   (data, headers) =>{
    debugger

    return  (dispatch) => {
        return  saveCityMaster   (data, headers) 
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

//ACTION FOR UPDATE city_master
export const handleUpdateCityMaster = (data, headers) =>{
    debugger

    return (dispatch) => {
        return updateCityMaster (data, headers)
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


//ACTION FOR Delete city_master
export const handleDeleteCityMaster =   (data, headers) =>{
    debugger
    return  (dispatch) => {
        return  deleteCityMaster   (data, headers) 
            .then((response) => {
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your Data Delete Sucessfully.',
                    icon: 'success',
                    })
            }).catch((error)=>{
                console.log(error)
            })
    }
}

//ACTION FOR GET city_master
export const handleGetCityMasterList = (bankCode,headers) =>{
    debugger
    return (dispatch) => {
        return getCityMaster (bankCode,headers)
            .then((list) => {
                dispatch(receiveCityList(list))
            }).catch((error)=>{
                console.log(error)
            })
    }
}

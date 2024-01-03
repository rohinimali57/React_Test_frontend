import { saveUserMaster,updateUserMaster, getUserMaster,deleteListUser } from '../common/api'
import Swal from 'sweetalert2'
export const USER_LIST = 'USER_LIST'
export const GROUPUSER_LIST = 'GROUPUSER_LIST'



export const receiveUserList = (list) =>{
    return {
        type : USER_LIST,
        list
    }
}
export const receiveGroupUserList = (list) =>{
    return {
        type : GROUPUSER_LIST,
        list
    }
}
//Action For Save User
export const handleSaveUserMaster = (data, headers) =>{
    debugger

    return (dispatch) => {
       
        return saveUserMaster (data, headers)
            // .then((response) => {
            //     console.log("Result==>", response)
            //     if(response!="Fail"){
            //         Swal.fire({
            //             title: 'Submitted!',
            //             text: 'Your Data Submitted Sucessfully.',
            //             icon: 'success',
            //           })
            //     }
            //    else{
            //     Swal.fire({
            //         title: 'Fail!',
            //         text: 'UserId Already Exist.',
            //         icon: 'error',
            //       })
            //    }
                
            // }).catch((error)=>{
            //     Swal.fire({
            //         title: 'Fail!',
            //         text: 'Your Data Is Not Submitted.',
            //         icon: 'error',
            //       })
            // })
 }
}

export const handleUpdateUserMaster = (data, headers) =>{
    debugger

    return (dispatch) => {
       
        return updateUserMaster (data, headers)
    }
}

//Action For Save User
export const handleGetUserMasterList = (bankCode,headers) =>{
    debugger
    return (dispatch) => {
        return getUserMaster (bankCode,headers)
            .then((list) => {
                dispatch(receiveUserList(list))
            }).catch((error)=>{
                console.log(error)
            })
    }
}


//ACTION FOR Delete user List
export const handleDeleteListUser =   (data, headers) =>{
    debugger
    return  (dispatch) => {
        return  deleteListUser   (data, headers) 
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
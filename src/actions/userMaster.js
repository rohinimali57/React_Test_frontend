import { saveUserMaster, getUserMaster,getGroupUserHierychy,saveGroupUserHierychy,updateGroupUser,runDueDiligenceJob } from '../api/api'
import 'react-s-alert/dist/s-alert-default.css';
import Alert from 'react-s-alert';

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
export const handleSaveUserMaster = (data, headers) =>{
    debugger

    return (dispatch) => {
        // document.getElementById("loader-wrapper").style.visibility = "visible";
        return saveUserMaster (data, headers)
            .then((response) => {
               
                // document.getElementById("loader-wrapper").style.visibility = "hidden";
                // Alert.success(" Record Added Sucessfully",{ position: 'top' })
               // dispatch(receiveBankMasterResponce(response))
            }).catch((error)=>{
                console.log(error)
            })
    }
}

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

export const handleGetGroupUserHierychy = (userId,headers) =>{
    debugger
    return (dispatch) => {
        return getGroupUserHierychy (userId,headers)
            .then((list) => {
                dispatch(receiveGroupUserList(list))
            }).catch((error)=>{
                console.log(error)
            })
    }
}

export const handlesaveGroupUserHierychy = (data, headers) =>{
    debugger

    return (dispatch) => {
        // document.getElementById("loader-wrapper").style.visibility = "visible";
        return saveGroupUserHierychy (data, headers)
            .then((response) => {
               
                // document.getElementById("loader-wrapper").style.visibility = "hidden";
                // Alert.success(" Record Added Sucessfully",{ position: 'top' })
               // dispatch(receiveBankMasterResponce(response))
            }).catch((error)=>{
                console.log(error)
            })
    }
}
export const handleupdateGroupUser = (data,headers) =>{
    debugger

    return (dispatch) => {
        // document.getElementById("loader-wrapper").style.visibility = "visible";
        return updateGroupUser (data,headers)
            .then((response) => {
               
                // document.getElementById("loader-wrapper").style.visibility = "hidden";
                // Alert.success(" Record Added Sucessfully",{ position: 'top' })
               // dispatch(receiveBankMasterResponce(response))
            }).catch((error)=>{
                console.log(error)
            })
    }
}

export const handlerunDueDiligenceJob = (data,headers) =>{
    debugger

    return (dispatch) => {
        // document.getElementById("loader-wrapper").style.visibility = "visible";
        return runDueDiligenceJob (data,headers)
            .then((response) => {
               
                // document.getElementById("loader-wrapper").style.visibility = "hidden";
                // Alert.success(" Record Added Sucessfully",{ position: 'top' })
               // dispatch(receiveBankMasterResponce(response))
            }).catch((error)=>{
                console.log(error)
            })
    }
}
import {getRoleRightsData, saveRoleMenuMap,UpdateRoleRights} from '../common/api'
    import 'react-s-alert/dist/s-alert-default.css';
    import Alert from 'react-s-alert';
    export const ROLERIGHT_LIST = 'ROLERIGHT_LIST'

    export const receiverolerightList = (list) =>{
        debugger
        return {
           
            type : ROLERIGHT_LIST,
            list,
        }
    }
    export const handleGetRoleRightList = (roleCode,headers) =>{
        debugger
        return (dispatch) => {
            return getRoleRightsData (roleCode,headers)
                .then((list) => {
                    dispatch(receiverolerightList(list))
                }).catch((error)=>{
                    console.log(error)
                })
        }
    }

    export const handleSaveRoleMenuMap= (data, headers) =>{
        debugger
        return (dispatch) => {
           // document.getElementById("loader-wrapper").style.visibility = "visible";
    
            return saveRoleMenuMap (data,headers)
                .then((response) => {
                    console.log("saveGroupUsers",response)
                   // document.getElementById("loader-wrapper").style.visibility = "hidden";
                    // Alert.success(" Record Added Sucessfully",{ position: 'top' })
                   // dispatch(receiveBankMasterResponce(response))
                }).catch((error)=>{
                    console.log(error)
                })
        }
    }

    export const handleUpdateRolrRights= (id,headers) =>{
        debugger
        return (dispatch) => {
           // document.getElementById("loader-wrapper").style.visibility = "visible";
    
            return UpdateRoleRights (id,headers)
                .then((response) => {
                    console.log("saveGroupUsers",response)
                   // document.getElementById("loader-wrapper").style.visibility = "hidden";
                    // Alert.success(" Record Delete Sucessfully",{ position: 'top' })
                   // dispatch(receiveBankMasterResponce(response))
                }).catch((error)=>{
                    console.log(error)
                })
        }
    }
import {getEODMasterConfiguration} from '../api/api'

export const EOD_LIST = 'EOD_LIST'


export const receiveEodconfigList = (list) =>{
    return {
        type : EOD_LIST,
        list
    }
}

//ACTION FOR GET state_master
export const handleEODMasterConfiguration = (headers) =>{
    debugger
    return (dispatch) => {
        return getEODMasterConfiguration (headers)
            .then((list) => {
                dispatch(receiveEodconfigList(list))
            }).catch((error)=>{
                console.log(error)
            })
    }
}
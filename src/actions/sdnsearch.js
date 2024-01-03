import {sdnSearch} from '../common/api'


export const SDN_LIST = 'SDN_LIST'
export const receiveSDN_List = (list) =>{
    return {
        type : SDN_LIST,
        list
    }
}

export const handleSdnSearch = (data,headers ) =>{
    debugger
    return (dispatch) => {
        return sdnSearch (data,headers)
            .then((list) => {
               dispatch(receiveSDN_List(list))
            }).catch((error)=>{
                console.log(error)
            })
    }
}
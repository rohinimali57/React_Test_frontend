import {Login} from '../common/api'

export const MENU_LIST = 'MENU_LIST'

export const receiveMenulist = (list) =>{
    debugger
    return {
        type : MENU_LIST,
        list,
        
    }
}

export const handleLogin= (data) =>{
    debugger
    return (dispatch) => {

        return Login (data)
            .then((response) => {
                if(response.data===undefined){
                    return response
                }else if(response.data===""){
                    return response
                }else if(response.data.message.summary==="user is locked contact to Admin"){
                    return response
                }
                else{
            console.log("11",response.data)
                var data = response.data.menu || null
                console.log("adaddasd",data)
                var token =response.data.Token
                var bankCode = response.data.user.bankCode
                localStorage.setItem("bankdata",bankCode)
                localStorage.setItem("tokendata", token)
                localStorage.setItem("userId", response.data.userId)
                localStorage.setItem("amldata", JSON.stringify(data))
                localStorage.setItem('amldata1', JSON.stringify(data))
                localStorage.setItem('LoginData', JSON.stringify(response.data))
               // localStorage.setItem('userLoginDto', JSON.stringify(response.data))

              

                dispatch(receiveMenulist(response.data.menu))
                return response
                }
            }).catch((error)=>{
                console.log(error)
            })
    }
}
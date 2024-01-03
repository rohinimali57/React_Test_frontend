import { saveBotConfig } from '../common/api'
import Swal from 'sweetalert2'

export const BANK_MASTER = "BANK_MASTER";


export const receiveBankMasterResponce = (response) =>{
    return {
        type : BANK_MASTER,
        response
    }
}

export const handleGetBankMasterData = (data, headers) =>{
    debugger
    return (dispatch) => {

        return saveBotConfig (data, headers)
            .then((response) => {
                Swal.fire(" Record Added Sucessfully");
                 console.log("bankCodeeee",response.data)
                dispatch(receiveBankMasterResponce(response))
            }).catch((error)=>{
                console.log(error)
            })
    }
}
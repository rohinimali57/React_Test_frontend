import { alertID } from "../common/api";


export const ALERT_MANAGMENT = "ALERT_MANAGMENT";


export const receiveAlertManagmentResponce = (response) =>{
    return {
        type : ALERT_MANAGMENT,
        response:response
    }
}

export const handleAlertManagmentData = (id, headers,handleAlertInfoUpdate) =>{
    debugger
    return (dispatch) => {

        return alertID (id, headers,)
            .then((response) => {
                 console.log("in classification action==",response);
                 
                dispatch(receiveAlertManagmentResponce(response))
                
                if (typeof handleAlertInfoUpdate === 'function') {
                    handleAlertInfoUpdate(response.alertInfo); // Pass the relevant data to the callback
                  }
            }).catch((error)=>{
                console.log(error)
            })
    }

}
// export const handleAlertClassification = (param,headers,) =>{
//     debugger
//     return (dispatch) => {

//         return alertClassification(param,headers)
//             .then((response) => {
//                  console.log("in action==",response);
                 
//                 dispatch(receiveAlertManagmentResponce(response))
                
//                 // if (typeof handleAlertInfoUpdate === 'function') {
//                 //     handleAlertInfoUpdate(response.alertInfo); // Pass the relevant data to the callback
//                 //   }
//             }).catch((error)=>{
//                 console.log(error)
//             })
//     }
// }
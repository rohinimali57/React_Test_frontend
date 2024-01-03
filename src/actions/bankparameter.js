import {saveBankparameter} from '../common/api'
import Swal from 'sweetalert2'




export const handlebankparameterpData = (data, headers) =>{
    debugger
    return (dispatch) => {
      
        return saveBankparameter (data,headers)
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
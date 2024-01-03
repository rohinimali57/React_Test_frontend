import { saveBranchParameter } from '../common/api'
import Swal from 'sweetalert2'


export const handleSaveBranchParameter = (data, headers) =>{
    debugger
    return (dispatch) => {
        return saveBranchParameter (data, headers)
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
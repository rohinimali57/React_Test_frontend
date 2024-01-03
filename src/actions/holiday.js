
import { saveBranchHoliday , getBranchHoliday  } from '../common/api'
import Swal from 'sweetalert2'


export const HOLIDAY_LIST = 'HOLIDAY_LIST'

export const receiveHolidayList = (list) =>{
    return {
        type : HOLIDAY_LIST,
        list
    }
}
// Action Save branch_holiday_master
export const handleSaveBranchHoliday = (data, headers) =>{
    debugger

    return (dispatch) => {
        return saveBranchHoliday (data, headers)
            .then((response) => {
                Swal.fire({
                    title: 'Submitted!',
                    text: 'Your Data Submitted Sucessfully.',
                    icon: 'success',
               
                  })
            }).catch((error)=>{
                console.log(error)
            })
    }
}
// Action Get branch_holiday_master
export const handleGetHolidayList = (branchCode,headers) =>{
    debugger
    return (dispatch) => {
        return getBranchHoliday (branchCode,headers)
            .then((list) => {
                dispatch(receiveHolidayList(list))
            }).catch((error)=>{
                console.log(error)
            })
    }
}

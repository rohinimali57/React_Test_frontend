//Action For Save Monitor
export const handleSaveTravelLogs = (data, headers) =>{
    debugger

    return (dispatch) => {
        // document.getElementById("loader-wrapper").style.visibility = "visible";
        return saveTravelMaster (data, headers)
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
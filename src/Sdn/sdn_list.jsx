import React, { Component } from 'react'
import Universal from '../common/universal'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Swal from 'sweetalert2'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import DatePicker from 'react-date-picker';
import axios from 'axios'
import {applicationContextPath} from '../api/api'

 class sdn_list extends Component {
    constructor(props){
        super(props)

        this.state={
         getApiData:[],
         today:new Date()
        }
  }
//   Save = (row,cell) => { 
//     return(
//         Swal.fire({
//             title: 'Are you Want to Upload?',
//             text: '',
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonText: 'Yes, Upload it!',
//             cancelButtonText: 'No  '
//           }).then((result) => {
//             if (result.value) {
//               Swal.fire(
//                 'Upload!',
//                 'Your Data  has been Upload.',
//                 'success'
//               )
//             // For more information about handling dismissals please visit
//             // https://sweetalert2.github.io/#handling-dismissals
//             } else if (result.dismiss === Swal.DismissReason.cancel) {
//               Swal.fire(
//                 'Cancelled',
//                 ' ',
//                 'error'
//               )
//             }
//           })
//     )
// }
 
 
handleChange = event => {
 const inputDate= new Date(event.target.value);
 const today = new Date();
 const inputDateOnly = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());
 const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
 
 if (inputDateOnly < todayOnly) {
   Swal.fire("Please Enter Vaild Date")
   return
 }
}

getDate () {
    //var today = new Date();
    this.setState({today: new Date()})
    // document.getElementById("date").value = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);

  }
  backFromSummary() {
    window.history.back();
  }
render() {
    return (
  
            <React.Fragment>
            <Universal/>
            <section id="main-content">
    <section className="wrapper">
      <div className="row">
        <div className="col-lg-9 main-chart">
          <section className="dashboard-counts no-padding-bottom">
           
            <div className="container-fluid" style={{marginTop: '-1rem'}}>
              <h1 style={{fontSize: '22px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid #e9ecef'}}>SDN Upload</h1>
              <div className="container-fluid">
                <div className="row bg-blue has-shadow mt-3" style={{borderRadius: '1rem'}}>
                  <div className="col-12 col-md-2 col-lg-2 rightCol">
                    <p  style={{color:"white",fontWeight:"bolder",fontSize:"15px"}}>List Name<span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" >
                    <div className="form-group">
                    <select className="form-control select2 " className="form-select form-select-sm minimal heightForm"  style={{width: '100%',height:"auto"}} id="country">
                                            <option value="">List Name</option>
                                            <option value="">OFAC</option>
                                            <option value="">WORLDCHECK</option>
                                            <option value="">UN LIST</option>
                                        </select>                    </div>
                  </div>

                  <div className="col-11  col-lg-2 rightCol">
                    <p style={{color:"white",fontWeight:"bolder",fontSize:"15px"}} className="">Format<span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" >
                    <div className="form-group">
                    <select className="form-control select2 " className="form-select form-select-sm minimal heightForm"  style={{width: '100%',height:"auto"}} id="country">
                                            <option value="">Format</option>
                                            <option value="">XML</option>
                                            <option value="">CSV</option>
                                        </select>
                    </div>
                     </div>
                     
                    <div className="col-11  col-lg-2 rightCol">
                    <p style={{marginTop: '1rem',color:"white",fontWeight:"bolder",fontSize:"15px"}} className="">Upload Date<span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '1rem'}}>
                    <div className="form-group">
                    <input type="date"  id="birthday" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} onChange={this.handleChange}
                    name="birthday" />
                    </div>
                    </div>

                    <div className="col-11  col-lg-2 rightCol">
                    <p style={{marginTop: '1rem',color:"white",fontWeight:"bolder",fontSize:"15px"}} className="">File<span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '1rem'}}>
                    <div className="form-group">
                    <input type="file"   id="fileToUpload" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 11px)', marginRight: '1rem' }} 
                    name="fileToUpload"/>
                    </div>
                    </div>

                   
                    
                    
                   
                   
                 
                  </div>
                </div>
                <div className="row has-shadow mt-3" style={{borderRadius: '1rem', backgroundColor: 'white',width:'96%', marginTop: '5rem',marginLeft: '2%'}}>
            <button type="button" id="Save"  className="btn btn-primary "  style={{borderColor: '#303974', marginLeft:'90%',backgroundColor: '#303974', fontSize: '15px'}}  onClick={() => this.Save()}  > Upload </button>
                                    </div>
              </div>

          </section>
          
          {/* /row */}
        </div>
        {/* /col-lg-3 */}
      </div>
      {/* /row */}
    </section>
  </section>
        </React.Fragment>
        )
    }
}

export default sdn_list

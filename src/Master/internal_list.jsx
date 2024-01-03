import React, { Component } from 'react'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import axios from 'axios'
import Universal from '../common/universal'
import Swal from 'sweetalert2'
// import Footer from '../Common/Footer'

 class internal_list extends Component {
    constructor(props){
        super(props)

        this.state={
         getApiData:[],
         today:new Date()
        }
  }
  Save = (row,cell) => { 
    return(
        Swal.fire({
            title: 'Are you Want to Upload?',
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Upload it!',
            cancelButtonText: 'No  '
          }).then((result) => {
            if (result.value) {
              Swal.fire(
                'Upload!',
                'Your Data  has been Upload.',
                'success'
              )
            // For more information about handling dismissals please visit
            // https://sweetalert2.github.io/#handling-dismissals
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire(
                'Cancelled',
                ' ',
                'error'
              )
            }
          })
    )
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
                  <h1 style={{fontSize: '22px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid #e9ecef'}}>Internal list</h1>
                  <div className="container-fluid">
                    <div className="row bg-blue has-shadow mt-3" style={{borderRadius: '1rem'}}>
                    <div className="col-12 col-md-2 col-lg-2 rightCol">
                        <p  style={{color:"white",fontWeight:"bolder",fontSize:"15px"}}>Upload Date <span style={{color:"red"}}>*</span></p>
                       
                      </div>
                      <div className="col-12 col-md-4" >
                        <div className="form-group">
                        <input type="text"   className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                          id="todate" type="date" onChange={this.handleChange}/>
                        </div>
                      
                       
                      </div>
                      <div className="col-12 col-md-2 col-lg-2 rightCol">
                        <p  style={{color:"white",fontWeight:"bolder",fontSize:"15px"}}>File  <span style={{color:"red"}}>*</span></p>
                       
                      </div>
                      <div className="col-12 col-md-4" >
                        <div className="form-group">
                        <input type="text"   className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(2em + 0.75rem + 2px)', marginRight: '1rem' }} 
                          type="file"  id="fileToUpload" />
                        </div>
                     
                       
                      </div>
                     
                   
                   
                    </div>
                    <div className="row has-shadow mt-3" style={{borderRadius: '1rem', backgroundColor: 'white',width:'100%', marginTop: '5rem',marginLeft: '0%'}}>
            <button type="button" id="Save"  className="btn btn-primary "  style={{borderColor: '#303974', marginLeft:'90%',backgroundColor: '#303974', fontSize: '15px'}}   onClick={() => this.Save()}  > Upload </button>
                                    </div>
                  </div>
                </div>
                {/* <div className="row has-shadow mt-3" style={{borderRadius: '1rem', backgroundColor: 'white', marginTop: '5rem'}}>
                <section class="wrapper">
            <section className="content">
                               <div className="col-xs-12">
                               <div className="box">
                               <div className="box-body  no-LR-padding expandcontentscell">
                          
                               </div>
                               </div>
                                   </div>
                               </section>
                               </section>
                        </div> */}
              </section>
              
              {/* /row */}
            </div>
           
          </div>
          {/* /row */}
        </section>
      </section>
           </React.Fragment>
        )
    }
}

export default internal_list
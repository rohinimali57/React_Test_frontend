import React, { Component } from 'react'
import Universal from '../common/universal'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Swal from 'sweetalert2'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import DatePicker from 'react-date-picker';
import axios from 'axios'
import {applicationContextPath} from '../api/api'

 class risk_weightage_master extends Component {
 
    constructor(props){
        super(props)
    
        this.state={
         getApiData:[],
        }
    
        
    }
    
    componentDidMount() {
    // this.getApiData();
    
    }
    getApiData=()=>{
    
        Swal.fire({
            title: 'Saved!',
            text: 'Your Data Saved Sucessfully.',
            icon: 'success',
            // showCancelButton: true,
            // confirmButtonText: 'Yes',
            // cancelButtonText: 'No'
          })
    
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
              <h1 style={{fontSize: '22px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid #e9ecef'}}> Risk Weightage Master </h1>
             
              </div>
              
           
            <div className="row has-shadow mt-3" style={{borderRadius: '1rem', backgroundColor: 'white', marginTop: '5rem'}}>
            {/* <section class="wrapper">
        <section className="content"> */}
                           <div className="col-xs-12">
                           <div className="box">
                           <div className="box-body  no-LR-padding expandcontentscell">
                           <table  align="left" width="100%" border="1px solid #758080" style={{margin: 30}}>
        <thead>
        {/* <tr style={{textAlign: 'center', background: 'lightblue'}}>
            <th colspan="2">&nbsp;&nbsp;&nbsp;KYC Risk</th>
            <th>&nbsp;&nbsp;&nbsp;25%</th>
        </tr> */}
        <tr style={{textAlign: 'center', color: 'black', background: 'lightgrey'}}>
            <th>&nbsp;&nbsp;&nbsp;Risk</th>
            <th width="25%">&nbsp;&nbsp;&nbsp;Weightage</th>
        </tr>
       
        </thead>
        <tbody style={{color: 'black'}}>
            <tr>
                <td >&nbsp;&nbsp;&nbsp;Customer KYC Risk</td>
                <div className="select2">
                        <input className="select2" id="custkycrisk" type="text" placeholder="50%"/>
                    </div>               
            </tr>
            <tr>
                <td >&nbsp;&nbsp;&nbsp;Transaction Trend Risk</td>
                <div className="select2">
                        <input className="select2" id="transactionrisk" type="text" placeholder="20%"/>
                    </div>              
            </tr>
            <tr>
                <td >&nbsp;&nbsp;&nbsp;Transaction Type Risk </td>
                <div className="select2">
                        <input className="select2" id="transactiontype" type="text" placeholder="20%"/>
                    </div>               
            </tr>
            <tr>
                <td >&nbsp;&nbsp;&nbsp;Rules Violation Trend</td>
                <div className="select2">
                        <input className="select2" id="ruleviolation"  type="text" placeholder="10%"/>
                    </div>               
            </tr>
            
        </tbody>
    </table>
    <div className="row pull-center" style={{marginLeft: '0.8rem'}}>
                                                               
                                                              <div className="pr-3" >
                                                             
                                                                <button type="button" className="btn btn-primary "style={{borderColor: '#303974', backgroundColor: '#303974', fontSize: '15px'}} id="Save" onClick={() => this.getApiData()}
                                                                >Save</button>
                                                              </div>

                                                            </div>

                           </div>
                           </div>
                               </div>
                           {/* </section>
                           </section> */}
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

export default risk_weightage_master

import React, { Component } from 'react'
import 'react-tabs/style/react-tabs.css'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import axios from 'axios'
import {applicationContextPath} from '../common/api'
//  import Footer from './../../Component/footer'
 import 'react-s-alert/dist/s-alert-default.css'
 import Swal from 'sweetalert2'
 import Universal from '../common/universal'
 import { connect } from 'react-redux'
 import {handleEODMasterConfiguration } from '../actions/eodconfig'

class eod_configuration_master extends Component {
        constructor(props){
            super(props)
    
            this.state={
              list:[],
              eodlist:[],
             getApiData:[],
             botapidata: {
              "stateCode": "",
            
            },
            }
      }
      componentDidMount() {
        this.failureStatusData();
       
      }
     
      getStateData = (urlQuery) => {
        debugger
        //var token = (localStorage.getItem("tokendata"))
        var token =(localStorage.getItem("tokendata"))
        var bankCode =localStorage.getItem("bankdata")
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token,
          }
        this.props.dispatch(handleEODMasterConfiguration(headers));
    
      }
      failureStatusData = () =>{
        debugger
        
    var token = (localStorage.getItem("tokendata"))
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token,
        
      }
      // document.getElementById("loader-wrapper").style.visibility = "visible";
        axios.get(applicationContextPath+"/getEODMasterConfiguration",{headers:headers})
        .then(response => {
          // document.getElementById("loader-wrapper").style.visibility = "hidden";
      console.log("xxxxxxxxxxxxx",response.data)
        this.setState({ eodlist: response.data })   

        }
      
      ).catch(error => {
          console.log(error);
      });
      
      }
      saveeodconfig = () =>{
        debugger
      var  eodlist = this.state.eodlist
    var token = localStorage.getItem("tokendata")
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token,
        
      }
      Swal.fire({
        title: 'Saved!',
        text: 'Your Data Saved Sucessfully.',
        icon: 'success',
        // showCancelButton: true,
        // confirmButtonText: 'Yes',
        // cancelButtonText: 'No'
      })
        axios.post(applicationContextPath+"/updateEODConfiguration",eodlist,{headers:headers})
        .then(response => {
      console.log("xxxxxxxxxxxxx",response.data)
       this.failureStatusData()  

        }
      
      ).catch(error => {
          console.log(error);
      });
      
      }
    
    processID = (row,cell) => { 
        return(
         <div className='expandcontents'>
           {cell.processID} 
         </div>
        )
    }
    processName = (row,cell) => { 
      return(
       <div className='expandcontents'>
         {cell.processName} 
       </div>
      )
  }
  description = (row,cell) => { 
    return(
     <div className='expandcontents'>
       {cell.processDescription} 
     </div>
    )
}
lastRunDate = (row,cell) => { 
  return(
   <div className='expandcontents'>
     {cell.lastRunDate} 
   </div>
  )
}
nextRunDate = (row,cell) => { 
  return(
   <div className='expandcontents'>
     {cell.nextRunDate} 
   </div>
  )
}
frequency = (row,cell) => { 
  return(
   <div className='expandcontents'>
     {cell.frequency} 
   </div>
  )
}
upload = (row,cell) => { 
  return(
   <div className='expandcontents'>
     {cell.upload} 
   </div>
  )
}
getApiData1=(cell,row,e)=>{
  debugger
  
    var i = 0;
    var lists = this.state.list
      
        if(e.target.checked == false){
         
          let index = lists.map((item) => item.processId).indexOf(cell.processId);
if (index > -1) {
  
  lists.splice(index, 1);
  console.log("Result", lists);
  

}
        
    }else{
     
      lists.push(cell)
    }
 
 
  this.setState({list:lists})
  
} 
runeodconfig = () =>{
  debugger
  
var  eodlist = this.state.list
var token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBdXRoZW50aWNhdGlvbiB0b2tlbiIsImV4cHRpbWUiOjE2MDY1NzkwOTAyODAsInJvbGUiOiJQR00sIFBHViIsImlzcyI6ImR1Y2F0LXNwcmluZ2Jvb3Qtand0dG9rZW4iLCJzZXNzaW9uaWQiOiI4YzdjN2Y4Yi0xNjRkLTRkOGEtYjM2OC1kZjFlYThiZDNmOTAiLCJ1c2VyaWQiOiI2NzUiLCJpYXQiOiIyMDIwLTExLTI4IDIwOjU4OjEwIn0.12ic8PjkEEw4yR4H0OkqYAR3jJ0ge08MCFdymj6m2rs_aBu-NGOqwjb34nGDKbFF7Cy_rnZAGUb-dCR_n_Yfkg"
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer '+token,
  
}
  axios.post(applicationContextPath+"/runEODConfiguration",eodlist,{headers:headers})
  .then(response => {
console.log("xxxxxxxxxxxxx",response.data)
 this.failureStatusData()  

  }

).catch(error => {
    console.log(error);
});

}
actionMethod = (row,cell) => {

  return (
      < React.Fragment>
          <td> 

              <div className="btn-groupdotted" >
                  
                      <input type="checkbox" onChange={(e) => this.getApiData1(cell,row,e)} name="vehicle1" value="Bike"/> 


              </div>

          </td>
      </React.Fragment>
  )
}

failureType = (cell, row) => {
    
  return (
    
    <React.Fragment>
          <select className="form-control select2 " id="frequency" name="failureType" value={row.frequency} onChange={(e)=>this.handleChange(e,row)}
             style={{ width: '100%' }} >
            <option  selected="">-- Select --</option>
            <option value="monthly">Monthly</option>
            <option value="daily">Daily</option>
          </select>
        </React.Fragment> 
    
  )
}
failureType1 = (cell, row) => {
    
  return (
    
    <React.Fragment>
          <select className="form-control select2 " id="upload" name="failureType" value={row.upload} onChange={(e)=>this.handleChange(e,row)}
             style={{ width: '100%' }} >
            <option  selected="">-- Select --</option>
            <option value="Yes">Yes</option>
            <option value="NO">NO</option>
          </select>
        </React.Fragment> 
    
  )
}
failureType4 = (cell, row) => {
    
  return (
    
    <React.Fragment>
          
          <input className="form-control select2 " value={row.lastRunDate} type="text" id="lastRunDate"  name="birthday" readOnly/>

        </React.Fragment> 
    
  )
}

failureType5 = (cell, row) => {  
  return (
    <React.Fragment>   
          <input className="form-control select2 " value={row.nextRunDate} onChange={(e)=>this.handleChange(e,row)} type="date" id="nextRunDate" name="birthday"/>
        </React.Fragment> 
  )
}
handleChange = (e,row) => {
  debugger
  var botapidata1 = this.state.eodlist
  for(let i=0; i< botapidata1.length;i++){
    if(botapidata1[i].processId==row.processId){
      if(e.target.id=="nextRunDate"){
      botapidata1[i].nextRunDate= e.target.value
      }
      if(e.target.id=="frequency"){
        botapidata1[i].frequency= e.target.value
        }
        if(e.target.id=="upload"){
          botapidata1[i].upload= e.target.value
          }
    }
    this.setState({eodlist:botapidata1})
  }
 // return this.props.eodListss
}
   
    render() {
      console.log("this,state.bot",this.state.list)  
      return (
        
            <React.Fragment>
               {/* <div id="loader-wrapper">
                    <div id="loader"></div>
                </div> */}
                       <Universal/>
                       <div class="divider"/>
                       <div class="divider"/>
                       <div class="divider"/>
                       <div class="divider"/>

                       <section id="main-content">
    <section className="wrapper">
      <div className="row">
        <div className="col-lg-9 main-chart">
          <section className="dashboard-counts no-padding-bottom">
           
            <div className="container-fluid" style={{marginTop: '-1rem'}}>
              <h1 style={{fontSize: '22px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid #e9ecef'}}>EOD Configuration Master</h1>
              <div className="container-fluid">
             
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
                       <div className="row has-shadow mt-3" style={{borderRadius: '1rem', backgroundColor: 'white', marginTop: '5rem',width: '91%',marginLeft: '86px'}}>
                    
                                        <div className="col-xs-12">
                                        <div className="box">
                                        <div className="box-body  no-LR-padding expandcontentscell">
                                        <BootstrapTable
                                           data={this.state.eodlist}
                                           pagination={true}
                                           //search
                                           ClearSearchButton
                                           //exportCSV
                                           
                                         >
                                         <TableHeaderColumn dataFormat={this.actionMethod} dataField="Last Name" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                                            expandable={false} editable={false}   width="100px">Select</TableHeaderColumn>

                                          <TableHeaderColumn  dataField="processId" csvHeader="First Name" isKey={true} className={"columnHeaderColor"}
                                            expandable={false}  editable={false} width="100px">Process ID</TableHeaderColumn>
                    
                                            <TableHeaderColumn  dataField="processName" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                                            expandable={false} editable={false}   width="100px">Process Name</TableHeaderColumn>

                                            <TableHeaderColumn dataFormat={this.description}  dataField="processDescription" csvHeader="First Name"  className={"columnHeaderColor"}
                                            expandable={false}  editable={false} width="100px">Description</TableHeaderColumn>
                    
                                            <TableHeaderColumn dataFormat={this.failureType4} dataField="lastRunDate" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                                            expandable={false} editable={false}   width="100px">Last Run Date</TableHeaderColumn>

                                           <TableHeaderColumn dataFormat={this.failureType5} dataField="nextRunDate" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                                            expandable={false} editable={false}   width="100px">Next Run Date</TableHeaderColumn>

                                            <TableHeaderColumn dataFormat={this.failureType} dataField="frequency" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                                            expandable={false} editable={false}   width="100px">Frequency</TableHeaderColumn>

                                           <TableHeaderColumn dataFormat={this.failureType1} dataField="upload" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                                            expandable={false} editable={false}   width="100px">Upload</TableHeaderColumn>
                    
                            

                                         </BootstrapTable>
                                         <br></br>
                                         <button type="button" id="Save" className="btn btn-primary pull-right" style={{borderColor: '#303974', backgroundColor: '#303974', fontSize: '14px',marginBottom: "68px"}} onClick={() => this.saveeodconfig()}>Save Configuration</button>
                                         <div class="divider"/>
                                          <button type="button" id="Save" className="btn btn-primary pull-right" style={{borderColor: '#303974', backgroundColor: '#303974', fontSize: '14px',marginRight:"28px"}} onClick={() => this.runeodconfig()}>Run</button>
                                        <br></br>
                                        </div>
                                        </div>
                                            </div>
                                            </div>
                                       
                                      
                                        {/* <Footer/> */}

                                        </React.Fragment>

        )
    }
}
const mapStateToProps = (state) => {
  const {eodconfigmasterList} = state.eodconfiglist
  console.log("customerList", eodconfigmasterList)
  

 return {
  eodListss:eodconfigmasterList,
 
 }
}
export default connect(mapStateToProps)(eod_configuration_master)

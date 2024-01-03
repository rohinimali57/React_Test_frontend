import React, { Component } from 'react'
import Universal from '../common/universal'
import axios from 'axios'
import {applicationContextPath, birtReport} from '../api/api'
import Swal from 'sweetalert2'
import 'react-s-alert/dist/s-alert-default.css';
import { BootstrapTable } from 'react-bootstrap-table'
import { TableHeaderColumn } from 'react-bootstrap-table'
// import Footer from '../Common/Footr'
 class alert_status_report extends Component {
    constructor(props){
        super(props)

        this.state={
         getApiData:[],
         alertStatusData:{
            "fromdate":"",
            "todate":"",
            "alerttype":"",
            "status":"",
          }
        }        
  }
  
  
 
 
  handleChange= (e)=> {  
    var alertStatusData1 = this.state.alertStatusData
    alertStatusData1[e.target.id] = e.target.value
    this.setState({alertStatusData:alertStatusData1});  
    } 
   
    getApiData=()=>{
      
      var saveapidata=this.state.alertStatusData;
      if((this.state.alertStatusData.fromdate==null||this.state.alertStatusData.fromdate==""||this.state.alertStatusData.fromdate==undefined)||
      (this.state.alertStatusData.todate==null||this.state.alertStatusData.todate==""||this.state.alertStatusData.todate==undefined)||
      (this.state.alertStatusData.alerttype==null||this.state.alertStatusData.alerttype==""||this.state.alertStatusData.alerttype==undefined)||
      (this.state.alertStatusData.status==null||this.state.alertStatusData.status==""||this.state.alertStatusData.status==undefined)
      ){
         Swal.fire("Please Fill the All Details");
       return
      }
        var createA = document.createElement('a');
        createA.setAttribute('href', birtReport+`/aml/alertStatus?bankCode=${localStorage.getItem("bankdata")}&alertType=${this.state.alertStatusData.alerttype}&fromDate=${this.state.alertStatusData.fromdate}&toDate=${this.state.alertStatusData.todate}&alertStatus=${this.state.alertStatusData.status}`);
        createA.click()
    
        var token = localStorage.getItem("tokendata")
     
        const param = new URLSearchParams({
            toDate: this.state.alertStatusData.todate,
            fromDate: this.state.alertStatusData.fromdate,
            alertType: this.state.alertStatusData.alerttype,
            alertStatus: this.state.alertStatusData.status
          })
    
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token,
          'bankCode': localStorage.getItem("bankdata")
          } 
    
          window.swal({
            title: "Checking...",
            text: "Please wait",   
            // imageUrl: "images/page_loader1.gif",
          });
          setTimeout(() => {
            window.swal({
              title: "Finished!",
              type: 'success',
              showConfirmButton: false,
              timer: 1000,
              
            });
          }, 1000);
        document.getElementById("loader-wrapper").style.visibility = "visible";
        axios.post(applicationContextPath+'/getAlertStatus?'+param,null,{headers})
      .then(response => {
        document.getElementById("loader-wrapper").style.visibility = "hidden";
        console.log(response.data)
        this.setState({getApiData:response.data})
        console.log("data---",this.state.getApiData)
      },
      
    
    ).catch(error => {
        console.log(error);
    });
    
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
                  <h1 style={{fontSize: '22px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid #e9ecef'}}>Alert Status Report </h1>
                  <div className="container-fluid">
                    <div className="row  bg-blue  has-shadow mt-3" style={{borderRadius: '1rem'}}>
                      <div className="col-12 col-md-2 col-lg-2 rightCol">
                        <p  style={{color:"white",fontWeight:"bolder",fontSize:"15px"}}>From Date  <span style={{color:"red"}}>*</span></p>
                       
                      </div>
                      <div className="col-12 col-md-4" >
                        <div className="form-group">
                        <input type="text"  className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                        id="fromdate" type="date" onChange={this.handleChange}
                        value={this.state.alertStatusData.fromdate!=""?this.state.alertStatusData.fromdate:""} />
                        </div>
                      
                       
                      </div>

                      <div className="col-12 col-md-2 col-lg-2 rightCol">
                        <p  style={{color:"white",fontWeight:"bolder",fontSize:"15px"}}>To Date  <span style={{color:"red"}}>*</span></p>
                       
                      </div>
                      <div className="col-12 col-md-4" >
                        <div className="form-group">
                        <input type="text"   className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                          id="todate" type="date" onChange={this.handleChange} 
                          value={this.state.alertStatusData.todate!=""?this.state.alertStatusData.todate:""}/>
                        </div>
                      
                       
                      </div>

                      <div className="col-12 col-md-2 col-lg-2 rightCol">
                        <p  style={{marginTop: '1rem',color:"white",fontWeight:"bolder",fontSize:"15px"}}>Alert Type <span style={{color:"red"}}>*</span></p>
                       
                      </div>
                      <div className="col-12 col-md-4" >
                        <div className="form-group" style={{marginTop: '1rem'}}>
                        <select className="form-control select2" className="form-select form-select-sm minimal heightForm"  style={{width: '100%',height:"auto"}} id="alerttype" onChange={this.handleChange} 
                        value={this.state.alertStatusData.alerttype!=""?this.state.alertStatusData.alerttype:""}>
                                   <option value="">--Select--</option>
                                    <option value="VRV">VRV</option>
                                     <option value="SDN">SDN</option>
                                     <option value="SWIFT">Swift</option>
                                     <option value="De-dup">De-dup</option>
                                     <option value="Manual">Manual</option>
                                </select>
                        </div>
                        </div>
                      <div className="col-11  col-lg-2 rightCol">
                        <p style={{marginTop: '1rem',color:"white",fontWeight:"bolder",fontSize:"15px"}} className="">Status  <span style={{color:"red"}}>*</span></p>

                       
                        
                      </div>
                      <div className="col-12 col-md-4">
                        <div className="form-group" style={{marginTop: '1rem'}}>
                        <select className="form-control select2"  className ="form-select form-select-sm minimal heightForm"  style={{width: '100%',height:"auto"}} id="status" onChange={this.handleChange} 
                        value={this.state.alertStatusData.status!=""?this.state.alertStatusData.status:""}>
                                    <option value="">--Select--</option>
                                  <option value="CONFIRMED">CONFIRMED</option>
                                  <option value="WIP">WIP</option>
                                  <option value="OPEN">OPEN</option>
                                  <option value="REJECTED">REJECTED</option>
                                                          </select>
                        </div>
                        
                        </div>
                      {/* <div className="col-12 col-md-4" style={{marginTop: '2rem'}}>
                        <div className="form-group">
                        <select  className="form-select form-select-sm minimal heightForm" id="status"   style={{width: '100%',height:"30px"}}
                                                 value={this.state.alertStatusData.status!=""?this.state.alertStatusData.status:""}
                    >
                         <option value="">--Select--</option>
        <option value="CONFIRMED">CONFIRMED</option>
        <option value="WIP">WIP</option>
        <option value="OPEN">OPEN</option>
        <option value="REJECTED">REJECTED</option>
                          </select>
                        </div>
                     
                       
                       
                      
                      </div> */}
                    </div>
                  </div>
                </div>
                
                <div className="row has-shadow mt-3" style={{ borderRadius: '1rem', width: '94%', backgroundColor: 'white', marginTop: '5rem', marginLeft: '29px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <button type="button" id="Reset" style={{ borderColor: '#303974', backgroundColor: '#303974', fontSize: '15px',marginLeft :'70%' }} onClick={() => this.getApiData()} className="btn btn-primary">View</button>
    <button type="button" id="Download" style={{ borderColor: '#303974', backgroundColor: '#303974', fontSize: '15px' }} onClick={() => this.downloadData()} className="btn btn-primary">Download</button>
</div>

              </section>
              <div style={{
                    marginTop: "20px",

                  }}>

              <BootstrapTable style={{
                marginTop : "20px",
                width: "500%"
}}
                                        data={this.state.getApiData}
                                        pagination={true}
                                        
                                        // search
                                        // ClearSearchButton
                                        // exportCSV
                                    >
                                    <TableHeaderColumn dataFormat={this.caseId} dataField="Customer Id" csvHeader="First Name" isKey={true} className={"columnHeaderColor"}
                                        expandable={false}  editable={false} width="50px">Customer Id</TableHeaderColumn>
                                        
                                    <TableHeaderColumn dataFormat={this.reportedDate} dataField="createdDate" csvHeader="First Name" className={"columnHeaderColor"}
                                       expandable={false}  editable={false} width="50px">Customer Name</TableHeaderColumn>

                                    <TableHeaderColumn dataFormat={this.reportedBy} dataField="reportedBy" csvHeader="First Name" className={"columnHeaderColor"}
                                       expandable={false}  editable={false} width="50px">Alert Id</TableHeaderColumn>

                                    <TableHeaderColumn dataFormat={this.caseSeverity} dataField="caseSeverity" csvHeader="First Name" className={"columnHeaderColor"}
                                       expandable={false}  editable={false} width="50px">Alert Desc</TableHeaderColumn>
                            
                                    <TableHeaderColumn dataFormat={this.analysis} dataField="comments" csvHeader="First Name" className={"columnHeaderColor"}
                                        expandable={false}  editable={false} width="50px">Alert Date</TableHeaderColumn>

                                    <TableHeaderColumn dataFormat={this.status} dataField="caseStatus" csvHeader="First Name" className={"columnHeaderColor"}
                                        expandable={false}  editable={false} width="50px"><span>Case status</span></TableHeaderColumn>

                                    {/* <TableHeaderColumn  dataField="Role-Name" csvHeader="First Name" className={"columnHeaderColor"}
                                        expandable={false}  editable={false} width="10px"></TableHeaderColumn> */}

               </BootstrapTable>
               </div>
              
               
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

export default alert_status_report
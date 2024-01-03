import React, { Component } from 'react'
import Universal from '../common/universal'
import {applicationContextPath, birtReport} from '../common/api'
import axios from 'axios'
import Swal from 'sweetalert2'
import { BootstrapTable } from 'react-bootstrap-table'
import { TableHeaderColumn } from 'react-bootstrap-table'
class Channel_wise_alert extends Component {
    constructor(props){
        super(props)
  
        this.state={
          getApiDownloadData:[],
         channelwisedata:{
          "fromdate":"",
          "todate":"",
        },
        }
  }

  getApiData=()=>{

    if((this.state.channelwisedata.fromdate===null||this.state.channelwisedata.fromdate===""||this.state.channelwisedata.fromdate===undefined)||
    (this.state.channelwisedata.todate===null||this.state.channelwisedata.todate===""||this.state.channelwisedata.todate===undefined)  
    ){
       Swal.fire("Please Fill the All Details");
     return
    }
    var createA = document.createElement('a');
    createA.setAttribute('href', birtReport+`/aml/channelWiseAlertSummary?bankCode=${localStorage.getItem("bankdata")}&fromDate=${this.state.channelwisedata.fromdate}&toDate=${this.state.channelwisedata.todate}`);
    createA.click()


    var token = localStorage.getItem("tokendata")
 
    const param = new URLSearchParams({
        toDate: this.state.channelwisedata.todate,
        fromDate: this.state.channelwisedata.fromdate,

      })

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token,
      'bankCode': localStorage.getItem("bankdata")
      }

     
      window.Swal({
        title: "Checking...",
        text: "Please wait",   
        imageUrl: "images/page_loader1.gif",
        showConfirmButton: false,
        allowOutsideClick: false, 
        // onOpen:()=>{
        //   swal.showLoading();
        // }  
      });
      setTimeout(() => {
        window.Swal({
          title: "Finished!",
          type: 'success',
          showConfirmButton: false,
          timer: 1000,
          
        });
      }, 1000);
    document.getElementById("loader-wrapper").style.visibility = "visible"; 
    axios.post(applicationContextPath+'/getChannelWiseAlert?'+param,null,{headers})
  .then(response => {
    document.getElementById("loader-wrapper").style.visibility = "hidden";
    console.log(response.data)
    this.setState({getApiData:response.data})
    console.log("data---",this.state.getApiData)
  }
  
  ).catch(error => {
    console.log(error);
  });
  
  } 
  getApiDownloadData=()=>{

    if((this.state.channelwisedata.fromdate===null||this.state.channelwisedata.fromdate===""||this.state.channelwisedata.fromdate===undefined)||
    (this.state.channelwisedata.todate===null||this.state.channelwisedata.todate===""||this.state.channelwisedata.todate===undefined)  
    ){
       Swal.fire("Please Fill the All Details");
     return
    }
    var createA = document.createElement('a');
    createA.setAttribute('href', birtReport+`/aml/channelWiseAlertSummary?bankCode=${localStorage.getItem("bankdata")}&fromDate=${this.state.channelwisedata.fromdate}&toDate=${this.state.channelwisedata.todate}`);
    createA.click()


    var token = localStorage.getItem("tokendata")
 
    const param = new URLSearchParams({
        toDate: this.state.channelwisedata.todate,
        fromDate: this.state.channelwisedata.fromdate,

      })

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token,
      'bankCode': localStorage.getItem("bankdata")
      }

     
      window.Swal({
        title: "Checking...",
        text: "Please wait",   
        imageUrl: "images/page_loader1.gif",
        showConfirmButton: false,
        allowOutsideClick: false, 
        // onOpen:()=>{
        //   swal.showLoading();
        // }  
      });
      setTimeout(() => {
        window.Swal({
          title: "Finished!",
          type: 'success',
          showConfirmButton: false,
          timer: 1000,
          
        });
      }, 1000);
    document.getElementById("loader-wrapper").style.visibility = "visible"; 
    axios.post(applicationContextPath+'/getChannelWiseAlert?'+param,null,{headers})
  .then(response => {
    document.getElementById("loader-wrapper").style.visibility = "hidden";
    console.log(response.data)
    this.setState({getApiData:response.data})
    console.log("data---",this.state.getApiData)
  }
  
  ).catch(error => {
    console.log(error);
  });
  
  } 

  handleChange= (e)=> {  
    var channelwisedata1 = this.state.channelwisedata
    channelwisedata1[e.target.id] = e.target.value
    this.setState({channelwisedata:channelwisedata1});  
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
                      <h1 style={{fontSize: '22px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid #e9ecef'}}>Channel Wise Alert Summary</h1>
                      <div className="container-fluid">
                        <div className="row bg-blue  has-shadow mt-3" style={{borderRadius: '1rem', background: '#c9ccdf'}}>
                          <div className="col-12 col-md-2 col-lg-2 rightCol">
                            <p  style={{color:"white",fontWeight:"bolder",fontSize:"15px"}}>From Date  <span style={{ color: "red" }}>*</span></p>
                            {/* <p style={{marginTop: '2.5rem',fontWeight:"bolder",fontSize:"15px"}}> State Code</p> */}
                           
                          </div>
                          <div className="col-12 col-md-4" >
                        <div className="form-group">
                        <input className="form-control" id="fromdate" type="date" onChange={this.handleChange}
                                                   value={this.state.channelwisedata.fromdate != "" ? this.state.channelwisedata.fromdate : ""}                                                   />

                        </div>
                      </div>
                          <div className="col-11  col-lg-2 rightCol">
                            <p style={{color:"white",fontWeight:"bolder",fontSize:"15px"}} className="">To Date<span style={{ color: "red" }}>*</span></p>
    
                           
                            
                          </div>
                          <div className="col-12 col-md-4" >
                          <div className="form-group">
                          <input className="form-control"  id="todate" type="date"
                           value={this.state.channelwisedata.todate != "" ? this.state.channelwisedata.todate : ""}
                            onChange={this.handleChange} />

                        </div>
                           
                           
                           
                          
                          </div>
                          
                          </div>
                          <div className="row has-shadow mt-3" style={{ borderRadius: '1rem', width: '94%', backgroundColor: 'white', marginTop: '5rem', marginLeft: '29px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <button type="button" id="Reset" style={{ borderColor: '#303974', backgroundColor: '#303974', fontSize: '15px',marginLeft :'70%' }} onClick={() => this.getApiData()} className="btn btn-primary">View</button>
    <button type="button" id="Download" style={{ borderColor: '#303974', backgroundColor: '#303974', fontSize: '15px' }} onClick={() => this.getApiDownloadData()} className="btn btn-primary">Download</button>
</div>
                      </div>
                    </div>
                  </section>
                 <div style={{
                    marginTop: "20px",

                  }}>
                  <BootstrapTable style={{
                    marginTop:"20",
                  width: "500%",
                  
                   
                }}
                  data={this.state.getApiData}
                  pagination={true}
                // search
                // ClearSearchButton
                // exportCSV
                >
                  <TableHeaderColumn dataFormat={this.caseId} dataField="Customer Id" csvHeader="First Name" isKey={true} className={"columnHeaderColor"}
                    expandable={false} editable={false} width="35px">Channel Name</TableHeaderColumn>

                  <TableHeaderColumn dataFormat={this.reportedDate} dataField="createdDate" csvHeader="First Name" className={"columnHeaderColor"}
                    expandable={false} editable={false} width="30px">Alert Id</TableHeaderColumn>

                  <TableHeaderColumn dataFormat={this.reportedBy} dataField="reportedBy" csvHeader="First Name" className={"columnHeaderColor"}
                    expandable={false} editable={false} width="55px">Description</TableHeaderColumn>

                  <TableHeaderColumn dataFormat={this.caseSeverity} dataField="caseSeverity" csvHeader="First Name" className={"columnHeaderColor"}
                    expandable={false} editable={false} width="23px">Count</TableHeaderColumn>

                  <TableHeaderColumn dataFormat={this.analysis} dataField="comments" csvHeader="First Name" className={"columnHeaderColor"}
                    expandable={false} editable={false} width="80px">Amount</TableHeaderColumn>

                  {/* <TableHeaderColumn dataFormat={this.status} dataField="caseStatus" csvHeader="First Name" className={"columnHeaderColor"}
                                        expandable={false}  editable={false} width="50px">Case status</TableHeaderColumn> */}

                  {/* <TableHeaderColumn  dataField="Role-Name" csvHeader="First Name" className={"columnHeaderColor"}
                                        expandable={false}  editable={false} width="10px"></TableHeaderColumn> */}

                </BootstrapTable>
                </div>

                  
                </div>
               
              </div>
            </section>
          </section>
          </React.Fragment>

    
        )
    }
}

export default Channel_wise_alert

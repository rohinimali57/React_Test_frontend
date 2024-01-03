import React, { Component } from 'react'
import {applicationContextPath, birtReport} from '../common/api'
import Universal from '../common/universal'
import Swal from 'sweetalert2'
import { TableHeaderColumn } from 'react-bootstrap-table'
import { BootstrapTable } from 'react-bootstrap-table'

class Team_performance_report extends Component {
    constructor(props){
        super(props)

        this.state={
         getApiData:[],
         getApiDownloadData:[],
         teamperformancedata:{
            "fromdate":"",
            "todate":"",
          },
        }        
  }
  
  getApiData=()=>{
      debugger
    if((this.state.teamperformancedata.fromdate===null||this.state.teamperformancedata.fromdate===""||this.state.teamperformancedata.fromdate===undefined)||
    (this.state.teamperformancedata.todate===null||this.state.teamperformancedata.todate===""||this.state.teamperformancedata.todate===undefined)  
    ){
       Swal.fire("Please Fill the All Details");
     return
    }
    var createA = document.createElement('a');
    createA.setAttribute('href', birtReport+`/aml/teamPerformance?bankCode=${localStorage.getItem("bankdata")}&fromdate=${this.state.teamperformancedata.fromdate}&todate=${this.state.teamperformancedata.todate}`);
    createA.click()


    var token = localStorage.getItem("tokendata")
 
    const param = new URLSearchParams({
        toDate: this.state.teamperformancedata.todate,
        fromDate: this.state.teamperformancedata.fromdate,

      })

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token,
      'bankCode': localStorage.getItem("bankdata")
      }
      window.swal({
        title: "Checking...",
        text: "Please wait",   
        imageUrl: "images/page_loader1.gif",
        showConfirmButton: false,
        allowOutsideClick: false, 
       
      });
      setTimeout(() => {
        window.swal({
          title: "Finished!",
          type: 'success',
          showConfirmButton: false,
          timer: 1000,
          
        });
      }, 1000);
   
} 
getApiDownloadData=()=>{
  debugger
if((this.state.teamperformancedata.fromdate===null||this.state.teamperformancedata.fromdate===""||this.state.teamperformancedata.fromdate===undefined)||
(this.state.teamperformancedata.todate===null||this.state.teamperformancedata.todate===""||this.state.teamperformancedata.todate===undefined)  
){
   Swal.fire("Please Fill the All Details");
 return
}
var createA = document.createElement('a');
createA.setAttribute('href', birtReport+`/aml/teamPerformance?bankCode=${localStorage.getItem("bankdata")}&fromdate=${this.state.teamperformancedata.fromdate}&todate=${this.state.teamperformancedata.todate}`);
createA.click()


var token = localStorage.getItem("tokendata")

const param = new URLSearchParams({
    toDate: this.state.teamperformancedata.todate,
    fromDate: this.state.teamperformancedata.fromdate,

  })

const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer '+token,
  'bankCode': localStorage.getItem("bankdata")
  }
  window.swal({
    title: "Checking...",
    text: "Please wait",   
    imageUrl: "images/page_loader1.gif",
    showConfirmButton: false,
    allowOutsideClick: false, 
   
  });
  setTimeout(() => {
    window.swal({
      title: "Finished!",
      type: 'success',
      showConfirmButton: false,
      timer: 1000,
      
    });
  }, 1000);

} 

handleChange= (e)=> {  
    var teamperformancedata1 = this.state.teamperformancedata
    teamperformancedata1[e.target.id] = e.target.value
    this.setState({teamperformancedata:teamperformancedata1});  
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
                      <h1 style={{fontSize: '22px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid #e9ecef'}}>Team Perfromance Report</h1>
                      <div className="container-fluid">
                        <div className="row bg-blue has-shadow mt-3" style={{borderRadius: '1rem', background: '#c9ccdf'}}>
                          <div className="col-12 col-md-2 col-lg-2 rightCol">
                            <p  style={{color:"white",fontWeight:"bolder",fontSize:"15px"}}>From Date  <span style={{ color: "red" }}>*</span></p>
                            {/* <p style={{marginTop: '2.5rem',fontWeight:"bolder",fontSize:"15px"}}> State Code</p> */}
                           
                          </div>
                          <div className="col-12 col-md-4" >
                        <div className="form-group">
                        <input className="form-control" id="fromdate" type="date" onChange={this.handleChange}
                                                   value={this.state.teamperformancedata.fromdate != "" ? this.state.teamperformancedata.fromdate : ""}                                                   />

                        </div>
                      </div>
                          <div className="col-11  col-lg-2 rightCol">
                            <p style={{color:"white",fontWeight:"bolder",fontSize:"15px"}} className="">To Date<span style={{ color: "red" }}>*</span></p>
    
                           
                            
                          </div>
                          <div className="col-12 col-md-4" >
                          <div className="form-group">
                          <input className="form-control" id="todate" type="date"
                           value={this.state.teamperformancedata.todate != "" ? this.state.teamperformancedata.todate : ""}
                            onChange={this.handleChange} />

                        </div>
                           
                           
                           
                           
                          </div>
                        </div>
                      </div>
                      <div className="row has-shadow mt-3" style={{ borderRadius: '1rem', width: '94%', backgroundColor: 'white', marginTop: '5rem', marginLeft: '29px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <button type="button" id="Reset" style={{ borderColor: '#303974', backgroundColor: '#303974', fontSize: '15px',marginLeft :'70%' }} onClick={() => this.getApiData()} className="btn btn-primary">View</button>
    <button type="button" id="Download" style={{ borderColor: '#303974', backgroundColor: '#303974', fontSize: '15px' }} onClick={() => this.getApiDownloadData()} className="btn btn-primary">Download</button>
</div>
                                        <div style={{
                                   marginTop: "20px",
                                  //  marginRight :"-250px"

                  }}>

                    <BootstrapTable striped hover
                      data={this.state.getApiData}
                      pagination={ true }
                    
                      // search
                      ClearSearchButton
                    // exportCSV

                    >
                      <TableHeaderColumn dataField="id" csvHeader="First Name" isKey={true} className={"columnHeaderColor"}
                        expandable={false} editable={false} width="30px"> Staff Id</TableHeaderColumn>

                      <TableHeaderColumn dataFormat={this.description} dataField="scenarioDescription" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                        expandable={false} editable={false} width="70px"> Staff Name</TableHeaderColumn>

                      <TableHeaderColumn dataField="type" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                        expandable={false} editable={false} width="70px"> Alerts Assigned </TableHeaderColumn>

                      <TableHeaderColumn dataField="customer" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                        expandable={false} editable={false} width="70px"> False Positive</TableHeaderColumn>

                      <TableHeaderColumn dataField="sevrity" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                        expandable={false} editable={false} width="70px"> Alerts Confirmed </TableHeaderColumn>

                      <TableHeaderColumn dataField="status" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                        expandable={false} editable={false} width="70px">Average Time (Hours)</TableHeaderColumn>


                      {/* <TableHeaderColumn dataFormat={this.action}  dataField="Edit" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                                     expandable={false} editable={false} width="25px">Action</TableHeaderColumn> */}
                    </BootstrapTable>

                  </div>
                    </div>
                  </section>
                  
                </div>
               
              </div>
            </section>
          </section>
          </React.Fragment>
        )
    }
}

export default Team_performance_report

import React, { Component } from 'react'
import Universal from '../common/universal'
import {applicationContextPath, birtReport} from '../common/api'
import axios from 'axios'
import Swal from 'sweetalert2'
import { connect } from 'react-redux'
import {handlegetCustomerRisk,handlegetRiskSearch} from '../actions/customerRisk'
import { TableHeaderColumn } from 'react-bootstrap-table'
import { BootstrapTable } from 'react-bootstrap-table'
class customer_risk_movement extends Component {
    constructor(props){
        super(props)
  
        this.state={
          getApiData:[],
          getApiDownloadData:[],
         searchbutton:true,
         fromDate:"",
         toDate:"",
         custCode:"",
         customerList:[]
        }
  }
  getApiData = () => {
    debugger
    if ((this.state.caseListingData.fromdate === null || this.state.caseListingData.fromdate === "" || this.state.caseListingData.fromdate === undefined) ||
      (this.state.caseListingData.todate === null || this.state.caseListingData.todate === "" || this.state.caseListingData.todate === undefined) ||
      (this.state.caseListingData.alerttype === null || this.state.caseListingData.alerttype === "" || this.state.caseListingData.alerttype === undefined)
    ) {
      Swal.fire("Please Fill the All Details");
      return
    }
    var createA = document.createElement('a');
    createA.setAttribute('href', birtReport + `/aml/caseList?bankCode=${localStorage.getItem("bankdata")}&alertType=${this.state.caseListingData.alerttype}&fromDate=${this.state.caseListingData.fromdate}&toDate=${this.state.caseListingData.todate}`);
    createA.click()

    var token = localStorage.getItem("tokendata")

    const param = new URLSearchParams({
      toDate: this.state.caseListingData.todate,
      fromDate: this.state.caseListingData.fromdate,
      alertType: this.state.caseListingData.alerttype

    })

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
      'bankCode': localStorage.getItem("bankdata")
    }
    Swal({
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
      Swal({
        title: "Finished!",
        type: 'success',
        showConfirmButton: false,
        timer: 1000,

      });
    }, 1000);
    // document.getElementById("loader-wrapper").style.visibility = "visible";
    axios.post(applicationContextPath + `/getCaseList?` + param, null, { headers })
      .then(response => {
        // document.getElementById("loader-wrapper").style.visibility = "hidden";
        console.log(response.data)
        this.setState({ getApiData: response.data })
        console.log("data---", this.state.getApiData)
      }

      ).catch(error => {
        console.log(error);
      });
  }
  getApiDownloadData = () => {
    debugger
    if ((this.state.caseListingData.fromdate === null || this.state.caseListingData.fromdate === "" || this.state.caseListingData.fromdate === undefined) ||
      (this.state.caseListingData.todate === null || this.state.caseListingData.todate === "" || this.state.caseListingData.todate === undefined) ||
      (this.state.caseListingData.alerttype === null || this.state.caseListingData.alerttype === "" || this.state.caseListingData.alerttype === undefined)
    ) {
      Swal.fire("Please Fill the All Details");
      return
    }
    var createA = document.createElement('a');
    createA.setAttribute('href', birtReport + `/aml/caseList?bankCode=${localStorage.getItem("bankdata")}&alertType=${this.state.caseListingData.alerttype}&fromDate=${this.state.caseListingData.fromdate}&toDate=${this.state.caseListingData.todate}`);
    createA.click()

    var token = localStorage.getItem("tokendata")

    const param = new URLSearchParams({
      toDate: this.state.caseListingData.todate,
      fromDate: this.state.caseListingData.fromdate,
      alertType: this.state.caseListingData.alerttype

    })

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
      'bankCode': localStorage.getItem("bankdata")
    }
    Swal({
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
      Swal({
        title: "Finished!",
        type: 'success',
        showConfirmButton: false,
        timer: 1000,

      });
    }, 1000);
    // document.getElementById("loader-wrapper").style.visibility = "visible";
    axios.post(applicationContextPath + `/getCaseList?` + param, null, { headers })
      .then(response => {
        // document.getElementById("loader-wrapper").style.visibility = "hidden";
        console.log(response.data)
        this.setState({ getApiData: response.data })
        console.log("data---", this.state.getApiData)
      }

      ).catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    debugger
    this.getCustomerList()
  }
  
  getCustomerList=()=>{
    var token = localStorage.getItem("tokendata")

    var data={}
    data.bankCode = localStorage.getItem("bankdata")

       const headers = {
         'Content-Type': 'application/json',
         'Authorization': 'Bearer '+token,
         }
     axios.post(applicationContextPath+`/getCustomerList`,data,{headers})
    .then(response => {
      this.setState({customerList:response.data})
    }
    ).catch(error => {
     console.log(error);
    });  
  }

  getCustRiskMovement=()=>{
    debugger
    if((this.state.fromDate===null||this.state.fromDate===""||this.state.fromDate===undefined)||
    (this.state.toDate===null||this.state.toDate===""||this.state.toDate===undefined) ||
    (this.state.custCode===null||this.state.custCode===""||this.state.custCode===undefined)   
    ){
       Swal.fire("Please Fill the All Details");
     return
    }
    var createA = document.createElement('a');
    createA.setAttribute('href', birtReport+`/aml/custRiskMovement?bankCode=${localStorage.getItem("bankdata")}&custCode=${this.state.custCode}&fromDate=${this.state.fromDate}&toDate=${this.state.toDate}`);
    createA.click()
  
}

getRiskMaster = ()  => {
    debugger
    var stateData = this.state.botapidata;
    var fromDate = "2020-10-21"
    var toDate = "2020-12-24"
    var custCode = "C00104"
   
    var token = (localStorage.getItem("tokendata"))
  
    const headers = {
    //   'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token,
      // 'bankCode': bankcode,
      // 'branchcode': 'A1000-01',
      // 'currentdate': "2020/09/04",
      // 'defaultlang': 'Eng',
      // 'currancy': 'INR',
      // 'userid': '101'
    }
    window.Swal({
      title: "Checking...",
      text: "Please wait",   
      imageUrl: "images/page_loader1.gif",
      showConfirmButton: false,
      allowOutsideClick: false, 
   
    });
    setTimeout(() => {
      window.Swal({
        title: "Finished!",
        type: 'success',
        showConfirmButton: false,
        timer: 1000,
        
      });
    }, 1000);
    this.props.dispatch(handlegetRiskSearch(fromDate,toDate,custCode,headers));
  
  }

  
    render() {
        let optionTemplate = this.state.customerList.length>0? this.state.customerList.map(value => (
            <option value={value.custCode}>{value.custCode}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{value.customerName}</option>
          )):[];
        return (
            <React.Fragment>
            <Universal/> 
            <section id="main-content">
            <section className="wrapper">
              <div className="row">
                <div className="col-lg-9 main-chart">
                  <section className="dashboard-counts no-padding-bottom">
                   
                  <div className="container-fluid" style={{marginTop: '-1rem'}}>
                  <h1 style={{fontSize: '22px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid #e9ecef'}}>Customer Risk Movement </h1>
                  <div className="container-fluid">
                        <div className="row bg-blue  has-shadow mt-3" style={{borderRadius: '1rem', background: '#c9ccdf'}}>
                          <div className="col-12 col-md-2 col-lg-2 rightCol">
                            <p  style={{color:"white",fontWeight:"bolder",fontSize:"15px"}}>From Date <span style={{ color: "red" }}>*</span></p>
                            {/* <p style={{marginTop: '2.5rem',fontWeight:"bolder",fontSize:"15px"}}> State Code</p> */}
                           
                          </div>
                          <div className="col-12 col-md-4">
                          <div className="form-group">
                        <input className="form-control" id="fromDate" type="date" onChange={(e)=>this.setState({fromDate:e.target.value})} 
                            value={this.state.fromDate}
                                                />
                        </div>
                      </div>
                          <div className="col-11  col-lg-2 rightCol">
                          <p style={{color:"white",fontWeight:"bolder",fontSize:"15px"}} className="">To Date <span style={{ color: "red" }}>*</span></p>
    
                           
                            
                          </div>
                          <div className="col-12 col-md-4">
                          <div className="form-group">
                        <input className="form-control" id="toDate" type="date" onChange={(e)=>this.setState({toDate:e.target.value})} 
                                value={this.state.toDate}
                                                />
                        </div>
                           
                           
                           
                          
                          </div>
                          <div className="col-12 col-md-2 col-lg-2 rightCol">
                            <p style={{marginTop: '1rem',color:"white",fontWeight:"bolder",fontSize:"15px"}}> Customer ID <span style={{ color: "red" }}>*</span></p>
                            {/* <p style={{marginTop: '2.5rem',fontWeight:"bolder",fontSize:"15px"}}> State Code</p> */}
                           
                          </div>
                          <div className="col-12 col-md-4" >
                          <div className="form-group" style={{marginTop: '1rem'}}>
                        <select  id="custCode" title="Customer Id" onChange={(e)=>this.setState({custCode:e.target.value})}  className="form-select form-select-sm minimal heightForm"  style={{width: '100%',height:"auto"}}
                      value={this.state.custCode !== "" ? this.state.custCode : ""}>
                      <option value="">Select Customer ID</option>
                      {optionTemplate}
                    </select>
                        </div>
                      </div>



                        </div>
                        <div className="row has-shadow mt-3" style={{ borderRadius: '1rem', width: '94%', backgroundColor: 'white', marginTop: '5rem', marginLeft: '29px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <button type="button" id="Reset" style={{ borderColor: '#303974', backgroundColor: '#303974', fontSize: '15px',marginLeft :'70%' }} onClick={() => this.getApiData()} className="btn btn-primary">View</button>
    <button type="button" id="Download" style={{ borderColor: '#303974', backgroundColor: '#303974', fontSize: '15px' }} onClick={() => this.getApiDownloadData()} className="btn btn-primary">Download</button>
</div>

                      </div>













                  {/* <div className="container-fluid">
                    <div className="row  has-shadow mt-3" style={{borderRadius: '1rem', background: '#c9ccdf'}}>
                      <div className="col-12 col-md-2 col-lg-2 rightCol">
                        <p  style={{marginTop: '2.2rem',fontWeight:"bolder",fontSize:"15px"}}>From Date <span style={{ color: "red" }}>*</span></p>
                        <p style={{marginTop: '2.5rem',fontWeight:"bolder",fontSize:"15px"}}> Customer ID <span style={{ color: "red" }}>*</span></p>
                       
                      </div>
                      <div className="col-12 col-md-4" style={{marginTop: '2rem'}}>
                        <div className="form-group">
                        <input className="form-control" id="fromDate" type="date" onChange={(e)=>this.setState({fromDate:e.target.value})} 
                            value={this.state.fromDate}
                                                />
                        </div>
                        <div className="form-group" style={{marginTop: '2rem'}}>
                        <select  id="custCode" title="Customer Id" onChange={(e)=>this.setState({custCode:e.target.value})}  className="form-select form-select-sm minimal heightForm"  style={{width: '100%',height:"auto"}}
                      value={this.state.custCode !== "" ? this.state.custCode : ""}>
                      <option value="">Select Customer ID</option>
                      {optionTemplate}
                    </select>
                        </div>
                       
                      </div>
                      <div className="col-11  col-lg-2 rightCol">
                        <p style={{marginTop: '1.8rem',fontWeight:"bolder",fontSize:"15px"}} className="">To Date <span style={{ color: "red" }}>*</span></p>
                       
                        
                      </div>
                      <div className="col-12 col-md-4" style={{marginTop: '2rem'}}>
                        <div className="form-group">
                        <input className="form-control" id="toDate" type="date" onChange={(e)=>this.setState({toDate:e.target.value})} 
                                value={this.state.toDate}
                                                />
                        </div>
                       
                  
                      </div>
                    </div>
                    // <div className="row has-shadow mt-3" style={{borderRadius: '1rem', backgroundColor: 'white', marginTop: '5rem',marginLeft: '1px'}}>
                    //     <button type="button" className="btn btn-primary" style={{borderColor: '#303974', backgroundColor: '#303974', fontSize: '15px'}} id="save" onClick={() => this.getCustRiskMovement()}>Download File</button>
                     
                    //                     </div>
                  </div> */}
                </div>
                  </section>

                  <div
                    style={{
                      marginTop :"20px"}}>
                <BootstrapTable
                  data={this.state.getApiData}
                  pagination={ true }

                // search
                // ClearSearchButton
                // exportCSV
                >
                  <TableHeaderColumn dataFormat={this.caseId} dataField="Customer Id" csvHeader="First Name" isKey={true} className={"columnHeaderColor"}
                    expandable={false} editable={false} width="25px">Sr.No</TableHeaderColumn>

                  <TableHeaderColumn dataFormat={this.reportedDate} dataField="createdDate" csvHeader="First Name" className={"columnHeaderColor"}
                    expandable={false} editable={false} width="65px">Date</TableHeaderColumn>

                  <TableHeaderColumn dataFormat={this.reportedBy} dataField="reportedBy" csvHeader="First Name" className={"columnHeaderColor"}
                    expandable={false} editable={false} width="65px">Risk Rating</TableHeaderColumn>
{/* 
                  <TableHeaderColumn dataFormat={this.caseSeverity} dataField="caseSeverity" csvHeader="First Name" className={"columnHeaderColor"}
                    expandable={false} editable={false} width="40px">Marked By</TableHeaderColumn> */}
{/* 
                  <TableHeaderColumn dataFormat={this.analysis} dataField="comments" csvHeader="First Name" className={"columnHeaderColor"}
                    expandable={false} editable={false} width="80px">Reason</TableHeaderColumn> */}

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

const mapStateToProps = (state) => {
    debugger
    var customerRisk = state.customerrisk.customerRisk !=undefined ? state.customerrisk.customerRisk:[]
    // var customerriskList = state.customerrisk.customersRiskScoreLists

 
   return {
      customerlists:customerRisk,
      // customerRiskScorelists:customerriskList,

   }
 }
 export default connect(mapStateToProps)(customer_risk_movement)
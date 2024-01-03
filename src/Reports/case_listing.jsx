import React, { Component } from 'react'
import Universal from '../common/universal'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import axios from 'axios'
import { applicationContextPath, birtReport } from '../api/api'
import 'react-s-alert/dist/s-alert-default.css';
import Swal from 'sweetalert2'


class case_listing extends Component {
  constructor(props) {
    super(props)

    this.state = {
      getApiData: [],
      getApiDownloadData:[],
      caseListingData: {
        "fromdate": "",
        "todate": "",
        "alerttype": "",

      },
    }
  }

  //   componentDidMount() {
  //     this.getApiData();
  //   }

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



  handleChange = (e) => {
    var caseListingData1 = this.state.caseListingData
    caseListingData1[e.target.id] = e.target.value
    this.setState({ caseListingData: caseListingData1 });
  }

  render() {
    console.log("caseListingData", this.state.caseListingData)



    return (
      <React.Fragment>
        {/* <div id="loader-wrapper">
                    <div id="loader"></div>
                </div> */}
        <Universal />
        <section id="main-content">
          <section className="wrapper">
            <div className="row">
              <div className="col-lg-9 main-chart">
                <section className="dashboard-counts no-padding-bottom">

                  <div className="container-fluid" style={{ marginTop: '-1rem' }}>
                    <h1 style={{ fontSize: '22px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid #e9ecef' }}>Case Listing</h1>
                    <div className="container-fluid">
                      <div className="row bg-blue has-shadow mt-3" style={{ borderRadius: '1rem' }}>
                        <div className="col-12 col-md-2 col-lg-2 rightCol">
                          <p style={{ color: "white", fontWeight: "bolder", fontSize: "15px" }}>From Date <span style={{ color: "red" }}>*</span></p>
                        </div>
                        <div className="col-12 col-md-4" >
                          <div className="form-group">
                            <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }}
                              id="fromdate" type="date" onChange={this.handleChange} />
                          </div>
                        </div>

                        <div className="col-11  col-lg-2 rightCol">
                          <p style={{ color: "white", fontWeight: "bolder", fontSize: "15px" }} className="">To Date <span style={{ color: "red" }}>*</span></p>
                        </div>
                        <div className="col-12 col-md-4" >
                          <div className="form-group">
                            <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }}
                              id="todate" type="date" onChange={this.handleChange} />
                          </div>
                        </div>


                        <div className="col-11  col-lg-2 rightCol">
                          <p style={{ marginTop: '1rem', color: "white", fontWeight: "bolder", fontSize: "15px" }} className="">Alert Type <span style={{ color: "red" }}>*</span></p>
                        </div>
                        <div className="col-12 col-md-4" >
                          <div className="form-group" style={{ marginTop: '1rem' }}>
                            <select className="form-control select2" className="form-select form-select-sm minimal heightForm" style={{ width: '100%', height: "auto" }} id="alerttype" onChange={this.handleChange}
                              value={this.state.caseListingData.alerttype != "" ? this.state.caseListingData.alerttype : ""}>
                              <option value="">--Select--</option>
                              <option value="VRV">VRV</option>
                              <option value="SDN">SDN</option>
                              <option value="SWIFT">Swift</option>
                              <option value="De-dup">De-dup</option>
                              <option value="Manual">Manual</option>
                            </select>
                          </div>
                        </div>
                        <div>
                        </div>
                      </div>
                      <div className="row has-shadow mt-3" style={{ borderRadius: '1rem', width: '94%', backgroundColor: 'white', marginTop: '5rem', marginLeft: '29px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <button type="button" id="Reset" style={{ borderColor: '#303974', backgroundColor: '#303974', fontSize: '15px', marginLeft: '70%' }} onClick={() => this.getApiData()} className="btn btn-primary">View</button>
                        <button type="button" id="Download" style={{ borderColor: '#303974', backgroundColor: '#303974', fontSize: '15px' }} onClick={() => this.getApiDownloadData()} className="btn btn-primary">Download</button>
                      </div>
                    </div>
                  </div>

                </section>

                <section className="content">
                  <div className="row">
                    <div className="col-xs-12">
                      <div className="box">
                        <div className="box-body  no-LR-padding expandcontentscell bs-table-actionButton">
                          <h4 class="thick" style={{ color: 'black' }}></h4>
                          <section>
                            <div style={{
                              marginTop: "20px",
                              marginLeft: "48px"
                            }}>
                              <BootstrapTable
                                data={this.state.getApiData}
                                pagination={true}

                              // search
                              // ClearSearchButton
                              // exportCSV
                              >
                                <TableHeaderColumn dataFormat={this.caseId} dataField="caseID" csvHeader="First Name" isKey={true} className={"columnHeaderColor"}
                                  expandable={false} editable={false} width="50px">Case Id</TableHeaderColumn>

                                <TableHeaderColumn dataFormat={this.reportedDate} dataField="createdDate" csvHeader="First Name" className={"columnHeaderColor"}
                                  expandable={false} editable={false} width="50px">Reported Date</TableHeaderColumn>

                                <TableHeaderColumn dataFormat={this.reportedBy} dataField="reportedBy" csvHeader="First Name" className={"columnHeaderColor"}
                                  expandable={false} editable={false} width="80px">Reported By</TableHeaderColumn>

                                <TableHeaderColumn dataFormat={this.caseSeverity} dataField="caseSeverity" csvHeader="First Name" className={"columnHeaderColor"}
                                  expandable={false} editable={false} width="50px">Case Severity</TableHeaderColumn>

                                <TableHeaderColumn dataFormat={this.analysis} dataField="comments" csvHeader="First Name" className={"columnHeaderColor"}
                                  expandable={false} editable={false} width="100px">Analysis</TableHeaderColumn>

                                <TableHeaderColumn dataFormat={this.status} dataField="caseStatus" csvHeader="First Name" className={"columnHeaderColor"}
                                  expandable={false} editable={false} width="100px">Status</TableHeaderColumn>

                                {/* <TableHeaderColumn  dataField="Role-Name" csvHeader="First Name" className={"columnHeaderColor"}
                                        expandable={false}  editable={false} width="10px"></TableHeaderColumn> */}

                              </BootstrapTable>
                            </div>
                          </section>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* /row */}
              </div>

            </div>
            {/* /row */}
          </section>
        </section>
        {<footer />}
      </React.Fragment>
    )
  }
}


export default case_listing

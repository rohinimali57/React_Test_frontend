import React, { Component } from 'react'
import Universal from '../common/universal'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import axios from 'axios'
import { applicationContextPath } from '../common/api'
import Swal from 'sweetalert2'

class case_search extends Component {
  constructor(props) {
    super(props)

    this.state = {
      getApiData: [],
      caseapidata: {
        "fromdate": "",
        "todate": "",
        "status": null,
        "caseId": null,
        "creatorName": null,
        "customerNumber": null,
        "customerName": null,
        "status": null
      },
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  handleChange1 = () => {
    debugger
    this.setState({
      caseapidata: {
        "fromdate": "",
        "todate": "",
        "status": "",
        "caseId": "",
        "creatorName": "",
        "customerNumber": "",
        "customerName": "",
        "status": "",
      },

    })
  }

  getApiData = () => {
    debugger

    var token = localStorage.getItem("tokendata")

    if (this.state.caseapidata.fromdate > this.state.caseapidata.todate) {
      Swal.fire("Please Enter Valid Date");
      return
    }
    if (this.state.caseapidata.fromdate == null || this.state.caseapidata.fromdate == "" || this.state.caseapidata.fromdate == undefined) {
      Swal.fire("Please Select From Date");
      return
    }

    if (this.state.caseapidata.todate == null || this.state.caseapidata.todate == "" || this.state.caseapidata.todate == undefined) {
      Swal.fire("Please Select To Date");
      return
    }

    const param = new URLSearchParams({
      status: this.state.caseapidata.status,
      customerName: this.state.caseapidata.customerName,
      creatorName: this.state.caseapidata.creatorName,
      fromDate: this.state.caseapidata.fromdate,
      toDate: this.state.caseapidata.todate,
      caseID: this.state.caseapidata.caseId,
      customerNumber: this.state.caseapidata.customerNumber
    })

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
      'bankCode': localStorage.getItem("bankdata")
    }
    axios.post(applicationContextPath + '/searchCase?' + param, null, { headers })
      .then(response => {

        console.log(response.data)
        this.setState({ getApiData: response.data })
        console.log("Case Data", this.state.getApiData)
      }

      ).catch(error => {
        console.log(error);
      });

  }

  fetchData = () => {
    debugger

    var token = localStorage.getItem("tokendata")
    var bankCode = localStorage.getItem("bankdata")

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
      'bankCode': bankCode
    }


    const param = new URLSearchParams({

      toDate: "2023-05-05",
      fromDate: "2019-06-12",
      alertType: "VRV",
      alertSubCode: "SUBALT002",
      customerRisk: "High"

    })



    axios.post(applicationContextPath + `/getDashboardCaseList?` + param, null, { headers })

      .then(response => {
        console.log(response.data)
        this.setState({ getApiData: response.data })
        if (response.data == null || response.data == "" || response.data == undefined) {
          Swal.fire("No data found")
        }
      }

      ).catch(error => {
        console.log(error);
      });
  }




caseid = (row, cell) => {
  debugger
  return (
    <div style={{ color: "blue" }} onClick={() => this.SaveApiData(row)}>
      {cell.caseID}
    </div>
  )
}

generationDate = (row, cell) => {
  debugger
  // let date = new Date(cell.createdDate)
  let dateParts = cell.createdDate.split("-");
  let year = dateParts[0];
  let month = dateParts[1];
  let day = dateParts[2].split("T");
  let day1 = day[0]
  return (
    <div style={{ color: "blue" }}>
      {year + "/" + month + "/" + day1}
    </div>
  )
}

SaveApiData = (row) => {
  debugger
  var case_id = row
  //  case_id.case_id = row.case_id
  this.props.history.push('/ViewCase', case_id);
}

trasactionRisk1 = (row, cell) => {
  return (

    <React.Fragment>
      {/* <i class="fa fa-square" aria-hidden="true"   style={{ fontSize:'16px',color: 'red',cursor:'pointer',width:'20px',height:'10px'}}  ></i> */}
      <button type="button" style={{ backgroundColor: 'red', height: '30px', width: "80px" }} disabled>HIGH</button>
    </React.Fragment>

  )
}

handleChange = (e) => {
  var caseapidata1 = this.state.caseapidata
  caseapidata1[e.target.id] = e.target.value
  this.setState({ caseapidata: caseapidata1 });
}

render() {
  return (
    <React.Fragment>
      <div>
        <Universal />
        <section id="main-content">
          <section className="wrapper">
            <div class="container">
              <div className="row">
                <div className="col-lg-12 main-chart">
                  <section className="dashboard-counts no-padding-bottom">
                    <div className="container-fluid" style={{ marginTop: '-1rem' }}>
                      <h1 style={{ fontSize: '22px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid #e9ecef' }}>Case Details Search</h1>
                      <div className="container-fluid">
                        <div className="row bg-blue has-shadow mt-3" style={{ borderRadius: '1rem' }}>
                          <div className="col-12 col-md-4 col-lg-4 rightCol" style={{ marginTop: '-1rem' }}>
                            <p style={{ marginTop: '2rem', color: "white", fontWeight: "bolder", fontSize: "15px" }}>Generation Date &nbsp;</p>
                            <p style={{ marginTop: '1.5rem', color: "white", fontWeight: "bolder", fontSize: "15px" }}>Case Id &nbsp;</p>
                            <p style={{ marginTop: '1.5rem', color: "white", fontWeight: "bolder", fontSize: "15px" }}>Creator Name &nbsp;</p>
                            <p style={{ marginTop: '1.5rem', color: "white", fontWeight: "bolder", fontSize: "15px" }}>Customer No. &nbsp;</p>
                            <p style={{ marginTop: '1.5rem', color: "white", fontWeight: "bolder", fontSize: "15px" }}>Customer Name &nbsp;</p>
                            <p style={{ marginTop: '1.5rem', color: "white", fontWeight: "bolder", fontSize: "15px" }}>Status &nbsp;</p>

                          </div>
                          <div className="col-10 col-md-7" style={{ marginTop: '1rem' }}>
                            <div className="form-group">
                              <td >
                                <a style={{ marginTop: '2.2rem', color: "white", fontWeight: "bolder", fontSize: "15px" }}>From <span style={{ color: "red" }}>*</span> : </a> <input type="date" name="from" id="fromdate" onChange={this.handleChange} value={this.state.caseapidata.fromdate !== "" ? this.state.caseapidata.fromdate : ""} ></input>
                                <div class="divider" />
                                <a style={{ marginTop: '2.2rem', color: "white", fontWeight: "bolder", fontSize: "15px" }}>To <span style={{ color: "red" }}>*</span> : </a> <input type="date" id="todate" onChange={this.handleChange} value={this.state.caseapidata.todate !== "" ? this.state.caseapidata.todate : ""} name="to"></input>
                              </td>
                              <div className="form-group" style={{ marginTop: '1rem' }}>
                                <input type="text" id="caseId" name="caseId" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }}
                                  onChange={this.handleChange} value={this.state.caseapidata.caseId !== "" ? this.state.caseapidata.caseId : ""}
                                  placeholder="Enter Case Id" />
                              </div>
                              <div className="form-group" style={{ marginTop: '1rem' }}>
                                <input type="text" id="creatorName" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }}
                                  onChange={this.handleChange} value={this.state.caseapidata.creatorName !== "" ? this.state.caseapidata.creatorName : ""}
                                  placeholder="Enter Creator's Name" />
                              </div>
                              <div className="form-group" style={{ marginTop: '1rem' }}>
                                <input type="text" id="customerNumber" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }}
                                  onChange={this.handleChange} value={this.state.caseapidata.customerNumber !== "" ? this.state.caseapidata.customerNumber : ""}
                                  placeholder="Enter Customer No" />
                              </div>
                              <div className="form-group" style={{ marginTop: '1rem' }}>
                                <input type="text" id="customerName" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }}
                                  onChange={this.handleChange} value={this.state.caseapidata.customerName !== "" ? this.state.caseapidata.customerName : ""}
                                  placeholder="Enter Customer Name" />
                              </div>
                              <div className="form-group" style={{ marginTop: '1rem' }}>
                                <select className="form-select form-select-sm minimal heightForm" style={{ width: '100%', height: "30px" }}
                                  onChange={this.handleChange}
                                  title="Status" id="status" value={this.state.caseapidata.status !== "" ? this.state.caseapidata.status : ""} >
                                  <option value="">SELECT</option>
                                  <option value="Created">CREATED</option>
                                  <option value="WIP">WIP</option>
                                  <option value="Reported">REPORTED</option>
                                  <option value="Reject">REJECTED</option>
                                </select>
                              </div>

                            </div>
                            <div class="divider" />
                            <div className="row pull-right" style={{ marginRight: '-7%' }} >


                              <div className="pr-3" >

                                <button type="button" className="btn btn-primary " style={{ float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px' }} onClick={() => this.handleChange1()} >Reset</button>

                              </div>
                              <div className="pr-3" >

                                <button type="button" id="Save" className="btn btn-primary " style={{ float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px' }} onClick={() => this.getApiData()}>Search</button>

                              </div>
                            </div>

                          </div>

                        </div>
                        <div className="row has-shadow mt-3" style={{ borderRadius: '1rem', backgroundColor: 'white', width: '100%', marginLeft: '0%', marginTop: '5rem' }}>
                          <section className="content">
                            <div className="col-xs-12">
                              <div className="box">
                                <div className="box-body  no-LR-padding expandcontentscell">
                                  <BootstrapTable striped hover
                                    data={this.state.getApiData}
                                    pagination={true}
                                    // search
                                    ClearSearchButton
                                  // exportCSV
                                  >
                                    <TableHeaderColumn dataFormat={this.generationDate} dataField="createdDate" csvHeader="First Name" isKey={true} className={"columnHeaderColor"}
                                      expandable={false} editable={false} width="65px">Generation Date</TableHeaderColumn>

                                    <TableHeaderColumn dataFormat={this.caseid} dataField="caseID" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                                      expandable={false} editable={false} width="45px">Case Id</TableHeaderColumn>

                                    <TableHeaderColumn dataField="customerName" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                                      expandable={false} editable={false} width="70px">Customer Name</TableHeaderColumn>

                                    <TableHeaderColumn dataField="custId" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                                      expandable={false} editable={false} width="60px">Customer No.	</TableHeaderColumn>

                                    <TableHeaderColumn dataField="createdBy" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                                      expandable={false} editable={false} width="50px">Created By</TableHeaderColumn>

                                    <TableHeaderColumn dataField="scenarioID" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                                      expandable={false} editable={false} width="50px">Scenario ID </TableHeaderColumn>

                                    <TableHeaderColumn dataField="alertSubTypeCode" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                                      expandable={false} editable={false} width="60px">Alert Scenario</TableHeaderColumn>

                                    <TableHeaderColumn dataFormat={this.trasactionRisk1} dataField="custcategory1" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                                      expandable={false} editable={false} width="70px">Customer Category</TableHeaderColumn>
                                  </BootstrapTable>
                                </div>
                              </div>
                            </div>
                          </section>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>


          </section>
        </section>
      </div>
    </React.Fragment>
  )
}

}
export default case_search

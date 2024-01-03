import React, { Component } from 'react'
import Universal from '../common/universal'
import axios from 'axios'
import { applicationContextPath } from '../common/api'
import Swal from 'sweetalert2'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'


class alert_search extends Component {
  constructor(props) {
    super(props)

    this.state = {
      getApiData: [],
      alertTypeList: [],
      alertSubTypeList: [],
      customerList: [],
      accountList: [],
      alertSearchData: {
        assignedUser: "",
        customerName: "",
        riskSeverity: "",
        alertStatus: "",
        location: "",
        custId: "",
        accountNo: "",
        createdDate: "",
        alertSubTypeCode: "",
        alertCode: ""
      }
    }
  }

  componentDidMount() {
    var token = localStorage.getItem("tokendata")
    var bankCode = localStorage.getItem("bankdata")

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
      'bankCode': bankCode
    }
    axios.get(applicationContextPath + '/getAllAlert', { headers })
      .then(response => {
        console.log(response.data)
        this.setState({ getApiData: response.data })
        console.log("data---", this.state.getApiData)
      }

      ).catch(error => {
        console.log(error);
      });
    this.getAlertType()
    this.getAlertSubType()
    this.getCustomerList()
    this.getAccountNumberByBank()

  }


  handleChange1 = () => {
    debugger
    this.setState({
      alertSearchData: {
        assignedUser: "",
        customerName: "",
        riskSeverity: "",
        alertStatus: "",
        location: "",
        custId: "",
        accountNo: "",
        createdDate: "",
        alertSubTypeCode: "",
        alertCode: ""
      }

    })
  }


  getAlertType = () => {
    var token = localStorage.getItem("tokendata")
    var bankCode = localStorage.getItem("bankdata")

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
      'bankCode': bankCode
    }
    axios.get(applicationContextPath + '/getAlertType', { headers })
      .then(response => {
        this.setState({ alertTypeList: response.data })
      }
      ).catch(error => {
        console.log(error);
      });
  }

  getAlertSubType = () => {
    var token = localStorage.getItem("tokendata")
    var bankCode = localStorage.getItem("bankdata")

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
      'bankCode': bankCode
    }
    axios.get(applicationContextPath + '/getAlertSubType', { headers })
      .then(response => {
        this.setState({ alertSubTypeList: response.data })
      }
      ).catch(error => {
        console.log(error);
      });
  }

  getCustomerList = () => {
    var token = localStorage.getItem("tokendata")

    var data = {}
    data.bankCode = localStorage.getItem("bankdata")

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    }
    axios.post(applicationContextPath + '/getCustomerList', data, { headers })
      .then(response => {
        this.setState({ customerList: response.data })
      }
      ).catch(error => {
        console.log(error);
      });
  }

  getAccountNumberByBank = () => {
    var token = localStorage.getItem("tokendata")
    var bankCode = localStorage.getItem("bankdata")

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
      'bankCode': bankCode
    }
    axios.get(applicationContextPath + '/getAccountNumberByBank', { headers })
      .then(response => {
        this.setState({ accountList: response.data })
      }
      ).catch(error => {
        console.log(error);
      });
  }


  alertSearch = () => {
    debugger
    var data = this.state.alertSearchData;

    var token = localStorage.getItem("tokendata")
    var bankCode = localStorage.getItem("bankdata")

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
      'bankCode': bankCode
    }
    axios.post(applicationContextPath + '/serachAlert', data, { headers })
      .then(response => {
        console.log(response.data)
        this.setState({ getApiData: response.data })
        console.log("data---", this.state.getApiData)
      }

      ).catch(error => {
        console.log(error);
      });

  }

  genaration_date = (row, cell) => {

    let dateParts = cell.createdDate.split("-");
    let year = dateParts[0];
    let month = dateParts[1];
    let day = dateParts[2].split("T");
    let day1 = day[0]
    return (
      <div className='expandcontents'>
        {year + "/" + month + "/" + day1}
      </div>
    )
  }

  actionMethod = (row, cell) => {

    return (
      < React.Fragment>
        <div >
          <i class="fa fa-edit" aria-hidden="true" title="Edit" style={{ color: "blue" }}  ></i>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <i class="fa fa-trash" aria-hidden="true" title="Delete" style={{ color: "red" }}  ></i>
        </div>
      </React.Fragment>
    )
  }

  handleChange = (e) => {
    var alertData = this.state.alertSearchData
    alertData[e.target.id] = e.target.value
    this.setState({ alertSearchData: alertData })
  }

  render() {
    const alertType = this.state.alertTypeList.map((item, index) =>
      <option value={item.alertCode}>{item.alertCode}</option>
    );

    const alertSubType = this.state.alertSubTypeList.map((item, index) =>
      <option value={item.alertSubTypeCode}>{item.alertSubTypeCode}</option>
    );

    const customerList = this.state.customerList.map((item, index) =>
      <option value={item.customerName}>{item.customerName}</option>
    );

    const accountList = this.state.accountList.map((item, index) =>
      <option value={item.acctNo}>{item.acctNo}</option>
    );

    const customerNoList = this.state.accountList.map((item, index) =>
      <option value={item.custCode}>{item.custCode}</option>
    );

    return (
      <React.Fragment>
        <div>
          <Universal />
          <section id="main-content">
            <section className="wrapper">
              <div class="container">
                <div className="row">
                  <div className="col-lg-9 main-chart">
                    <section className="dashboard-counts no-padding-bottom">
                      <div className="container-fluid" style={{ marginTop: '-1rem' }}>
                        <h1 style={{ fontSize: '22px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid #e9ecef' }}>Alert Details Search</h1>
                        <div className="container-fluid">
                          <div className="row bg-blue has-shadow mt-3" style={{ borderRadius: '1rem' }}>
                            <div className="col-12 col-md-4 col-lg-4 rightCol" style={{ marginTop: '-1rem' }}>
                              <p style={{ marginTop: '2.2rem', color: "white", fontWeight: "bolder", fontSize: "15px" }}>Generation Date &nbsp;<span style={{ color: "red" }}>*</span></p>
                              <p style={{ marginTop: '2.2rem', color: "white", fontWeight: "bolder", fontSize: "15px" }}>Alert Id &nbsp;<span style={{ color: "red" }}>*</span></p>
                              <p style={{ marginTop: '2.2rem', color: "white", fontWeight: "bolder", fontSize: "15px" }}>Alert Category &nbsp;<span style={{ color: "red" }}>*</span></p>
                              <p style={{ marginTop: '2.2rem', color: "white", fontWeight: "bolder", fontSize: "15px" }}>Alert Sub Category &nbsp;<span style={{ color: "red" }}>*</span></p>
                              <p style={{ marginTop: '2.2rem', color: "white", fontWeight: "bolder", fontSize: "15px" }}>Customer/Employee No &nbsp;<span style={{ color: "red" }}>*</span></p>
                              <p style={{ marginTop: '2.2rem', color: "white", fontWeight: "bolder", fontSize: "15px" }}>customer/Employee Name &nbsp;<span style={{ color: "red" }}>*</span></p>
                              <p style={{ marginTop: '2.2rem', color: "white", fontWeight: "bolder", fontSize: "15px" }}>Account/Card No &nbsp;<span style={{ color: "red" }}>*</span></p>
                              <p style={{ marginTop: '2.2rem', color: "white", fontWeight: "bolder", fontSize: "15px" }}>Risk Severity &nbsp;<span style={{ color: "red" }}>*</span></p>
                              <p style={{ marginTop: '2.2rem', color: "white", fontWeight: "bolder", fontSize: "15px" }}>Alert Status &nbsp;<span style={{ color: "red" }}>*</span></p>
                              <p style={{ marginTop: '2.2rem', color: "white", fontWeight: "bolder", fontSize: "15px" }}>Assigned User &nbsp;<span style={{ color: "red" }}>*</span></p>
                              <p style={{ marginTop: '2.2rem', color: "white", fontWeight: "bolder", fontSize: "15px" }}>MCC/Location &nbsp;<span style={{ color: "red" }}>*</span></p>

                            </div>
                            <div className="col-10 col-md-7" style={{ marginTop: '1rem' }}>
                              <div className="form-group">
                                <td >
                                  {/* <a style={{marginTop: '2.2rem',fontWeight:"bolder",fontSize:"15px"}}>From <span style={{ color: "red" }}>*</span> : </a> <input type="date" name="from" id="fromdate" onChange={this.handleChange} ></input> */}
                                  <div class="divider" />
                                  <input type="date" id="createdDate" onChange={(e) => this.handleChange(e)} value={this.state.alertSearchData.createdDate} name="to"></input>
                                </td>
                                <div className="form-group" style={{ marginTop: '1.8rem' }}>
                                  <select className="form-select form-select-sm minimal heightForm" style={{ width: '100%', height: "30px" }}
                                    onChange={(e) => this.handleChange(e)}
                                    title="alertId" id="alertId"  >
                                    <option value="">SELECT</option>
                                    <option value="All">All</option>
                                  </select>
                                </div> <div className="form-group" style={{ marginTop: '1.8rem' }}>
                                  <select className="form-select form-select-sm minimal heightForm" style={{ width: '100%', height: "30px" }}
                                    value={this.state.alertSearchData.alertCode}
                                    onChange={(e) => this.handleChange(e)}
                                    title="alertCode" id="alertCode"  >
                                    <option value="">SELECT</option>
                                    {alertType}
                                  </select>
                                </div>
                                <div className="form-group" style={{ marginTop: '1.8rem' }}>
                                  <select className="form-select form-select-sm minimal heightForm" style={{ width: '100%', height: "30px" }}
                                    value={this.state.alertSearchData.alertSubTypeCode}
                                    onChange={(e) => this.handleChange(e)}
                                    title="alertSubTypeCode" id="alertSubTypeCode"  >
                                    <option value="">SELECT</option>
                                    <option value="Created">CREATED</option>

                                    {alertSubType}
                                  </select>
                                </div>
                                <div className="form-group" style={{ marginTop: '1.8rem' }}>
                                  <select className="form-select form-select-sm minimal heightForm" style={{ width: '100%', height: "30px" }}
                                    value={this.state.alertSearchData.custId}
                                    onChange={(e) => this.handleChange(e)}
                                    title="custId" id="custId"  >
                                    <option value="">SELECT</option>
                                    {customerNoList}
                                  </select>
                                </div>
                                <div className="form-group" style={{ marginTop: '1.8rem' }}>
                                  <select className="form-select form-select-sm minimal heightForm" style={{ width: '100%', height: "30px" }}
                                    value={this.state.alertSearchData.customerName}
                                    onChange={(e) => this.handleChange(e)}
                                    title="customerName" id="customerName"  >
                                    <option value="">SELECT</option>
                                    {customerList}
                                  </select>
                                </div>
                                <div className="form-group" style={{ marginTop: '1.8rem' }}>
                                  <select className="form-select form-select-sm minimal heightForm" style={{ width: '100%', height: "30px" }}
                                    value={this.state.alertSearchData.accountNo}
                                    onChange={(e) => this.handleChange(e)}
                                    title="accountNo" id="accountNo"  >
                                    <option value="">SELECT</option>
                                    {accountList}
                                  </select>
                                </div>
                                <div className="form-group" style={{ marginTop: '1.5rem' }}>
                                  <input type="text" id="riskSeverity" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }}
                                    value={this.state.alertSearchData.riskSeverity}
                                    onChange={(e) => this.handleChange(e)}
                                    placeholder="Risk Severity" />
                                </div>
                                <div className="form-group" style={{ marginTop: '1.7rem' }}>
                                  <input type="text" id="alertStatus" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }}
                                    value={this.state.alertSearchData.alertStatus}
                                    onChange={(e) => this.handleChange(e)}
                                    placeholder="Alert Status" />
                                </div>
                                <div className="form-group" style={{ marginTop: '1.7rem' }}>
                                  <input type="text" id="assignedUser" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }}
                                    onChange={(e) => this.handleChange(e)}
                                    value={this.state.alertSearchData.assignedUser}
                                    placeholder="Assigned User" />
                                </div>
                                <div className="form-group" style={{ marginTop: '1.7rem' }}>
                                  <input type="text" id="location" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }}
                                    onChange={(e) => this.handleChange(e)}
                                    value={this.state.alertSearchData.location}
                                    placeholder="Location" />
                                </div>


                              </div>
                              <div class="divider" />
                              <div className="row pull-center" >
                                <div className="pr-3">
                                  <button type="button" id="Reset" className="btn btn-primary " style={{ float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px' }} onClick={() => this.handleChange1()}>Reset</button>
                                </div>
                                <div className="pr-3">

                                  <button type="button" id="Save" className="btn btn-primary " style={{ float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px' }} onClick={() => this.alertSearch()} >Search</button>

                                </div>
                              </div>
                              {/* 
                    <tr style={{textAlign: 'center'}}>
            <td colSpan="2" >
            <button type="button" id="Save" className="btn btn-primary " style={{float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '16px'}}>Reset</button>

            <div class="divider"/>
            <div class="divider"/>

                    <button type="button" id="Save" className="btn btn-primary " style={{float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '16px'}} onClick={()=>this.alertSearch()} >Search</button>
               
            </td>  
        </tr> */}
                            </div>

                          </div>
                          <div className="row has-shadow mt-3" style={{ borderRadius: '1rem', backgroundColor: 'white', width: '150%', marginLeft: '-17%', marginTop: '5rem' }}>
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
                                      <TableHeaderColumn dataField="Sr_no" isKey={true} className={"columnHeaderColor"}
                                        expandable={false} editable={false} width="25px">Sr.no</TableHeaderColumn>

                                      <TableHeaderColumn dataFormat={this.alert_ID} dataField="id" className={"columnHeaderColor"} dataSort={true}
                                        expandable={false} editable={false} width="30px">Alert Id</TableHeaderColumn>

                                      <TableHeaderColumn dataFormat={this.genaration_date} dataField="createdDate" className={"columnHeaderColor"}
                                        expandable={false} editable={false} width="50px">Generation Date</TableHeaderColumn>



                                      <TableHeaderColumn dataField="alertCode" className={"columnHeaderColor"} dataSort={true}
                                        expandable={false} editable={false} width="40px">Alert Type</TableHeaderColumn>

                                      <TableHeaderColumn dataField="alertSubTypeCode" className={"columnHeaderColor"} dataSort={true}
                                        expandable={false} editable={false} width="50px">Alert Description
                                      </TableHeaderColumn>

                                      <TableHeaderColumn dataField="customerName" className={"columnHeaderColor"} dataSort={true}
                                        expandable={false} editable={false} width="60px">Customer ID/Name</TableHeaderColumn>

                                      <TableHeaderColumn dataField="alertStatus" className={"columnHeaderColor"} dataSort={true}
                                        expandable={false} editable={false} width="50px">Alert Status</TableHeaderColumn>

                                      <TableHeaderColumn dataField="assignedUser" className={"columnHeaderColor"} dataSort={true}
                                        expandable={false} editable={false} width="50px">Assigned To</TableHeaderColumn>

                                      <TableHeaderColumn dataFormat={this.actionMethod} dataField="Edit" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                                        expandable={false} editable={false} width="50px">Action</TableHeaderColumn>
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

export default alert_search

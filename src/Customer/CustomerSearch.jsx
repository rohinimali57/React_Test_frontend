import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Universal from '../common/universal'
import Swal from 'sweetalert2'
import { connect } from 'react-redux'
import { handlegetCustomerSearch } from '../actions/customer'
import axios from 'axios';
import { applicationContextPath } from '../common/api';



class CustomerSearch extends Component {
  constructor(props) {
    super(props)

    this.state = {
      getApiData: [],
      searchbutton: true,
      searchdata: {
        "customerType": "",
        "custCode": "",
        "customerName": "",
        "baseBrCode": "",
        "countryOfReg": "",
        "customerCategory": "",
        "nationalId1": "",
        "addr1": "",
        "city": "",
        "postalCode": "",
        "acctNumber": "",
        "mobileNo": "",
        "riskManual": "",
        token: (localStorage.getItem("tokendata")),
        customerlists: []
      },

    }
  }

  handleChange1 = () => {
    debugger
    this.setState({
      searchdata: {
        "customerType": "",
        "custCode": "",
        "customerName": "",
        "baseBrCode": "",
        "countryOfReg": "",
        "customerCategory": "",
        "nationalId1": "",
        "addr1": "",
        "city": "",
        "postalCode": "",
        "acctNumber": "",
        "mobileNo": "",
        "riskManual": "",
      }

    })
  }

  componentDidMount() {
    this.fetchCustomerList();
    // this.FindCustomer();

  }

  FindCustomer = async () => {
    debugger
    var stateData = this.state.searchdata;
    var bankcode = (localStorage.getItem("bankdata"))
    var token = (localStorage.getItem("tokendata"))

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
      'bankCode': bankcode,
      // 'branchcode': 'A1000-01',
      // 'currentdate': "2020/09/04",
      // 'defaultlang': 'Eng',
      // 'currancy': 'INR',
      // 'userid': '101'
    }
    var saveapidata = this.state.searchdata;
    if ((this.state.searchdata.customerType == null || this.state.searchdata.customerType == "" || this.state.searchdata.customerType == undefined) ||
      (this.state.searchdata.custCode == null || this.state.searchdata.custCode == "" || this.state.searchdata.custCode == undefined) ||
      (this.state.searchdata.customerName == null || this.state.searchdata.customerName == "" || this.state.searchdata.customerName == undefined)) {
      Swal.fire("Please Fill the All Mandatory Details");
      return
    }

    // window.swal({
    //   title: "Checking...",
    //   text: "Please wait",   
    //   imageUrl: "images/page_loader1.gif",
    //   showConfirmButton: false,
    //   allowOutsideClick: false, 

    // });
    // setTimeout(() => {
    //   window.Swal({
    //     title: "Finished!",
    //     type: 'success',
    //     showConfirmButton: false,
    //     timer: 1000,

    //   });
    // }, 1000);

    this.props.dispatch(
      (stateData, headers));
    // this.getStateData()
    //  this.setState({
    //    searchdata:{
    //     "customerType":"",
    //     "custCode":"",
    //     "customerName":"",
    //     "baseBrCode":"",
    //     "countryOfReg":"",
    //     "customerCategory":"",
    //     "nationalId1":"",
    //     "addr1":"",
    //     "city":"",
    //     "postalCode":"",
    //     "mobileNo":"",
    //     "riskManual":"",
    //      }
    //  })
  }
  handleChange = (e) => {
    var botapidata1 = this.state.searchdata
    botapidata1[e.target.id] = e.target.value
    this.setState({ searchdata: botapidata1 });
  }

  CellFormatter(cell, row) {
    debugger
    return (
      // <div><a href={"/viewcustomers"}>{cell.custCode}</a></div>
      <div >
        {cell.custCode}
      </div>
    );
  }
  AlertID = (row, cell) => {
    return (
      <div style={{ color: 'blue' }} onClick={() => this.SaveApiData1(row)} >
        <a> {cell.custCode} </a>
      </div>
    )
  }


  // SaveApiData1 = (row) => { 
  //   debugger
  //   let cust_id = row

  //   this.props.history.push('/View_customers');

  // }
  SaveApiData2 = (cell) => {
    debugger
    var customerdetails = {}
    customerdetails.custCode = cell.custCode
    customerdetails.customerFName = cell.customerFName
    customerdetails.customerLName = cell.customerLName
    customerdetails.addr1 = cell.addr1
    customerdetails.addr2 = cell.addr2
    customerdetails.custPAN = cell.custPAN
    customerdetails.custAdhar = cell.custAdhar
    customerdetails.custMobile = cell.custMobile
    customerdetails.custDOB = cell.custDOB

    //console.log("axaaxxx",custCode)
    this.props.history.push('/de_Dup_Process', customerdetails);

  }


  actionMethod = (row, cell) => {

    return (
      < React.Fragment>
        <React.Fragment>
          <button className="btn btn-primary " style={{ borderColor: '#303974', backgroundColor: '#303974', fontSize: '14px' }} onClick={() => this.SaveApiData2(cell)} type="button">Run De-dup</button>

        </React.Fragment>
      </React.Fragment>
    )
  }
  actionMethod1 = (row, cell) => {
    debugger
    return (
      < React.Fragment>

        <a href=""><div onClick={() => this.SaveApiData1(cell)}>{cell.custCode}</div> </a>
      </React.Fragment>
    )
  }

  SaveApiData1 = (cell) => {
    debugger
    var customerdetails = {}
    customerdetails.custCode = cell.custCode
    customerdetails.baseBrCode = cell.baseBrCode
    console.log("FSDFDS==>",customerdetails);
    // this.props.history.push('/View_customers', customerdetails);
    this.props.history.push({
      pathname: '/View_customers',
      state: { customerdetails:cell}
    });

  }

  fetchCustomerList = () => {
    var token = localStorage.getItem("tokendata");
    var data = {};
    data.bankCode = localStorage.getItem("bankdata");

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };

    axios.post(applicationContextPath + '/getCustomerList', data, { headers })
      .then(response => {
        this.setState({ customerlists: response.data }); // Update state with fetched data
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {


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
                    <h1 style={{ fontSize: '22px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid #e9ecef' }}>Customer Search </h1>
                    <div className="container-fluid1">
                      <div className="row  bg-blue  has-shadow mt-3" style={{ borderRadius: '1rem', background: '#c9ccdf' }}>
                        <div className="col-12 col-md-2 col-lg-2 rightCol">
                          <p style={{ fontWeight: "bolder", color: "white", fontSize: "15px" }}> Customer/Employee Type <span style={{ color: "red" }}>*</span></p>
                        </div>
                        <div className="col-12 col-md-4" >
                          <div className="form-group" >
                            <input type="text" id="customerType" placeholder="Customer/Employee Type" className="form-control inputField glowing-border" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }}
                              onChange={this.handleChange} value={this.state.searchdata.customerType !== "" ? this.state.searchdata.customerType : ""} />
                          </div>
                        </div>
                        <div className="col-11  col-lg-2 rightCol">
                          <p style={{ fontWeight: "bolder", color: "white", fontSize: "15px" }} className="">Customer/Employee Code <span style={{ color: "red" }}>*</span></p>
                        </div>
                        <div className="col-12 col-md-4" >
                          <div className="form-group">
                            <input type="text" id="custCode" placeholder="Customer/Employee Code" className="form-control inputField glowing-border" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }}
                              onChange={this.handleChange}
                              value={this.state.searchdata.custCode !== "" ? this.state.searchdata.custCode : ""} />
                          </div>
                        </div>
                        <div className="col-12 col-md-2 col-lg-2 rightCol" >
                          <p style={{ fontWeight: "bolder", color: "white", fontSize: "15px" }}>Customer/Employee Name <span style={{ color: "red" }}>*</span></p>
                        </div>
                        <div className="col-12 col-md-4" >
                          <div className="form-group" >
                            <input type="text" id="customerName" placeholder="Customer/Employee Name" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }}
                              onChange={this.handleChange} value={this.state.searchdata.customerName !== "" ? this.state.searchdata.customerName : ""} />

                          </div>
                        </div>
                        <div className="col-11  col-lg-2 rightCol">
                          <p style={{ fontWeight: "bolder", color: "white", fontSize: "15px" }} className="">Account Number <span style={{ color: "red" }}>*</span></p>
                        </div>
                        <div className="col-12 col-md-4" >
                          <div className="form-group" >
                            <input type="text" id="acctNumber" placeholder="Account Number" className="form-control inputField glowing-border" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }}
                              onChange={this.handleChange} value={this.state.searchdata.acctNumber !== "" ? this.state.searchdata.acctNumber : ""}
                            />
                          </div>
                        </div>

                        <div className="col-12 col-md-2 col-lg-2 rightCol">
                          <p style={{ fontWeight: "bolder", color: "white", fontSize: "15px" }}>Branch Name <span style={{ color: "red" }}>*</span></p>
                        </div>
                        <div className="col-12 col-md-4">
                          <div className="form-group">
                            <input type="text" id="baseBrCode" placeholder="Branch Name" className="form-control inputField glowing-border" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }}
                              onChange={this.handleChange} value={this.state.searchdata.baseBrCode !== "" ? this.state.searchdata.baseBrCode : ""} />
                          </div>
                        </div>

                        <div className="col-12 col-md-2 col-lg-2 rightCol">
                          <p style={{ fontWeight: "bolder", color: "white", fontSize: "15px" }}>Country Of Registration <span style={{ color: "red" }}>*</span></p>
                        </div>
                        <div className="col-12 col-md-4" >
                          <div className="form-group" >
                            <input type="text" id="countryOfReg" placeholder="Country Of Registration" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }}
                              onChange={this.handleChange}
                              value={this.state.searchdata.countryOfReg !== "" ? this.state.searchdata.countryOfReg : ""} />
                          </div>
                        </div>
                        <div className="col-11  col-lg-2 rightCol">
                          <p style={{ fontWeight: "bolder", color: "white", fontSize: "15px" }} className="">Comapany Category<span style={{ color: "red" }}>*</span></p>
                        </div>
                        <div className="col-12 col-md-4" >
                          <div className="form-group">
                            <input type="text" id="customerCategory" placeholder="Company Category" className="form-control inputField glowing-border" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }}
                              onChange={this.handleChange} value={this.state.searchdata.customerCategory !== "" ? this.state.searchdata.customerCategory : ""} />
                          </div>
                        </div>
                        <div className="col-12 col-md-2 col-lg-2 rightCol">
                          <p style={{ fontWeight: "bolder", color: "white", fontSize: "15px" }}>NI Number <span style={{ color: "red" }}>*</span></p>
                        </div>
                        <div className="col-12 col-md-4" >
                          <div className="form-group">
                            <input type="text" id="nationalId1" placeholder="National ID No." className="form-control inputField glowing-border" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }}
                              onChange={this.handleChange}
                              value={this.state.searchdata.nationalId1 !== "" ? this.state.searchdata.nationalId1 : ""} />
                          </div>
                        </div>
                        <div className="col-11  col-lg-2 rightCol">
                          <p style={{ fontWeight: "bolder", color: "white", fontSize: "15px" }} className="">Address Line <span style={{ color: "red" }}>*</span></p>
                        </div>
                        <div className="col-12 col-md-4" >
                          <div className="form-group">
                            <input type="text" id="addr1" placeholder="Address" className="form-control inputField glowing-border" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }}
                              onChange={this.handleChange} value={this.state.searchdata.addr1 !== "" ? this.state.searchdata.addr1 : ""} />
                          </div>

                        </div>
                        <div className="col-12 col-md-2 col-lg-2 rightCol">
                          <p style={{ fontWeight: "bolder", color: "white", fontSize: "15px" }}>City <span style={{ color: "red" }}>*</span></p>
                        </div>
                        <div className="col-12 col-md-4" >
                          <div className="form-group">
                            <select id="city" title="Country" onChange={this.handleChange} className="form-select form-select-sm minimal heightForm" style={{ width: '100%', height: "auto" }}
                              value={this.state.searchdata.city !== "" ? this.state.searchdata.city : ""}>
                              <option value="">Select City</option>
                              <option value="Pune">Pune</option>
                              <option value="Aurangabad">Aurangabad</option>
                              <option value="Nilanga">Nilanga</option>
                              <option value="Kolhapur">Kolhapur</option>
                              <option value="Satara">Satara</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-11  col-lg-2 rightCol">
                          <p style={{ fontWeight: "bolder", color: "white", fontSize: "15px", marginTop: '1rem' }} className="">Pin Code<span style={{ color: "red" }}>*</span></p>
                        </div>
                        <div className="col-12 col-md-4" >
                          <div className="form-group" style={{ marginTop: '1rem' }} >
                            <input type="text" id="postalCode" placeholder="Pin Code" className="form-control inputField glowing-border" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }}
                              inputmode="numeric" maxlength="6" onChange={this.handleChange} value={this.state.searchdata.postalCode !== "" ? this.state.searchdata.postalCode : ""} />
                          </div>

                        </div>
                        <div className="col-12 col-md-2 col-lg-2 rightCol">
                          <p style={{ fontWeight: "bolder", color: "white", fontSize: "14px", marginTop: '1rem' }}>Mobile Number <span style={{ color: "red" }}>*</span></p>
                        </div>
                        <div className="col-12 col-md-4" >
                          <div className="form-group" style={{ marginTop: '1rem' }}>
                            <input type="text" id="mobileNo" placeholder="Enter Mobile No" className="form-control inputField glowing-border" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }}
                              onChange={this.handleChange}
                              value={this.state.searchdata.mobileNo !== "" ? this.state.searchdata.mobileNo : ""} minlength="10" maxlength="10" pattern="[1-9]{1}[0-9]{9}" required />
                          </div>
                        </div>
                        <div className="col-12 col-md-2 col-lg-2 rightCol">
                          <p style={{ fontWeight: "bolder", color: "white", fontSize: "14px", marginTop: '1rem' }}>Risk Category <span style={{ color: "red" }}>*</span></p>
                        </div>
                        <div className="col-12 col-md-4" >
                          <div className="form-group" style={{ marginTop: '1rem' }}>
                            <input type="text" id="riskManual" placeholder="Risk Category" className="form-control inputField glowing-border" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }}
                              onChange={this.handleChange} value={this.state.searchdata.riskManual !== "" ? this.state.searchdata.riskManual : ""} />

                          </div>
                        </div>

                        <div className="row pull-right" style={{ marginLeft: '691px', marginTop: '-1rem' }}>


                          <div className="pr-3" >

                            <button type="button" className="btn btn-primary " style={{ float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px' }} Type="button" id="Reset" onClick={() => this.handleChange1()}
                            >Reset</button>
                          </div>
                          {this.state.searchbutton == true ?
                            <div className="pr-3" >

                              <button type="button" className="btn btn-primary " style={{ float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px' }} Type="button" id="Reset" onClick={() => this.FindCustomer()}
                              >Search</button>
                            </div> : ""}
                        </div>

                        {/* <div className="row pull-center"><div style={{marginLeft:"600px"}}>
    {this.state.searchbutton==true?
  <button type="button" id="search" onClick={()=> this.FindCustomer()}
  className="btn btn-primary " >Search</button>:""}
                                                     <div class="divider"/>
  <button type="button" id="Save" 
  className="btn btn-primary " onClick={() => this.handleChange1()}>Reset</button>
  
   </div>

                                                                </div> */}

                      </div>
                    </div>
                  </div>

                </section>

                {/* /row */}
              </div>

              {/* /col-lg-3 */}
            </div>
            <div class="divider" />


            {/* </div> */}
            {/* light blue box ends */}

            <div >
              {/* <div style={{marginLeft:"500px"}}>
    {this.state.searchbutton==true?
  <button type="button" id="search" onClick={()=> this.FindCustomer()}
  className="btn btn-primary " >Search</button>:""}
                                                     <div class="divider"/>
  <button type="button" id="Save" 
  className="btn btn-primary " onClick={() => this.handleChange1()}>Reset</button>
  
   </div> */}

              {/* <div className=" pull-right">
  <button type="button" id="Save" onClick={() => this.SaveApiData()} 
  className="btn btn-primary ">Add New</button>
  
  </div> */}
            </div>


            {/* --------------------- */}

            <div className="row has-shadow mt-3" style={{ borderRadius: '1rem', width: '73%', marginLeft: '0%', backgroundColor: 'white', marginTop: '5rem' }}>
              <div className="col-xs-12">
                <div className="box">
                  <div className="box-body  no-LR-padding expandcontentscell">
                    <BootstrapTable striped hover
                      data={this.state.customerlists}
                       pagination={true}
                      //  search
                      ClearSearchButton
                    // exportCSV
                    >
                      <TableHeaderColumn dataSort={true} dataFormat={this.actionMethod1} dataField="custCode" isKey={true} className={"columnHeaderColor"}
                        expandable={false} editable={false} width="30px">Customer/Employee ID </TableHeaderColumn>

                      <TableHeaderColumn dataField="customerFName" className={"columnHeaderColor"} dataSort={true}
                        expandable={false} editable={false} width="30px">Customer/Employee Name</TableHeaderColumn>


                      <TableHeaderColumn dataField="baseBrCode" className={"columnHeaderColor"} dataSort={true}
                        expandable={false} editable={false} width="30px">Branch Name</TableHeaderColumn>


                      <TableHeaderColumn dataField="riskManual" className={"columnHeaderColor"} dataSort={true}
                        expandable={false} editable={false} width="30px" >Risk Category</TableHeaderColumn>


                      <TableHeaderColumn className={"columnHeaderColor"} dataSort={true}
                        expandable={false} editable={false} width="30px" dataFormat={this.actionMethod}>Action</TableHeaderColumn>
                    </BootstrapTable>
                  </div>
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
  const { customerList } = state.customerlist
  console.log("customerList", customerList)

  return {
    customerlists: customerList
  }
}
export default connect(mapStateToProps)(CustomerSearch)

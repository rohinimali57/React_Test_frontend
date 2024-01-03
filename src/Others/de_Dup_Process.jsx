import React, { Component } from 'react'
import 'react-tabs/style/react-tabs.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Universal from '../common/universal'
import { connect } from 'react-redux'
import { handleDedupprocess, handleRunDeDup } from '../actions/dedup'
import { handlegetCustomers } from '../actions/customer'


class de_Dup_Process extends Component {
  constructor(props) {
    super(props)

    this.state = {
      list: [],
      lists: [],
      getApiData: [],
      getApiData1: [],
      botapidata: {

        token: (localStorage.getItem("tokendata"))
      },
    }
  }
  componentDidMount() {
    debugger
    let custCodes = this.props.location.state;
    console.log("custCodes", custCodes)
    // var customerdetails = {}

    var custCode = "custCodes.custCode"
    var custFName = "custCodes.customerFName"
    var custLName = "custCodes.customerLName"
    var addr1 = "pimple"
    var addr2 = "Saudagar"
    var custPAN = "ARZPK9995Q"
    var custAdhar = "123456789012"
    var custMobile = "9823033369"
    var custDOB = "1981-06-05"
    var token = (localStorage.getItem("tokendata"))

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,

    }
    //this.props.dispatch(handleDedupprocess(custCode,headers));
    this.props.dispatch(handleDedupprocess(custCode, custFName, custLName, addr1, addr2, custPAN, custAdhar, custMobile, custDOB, headers))
    this.props.dispatch(handlegetCustomers(custCode, headers));
  }

  getApiData1 = (cell, row, e) => {
    debugger
    var Role = cell.custCode;
    var lists = this.state.list
    lists.push(Role)
    this.setState({ this: lists })

  }
  getApiData2 = (cell, row, e) => {
    debugger
    var Role = cell.custCode;
    var lists = this.state.lists
    lists.push(Role)
    this.setState({ this: lists })
  }
  getApiData = (urlQuery) => {
    debugger
    var parentCustCode = this.state.lists
    var dedupCustCode = this.state.list

    console.log("dedupCustCode", dedupCustCode)
    console.log("parentCustCode", parentCustCode)
    var token = (localStorage.getItem("tokendata"))

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,

    }
    this.props.dispatch(handleRunDeDup(parentCustCode, dedupCustCode, headers));


  }
  actionMethod = (row, cell) => {

    return (
      < React.Fragment>
        <React.Fragment>
          <input type="checkbox" onChange={(e) => this.getApiData1(cell, row, e)} id="vehicle3" name="vehicle3" value="Boat" />

        </React.Fragment>
      </React.Fragment>
    )
  }
  actionMethod1 = (row, cell) => {

    return (
      < React.Fragment>
        <React.Fragment>
          <input type="checkbox" onChange={(e) => this.getApiData2(cell, row, e)} id="vehicle3" name="vehicle3" value="Boat" />

        </React.Fragment>
      </React.Fragment>
    )
  }
  lastRunDate = (row, cell) => {
    return (
      <div className='expandcontents'>
        {cell.matchingScore}
      </div>
    )
  }
  backFromCustomerList() {
    window.history.back();
  }

  render() {
    console.log("listssss", this.state.list)
    console.log("listxxxx", this.state.lists)
    console.log("this.props.Customerlis", this.props.Customerlis)
    const dummyDedupData = [
      {
        entityName: 'Farid Abdul',
        custCode: 'C001',
        customerFName: 'Farid Abdul',
        bankCode: 'B001',
        riskManual: 'Low',
        addr1: '123 Main St',
        phoneNo: '555-1234',
        matchingScore: 0.85
      },
      {
        entityName: 'Farid Abdul',
        custCode: 'C002',
        customerFName: 'Ahemad khan',
        bankCode: 'B002',
        riskManual: 'Medium',
        addr1: '456 Elm St',
        phoneNo: '555-5678',
        matchingScore: 0.72
      },
      // Add more entries as needed
    ];
    const dummyCustomerData = [
      {
        entityName: 'Farid Abdul',
        custCode: 'C001',
        customerFName: 'Farid Abdul',
        bankCode: 'B001',
        riskManual: 'Low',
        addr1: '123 Main St',
        phoneNo: '555-1234'
      }
      // Add more entries as needed
    ];
    
    
    return (
      <React.Fragment>

        <Universal />

        <section id="main-content">
          <section className="wrapper">
            <div className="row">
              <div className="col-lg-9 main-chart">
                <section className="dashboard-counts no-padding-bottom">

                  <div className="container-fluid" style={{ marginTop: '-1rem' }}>
                    <h1 style={{ fontSize: '22px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid #e9ecef' }}>De Dup Process</h1>
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


        <div className="row has-shadow mt-3" style={{ borderRadius: '1rem', backgroundColor: 'white', marginTop: '5rem', width: '90%', marginLeft: '57px' }}>
          <div className="container-fluid" style={{ marginTop: '-1rem' }}>
            <section id="main-content">
              <section className="wrapper">

                <section className="content" style={{marginBottom:'50px'}} >
                  <div className="row">
                    <div className="col-xs-12">
                      <div className="box">
                        <div className="box-body  no-LR-padding expandcontentscell">
                          <BootstrapTable
                            // data={[this.props.Customerlis]}
                            data={dummyCustomerData}
                            pagination={false}
                            //search
                            ClearSearchButton
                          //exportCSV

                          >
                            <TableHeaderColumn dataFormat={this.actionMethod1} dataField="entityName" csvHeader="First Name" isKey={true} className={"columnHeaderColor"}
                              expandable={false} editable={false} width="35px">Select</TableHeaderColumn>

                            <TableHeaderColumn dataField="custCode" csvHeader="First Name" className={"columnHeaderColor"}
                              expandable={false} editable={false} width="40px"> Customer Code</TableHeaderColumn>
                            <TableHeaderColumn dataField="customerFName" csvHeader="First Name" className={"columnHeaderColor"}
                              expandable={false} editable={false} width="100px">Main Customer Name</TableHeaderColumn>

                            <TableHeaderColumn dataField="bankCode" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                              expandable={false} editable={false} width="100px">Branch Name</TableHeaderColumn>

                            <TableHeaderColumn dataField="riskManual" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                              expandable={false} editable={false} width="55px">Risk Category</TableHeaderColumn>

                            <TableHeaderColumn dataField="addr1" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                              expandable={false} editable={false} width="100px">Address</TableHeaderColumn>

                            <TableHeaderColumn dataField="phoneNo" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                              expandable={false} editable={false} width="100px">Contact</TableHeaderColumn>




                          </BootstrapTable>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="content" >
                  <div className="row">
                    <div className="col-xs-12">
                      <div className="box">
                        <div className="box-body  no-LR-padding expandcontentscell">
                          <BootstrapTable
                            // data={this.props.dedupListss}
                            data={dummyDedupData}
                            pagination={true}
                            //search
                            ClearSearchButton
                          //exportCSV

                          >
                            <TableHeaderColumn dataFormat={this.actionMethod} dataField="entityName" csvHeader="First Name" isKey={true} className={"columnHeaderColor"}
                              expandable={false} editable={false} width="35px">Select</TableHeaderColumn>

                            <TableHeaderColumn dataField="custCode" csvHeader="First Name" className={"columnHeaderColor"}
                              expandable={false} editable={false} width="65px"> Customer Code</TableHeaderColumn>

                            <TableHeaderColumn dataField="customerFName" csvHeader="First Name" className={"columnHeaderColor"}
                              expandable={false} editable={false} width="90px">Matching Customer Name</TableHeaderColumn>

                            <TableHeaderColumn dataField="bankCode" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                              expandable={false} editable={false} width="55px">Branch Name</TableHeaderColumn>

                            <TableHeaderColumn dataField="riskManual" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                              expandable={false} editable={false} width="60px">Risk Category</TableHeaderColumn>

                            <TableHeaderColumn dataField="addr1" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                              expandable={false} editable={false} width="50px">Address</TableHeaderColumn>

                            <TableHeaderColumn dataField="phoneNo" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                              expandable={false} editable={false} width="60px">Contact</TableHeaderColumn>


                            <TableHeaderColumn dataFormat={this.lastRunDate} dataField="matchingScore" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                              expandable={true} editable={false} width="150px">Matching Attribute</TableHeaderColumn>


                          </BootstrapTable>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <div class="divider" />

                <div className="pull-right">
                  <button className="btn btn-primary " onClick={() => this.getApiData()} >Merge</button>
                </div>
              </section>
            </section>
          </div>
        </div>



      </React.Fragment>
    )
  }
}
const mapStateToProps = (state) => {
  const { dedupmasterList } = state.deduplist
  console.log("customerList", dedupmasterList)
  const { customersLists } = state.customerlist
  console.log("customerList11111", customersLists)

  return {
    dedupListss: dedupmasterList,
    Customerlis: customersLists
  }
}

export default connect(mapStateToProps)(de_Dup_Process)

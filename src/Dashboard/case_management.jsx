import React, { Component } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import axios from 'axios'
import { applicationContextPath } from '../common/api'
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';




class case_management extends Component {
  constructor(props) {
    super(props)

    this.state = {
      maxDate: new Date().toISOString().substr(0, 10),
      caseList: [],
      alertTypeList: [],
      alertSubTypeList: [],
      caseSearchData: {
        fromDate: "",
        toDate: "",
        alertSubCode: "",
        alertType: "",
        customerRisk: ""
      },
      selectedCase: [],
      currentPage: 1,
      pageSize: 10,
      totalPages: 1
    }
  }
  componentDidMount() {
    this.getAlertType()
    this.getAlertSubType()

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
        this.setState({ caseList: response.data })
        if (response.data == null || response.data == "" || response.data == undefined) {
          Swal.fire("No data found")
        }
      }

      ).catch(error => {
        console.log(error);
      });
  }

  handleChange1 = () => {
    debugger
    this.setState({
      caseSearchData: {
        fromDate: "",
        toDate: "",
        alertSubCode: "",
        alertType: "",
        customerRisk: ""
      },

    })
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

  searchCase = () => {
    debugger
    var token = localStorage.getItem("tokendata")
    var bankCode = localStorage.getItem("bankdata")

    if (this.state.caseSearchData.toDate < this.state.caseSearchData.fromDate) {
      Swal.fire("Please Enter Valid Date")
      return
    }
    const param = new URLSearchParams({

      toDate: this.state.caseSearchData.toDate,
      fromDate: this.state.caseSearchData.fromDate,
      alertType: this.state.caseSearchData.alertType,
      alertSubCode: this.state.caseSearchData.alertSubCode,
      customerRisk: this.state.caseSearchData.customerRisk

    })


    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
      'bankCode': bankCode
    }
    axios.post(applicationContextPath + `/getDashboardCaseList?` + param, null, { headers })

      .then(response => {
        console.log(response.data)
        this.setState({ caseList: response.data.content,totalPages:response.data.totalPages })
        if (response.data == null || response.data == "" || response.data == undefined) {
          Swal.fire("No data found")
        }
      }

      ).catch(error => {
        console.log(error);
      });
  }



  caseid = (row, cell) => {
    return (
      <div className='expandcontents'>
        {cell.caseid}
      </div>
    )
  }
  creationdate = (row, cell) => {
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

  violationrisk1 = (row, cell) => {
    return (
      <div>
        <React.Fragment>
          <i class="fa fa-exclamation-triangle " aria-hidden="true" style={{ fontSize: '16px', color: 'purple', cursor: 'pointer' }}  ></i>
        </React.Fragment>
      </div>
    )
  }
  violationrisk2 = (row, cell) => {
    return (
      <div>
        <React.Fragment>
          <input type="checkbox" id="vehicle3" name="vehicle3" onClick={(e) => this.handleCheckBox(e, cell)} />
        </React.Fragment>
      </div>
    )
  }

  handleCheckBox = (e, cell) => {
    debugger
    var caseList = this.state.selectedCase
    let newCase = []
    if (e.target.checked == false) {
      newCase = caseList.filter((case1) => {
        return case1.id != cell.id;
      });
      this.setState({ selectedCase: newCase })
    } else {
      caseList.push(cell)
      this.setState({ selectedCase: caseList })
    }
  }

  handleChange = (e) => {
    var data = this.state.caseSearchData
    data[e.target.id] = e.target.value
    this.setState({ caseSearchData: data })
  }

  changeConfirmCase = () => {

    var token = localStorage.getItem("tokendata")
    var bankCode = localStorage.getItem("bankdata")

    var data = []
    for (let i = 0; i < this.state.selectedCase.length; i++) {
      this.state.selectedCase[i].confirmedCase = "Yes"
      data.push(this.state.selectedCase[i])
    }
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
      'bankCode': bankCode,
      'userId': localStorage.getItem("userId"),
    }
    axios.post(applicationContextPath + `/updateConfirmCase`, data, { headers })
      .then(response => {
        console.log(response.data)
        this.searchCase()
        if (response.data == null || response.data == "" || response.data == undefined) {
          Swal.fire("Please Select Case to Update")
        }
        else {
          Swal.fire("Case Status Updated")
        }
      }
      ).catch(error => {
        console.log(error);
      });
  }

  changeCaseStatus = () => {

    var token = localStorage.getItem("tokendata")
    var bankCode = localStorage.getItem("bankdata")

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
      'bankCode': bankCode,
      'userId': localStorage.getItem("userId"),
    }
    var data = []
    for (let i = 0; i < this.state.selectedCase.length; i++) {
      this.state.selectedCase[i].caseStatus = "Close"
      data.push(this.state.selectedCase[i])
    }
    axios.post(applicationContextPath + `/updateCaseStatus`, data, { headers })
      .then(response => {
        console.log(response.data)
        this.searchCase()
        if (response.data == null || response.data == "" || response.data == undefined) {
          Swal.fire("Please Select Case to Closed")
        }
        else {
          Swal.fire("Case Closed")
        }
      }
      ).catch(error => {
        console.log(error);
      });
  }

  handlePageChange = (pageNumber) => {
    console.log("==>", pageNumber);
    this.setState({ currentPage: pageNumber });
  };

  handlePageSizeChange = (event) => {
    this.setState({
      pageSize: parseInt(event.target.value, 10),
      currentPage: 1,
    });
  };

  render() {

    console.log("selectedCase", this.state.selectedCase)
    const alertType = this.state.alertTypeList.map((item, index) =>
      <option value={item.alertCode}>{item.alertCode}</option>
    );

    const alertSubType = this.state.alertSubTypeList.map((item, index) =>
      <option value={item.alertSubTypeCode}>{item.alertName}</option>
    );



    const { caseList, currentPage, pageSize } = this.state;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentPageData = caseList.slice(startIndex, endIndex);

    const totalPages = Math.ceil(caseList.length / pageSize);

    // Create an array of page numbers
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return (
      <React.Fragment>
        <form>

          <div className="container-fluid">
            <div className="row  bg-blue  has-shadow mt-3" style={{ borderRadius: '1rem', background: '#c9ccdf', width: '111%', marginLeft: '-5%', width: "143%" }}>
              <h4 className="text-white" style={{ fontSize: '16px', fontWeight: "bolder", marginTop: '-5px' }}>Search Filter</h4>

              <div className="d-flex" style={{ width: '100%' }}>
                <div className="col-11  col-lg-2 rightCol">
                  <p style={{ fontWeight: "bolder", color: "white", position: 'relative', fontSize: "13px", left: '-42%' }} className="">From Date<span style={{ color: "red" }}>*</span></p>
                </div>
                <div className="col-11  col-lg-2 rightCol">
                  <p style={{ fontWeight: "bolder", color: "white", position: 'relative', fontSize: "13px", left: '-24%' }} className="">To Date<span style={{ color: "red" }}>*</span></p>
                </div>
                <div className="col-11  col-lg-2 rightCol form-select ">
                  <p style={{ fontWeight: "bolder", color: "white", position: 'relative', fontSize: "13px", left: '10%' }} className="">Alert Category <span style={{ color: "red" }}></span></p>
                </div>
                <div className="col-11  col-lg-2 rightCol">
                  <p style={{ fontWeight: "bolder", color: "white", position: 'relative', fontSize: "13px", left: '2%' }} className="">Scenario<span style={{ color: "red" }}></span></p>
                </div>
                <div className="  col-lg-2 rightCol">
                  <p style={{ fontWeight: "bolder", color: "white", position: 'relative', fontSize: "13px", left: '105%' }} className="">Customer Risk <span style={{ color: "red" }}></span></p>
                </div>
              </div>
              <input type="date" max={this.state.maxDate} className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" style={{ height: 'calc(1em + 0.75rem + 5px)', marginRight: '0.6rem', width: '19%' }} id="fromDate" value={this.state.caseSearchData.fromDate} onChange={(e) => this.handleChange(e)} />
              <input type="date" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" style={{ height: 'calc(1em + 0.75rem + 5px)', marginRight: '0.6rem', width: '19%' }} id="toDate" value={this.state.caseSearchData.toDate} onChange={(e) => this.handleChange(e)} />
              <div>
                <select type="select" aria-describedby="inputGroup-sizing-sm" style={{ height: 'calc(1em + 0.75rem + 5px)', width: '95%', marginRight: '2.8rem' }} className="form-control minimal" id="alertType" value={this.state.caseSearchData.alertType} onChange={(e) => this.handleChange(e)}>
                  <option value="">--Select --</option>
                  {alertType}
                </select>
              </div>
              <select type="select" aria-describedby="inputGroup-sizing-sm" style={{ height: 'calc(1em + 0.75rem + 5px)', width: '28%', marginRight: '0.6rem' }} className="form-control minimal" id="alertSubCode" value={this.state.caseSearchData.alertSubCode} onChange={(e) => this.handleChange(e)}>
                <option value="">--Select --</option>
                {alertSubType}
              </select>
              <select type="select" aria-describedby="inputGroup-sizing-sm" style={{ height: 'calc(1em + 0.75rem + 5px)', width: '14%', marginRight: '0.6rem' }} className="form-control minimal" id="customerRisk" value={this.state.caseSearchData.customerRisk} onChange={(e) => this.handleChange(e)} >
                <option value="">--Select --</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option></select>

              <button type="button" className="btn btn-primary " style={{ float: 'right', marginTop: '', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px' }} Type="button" id="Reset" onClick={() => this.searchCase()}
              >Search</button>

              <div className="row pull-right col-12 col-md-4" style={{ marginLeft: '81%', marginTop: '-1rem' }}>


                {/* <div className="pr-3">
                  <button type="button" className="btn btn-primary " style={{ float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px' }} onClick={() => this.handleChange1()}>Reset</button>
                </div> */}


                <div className="pr-3" >


                </div>
              </div>


            </div>




            {/* <div className="row bg-blue has-shadow" style={{borderRadius: '1rem', marginTop: '2rem',marginLeft: "-4%",width :"984px"}}>
                         
                          <div className="col-12 col-md-9 col-lg-9" style={{marginTop: '-1rem'}}>
                            <h4 className="text-white" style={{fontSize: '14px',fontWeight:"bolder",marginTop:'10px'}}>Search Filter</h4>
                            <div class="divider"/>
                            <div className="d-flex" style={{marginTop: '1rem'}}>
                              <label className=" form-control-placeholder text-white" id="start-p" htmlFor="start"style={{position: 'relative',marginTop: '-2rem'}}>From</label> 
                              <label className=" form-control-placeholder text-white" id="start-p" htmlFor="start" style={{position: 'relative',marginTop: '-2rem', left: '27%'}}>To</label> 
                              <label className=" form-control-placeholder text-white" id="start-p" htmlFor="start" style={{position: 'relative',marginTop: '-2rem', left: '55%'}}>Alert Category</label> 
                              <label className=" form-control-placeholder text-white" id="start-p" htmlFor="start" style={{position: 'relative', marginTop: '-2rem',left: '71%'}}>Scenario</label> 
                              <label className=" form-control-placeholder text-white" id="start-p" htmlFor="start" style={{position: 'relative',marginTop: '-2rem', right: '-90%'}}>Customer Risk </label> 
                            </div>
                            <div className="d-flex">
                        
                            <input type="date" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"  style={{ height: 'calc(1em + 0.75rem + 5px)', marginRight: '1rem', width: '29%' }} value={this.state.caseSearchData.fromDate} id="fromDate" onChange={(e)=>this.handleChange(e)}/> 
                          
                            <input type="date" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"  style={{ height: 'calc(1em + 0.75rem + 5px)', marginRight: '1rem', width: '29%' }} value={this.state.caseSearchData.toDate} id="toDate" onChange={(e)=>this.handleChange(e)}/> 
                            <div>
                            <select type="select" aria-describedby="inputGroup-sizing-sm"  style={{ height: 'calc(1em + 0.75rem + 5px)', marginRight: '1rem' }} value={this.state.caseSearchData.alertType} className="form-control" id="alertType" onChange={(e)=>this.handleChange(e)}>
                <option value="">--Select --</option>
                {alertType}
                    </select>
                    </div>&nbsp;&nbsp;&nbsp;
                    
                    <div>
                    <select type="select" aria-describedby="inputGroup-sizing-sm"  style={{ height: 'calc(1em + 0.75rem + 5px)', marginRight: '1rem' }} value={this.state.caseSearchData.alertSubCode} className="form-control" id="alertSubCode" onChange={(e)=>this.handleChange(e)}>
                <option value="">--Select --</option>
                {alertSubType}
                    </select>
                    </div>&nbsp;&nbsp;&nbsp;

<div>
                    <select type="select" aria-describedby="inputGroup-sizing-sm"  style={{ height: 'calc(1em + 0.75rem + 5px)', marginRight: '1rem' }} value={this.state.caseSearchData.customerRisk} id="customerRisk" className="form-control" onChange={(e)=>this.handleChange(e)}>
                    <option value="">--Select--</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>

                  
                </select>
                </div>
                            </div>
                            <button type="button"  className="btn btn-primary " style={{float: 'right', marginRight: '-14rem', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '12px'}} onClick={()=>this.searchCase()}> 
                              Search
                            </button> 
                          </div>
                        </div> */}



            <div className="row  has-shadow mt-3" style={{ borderRadius: '1rem', backgroundColor: 'white', paddingBottom: '5rem', width: '111%', marginLeft: '-5%', width: "143%" }}>
              <section className="content" style={{ margin: -25, width: '125%', marginLeft: '-3%' }}>
                <div className="row">
                  <div className="col-xs-12">
                    <div className="box">
                      <div className="box-body  no-LR-padding expandcontentscell bs-table-actionButton">

                        <BootstrapTable
                          data={this.state.caseList}
                         pagination={true}
                          //  search
                          ClearSearchButton
                        //exportCSV

                        //    trClassName={this.rowClassNameFormat}    
                        >

                          <TableHeaderColumn csvHeader='In stock' dataField='status' expandable={false} editable={false} width="33px" isKey={true} ><a style={{ fontSize: '75%' }}>Select</a></TableHeaderColumn>
                          <TableHeaderColumn
                            csvHeader='In stock'
                            dataField='caseID'
                            expandable={false}
                            editable={false}
                            width='40px'
                            dataFormat={(cell, row) => (
                              <Link to={{ pathname: `/ViewCases`, state: { id: cell } }}>
                                {cell}
                              </Link>
                            )}
                          >
                            Case ID
                          </TableHeaderColumn>                          
                          <TableHeaderColumn dataField='createdDate' expandable={false} editable={false} width="55px"><a style={{ fontSize: '75%' }}>Creation Date</a></TableHeaderColumn>
                          <TableHeaderColumn dataField='id' expandable={false} editable={false} width="70px"><a style={{ fontSize: '75%' }}>Customer Number</a></TableHeaderColumn>

                          <TableHeaderColumn dataField='customerName' expandable={false} editable={false} width="63px"><a style={{ fontSize: '75%' }}>Customer Name</a></TableHeaderColumn>
                          <TableHeaderColumn dataField='createdBy' expandable={false} editable={false} width="50px"><a style={{ fontSize: '75%' }}> Created By</a></TableHeaderColumn>
                          <TableHeaderColumn dataField='alertCode' expandable={false} editable={false} width="62px"><a style={{ fontSize: '82%' }}>Alert Category</a></TableHeaderColumn>
                          <TableHeaderColumn dataField='alertSubTypeCode' expandable={false} editable={false} width="60px"><a style={{ fontSize: '75%' }}>Alert Scenario</a></TableHeaderColumn>
                          <TableHeaderColumn dataField='alertID' expandable={false} editable={false} width="40px"><a style={{ fontSize: '75%' }}>Alert ID</a></TableHeaderColumn>
                          {/* <TableHeaderColumn dataFormat={this.alertName}  csvHeader='In stock' dataField='status' expandable={false}  editable={false} width="80px">Alert Name</TableHeaderColumn> */}
                          <TableHeaderColumn dataField='customerRiskLevel' expandable={false} editable={false} width="55px"><a style={{ fontSize: '75%' }}>Customer Risk</a></TableHeaderColumn>
                          <TableHeaderColumn dataField='caseSeverity' expandable={false} editable={false} width="55px"><a style={{ fontSize: '75%' }}>Case Severity</a></TableHeaderColumn>


                        </BootstrapTable>

                        {/* <button type="button" id="Save" className="btn btn-primary1 pull-right" style={{color: 'white'}} 
                    disabled={!this.state.selectedCase.length>0} onClick={()=>this.changeConfirmCase()}>Confirmed Case</button>
                    <button type="button" id="Save" className="btn btn-primary1 pull-right"style={{color: 'white'}}
                     disabled={!this.state.selectedCase.length>0} onClick={()=>this.changeCaseStatus()}>Bulk Closure</button>
                    <button type="button" id="Save" className="btn btn-primary1 pull-right" style={{color: 'white'}}>Escalate All</button>

                */}
                        {/* <div className="pagination-select">
                          <label>Page Size:</label>
                          <select
                            value={pageSize}
                            onChange={this.handlePageSizeChange}
                          >
                            <option value="10">10</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="150">150</option>
                          </select>
                          <ui style={{ marginTop: '-2px', marginRight: '-750px' }} className="react-bootstrap-table-page-btns-ul pagination">
                            {Array.from({ length: this.state.totalPages }, (_, index) => (
                              <li key={index} className="page-item">
                                <label className="page-link" onClick={() => this.handlePageChange(index + 1)}>{index + 1}</label>
                              </li>
                            ))}

                          </ui>
                        </div> */}

                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className="d-flex d-flex flex-row justify-content-end" style={{ marginTop: '-4rem', marginRight: '-6%' }}>
              <div className="pr-3">
                <button type="button" className="btn btn-primary" style={{ borderColor: '#303974', backgroundColor: '#303974', fontSize: '10px' }}
                  //  disabled={!this.state.selectedCase.length>0} 
                  onClick={() => this.changeConfirmCase()}>Confirmed Case</button>
              </div>
              <div className="pr-3">
                <button type="button" className="btn btn-primary" style={{ borderColor: '#303974', backgroundColor: '#303974', fontSize: '10px' }}
                  // disabled={!this.state.selectedCase.length>0} 
                  onClick={() => this.changeCaseStatus()}>Bulk Closure</button>
              </div>
              <div className="pr-3">
                <button type="button" className="btn btn-primary" style={{ borderColor: '#303974', backgroundColor: '#303974', fontSize: '10px' }}>Escalate All </button>
              </div>
            </div>


          </div>



        </form>
      </React.Fragment>
    )
  }
}

export default case_management

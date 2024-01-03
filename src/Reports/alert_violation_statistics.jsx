import React, { Component } from 'react'
import Universal from '../common/universal'
import { birtReport } from '../api/api'
import Swal from 'sweetalert2'
import 'react-s-alert/dist/s-alert-default.css';
import { BootstrapTable } from 'react-bootstrap-table';
import { TableHeaderColumn } from 'react-bootstrap-table';


class alert_status_report extends Component {
  constructor(props) {
    super(props)

    this.state = {
      getApiData: [],
      getApiDownloadData: [],
      alertviolationdata: {
        "fromdate": "",
        "todate": "",
      },
    }
  }




  handleChange = (e) => {
    var botapidata1 = this.state.alertviolationdata
    botapidata1[e.target.id] = e.target.value
    this.setState({ alertviolationdata: botapidata1 });
  }

  getApiData = () => {
    debugger
    var saveapidata = this.state.alertviolationdata;
    if ((this.state.alertviolationdata.fromdate == null || this.state.alertviolationdata.fromdate == "" || this.state.alertviolationdata.fromdate == undefined) ||
      (this.state.alertviolationdata.todate == null || this.state.alertviolationdata.todate == "" || this.state.alertviolationdata.todate == undefined)) {
      Swal.fire("Please Fill the All Details");
      return
    }
    var createA = document.createElement('a');
    createA.setAttribute('href', birtReport + `/aml/alertViolation?bankCode=${localStorage.getItem("bankdata")}&fromdate=${this.state.alertviolationdata.fromdate}&todate=${this.state.alertviolationdata.todate}`);
    createA.click()


    var token = localStorage.getItem("tokendata")
    const param = new URLSearchParams({
      toDate: this.state.alertviolationdata.todate,
      fromDate: this.state.alertviolationdata.fromdate,

    })

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
      'bankCode': localStorage.getItem("bankdata")
    }

    window.swal({
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
      window.swal({
        title: "Finished!",
        type: 'success',
        showConfirmButton: false,
        timer: 1000,

      });
    }, 1000);



  }
  getApiDownloadData = () => {
    debugger
    var saveapidata = this.state.alertviolationdata;
    if ((this.state.alertviolationdata.fromdate == null || this.state.alertviolationdata.fromdate == "" || this.state.alertviolationdata.fromdate == undefined) ||
      (this.state.alertviolationdata.todate == null || this.state.alertviolationdata.todate == "" || this.state.alertviolationdata.todate == undefined)) {
      Swal.fire("Please Fill the All Details");
      return
    }
    var createA = document.createElement('a');
    createA.setAttribute('href', birtReport + `/aml/alertViolation?bankCode=${localStorage.getItem("bankdata")}&fromdate=${this.state.alertviolationdata.fromdate}&todate=${this.state.alertviolationdata.todate}`);
    createA.click()


    var token = localStorage.getItem("tokendata")
    const param = new URLSearchParams({
      toDate: this.state.alertviolationdata.todate,
      fromDate: this.state.alertviolationdata.fromdate,

    })

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
      'bankCode': localStorage.getItem("bankdata")
    }

    window.swal({
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
      window.swal({
        title: "Finished!",
        type: 'success',
        showConfirmButton: false,
        timer: 1000,

      });
    }, 1000);



  }



  render() {

    return (
      <React.Fragment>
        <Universal />
        <section id="main-content">
          <section className="wrapper">
            <div className="row">
              <div className="col-lg-9 main-chart">
                <section className="dashboard-counts no-padding-bottom">

                  <div className="container-fluid" style={{ marginTop: '-1rem' }}>
                    <h1 style={{ fontSize: '22px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid #e9ecef' }}>Alert Violation Statistics</h1>
                    <div className="container-fluid">
                      <div className="row  bg-blue  has-shadow mt-3" style={{ borderRadius: '1rem', background: '#c9ccdf' }}>
                        <div className="col-12 col-md-2 col-lg-2 rightCol">
                          <p style={{ color: "white", fontWeight: "bolder", fontSize: "15px" }}>From Date  <span style={{ color: "red" }}>*</span></p>

                        </div>
                        <div className="col-12 col-md-4" >
                          <div className="form-group">
                            <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }}
                              id="fromdate" type="date" onChange={this.handleChange}
                            />
                          </div>


                        </div>

                        <div className="col-12 col-md-2 col-lg-2 rightCol">
                          <p style={{ color: "white", fontWeight: "bolder", fontSize: "15px" }}>To Date  <span style={{ color: "red" }}>*</span></p>

                        </div>
                        <div className="col-12 col-md-4" >
                          <div className="form-group">
                            <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }}
                              id="todate" type="date" onChange={this.handleChange} />
                          </div>


                        </div>




                      </div>
                    </div>
                  </div>

                  <div className="row has-shadow mt-3" style={{ borderRadius: '1rem', width: '94%', backgroundColor: 'white', marginTop: '5rem', marginLeft: '29px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button type="button" id="Reset" style={{ borderColor: '#303974', backgroundColor: '#303974', fontSize: '15px', marginLeft: '70%' }} onClick={() => this.getApiData()} className="btn btn-primary">View</button>
                    <button type="button" id="Download" style={{ borderColor: '#303974', backgroundColor: '#303974', fontSize: '15px' }} onClick={() => this.getApiDownloadData()} className="btn btn-primary">Download</button>
                  </div>
                  <div style={{
                    marginTop: "20px",

                  }}>

                    <BootstrapTable striped hover
                      data={this.state.getApiData}
                      pagination={true}
                      //  pagination={true}
                      // search
                      ClearSearchButton
                    // exportCSV

                    >
                      <TableHeaderColumn dataField="id" csvHeader="First Name" isKey={true} className={"columnHeaderColor"}
                        expandable={false} editable={false} width="50px"> Alert ID</TableHeaderColumn>

                      <TableHeaderColumn dataFormat={this.description} dataField="scenarioDescription" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                        expandable={false} editable={false} width="100px">Description</TableHeaderColumn>

                      <TableHeaderColumn dataField="type" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                        expandable={false} editable={false} width="60px">Total Scanned Transaction</TableHeaderColumn>

                      <TableHeaderColumn dataField="customer" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                        expandable={false} editable={false} width="52px">Violation</TableHeaderColumn>

                      <TableHeaderColumn dataField="sevrity" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                        expandable={false} editable={false} width="50px">Total Amount</TableHeaderColumn>

                      <TableHeaderColumn dataField="status" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                        expandable={false} editable={false} width="60px">False Positive Count</TableHeaderColumn>


                      {/* <TableHeaderColumn dataFormat={this.action}  dataField="Edit" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                                     expandable={false} editable={false} width="25px">Action</TableHeaderColumn> */}
                    </BootstrapTable>

                  </div>

                </section>


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
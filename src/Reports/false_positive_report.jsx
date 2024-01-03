import React, { Component } from 'react'
import Universal from '../common/universal'
import { birtReport } from '../api/api'
import 'react-s-alert/dist/s-alert-default.css';
import Swal from 'sweetalert2'
import { BootstrapTable } from 'react-bootstrap-table';
import { TableHeaderColumn } from 'react-bootstrap-table';

class false_positive_report extends Component {
  constructor(props) {
    super(props)

    this.state = {
      getApiData: [],
      getApiDownloadData:[],
      falsepositivedata: {
        "fromdate": "",
        "todate": "",
      },
    }
  }
  handleChange = (e) => {
    var botapidata1 = this.state.falsepositivedata
    botapidata1[e.target.id] = e.target.value
    this.setState({ falsepositivedata: botapidata1 });
  }

  componentDidMount() {
    // this.getApiData();

  }

  getApiData() {
    debugger
    var saveapidata = this.state.falsepositivedata;
    if ((this.state.falsepositivedata.fromdate == null || this.state.falsepositivedata.fromdate == "" || this.state.falsepositivedata.fromdate == undefined) ||
      (this.state.falsepositivedata.todate == null || this.state.falsepositivedata.todate == "" || this.state.falsepositivedata.todate == undefined)) {
      Swal.fire("Please Fill the All Details");
      return
    }
    var createA = document.createElement('a');
    createA.setAttribute('href', birtReport + `/aml/falsePositive?bankCode=${localStorage.getItem("bankdata")}&fromDate=${this.state.falsepositivedata.fromdate}&toDate=${this.state.falsepositivedata.todate}`);
    createA.click()


    var token = localStorage.getItem("tokendata")

    const param = new URLSearchParams({
      toDate: this.state.falsepositivedata.todate,
      fromDate: this.state.falsepositivedata.fromdate,

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
  getApiDownloadData() {
    debugger
    var saveapidata = this.state.falsepositivedata;
    if ((this.state.falsepositivedata.fromdate == null || this.state.falsepositivedata.fromdate == "" || this.state.falsepositivedata.fromdate == undefined) ||
      (this.state.falsepositivedata.todate == null || this.state.falsepositivedata.todate == "" || this.state.falsepositivedata.todate == undefined)) {
      Swal.fire("Please Fill the All Details");
      return
    }
    var createA = document.createElement('a');
    createA.setAttribute('href', birtReport + `/aml/falsePositive?bankCode=${localStorage.getItem("bankdata")}&fromDate=${this.state.falsepositivedata.fromdate}&toDate=${this.state.falsepositivedata.todate}`);
    createA.click()


    var token = localStorage.getItem("tokendata")

    const param = new URLSearchParams({
      toDate: this.state.falsepositivedata.todate,
      fromDate: this.state.falsepositivedata.fromdate,

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
                    <h1 style={{ fontSize: '22px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid #e9ecef' }}>False Positive Report</h1>
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
    <button type="button" id="Reset" style={{ borderColor: '#303974', backgroundColor: '#303974', fontSize: '15px',marginLeft :'70%' }} onClick={() => this.getApiData()} className="btn btn-primary">View</button>
    <button type="button" id="Download" style={{ borderColor: '#303974', backgroundColor: '#303974', fontSize: '15px' }} onClick={() => this. getApiDownloadData()} className="btn btn-primary">Download</button>
</div>

                </section>
                   <div
                    style={{
                      }}>
                <BootstrapTable
                  data={this.state.getApiData}
                  pagination={ true }

                // search
                // ClearSearchButton
                // exportCSV
                >
                  <TableHeaderColumn dataFormat={this.caseId} dataField="Customer Id" csvHeader="First Name" isKey={true} className={"columnHeaderColor"}
                    expandable={false} editable={false} width="18px">Alert Id</TableHeaderColumn>

                  <TableHeaderColumn dataFormat={this.reportedDate} dataField="createdDate" csvHeader="First Name" className={"columnHeaderColor"}
                    expandable={false} editable={false} width="55px">Alert Desc</TableHeaderColumn>

                  <TableHeaderColumn dataFormat={this.reportedBy} dataField="reportedBy" csvHeader="First Name" className={"columnHeaderColor"}
                    expandable={false} editable={false} width="30px">Alert Date</TableHeaderColumn>

                  <TableHeaderColumn dataFormat={this.caseSeverity} dataField="caseSeverity" csvHeader="First Name" className={"columnHeaderColor"}
                    expandable={false} editable={false} width="40px">Marked By</TableHeaderColumn>

                  <TableHeaderColumn dataFormat={this.analysis} dataField="comments" csvHeader="First Name" className={"columnHeaderColor"}
                    expandable={false} editable={false} width="80px">Reason</TableHeaderColumn>

                  {/* <TableHeaderColumn dataFormat={this.status} dataField="caseStatus" csvHeader="First Name" className={"columnHeaderColor"}
                                        expandable={false}  editable={false} width="50px">Case status</TableHeaderColumn> */}

                  {/* <TableHeaderColumn  dataField="Role-Name" csvHeader="First Name" className={"columnHeaderColor"}
                                        expandable={false}  editable={false} width="10px"></TableHeaderColumn> */}

                </BootstrapTable>
                </div>

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

export default false_positive_report
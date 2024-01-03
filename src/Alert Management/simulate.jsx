import React, { Component } from 'react'
import Universal from '../common/universal'
import axios from 'axios'
import { applicationContextPath } from '../common/api'
import Swal from 'sweetalert2'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

class simulate extends Component {

  constructor(props) {
    super(props)

    this.state = {
      ruleData: [["value1_1"],
      ["value2_1"],
      ["value3_1"]
      ],
      getApiData:[
          {
            "id": "CASE001",
            "scenarioDescription": "2023-10-10T08:00:00",
            "type": "CUST001",
            "customer": "Customer A",
            "sevrity": "Security",
            "status": [
              "Unauthorized Access",
              "ALRT001",
              "High"
            ],
            "Edit": "Critical"
          },
          {
            "id": "CASE002",
            "scenarioDescription": "2023-10-11T09:30:00",
            "type": "CUST002",
            "customer": "Customer B",
            "sevrity": "Network",
            "status": [
              "Data Breach",
              "ALRT002",
              "Medium"
            ],
            "Edit": "Moderate"
          },
          {
            "id": "CASE003",
            "scenarioDescription": "2023-10-12T14:15:00",
            "type": "CUST003",
            "customer": "Customer C",
            "sevrity": "Application",
            "status": [
              "Server Outage",
              "ALRT003",
              "Low"
            ],
            "Edit": "Low"
          },
          {
            "id": "CASE004",
            "scenarioDescription": "2023-10-13T16:45:00",
            "type": "CUST004",
            "customer": "Customer D",
            "sevrity": "Security",
            "status": [
              "Unauthorized Access",
              "ALRT004",
              "High"
            ],
            "Edit": "Critical"
          },
          {
            "id": "CASE005",
            "scenarioDescription": "2023-10-14T11:20:00",
            "type": "CUST005",
            "customer": "Customer E",
            "sevrity": "Network",
            "status": [
              "Data Breach",
              "ALRT005",
              "Medium"
            ],
            "Edit": "Moderate"
          },
          {
            "id": "CASE006",
            "scenarioDescription": "2023-10-15T17:30:00",
            "type": "CUST006",
            "customer": "Customer F",
            "sevrity": "Application",
            "status": [
              "Server Outage",
              "ALRT006",
              "Low"
            ],
            "Edit": "Low"
          },
          {
            "id": "CASE007",
            "scenarioDescription": "2023-10-16T09:10:00",
            "type": "CUST007",
            "customer": "Customer G",
            "sevrity": "Security",
            "status": [
              "Unauthorized Access",
              "ALRT007",
              "High"
            ],
            "Edit": "Critical"
          },
          {
            "id": "CASE008",
            "scenarioDescription": "2023-10-17T13:40:00",
            "type": "CUST008",
            "customer": "Customer H",
            "sevrity": "Network",
            "status": [
              "Data Breach",
              "ALRT008",
              "Medium"
            ],
            "Edit": "Moderate"
          },
          {
            "id": "CASE009",
            "scenarioDescription": "2023-10-18T10:55:00",
            "type": "CUST009",
            "customer": "Customer I",
            "sevrity": "Application",
            "status": [
              "Server Outage",
              "ALRT009",
              "Low"
            ],
            "Edit": "Low"
          },
          {
            "id": "CASE010",
            "scenarioDescription": "2023-10-19T15:25:00",
            "type": "CUST010",
            "customer": "Customer J",
            "sevrity": "Security",
            "status": [
              "Unauthorized Access",
              "ALRT010",
              "High"
            ],
            "Edit": "Critical"
          },
          {
            "id": "CASE010",
            "scenarioDescription": "2023-10-19T15:25:00",
            "type": "CUST010",
            "customer": "Customer J",
            "sevrity": "Security",
            "status": [
              "Unauthorized Access",
              "ALRT010",
              "High"
            ],
            "Edit": "Critical"
          }                
    ],      
      simulateData: {
        "ruleId": "",
        "startDate": "",
        "endDate": ""
      },
      scenarioSimulationData: []
    }
  }

  trasactionRisk1 = (row, cell) => {
    return (

      <React.Fragment>
        <i class="fa fa-circle" aria-hidden="true" style={{ fontSize: '16px', color: 'red', cursor: 'pointer' }}  ></i>
      </React.Fragment>
    )
  }


  handleChange = (e) => {
    var simulateData1 = this.state.simulateData
    simulateData1[e.target.id] = e.target.value
    this.setState({ simulateData: simulateData1 });
  }

  componentDidMount() {
    this.getApiData();
  }

  getApiData = () => {
    debugger
    var token = localStorage.getItem("tokendata")
    var bankCode = localStorage.getItem("bankdata")


    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    }
    axios.get(applicationContextPath + `/getBaseRules?bankCode=${bankCode}`, { headers })
      .then(response => {
        console.log(response.data)
        this.setState({ ruleData: response.data })
      }

      ).catch(error => {
        console.log(error);
      });

  }

  simulate = () => {
    debugger
    if ((this.state.simulateData.startDate === null || this.state.simulateData.startDate === "" || this.state.simulateData.startDate === undefined) ||
      (this.state.simulateData.endDate === null || this.state.simulateData.endDate === "" || this.state.simulateData.endDate === undefined) ||
      (this.state.simulateData.ruleId === null || this.state.simulateData.ruleId === "" || this.state.simulateData.ruleId === undefined)
    ) {
      Swal.fire("Please Fill the All Details");
      return
    }
    var token = localStorage.getItem("tokendata")
    var bankCode = localStorage.getItem("bankdata")

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
      'bankCode': bankCode
    }
    axios.get(applicationContextPath + `/senarioSimulation?startDate=${this.state.simulateData.startDate}&endDate=${this.state.simulateData.endDate}&ruleId=${this.state.simulateData.ruleId}`, { headers })
      .then(response => {
        console.log(response.data)
        this.setState({ scenarioSimulationData: response.data.records })
      }

      ).catch(error => {
        console.log(error);
      });
  }



  handleChange1 = () => {
    debugger
    this.setState({
      simulateData: {
        "ruleId": "",
        "startDate": "",
        "endDate": ""
      },

    })
  }

  render() {
    const options = {

      onExportToCSV: this.onExportToCSV,

      deleteBtn: this.createCustomDeleteButton,
      sizePerPageDropDown: this.renderSizePerPageDropDown,
      expandRowBgColor: 'rgb(255, 255, 255)',
      expandBy: 'column',  // Currently, available value is row and column, default is row
      expandAll: true,
      insertBtn: this.customeInsertButton
    };

    const rules = this.state.ruleData.map((item) =>
      <option value={item.id}>{item.scenarioDescription}</option>
    );

    return (
      <React.Fragment>
        <Universal />
        <section id="main-content">
          <section className="wrapper">
            <div className="row">
              <div className="col-lg-9 main-chart">
                <section className="dashboard-counts no-padding-bottom">

                  <div className="container-fluid" style={{ marginTop: '-1rem' }}>
                    <h1 style={{ fontSize: '22px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid #e9ecef' }}>Scenario &gt; Simulator</h1>
                    <div className="container-fluid">
                      <div className="row bg-blue has-shadow mt-3" style={{ borderRadius: '1rem' }}>
                        <div className="col-12 col-md-2 col-lg-2 rightCol">
                          <p style={{ color: "white", fontWeight: "bolder", fontSize: "15px" }}>From Date  <span style={{ color: "red" }}>*</span></p>

                        </div>
                        <div className="col-12 col-md-4" >
                          <div className="form-group">

                            <input className="form-control" id="startDate" type="date" value={this.state.simulateData.startDate}

                              onChange={(e) => this.handleChange(e)}
                            />
                          </div>


                        </div>

                        <div className="col-12 col-md-2 col-lg-2 rightCol">
                          <p style={{ color: "white", fontWeight: "bolder", fontSize: "15px" }}>To Date  <span style={{ color: "red" }}>*</span></p>

                        </div>
                        <div className="col-12 col-md-4" >
                          <div className="form-group">
                            <input className="form-control" id="endDate" type="date" value={this.state.simulateData.endDate}
                              onChange={(e) => this.handleChange(e)}
                            />
                          </div>


                        </div>

                        <div className="col-12 col-md-2 col-lg-2 rightCol">
                          <p style={{ marginTop: '1rem', color: "white", fontWeight: "bolder", fontSize: "15px" }} >Alert Scenario  <span style={{ color: "red" }}>*</span></p>

                        </div>
                        <div className="col-12 col-md-4" style={{ marginTop: '1rem' }}>
                          <div className="form-group" >
                            <select id="ruleId" title="ruleId" className="form-select form-select-sm minimal heightForm" style={{ width: '100%', height: "auto" }}

                              onChange={(e) => this.handleChange(e)} value={this.state.simulateData.ruleId}                     >
                              <option value="" >--Select--</option>
                              {rules}
                            </select>
                          </div>


                        </div>


                      </div>
                    </div>
                  </div>
                  {/* <div className="pr-3" >
         
          </div> */}
                  <div className="row has-shadow mt-3" style={{ borderRadius: '1rem', backgroundColor: 'white', marginTop: '5rem', width: '93%', marginLeft: '29px' }}>
                    <button type="button" id="" className="btn btn-primary " style={{ borderColor: '#303974', marginLeft: '79%', backgroundColor: '#303974', fontSize: '15px' }} onClick={() => this.simulate()}  > Simulate </button>
                    <button type="button" className="btn btn-primary " style={{ borderColor: '#303974', marginLeft: '90%', backgroundColor: '#303974', fontSize: '15px', marginTop: "-37px" }} id="Reset" onClick={() => this.handleChange1()}
                    >Reset</button>

                  </div>

                </section>
                <div className="row has-shadow mt-3" style={{ borderRadius: '1rem', width: '94%', marginLeft: '3%', backgroundColor: 'white', marginTop: '5rem' }}>

                  <div className="col-xs-12">
                    <div className="box">
                      <div className="box-body  no-LR-padding expandcontentscell">


                        <div style={{
                          marginTop: "20px",
                          marginRight: "-270px"

                        }}>

                          <BootstrapTable striped hover
                            data={this.state.getApiData}
                            pagination={true}
                            // search
                            ClearSearchButton
                          // exportCSV

                          >
                            <TableHeaderColumn dataField="id" csvHeader="First Name" isKey={true} className={"columnHeaderColor"}
                              expandable={false} editable={false} width="50px"> Case Id</TableHeaderColumn>

                            <TableHeaderColumn dataFormat={this.description} dataField="scenarioDescription" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                              expandable={false} editable={false} width="50px">Creation Date</TableHeaderColumn>

                            <TableHeaderColumn dataField="type" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                              expandable={false} editable={false} width="50px">Customer
                              Number</TableHeaderColumn>

                            <TableHeaderColumn dataField="customer" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                              expandable={false} editable={false} width="50px">Customer
                              Name</TableHeaderColumn>

                            <TableHeaderColumn dataField="sevrity" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                              expandable={false} editable={false} width="50px">Alert Category</TableHeaderColumn>

                            <TableHeaderColumn dataField="status" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                              expandable={false} editable={false} width="100px">Alert Scenario</TableHeaderColumn>

                            <TableHeaderColumn dataField="status" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                              expandable={false} editable={false} width="30px">Alert ID</TableHeaderColumn>

                            <TableHeaderColumn dataField="status" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                              expandable={false} editable={false} width="40px">Customer
                              Risk</TableHeaderColumn>

                            <TableHeaderColumn dataFormat={this.action} dataField="Edit" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                              expandable={false} editable={false} width="40px">Case
                              Severity</TableHeaderColumn>
                          </BootstrapTable>

                        </div>
                      </div>
                    </div>
                  </div>

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

export default simulate

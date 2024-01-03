import React, { Component } from 'react'
import Universal from '../common/universal'
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { Tab, Tabs, TabList } from 'react-bootstrap'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import Welcome from '../common/welcome'
import Case_management from '../Dashboard/case_management'
import Alert_management from '../Dashboard/alert_management'
import axios from 'axios'
import { applicationContextPath } from '../common/api'


class Dashboard extends Component {
  constructor() {
    super()
    this.state = {
      userName: (JSON.parse(localStorage.getItem('LoginData'))).user,
      alertStatisticsData: []
    }
  }

  componentDidMount() {
    this.getAlertStatistics();

  }

  getAlertStatistics = () => {
    var token = localStorage.getItem("tokendata")
    var bankCode = localStorage.getItem("bankdata")

    const headers = {
      'Content-Type': 'application/json',

      'Authorization': 'Bearer ' + token,
      'bankCode': bankCode
    }
    axios.get(applicationContextPath + '/alertStatistics', { headers })
      .then(response => {
        this.setState({ alertStatisticsData: response.data })
      }
      ).catch(error => {
        console.log(error);
      });
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
                  {/* <div className="container-fluid" style={{marginTop: '-4rem'}}>
                  <div className="row">
                    <div className="col-lg-3" style={{paddingLeft: '0rem'}}>
                      <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                          <li className="breadcrumb-item"><a href="#">breadcrumb</a></li>
                          <li className="breadcrumb-item active" aria-current="page">breadcrumb</li>
                        </ol>
                      </nav>
                    </div>
                  </div>
                </div> */}
                  <div className="container-fluid">
                    <div className="App">
                      <h1 style={{ position: 'absolute', fontSize: '25px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD' }}>Dashboard </h1>
                      <Tabs border="2px solid black" role="tablist" style={{ marginLeft: "376px" }} defaultActiveKey="home" id="uncontrolled-tab-example">

                        <Tab eventKey="home" title="Alert Management">
                        <Alert_management />
                        </Tab>
                        <Tab eventKey="home3" title="Alert Summary">
                          <div className="content-wrapper">
                            <section className="content">
                              <div className="row">
                                <div className="col-xs-12">
                                  <div className="box">
                                    <div className="box-body  no-LR-padding expandcontentscell">
                                      <BootstrapTable
                                        data={this.state.alertStatisticsData}
                                       pagination={true}
                                        //search
                                        ClearSearchButton
                                      //exportCSV

                                      >
                                        <TableHeaderColumn dataField="alertName" isKey={true} className={"columnHeaderColor"}
                                          expandable={false} editable={false} width="100px">Alert Type</TableHeaderColumn>

                                        <TableHeaderColumn dataField="totalCount" className={"columnHeaderColor"}
                                          expandable={false} editable={false} width="100px">Total Count</TableHeaderColumn>

                                        <TableHeaderColumn dataField="dayCount" className={"columnHeaderColor"}
                                          expandable={false} editable={false} width="100px">Last 24 hrs</TableHeaderColumn>

                                        <TableHeaderColumn dataField="prevCount" className={"columnHeaderColor"}
                                          expandable={false} editable={false} width="100px">Previous</TableHeaderColumn>

                                      </BootstrapTable>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </section>
                          </div>
                        </Tab>
                       
                        <Tab eventKey="profile2" title="Case Management">
                          <Case_management />
                        </Tab>
                        <Tab eventKey="home2" title="Case Summary">
                          <div className="content-wrapper">
                            <section className="content">
                              <div className="row">
                                <div className="col-xs-12">
                                  <div className="box">
                                    <div className="box-body  no-LR-padding expandcontentscell">
                                      <BootstrapTable
                                        data={this.state.alertStatisticsData}
                                       pagination={true}
                                        //search
                                        ClearSearchButton
                                      //exportCSV

                                      >
                                        <TableHeaderColumn dataField="alertName" isKey={true} className={"columnHeaderColor"}
                                          expandable={false} editable={false} width="100px">Case</TableHeaderColumn>

                                        {/* <TableHeaderColumn dataField="totalCount" className={"columnHeaderColor"}
                                          expandable={false} editable={false} width="100px">Total Count</TableHeaderColumn> */}

                                        <TableHeaderColumn dataField="dayCount" className={"columnHeaderColor"}
                                          expandable={false} editable={false} width="100px">Statastics</TableHeaderColumn>

                                        {/* <TableHeaderColumn dataField="prevCount" className={"columnHeaderColor"}
                                          expandable={false} editable={false} width="100px">Previous</TableHeaderColumn> */}

                                      </BootstrapTable>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </section>
                          </div>
                        </Tab>
                        {/* <Tab eventKey="contact" title="Contact" /> */}

                      </Tabs>
                    </div>
                  </div>
                </section>
                {/* /row */}
              </div>
              {/* /col-lg-9 END SECTION MIDDLE */}
              {/* **********************************************************************************************************************************************************
              RIGHT SIDEBAR CONTENT
              *********************************************************************************************************************************************************** */}

              {/* /col-lg-3 */}
            </div>
            {/* /row */}
          </section>
        </section>



      </React.Fragment>
    )
  }
}

export default Dashboard

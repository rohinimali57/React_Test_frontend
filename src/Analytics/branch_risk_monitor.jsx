import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import Chart from 'react-google-charts'
import Universal from '../common/universal'
// import Footer from '../Common/Footer'
import axios from 'axios'
import { applicationContextPath } from '../common/api'

class branch_risk_monitor extends Component {
  constructor(props) {
    super(props)

    this.state = {
      alertCode: 'VRV',
      alertSubTypeCode: 'STR',
      branhRiskData: [],
      timeDiff: ''
    }
  }

  componentDidMount() {
    this.getBranchRiskMonitor("1 WEEK")
  }

  backFromBranchRiskMonitor() {
    window.history.back();
  }

  getBranchRiskMonitor = (timeDiff) => {
    this.setState({ timeDiff })
    var token = localStorage.getItem("tokendata")

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
      'bankCode': localStorage.getItem("bankdata")
    }
    axios.get(applicationContextPath + `/branchRiskMonitor?alertCode=${this.state.alertCode}&alertSubTypeCode=${this.state.alertSubTypeCode}&timeDiff=${timeDiff}`, { headers })
      .then(response => {
        const chartData = [['Branch', 'Confirmed ML', 'Alerts Generated', 'ML Loss amount']]
        if (response.data.length > 0) {
          for (let i = 0; i < response.data.length; i += 1) {
            const values = Object.values(response.data[i])
            chartData.push([response.data[i].branchName, response.data[i].confirmCount, response.data[i].alertCount, response.data[i].fraudAmount])
          }
        } else {
          chartData.push(["Branch",0,0,0])
        }
        this.setState({
          branhRiskData: chartData,
        })
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
            <div className="content-wrapper">

              <section>
                <div>
                  <div className="container-fluid" style={{ marginTop: '-1rem' }}>
                    <h1 style={{ fontSize: '22px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid #e9ecef' }}>Branch Risk Monitor </h1>
                    <div className="container-fluid">
                      <div className="row bg-blue  has-shadow mt-3" style={{ borderRadius: '1rem' }}>
                        <div className="col-12 col-md-2 col-lg-2 rightCol">
                          <p style={{ marginTop: '2.2rem', color: "white", fontWeight: "bolder", fontSize: "15px" }}>Alert Category <span style={{ color: "red" }}>*</span></p>
                        </div>
                        <div className="col-12 col-md-4" style={{ marginTop: '2rem' }}>
                          <div className="form-group">
                            <select className="form-control" id="alertCode" onChange={(e) => this.setState({ alertCode: e.target.value })} value={this.state.alertCode}>
                              <option value="VRV">VRV</option>
                              <option value="SDN">SDN</option>
                              <option value="Swift">Swift</option>
                              <option value="Due-Diligence">Due-diligence</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-11  col-lg-2 rightCol">
                          <p style={{ marginTop: '2.2rem', color: "white", fontWeight: "bolder", fontSize: "15px" }} className="">Alert Sub Category <span style={{ color: "red" }}>*</span></p>
                        </div>
                        <div className="col-12 col-md-4" style={{ marginTop: '2rem' }}>
                          <div className="form-group">
                            <select className="form-control" id="alertSubTypeCode" onChange={(e) => this.setState({ alertSubTypeCode: e.target.value })} value={this.state.alertSubTypeCode}>
                              <option value="Excess Cash Withdrawal in a day">Excess Cash Withdrawal in a day</option>
                              <option value="Black-listed">Black-listed</option>
                              <option value="Banned Material">Banned Material involved</option>
                              <option value="National Id Missing">National Id Missing</option>
                              <option value="STR">STR</option>
                              <option value="CTR">CTR</option>
                            </select>
                          </div>



                        </div>
                        <div className="form-group col-md-4 min-height80" style={{ marginLeft: '-51.5%', marginTop: '4rem' }}>
                          <button type="button" id="" className="btn btn-primary " style={{ float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '16px' }} onClick={() => this.getBranchRiskMonitor(this.state.timeDiff)}> View </button>
                        </div>
                      </div>
                    </div>
                    <div class="divider" />
                  </div>

                  {/* <div className="box-body" style={{ marginLeft: "300px" }}>
                            <div className="row">
                                <div className="form-group col-md-4 min-height80">
                                    <lable class='thick'>Alert Category :&nbsp;<span style={{color:"red"}}>*</span></lable>
                                    <select className="form-control" id="alertCode" onChange={(e)=>this.setState({alertCode:e.target.value})} value={this.state.alertCode}>
                                    <option value="VRV">VRV</option>
                                    <option value="SDN">SDN</option>
                                    <option value="Swift">Swift</option>
                                    <option value="Due-Diligence">Due-diligence</option>
                                    </select>
                                </div>
</div>
<div className="row">
                                <div className="form-group col-md-4 min-height80">
                                    <lable class='thick'>Alert Sub-Category :&nbsp;<span style={{color:"red"}}>*</span></lable>
                                    <select className="form-control" id="alertSubTypeCode" onChange={(e)=>this.setState({alertSubTypeCode:e.target.value})} value={this.state.alertSubTypeCode}>
                                        <option value="Excess Cash Withdrawal in a day">Excess Cash Withdrawal in a day</option>
                                        <option value="1">Black-listed</option>
                                        <option value="1">Banned Material involved</option>
                                        <option value="1">National Id Missing</option>
                                        <option value="STR">STR</option>
                                        <option value="CTR">CTR</option>
                                    </select>
                                </div>
</div>
                                <div className="form-group col-md-4 min-height80">
                                    <button type="button" id="" className="btn btn-primary " onClick={()=>this.getBranchRiskMonitor(this.state.timeDiff)}> View </button>
                                </div>
                            </div> */}
                </div>
              </section>

              <Tabs>

                <TabList style={{ backgroundColor: '#ecf0f5' }} >
                  <Tab activeTabPanelClassName="active" id="CompanyDetailsTab" onClick={() => this.getBranchRiskMonitor("1 WEEK")}>1 Week</Tab>
                  <Tab activeTabPanelClassName="active" id="CompanyDetailsTab" onClick={() => this.getBranchRiskMonitor("1 MONTH")}>1 Month</Tab>
                  <Tab activeTabPanelClassName="active" id="CompanyDetailsTab" onClick={() => this.getBranchRiskMonitor("1 QUARTER")}>1 Quarter</Tab>
                  <Tab activeTabPanelClassName="active" id="CompanyDetailsTab" onClick={() => this.getBranchRiskMonitor("6 MONTH")}>6 Months</Tab>
                  <Tab activeTabPanelClassName="active" id="CompanyDetailsTab" onClick={() => this.getBranchRiskMonitor("1 YEAR")}>1 Year</Tab>



                </TabList>
                {/* <TabPanel> */}
                <div style={{ border: '2px solid blue' }}>

                  <div>
                    <div style={{ color: 'white', background: '#94D1D4', textAlign: "center" }}>Branch Risk Monitor</div>
                    <br></br>
                    <div className="form-group col-md-2 min-height80"></div>

                    <div className="form-group col-md-1 min-height80"></div>

                    <div className="form-group col-md-1 min-height80"></div>

                  </div>
                  <div class="container1">
                    <div class="leftpane2" style={{ border: '1px solid #ADB3B6' }}>



                      <Chart
                        width={'100%'}
                        height={'500px'}
                        chartType="Bar"
                        loader={<div>Loading Chart</div>}
                        data={this.state.branhRiskData}
                        //   data={[
                        //     ['Country', 'Cars', 'Trucks'],
                        //     ['Unit Sewa Bheli', 15, 15],
                        //     ['', 20, null],

                        //     ['MaladBranch', 17, 17],
                        //     ['', 20, null],

                        //     ['KandiwaliWest', 13, 13],
                        //     ['', 20, null],

                        //     ['Thane,Manpada', 16, 16],
                        //     ['', 20, null],

                        //     ['Churchgate', 20, 20],
                        //     ['', 20, null],

                        //     ['Ghatkopar', 20, 20],
                        //     ['', 20, null],

                        //     ['Vikroli Agar', 20, 20],
                        //     ['', 20, null],

                        //     ['Kalyan', 20, 20],
                        //     ['', 20, null],

                        //     ['Powai Gate', 20, 20],
                        //     ['', 20, null],
                        // ]}
                        options={{
                          title: 'Branch Risk Monitor',
                          chartArea: { width: '50%' },
                          // isStacked: true,
                          isStacked: true,
                          vAxis: { title: 'Days' },
                          hAxis: { title: 'Numbers' },

                          // legend: 'none',
                        }}

                        rootProps={{ 'data-testid': '3' }}

                      />
                    </div>
                  </div>
                </div>

                {/* </TabPanel> */}
              </Tabs>
            </div>
          </section>
        </section>
        {/* <Footer/> */}
      </React.Fragment>
    )
  }
}

export default branch_risk_monitor

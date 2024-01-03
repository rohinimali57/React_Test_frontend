import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import Chart from 'react-google-charts'
import axios from 'axios'
import Universal from '../common/universal'
import {applicationContextPath} from '../common/api'

class alert_monitor extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            category:"VRV",
            alertMonitorData:[],
            dataLoadingStatus: 'loading',
            searchPeriod:'1 Week'

        }
    }
    
   
    componentDidMount(){
        this.getAlertMonitor('1 Week', this.state.category)
    }

    getAlertMonitor = (searchPeriod, category)=>{
        this.setState({searchPeriod:searchPeriod, category})
        var token = localStorage.getItem("tokendata")
        var bankCode= localStorage.getItem("bankdata")
      
           const headers = {
             'Content-Type': 'application/json',
             'Authorization': 'Bearer '+token,
             'bankCode':bankCode
             }
         axios.get(applicationContextPath+`/alertMonitorGraph?category=${category}&searchPeriod=${searchPeriod}`,{headers})
        .then(response => {
            
           
            const chartData = [['Alert Sub Type', 'No.of Alerts']]
            if(response.data.length>0){
            for (let i = 0; i < response.data.length; i += 1) {
                const values = Object.values(response.data[i])
                chartData.push([values[1], values[0]])
             }
            }else{
                chartData.push(["Type", 0])
            }
            this.setState({
                dataLoadingStatus: 'ready',
                alertMonitorData: chartData,
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
                        <div className="container-fluid" style={{marginTop: '-1rem'}}>
              <h1 style={{fontSize: '22px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid #e9ecef'}}>Alert Monitor </h1>
              <div className="container-fluid">
                <div className="row bg-blue has-shadow mt-3" style={{borderRadius: '1rem'}}>
                  <div className="col-12 col-md-2 col-lg-2 rightCol">
                    <p  style={{marginTop: '2.2rem',color:"white",fontWeight:"bolder",fontSize:"15px"}}>Alert Category <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '2rem'}}>
                    <div className="form-group">
                    <select className="form-control" id="category" onChange={(e)=>this.getAlertMonitor(this.state.searchPeriod,e.target.value)}>                                      
                    <option value="VRV">VRV</option>
                    <option value="SDN">SDN</option>
                    <option value="Swift">Swift</option>
                    <option value="Due-Diligence">Due-diligence</option>
                                    </select>
                    </div>
                  </div>
             
                  <div className="col-12 col-md-4" style={{marginTop: '0.5rem'}}>
                           
                    <div className="form-group col-md-4 min-height80">
                                    <button type="button" id=""className="btn btn-primary " style={{float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '16px'}} onClick={()=>this.getAlertMonitor(this.state.searchPeriod)}> Search </button>
                                </div>
                  </div>
                </div>
              </div>
              <div class="divider" />
            </div>
                            {/* <div className="box-body" style={{ marginLeft: "300px" }}>
                                <div className="form-group col-md-4 min-height80">
                                    <lable class='thick'>Alert Category :&nbsp;<span style={{color:"red"}}>*</span></lable>
                                    <select className="form-control" id="category" onChange={(e)=>this.setState({category:e.target.value})}>                                      
                    <option value="VRV">VRV</option>
                    <option value="SDN">SDN</option>
                    <option value="Swift">Swift</option>
                    <option value="Due-Diligence">Due-diligence</option>
                                    </select>
                                </div>

                                <div className="form-group col-md-4 min-height80">
                                    <button type="button" id="" className="btn btn-primary " onClick={()=>this.getAlertMonitor(this.state.searchPeriod)}> Search </button>
                                </div>
                            </div> */}
                        </div>
                    </section>
                    <Tabs>

                        <TabList style={{ backgroundColor: '#ecf0f5' }} >
                            <Tab activeTabPanelClassName="active" id="CompanyDetailsTab" onClick={()=>this.getAlertMonitor("1 Week", this.state.category)}>1 Week</Tab>
                            <Tab activeTabPanelClassName="active" id="CompanyDetailsTab" onClick={()=>this.getAlertMonitor("1 Month", this.state.category)}>1 Month</Tab>
                            <Tab activeTabPanelClassName="active" id="CompanyDetailsTab" onClick={()=>this.getAlertMonitor("1 Quarter", this.state.category)}>1 Quarter</Tab>
                            <Tab activeTabPanelClassName="active" id="CompanyDetailsTab" onClick={()=>this.getAlertMonitor("1 Month", this.state.category)}>6 Months</Tab>
                            <Tab activeTabPanelClassName="active" id="CompanyDetailsTab" onClick={()=>this.getAlertMonitor("1 Year", this.state.category)}>1 Year</Tab>


                        </TabList>
                        {/* <TabPanel> */}
                        
                            <div style={{ border: '2px solid blue' }}>
                                <div>
                                    <div style={{ color: 'white', background: '#94D1D4', textAlign: "center" }}>Alert Monitor</div>
                                    <br></br>
                                    <div className="form-group col-md-2 min-height80"></div>
                                   
                                    <div className="form-group col-md-1 min-height80"></div>
                                   
                                    <div className="form-group col-md-1 min-height80"></div>
                                  
                                </div>
                                <div class="container1">

                                    <div class="leftpane2" style={{ border: '1px solid #ADB3B6' }}>

                                    {this.state.dataLoadingStatus === 'ready' ?
                                        <Chart
                                            width={'100%'}
                                            height={'500px'}
                                            chartType="ComboChart"
                                            loader={<div>Loading Chart</div>}
                                            data={this.state.alertMonitorData}
                                            options={{
                                                title: 'Alert Monitor',
                                                // vAxis: { title: 'Days' },
                                                // hAxis: { title: 'Numbers' },
                                                seriesType: 'bars',
                                                
                                                // legend: 'none',
                                                series: { 1: { type: 'line' }, 2: { type: 'line' } },
                                            }}
                                        />:
                                        
                                            <div>Fetching data from API</div>
                                          }
                                    </div>
                                </div>
                            </div>
                        {/* </TabPanel> */}




                    </Tabs>
                </div>
                </section>
                </section>
            </React.Fragment>
        )
    }
}

export default alert_monitor

import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import Chart from "react-google-charts"
import Universal from '../common/universal'
// import Footer from '../Common/Footer'
import {applicationContextPath} from '../common/api'
import axios from 'axios'

class alert_classification extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
             vrvPercent:0,
             sdnPercent:0,
             swiftPercent:0,
             deDupPercent:0,
             manualPercent:0
        }
    }
    
 
      componentDidMount(){
        this.getAlertClassification("1 WEEK")
    }

    getAlertClassification = (interval) =>{
        var token = localStorage.getItem("tokendata")
 
        const param = new URLSearchParams({
            interval: interval
          
          })
    
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token,
          'bankCode': localStorage.getItem("bankdata")
          }
        axios.post(applicationContextPath+`/getAlertClassification?`+param,null,{headers})
      .then(response => {
        console.log(response.data)
        for(let i=0; i<response.data.length; i++){
            if(response.data[i].alertCode=="VRV"){
                this.setState({vrvPercent:response.data[i].alertPercent})
            }else if(response.data[i].alertCode=="SDN"){
                this.setState({sdnPercent:response.data[i].alertPercent})
            }else if(response.data[i].alertCode=="Manual"){
                this.setState({manualPercent:response.data[i].alertPercent})
            }else if(response.data[i].alertCode=="SWIFT"){
                this.setState({swiftPercent:response.data[i].alertPercent})
            }else if(response.data[i].alertCode=="De-dup"){
                this.setState({deDupPercent:response.data[i].alertPercent})
            }
        }
      }
    
    ).catch(error => {
        console.log(error);
    });
 }

    render(){
        return (
            <React.Fragment>
                      <Universal/>
                      <section id="main-content">
        <section className="wrapper">
                      <div className="content-wrapper">
                      <div className="container-fluid" style={{marginTop: '-1rem'}}>
              <h1 style={{fontSize: '22px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid #e9ecef'}}>Alert Classification </h1>
              <div className="container-fluid">
               
              </div>
              <div class="divider" />
            </div>
                 
                       <Tabs>
                                                
                            <TabList style={{ backgroundColor: '#ecf0f5' }}>
                            <Tab activeTabPanelClassName="active" id="CompanyDetailsTab" onClick={()=>this.getAlertClassification("1 WEEK")}>1 Week</Tab>
                             <Tab activeTabPanelClassName="active" id="CompanyDetailsTab" onClick={()=>this.getAlertClassification("1 MONTH")}>1 Month</Tab>
                             <Tab activeTabPanelClassName="active" id="CompanyDetailsTab" onClick={()=>this.getAlertClassification("1 QUARTER")}>1 Quarter</Tab>
                             <Tab activeTabPanelClassName="active" id="CompanyDetailsTab" onClick={()=>this.getAlertClassification("6 MONTH")}>6 Months</Tab>
                             <Tab activeTabPanelClassName="active" id="CompanyDetailsTab" onClick={()=>this.getAlertClassification("1 YEAR")}>1 Year</Tab>
                            </TabList>
                            {/* <TabPanel> */}
                                
                            
                       <div style={{border: '2px solid blue'}}>
                                    <div>
                                        <div style={{color:'white', background:'#94D1D4', textAlign:"center"}}>Alert Classification</div>
                                        <br></br>
                                       
                                    </div>  
                       <div class="container1">
                           
                            <div class="rightpane2" style={{border: '1px solid #ADB3B6' ,width:'46%', left:'-29%'}}>
                            <Chart
                                width={'95%'}
                                height={'400px'}
                                chartType="PieChart"
                                loader={<div>Loading Chart</div>}
                                data={[
                                    ['Legends', 'Counts'],
                                    ['VRV', this.state.vrvPercent],
                                    ['SDN', this.state.sdnPercent],
                                    ['SWIFT', this.state.swiftPercent],
                                    ['De-dup', this.state.deDupPercent],
                                    ['Manual Alerts', this.state.manualPercent],
                                ]}
                                options={{
                                    title: 'Alerts Classification',
                                    // Just add this option
                                    is3D: true,
                                }}
                                rootProps={{ 'data-testid': '2' }}
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

export default alert_classification

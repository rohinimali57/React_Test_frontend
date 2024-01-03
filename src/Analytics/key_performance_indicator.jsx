import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Chart } from "react-google-charts";
import Universal from '../common/universal'
import axios from 'axios'
import {applicationContextPath} from '../common/api'
import {CSS_COLOR_NAMES} from '../Css/colorCode'


const data = [
    ["Element", "Density", { role: "style" }],
    ["Copper", 8.94, "#b87333"], // RGB value
    ["Silver", 10.49, "silver"], // English color name
    ["Gold", 19.3, "gold"],
    ["Platinum", 21.45, "color: #e5e4e2"] // CSS-style declaration
];
class KeyPerformanceIndicator extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             alertPerformanceData:[],  
            casePerformanceData:[],  
             investigatorData:[],
             isCaseData:true,
             isAlertPerformanceData:true
        }
    }
    

    componentDidMount() {
        this.getAlertPerformance("1 Week")
    }
    
    getAlertPerformance=(searchPeriod)=>{
         
        var token = localStorage.getItem("tokendata")
        var bankCode= localStorage.getItem("bankdata")
      
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token,
          'bankCode': localStorage.getItem("bankdata")
          }
        axios.get(applicationContextPath+`/alertPerformance?searchPeriod=${searchPeriod}`,{headers})
      .then(response => {
        const chartData = [['Investigator','Closed', 'Pending']]
        if(response.data.length>0){
        for (let i = 0; i < response.data.length; i += 1) {
            const values = Object.values(response.data[i])
          chartData.push([response.data[i].assigned_userid, response.data[i].closeCount, response.data[i].pendingCount])
    }
        this.setState({
            alertPerformanceData: chartData,
        })
    }else{
        this.setState({isAlertPerformanceData:false})
    }
      }
    
    ).catch(error => {
        console.log(error);
    });

    axios.get(applicationContextPath+`/caseInvestigatorPerformance?searchPeriod=${searchPeriod}`,{headers})
    .then(response => {
      const chartData1 = [["Element", "Percentage%", { role: "style" }]]
      const userData = []
      if(response.data.length>0){
      for (let i = 0; i < response.data.length; i += 1) {
          const values = Object.values(response.data[i])
          chartData1.push([response.data[i].assigned_userid, response.data[i].performancePercent, CSS_COLOR_NAMES[i]])
          var data = {
            assignedUser:response.data[i].assignedUser,
            color:CSS_COLOR_NAMES[i]
          }
          userData.push(data)
  }
      this.setState({
          dataLoadingStatus1: 'ready',
          casePerformanceData: chartData1,
          investigatorData:userData
      })
    }else{
        this.setState({isCaseData:false})
    }
    }
  
  ).catch(error => {
      console.log(error);
  });

    }

    render() {
  console.log("x1",this.state.alertPerformanceData)
  console.log("x2",this.state.casePerformanceData)
        return (

            <div className="mainDiv" >
                <React.Fragment>

                    <Universal />
                    <section id="main-content">
        <section className="wrapper">
                    <div className="content-wrapper">
                    <div className="container-fluid" style={{marginTop: '-1rem'}}>
              <h1 style={{fontSize: '22px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid #e9ecef'}}>Key Performance Indicator </h1>
              <div className="container-fluid">
               
              </div>
              <div class="divider" />
            </div>
                        {/* <section>
                            <div>
                                <div className="box-body" style={{ marginLeft: "300px" }}>
                                    <div className="form-group col-md-4 min-height80">
                                        <lable class='thick'>Alert Category :</lable>
                                        <select className="form-control" id="">
                                            <option value="">All</option>
                                            <option value=""></option>
                                            <option value=""></option>
                                        </select>
                                    </div>

                                   

                                    <div className="form-group col-md-4 min-height80">
                                        <button type="button" id="" className="btn btn-primary "> View </button>
                                    </div>
                                </div>
                            </div>
                        </section> */}

                        <Tabs className="content-wrapper">

                            <TabList style={{ backgroundColor: '#ecf0f5' }} >
                            <Tab activeTabPanelClassName="active" id="CompanyDetailsTab" onClick={()=>this.getAlertPerformance("1 Week")}>1 Week</Tab>
                            <Tab activeTabPanelClassName="active" id="CompanyDetailsTab" onClick={()=>this.getAlertPerformance("1 Month")}>1 Month</Tab>
                            <Tab activeTabPanelClassName="active" id="CompanyDetailsTab" onClick={()=>this.getAlertPerformance("1 Quarter")}>1 Quarter</Tab>
                            <Tab activeTabPanelClassName="active" id="CompanyDetailsTab" onClick={()=>this.getAlertPerformance("1 Month")}>6 Months</Tab>
                            <Tab activeTabPanelClassName="active" id="CompanyDetailsTab" onClick={()=>this.getAlertPerformance("1 Year")}>1 Year</Tab>


                            </TabList>
                            {/* <TabPanel> */}

                            <div style={{border: '2px solid black',height:'750px'}}>

<div>
   

 <section className="content-header">  
          
            <div class="container" >
                <div class="leftpane3" style={{ border: '2px solid black'}}>
                    <div>
                    <div class="thick" style={{ color: 'white', background: 'blue', textAlign: "center" }}>Alert Performance</div>
                                        <br></br>
                    {this.state.isAlertPerformanceData == true ? 
                    <div>
                        <table  align="left" width="85%"  style={{margin: 30}}>
                           
                       
                                                  
                                                    <br></br><br></br><br></br><br></br>
                                                    <div style={{ border: '2px solid black', float: 'left' }}>
                                                   
                                                        <Chart
                                                            width={'100%'}
                                                            height={'400px'}
                                                            chartType="ColumnChart"
                                                            loader={<div>Loading Chart</div>}
                                                            data={this.state.alertPerformanceData}
                                                            options={{
                                                                title: '',
                                                                chartArea: { width: '50%' },
                                                                isStacked: true,

                                                                vAxis: { title: 'Percentage%' },
                                                                hAxis: { title: 'Investigator Id' },
                                                                seriesType: 'bars',
                                                                legend: 'none',
                                                                series: { 1: { type: 'bar' } },
                                                            }}

                                                            rootProps={{ 'data-testid': '2' }}

                                                        />
                                                    </div>
                        </table>  
                        <div style={{ border: '30px solid White' }}>
                                                    <section className=" content-header">
                                                        <table align="left" width="50%" border="1px solid black" >
                                                            <thead>
                                                                <tr style={{ textAlign: 'center', color: 'black', background: '#94D1D4' }}>
                                                                    <th width="30%"></th>
                                                                    <th>Legend</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                <td>
                                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <i class="fa fa-square" align="center"  style={{ fontSize:'16px',color: 'blue',cursor:'pointer', textAlign:'center'}}  ></i>

                                           </td>
                                                                    <td>Closed</td>
                                                                </tr>
                                                                <tr>
                                                                <td>
                                           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <i class="fa fa-square" align="center"  style={{ fontSize:'16px',color: 'red',cursor:'pointer'}}  ></i>

                                           </td>                                                                    <td>Pending</td>
                                                                </tr> 
                                                                <tr style={{ background: '#94D1D4' }}>
                                                                    <td></td>
                                                                    <td>  &nbsp; </td>
                                                                </tr>

                                                            </tbody>
                                                        </table>

                                                    </section>

                                                </div>
                                                </div>:
                                                <div>
                                                    No Data to Display
                                                 </div>
                                                }
                        <section className="content">                
                            <div className="col-xs-14">
                                <div className="box-body  no-LR-padding expandcontentscell"></div>
                            </div>
                        </section>   
                    </div>
                </div>
                &nbsp;

                <div class="rightpane2" style={{ border: '2px solid black'}}><div>
                <div class="thick" style={{ color: 'white', background: 'blue', textAlign: "center" }}>Case Investigator Performance</div>
                                        <br></br>
              {this.state.isCaseData == true ?
              <div>
                    <table  align="left" width="85%" style={{margin: 0}}>
                  
                                                 
                                                    <br></br><br></br><br></br><br></br>
                                                   
                                                    <div style={{ border: '2px solid black', float: 'right', margin: 0 }}>
                                                    <Chart
                                                     width={'100%'}
                                                     height={'400px'}
                                            chartType="ColumnChart"
                                            data={this.state.casePerformanceData}
                                            options={{
                                                title: '',
                                                vAxis: { title: 'Percentage%' },
                                                hAxis: { title: 'Investigator Id' },
                                                colors:['red'],
                                                // colors:['red'],
                                                // seriesType: 'bars',
                                                
                                                legend: 'none',
                                                // series: { 1: { type: 'line' }, 2: { type: 'line' } },
                                            }}
                                                      

                                                        />
                                                    </div>
                        </table>  
                        <div style={{ border: '30px solid White' }}>
                                                    <section className=" content-header">
                                                        <table align="left" width="50%" border="1px solid black" >
                                                            <thead>
                                                                <tr style={{ textAlign: 'center', color: 'black', background: '#94D1D4' }}>
                                                                    <th width="30%"></th>
                                                                    <th>Legend</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {this.state.investigatorData.map((item)=>
                                                                 <tr>
                                                                 <td>      
                                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <i class="fa fa-square" align="center"  style={{ fontSize:'16px',color: item.color,cursor:'pointer', textAlign:'center'}}  ></i>
                                                                  </td>
                                                                 <td>{item.assignedUser}</td>
                                                             </tr>
                                                                 ) 
                                                                }
               
                                                            </tbody>
                                                        </table>

                                                    </section>

                                                    </div>
                                                </div>:
                                                <div>
                                                    No Data to Display
                                                </div>
                                             
                                         }
                        <section className="content">
                            <div className="col-xs-14">          
                               <div className="box-body  no-LR-padding expandcontentscell"></div>
                            </div>
                        </section>     
                    </div>
                </div>
            </div>
        <div><br></br></div>
        
        
    </section><br/><br/>
    </div>
    </div>
                        
                                
                            {/* </TabPanel> */}
                        </Tabs>
                    </div>
                    </section>
                    </section>
                </React.Fragment>
            </div >

        )
    }
}
export default KeyPerformanceIndicator  
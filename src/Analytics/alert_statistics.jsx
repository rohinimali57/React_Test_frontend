import React, { Component } from 'react'
import Universal from '../common/universal'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import Chart from "react-google-charts"
import {applicationContextPath} from '../common/api'
import axios from 'axios'

class alert_statistics extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             newPercent:0,
             wipPercent:0,
             closePercent:0
        }
    }
    
      componentDidMount(){
          this.getStatistics("1 WEEK")
      }
     
      getStatistics = (interval) =>{
        var token = localStorage.getItem("tokendata")
 
        const param = new URLSearchParams({
            interval: interval
          
          })
    
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token,
          'bankCode': localStorage.getItem("bankdata")
          }
        axios.post(applicationContextPath+`/getAlertStatastics?`+param,null,{headers})
      .then(response => {
        console.log(response.data)
        for(let i=0; i<response.data.length; i++){
            if(response.data[i].alertStatus=="New"){
                this.setState({newPercent:response.data[i].alertPercent})
            }else if(response.data[i].alertStatus=="WIP"){
                this.setState({wipPercent:response.data[i].alertPercent})
            }else if(response.data[i].alertStatus=="Close"){
                this.setState({closePercent:response.data[i].alertPercent})
            }
        }
        this.setState({getApiData:response.data})
        console.log("data---",this.state.getApiData)
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
              <h1 style={{fontSize: '22px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid #e9ecef'}}>Alert Statistics </h1>
              <div className="container-fluid">
               
              </div>
              <div class="divider" />
            </div>
         
                      <Tabs>
                         
                      <section>
                     
                           <TabList style={{ backgroundColor: '#ecf0f5' }}>
                           <Tab activeTabPanelClassName="active" id="CompanyDetailsTab" onClick={()=>this.getStatistics("1 WEEK")}>1 Week</Tab>
                             <Tab activeTabPanelClassName="active" id="CompanyDetailsTab" onClick={()=>this.getStatistics("1 MONTH")}>1 Month</Tab>
                             <Tab activeTabPanelClassName="active" id="CompanyDetailsTab" onClick={()=>this.getStatistics("1 QUARTER")}>1 Quarter</Tab>
                             <Tab activeTabPanelClassName="active" id="CompanyDetailsTab" onClick={()=>this.getStatistics("6 MONTH")}>6 Months</Tab>
                             <Tab activeTabPanelClassName="active" id="CompanyDetailsTab" onClick={()=>this.getStatistics("1 YEAR")}>1 Year</Tab>
                           </TabList>
                               
                </section>
                {/* <TabPanel> */}

                      <div style={{border: '2px solid blue'}}>
                                   <div>
                                       <div style={{color:'white', background:'#94D1D4', textAlign:"center"}}>Alert Statistics</div>
                                       <br></br>
                                       <div className="form-group col-md-2 min-height80"></div>
                                       {/* <div className="form-group col-md-4 min-height80">
                                       <lable class='thick'>Log Date : &nbsp;</lable>
                                       <span class="glyphicon glyphicon-calendar"></span>

                                           <input type="date"  name="bday"/>                                         
                                       </div> */}
                                       {/* <div className="form-group col-md-1 min-height80"></div>
                                       <div className="form-group col-md-2 min-height80">
                                       <lable class='thick'>View : &nbsp;</lable>
                                           <select className="form-control select2 " id="country">
                                               <option value="">BANK</option>
                                           </select>
                                       </div> */}
                                   </div>  
                      <div class="container1">
                           <div class="leftpane2" style={{border: '30px solid White'}}>
                             
                           <Chart
                               width={'500px'}
                               height={'300px'}
                               chartType="PieChart"
                               loader={<div>Loading Chart</div>}
                               data={[
                                   ['Legends', 'Counts'],
                                   ['Closed Alerts', this.state.closePercent],
                                   ['New Aletrs', this.state.newPercent],
                                   ['WIP', this.state.wipPercent],
                               ]}
                               options={{
                                   title: '',
                                   legend: 'none',
                                   // Just add this option
                                   is3D: true,
                               }}
                               rootProps={{ 'data-testid': '2' }}
                           />

                           </div>
                           <div class="rightpane2" style={{border: '0px solid White', left: '-10%',}}>
                           <section className=" content-header">
                               <table style={{marginTop:'-250px'}} align="center" width="60%" border="1px solid black">
                                   <thead>
                                       <tr style={{textAlign: 'center', color: 'white', background: '#94D1D4'}}>
                                       <th width="30%"></th>
                                       <th>Legend</th>
                                       {/* <th width="30%"></th> */}

                                       </tr>
                                   </thead>
                                   
                                   <tbody>
                                       <tr>
                                           <td>
                                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <i class="fa fa-square" align="center"  style={{ fontSize:'16px',color: 'blue',cursor:'pointer', textAlign:'center'}}  ></i>

                                           </td>
                                           <td>
                                               Closed Alerts
                                           </td> 
                                           {/* <td>
                                               25
                                           </td>  */}
                                       </tr>
                                       <tr>
                                           <td>
                                           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <i class="fa fa-square" align="center"  style={{ fontSize:'16px',color: 'red',cursor:'pointer'}}  ></i>

                                           </td>
                                           <td>
                                               New Alerts
                                           </td> 
                                           {/* <td>
                                               15
                                           </td>  */}
                                       </tr>
                                       <tr>
                                           <td>
                                           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <i class="fa fa-square" align="center"  style={{ fontSize:'16px',color: 'orange',cursor:'pointer'}}  ></i>

                                           </td>
                                           <td>
                                              WIP
                                           </td> 
                                           {/* <td>
                                               20
                                           </td>  */}
                                       </tr>
                                       <tr style={{background: '#94D1D4'}}>
                                           {/* <td>
                                               
                                           </td>
                                           <td class="thick">
                                               Total
                                           </td> 
                                           <td class="thick">
                                               60
                                           </td>  */}
                                       </tr>

                                   </tbody>
                               </table>  
                               
                           </section>   
                           
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

export default alert_statistics

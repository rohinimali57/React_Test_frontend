import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Universal from '../common/universal'
// import Footer from '../Common/Footer'
import {applicationContextPath} from '../common/api'
import axios from 'axios'


class RiskHeatMap extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             alertCode:"VRV",
             timeDiff:"",
             riskHeatMapData:[],
             highRisk:[],
             lowRisk:[],
             mediumRisk:[]
        }
    }
    
  
      componentDidMount(){
        this.getRiskHeatMap("1 WEEK")
      }

      getRiskHeatMap=(timeDiff)=>{
        var token = localStorage.getItem("tokendata")
       this.setState({timeDiff:timeDiff})
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token,
          'bankCode': localStorage.getItem("bankdata")
          }
        axios.get(applicationContextPath+`/riskHeatMap?alertCode=${this.state.alertCode}&timeDiff=${timeDiff}`,{headers})
      .then(response => {
      
        this.setState({
            highRisk: response.data["high"],
            lowRisk: response.data["low"],
            mediumRisk: response.data["medium"],
        })
    
        }).catch(error => {
        console.log(error);
    });
}

    render() {

        console.log("lowRisk",this.state.lowRisk)
        return (

            <React.Fragment>
                 <Universal/>
                 <section id="main-content">
        <section className="wrapper">
                 <div className="content-wrapper">

                            <section>
                            <div className="container-fluid" style={{marginTop: '-1rem'}}>
              <h1 style={{fontSize: '22px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid #e9ecef'}}>Risk Heat Map </h1>
              <div className="container-fluid">
                <div className="row bg-blue has-shadow mt-3" style={{borderRadius: '1rem'}}>
                  <div className="col-12 col-md-2 col-lg-2 rightCol">
                    <p  style={{marginTop: '2.2rem',color:"white",fontWeight:"bolder",fontSize:"15px"}}>Alert Category <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '2rem'}}>
                    <div className="form-group">
                    <select className="form-control" id="alertCode" onChange={(e)=>this.setState({alertCode:e.target.value})}>
                                        <option value="VRV">VRV ALERT</option>
                                        <option value="SDN">SDN ALERT</option>
                                        <option value="Swift">Swift Alert</option>
                                        <option value="Due-Diliencr">Due-diligence Alert</option>
                                    </select>
                    </div>
                  </div>
             
                  <div className="col-12 col-md-4" style={{marginTop: '1rem'}}>
                           
                  <div className="form-group col-md-4 min-height80">
                                    <button type="button" id="" className="btn btn-primary " style={{float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '16px'}} onClick={()=>this.getRiskHeatMap(this.state.timeDiff)}> View </button>
                                </div>
                  </div>
                </div>
              </div>
              <div class="divider" />
            </div>
                        {/* <div>
                            <div className="box-body" style={{ marginLeft: "300px" }}>
                                <div className="form-group col-md-4 min-height80">
                                    <lable class='thick'>Alert Category : &nbsp;<span style={{color:"red"}}>*</span></lable>
                                    <select className="form-control" id="alertCode" onChange={(e)=>this.setState({alertCode:e.target.value})}>
                                        <option value="VRV">VRV ALERT</option>
                                        <option value="SDN">SDN ALERT</option>
                                        <option value="Swift">Swift Alert</option>
                                        <option value="Due-Diliencr">Due-diligence Alert</option>
                                    </select>
                                </div>

                               

                                <div className="form-group col-md-4 min-height80">
                                    <button type="button" id="" className="btn btn-primary " onClick={()=>this.getRiskHeatMap(this.state.timeDiff)}> View </button>
                                </div>
                            </div>
                        </div> */}
                    </section>
                        <Tabs>
                       
                         <TabList style={{ backgroundColor: '#ecf0f5' }} >
                             <Tab activeTabPanelClassName="active" id="CompanyDetailsTab" onClick={()=>this.getRiskHeatMap("1 WEEK")}>1 Week</Tab>
                             <Tab activeTabPanelClassName="active" id="CompanyDetailsTab" onClick={()=>this.getRiskHeatMap("1 MONTH")} >1 Month</Tab>
                             <Tab activeTabPanelClassName="active" id="CompanyDetailsTab" onClick={()=>this.getRiskHeatMap("1 QUARTER")}>1 Quarter</Tab>
                             <Tab activeTabPanelClassName="active" id="CompanyDetailsTab" onClick={()=>this.getRiskHeatMap("6 MONTH")}>6 Months</Tab>
                             <Tab activeTabPanelClassName="active" id="CompanyDetailsTab" onClick={()=>this.getRiskHeatMap("1 YEAR")}>1 Year</Tab>

                             
                         </TabList>
                         <TabPanel>
            <div className="mainDiv" >
                
               
                <div style={{border: '2px solid blue'}}>
                                 <div>
                                     <div style={{color:'white', background:'#94D1D4', textAlign:"center"}}>Risk Heat Map</div>
                                     <br></br>                          
                                 </div>  
                    <div class="container1">  
                         <div class="leftpane2" style={{border: '1px solid #ADB3B6'}}>
    

     {/* <Chart
         width={'80%'}
         height={'500px'}
         chartType="ColumnChart"
         loader={<div>Loading Chart</div>}
         data={[
           [
             'Day',
             'No.of Alerts',
            
           ],
           ['Day1', 241],
           ['Day2', 254 ],
           ['Day3', 351],
           ['Day4', 375],
           ['Day5', 415],
         ]}
         options={{
           title: 'Risk Classification',
        //    vAxis: { title: 'Days' },
        //    hAxis: { title: 'Numbers' },
           legend : 'none'
          
         }}
       /> */}
       
                &nbsp;
                
                <div align="center">
               <label style={{marginLeft:'-264px'}}>Risk Severity</label> 
                    <div ><table border="1px" style={{ margin: 10, width: "40%" }} >
                        
                       <tr ><td width="10%"></td><td align="center"></td><td align="center"></td><td align="center"></td><td align="center"></td><td align="center"></td><td align="center"></td><td align="center"></td><td align="center"></td><td align="center"></td><td align="center"></td></tr>
                        
                        <tr ><td align="right">100</td> <td align="center" bgcolor="#FF0000">10</td><td align="center" bgcolor="#FF0000">65</td><td bgcolor="#FF0000" align="center">35</td><td align="center" bgcolor="#FF0000">60</td><td align="center" bgcolor="#FF0000">55</td><td bgcolor="#FF0000" align="center">46</td><td align="center" bgcolor="#FF0000">75</td><td bgcolor="#FF0000" align="center">90</td><td align="center"bgcolor="#FF0000">99</td><td align="center"bgcolor="#FF0000">40</td></tr>
                        
                        <tr ><td align="right">90</td> <td align="center" bgcolor="#FF0000">20</td><td align="center" bgcolor="#FF0000">55</td><td bgcolor="#FF0000" align="center">36</td><td align="center" bgcolor="#FF0000">45</td><td align="center" bgcolor="#FF0000">45</td><td bgcolor="#FF0000" align="center">68</td><td align="center" bgcolor="#FF0000">57</td><td bgcolor="#FF0000" align="center">88</td><td align="center"bgcolor="#FF0000">59</td><td align="center"bgcolor="#FF0000">50</td></tr>
                        
                        <tr><td align="right">80</td> <td align="center" bgcolor="orange">30</td><td align="center" bgcolor="orange">45</td><td align="center" bgcolor="orange">45</td><td bgcolor="orange" align="center">55</td><td bgcolor="orange" align="center">65</td><td bgcolor="orange" align="center">76</td><td bgcolor="orange" align="center">77</td><td align="center" bgcolor="#FF0000">84</td><td align="center"bgcolor="#FF0000">59</td><td align="center"bgcolor="#FF0000">70</td></tr>
                        
                        <tr><td align="right">70</td> <td align="center" bgcolor="orange">10</td><td align="center" bgcolor="orange">40</td><td align="center" bgcolor="orange">50</td><td bgcolor="orange" align="center">45</td><td bgcolor="orange" align="center">56</td><td bgcolor="orange" align="center">67</td><td bgcolor="orange" align="center">57</td><td align="center" bgcolor="#FF0000">78</td><td align="center"bgcolor="#FF0000">95</td><td align="center"bgcolor="#FF0000">70</td></tr>
                        
                        <tr><td align="right">60</td> <td align="center" bgcolor="orange">20</td><td align="center" bgcolor="orange">35</td><td align="center" bgcolor="orange"bgcolor="orange">38</td><td bgcolor="orange" align="center"bgcolor="orange">50</td><td bgcolor="orange" align="center">57</td><td bgcolor="orange" align="center">66</td><td bgcolor="orange" align="center">75</td><td align="center" bgcolor="#FF0000">78</td><td align="center"bgcolor="#FF0000">90</td><td align="center"bgcolor="#FF0000">10</td></tr>
                       
                        <tr><td align="right">50</td> <td align="center"bgcolor="green">30</td><td align="center"bgcolor="green">25</td><td align="center"bgcolor="green">50</td><td align="center" bgcolor="green">45</td><td align="center"bgcolor="green">65</td><td align="center"bgcolor="orange">77</td><td align="center"bgcolor="orange">97</td><td align="center" bgcolor="#FF0000">68</td><td align="center"bgcolor="#FF0000">89</td><td align="center"bgcolor="#FF0000">50</td></tr>
                       
                        <tr><td align="right">40</td> <td align="center"bgcolor="green">40</td><td align="center"bgcolor="green">10</td><td align="center" bgcolor="green">30</td><td align="center" bgcolor="green">50</td><td align="center"bgcolor="green">75</td><td align="center"bgcolor="orange">67</td><td align="center"bgcolor="orange">77</td><td align="center"bgcolor="#FF0000">58</td><td align="center"bgcolor="#FF0000">59</td><td align="center"bgcolor="#FF0000">30</td></tr>
                       
                        <tr><td align="right">30</td> <td align="center"bgcolor="green">50 </td><td align="center"bgcolor="green">30</td><td align="center" bgcolor="green">40</td><td align="center" bgcolor="green">44</td><td align="center"bgcolor="green">85</td><td align="center"bgcolor="orange">56</td><td align="center"bgcolor="orange">87</td><td align="center"bgcolor="#FF0000">78</td><td align="center"bgcolor="#FF0000">79</td><td align="center"bgcolor="#FF0000">20</td></tr>
                        
                        <tr><td align="right">20</td> <td align="center"bgcolor="green">60 </td><td align="center"bgcolor="green">20</td><td align="center" bgcolor="green">45</td><td align="center" bgcolor="green">64</td><td bgcolor="green" align="center">95</td><td align="center"bgcolor="orange">46</td><td align="center"bgcolor="orange">97</td><td align="center"bgcolor="#FF0000">98</td><td align="center"bgcolor="#FF0000">59</td><td align="center"bgcolor="#FF0000">30</td></tr>

                        <tr><td align="right">10</td> <td align="center" bgcolor="green">1</td><td align="center"bgcolor="green">0</td><td align="center"bgcolor="green">25</td><td align="center" bgcolor="green">48</td><td align="center" bgcolor="green">0</td><td align="center"bgcolor="orange">60</td><td align="center"bgcolor="orange">75</td><td align="center"bgcolor="#FF0000">48</td><td align="center"bgcolor="#FF0000">96</td><td align="center"bgcolor="#FF0000">10</td></tr>
                        
                        <tr><td align="right"><label>Risk Priority</label>  </td> <td align="center" >10</td><td align="center">20</td><td align="center">30</td><td align="center" >40</td><td align="center" >50</td><td align="center">60</td><td align="center">70</td><td align="center">80</td><td align="center">90</td><td align="center">100</td></tr>
                        

                        </table></div>

                </div>
                </div>
     </div>
 </div>


            </div >
            </TabPanel>
</Tabs>
</div>
</section>
</section>
{/* <Footer/> */}
</React.Fragment>
        )
    }
}
export default RiskHeatMap  

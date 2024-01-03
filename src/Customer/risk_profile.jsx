import React, { Component } from 'react'

import 'react-tabs/style/react-tabs.css';
import axios from 'axios';
import Charts from "react-google-charts";
import Chart from 'chart.js';
import $ from "jquery";
import ReactSpeedometer from "react-d3-speedometer";
import {applicationContextPath} from './../../api/api'
import { connect } from 'react-redux' 

 class risk_profile extends Component {
    constructor(props){
        super(props)
        this.state ={
          
          failureAnalysisData:[],
          failureStatusData:[],
          cardsData: [],
          getAllConversation:[],
          getTaskCount:[],
          getQuestionAnswerCount:[],
          botUsagesNew:[],
          FailureanalysisData1:[],
          botUsagesNewArr:[],
          averageBotUsage:[],
          usage:[],
          seconds:[]
        
          
        }
        //this.failureTrackingData = this.failureTrackingData.bind(this)
      //this.failureAnalysisTrackingData = this.failureAnalysisTrackingData.bind(this)
        //this.FailureanalysisData1 = this.FailureanalysisData1.bind(this);
        //this.onMessageReceive = this.onMessageReceive.bind(this)
      }
    componentDidMount(){
        debugger
    //     var custCode = "C00104"
    // var branchCode= "HDFC000486"
    // var token = (localStorage.getItem("tokendata"))
    // const headers = {
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Bearer '+token,
        
    //   }
    //     this.props.dispatch(handleRiskGraphData(custCode,branchCode,{headers}));
   this.failureStatusData()
       
        
       
      }

      failureStatusData = () =>{
        debugger
         var custCode = this.props.custCode
    var branchCode = this.props.branchCode
    const param = new URLSearchParams({
        custCode:custCode,
        branchCode:branchCode
      })
    var token = (localStorage.getItem("tokendata"))
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token,
        
      }
      const url = applicationContextPath +"/getRiskGraphData?"+param
        axios.post(url,null,{headers})
        .then(response => {
      console.log("xxxxxxxxxxxxx",response.data)
        this.setState({ failureAnalysisData: response.data })   
        this.Failurechartmethod()
    
        }
      
      ).catch(error => {
          console.log(error);
      });
      
      }
    Failurechartmethod= () =>{
        debugger
     var failureAnalysischart =this.state.failureAnalysisData[0]
    //  var failureAnalysischart = this.state.failureAnalysisData[0];
        
    console.log("cccccccccccccccc",failureAnalysischart)
  
    var failureAnalysis =[]
    failureAnalysis = this.state.botUsagesNew;
   
       var barContent = document.getElementById('barContent')
       barContent.innerHTML = '';
       $('#barContent').append('<canvas id="myChart" height="250px"  />');
       var myChart = new Chart("myChart", {
           type: 'horizontalBar',
             data:{
            labels: ["KYC Risk","Transaction Type","Transaction Trend"]  ,
             datasets: [{
               data: [failureAnalysischart.kycRisk != undefined ||failureAnalysischart.kycRisk != null  ? failureAnalysischart.kycRisk : "",
               failureAnalysischart.transactioTypeRisk != undefined ||failureAnalysischart.transactioTypeRisk !=null ? failureAnalysischart.transactioTypeRisk: "",
               failureAnalysischart.transactiontrendRisk != undefined || failureAnalysischart.transactiontrendRisk != null ? failureAnalysischart.transactiontrendRisk : "",],
         
               backgroundColor: [
                   'rgba(255, 99, 132, 1)',
                   'rgba(54, 162, 235, 1)',
                   'rgba(255, 206, 86, 1)',
                   'rgba(75, 192, 192, 1)',
                   'rgba(153, 102, 255, 1)',
                   'rgba(255, 159, 64, 1)'
               ],
               borderColor: [
                   'rgba(255,99,132,1)',
                   'rgba(54, 162, 235, 1)',
                   'rgba(255, 206, 86, 1)',
                   'rgba(75, 192, 192, 1)',
                   'rgba(153, 102, 255, 1)',
                   'rgba(255, 159, 64, 1)'
               ],
               borderWidth: 1
           }]
       },
       
       options: {
           legend: {
               display: false
            },
            hover: {
             mode: 'nearest',
             intersect: true
           },
           scales: {
             xAxes: [{
               display: true,
               scaleLabel: {
                 display: true,
                 zoomEnabled: true,
              //   labelString: this.state.failureAnalysisData
               }
             }],
             yAxes: [{
               display: true,
               scaleLabel: {
                 display: true,
                 zoomEnabled: true,
               },
             }]
           },
           showLines: false,
           myChart
           }
       });
   
     }
     speedmeter =()=>{
         
     }
    render(){
        return (
            <section className="content">
                 
                 <section className="content">
                       <div className="row">
                       <div className="col-xs-12 col-xs-12 margin-top-minus15">
                       <div className="nav-tabs-custom">
                               
                            
                               <form>
                               <section className=" content-header">
                                   <div>
                                  
                                   </div>
                                   </section>
                                   <section className=" content-header">

 <div class="container">
   <div class="table-responsive">          
 
  </div>
</div>
<div class="container">
    <div class="leftpane">
    {/* <img src={risk_Analysis} width="100%" height="175%" /> */}
    </div>
    <div >
   
    <div class="container" >
        <div class="leftpane3" style={{ border: '2px solid black'}}>
            <div>
                <table  align="left" width="50%"  style={{margin: 30}}>
                    <ReactSpeedometer
                        maxValue={10}
                        value={this.state.failureAnalysisData.length>0?this.state.failureAnalysisData[0].riskScore:0}
                        needleColor="grey"
                        startColor="green"
                        segments={3}
                        endColor="red"
                        textColor="black"
                    />
                </table>  
                                                        
                <section className="content" style={{marginLeft:-130}}>                
                    <div className="col-xs-14">
                        <div className="box-body  no-LR-padding expandcontentscell"></div>
                    </div>
                </section>   
            </div>
        </div>
        &nbsp;
            
        <div class="rightpane2" style={{ border: '2px solid black'}}><div>
            <table  align="left" width="50%" style={{margin: 30}}>
                <Charts
                    width={'400px'}
                    height={'300px'}
                    chartType="BarChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ["", "", { role: "style" }],
                        ["KYC Risk", this.state.failureAnalysisData.length>0?this.state.failureAnalysisData[0].kycRisk:0, "skyblue"], // RGB value
                        ["Transaction Type", this.state.failureAnalysisData.length>0?this.state.failureAnalysisData[0].transactioTypeRisk:0, "darkviolet"], // English color name
                        ["Transaction Trend", this.state.failureAnalysisData.length>0?this.state.failureAnalysisData[0].transactiontrendRisk:0, "gold"],
                        ["Rule Violation", this.state.failureAnalysisData.length>0?this.state.failureAnalysisData[0].violationRisk:0, "brown"], // CSS-style declaration
                        // ["5",43, "lightblue"]
                    ]}
                    options={{
                        is3D: true,
                        legend:'none'
                        }}
                />
            </table>                                                  
            <section className="content">
                <div className="col-xs-14">          
                    <div className="box-body  no-LR-padding expandcontentscell"></div>
                </div>
            </section>     
        </div>
    </div>
    </div>
    <div><br></br></div>

   
    

    </div>
</div>

            </section><br/><br/>
        </form>
    </div>
    </div>
    </div>           
    </section>
                </section>
                
                

        )
 }
}
const mapStateToProps = (state) => { 
    
    const {riskgraphmasterList} = state.deduplist
    
    console.log("riskgraphmasterList",riskgraphmasterList)
 
   return {
      
      riskgraphmasterList
      
      
   }
 }
export default connect(mapStateToProps)(risk_profile)

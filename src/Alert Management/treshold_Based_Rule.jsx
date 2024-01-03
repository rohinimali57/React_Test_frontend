import React, { Component } from 'react'
import 'react-tabs/style/react-tabs.css';
import axios from 'axios'
import {applicationContextPath} from '../common/api'
import Universal from '../common/universal'
import 'react-s-alert/dist/s-alert-default.css';
import Swal from 'sweetalert2'
import { ExportToCsv } from 'export-to-csv';

 class treshold_Based_Rule extends Component {
    constructor(props){
      debugger
        super(props)

        this.state={
         getApiData:[],
         thresholdData:{
          "txn_amt":"",
          "txn_type":"",
          "cust_type":"",
          "dr_cr":"",
          "frequence":"",
          "account_grp":"",
         },
         baseRuleData:{
           "customer":"aeawe",
           "id":"1",
           "status":"Active",
           "scenarioDescription":"dsadsadsa"
         },
         viewResultData:[]
        }
  }
  componentDidMount() {
    this.getThreshold();
    this.getBaseRuleById()
  }

  handleReset = (event) => {
    event.preventDefault();
    this.setState({
      thresholdData:{
        "txn_amt":"",
        "txn_type":"",
        "cust_type":"",
        "dr_cr":"",
        "frequence":"",
        "account_grp":"",
       },
    });
  }
Save = (row,cell) => { 
  return(
      Swal.fire({
          title: 'Are you Want to Save?',
          text: '',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, Save it!',
          cancelButtonText: 'No  '
        }).then((result) => {
          if (result.value) {
            this.saveThreshold()
        
          // For more information about handling dismissals please visit
          // https://sweetalert2.github.io/#handling-dismissals
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              'Cancelled',
              ' ',
              'error'
            )
          }
        })
  )
}

saveThreshold = () =>{

  var token = localStorage.getItem("tokendata")
  var bankCode= localStorage.getItem("bankdata")

  var data = this.state.thresholdData
  data.baseRuleId = this.props.history.location.state.id
  data.bankCode = localStorage.getItem("bankdata")

   const headers = {
     'Content-Type': 'application/json',
     'Authorization': 'Bearer '+token,
     }
 axios.post(applicationContextPath+`/saveThresholdRule`,data,{headers})
.then(response => {
  this.getThreshold()
  Swal.fire(
    'Saved!',
    'Your Data  has been Saved.',
    'success'
  )
}
).catch(error => {
 console.log(error);
});
}

getThreshold = () =>{
debugger
  var token = localStorage.getItem("tokendata")
  var bankCode= localStorage.getItem("bankdata")
 // var id = this.props.history.location.state.id
  var id = 1
  
   const headers = {
     'Content-Type': 'application/json',
     'Authorization': 'Bearer '+token,
     }
 axios.get(applicationContextPath+`/getThresholdRule?bankCode=${bankCode}&baseRuleId=${id}`,{headers})
.then(response => {
  if(response.data!=""){
    this.setState({thresholdData:response.data})
  }
  
}
).catch(error => {
 console.log(error);
});
}

changeRuleStatus = (e)=>{
  var baseRuleData = this.state.baseRuleData
  baseRuleData[e.target.id] = e.target.value
 this.setState({baseRuleData:baseRuleData})
var token = localStorage.getItem("tokendata")
  var data = this.props.history.location.state
  data.status = e.target.value
   const headers = {
     'Content-Type': 'application/json',
     'Authorization': 'Bearer '+token,
     }
 axios.post(applicationContextPath+`/saveBaseRules`,data,{headers})
.then(response => {
  this.getBaseRuleById()
}
).catch(error => {
 console.log(error);
});
}

getBaseRuleById = ()=>{
  var token = localStorage.getItem("tokendata")
  var bankCode= localStorage.getItem("bankdata")

   // var id = this.props.history.location.state.id
    var id = 2
     const headers = {
       'Content-Type': 'application/json',
       'Authorization': 'Bearer '+token,
       }
   axios.get(applicationContextPath+`/getBaseRuleById?bankCode=${bankCode}&id=${id}`,{headers})
  .then(response => {
    this.setState({baseRuleData:response.data})
  }
  ).catch(error => {
   console.log(error);
  });
  }

backFromSummary() {
  window.history.back();
}
failureType4 = (cell, row) => {
    
  return (
    
    <React.Fragment>
          <select className="form-control select2 " id="failure_Type" name="failureType"
             style={{ width: '100%' }} >
            <option  selected="">-- Select --</option>
            <option value="No Change Required">Individual</option>
            <option value="KB Needs Change">Coorprate</option>
            <option value="KB Needs Change">Society</option>
            <option value="KB Needs Change">HUF</option>
          </select>
        </React.Fragment> 
    
  )
}

viewResult=()=>{
  var token = localStorage.getItem("tokendata")
  var bankCode= localStorage.getItem("bankdata")
var data ={}
data.txn_amt = this.state.thresholdData.txn_amt
data.txn_type=this.state.thresholdData.txn_type
data.cust_type=this.state.thresholdData.cust_type
data.dr_cr=this.state.thresholdData.dr_cr
data.frequence=this.state.thresholdData.frequence
data.account_grp=this.state.thresholdData.account_grp
data.baseRuleId = 1
data.bankCode = bankCode
     const headers = {
       'Content-Type': 'application/json',
       'Authorization': 'Bearer '+token,
       }
   axios.post(applicationContextPath+`/ruleExecution`,data,{headers})
  .then(response => {
    this.setState({viewResultData:response.data})
  }
  ).catch(error => {
   console.log(error);
  });
}

handleChange=(e)=>{
  debugger
  var threshold = this.state.thresholdData
  threshold[e.target.id] = e.target.value
    this.setState({thresholdData:threshold});  
}

exportToCSV=()=>{

  const options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true, 
      showTitle: true,
      title: '',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };
   
  const csvExporter = new ExportToCsv(options);
   
  csvExporter.generateCsv(this.state.viewResultData);
}

    render() {
        return (
            <React.Fragment>
                 <Universal/>
                 <section id="main-content">
    <section className="wrapper">
                  <h1 style={{fontSize: '22px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid #e9ecef'}}>Threshold Based Rules</h1>

            <div className="content-wrapper">
            <section className=" content-header">
         
            <table  align="left" width="95%" border="1px solid black" style={{margin: 30, marginLeft : 10}}>
        <thead>
        <tr style={{textAlign: 'center', color: 'white', background: '#94D1D4'}}>
            <th>ID</th>
            <th>Scenario Description</th>
            <th>Customer </th>
            <th>Status </th>
        </tr>
        </thead>
        <tbody style={{color: 'blue'}}>
            <tr>
                <td width="23%">{this.state.baseRuleData.id!=""?this.state.baseRuleData.id :this.props.history.location.state.id}</td>
                <td width="40%"> {this.state.baseRuleData.scenarioDescription!=""?this.state.baseRuleData.scenarioDescription :this.props.history.location.state.scenarioDescription}	</td>
                <td width="18%">{this.state.baseRuleData.customer!=""?this.state.baseRuleData.customer :this.props.history.location.state.customer}</td>
                <td width="25%">
                <div className="form-group col-md-6 min-height20">
                                        <select className="form-control select2 " id="status" onChange={(e)=>this.changeRuleStatus(e)} value={this.state.baseRuleData.status!=""?this.state.baseRuleData.status :this.props.history.location.state.status}>
                                        {/* <option value="">Select Frequency</option> */}
                                        <option value="Active">Active</option>
                                        <option value="In-Active">In-Active</option>
                                          
                                        </select>
                                    </div>
                </td>
            </tr>
        </tbody>
    </table>                  
            </section>
            {/* <section className="content" >
                                      <div className="row">
                                      <div className="col-xs-12">
                                      <div className="box">
                                      <div className="box-body  no-LR-padding expandcontentscell">
                                      <BootstrapTable
                                        data={this.state.getApiData}
                                         pagination={true}
                                         //search
                                         ClearSearchButton
                                         //exportCSV
                                         
                                       >
                                       <TableHeaderColumn dataField="Attribute" csvHeader="First Name" isKey={true} className={"columnHeaderColor"}
                                     expandable={false}  editable={false} width="50px">Attribute</TableHeaderColumn>
             
                                     <TableHeaderColumn  dataField="Operator" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                                     expandable={false} editable={false}   width="50px">Operator </TableHeaderColumn>

                                        <TableHeaderColumn  dataField="Value" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                                     expandable={false} editable={false} width="100px">Value</TableHeaderColumn>
                     
                                   <TableHeaderColumn dataFormat={this.actionMethod}  dataField="Edit" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                                     expandable={false} editable={false} width="20px"></TableHeaderColumn>
         
                                       </BootstrapTable>
                                      </div>
                                      </div>
                                          </div>
                                          </div>
                                      </section> */}
                                      <table  align="left" width="70%" border="1px solid #758080" style={{margin: 10}}>
    <thead>
   
    <tr style={{textAlign: 'center', color: 'black', background: 'lightblue'}}>
           
            <th width="8%">Attribute</th>
            <th width="2%">Operator</th>
            <th width="12%">Value</th>
            
        </tr>
    </thead>
    <tbody style={{color: 'black'}}>
        <tr>
            
            <td>TXN_AMT </td>
            <td style={{marginLeft:"10px"}}></td>
            <td><input className="form-control" placeholder="Ente txn amt" value={this.state.thresholdData.txn_amt} type="text" id="txn_amt" onChange={(e)=>this.handleChange(e)}></input></td>
           
           
        </tr>
        <tr>
          
            <td>TXN_TYPE</td>
            <td >= </td>
            <td className="form-group">
            {/* <div className="form-group col-md-6 min-height20"> */}
                                        <select className=" form-control select2 " value={this.state.thresholdData.txn_type} id="txn_type" onChange={(e)=>this.handleChange(e)}>
                                            <option value="">--Select--</option>
                                            <option value="Cash">Cash</option>
                                            <option value="Transfer">Transfer </option>
                                            <option value="Clearing">Clearing </option>

                                        </select>
                                    {/* </div> */}
            </td>
           
        </tr>
        <tr>
            
            <td>CUST_TYPE</td>
            <td> =</td>
            <td className="form-group">
            {/* <div className="form-group col-md-6 min-height20"> */}
                                        <select className="form-control select2 " id="cust_type"  value={this.state.thresholdData.cust_type} onChange={(e)=>this.handleChange(e)}>
                                        <option value="">--Select--</option>
                                        <option value="Individual">Individual</option>
                                        <option value="Corporate">Corporate</option>
                                        <option value="Society">Society</option>
                                        <option value="HUF">HUF</option>

                                        </select>
                                    {/* </div> */}
            </td>
            
        </tr>
        <tr>
         
            <td>DR_CR</td>
            <td> = </td>
            <td className="form-group"> 
            {/* <div className="form-group col-md-6 min-height20"> */}
                                        <select className=" form-control select2 " value={this.state.thresholdData.dr_cr} id="dr_cr" onChange={(e)=>this.handleChange(e)}>
                                        <option value="">--Select--</option>
                                            <option value="CR"> CR</option>
                                            <option value="DR">DR </option>

                                        </select>
                                    {/* </div> */}
            </td>
            
        </tr>
        <tr>
           
            <td> FREQUENCY</td>
            <td> = </td>
            <td className="form-group">
            {/* <div className="form-group col-md-6 min-height20"> */}
                                        <select className=" form-control select2 " value={this.state.thresholdData.frequence} id="frequence" onChange={(e)=>this.handleChange(e)}>
                                           <option value="">--Select--</option> 
                                            <option value="Daily"> Daily</option>
                                            <option value="Weekly">Weekly </option>
                                            <option value="Monthly">Monthly </option>
                                            <option value="Quarterly">Quarterly </option>
                                            <option value="Yearly">Yearly </option>



                                        </select>
                                    {/* </div> */}
                                     </td>
           
        </tr>
        <tr>
          
            <td>ACCOUNT GRP </td>
            <td> = </td>
            <td className="form-group">  
            {/* <div className="form-group col-md-6 min-height20"> */}
                                        <select className=" form-control select2 "  value={this.state.thresholdData.account_grp} id="account_grp" onChange={(e)=>this.handleChange(e)}>
                                           <option value="">--Select--</option>
                                            <option value="all">All</option>
                                            



                                        </select>
                                    {/* </div> */}
            </td>
           
        </tr>
       
       
    </tbody>
</table>


<div className="row has-shadow mt-3" style={{borderRadius: '1rem', backgroundColor: 'white', marginTop: '5rem',width:'70%',marginLeft: '1%'}}>
                        
                        <button type="button" onClick={() => this.Save()} style={{borderColor: '#303974', marginLeft:'1 %',backgroundColor: '#303974', fontSize: '15px'}}  className="btn btn-primary" >save</button>
                        <div class="divider"/>
                        <button type="button" style={{borderColor: '#303974', marginLeft:'1%',backgroundColor: '#303974', fontSize: '15px'}} className="btn btn-primary" onClick={this.handleReset}>Clear</button>
                        <div class="divider"/>
                        <button type="button" style={{borderColor: '#303974', marginLeft:'1%',backgroundColor: '#303974', fontSize: '15px'}} className="btn btn-primary" onClick={()=>this.viewResult()} >View result</button>
                        <div class="divider"/>
                        <button type="button" style={{borderColor: '#303974', marginLeft:'1%',backgroundColor: '#303974', fontSize: '15px'}} className="btn btn-primary" onClick={()=>this.exportToCSV()}>Export To CSV</button>
                    </div> 
                  
            </div>
            </section>
            </section>
            

            </React.Fragment>
        )
    }
}

export default treshold_Based_Rule

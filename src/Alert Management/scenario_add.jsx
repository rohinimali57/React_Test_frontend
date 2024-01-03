import React, { Component } from 'react'
import Universal from '../common/universal'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import axios from 'axios'
import Swal from 'sweetalert2'
import {applicationContextPath} from '../common/api'
import { ExportToCsv } from 'export-to-csv';

var query = "";
 class scenario_add extends Component {
    constructor(props){
        debugger
        super(props)

        this.state={
         getApiData:[],
         tableList:[],
         columnListLeft:[],
         columnListRight:[],
         tableData:{},
        selectedTable:{
         rightTable:'',
         leftTable:'',
         rightColumn:'',
         leftColumn:""
        },
         baseRuleData:{
           "customer":"",
           "id":"",
           "status":"",
           "scenarioDescription":"",
           "sevrity":""
         },
         queryString:"",
         uiRuleData:{
            id:"",
            UI_Made_Rule:"",
            baseRuleId:"",
            frequence:"",
            sevrity:"",
            bankCode:"",
            status:""
         },
         byProcedure:false,
         byValue:false,
         byTable:false,
         procedureName:"",
         ruleExecutionData:[]

        }
  }

  componentDidMount(){
      debugger
    this.getTable()
    this.getUIRule()
    if(this.props.location.state.uirule==undefined && this.props.location.state.uirule!="UI"){
     this.setState({baseRuleData:this.props.history.location.state})
    }
  }
  
  getBaseUIRule=()=>{
    var token = localStorage.getItem("tokendata")
    var bankCode= localStorage.getItem("bankdata")
    
     const headers = {
       'Content-Type': 'application/json',
       'Authorization': 'Bearer '+token,
       }
   axios.get(applicationContextPath+`/getBaseUIRule`,{headers})
  .then(response => {
   this.setState({baseRuleData:response.data})
  }
  ).catch(error => {
   console.log(error);
  });
  }

  getTable=()=>{

  var token = localStorage.getItem("tokendata")
  var bankCode= localStorage.getItem("bankdata")
  
   const headers = {
     'Content-Type': 'application/json',
     'Authorization': 'Bearer '+token,
     }
 axios.get(applicationContextPath+`/getTablesColumns`,{headers})
.then(response => {
 var data = Object.keys(response.data)
 this.setState({tableList:data,tableData:response.data})
}
).catch(error => {
 console.log(error);
});
}

  Save = (row,cell) => { 
    return(
        Swal.fire({
            title: 'Saved!',
            text: 'Your Data Saved Sucessfully.',
            icon: 'success',
            // showCancelButton: true,
            // confirmButtonText: 'Yes',
            // cancelButtonText: 'No'
          })
        // Swal.fire({
        //     title: 'Are you Want to Save?',
        //     text: '',
        //     icon: 'warning',
        //     showCancelButton: true,
        //     confirmButtonText: 'Yes, Save it!',
        //     cancelButtonText: 'No  '
        //   }).then((result) => {
        //     if (result.value) {
        //       Swal.fire(
        //         'Saved!',
        //         'Your Data  has been Saved.',
        //         'success'
        //       )
        //     // For more information about handling dismissals please visit
        //     // https://sweetalert2.github.io/#handling-dismissals
        //     } else if (result.dismiss === Swal.DismissReason.cancel) {
        //       Swal.fire(
        //         'Cancelled',
        //         ' ',
        //         'error'
        //       )
        //     }
        //   })
    )
}
  backFromSummary() {
    window.history.back();
  }
  SaveApiData = () => { 
    this.props.history.push('/simulate');
  }

  handleLeftTableChange=(e)=>{
debugger
var data = this.state.selectedTable
data[e.target.id] = e.target.value

this.setState({columnListLeft:this.state.tableData[e.target.value], 
selectedTable:data})
  }

  handleRightTableChange=(e)=>{
    var data = this.state.selectedTable
data[e.target.id] = e.target.value

this.setState({columnListRight:this.state.tableData[e.target.value], 
selectedTable:data})  
  }

  handleLeftColumnChange=(e)=>{

       query = query+e.target.value
       this.setState({queryString:query})

      var data = this.state.selectedTable
data[e.target.id] = e.target.value
this.setState({selectedTable:data})
  }

  handleRightColumnChange=(e)=>{
       query = query+e.target.value
       this.setState({queryString:query})

      var data = this.state.selectedTable
data[e.target.id] = e.target.value
this.setState({selectedTable:data})
  }

  changeRuleStatus = (e)=>{
//   var baseRuleData = this.state.baseRuleData
//   baseRuleData[e.target.id] = e.target.value
//  this.setState({baseRuleData:baseRuleData})
var token = localStorage.getItem("tokendata")
  var data = this.state.baseRuleData
  data.bankCode = localStorage.getItem("bankdata")
  data.type= "UI"
//   data.status = e.target.value
   const headers = {
     'Content-Type': 'application/json',
     'Authorization': 'Bearer '+token,
     }
 axios.post(applicationContextPath+`/saveBaseRules`,data,{headers})
.then(response => {
  this.getBaseRuleById(response.data.id)
}
).catch(error => {
 console.log(error);
});
}

changeUIRule=(e)=>{
    debugger
var data = this.state.uiRuleData
data[e.target.id] = e.target.value
this.setState({uiRuleData:data})
}

getBaseRuleById = (id)=>{
  var token = localStorage.getItem("tokendata")
  var bankCode= localStorage.getItem("bankdata")

    var id = id==null ? this.props.history.location.state.id :id
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

  getUIRule=()=>{
debugger
       var token = localStorage.getItem("tokendata")
   var bankCode= localStorage.getItem("bankdata")

    var id = this.props.history.location.state.id
     const headers = {
       'Content-Type': 'application/json',
       'Authorization': 'Bearer '+token,
       }
   axios.get(applicationContextPath+`/getUIRule?bankCode=${bankCode}&base_id=${id}`,{headers})
  .then(response => {
      if(response.data!=""){
    this.setState({uiRuleData:response.data})
      }
  }
  ).catch(error => {
   console.log(error);
  });
  }

  simulateRule=()=>{
      debugger
    var token = localStorage.getItem("tokendata")
 
      var data={}
      data.ui_Made_Rule = this.state.queryString
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token,
        }
    axios.post(applicationContextPath+`/ruleExecutionUI`,data,{headers})
   .then(response => {

    this.setState({ruleExecutionData:response.data})
   }
   ).catch(error => {
    console.log(error);
   }); 
  }

 saveUIRule = (e)=>{
            var token = localStorage.getItem("tokendata")

  var data = {}
  data.id =  this.state.uiRuleData.id
  data.sevrity = this.state.uiRuleData.sevrity
  data.frequence = this.state.uiRuleData.frequence
  data.UI_Made_Rule = this.state.queryString
 data.bankCode = localStorage.getItem("bankdata")
data.baseRuleId = this.state.baseRuleData.id
data.status = this.state.uiRuleData.status

   const headers = {
     'Content-Type': 'application/json',
     'Authorization': 'Bearer '+token,
     }
 axios.post(applicationContextPath+`/saveUIRule`,data,{headers})
.then(response => {
    Swal.fire(response.data);
  this.getUIRule()
}
).catch(error => {
 console.log(error);
});
}


  handleDataChange=(e)=>{
 query = query+e.target.value
this.setState({queryString:query})

  }

handleButtonClick=(value)=>{
    query = query+" "+value+" "
this.setState({queryString:query})
}

procedureSimulation=()=>{

    var token = localStorage.getItem("tokendata")
 
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token,
      }

      const param = new URLSearchParams({
          procedureName: this.state.procedureName
          
      })
  axios.post(applicationContextPath+`/procedureSimulation?`+param,null,{headers})
 .then(response => {

 }
 ).catch(error => {
  console.log(error);
 }); 
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
     
    csvExporter.generateCsv(this.state.ruleExecutionData);
}

handleChange=(e)=>{
  var data = this.state.baseRuleData
  data[e.target.id] = e.target.value  
  this.setState({baseRuleData:data})
}

render(){

      
        const tableList = this.state.tableList.map((item) =>
            <option  value={item}>{item}</option>
        );

        const columnListLeft = this.state.columnListLeft.map((item) =>
            <option  value={item}>{item}</option>
        );

        const columnListRight =  this.state.columnListRight.map((item) =>
            <option  value={item}>{item}</option>
        );
        return (
            <React.Fragment>
           <Universal/>
           <section className="wrapper">
    <div className="row">
           <div className="col-lg-9 main-chart">
           <section className="dashboard-counts no-padding-bottom">
           <div className="container-fluid" style={{marginTop: '-1rem'}}>
           <h1 style={{fontSize: '22px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid #e9ecef'}}>Scenario </h1>
           <div className="container-fluid">

           <div className="content-wrapper">
        
                            <table  align="left" width="135%" border="1px solid black" style={{margin: 20}}>
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
                <td width="23%">{this.state.baseRuleData.id}</td>
                <td width="40%">              
                  <div className="form-group col-md-6 min-height20">
                    <input type="text" id="scenarioDescription" value={this.state.baseRuleData.scenarioDescription} className="form-control select2 " onChange={(e)=>this.handleChange(e)}/>
                     </div>
                     </td>
                <td width="18%">
                <input type="text"  value={this.state.baseRuleData.customer} className="form-control select2 " id="customer" onChange={(e)=>this.handleChange(e)}/>
                </td>
                <td width="30%">
                <div className="form-group col-md-6 min-height20">
                    <select className="form-control select2 " id="status" onChange={(e)=>this.handleChange(e)} value={this.state.baseRuleData.status!=""?this.state.baseRuleData.status :this.props.history.location.state.status}>
                        {/* <option value="">Select Frequency</option> */}
                    <option value="">--Select--</option>
                     <option value="Active">Active</option>
                     <option value="In-Active">In-Active</option>  
                    </select>
                     </div>
                </td>
            </tr>
        </tbody>
    </table>

        <Tabs>
        <section className="content">
            <div className="row">
            <div className="col-xs-12 col-xs-12 margin-top-minus15">
            <div className="nav-tabs-custom">
            <div className=" pull-left" >
                    <div className="row">
                    {/* <button type="button" id="Save"  style={{borderColor: '#303974', backgroundColor: '#303974', fontSize: '15px',marginLeft:35}}  className="btn btn-primary " onClick={() => this.Save()}>Save</button> */}

            <button type="button" id="Save"  style={{borderColor: '#303974', backgroundColor: '#303974', fontSize: '15px'}} className="btn btn-primary" onClick={()=>this.changeRuleStatus()} >Save</button>
            </div>
            </div>
            {/* <TabList style={{ backgroundColor: '#ecf0f5' }} >
            <Tab activeTabPanelClassName="active" id="CompanyDetailsTab" >ADD/UPDATE</Tab>
            </TabList> */}
            {/* <TabPanel> */}
                <br></br>
                <section className=" content-header">
                    <table  align="left" width="142%" border="1px solid black" >
                        <thead>
                            <tr style={{textAlign: 'center', color: 'white', background: '#94D1D4'}}>
                               <th colspan="4">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                           

                            <tr>
                                <td>
                                Status
                                </td>
                                <td>
                                    <div className="form-group col-md-6 min-height20">
                                        <select className="form-control select2 " id="status" onChange={(e)=>this.changeUIRule(e)}  value={this.state.uiRuleData.status}>
                                        <option value="">--Select--</option>
                                        <option value="Active">Active</option>
                                        <option value="In-Active">In-Active</option>  
                                        </select>
                                    </div>
                                </td>
                                <td>
                                    Rule Risk Severity
                                </td>
                                <td>
                                    <div className="form-group col-md-6 min-height20">
                                        <select className="form-control select2 " id="sevrity" onChange={(e)=>this.changeUIRule(e)}  value={this.state.uiRuleData.sevrity}>
                                            <option value="">--Select--</option>
                                            <option value="medium">Medium</option>
                                            <option value="low">Low</option>
                                            <option value="high">High</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-md-6 min-height20">
                                        <select className="form-control select2 " id="frequence" onChange={(e)=>this.changeUIRule(e)}  value={this.state.uiRuleData.frequence}>
                                        {/* <option value="">Select Frequency</option> */}
                                            <option value="">--Select--</option>
                                            <option value="Daily">Daily</option>
                                            <option value="Weekly">Weekly</option>
                                            <option value="Fortnightly">Fortnightly</option>
                                            <option value="Monthly">Monthly</option>
                                            <option value="Quarterly">Quarterly</option>
                                        </select>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>  
                </section>  
                 
                <div class="divider"/>
<br></br>
               

                <section className=" content-header">
                
                <div className="col-md-18 col-xs-12 pull-left no-L-padding" 
                    style={{ border: '2px solid #C8D0F0', width: '142%' }}>

                   <div style={{color:'white', background:'#94D1D4'}}>selections</div>
                   <div className="row">

                    <div className="col-md-2">
                        <label ><b>Left Entity</b></label>
                    </div>
                    <div className="form-group col-md-2 min-height80">
                        <label htmlFor="botImage">Alert Category</label>
                        <select className="form-control select2 " id="leftTable" value={this.state.selectedTable.leftTable} onChange={(e)=>this.handleLeftTableChange(e)}>
                            <option value="">--Select Table--</option>
                            {tableList}
                        </select>
                    </div> 
                    <div className="form-group col-md-2 min-height80">
                        <label htmlFor="botImage">Alert Sub Category</label>
                        <select className="form-control select2 " id="leftColumn" value={this.state.selectedTable.leftColumn} onChange={(e)=>this.handleLeftColumnChange(e)}>
                            <option value="">--Select Column--</option>
                          {columnListLeft}
                        </select>
                    </div>
                    <div className="form-group col-md-2 min-height80">
                        <label htmlFor="botImage">Customer Risk</label>
                        <select className="form-control select2 " id="keyword" onChange={(e)=>this.handleDataChange(e)}>
                            <option value="">--Select--</option>
                            <option value="Avg">Avg</option>
                            <option value="Sum">Sum</option>
                            <option value="Count">Count</option>

                        </select>
                    </div>
                    <div className="form-group col-md-2 min-height80">
                        <label htmlFor="botImage">Customer Risk</label>
                        <select className="form-control select2 " id="operator"  onChange={(e)=>this.handleDataChange(e)}>
                            <option value="">--Operators--</option>
                            <option value=">">&gt;</option>
                            <option value="=">=</option>
                            <option value="!=">!=</option>
                            <option value="+">+</option>
                            <option value="<">&lt;</option>
                            <option value=")">)</option>
                            <option value="(">(</option>
                        </select>
                    </div>
</div>

                    <div className="form-group col-md-2 min-height80"></div>
                    <div className="row">

                    <div className="col-md-2">
                        <label ><b>Right Entity</b></label>
                    </div>
                    
                    <div className="form-group col-md-10 min-height80">
                        <input type="radio" name="rightEntity" onClick={()=>this.setState({byTable:false, byProcedure:false, byValue:true})} />
                        <input type="text" onBlur={(e)=>this.handleDataChange(e)} disabled={this.state.byValue==true?false:true}/>
                        {/* <button type="button" >...</button> */}
                        {/* <input type="text" />
                        <input type="text" />
                        <button type="button" >...</button>
                        <input type="text" value="Use delimeter ~"/> */}
                        (*Constant compare)
                    </div> 
</div>
<div className="row">
                    <div className="col-md-2"/>
                    <div className="form-group col-md-1 min-height80">
                        <input type="radio"  name="rightEntity" onClick={()=>this.setState({byValue:false, byProcedure:false, byTable:true})} /></div>
                    <div className="form-group col-md-2 min-height80">
                        <select className="form-control select2 " id="rightTable" value={this.state.selectedTable.rightTable} onChange={(e)=>this.handleRightTableChange(e)} disabled={this.state.byTable==true?false:true}>
                            <option value="">--Select Table--</option>
                           {tableList}
                        </select>
                    </div>
                    <div className="form-group col-md-2 min-height80">
                        <select className="form-control select2 " value={this.state.selectedTable.rightColumn} onChange={(e)=>this.handleRightColumnChange(e)} id="rightColumn" disabled={this.state.byTable==true?false:true}>
                            <option value="">--Select Column--</option>
                                {columnListRight}
                        </select>
                    </div>
                    <div>(Column compare)</div> 
                    </div>
                    
                    <div className="form-group col-md-5 min-height80"></div>
                    <div className="row">
                    <div className="col-md-2"/>
                    <div className="form-group col-md-1 min-height80">
                        <input type="radio"  name="rightEntity" onClick={()=>this.setState({byTable:false, byValue:false, byProcedure:true})} />
                        </div>
                        
                    <div className="form-group col-md-2 min-height80">
                    <div className="page-head-text">Stored Procedure </div>

                    <textarea id="w3mission" rows="4" cols="50" disabled={this.state.byProcedure==true?false:true} onChange={(e)=>this.setState({procedureName:e.target.value})}>
                    </textarea>
                    </div>
                    </div>
                   
                    
                    <div className="form-group col-md-3 min-height80"></div>
                    <div className=" pull-right" >
                    <div className="row">
                    <button type="button" id="Save"  style={{borderColor: '#303974', backgroundColor: '#303974', fontSize: '15px'}} className="btn btn-primary" onClick={()=>this.procedureSimulation()}>ADD</button> 
                    </div>
                    </div>
                </div>
                </section>
                <br></br>

                <div className="row"/>

                <section className=" content-header">
                
                <div className="col-md-18 col-xs-12 pull-left no-L-padding" 
                    style={{ border: '2px solid #C8D0F0', width: '142%' }}>

                   <div style={{color:'white', background:'#94D1D4'}}>Condition(s)</div>

                    <div className="col-md-6">
                        <br></br>
                    <textarea className="form-control1" type="text" value={this.state.queryString}
   rows="6" cols="80" >
                        </textarea>
                    </div>
                    <br></br><br></br>
                    <div className="row">
                        
                        <button type="button" id="Save"  style={{borderColor: '#303974', backgroundColor: '#303974', fontSize: '15px'}} className="btn btn-primary" onClick={()=>this.handleButtonClick("and")} >AND</button>
                        <div class="divider"/>
                        <button type="button" id="Save"  style={{borderColor: '#303974', backgroundColor: '#303974', fontSize: '15px'}} className="btn btn-primary" onClick={()=>this.handleButtonClick("or")}>OR</button>
                    </div>    
                <br></br>    
                </div>
                </section>
                <br></br>
                <div class="divider"/>
                <div className=" pull-right" >
                <div className="row" style={{marginLeft:'-51%'}}>
                        <button type="button" id="Save"  style={{borderColor: '#303974', backgroundColor: '#303974', fontSize: '15px'}} onClick={() => this.saveUIRule()}  className="btn btn-primary" >Save</button>
                        <div class="divider"/>
                        <button type="button" id="Save"  style={{borderColor: '#303974', backgroundColor: '#303974', fontSize: '15px'}} className="btn btn-primary" >Clear</button>
                        <div class="divider"/>
                        <button type="button" id="Save"  style={{borderColor: '#303974', backgroundColor: '#303974', fontSize: '15px'}} className="btn btn-primary" onClick={() => this.simulateRule()} >Simulate</button>
                        </div>
                        <div class="divider"/>
                        <button type="button" id="Save"  style={{borderColor: '#303974', backgroundColor: '#303974', fontSize: '15px',marginLeft:-80}} className="btn btn-primary" onClick={()=>this.exportToCSV()}>Export To CSV</button>
                        </div>
                    

            {/* </TabPanel> */}
            </div>

            </div>
            </div>           
        </section>
        </Tabs>
        </div>
        </div>
        </div>
        </section>
        </div>
        </div>
        </section>
    </React.Fragment>
    )
    }
}

export default scenario_add

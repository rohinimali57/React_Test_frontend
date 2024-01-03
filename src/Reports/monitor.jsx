import React, { Component } from 'react'
import Universal from '../common/universal'
import { Tab, Tabs, TabList } from 'react-bootstrap'
import Swal from 'sweetalert2'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import Travel_Logs from '../Reports/travel_logs'
import {applicationContextPath} from '../common/api'
import axios from 'axios'

 class monitor extends Component {
 
    constructor(props){
        super(props)

        this.state={
          savebutton: true,
          updatebutton: false,
         getApiData:[],
         monitor:{
          "receivedOn":"",
          "terminalId":"",
          "merchantName":"",
          "cppDate":"",
          "merchantLocation":"",
          "identifiedDate":"",
          "mcc":"",
          "fraudLocation":"",
          "acquirerBank":"",
          "detectionSource":"",
          "merchantIdNo":"",
          "ipAddress":"",
 }
        }
  }
  componentDidMount() {
     this.getMonitoring();
   
  }
  savenoiseword = async()  => {
    debugger
    var monitor = this.state.monitor
   // savenoiseword.noiseword=this.state.botapidata.noiseword
    var bankcode = (localStorage.getItem("bankdata"))
    var token = (localStorage.getItem("tokendata"))
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token,
      'bankCode': bankcode,
      //'branchcode': 'A1000-01',
      // 'currentdate': this.state.date,
      // 'defaultlang': 'Eng',
      // 'currancy': 'INR',
      // 'userid': '101'
    }
    if(this.state.monitor.receivedOn==null||this.state.monitor.receivedOn==""||this.state.monitor.receivedOn==undefined)
    {
      Swal.fire("please Enter Value in Received On");
      return
    }
    if(this.state.monitor.terminalId==null||this.state.monitor.terminalId==""||this.state.monitor.terminalId==undefined)
    {
      Swal.fire("please Enter Value in Terminal Id");
      return
    }
    if(this.state.monitor.terminalId==null||this.state.monitor.terminalId==""||this.state.monitor.terminalId==undefined)
    {
      Swal.fire("please Enter Value in Terminal Id");
      return
    }
    if(this.state.monitor.merchantName==null||this.state.monitor.merchantName==""||this.state.monitor.merchantName==undefined)
    {
      Swal.fire("please Enter Value in Merchant Name");
      return
    }
    if(this.state.monitor.cppDate==null||this.state.monitor.cppDate==""||this.state.monitor.cppDate==undefined)
    {
      Swal.fire("please Enter Cpp Date");
      return
    }
    if(this.state.monitor.merchantLocation==null||this.state.monitor.merchantLocation==""||this.state.monitor.merchantLocation==undefined)
    {
      Swal.fire("please Enter Merchant Location");
      return
    }
    if(this.state.monitor.identifiedDate==null||this.state.monitor.identifiedDate==""||this.state.monitor.identifiedDate==undefined)
    {
      Swal.fire("please Enter identified Date");
      return
    }
    if(this.state.monitor.mcc==null||this.state.monitor.mcc==""||this.state.monitor.mcc==undefined)
    {
      Swal.fire("please Enter Mcc");
      return
    }
    if(this.state.monitor.fraudLocation==null||this.state.monitor.fraudLocation==""||this.state.monitor.fraudLocation==undefined)
    {
      Swal.fire("please Enter fraud Location");
      return
    }
    if(this.state.monitor.acquirerBank==null||this.state.monitor.acquirerBank==""||this.state.monitor.acquirerBank==undefined)
    {
      Swal.fire("please Enter Acquirer Bank");
      return
    }
    if(this.state.monitor.detectionSource==null||this.state.monitor.detectionSource==""||this.state.monitor.detectionSource==undefined)
    {
      Swal.fire("please Enter Detection Source");
      return
    }
    if(this.state.monitor.merchantIdNo==null||this.state.monitor.merchantIdNo==""||this.state.monitor.merchantIdNo==undefined)
    {
      Swal.fire("please Enter merchantIdNo ");
      return
    }
    if(this.state.monitor.ipAddress==null||this.state.monitor.ipAddress==""||this.state.monitor.ipAddress==undefined)
    {
      Swal.fire("please Enter ipAddress ");
      return
    }
 axios.post( applicationContextPath+'/saveMonitoring',monitor,{headers:headers})
 .then(response => {
  Swal.fire({
    title: 'Submitted!',
    text: 'Your Data Submitted Sucessfully.',
    icon: 'success',
  })
  this.getMonitoring()
  
   this.setState({  
    monitor:{
      "receivedOn":"",
      "terminalId":"",
      "merchantName":"",
      "cppDate":"",
      "merchantLocation":"",
      "identifiedDate":"",
      "mcc":"",
      "fraudLocation":"",
      "acquirerBank":"",
      "detectionSource":"",
      "merchantIdNo":"",
      "ipAddress":"",
}
   
  })
 }
).catch(error => {
   console.log(error);
});
  }
  
  getMonitoring(urlQuery){
    debugger
    var token = (localStorage.getItem("tokendata"))
    var bankCode =localStorage.getItem("bankdata")
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token,
      //'bankCode': bankCode,
      }
  
    axios.get( applicationContextPath+`/getMonitoring?bankCode=${bankCode}`,{headers})
  .then(response => {
    this.setState({getApiData:response.data})
  }

).catch(error => {
    console.log(error);
});

}
updatenoiseword = async () => {
  debugger
  var Updatemonitor = this.state.monitor;
  var bankcode = (localStorage.getItem("bankdata"))
  var token = (localStorage.getItem("tokendata"))

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+token,
    'bankCode': bankcode,
    // 'currentdate': this.state.date,
    // 'defaultlang': 'Eng',
    // 'currancy': 'INR',
    // 'userid': '101'
  }
    
  axios.post( applicationContextPath+'/updateMonitoring',Updatemonitor,{headers:headers})
  .then(response => {
    
    this.getMonitoring()
    Swal.fire({
      title: 'Updated!',
      text: 'Your Data Updated Sucessfully.',
      icon: 'success',
    
    })
    this.setState({  
      botapidata:{
        "noiseword" :"",
        
     
      }, updatebutton: false, savebutton: true
    
   })
  }
 ).catch(error => {
    console.log(error);
 });
}
handleChange= (e)=> {  
  var monitor1 = this.state.monitor
  monitor1[e.target.id] = e.target.value
  this.setState({monitor:monitor1});  
  }
  editApiData = (row, cell) => {
    debugger
    console.log("In Edit", row);
    this.setState({ monitor: cell, savebutton: false, updatebutton: true })
  }
  deleteNoiseWord = async (row, cell) => {
    debugger
    var id = {}
    id.id =cell.id
    console.log("In Edit", id);
    var token = (localStorage.getItem("tokendata"))
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token,
    }
    axios.post( applicationContextPath+'/deleteMonitoring',id,{headers:headers})
    .then(response => {
      
      this.getMonitoring()
      Swal.fire({
        title: 'Deleted!',
        text: 'Your Data Deleted Sucessfully.',
        icon: 'success', 
      })
     
    }
   ).catch(error => {
      console.log(error);
   });
  }
  handleClear = () => {
    debugger
    this.setState({
      monitor:{
        "receivedOn":"",
        "terminalId":"",
        "merchantName":"",
        "cppDate":"",
        "merchantLocation":"",
        "identifiedDate":"",
        "mcc":"",
        "fraudLocation":"",
        "acquirerBank":"",
        "detectionSource":"",
        "merchantIdNo":"",
        "ipAddress":"",
  }, updatebutton: false, savebutton: true

    })
  }
  actionMethod = (row,cell) => {

    return (
        < React.Fragment>
            <div >
              <i class="fa fa-edit" aria-hidden="true" title="Edit" style={{color:"blue"}} onClick={() => this.editApiData(row,cell)} ></i>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             <i class="fa fa-trash" aria-hidden="true" title="Delete" style={{color:"red"}} onClick={() => this.deleteNoiseWord(row,cell)} ></i>
           </div>
    
        </React.Fragment>
    )
    }
render() {
  console.log("monitor",this.state.monitor)

    return (
  
            <React.Fragment>
            <Universal/>
            <section id="main-content">
    <section className="wrapper">
      <div className="row">
        <div className="col-lg-9 main-chart">
          <section className="dashboard-counts no-padding-bottom">
          <div className="container-fluid" style={{marginTop: '-1rem'}}>
          <div className="App">

          <h1 style={{position: 'absolute', fontSize: '25px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD'}}>Monitoring </h1>
          <Tabs border="2px solid black"  role="tablist" style={{paddingLeft: '66%'}} defaultActiveKey="home" id="uncontrolled-tab-example">
              {/* <TabList border="2px solid black"className="dashnav nav nav-tabs" role="tablist" style={{paddingLeft: '66%'}}  >
                                 <Tab id="compromisedPoint" style={{ backgroundColor: '#ecf0f5' }}>Compromised Point</Tab> 

                                 <Tab id="travelLog" >Travel Log</Tab> 
                                </TabList> */}
                                 <Tab eventKey="home" title="Compromised Point" >
                                 <div className="container-fluid">
                <div className="row bg-blue has-shadow mt-3" style={{borderRadius: '1rem'}}>
                  <div className="col-12 col-md-2 col-lg-2 rightCol">
                    <p  style={{fontWeight:"bolder",color:"white",fontSize:"15px"}}>Recieved On<span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" >
                    <div className="form-group">
                    <input type="text" value={this.state.monitor.receivedOn!==""?this.state.monitor.receivedOn:""}  id="receivedOn" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }}  onChange={this.handleChange} />
                    </div>
                  </div>

                  <div className="col-11  col-lg-2 rightCol">
                    <p style={{fontWeight:"bolder",color:"white",fontSize:"15px"}} className="">Terminal Id No<span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" >
                    <div className="form-group">
                    <input type="text" value={this.state.monitor.terminalId!==""?this.state.monitor.terminalId:""}  id="terminalId" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                    onChange={this.handleChange}  />
                    </div>
                     </div>
                     
                    <div className="col-11  col-lg-2 rightCol">
                    <p style={{marginTop: '1rem',fontWeight:"bolder",color:"white",fontSize:"15px"}} className="">Merchant Name<span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '1rem'}}>
                    <div className="form-group">
                    <input type="text" value={this.state.monitor.merchantName!==""?this.state.monitor.merchantName:""}  id="merchantName" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                    onChange={this.handleChange}  />
                    </div>
                    </div>

                    <div className="col-11  col-lg-2 rightCol">
                    <p style={{marginTop: '1rem',fontWeight:"bolder",color:"white",fontSize:"15px"}} className="">CPP Date<span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '1rem'}}>
                    <div className="form-group">
                    <input type="date" value={this.state.monitor.cppDate!==""?this.state.monitor.cppDate:""}  id="cppDate" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                    onChange={this.handleChange} />
                    </div>
                    </div>

                    <div className="col-11  col-lg-2 rightCol">
                    <p style={{marginTop: '1rem',fontWeight:"bolder",color:"white",fontSize:"15px"}} className="">Merchant Location<span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '1rem'}}>
                    <div className="form-group">
                    <input type="text" value={this.state.monitor.merchantLocation!==""?this.state.monitor.merchantLocation:""}  id="merchantLocation" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                    onChange={this.handleChange} />
                    </div>
                    </div>

                    <div className="col-11  col-lg-2 rightCol">
                    <p style={{marginTop: '1rem',fontWeight:"bolder",color:"white",fontSize:"15px"}} className="">Date Identified<span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '1rem'}}>
                    <div className="form-group">
                    <input type="date" value={this.state.monitor.identifiedDate!==""?this.state.monitor.identifiedDate:""}  id="identifiedDate" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                    onChange={this.handleChange}  />
                    </div>
                    </div>

                    <div className="col-11  col-lg-2 rightCol">
                    <p style={{marginTop: '0rem',fontWeight:"bolder",color:"white",fontSize:"15px"}} className="">MCC<span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '0rem'}}>
                    <div className="form-group">
                    <input type="text" value={this.state.monitor.mcc!==""?this.state.monitor.mcc:""}  id="mcc" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                    onChange={this.handleChange}  />
                    </div>
                    </div>

                    <div className="col-11  col-lg-2 rightCol">
                    <p style={{marginTop: '0rem',fontWeight:"bolder",color:"white",fontSize:"15px"}} className="">Fraud Location <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '0rem'}}>
                    <div className="form-group">
                    <input type="text" value={this.state.monitor.fraudLocation!==""?this.state.monitor.fraudLocation:""}  id="fraudLocation" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                    onChange={this.handleChange} />
                    </div>
                    </div>

                    <div className="col-11  col-lg-2 rightCol">
                    <p style={{marginTop: '1rem',fontWeight:"bolder",color:"white",fontSize:"15px"}} className="">Acquirer Bank Name<span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '1rem'}}>
                    <div className="form-group">
                    <input type="text" value={this.state.monitor.acquirerBank!==""?this.state.monitor.acquirerBank:""}  id="acquirerBank" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                    onChange={this.handleChange} />
                    </div>
                    </div>

                    <div className="col-11  col-lg-2 rightCol">
                    <p style={{marginTop: '1rem',fontWeight:"bolder",color:"white",fontSize:"15px"}} className="">Detection Source<span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '1rem'}}>
                    <div className="form-group">
                    <input type="text" value={this.state.monitor.detectionSource!==""?this.state.monitor.detectionSource:""}  id="detectionSource" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                    onChange={this.handleChange}  />
                    </div>
                    </div>

                    <div className="col-11  col-lg-2 rightCol">
                    <p style={{marginTop: '0rem',fontWeight:"bolder",color:"white",fontSize:"15px"}} className="">Merchant Id Number<span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '0rem'}}>
                    <div className="form-group">
                    <input type="text" value={this.state.monitor.merchantIdNo!==""?this.state.monitor.merchantIdNo:""}  id="merchantIdNo" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                    onChange={this.handleChange}  />
                    </div>
                    </div>

                    <div className="col-11  col-lg-2 rightCol">
                    <p style={{marginTop: '0rem',fontWeight:"bolder",color:"white",fontSize:"15px"}} className="">IP Address<span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '0rem'}}>
                    <div className="form-group">
                    <input type="text" value={this.state.monitor.ipAddress!==""?this.state.monitor.ipAddress:""}  id="ipAddress" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                    onChange={this.handleChange} />
                    </div>
                    </div>
                    
                    
                   
                   
                    <div className="row pull-right" style={{marginLeft: '41rem',marginTop: '-1rem'}}>
                                                               
                                                             
                                                            
                                                              <div className="pr-3">
                                                                <button type="button" className="btn btn-primary " onClick={() => this.handleClear()} style={{float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px'}  }>Reset</button>
                                                              </div>
                                                              <div className="pr-3" >
                                                              {this.state.savebutton === true ? 
                                                <button type="button" className="btn btn-primary " style={{float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px'}} id="Save" onClick={() => this.savenoiseword()}
                                                >Save</button>:""}
                                                 {this.state.updatebutton === true ?
                                                  <button type="button" className="btn btn-primary " style={{float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px'}} id="Save" onClick={() => this.updatenoiseword()}
                                                  >Update</button>:""}
                                                </div>

                                                            </div>
                  </div>
                </div>

                <div className="row has-shadow mt-3" style={{borderRadius: '1rem',width:'96%',marginLeft:'2%', backgroundColor: 'white', marginTop: '5rem'}}>
              <div className="col-12 col-md-2 col-lg-2 rightCol">
                        <h4 className="searchFilter " style={{fontFamily: 'LATO-BOLD', color: '#303974'}}></h4>
                        <p  style={{marginTop: '2.2rem',fontWeight:"bolder",fontSize:"15px"}}>From Date</p>
                        </div>
                        <div className="col-12 col-md-3" style={{marginTop: '2rem'}}>
                        <div className="form-group">
                        <input className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 1px)', marginLeft: '-3rem',backgroundColor: "#ebebeb" }} 
                       id="fromdate" type="date" onChange={this.handleChange} />
                        </div>
                        </div>

                        <div className="col-11  col-lg-2 rightCol">
                        <p style={{marginTop: '31.8%',fontWeight:"bolder",fontSize:"15px",marginLeft:'-8px'}} className="">To Date</p>
                        </div>
                        <div className="col-12 col-md-3" style={{marginTop: '2rem'}}>
                        <div className="form-group">
                        <input  className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"  style={{ height: 'calc(1em + 0.75rem + 1px)', marginLeft: '-4rem',backgroundColor: "#ebebeb" }} 
                        id="tilldate" type="date" onChange={this.handleChange}/>
                        </div>
                        </div>

                        <div >
                      < button type="button" style={{marginTop: '-5rem',marginLeft: '44.8rem',borderColor: '#303974', backgroundColor: '#303974', fontSize: '15px'}} id="Reset" 
                        className="btn btn-primary">Search</button>
                        </div>
                          
               </div>
               <div className="row has-shadow mt-3" style={{borderRadius: '1rem',width:'103%',marginLeft:'1%', backgroundColor: 'white', marginTop: '5rem'}}>
          
                       <div class="react-bs-table-container" >
                           <BootstrapTable striped hover
                    data={this.state.getApiData}
                   pagination={true}
                   // search
                    ClearSearchButton
                  // exportCSV
                  >
                    <TableHeaderColumn dataField="merchantIdNo"  dataFormat={this.infoRecieptDate} csvHeader="Last Name" isKey={true} className={"columnHeaderColor"} dataSort={true}
                      expandable={false} editable={false} width="130px" >Info Receipt Date</TableHeaderColumn>
                    <TableHeaderColumn dataField="merchantName" dataFormat={this.merchantName}  csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                      expandable={false} editable={false} width="130px">Merchant Name</TableHeaderColumn>
                       {/* <TableHeaderColumn dataField="fraudLocation" dataFormat={this.location} csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                      expandable={false} editable={false} >Location</TableHeaderColumn> */}
                       <TableHeaderColumn dataField="mcc" dataFormat={this.MCC} csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                      expandable={false} editable={false}width="130px" >MCC</TableHeaderColumn>
                       {/* <TableHeaderColumn dataField="Edit" dataFormat={this.acquirer} csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                      expandable={false} editable={false} >Acquirer</TableHeaderColumn> */}
                       <TableHeaderColumn dataField="cppDate" dataFormat={this.cppDate} csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                      expandable={false} editable={false} width="130px" >CPP Date</TableHeaderColumn>
                       <TableHeaderColumn dataField="identifiedDate" dataFormat={this.dateIdentified} csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                      expandable={false} editable={false} width="130px" >Date Identified</TableHeaderColumn>
                   
                    <TableHeaderColumn dataFormat={this.fraudLocation} width="130px" dataField="fraudLocation" expandable={false} editable={false} > Fraud Location</TableHeaderColumn>
                    <TableHeaderColumn dataField="conversionFactor" csvHeader="First Name" className={"columnHeaderColor"}
                          expandable={false} width="130px"  dataFormat={this.actionMethod} editable={false} >Action</TableHeaderColumn>
                  </BootstrapTable>
                  </div>
                  
                 
                   
                     
                          
                    </div>
                                    </Tab>
          
               
                                    <Tab eventKey="profile" title="pagination={true}">
             <Travel_Logs/>

             </Tab>
             </Tabs>
             </div>

           </div>
          </section>
          
          {/* /row */}
        </div>
        {/* /col-lg-3 */}
      </div>
      {/* /row */}
    </section>
  </section>
        </React.Fragment>
        )
    }
}

export default monitor

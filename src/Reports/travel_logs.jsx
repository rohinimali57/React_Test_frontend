import React, { Component } from 'react'
import Universal from '../common/universal'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import Swal from 'sweetalert2'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import {applicationContextPath} from '../common/api'
import axios from 'axios'

class travel_logs extends Component {
    
    constructor(props){
        super(props)

        this.state={
          savebutton: true,
          updatebutton: false,
         getApiData:[],
         travel:{
          "travelDateFrom":"",
          "traveDateTo":"",
          "customerNo":"",
          "customerName":"",
          "primaryCardholderName":"",
          "primaryCardholderNo":"",
          "travelLocation":"",
          "travelDateTo":"",
          "specialInstructions":"",
          "travelPurpose":"",
          "limitTransaction":"",
 }
        }
  }
  componentDidMount() {
    this.getTravel();
  
 }
  savenoiseword = async()  => {
    debugger
    var monitor = this.state.travel
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
    if(this.state.travel.travelDateFrom==null||this.state.travel.travelDateFrom==""||this.state.travel.travelDateFrom==undefined)
    {
      Swal.fire("please Enter Value in Received On");
      return
    }
    if(this.state.travel.traveDateTo==null||this.state.travel.traveDateTo==""||this.state.travel.traveDateTo==undefined)
    {
      Swal.fire("please Enter Value in Terminal Id");
      return
    }
   
    if(this.state.travel.customerNo==null||this.state.travel.customerNo==""||this.state.travel.customerNo==undefined)
    {
      Swal.fire("please Enter Value in Merchant Name");
      return
    }
    if(this.state.travel.customerName==null||this.state.travel.customerName==""||this.state.travel.customerName==undefined)
    {
      Swal.fire("please Enter Cpp Date");
      return
    }
    if(this.state.travel.primaryCardholderName==null||this.state.travel.primaryCardholderName==""||this.state.travel.primaryCardholderName==undefined)
    {
      Swal.fire("please Enter Merchant Location");
      return
    }
    if(this.state.travel.primaryCardholderNo==null||this.state.travel.primaryCardholderNo==""||this.state.travel.primaryCardholderNo==undefined)
    {
      Swal.fire("please Enter identified Date");
      return
    }
    if(this.state.travel.travelLocation==null||this.state.travel.travelLocation==""||this.state.travel.travelLocation==undefined)
    {
      Swal.fire("please Enter Mcc");
      return
    }
    if(this.state.travel.travelDateTo==null||this.state.travel.travelDateTo==""||this.state.travel.travelDateTo==undefined)
    {
      Swal.fire("please Enter fraud Location");
      return
    }
    if(this.state.travel.specialInstructions==null||this.state.travel.specialInstructions==""||this.state.travel.specialInstructions==undefined)
    {
      Swal.fire("please Enter Acquirer Bank");
      return
    }
    if(this.state.travel.travelPurpose==null||this.state.travel.travelPurpose==""||this.state.travel.travelPurpose==undefined)
    {
      Swal.fire("please Enter Detection Source");
      return
    }
    if(this.state.travel.limitTransaction==null||this.state.travel.limitTransaction==""||this.state.travel.limitTransaction==undefined)
    {
      Swal.fire("please Enter merchantIdNo ");
      return
    }
  
 axios.post( applicationContextPath+'/saveTravelLogMst',monitor,{headers:headers})
 .then(response => {
  Swal.fire({
    title: 'Submitted!',
    text: 'Your Data Submitted Sucessfully.',
    icon: 'success',
  })
  this.getTravel()
  
   this.setState({  
    travel:{
      "travelDateFrom":"",
      "traveDateTo":"",
      "customerNo":"",
      "customerName":"",
      "primaryCardholderName":"",
      "primaryCardholderNo":"",
      "travelLocation":"",
      "travelDateTo":"",
      "specialInstructions":"",
      "travelPurpose":"",
      "limitTransaction":"",
}
   
  })
 }
).catch(error => {
   console.log(error);
});
  }
  
  getTravel(urlQuery){
    debugger
    var token = (localStorage.getItem("tokendata"))
    var bankCode =localStorage.getItem("bankdata")
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token,
      //'bankCode': bankCode,
      }
  
    axios.get( applicationContextPath+`/getTravelLogByBankCode?bankCode=${bankCode}`,{headers})
  .then(response => {
    this.setState({getApiData:response.data})
  }

).catch(error => {
    console.log(error);
});

}
updatenoiseword = async () => {
  debugger
  var Updatemonitor = this.state.travel;
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
    
  axios.post( applicationContextPath+'/updateTravelLogMst',Updatemonitor,{headers:headers})
  .then(response => {
    Swal.fire({
      title: 'Updated!',
      text: 'Your Data Updated Sucessfully.',
      icon: 'success',
    
    })
    this.getTravel()
   // Alert.success(" Record Added Sucessfully",{ position: 'top' })
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
editApiData = (row, cell) => {
  debugger
  console.log("In Edit", row);
  this.setState({ travel : cell, savebutton: false, updatebutton: true })
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
  axios.post( applicationContextPath+'/deleteTravelLog',id,{headers:headers})
  .then(response => {
    Swal.fire({
      title: 'Deleted!',
      text: 'Your Data Deleted Sucessfully.',
      icon: 'success', 
    })
    this.getTravel()
   // Alert.success(" Record Added Sucessfully",{ position: 'top' })
   
  }
 ).catch(error => {
    console.log(error);
 });
}
handleClear = () => {
  debugger
  this.setState({
    travel:{
      "travelDateFrom":"",
      "traveDateTo":"",
      "customerNo":"",
      "customerName":"",
      "primaryCardholderName":"",
      "primaryCardholderNo":"",
      "travelLocation":"",
      "travelDateTo":"",
      "specialInstructions":"",
      "travelPurpose":"",
      "limitTransaction":"",
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
  handleChange= (e)=> {  
    var travel1 = this.state.travel
    travel1[e.target.id] = e.target.value
    this.setState({travel:travel1});  
    }
    render() {
      console.log(":travel",this.state.travel)
        return (
            <React.Fragment>
            <Universal/>
            <form>
<div className="container-fluid">
                <div className="row bg-blue has-shadow mt-3" style={{borderRadius: '1rem'}}>
                  <div className="col-12 col-md-2 col-lg-2 rightCol">
                    <p  style={{fontWeight:"bolder",color:"white",fontSize:"15px"}}>Travel Date From<span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" >
                    <div className="form-group">
                    <input type="date" value={this.state.travel.receivedOn!==""?this.state.travel.travelDateFrom:""} id="travelDateFrom" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }}  onChange={this.handleChange} />
                    </div>
                  </div>

                  <div className="col-11  col-lg-2 rightCol">
                    <p style={{fontWeight:"bolder",color:"white",fontSize:"15px"}} className="">Travel Date To<span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" >
                    <div className="form-group">
                    <input type="date"  value={this.state.travel.traveDateTo!==""?this.state.travel.traveDateTo:""}  id="traveDateTo" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                    onChange={this.handleChange}  />
                    </div>
                     </div>
                     
                    <div className="col-11  col-lg-2 rightCol">
                    <p style={{marginTop: '0rem',fontWeight:"bolder",color:"white",fontSize:"15px"}} className="">Customer No<span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '0rem'}}>
                    <div className="form-group">
                    <input type="text"  value={this.state.travel.customerNo!==""?this.state.travel.customerNo:""}  id="customerNo" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                    onChange={this.handleChange}  />
                    </div>
                    </div>

                    <div className="col-11  col-lg-2 rightCol">
                    <p style={{marginTop: '0rem',fontWeight:"bolder",color:"white",fontSize:"15px"}} className="">Customer Name<span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '0rem'}}>
                    <div className="form-group">
                    <input type="text"  value={this.state.travel.customerName!==""?this.state.travel.customerName:""}  id="customerName" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                    onChange={this.handleChange} />
                    </div>
                    </div>

                    <div className="col-11  col-lg-2 rightCol">
                    <p style={{marginTop: '0rem',fontWeight:"bolder",color:"white",fontSize:"15px"}} className="">Primary Cardholder Name<span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '0rem'}}>
                    <div className="form-group">
                    <input type="text"  value={this.state.travel.primaryCardholderName!==""?this.state.travel.primaryCardholderName:""}  id="primaryCardholderName" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                    onChange={this.handleChange} />
                    </div>
                    </div>

                    <div className="col-11  col-lg-2 rightCol">
                    <p style={{marginTop: '0rem',fontWeight:"bolder",color:"white",fontSize:"15px"}} className="">Primary Cardholder No<span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '0rem'}}>
                    <div className="form-group">
                    <input type="text"  value={this.state.travel.primaryCardholderNo!==""?this.state.travel.primaryCardholderNo:""}  id="primaryCardholderNo" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                    onChange={this.handleChange}  />
                    </div>
                    </div>

                    <div className="col-11  col-lg-2 rightCol">
                    <p style={{marginTop: '0rem',fontWeight:"bolder",color:"white",fontSize:"15px"}} className="">Travel Location<span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '0rem'}}>
                    <div className="form-group">
                    <input type="text"  value={this.state.travel.travelLocation!==""?this.state.travel.travelLocation:""}  id="travelLocation" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                    onChange={this.handleChange}  />
                    </div>
                    </div>

                    <div className="col-11  col-lg-2 rightCol">
                    <p style={{marginTop: '0rem',fontWeight:"bolder",color:"white",fontSize:"15px"}} className="">Travel Date To <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '0rem'}}>
                    <div className="form-group">
                    <input type="date"   value={this.state.travel.travelDateTo!==""?this.state.travel.travelDateTo:""}  id="travelDateTo" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                    onChange={this.handleChange} />
                    </div>
                    </div>

                    <div className="col-11  col-lg-2 rightCol">
                    <p style={{marginTop: '1rem',fontWeight:"bolder",color:"white",fontSize:"15px"}} className="">Special Instructions <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '1rem'}}>
                    <div className="form-group">
                    <input type="text"  value={this.state.travel.specialInstructions!==""?this.state.travel.specialInstructions:""}  id="specialInstructions" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                    onChange={this.handleChange} />
                    </div>
                    </div>

                    <div className="col-11  col-lg-2 rightCol">
                    <p style={{marginTop: '1rem',fontWeight:"bolder",color:"white",fontSize:"15px"}} className="">Travel Purpose<span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '1rem'}}>
                    <div className="form-group">
                    <input type="text"   value={this.state.travel.travelPurpose!==""?this.state.travel.travelPurpose:""} id="travelPurpose" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                    onChange={this.handleChange}  />
                    </div>
                    </div>

                    <div className="col-11  col-lg-2 rightCol">
                    <p style={{marginTop: '0rem',fontWeight:"bolder",color:"white",fontSize:"15px"}} className="">Limit Location<span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '0rem'}}>
                    <div className="form-group">
                    <input type="text"   value={this.state.travel.limitTransaction!==""?this.state.travel.limitTransaction:""} id="limitTransaction" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                    onChange={this.handleChange}  />
                    </div>
                    </div>

                    {/* <div className="col-11  col-lg-2 rightCol">
                    <p style={{marginTop: '0rem',fontWeight:"bolder",color:"white",fontSize:"15px"}} className="">IP Address<span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '0rem'}}>
                    <div className="form-group">
                    <input type="text"   id="ipAddress" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                    onChange={this.handleChange} />
                    </div>
                    </div> */}
                    
                    
                   
                   
                    <div className="row pull-right" style={{marginLeft: '41rem',marginTop: '-1rem'}}>
                                                               
                                                             
                                                            
                                                              <div className="pr-3">
                                                                <button type="button" className="btn btn-primary " style={{float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px'}}>Reset</button>
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
                        <input className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 1px)', marginLeft: '-3rem' }} 
                       id="fromdate" type="date" onChange={this.handleChange} />
                        </div>
                        </div>

                        <div className="col-11  col-lg-2 rightCol">
                        <p style={{marginTop: '1.8rem',fontWeight:"bolder",fontSize:"15px",marginLeft:'-8px'}} className="">To Date</p>
                        </div>
                        <div className="col-12 col-md-3" style={{marginTop: '2rem'}}>
                        <div className="form-group">
                        <input  className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"  style={{ height: 'calc(1em + 0.75rem + -14px)', marginLeft: '-4rem' }} 
                        id="tilldate" type="date" onChange={this.handleChange}/>
                        </div>
                        </div>

                        <div >
                      < button type="button" style={{marginTop: '-5rem',marginLeft: '44.8rem',borderColor: '#303974', backgroundColor: '#303974', fontSize: '15px'}} id="Reset" 
                        className="btn btn-primary">Search</button>
                        </div>
                          
               </div>
               <div className="row has-shadow mt-3" style={{borderRadius: '1rem',width:'125%',marginLeft:'1%', backgroundColor: 'white', marginTop: '5rem'}}>
         
                         
                           <BootstrapTable striped hover
                    data={this.state.getApiData}
                   pagination={true}
                   // search
                    ClearSearchButton
                  // exportCSV
                  >
                    <TableHeaderColumn dataField="travelDateFrom"  dataFormat={this.infoRecieptDate} csvHeader="Last Name" isKey={true} className={"columnHeaderColor"} dataSort={true}
                      expandable={false} editable={false}width="130px" >Travel Date From</TableHeaderColumn>
                    <TableHeaderColumn dataField="travelDateTo" dataFormat={this.merchantName}  csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                      expandable={false} editable={false} width="130px" >Travel Date To</TableHeaderColumn>
                       <TableHeaderColumn dataField="customerNo" dataFormat={this.location} csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                      expandable={false} editable={false} width="130px" >Customer No </TableHeaderColumn>
                       <TableHeaderColumn dataField="customerName" dataFormat={this.MCC} csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                      expandable={false} editable={false} width="130px" >Customer Name</TableHeaderColumn>
                       {/* <TableHeaderColumn dataField="Edit" dataFormat={this.acquirer} csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                      expandable={false} editable={false} width="100px" >Card Type</TableHeaderColumn> */}
                       <TableHeaderColumn dataField="primaryCardholderNo" dataFormat={this.cppDate} csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                      expandable={false} editable={false} width="100px" >Card No</TableHeaderColumn>
                       <TableHeaderColumn dataField="primaryCardholderName" dataFormat={this.dateIdentified} csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                      expandable={false} editable={false} width="130px">Cardholder</TableHeaderColumn>
                       <TableHeaderColumn dataField="travelLocation" dataFormat={this.dateIdentified} csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                      expandable={false} editable={false} width="130px">Travel Location</TableHeaderColumn>
                       <TableHeaderColumn dataField="travelPurpose" dataFormat={this.dateIdentified} csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                      expandable={false} editable={false} width="130px" >Travel Purpose</TableHeaderColumn>
                    <TableHeaderColumn dataField="conversionFactor" csvHeader="First Name" className={"columnHeaderColor"}
                          expandable={false} width="100px"  dataFormat={this.actionMethod} editable={false} >Action</TableHeaderColumn>
                  </BootstrapTable>
                         
                         
                    </div>

           


</form>
            </React.Fragment>

        )
    }
}

export default travel_logs

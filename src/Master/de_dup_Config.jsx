import React, { Component } from 'react'
import Universal from '../common/universal'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import DatePicker from 'react-date-picker';
import axios from 'axios'
import {applicationContextPath } from '../common/api';
import Swal from 'sweetalert2'

 class de_dup_Config extends Component {
    constructor(props){
        super(props)

        this.state={
          savebutton: true,
          updatebutton: false,
         getApiData:[],
         botapidata:{
          "custEntity" :"",
          "custField":"",
       
        },
        }
  }
  componentDidMount() {
    this.getdedupconfig();
   
  }
 

handleChange= (e)=> {  
  var botapidata1 = this.state.botapidata
  botapidata1[e.target.id] = e.target.value
  this.setState({botapidata:botapidata1});  
  } 
  saveMaterialMaster = async()  => {
    debugger
    var BanmaterialData = {}
    BanmaterialData.custEntity=this.state.botapidata.custEntity
    BanmaterialData.custField=this.state.botapidata.custField
   
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
   
   
    if(this.state.botapidata.custEntity==null||this.state.botapidata.custEntity==""||this.state.botapidata.custEntity==undefined)
    {
      Swal.fire("Please Select Entity");
      return
    }
   if (this.state.botapidata.custField==null||this.state.botapidata.custField==""||this.state.botapidata.custField==undefined)
   {
    Swal.fire("Please Select Field");
  return
 } 
 
 axios.post( applicationContextPath+'/saveDeDupConfig',BanmaterialData,{headers:headers})
 .then(response => {
  Swal.fire({
    title: 'Submitted!',
    text: 'Your Data Submitted Sucessfully.',
    icon: 'success',
  })
   this.getdedupconfig()
  
   this.setState({  
    botapidata:{
      "custEntity" :"",
      "custField":"",
   
    },
   
  })
 }
).catch(error => {
   console.log(error);
});
  }

  getdedupconfig(urlQuery){
    debugger
    var token = (localStorage.getItem("tokendata"))
    var bankCode =localStorage.getItem("bankdata")
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token,
      //'bankCode': bankCode,
      }
  
    axios.get( applicationContextPath+`/getDeDupByBankCode?bankCode=${bankCode}`,{headers})
  .then(response => {
    this.setState({getApiData:response.data})
  }

).catch(error => {
    console.log(error);
});

}
updateDeDup = async () => {
    debugger
    var UpddateMaterialData = this.state.botapidata;
    var bankcode = (localStorage.getItem("bankdata"))
    var token = (localStorage.getItem("tokendata"))

    if(this.state.botapidata.custEntity==null||this.state.botapidata.custEntity==""||this.state.botapidata.custEntity==undefined)
    {
      Swal.fire("Please Select Entity");
      return
    }
   if (this.state.botapidata.custField==null||this.state.botapidata.custField==""||this.state.botapidata.custField==undefined)
   {
    Swal.fire("Please Select Field");
  return
 } 
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token,
      'bankCode': bankcode,
      // 'currentdate': this.state.date,
      // 'defaultlang': 'Eng',
      // 'currancy': 'INR',
      // 'userid': '101'
    }
      
    axios.post( applicationContextPath+'/updateDeDup',UpddateMaterialData,{headers:headers})
    .then(response => {
      Swal.fire({
        title: 'Updated!',
        text: 'Your Data Updated Sucessfully.',
        icon: 'success',
      
      })
      this.getdedupconfig()
     // Alert.success(" Record Added Sucessfully",{ position: 'top' })
      this.setState({  
        botapidata:{
          "custEntity" :"",
          "custField":"",
       
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
    this.setState({ botapidata: cell, savebutton: false, updatebutton: true })
  }
  deleteStateData = async (row, cell) => {
    debugger
    var id = {}
    id.id =cell.id
    console.log("In Edit", id);
    var token = (localStorage.getItem("tokendata"))
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token,
    }
    axios.post( applicationContextPath+'/deleteDeDup',id,{headers:headers})
    .then(response => {
      
      this.getdedupconfig()
      Swal.fire({
        title: 'Delete!',
        text: 'Your Data Deleted Sucessfully.',
        icon: 'success',
      })
    //  Alert.success(" Record Added Sucessfully",{ position: 'top' })
      this.setState({  
        botapidata:{
          "custEntity" :"",
          "custField":"",
       
        },
      
     })
    }
   ).catch(error => {
      console.log(error);
   });
  }
  handleClear = () => {
    debugger
    this.setState({
      botapidata:{
        "custEntity" :"",
        "custField":"",
     
      },

    })
  }
actionMethod = (row,cell) => {

    return (
        < React.Fragment>
        
        <div >
          <i class="fa fa-edit" aria-hidden="true" title="Edit" style={{color:"blue"}} onClick={() => this.editApiData(row,cell)} ></i>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         <i class="fa fa-trash" aria-hidden="true" title="Delete" style={{color:"red"}} onClick={() => this.deleteStateData(row,cell)} ></i>
       </div>
        </React.Fragment>
    )
}
SaveApiData1 = () => { 
 
    this.props.history.push('/viewcustomers');

}

render() {
  console.log("state",this.state.botapidata)
    return (
  
            <React.Fragment>
            <Universal/>
            <section id="main-content">
    <section className="wrapper">
      <div className="row">
        <div className="col-lg-9 main-chart">
          <section className="dashboard-counts no-padding-bottom">
           
            <div className="container-fluid" style={{marginTop: '-1rem'}}>
              <h1 style={{fontSize: '22px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid #e9ecef'}}>De-Dup Configuration</h1>
              <div className="container-fluid">
                <div className="row bg-blue has-shadow mt-3" style={{borderRadius: '1rem'}}>
                  <div className="col-12 col-md-2 col-lg-2 rightCol">
                    <p  style={{fontWeight:"bolder",color:"white",fontSize:"15px"}}>Entity<span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" >
                    <div className="form-group">
                    <select className=" form-select form-select-sm minimal heightForm"   style={{width: '100%',height:"auto"}} id="custEntity" onChange={this.handleChange} 
                    value={this.state.botapidata.custEntity !== "" ? this.state.botapidata.custEntity : ""} >
                                                      <option value="">Select Option</option>

                                                        <option value="Customer">Customer</option>
                                                        {/* <option value="Customer">Customer</option> */}
                                                      </select>                
                    </div>
                  </div>

                  <div className="col-11  col-lg-2 rightCol">
                    <p style={{fontWeight:"bolder",color:"white",fontSize:"15px"}} className="">Field Name<span style={{ color: "red" }}>*</span></p>
                  </div>
                 
                  <div className="col-12 col-md-4" >
                    <div className="form-group">
                    <select className=" form-select form-select-sm minimal heightForm" id="custField"   style={{width: '100%',height:"auto"}}  onChange={this.handleChange} 
                    value={this.state.botapidata.custField !== "" ? this.state.botapidata.custField : ""} >
                                                      <option value="">Select Option</option>
                                                        <option value="Mobile Number">Mobile Number</option>
                                                        <option value="Pan Number">Pan Number</option>
                                                        <option value="Customer Name">Customer Name</option>
                                                        <option value="Address">Address</option>
                                                        <option value="Gender">Gender</option>
                                                      </select>
                    </div>
                     </div>
                     <div className="col-11  col-lg-2 rightCol">
                    <p style={{fontWeight:"bolder",color:"white",fontSize:"15px"}} className="">Match<span style={{ color: "red" }}>*</span></p>
                  </div>
                                   
                  <div className="col-12 col-md-4" >
                    <div className="form-group">
<input type="text" className=" form-select form-select-sm minimal heightForm" id="custField" style={{width: '100%',height:"auto"}}/>
                    </div>
                     </div>
                    <div className="row pull-right" style={{marginLeft:'765px',marginTop: '-1rem'}}>
                    
                                                              <div className="pr-3" >
                                                              {this.state.savebutton === true ?
                                                                <button type="button" className="btn btn-primary " style={{float: 'right', marginTop: '1rem',marginLeft:'-49px', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px'}}  id="Reset"  onClick={() => this.saveMaterialMaster()}
                                                                  >Save</button>:""}
                                                                   {this.state.updatebutton === true ?
                                                                <button type="button" className="btn btn-primary " style={{float: 'right', marginTop: '1rem',marginRight:'58px', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px'}}  id="Reset"  onClick={() => this.updateDeDup()}
                                                                  >Update</button>:""}
                                                                  <div className="pr-3">
                                                                <button type="button" className="btn btn-primary " onClick={() => this.handleClear()} style={{float: 'right', marginTop: '1rem',marginRight:'47px', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px'}  }>Reset</button>
                                                              </div>
                                                              </div>

                                                            </div>
                  </div>
                </div>
              </div>
              <div className="row has-shadow mt-3" style={{borderRadius: '1rem',width:'94%',marginLeft:'3%', backgroundColor: 'white', marginTop: '5rem'}}>
          
                           <div className="col-xs-12">
                           <div className="box">
                           <div className="box-body  no-LR-padding expandcontentscell">
                           <BootstrapTable striped hover
                     data={this.state.getApiData}
                     pagination={true}
                   // search
                    ClearSearchButton
                  // exportCSV
                  >
                    <TableHeaderColumn dataField="custEntity"  csvHeader="First Name" isKey={true} className={"columnHeaderColor"} dataSort={true}
                      expandable={false} editable={false} >Entity</TableHeaderColumn>

                    <TableHeaderColumn dataField="custField"  csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                      expandable={false} editable={false} >Field Name</TableHeaderColumn>

                      

                       <TableHeaderColumn dataField="Edit" dataFormat={this.actionMethod} csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                      expandable={false} editable={false} >Action</TableHeaderColumn>

                
                  </BootstrapTable>
                           </div>
                           </div>
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

export default de_dup_Config

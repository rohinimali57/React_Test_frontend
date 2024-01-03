import React, { Component } from 'react'
import 'react-tabs/style/react-tabs.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
 import Universal from '../common/universal'
 import axios from 'axios'
 import Swal from 'sweetalert2'
 import {applicationContextPath } from '../common/api';

 class banned_merchants_master extends Component {
    constructor(props){
        super(props)

        this.state={
          savebutton: true,
          updatebutton: false,
          getApiData:[],
          botapidata:{
            "merchantscode" :"",
            "merhantname":"",
            "status" :"",
            "banreason":""
         },        }
  }
  componentDidMount() {
     this.getBanMerchantByBankCode();
   
  }
  saveBanMerchantMst = async()  => {
    debugger
    var BanmarchantData = this.state.botapidata
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
   
   
    if(this.state.botapidata.merchantscode==null||this.state.botapidata.merchantscode===""||this.state.botapidata.merchantscode===undefined)
    {
      Swal.fire("please Enter Marchant Code");
      return
    }
   if (this.state.botapidata.merhantname==null||this.state.botapidata.merhantname===""||this.state.botapidata.merhantname===undefined)
   {
    Swal.fire("Please Enter Marchant Name");
  return
 } 
 if (this.state.botapidata.status==null||this.state.botapidata.status===""||this.state.botapidata.status===undefined)
   {
    Swal.fire("Please Select Status");
  return
 } 
 if (this.state.botapidata.banreason==null||this.state.botapidata.banreason===""||this.state.botapidata.banreason===undefined)
 {
  Swal.fire("Please Enter Ban Reason ");
return
}
 axios.post( applicationContextPath+'/saveBanMerchantMst',BanmarchantData,{headers:headers})
 .then(response => {
  Swal.fire({
    title: 'Submitted!',
    text: 'Your Data Submitted Sucessfully.',
    icon: 'success',
  })
   this.getBanMerchantByBankCode()
  
   this.setState({  
    botapidata:{
      "merchantscode" :"",
      "merhantname":"",
      "status" :"",
      "banreason":""
   },
   
  })
 }
).catch(error => {
   console.log(error);
});
  }
  getBanMerchantByBankCode(urlQuery){
    debugger
    var token = (localStorage.getItem("tokendata"))
    var bankCode =localStorage.getItem("bankdata")
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token,
      //'bankCode': bankCode,
      }
  
    axios.get( applicationContextPath+`/getBanMerchantByBankCode?bankCode=${bankCode}`,{headers})
  .then(response => {
    this.setState({getApiData:response.data})
  }

).catch(error => {
    console.log(error);
});

}
updateBanMerchantMst = async () => {
  debugger
  var UpddateMaterialData = this.state.botapidata;
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
    
  axios.post( applicationContextPath+'/updateBanMerchantMst',UpddateMaterialData,{headers:headers})
  .then(response => {
    Swal.fire({
      title: 'Updated!',
      text: 'Your Data Updated Sucessfully.',
      icon: 'success',
    
    })
    this.getBanMerchantByBankCode()
   // Alert.success(" Record Added Sucessfully",{ position: 'top' })
    this.setState({  
      botapidata:{
        "merchantscode" :"",
        "merhantname":"",
        "status" :"",
        "banreason":""
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
deleteBanMerchantMst = async (row, cell) => {
  debugger
  var del = cell.id
  var id = del
  //id.id =cell.id
  console.log("Edit", id);
  var token = (localStorage.getItem("tokendata"))
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+token,
  }
 await axios.get( applicationContextPath+'/deleteBanMerchantMst',id,{headers:headers})
  .then(response => {
    Swal.fire({
      title: 'Deleted!',
      text: 'Your Data Deleted Sucessfully.',
      icon: 'success', 
    })
    this.getBanMerchantByBankCode()
   // Alert.success(" Record Added Sucessfully",{ position: 'top' })
    this.setState({  
      botapidata:{
        "merchantscode" :"",
        "merhantname":"",
        "status" :"",
        "banreason":""
     },
    
   })
  }
 ).catch(error => {
    console.log(error);
 });
}
actionMethod = (row,cell) => {

    return (
        < React.Fragment>
             <div >
          <i class="fa fa-edit" aria-hidden="true" title="Edit" style={{color:"blue"}} onClick={() => this.editApiData(row,cell)} ></i>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         <i class="fa fa-trash" aria-hidden="true" title="Delete" style={{color:"red"}} onClick={() => this.deleteBanMerchantMst(row,cell)} ></i>
       </div>
        </React.Fragment>
    )
}

handleChange= (e)=> {  
  var botapidata1 = this.state.botapidata
  botapidata1[e.target.id] = e.target.value
  this.setState({botapidata:botapidata1});  
  } 


    render() {
      console.log("xx",this.state.botapidata)
        return (
           
           <React.Fragment>
            <Universal/>
            <section id="main-content">
            <section className="wrapper">
          <div className="row">
            <div className="col-lg-9 main-chart">
              <section className="dashboard-counts no-padding-bottom">
               
                <div className="container-fluid" style={{marginTop: '-1rem'}}>
                  <h1 style={{fontSize: '22px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid #e9ecef'}}>Banned Merchant</h1>
                  <div className="container-fluid">
                    <div className="row bg-blue has-shadow mt-3" style={{borderRadius: '1rem', background: '#c9ccdf'}}>
                      <div className="col-12 col-md-2 col-lg-2 rightCol">
                        <p  style={{color:"white",fontWeight:"bolder",fontSize:"14.1px"}}>Merchant Code  <span style={{color:"red"}}>*</span></p>
                       
                      </div>
                      <div className="col-12 col-md-4" >
                        <div className="form-group">
                        <select className="form-control select2" class="form-select form-select-sm minimal heightForm"  style={{width: '100%',height:"auto"}} id="merchantscode" onChange={this.handleChange}
                        value={this.state.botapidata.merchantscode !== "" ? this.state.botapidata.merchantscode : ""} >
                                                        <option value="">Select Code</option>

                                                          <option value="M0001">M0001</option>
                                                          <option value="M0002">M0002</option>
                                                          <option value="M0003">M0003</option>

                                                        </select>
                        </div>
                      
                       
                      </div>

                      <div className="col-12 col-md-2 col-lg-2 rightCol">
                        <p  style={{color:"white",fontWeight:"bolder",fontSize:"15px"}}>Name  <span style={{color:"red"}}>*</span></p>
                       
                      </div>
                      <div className="col-12 col-md-4" >
                        <div className="form-group">
                        <input type="text"  className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                        id="merhantname" placeholder="Enter Name" onChange={this.handleChange}
                        value={this.state.botapidata.merhantname !== "" ? this.state.botapidata.merhantname : ""} />
                        </div>
                      
                       
                      </div>

                      <div className="col-12 col-md-2 col-lg-2 rightCol">
                        {/* <h4 className="searchFilter " style={{fontFamily: 'LATO-BOLD', color: '#303974'}}></h4> */}
                        <p  style={{marginTop: '1em',color:"white",fontWeight:"bolder",fontSize:"15px"}}>Status <span style={{color:"red"}}>*</span></p>
                       
                      </div>
                      <div className="col-12 col-md-4" style={{marginTop: '1rem'}}>
                      <div className="form-group">
                       
                       <select className="form-control select2" id="status" class="form-select form-select-sm minimal heightForm"  style={{width: '100%',height:"auto"}}  onChange={this.handleChange}
                         value={this.state.botapidata.status !== "" ? this.state.botapidata.status : ""}>
                                                        <option value="1">Select Status</option>

                                                          <option value="Banned">Banned</option>
                                                          <option value="Active">Active</option>
                                                        </select>
                        </div>
                      
                       
                      </div>
                      <div className="col-11  col-lg-2 rightCol">
                        <p style={{marginTop: '1rem',color:"white",fontWeight:"bolder",fontSize:"14.1px"}} className="">Reason for ban  <span style={{color:"red"}}>*</span></p>

                       
                        
                      </div>
                      <div className="col-12 col-md-4" style={{marginTop: '1rem'}}>
                      <div className="form-group">
                        <textarea  rows="4" cols="50"  className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                          id="banreason"  onChange={this.handleChange} 
                          value={this.state.botapidata.banreason !== "" ? this.state.botapidata.banreason : ""} />
                        </div>

                        <div className="row pull-right" style={{marginRight:'-28px'}}>
                       
                          <div className="pr-3">
                          {this.state.savebutton === true ?
                            <button type="button" id="Save" className="btn btn-primary " style={{float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px'}}
                            onClick={() => this.saveBanMerchantMst()} >Save</button>:""}
                            {this.state.updatebutton === true ?
                            <button type="button" id="Save" className="btn btn-primary " style={{float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px'}}
                            onClick={() => this.updateBanMerchantMst()} >Update</button>:""}
                          </div>
                            </div>
                       
                       
                      
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="row has-shadow mt-3" style={{borderRadius: '1rem',width:'94%',marginLeft:'3%', backgroundColor: 'white', marginTop: '5rem',marginLeft: '29px'}}>
               
               
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
                        <TableHeaderColumn dataField="merchantscode" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                          expandable={false} editable={false} > Merchant Code</TableHeaderColumn>
                        <TableHeaderColumn dataField="merhantname" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                          expandable={false} editable={false} > Name</TableHeaderColumn>
                        <TableHeaderColumn dataField="status" csvHeader="First Name" isKey={true} className={"columnHeaderColor"}
                          expandable={false} editable={false} > Status</TableHeaderColumn>
                              <TableHeaderColumn dataField="banreason" csvHeader="First Name" className={"columnHeaderColor"}
                          expandable={false} editable={false} >Reason</TableHeaderColumn>

                            <TableHeaderColumn dataField="conversionFactor" csvHeader="First Name" className={"columnHeaderColor"}
                          expandable={false}  dataFormat={this.actionMethod} editable={false} >Action</TableHeaderColumn>
                   
                      </BootstrapTable>
                               </div>
                               </div>
                                   </div>
                              
                     
                                        </div>
                                        
              </section>
              
              {/* /row */}
            </div>
           
          </div>
          {/* /row */}
        </section>
      </section>
           </React.Fragment>
        )
    }
}

export default banned_merchants_master

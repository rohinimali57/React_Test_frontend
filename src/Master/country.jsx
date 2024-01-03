import React, { Component } from 'react'
import Universal from '../common/universal'
import Swal from 'sweetalert2'
import {connect} from 'react-redux'

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import { handleSaveCountryMaster, handleSUpdateCountryMaster, handleGetCountryMasterList,handleDeleteCountryMatser } from '../actions/city';

export class country extends Component {
  constructor(props){
    super(props)
    var today = new Date(),
    date = today.getFullYear() + '/'+(today.getMonth() < 10 ? "0" : "") + (today.getMonth() + 1) + '/'+(today.getDate() < 10 ? "0" : "") + today.getDate();

    this.state={
      date: date,
     getApiData:[],
     savebutton: true,
     updatebutton:false,
     countryapidata:{
        "countryCode":"",
        "countryName":"",
       //"bankCode": "001"
      },
    }
}
componentDidMount() {
this.getApiData();

}
saveCountryMaster = async () =>{
debugger
var countryData = this.state.countryapidata;
var bankcode=(localStorage.getItem("bankdata"))
var token = (localStorage.getItem("tokendata"))
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer '+token,
  'bankCode': bankcode,
 //'branchcode': 'A1000-01',
  'currentdate': this.state.date,
  'defaultlang': 'Eng',
  'currancy': 'INR',
  'userid': '101'
}

var saveapidata=this.state.countryapidata;
    if(this.state.countryapidata.countryCode==null||this.state.countryapidata.countryCode==""||this.state.countryapidata.countryCode==undefined)
    {
      Swal.fire("Please enter country Code");
    return
   }
    if(this.state.countryapidata.countryName==null||this.state.countryapidata.countryName==""||this.state.countryapidata.countryName==undefined)    
    {
       Swal.fire("Please enter Country Name");
     return
    }
await this.props.dispatch(handleSaveCountryMaster(countryData,headers))
 this.getApiData()
  this.setState({  
    countryapidata:{
      "countryCode":"",
      "countryName":"",
    },
}) 

}


updateCountryMaster = async ()  =>{
debugger
var UpddateApiData= this.state.countryapidata;
var bankcode=(localStorage.getItem("bankdata"))
var token = (localStorage.getItem("tokendata"))
const headers = {
'Content-Type': 'application/json',
'Authorization': 'Bearer '+token,
'bankCode': bankcode,
//'branchcode': 'A1000-01',
'currentdate': this.state.date,
'defaultlang': 'Eng',
'currancy': 'INR',
'userid': '101'
}


await this.props.dispatch(handleSUpdateCountryMaster(UpddateApiData,headers));
this.getApiData()
this.setState({  
 countryapidata:{
  "countryCode":"",
   "countryName":""
 },updatebutton:false,savebutton: true

})

}
DeleteApi = async (row,cell)  =>{
debugger
// var UpddateApiData= this.state.countryapidata;
var data = {}
data.id = cell.id
var token = (localStorage.getItem("tokendata"))
const headers = {
'Content-Type': 'application/json',
'Authorization': 'Bearer '+token,
//'bankCode': bankcode,
}
await this.props.dispatch(handleDeleteCountryMatser(data,headers));
this.getApiData()
}
getApiData=()=>{
debugger
var token = (localStorage.getItem("tokendata"))
var bankCode =localStorage.getItem("bankdata")
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer '+token,
  }
this.props.dispatch(handleGetCountryMasterList(bankCode,headers));

}
editApiData=(row,cell) => {
debugger
console.log("In Edit", row);
this.setState({countryapidata:cell,savebutton:false,updatebutton:true})
}
actionMethod = (row,cell) => {

return (
    < React.Fragment>
     <div >
          <i class="fa fa-edit" aria-hidden="true" title="Edit" style={{color:"blue"}} onClick={() => this.editApiData(row,cell)} ></i>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         <i class="fa fa-trash" aria-hidden="true" title="Delete" style={{color:"red"}} onClick={() => this.DeleteApi(row,cell)} ></i>
       </div>
      
    </React.Fragment>
)
}
handleChange= (e)=> {  
var countryapidata1 = this.state.countryapidata
countryapidata1[e.target.id] = e.target.value
this.setState({countryapidata:countryapidata1});  
} 
handleChange1= ()=> {  
  debugger
  this.setState({  
    countryapidata:{
     "countryCode":"",
      "countryName":""
    },updatebutton:false,savebutton: true
  
 })
  } 
  
    
    render() {
        // console.log("xx", this.state.getApiData)
        return (
            <React.Fragment>
                <Universal/>
                <section id="main-content">
    <section className="wrapper">
      <div className="row">
        <div className="col-lg-9 main-chart">
          <section className="dashboard-counts no-padding-bottom">
           
            <div className="container-fluid" style={{marginTop: '-1rem'}}>
              <h1 style={{fontSize: '22px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid #e9ecef'}}>Country Master </h1>
              <div className="container-fluid">
                <div className="row bg-blue has-shadow mt-3" style={{borderRadius: '1rem', background: '#c9ccdf'}}>
                  <div className="col-12 col-md-2 col-lg-2 rightCol">
                    <p  style={{color:"white",fontWeight:"bolder",fontSize:"15px"}}>Country Code <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" >
                    <div className="form-group">
                    <input type="text"  id="countryCode" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                  placeholder="Enter Country Code" onChange={this.handleChange}  maxlength="7" pattern="^[1-9][0-9]{5}$" 
                  value={this.state.countryapidata.countryCode!==""?this.state.countryapidata.countryCode:""}
                      />
                    </div>
                  </div>
                  <div className="col-11  col-lg-2 rightCol">
                    <p style={{color:"white",fontWeight:"bolder",fontSize:"15px"}} className="">Country Name <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" >
                    <div className="form-group">
                    <input type="text"  id="countryName" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                    onChange={this.handleChange}   placeholder="Enter Country Name" 
                    value={this.state.countryapidata.countryName!==""?this.state.countryapidata.countryName:""}  />
                    </div>
                   
                   
                    <div className="row pull-right" style={{marginRight:'-28px'}}>
                      
                     <div className="pr-3">
                       <button type="button" className="btn btn-primary " style={{float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px'}} onClick={() => this.handleChange1()}>Reset</button>
                    </div>
                    {this.state.savebutton === true ?
                     <div className="pr-3">
                    
                       <button type="button" className="btn btn-primary " style={{float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px'}}  onClick={() => this.saveCountryMaster()}
                       >Save</button>
                     </div>:""}
                     {this.state.updatebutton === true ?
                     <div className="pr-3">
                    
                       <button type="button" className="btn btn-primary " style={{float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px'}} onClick={() => this.updateCountryMaster()}>Update</button>
                     </div>:""}
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
                    data={this.props.countrylists}
                   pagination={true}
                    search
                    ClearSearchButton
                  // exportCSV
                  >
                    <TableHeaderColumn dataField="countryCode" csvHeader="Last Name" isKey={true} className={"columnHeaderColor"} dataSort={true}
                      expandable={false} editable={false} >Country Code</TableHeaderColumn>
                    <TableHeaderColumn dataField="countryName" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                      expandable={false} editable={false} >Country Name</TableHeaderColumn>
                   
                    <TableHeaderColumn dataFormat={this.actionMethod} dataField='id' expandable={false} editable={false}  > Action</TableHeaderColumn>
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
const mapStateToProps = (state) =>{
  const {countrymasterList} = state.countrylist
  console.log("countrymasterList", countrymasterList)
  return {
      
      countrylists:countrymasterList
     }
}

export default connect(mapStateToProps) (country)

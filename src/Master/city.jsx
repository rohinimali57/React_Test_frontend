import React, { Component } from 'react'
import Universal from '../common/universal'
import {connect} from 'react-redux'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import { handleSaveCityMaster,handleUpdateCityMaster, handleGetCityMasterList,handleDeleteCityMaster } from '../actions/cities';
import { handleGetStateMasterList } from '../actions/state'
import { handleGetCountryMasterList } from '../actions/city'
import Swal from 'sweetalert2'

 class city extends Component {
  constructor(props){
    super(props)
    var today = new Date(),
    date = today.getFullYear() + '/'+(today.getMonth() < 10 ? "0" : "") + (today.getMonth() + 1) + '/'+(today.getDate() < 10 ? "0" : "") + today.getDate();

    this.state={
      date: date,
      savebutton: true,
     updatebutton:false,
     getApiData:[],
     cityList:[],
     cityapidata:{
        "cityCode":"",
        "cityName":"",
        "countryCode":"",
        "stateCode":"",
        "bank_code": "001"

      },
    }
}
componentDidMount() {
  debugger
  this.getCityData();

var token = (localStorage.getItem("tokendata"))
var bankCode =localStorage.getItem("bankdata")
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer '+token,
  }
this.props.dispatch(handleGetCountryMasterList(bankCode,headers));
this.props.dispatch(handleGetStateMasterList(bankCode,headers));


}
saveCityMaster = async  () =>{
debugger
var cityMasterData = this.state.cityapidata;
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
var saveapidata=this.state.cityapidata;
if(this.state.cityapidata.cityCode==null||this.state.cityapidata.cityCode==""||this.state.cityapidata.cityCode==undefined)
{
  Swal.fire("Please enter city code");
return
}
if(this.state.cityapidata.cityName==null||this.state.cityapidata.cityName==""||this.state.cityapidata.cityName==undefined)
{
  Swal.fire("Please enter city name");
return
}
if(this.state.cityapidata.stateCode==null||this.state.cityapidata.stateCode==""||this.state.cityapidata.stateCode==undefined)
{
  Swal.fire("Please enter state code");
return
}
if(this.state.cityapidata.countryCode==null||this.state.cityapidata.countryCode==""||this.state.cityapidata.countryCode==undefined)  
 {
   Swal.fire("Please enter country code");
 return
}
await this.props.dispatch(handleSaveCityMaster(cityMasterData, headers))
this.getCityData()


  this.setState({  
    cityapidata:{
      "cityCode":"",
      "cityName":"",
      "countryCode":"",
      "stateCode":""
    },

}) 
}
updateCityMaster = async ()  =>{
debugger
let c_code = /^[A-Z]{3}$/;
if(this.state.cityapidata.cityCode==null||this.state.cityapidata.cityCode==""||this.state.cityapidata.cityCode==undefined)
{
  Swal.fire("Please enter city code");
return
}else if(!this.state.cityapidata.cityCode.match(c_code)){
  Swal.fire("Please enter valid city code");
return
}
let c_name = /^[A-Z]{2}$/;
if(this.state.cityapidata.cityName==null||this.state.cityapidata.cityName==""||this.state.cityapidata.cityName==undefined)
{
  Swal.fire("Please enter city name");
}
var UpddateCityData= this.state.cityapidata;
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

await this.props.dispatch(handleUpdateCityMaster(UpddateCityData, headers))
this.getCityData()
this.setState({  
 cityapidata:{
  "stateCode":"",
  "cityCode":"",
  "cityName":"",
  "countryCode":"",
  //"stateCode":""
 },updatebutton:false,savebutton: true

})

}

deleteApiData = async(row, cell) => {
debugger
var id = {}
id.id =cell.id
console.log("In Edit", id);
var token = (localStorage.getItem("tokendata"))
const headers = {
'Content-Type': 'application/json',
'Authorization': 'Bearer '+token,
}

await this.props.dispatch(handleDeleteCityMaster(id, headers))
this.getCityData()
}

getCityData= ()=>{ 
debugger
var token = (localStorage.getItem("tokendata"))
var bankCode =localStorage.getItem("bankdata")
const headers = {
'Content-Type': 'application/json',
'Authorization': 'Bearer '+token,
}
 this.props.dispatch(handleGetCityMasterList(bankCode,headers))
}


editApiData = (row, cell) => {
debugger
console.log("In Edit", row);
this.setState({ cityapidata: cell, savebutton: false, updatebutton: true })
}
actionMethod = (row,cell) => {

return (
    < React.Fragment>
    <div >
          <i class="fa fa-edit" aria-hidden="true" title="Edit" style={{color:"blue"}} onClick={() => this.editApiData(row,cell)} ></i>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         <i class="fa fa-trash" aria-hidden="true" title="Delete" style={{color:"red"}} onClick={() => this.deleteApiData(row,cell)} ></i>
       </div>
   
    </React.Fragment>
)
}

handleChange= (e)=> {  
var cityapidata1 = this.state.cityapidata
cityapidata1[e.target.id] = e.target.value
this.setState({cityapidata:cityapidata1});  
} 
handleChange1= ()=> {  
  debugger
  this.setState({  
    cityapidata:{
      "stateCode":"",
      "cityCode":"",
      "cityName":"",
      "countryCode":"",
      //"stateCode":""
     },updatebutton:false,savebutton: true
  
 })
  } 
    render() {
        console.log("city",this.state.cityapidata)
        let Countryoptions = this.props.countrylists.map(value => (
          <option value={value.countryCode}>{value.countryName}</option>
        ));
        let Stateoptions = this.props.statelists.map(value => (
          <option value={value.stateCode}>{value.stateName}</option>
        ));
        return (
           <React.Fragment>
                <Universal/> 
                <section id="main-content">
        <section className="wrapper">
          <div className="row">
            <div className="col-lg-9 main-chart">
              <section className="dashboard-counts no-padding-bottom">
               
                <div className="container-fluid" style={{marginTop: '-1rem'}}>
                  <h1 style={{fontSize: '22px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid #e9ecef'}}>City Master </h1>
                  <div className="container-fluid">
                    <div className="row bg-blue has-shadow mt-3" style={{borderRadius: '1rem'}}>
                     
                    <div className="col-12 col-md-2 col-lg-2 rightCol">
                      <p  style={{color:"white",fontWeight:"bolder",fontSize:"15px"}}>City Code <span style={{ color: "red" }}>*</span></p>
                      </div>
                      <div className="col-12 col-md-4" >
                      <div className="form-group">
                        <input type="text"  id="cityCode" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                          onChange={this.handleChange} 
                          placeholder="Enter City Code" value={this.state.cityapidata.cityCode!==""?this.state.cityapidata.cityCode:""} />
                        </div>
                      </div>
                      <div className="col-11  col-lg-2 rightCol">
                      <p style={{color:"white",fontWeight:"bolder",fontSize:"15px"}} className="">City Name <span style={{ color: "red" }}>*</span></p>
                      </div>
                      <div className="col-12 col-md-4" >
                      <div className="form-group">
                        <input type="text"  id="cityName" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                          onChange={this.handleChange} 
                          placeholder="Enter City Name" value={this.state.cityapidata.cityName!==""?this.state.cityapidata.cityName:""} />
                        </div>
                      </div>
                      <div className="col-12 col-md-2 col-lg-2 rightCol">
                      <p style={{marginTop: '1rem',color:"white",fontWeight:"bolder",fontSize:"15px"}}> State Code <span style={{ color: "red" }}>*</span></p>
                      </div>
                      <div className="col-12 col-md-4" >
                      <div className="form-group" style={{marginTop: '1rem'}}>
                        <select  id="stateCode" title="Country" onChange={this.handleChange} className="form-select form-select-sm minimal heightForm"  style={{width: '100%',height:"auto"}}
                      value={this.state.cityapidata.stateCode !== "" ? this.state.cityapidata.stateCode : ""}>
                      <option value="">Select State</option>
                    {Stateoptions}
                     
                    </select>
                        </div>
                      </div>
                      <div className="col-11  col-lg-2 rightCol">
                      <p style={{marginTop: '1rem',color:"white",fontWeight:"bolder",fontSize:"15px"}} className="">Country Name <span style={{ color: "red" }}>*</span></p>
                      </div>
                      <div className="col-12 col-md-4">
                      <div className="form-group" style={{marginTop: '1rem'}}>
                        <select  id="countryCode" title="Country" onChange={this.handleChange} className="form-select form-select-sm minimal heightForm"  style={{width: '100%',height:"auto"}}
                      value={this.state.cityapidata.countryCode !== "" ? this.state.cityapidata.countryCode : ""}>
                      <option value="">Select Country</option>
                      {Countryoptions}
                      {/* <option value="ind">India</option> */}
                     
                    </select>
                        </div>
                       
                       
                        <div className="row pull-right" style={{marginRight:'-28px'}}>
                       
                        <div className="pr-3">
                          <button type="button" className="btn btn-primary " style={{float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px'}} onClick={() => this.handleChange1()}>Reset</button>
                        </div>
                        {this.state.savebutton===true ?
                        <div className="pr-3">
                          <button type="button"className="btn btn-primary " style={{float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px'}} onClick={() => this.saveCityMaster()}
                           >Save</button>
                        </div>:""}
                        {this.state.updatebutton===true ?
                        <div className="pr-3">
                          <button type="button" className="btn btn-primary " style={{float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px'}} onClick={() => this.updateCityMaster()}
                            >Update</button>
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
                      data={this.props.citylists}
                       pagination={true}
                       // search
                        ClearSearchButton
                      // exportCSV
                      >
                        <TableHeaderColumn dataField="cityCode" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                          expandable={false} editable={false} >City Code</TableHeaderColumn>
                        <TableHeaderColumn dataField="cityName" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                          expandable={false} editable={false} > City Name</TableHeaderColumn>
                          <TableHeaderColumn dataField="stateCode" csvHeader="First Name"  className={"columnHeaderColor"}
                          expandable={false} editable={false} >State Code</TableHeaderColumn>
                          
                        <TableHeaderColumn dataField="countryCode" csvHeader="First Name" isKey={true} className={"columnHeaderColor"}
                          expandable={false} editable={false} >Country Code</TableHeaderColumn>
                        <TableHeaderColumn dataFormat={this.actionMethod} dataField='id' expandable={false} editable={false}  > Action</TableHeaderColumn>
                      </BootstrapTable>
                               </div>
                               </div>
                                   </div>
                              
                        </div>
              </section>
            </div>
          </div>
        </section>
      </section>
           </React.Fragment>
        )
    }
}
const mapStateToProps = (state) =>{
  const {countrymasterList} = state.countrylist
  const {statemasterList} = state.statelist
  const {citymasterList} = state.citieslist
  console.log("countrymasterList", countrymasterList)
  console.log("statemasterList", statemasterList)
  console.log("citymasterList", citymasterList)
  return {
      countrylists:countrymasterList,
      statelists:statemasterList,
      citylists:citymasterList
     }
}
export default connect(mapStateToProps)(city)

import React, { Component } from 'react'
import Universal from '../common/universal'
import { connect } from 'react-redux'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import { handleSaveStateMaster, handleUpdateStateMaster ,handleGetStateMasterList,handleDeleteStateMaster} from '../actions/state';
import { handleGetCountryMasterList } from '../actions/city'
import Swal from 'sweetalert2'


 class state extends Component {
  constructor(props) {
    super(props)
    var today = new Date(),
    date = today.getFullYear() + '/'+(today.getMonth() < 10 ? "0" : "") + (today.getMonth() + 1) + '/'+(today.getDate() < 10 ? "0" : "") + today.getDate();

    this.state = {
      date: date,
      savebutton: true,
      updatebutton: false,
      stateapidata: {
        "stateCode": "",
        "stateName": "",
        "countryCode": "",
        "bank_code": "001"
      },
    }
  }
  componentDidMount() {
    this.getStateData();
    var token = (localStorage.getItem("tokendata"))
    var bankCode =localStorage.getItem("bankdata")
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token,
      }
    this.props.dispatch(handleGetCountryMasterList(bankCode,headers));


  }
  saveStateMaster = async()  => {
    debugger
    var stateData = this.state.stateapidata;
    var bankcode = (localStorage.getItem("bankdata"))
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
   
    var saveapidata=this.state.stateapidata;
    if(this.state.stateapidata.stateCode==null||this.state.stateapidata.stateCode==""||this.state.stateapidata.stateCode==undefined)
    {
      Swal.fire("please enter State code");
      return
    }
   if (this.state.stateapidata.stateName==null||this.state.stateapidata.stateName==""||this.state.stateapidata.stateName==undefined)
   {
    Swal.fire("Please enter state name");
  return
 } 
   if(this.state.stateapidata.countryCode==null||this.state.stateapidata.countryCode==""||this.state.stateapidata.countryCode==undefined)  
      {
       Swal.fire("Please enter country name");
     return
    }
  await  this.props.dispatch(handleSaveStateMaster(stateData, headers))
    this.getStateData()
    this.setState({
      stateapidata: {
        "stateCode": "",
        "stateName": "",
        "countryCode": "",
      },
    })
  }

  updateStateMaster = async () => {
    debugger
    var UpddateStateData = this.state.stateapidata;
    var bankcode = (localStorage.getItem("bankdata"))
    var token = (localStorage.getItem("tokendata"))

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token,
      'bankCode': bankcode,
      'currentdate': this.state.date,
      'defaultlang': 'Eng',
      'currancy': 'INR',
      'userid': '101'
    }
      
   await this.props.dispatch(handleUpdateStateMaster(UpddateStateData, headers))
    this.getStateData()
    this.setState({
      stateapidata: {
        "stateCode": "",
        "stateName": "",
        "countryCode": "",
      }, updatebutton: false, savebutton: true
    })
  }
  getStateData = () => {
    debugger
    var token = (localStorage.getItem("tokendata"))
    var bankCode =localStorage.getItem("bankdata")
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token,
      }
    this.props.dispatch(handleGetStateMasterList(bankCode,headers));

  }
  editApiData = (row, cell) => {
    debugger
    console.log("In Edit", row);
    this.setState({ stateapidata: cell, savebutton: false, updatebutton: true })
  }
  handleChange = (e) => {
    var stateapidata1 = this.state.stateapidata
    stateapidata1[e.target.id] = e.target.value
    this.setState({ stateapidata: stateapidata1 });
  }
  handleClear = () => {
    debugger
    this.setState({
      stateapidata: {
        "stateCode": "",
        "stateName": "",
        "countryCode": "",
      }, updatebutton: false, savebutton: true

    })
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
   
   await this.props.dispatch(handleDeleteStateMaster(id, headers))
    this.getStateData()
  }

  actionMethod = (row, cell) => {
    debugger
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

   
      
    render() {
        console.log("State",this.state.stateapidata)
        let optionTemplate = this.props.countrylists.map(value => (
          <option value={value.countryCode}>{value.countryName}</option>
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
                  <h1 style={{fontSize: '22px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid #e9ecef'}}>State Master </h1>
                  <div className="container-fluid">
                    <div className="row bg-blue has-shadow mt-3" style={{borderRadius: '1rem', background: '#c9ccdf'}}>
                    <div className="col-12 col-md-2 col-lg-2 rightCol">
                      <p  style={{color:"white",fontWeight:"bolder",fontSize:"15px"}}>State Code <span style={{ color: "red" }}>*</span></p>
                      </div>
                      <div className="col-12 col-md-4">
                      <div className="form-group">
                        <input type="text"  id="stateCode" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                          onChange={this.handleChange}   maxlength="5" pattern="^[1-9][0-9]{5}$"
                          placeholder="Enter State Code" value={this.state.stateapidata.stateCode!==""?this.state.stateapidata.stateCode:""} />
                        </div>
                      </div>
                      <div className="col-11  col-lg-2 rightCol">
                      <p style={{color:"white",fontWeight:"bolder",fontSize:"15px"}} className="">State Name <span style={{ color: "red" }}>*</span></p>
                      </div>
                      <div className="col-12 col-md-4">
                      <div className="form-group">
                        <input type="text"  id="stateName" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                          onChange={this.handleChange} 
                          placeholder="Enter State Name" value={this.state.stateapidata.stateName!==""?this.state.stateapidata.stateName:""} />
                        </div>
                      </div>
                      <div className="col-12 col-md-2 col-lg-2 rightCol">
                      <p style={{marginTop: '1rem',color:"white",fontWeight:"bolder",fontSize:"15px"}}> Country Name <span style={{ color: "red" }}>*</span></p>
                      </div>
                      <div className="col-12 col-md-4" >
                      <div className="form-group" style={{marginTop: '1rem'}}>
                        <select  id="countryCode" title="Country" onChange={this.handleChange} className="form-select form-select-sm minimal heightForm"  style={{width: '100%',height:"auto"}}
                      value={this.state.stateapidata.countryCode !== "" ? this.state.stateapidata.countryCode : ""}>
                      <option value="">Select Country</option>
                      {/* <option value="ind">India</option> */}
                      {optionTemplate}
                    </select>
                        </div>
                      </div>
                     
                   
                      <div className="col-12 col-md-4" style={{marginTop: '1rem',marginLeft:'15%'}}>
                     
                       
                       
                        <div className="row pull-right" style={{marginRight:'-40px'}}>
                       
                           <div className="pr-3">
                             <button type="button" className="btn btn-primary " style={{float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px'}} onClick={() => this.handleClear()}>Reset</button>
                           </div>
                           {this.state.savebutton === true ?
                           <div className="pr-3">
                             <button type="button" className="btn btn-primary " style={{float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px'}} onClick={() => this.saveStateMaster()}
                             >Save</button>
                           </div>:""}
                           {this.state.updatebutton === true ?
                           <div className="pr-3">
                             <button type="button" className="btn btn-primary " style={{float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px'}} onClick={() => this.updateStateMaster()}>Update</button>
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
                            data={this.props.statelists}
                       pagination={true}
                       // search
                        ClearSearchButton
                      // exportCSV
                      >
                        <TableHeaderColumn dataField="stateCode" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                          expandable={false} editable={false} >State Code</TableHeaderColumn>
                        <TableHeaderColumn dataField="stateName" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                          expandable={false} editable={false} >Name</TableHeaderColumn>
                        <TableHeaderColumn dataField="countryCode" csvHeader="First Name" isKey={true} className={"columnHeaderColor"}
                          expandable={false} editable={false} >Country Code</TableHeaderColumn>
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
const mapStateToProps = (state) => {
  const {countrymasterList} = state.countrylist
  const {statemasterList} = state.statelist
  console.log("countrymasterList", countrymasterList)
  console.log("statemasterList", statemasterList)
  return {
    countrylists:countrymasterList,
    statelists:statemasterList
  }
}
export default connect(mapStateToProps)(state)

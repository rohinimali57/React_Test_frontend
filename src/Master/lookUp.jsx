import React, { Component } from 'react'
import Universal from '../common/universal'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import Swal from 'sweetalert2'
import axios from 'axios'
import { handleGetLookupData, handleGetLookupListBylookUpcode, handleUpdateLookupData,handleDeleteLookupData } from '../actions/lookUp';
import {applicationContextPath} from '../api/api' 
import { connect } from 'react-redux'
 class lookUp extends Component {
    constructor(props) {
        super(props)
    
        var today = new Date(),
        date = today.getFullYear() + '/'+(today.getMonth() < 10 ? "0" : "") + (today.getMonth() + 1) + '/'+(today.getDate() < 10 ? "0" : "") + today.getDate();
    
        this.state = {
            date: date,
          savebutton: true,
          updatebutton: false,
          lookupCode: "",
          lookuplist: [{"lookupType":"Gender"},{"lookupType":"Title"}],
          getApiData: [],
          lookupdata: {
            "lookupValueCode": "",
            "lookupCode": "",
            "lookupValue": "",
            "lookupAlias": "",
          },
        }
      }
      handleChange = (e) => {
        var lookupdata1 = this.state.lookupdata
        lookupdata1[e.target.id] = e.target.value
        this.setState({ lookupdata: lookupdata1 });
    
      }
      handleChange1 = (e) => {
        var lookupdata1 = this.state.lookupdata
        lookupdata1[e.target.id] = e.target.value
        this.setState({ lookupdata: lookupdata1 });
        var token = (localStorage.getItem("tokendata"))
        var bankCode =localStorage.getItem("bankdata")
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token,
          'bankCode': bankCode,
          }
        this.props.dispatch(handleGetLookupListBylookUpcode(e.target.value,headers))
      }
      componentDidMount() {
        this.getlookupmasterlist()
      //  this.getApiData()
      }
    
      getlookupmasterlist = () => {
        debugger
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
        axios.get(applicationContextPath+'/getlookupmasterlist',{headers})
          .then(response => {
            console.log(response.data)
            this.setState({ lookuplist: response.data })
            console.log("Country Data---", this.state.lookuplist)
          }
          ).catch(error => {
            console.log(error);
          });
        }
      
      saveLookmaster = () => {
        debugger
        var notificationData = this.state.lookupdata;
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
        if((this.state.lookupdata.lookupValueCode===null||this.state.lookupdata.lookupValueCode===""||this.state.lookupdata.lookupValueCode===undefined)||
        (this.state.lookupdata.lookupCode===null||this.state.lookupdata.lookupCode===""||this.state.lookupdata.lookupCode===undefined)||
        (this.state.lookupdata.lookupValue===null||this.state.lookupdata.lookupValue===""||this.state.lookupdata.lookupValue===undefined)||
        (this.state.lookupdata.lookupAlias===null||this.state.lookupdata.lookupAlias===""||this.state.lookupdata.lookupAlias===undefined)        ){
           Swal.fire("Please Fill the All Details");
         return
        }
        this.props.dispatch(handleGetLookupData(notificationData, headers))
        this.setState({
          lookupdata: {
            "lookupValueCode": "",
            "lookupCode": "",
            "lookupValue": "",
            "lookupAlias": "",
          },
          
    
        })
        var bankcode = (localStorage.getItem("bankdata"))
        var token = (localStorage.getItem("tokendata"))
        const headers1 = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token,
          'bankCode': bankcode,
          //'branchcode': 'A1000-01',
          'currentdate': this.state.date,
          'defaultlang': 'Eng',
          'currancy': 'INR',
          'userid': '101'
        }
        axios.get(applicationContextPath+'/getlookupmasterlist',{headers1})
          .then(response => {
            console.log(response.data)
            this.setState({ lookuplist: response.data })
            console.log("Country Data---", this.state.lookuplist)
          }
          ).catch(error => {
            console.log(error);
          });
    
      }
      updateApi = () => {
        debugger
        var UpddateApiData = this.state.lookupdata;
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
       
        this.props.dispatch(handleUpdateLookupData(UpddateApiData, headers))
        this.setState({
          lookupdata: {
            "lookupValueCode": "",
            "lookupCode": "",
            "lookupValue": "",
            "lookupAlias": "",
          }, updatebutton: false, savebutton: true
    
        })
      }
      deleteApiData = (row, cell) => {
        debugger
        var data = {}
        data.id = cell.id
          console.log("In Edit", data);
        var token = (localStorage.getItem("tokendata"))
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token,
        }
        this.props.dispatch(handleDeleteLookupData(data, headers))
        var bankcode = (localStorage.getItem("bankdata"))
        var token = (localStorage.getItem("tokendata"))
        const headers2 = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token,
          'bankCode': bankcode,
          //'branchcode': 'A1000-01',
          'currentdate': this.state.date,
          'defaultlang': 'Eng',
          'currancy': 'INR',
          'userid': '101'
        }
        axios.get(applicationContextPath+'/getlookupmasterlist',{headers2})
          .then(response => {
            console.log(response.data)
            this.setState({ lookuplist: response.data })
            console.log("Country Data---", this.state.lookuplist)
          }
          ).catch(error => {
            console.log(error);
          });
    
      }
      editApiData = (row, cell) => {
        debugger
        console.log("In Edit", row);
        this.setState({ lookupdata: cell, savebutton: false, updatebutton: true })
      }
      actionMethod = (row, cell) => {
        debugger
        return (
          < React.Fragment>
           <div >
       <i class="fa fa-pencil-square-o"  title="Edit" style={{color:"blue"}} aria-hidden="true" onClick={() => this.editApiData(row,cell)} ></i>
       &nbsp;&nbsp;&nbsp;&nbsp;
       <i class="fa fa-trash" aria-hidden="true" title="Delete" style={{color:"red"}} onClick={() => this.deleteApiData(row,cell)} ></i>
       </div>
           
          </React.Fragment>
        )
      }
      handleClear = () => {
        debugger
        this.setState({
          lookupdata: {
            "lookupType": "",
            "lookupCode": "",
            "lookupValue": "",
            "lookupAlias": "",
            "lookupValueCode": "",
          }, updatebutton: false, savebutton: true
    
        })
      }
    render() {
        console.log("lookup",this.state.lookupdata)
        let LookUpoptions = this.state.lookuplist.map(value => (
            <option value={value.lookupCode}>{value.lookupType}</option>
      
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
                  <h1 style={{fontSize: '22px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid #e9ecef'}}>LookUp Management </h1>
                  <div className="container-fluid">
                    <div className="row bg-blue   has-shadow mt-3" style={{borderRadius: '1rem', background: '#c9ccdf'}}>
                      <div className="col-12 col-md-2 col-lg-2 rightCol">
                        <p  style={{fontWeight:"bolder",color:"white",fontSize:"15px"}}>LookUp Type&nbsp;<span style={{ color: "red" }}>*</span></p>
                      </div>
                      <div className="col-12 col-md-4" >
                        <div className="form-group">
                        <select id="lookupCode" className="form-select form-select-sm minimal heightForm"  style={{width: '100%',height:"auto"}}
                            onChange={this.handleChange1} value={this.state.lookupdata.lookupCode !== "" ? this.state.lookupdata.lookupCode : ""}>
                           <option value=""> Select LookUp type </option>
                            {LookUpoptions}
                          </select>
                        </div>
                      </div>
                      <div className="col-11  col-lg-2 rightCol">
                        <p style={{fontWeight:"bolder",color:"white",fontSize:"15px"}} className="">LookUp Code&nbsp;<span style={{ color: "red" }}>*</span></p>
                      </div>
                      <div className="col-12 col-md-4" >
                        <div className="form-group">
                        <input type="text"  id="lookupValueCode" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                         placeholder="Enter LookUP Code" onChange={this.handleChange} value={this.state.lookupdata.lookupValueCode !== "" ? this.state.lookupdata.lookupValueCode : ""} />
                        </div>
                      </div>
                      <div className="col-12 col-md-2 col-lg-2 rightCol">
                        <p  style={{marginTop: '1rem',fontWeight:"bolder",color:"white",fontSize:"15px"}}>Description&nbsp;<span style={{ color: "red" }}>*</span></p>
                      </div>
                      <div className="col-12 col-md-4" style={{marginTop: '1rem'}}>
                        <div className="form-group">
                        <input type="text"  id="lookupValue" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                          placeholder="Enter Description " onChange={this.handleChange}  value={this.state.lookupdata.lookupValue !== "" ? this.state.lookupdata.lookupValue : ""}   />
                        </div>
                      </div>
                      <div className="col-11  col-lg-2 rightCol">
                        <p style={{marginTop: '1rem',fontWeight:"bolder",color:"white", fontSize:"15px"}} className="">Alias&nbsp;<span style={{ color: "red" }}>*</span></p>
                      </div>
                      <div className="col-12 col-md-4" style={{marginTop: '1rem'}}>
                        <div className="form-group">
                        <input type="text"  id="lookupAlias" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                          placeholder="Enter Alias " onChange={this.handleChange}
                          value={this.state.lookupdata.lookupAlias !== "" ? this.state.lookupdata.lookupAlias : ""}  />
                        </div>
                        
                        <div className="row pull-right" style={{marginRight:'-28px',marginTop: '0rem'}}>
                       
                           <div className="pr-3">
                             <button type="button" className="btn btn-primary " style={{float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px'}} onClick={() => this.handleClear()}>Reset</button>
                           </div>
                           {this.state.savebutton === true ?
                           <div className="pr-3">
                             <button type="button" className="btn btn-primary " style={{float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px'}} onClick={() => this.saveLookmaster()} >Save</button>
                           </div>:""}
                           {this.state.updatebutton === true ?
                           <div className="pr-3">
                             <button type="button" className="btn btn-primary " style={{float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px'}} onClick={() => this.updateApi()}
                            >Update</button>
                           </div>:""}

                          </div>
                      </div>
                    </div>
                    
                  </div>
                </div>
                <div className="row has-shadow mt-3" style={{borderRadius: '1rem',width:'94%',marginLeft:'3%', backgroundColor: 'white', marginTop: '3rem'}}>
               
                               <div className="col-xs-12">
                               <div className="box">
                               <div className="box-body  no-LR-padding expandcontentscell">
                               <BootstrapTable striped hover
                       data={this.props.lookupList}
                       pagination={true}
                       // search
                        ClearSearchButton
                      // exportCSV
                      >
                        <TableHeaderColumn dataField="lookupCode" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                          expandable={false} editable={false} >LookUp Code</TableHeaderColumn>
                        
                        <TableHeaderColumn dataField="lookupValue" csvHeader="First Name" isKey={true} className={"columnHeaderColor"}
                          expandable={false} editable={false} >Description</TableHeaderColumn>
                          {/* <TableHeaderColumn dataField="lookupValueCode" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                          expandable={false} editable={false} >Lookup Code</TableHeaderColumn> */}
                            <TableHeaderColumn dataField="lookupAlias" csvHeader="First Name"  className={"columnHeaderColor"}
                          expandable={false} editable={false} >Alias</TableHeaderColumn>
                        <TableHeaderColumn dataFormat={this.actionMethod} dataField='id' className={"columnHeaderColor"} expandable={false} editable={false}  > Action</TableHeaderColumn>
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

    const { lookuplistbylookuocode } = state.lookup
    console.log("gauravvvv", lookuplistbylookuocode)
    return {
     
      lookupList: lookuplistbylookuocode
    }
  
  }
export default connect(mapStateToProps)(lookUp)

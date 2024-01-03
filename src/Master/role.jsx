import React, { Component } from 'react'
import Universal from '../common/universal'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import {handleSaveRoleMaster,handleUpdateRoleMaster,handleGetRoleMasterList,handleDeleteRoleMaster} from '../actions/role';
 class role extends Component {
    constructor(props) {
        super(props)
        var today = new Date(),
        date = today.getFullYear() + '/'+(today.getMonth() < 10 ? "0" : "") + (today.getMonth() + 1) + '/'+(today.getDate() < 10 ? "0" : "") + today.getDate();

        this.state = {
          date: date,
          getroletable: [],
          savebutton: true,
          updatebutton: false,
          roleData: {
            "roleCode": "",
            "roleDesc": ""
          },
        }
      }
      componentDidMount() {
      this.getRoleData();
       
    
      }

      editApiData = (row, cell) => {
        debugger
        console.log("In Edit", row);
        this.setState({ cityapidata: cell, savebutton: false, updatebutton: true })
        }
      saveRole = async() => {
        debugger
        var RoleData = this.state.roleData;
        var bankcode = (localStorage.getItem("bankdata"))
        var token = (localStorage.getItem("tokendata"))
    
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token,
          'bankCode': bankcode,
          //'branchcode': 'A1000-01',
          'currentdate':  this.state.date,
          'defaultlang': 'Eng',
          'currancy': 'INR',
          'userid': '101'
        }
        if((this.state.roleData.roleCode===null||this.state.roleData.roleCode===""||this.state.roleData.roleCode===undefined)||
        (this.state.roleData.roleDesc===null||this.state.roleData.roleDesc===""||this.state.roleData.roleDesc===undefined)           ){
           Swal.fire("Please Fill the All Details");
         return
        }
        if(!this.state.roleData.roleCode==="^[a-zA-Z]+[0-9]*$"){
          Swal.fire("Please valid Role Name");
          return
        }
       await this.props.dispatch(handleSaveRoleMaster(RoleData,headers))
    
        this.getRoleData();
          this.setState({
            roleData: {
              "roleCode": "",
              "roleDesc": ""
            },
          })
          
      }

      
  updateRoleMaster = async () => {
    debugger
    var UpddateRoleData = this.state.roleData;
    var bankcode = (localStorage.getItem("bankdata"))
    var token = (localStorage.getItem("tokendata"))

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token,
      'bankCode': bankcode,
      'defaultlang': 'Eng',
      'currancy': 'INR',
      'userid': '101'
    }
      
   await this.props.dispatch(handleUpdateRoleMaster(UpddateRoleData, headers))
    this.getRoleData()
    this.setState({
      roleData: {
            "roleCode": "",
            "roleDesc": ""
      }, updatebutton: false, savebutton: true
    })
  }
    
  
      
      DeleteApi = async (row, cell) => {
        debugger
        var data = {}
        data.id = cell.id
        console.log("In Edit", data);
        var token = (localStorage.getItem("tokendata"))
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token,
        }
       await this.props.dispatch(handleDeleteRoleMaster(data,headers))  
        this.getRoleData();
      }
      getRoleData =  () => {
        debugger
        var token = (localStorage.getItem("tokendata"))
        var bankCode =localStorage.getItem("bankdata")
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token,
          }
        this.props.dispatch(handleGetRoleMasterList(bankCode,headers))
    
      }
      handleChange = (e) => {
        var roleData1 = this.state.roleData
        roleData1[e.target.id] = e.target.value
        this.setState({ roleData: roleData1 });
      }
     
    
      actionMethod = (row, cell) => {
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
      handleClearTextBox = () => {
        debugger
        this.setState({
          roleData: {
            "roleCode": "",
            "roleDesc": ""
          }, updatebutton: false, savebutton: true
    
        })
      }
      backFromSummary() {
        window.history.back();
      }
    render() {
        console.log("xx",this.state.roleData)
        return (
            <React.Fragment>
                <Universal/>
                <section id="main-content">
        <section className="wrapper">
          <div className="row">
            <div className="col-lg-9 main-chart">
              <section className="dashboard-counts no-padding-bottom">
               
                <div className="container-fluid" style={{marginTop: '-1rem'}}>
                  <h1 style={{fontSize: '22px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid #e9ecef'}}>Role Master </h1>
                  <div className="container-fluid">
                    <div className="row bg-blue has-shadow mt-3" style={{borderRadius: '1rem'}}>
                      <div className="col-12 col-md-2 col-lg-2 rightCol">
                        <p  style={{color:"white",fontWeight:"bolder",fontSize:"15px"}}>Role Name <span style={{ color: "red" }}>*</span></p>
                      </div>
                      <div className="col-12 col-md-4" >
                        <div className="form-group">
                        <input type="text"  id="roleCode"  placeholder="Enter Role" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                        onChange={this.handleChange} pattern="[A-Za-z]{3}"
                        value={this.state.roleData.roleCode !== "" ? this.state.roleData.roleCode : ""}
                          />
                        </div>
                      </div>
                      <div className="col-11  col-lg-2 rightCol">
                        <p style={{color:"white",fontWeight:"bolder",fontSize:"15px"}} className="">Description <span style={{ color: "red" }}>*</span></p>
                      </div>
                      <div className="col-12 col-md-4" >
                        <div className="form-group">
                        <input type="text"  id="roleDesc"  placeholder="Enter Description "className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                        onChange={this.handleChange}  value={this.state.roleData.roleDesc !== "" ? this.state.roleData.roleDesc : ""}
                          />
                        </div>
                       
                       
                        <div className="row pull-right" style={{marginRight:'-28px'}}>
                                                                   
                                                                  <div className="pr-3">
                                                                    <button type="button" className="btn btn-primary " style={{float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px'}} onClick={() => this.handleClearTextBox()}>Reset</button>
                                                                  </div>
                                                                  {this.state.savebutton === true ?
                                                                  <div className="pr-3">
                                                                 
                                                                    <button type="button" className="btn btn-primary " style={{float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px'}} onClick={() => this.saveRole()}
                                                                   >Save</button>
                                                                  </div>:""}
                                                                  {this.state.updatebutton === true ?
                                                                  <div className="pr-3">
                                                                 
                                                                    <button type="button" className="btn btn-primary " style={{float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px'}} onClick={() => this.updateRoleMaster()}>Update</button>
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
                          data={this.props.rolelists}
                       pagination={true}
                       // search
                        ClearSearchButton
                      // exportCSV
                      >
                        <TableHeaderColumn dataField="roleCode" csvHeader="Last Name" isKey={true} className={"columnHeaderColor"} dataSort={true}
                          expandable={false} editable={false} >Role Name</TableHeaderColumn>
                        <TableHeaderColumn dataField="roleDesc" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                          expandable={false} editable={false} >Description</TableHeaderColumn>
                       
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
    
    const {rolemasterList} = state.rolelist
    console.log("rolemasterList", rolemasterList)
  
    return {
      
      rolelists:rolemasterList
    }
  }
export default connect(mapStateToProps)(role)

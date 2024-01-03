import React, { Component } from 'react'
import Universal from '../common/universal'
import { connect } from 'react-redux'
import { sha256 } from 'js-sha256';
import Swal from 'sweetalert2'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import {handleGetRoleMasterList} from '../actions/role'
import { handleSaveUserMaster,handleUpdateUserMaster, handleGetUserMasterList ,handleDeleteListUser} from '../actions/user';

 class user extends Component {
    constructor(props){
        super(props)
        var today = new Date(),
        date = today.getFullYear() + '/'+(today.getMonth() < 10 ? "0" : "") + (today.getMonth() + 1) + '/'+(today.getDate() < 10 ? "0" : "") + today.getDate();
    
        this.state={
          disabled: false,
            date: date,
            getroletable: [],
         getApiData:[],
         match: true,
         savebutton: true,
         checkPassword: true,
         checkmail: true,
         checkPhone: true,
        //  updatebutton: false,
         userdata:{
            "userId":"",
            "firstName":"",
            "lastName":"",
            "pwd":"",
            "mobileNo":"",
            "email":"",
            "roleRiskSeverity":"",
            "division":"",
            "status":"",
            "baseRoleCode":"",
            "branch":"",
            "confirmPassword":"",
   }
        }
  }

  componentDidMount() {
    this.getApiData();
    var token = (localStorage.getItem("tokendata"))
    var bankCode =localStorage.getItem("bankdata")
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token,
      }
    this.props.dispatch(handleGetRoleMasterList(bankCode,headers))
  }
  saveUser = async() => {
    debugger
    var RoleData = this.state.userdata;
    RoleData.pwd= sha256(RoleData.pwd)
    var bankcode = (localStorage.getItem("bankdata"))
    var token = (localStorage.getItem("tokendata"))

    

    if(this.state.userdata.userId===null||this.state.userdata.userId===""||this.state.userdata.userId===undefined)
    {
      Swal.fire("Please Enter User Id");
    return
   }
    if(this.state.userdata.firstName===null||this.state.userdata.firstName===""||this.state.userdata.firstName===undefined)
    {
      Swal.fire("Please Enter First Name");
    return
   }
    if(this.state.userdata.lastName===null||this.state.userdata.lastName===""||this.state.userdata.lastName===undefined)
    {
      Swal.fire("Please Enter Last Name");
    return
   }
      
   if(this.state.userdata.email===null||this.state.userdata.email===""||this.state.userdata.email===undefined)
   {
    Swal.fire("Please Enter Email Id");
  return
 }
 if(this.state.userdata.pwd===null||this.state.userdata.pwd===""||this.state.userdata.pwd===undefined)
 {
   Swal.fire("Please Enter Password");
 return
}
 if(this.state.userdata.mobileNo===null||this.state.userdata.mobileNo===""||this.state.userdata.mobileNo===undefined)
    
    {
      Swal.fire("Please Enter Mobile No");
    return
   }
   if(this.state.userdata.division===null||this.state.userdata.division===""||this.state.userdata.division===undefined)
   
   {
    Swal.fire("Please Select Division");
  return
 }
   if(this.state.userdata.roleRiskSeverity===null||this.state.userdata.roleRiskSeverity===""||this.state.userdata.roleRiskSeverity===undefined)
   {
    Swal.fire("Please Enter Role Risk Serverity");
  return
 }
 if(this.state.userdata.baseRoleCode===null||this.state.userdata.baseRoleCode===""||this.state.userdata.baseRoleCode===undefined)
 {
  Swal.fire("Please Select Base Role Code");
return
}   
 if (this.state.userdata.status===null||this.state.userdata.status===""||this.state.userdata.status===undefined)
 {
  Swal.fire("Please Select Status");
return
}

 if(this.state.userdata.branch===null||this.state.userdata.branch===""||this.state.userdata.branch===undefined)
    {
       Swal.fire("Please Select Branch");
     return
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token,
    'bankCode': bankcode,
    //'branchcode': 'A1000-01',
    'currentdate': this.state.date,
    'defaultlang': 'Eng',
    'currancy': 'INR',
    'userid': this.state.userdata.userId
  }
   await this.props.dispatch(handleSaveUserMaster(RoleData,headers))
              
   //   this.getApiData();
      this.setState({
        userdata:{
            "userId":"",
            "firstName":"",
            "lastName":"",
            "pwd":"",
            "mobileNo":"",
            "email":"",
            "roleRiskSeverity":"",
            "division":"",
            "status":"",
            "baseRoleCode":"",
            "branch":"",
   }

      })
  }

  updateUser = async() => {
    debugger
    
    var RoleData = this.state.userdata;
    RoleData.pwd= sha256(RoleData.pwd)
    var bankcode = (localStorage.getItem("bankdata"))
    var token = (localStorage.getItem("tokendata"))

    

    if(this.state.userdata.userId===null||this.state.userdata.userId===""||this.state.userdata.userId===undefined)
    {
      Swal.fire("Please Enter User Id");
    return
   }
    if(this.state.userdata.firstName===null||this.state.userdata.firstName===""||this.state.userdata.firstName===undefined)
    {
      Swal.fire("Please Enter First Name");
    return
   }
    if(this.state.userdata.lastName===null||this.state.userdata.lastName===""||this.state.userdata.lastName===undefined)
    {
      Swal.fire("Please Enter Last Name");
    return
   }
      
   if(this.state.userdata.email===null||this.state.userdata.email===""||this.state.userdata.email===undefined)
   {
    Swal.fire("Please Enter Email Id");
  return
 }
 if(this.state.userdata.pwd===null||this.state.userdata.pwd===""||this.state.userdata.pwd===undefined)
 {
   Swal.fire("Please Enter Password");
 return
}
 if(this.state.userdata.mobileNo===null||this.state.userdata.mobileNo===""||this.state.userdata.mobileNo===undefined)
    
    {
      Swal.fire("Please Enter Mobile No");
    return
   }
   if(this.state.userdata.division===null||this.state.userdata.division===""||this.state.userdata.division===undefined)
   
   {
    Swal.fire("Please Select Division");
  return
 }
   if(this.state.userdata.roleRiskSeverity===null||this.state.userdata.roleRiskSeverity===""||this.state.userdata.roleRiskSeverity===undefined)
   {
    Swal.fire("Please Enter Role Risk Serverity");
  return
 }
 if(this.state.userdata.baseRoleCode===null||this.state.userdata.baseRoleCode===""||this.state.userdata.baseRoleCode===undefined)
 {
  Swal.fire("Please Select Base Role Code");
return
}   
 if (this.state.userdata.status===null||this.state.userdata.status===""||this.state.userdata.status===undefined)
 {
  Swal.fire("Please Select Status");
return
}

 if(this.state.userdata.branch===null||this.state.userdata.branch===""||this.state.userdata.branch===undefined)
    {
       Swal.fire("Please Select Branch");
     return
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token,
    'bankCode': bankcode,
    //'branchcode': 'A1000-01',
    'currentdate': this.state.date,
    'defaultlang': 'Eng',
    'currancy': 'INR',
    'userid': this.state.userdata.userId
  }
   await this.props.dispatch(handleUpdateUserMaster(RoleData,headers))
              
   //   this.getApiData();
      this.setState({
        userdata:{
            "userId":"",
            "firstName":"",
            "lastName":"",
            "pwd":"",
            "mobileNo":"",
            "email":"",
            "roleRiskSeverity":"",
            "division":"",
            "status":"",
            "baseRoleCode":"",
            "branch":"",
   }

      })
  }
  DeleteApi = async(row, cell) => {
    debugger
    var data = {}
    data.id = cell.id
      console.log("In Edit", data);
    var token = (localStorage.getItem("tokendata"))
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token,
      //'bankCode': bankcode,
    }
   await this.props.dispatch(handleDeleteListUser(data,headers))
   this.getApiData();
  }
  getApiData=()=>{
    debugger
    var token = (localStorage.getItem("tokendata"))
    var bankCode =localStorage.getItem("bankdata")
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token,
      }
    this.props.dispatch(handleGetUserMasterList(bankCode,headers))

}
  checkPasswordAndConfirmPassword(textBox) {
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    var password = document.getElementById("pwd").value;
    if (textBox === "pwd") {
        if (!strongRegex.test(password)) {
            this.setState({ checkPassword: false })
        } else {
            this.setState({ checkPassword: true })
        }
    } else if (textBox === 'confirmpassword') {
        if (document.getElementById("pwd").value !== document.getElementById("confirmPassword").value) {
            this.setState({ match: false });
        } else {
            this.setState({ match: true })
        }
    }}
    checkMobile() {
        debugger
          let phone = document.getElementById('mobileNo').value
              if (phone.length > 10 || phone.length < 10 || phone==="") {
                document.getElementById('mobileNo').focus()
                  this.setState({ checkPhone: false })
              } else {
                  this.setState({ checkPhone: true })
              }
          
      }
      checkemail(){
        let emailid = document.getElementById('email').value
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(!filter.test(emailid)){
          document.getElementById('email').focus()
          this.setState({checkmail : false})
          }else{
            this.setState({checkmail: true})
          }
        }
    handleChange= (e)=> {  
        var userdata1 = this.state.userdata
        userdata1[e.target.id] = e.target.value
        this.setState({userdata:userdata1});  
        }
        editApiData = (row, cell) => {
            debugger
            this.setState({ disabled: true });
            console.log("In Edit", row);
            this.setState({ userdata: cell, savebutton: false, updatebutton: true })
          }
        actionMethod = (row, cell) => {
            debugger
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
          handleClear= ()=> {  
            debugger
            this.setState({
                userdata:{
                    "userId":"",
                    "firstName":"",
                    "lastName":"",
                    "pwd":"",
                    "mobileNo":"",
                    "email":"",
                    "roleRiskSeverity":"",
                    "division":"",
                    "status":"",
                    "roleCode":"",
                    "branch":"",
           }
        
              })
            }
    render() {
        console.log("user",this.state.userdata)
        let Rolesoptions = this.props.rolelists.map(value => (
            <option value={value.roleCode}>{value.roleCode}</option>
            
          ));
        return (
            <div>
               <Universal/> 
               <section id="main-content">
    <section className="wrapper">
      <div className="row">
        <div className="col-lg-9 main-chart">
          <section className="dashboard-counts no-padding-bottom">
           
            <div className="container-fluid" style={{marginTop: '-1rem'}}>
              <h1 style={{fontSize: '22px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid #e9ecef'}}>User Management</h1>
              <div className="container-fluid">
                <div className="row bg-blue has-shadow mt-3" style={{borderRadius: '1rem', background: '#c9ccdf'}}>
                  <div className="col-12 col-md-2 col-lg-2 rightCol">
                    <p  style={{fontWeight:"bolder",color:"white",fontSize:"15px"}}> Login ID <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" >
                    <div className="form-group" >
                    <input readOnly={this.state.disabled} type="text"  id="userId"  placeholder="Login ID" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                     onChange={this.handleChange}  value={this.state.userdata.userId!==""?this.state.userdata.userId:""}  />
                    </div>
                  </div>
                  
                  <div className="col-11  col-lg-2 rightCol">
                    <p style={{fontWeight:"bolder",color:"white",fontSize:"15px"}} className="">First Name <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" >
                    <div className="form-group">
                    <input type="text"  id="firstName"  placeholder="Enter Your First Name" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                          onChange={this.handleChange} 
                          value={this.state.userdata.firstName!==""?this.state.userdata.firstName:""}  />
                    </div>
                  </div>
                  <div className="col-12 col-md-2 col-lg-2 rightCol">
                    <p  style={{fontWeight:"bolder",fontSize:"15px",color:"white",marginTop: '1rem'}}>Last Name <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '1rem'}}>
                    <div className="form-group">
                    <input type="text"  id="lastName"  placeholder="Enter Your Last Name" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                          onChange={this.handleChange} 
                          value={this.state.userdata.lastName!==""?this.state.userdata.lastName:""}  />
                    </div>
                  </div>
                  <div className="col-11  col-lg-2 rightCol">
                    <p style={{fontWeight:"bolder",color:"white",fontSize:"15px",marginTop: '1rem'}} className="">Email-ID <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '1rem'}}>
                    <div className="form-group">
                    <input type="text"  id="email"  placeholder="Enter Email-ID" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                             onChange={this.handleChange} onBlur={() => this.checkemail()} required value={this.state.userdata.email!==""?this.state.userdata.email:""} />
                           {this.state.checkmail ? '' : <span style={{ color: "red" }}>Please provide valid email</span>}
                    </div>
                  </div>

                  <div className="col-12 col-md-2 col-lg-2 rightCol">
                    <p  style={{fontWeight:"bolder",color:"white",fontSize:"15px",marginTop: '1rem'}}>Password <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '1rem'}}>
                    <div className="form-group">
                    <input type="password"  id="pwd" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                         onChange={() => this.checkPasswordAndConfirmPassword('pwd')} onBlur={this.handleChange} placeholder="Password" required  />
                    </div>
                  </div>
                
                  <div className="col-12 col-md-2 col-lg-2 rightCol">
                    <p  style={{fontWeight:"bolder",color:"white",fontSize:"15px",marginTop: '1rem'}}>Mobile NO. <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '1rem'}}>
                    <div className="form-group">
                    <input type="text"  id="mobileNo"  placeholder="Enter Mobile No." className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                        onChange={this.handleChange} onBlur={() => this.checkMobile()} required
                        value={this.state.userdata.mobileNo!==""?this.state.userdata.mobileNo:""}  />
                         {this.state.checkPhone==true ?
                         <span></span> : <span style={{ color: "red" }}>Phone number should be 10 digits</span>
                         }
                    </div>
                  </div>
                  <div className="col-11  col-lg-2 rightCol">
                    <p style={{fontWeight:"bolder",color:"white",fontSize:"15px",marginTop: '1rem'}} className="">Division <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '1rem'}}>
                    <div className="form-group">
                    <select  id="division" title="Country"  className="form-select form-select-sm minimal heightForm"  style={{width: '100%',height:"auto"}}
                      onChange={this.handleChange}  value={this.state.userdata.division!==""?this.state.userdata.division:""} >
                    <option value="">Select Division</option>
                    <option value="compliance">Compliance</option>
                    <option value="cards">Cards</option>
                    <option value="digital_Channels">Digital Channels</option>
                    <option value="retail_Banking ">Retail Banking </option>
                    <option value="corporate_Banking">Corporate Banking</option>
                    </select>
                    </div>
                  </div>
                  {/* <div className="col-12 col-md-2 col-lg-2 rightCol">
                    <p  style={{fontWeight:"bolder",color:"white",fontSize:"15px",marginTop: '1rem'}}> Risk Severity <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '1rem'}}>
                    <div className="form-group">
                    <select  id="roleRiskSeverity" title="Country"  className="form-select form-select-sm minimal heightForm"  style={{width: '100%',height:"auto"}}
                     onChange={this.handleChange} 
                     value={this.state.userdata.roleRiskSeverity!==""?this.state.userdata.roleRiskSeverity:""} >
                    <option value="">Select Rule Risk Severity</option>
                    <option value="all">All</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                    </select>
                    </div>
                  </div> */}
                  <div className="col-11  col-lg-2 rightCol">
                    <p style={{fontWeight:"bolder",color:"white",fontSize:"15px",marginTop: '1rem'}} className="">Role <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '1rem'}}>
                    <div className="form-group">
                    <select  id="baseRoleCode" title="Country"  className="form-select form-select-sm minimal heightForm"  style={{width: '100%',height:"auto"}}
                          onChange={this.handleChange} 
                          value={this.state.userdata.baseRoleCode!==""?this.state.userdata.baseRoleCode:""}>
                      <option value="">Select Role</option>
                      {Rolesoptions}
                    </select>
                    </div>
                    
                  </div>
                  <div className="col-12 col-md-2 col-lg-2 rightCol">
                    <p  style={{fontWeight:"bolder",color:"white",fontSize:"15px",marginTop: '1rem'}}>Status <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '1rem'}}>
                    <div className="form-group">
                    <select  id="status" title="Country"  className="form-select form-select-sm minimal heightForm"  style={{width: '100%',height:"auto"}}
                    onChange={this.handleChange} 
                    value={this.state.userdata.status!==""?this.state.userdata.status:""} >
                    <option value="">Select Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>       
                    </select> 
                    </div>
                  </div>
                  <div className="col-11  col-lg-2 rightCol">
                    <p style={{fontWeight:"bolder",color:"white",fontSize:"15px",marginTop: '1rem'}} className="">Branch/Zone <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '1rem'}}>
                    <div className="form-group">
                    <select  id="branch" title="Country"  className="form-select form-select-sm minimal heightForm"  style={{width: '100%',height:"auto"}}
                        onChange={this.handleChange} 
                        value={this.state.userdata.branch!==""?this.state.userdata.branch:""}>
                       <option value="">Select Option</option>
                     <option value="HeadOffice">Head Office</option>
                    </select>
                    </div>
                    
                  </div>
                 
                  <div className="col-12 col-md-4" style={{marginTop: '-1rem',marginLeft:'600px'}}>

                  <div className="row pull-right">
                                                                   
                                                                  <div className="pr-3">
                                                                    <button type="button" className="btn btn-primary " style={{float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px'}}  onClick={() => this.handleClear()}>Reset</button>
                                                                  </div>
                                                                  {this.state.savebutton === true ?
                                                                  <div className="pr-3">
                                                                 
                                                                    <button type="button" className="btn btn-primary " style={{float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px'}} onClick={() => this.saveUser()}
                                                                   >Save</button>
                                                                  </div>:""}
                                                                  {this.state.updatebutton === true ?
                                                                  <div className="pr-3">
                                                                 
                                                                    <button type="button" className="btn btn-primary " style={{float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px'}} onClick={() => this.updateUser()}>Update</button>
                                                                  </div>:""}
                                                                </div>
                                                                </div>
                  {/* <div className="col-12 col-md-4" >
                    <div className="form-group row" style={{marginLeft:"92px"}}>
                    <div className="pr-1" >
                            <button type="button" className="btn btn-primary " onClick={() => this.saveUser()} 
                             disabled={!this.state.userdata.userId|| !this.state.userdata.firstName|| !this.state.userdata.lastName
                                || !this.state.userdata.mobileNo || !this.state.userdata.email|| !this.state.userdata.roleRiskSeverity
                                || !this.state.userdata.division || !this.state.userdata.status || !this.state.userdata.baseRoleCode || !this.state.userdata.branch}>Save</button>
                             </div>
                                <div className="pr-1">
                                    <button type="button" className="btn btn-primary" onClick={() => this.handleClear()}>Reset</button>
                                  </div>
                    </div>
                    
                  </div> */}
                  
                </div>
              </div>
              <div className="row has-shadow mt-3" style={{borderRadius: '1rem',width:'96.5%',marginLeft:'2%', backgroundColor: 'white', marginTop: '5rem'}}>
                               <BootstrapTable striped hover
                             data={this.props.userlists}
                       pagination={true}
                       // search
                        ClearSearchButton
                      // exportCSV
                      >
                        <TableHeaderColumn dataField="firstName" csvHeader="Last Name"  isKey={true} className={"columnHeaderColor"} dataSort={true}
                          expandable={false} editable={false} >First Name</TableHeaderColumn>
                        <TableHeaderColumn dataField="lastName" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                          expandable={false} editable={false} >Last Name</TableHeaderColumn>

                        <TableHeaderColumn dataField="userId" csvHeader="Login-ID" className={"columnHeaderColor"}
                          expandable={false} editable={false} >Login-Id</TableHeaderColumn>

                        <TableHeaderColumn dataField="status" csvHeader="Login-ID" className={"columnHeaderColor"}
                          expandable={false} editable={false} >Status</TableHeaderColumn>

                        <TableHeaderColumn dataField="baseRoleCode" csvHeader="Login-ID" className={"columnHeaderColor"}
                          expandable={false} editable={false} >Role</TableHeaderColumn>

                        {/* <TableHeaderColumn dataField="roleRiskSeverity" csvHeader="Login-ID" className={"columnHeaderColor"}
                          expandable={false} editable={false} >Risk Severity</TableHeaderColumn> */}

                          
                        <TableHeaderColumn dataField="branch" csvHeader="Login-ID" className={"columnHeaderColor"} width="20%"
                          expandable={false} editable={false} >Branch/Zone</TableHeaderColumn>

                          
                        

                        <TableHeaderColumn dataFormat={this.actionMethod} dataField='id' expandable={false} editable={false}  > Action</TableHeaderColumn>
                      </BootstrapTable>
                      </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  </section>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    
    const {rolemasterList} = state.rolelist
    console.log("rolemasterList", rolemasterList)
    const {usermasterList} = state.userslist
    console.log("usermasterListQ", usermasterList)
    return {
      
      rolelists:rolemasterList,
      userlists:usermasterList
    }
  }
export default connect(mapStateToProps)(user)

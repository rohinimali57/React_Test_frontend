import React, { Component } from 'react'
import Universal from '../common/universal'
import axios from 'axios';
import Swal from 'sweetalert2'
import { connect } from 'react-redux'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import {handleSaveRoleMaster,handleGetRoleMasterList} from '../actions/role';
import {handleGetRoleRightList,handleSaveRoleMenuMap,handleUpdateRolrRights} from '../actions/roleRights';

 class rolerights extends React.Component {
    constructor(props){
        super(props)
        var today = new Date(),
        date = today.getFullYear() + '/'+(today.getMonth() < 10 ? "0" : "") + (today.getMonth() + 1) + '/'+(today.getDate() < 10 ? "0" : "") + today.getDate();
  
        this.state={
          date: date,
            list:[],
         getApiData:[],
         botapidata: {
            "roleCode": ""
            
          },
        }
  }
 
  componentDidMount() {
    this.getRoleData();
   
  }

  getRoleData = () => {
    debugger
    var token = (localStorage.getItem("tokendata"))
    var bankCode =localStorage.getItem("bankdata")
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token,
      }
    this.props.dispatch(handleGetRoleMasterList(bankCode,headers))

  }
    
  savegroupUser =  (cell,row,e) =>{
    debugger
    var menuRole = this.state.list
    
     console.log("RoleRightRoleRight",menuRole)
     
    //groupUser.userId = e.target.value
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
    if(this.state.botapidata.roleCode!==""){
    Swal.fire({
      title: 'Assigned!',
      text: 'Role Assigned Sucessfully.',
      icon: 'success',
      // showCancelButton: true,
      // confirmButtonText: 'Yes',
      // cancelButtonText: 'No'
    })
  this.props.dispatch(handleSaveRoleMenuMap(menuRole,headers))
    }else{
      Swal.fire("Please Select Role");
    }
 
      this.setState({  
        botapidata:{
          "roleCode": '',  
        },    
   }) 
    
 }
 UpdategroupUser =  (cell,row,e) =>{
  debugger
  var id = {
    id:cell.id
  }
  //id.id=cell.id
   
  //groupUser.userId = e.target.value
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
this.props.dispatch(handleUpdateRolrRights(id,headers))


    this.setState({  
      botapidata:{
        "roleCode": '',  
      },    
 }) 
  
}

  handleChange = (e) => {
    debugger
    var token = (localStorage.getItem("tokendata"))
    var bankCode =localStorage.getItem("bankdata")
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token,
     // 'bankCode': bankCode,
      }
    var botapidata1 = this.state.botapidata
    botapidata1[e.target.id] = e.target.value
    this.setState({ botapidata: botapidata1 });
    //var userId = e.target.value
    this.props.dispatch(handleGetRoleRightList(e.target.value,headers))
  }
  getApiData1=(cell,row,e)=>{
    debugger
    var group = cell;
    group.menuCode=group.menuCode
    group.roleCode=this.state.botapidata.roleCode
    //console.log("groupgroup",group)
    var lists = this.state.list
    lists.push(group)
    this.setState({this:lists}) 
  
}
updateuser=(cell,row,e)=> {
  debugger
  var groupupdate =cell.id
  console.log("groupupdatemmmmmmmmmm",groupupdate)
  if(e.target.id=='roleCode'){
 // var userId = this.state.botapidata;
 
 // userId[e.target.id] = e.target.value;
 this.UpdategroupUser(cell,row,e)
     
  }
}
  actionMethod = (row,cell) => {
    var roleCode= cell.roleCode
      return (
          < React.Fragment>
           
  
                  <div className="btn-groupdotted" >
                  {  roleCode == 0 ? 
                          <input type="checkbox" name="vehicle1" onChange={(e) => this.getApiData1(cell,row,e)} id="roleCode"  /> 
                      :
                      <input type="checkbox" name="vehicle1" onChange={(e) => this.updateuser(cell,row,e)} id="roleCode"   /> }
  
                  </div>
  
            
          </React.Fragment>
      )
  }
             
    render() {
        let optionTemplate = this.props.rolelists.map(value => (
            <option value={value.roleCode}>{value.roleCode}</option>
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
                  <h1 style={{fontSize: '22px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid #e9ecef'}}>Role Rights</h1>
                  <div className="container-fluid">
                    <div className="row bg-blue has-shadow mt-3" style={{borderRadius: '1rem', background: '#c9ccdf'}}>
                      <div className="col-12 col-md-2 col-lg-2 rightCol">
                        <p  style={{color:"white",fontWeight:"bolder",fontSize:"15px"}}>Select Role <span style={{ color: "red" }}>*</span></p>
                       
                      </div>
                      <div className="col-12 col-md-4" >
                        <div className="form-group">
                        <select  id="roleCode"  onChange={this.handleChange} title="Country"  className="form-select form-select-sm minimal heightForm"  style={{width: '100%',height:"auto"}}
                      >
                    <option value="">Select </option>
                    {optionTemplate}
                    </select>
                        </div>

                     
                       
                      </div>
      <div className="row pull-center" style={{marginTop: '-1rem'}}>
                                                                  <div className="pr-3">
                                                                    <button type="button" style={{marginTop:'-29px'}} className="btn btn-primary " style={{  backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px'}} onClick={() => this.savegroupUser()}>Define Rights</button>
                                                                  </div>
                                                                  

                                                                </div>
                    </div>
                  </div>
                </div>
                <div className="row has-shadow mt-3" style={{borderRadius: '1rem',width:'94%',marginLeft:'3%', marginTop: '5rem'}}>
            
                               <BootstrapTable striped hover
                               data={this.props.rolerights}
                               pagination={true}
                             
                      
                      // exportCSV
                      >
                        <TableHeaderColumn dataFormat={this.actionMethod} dataField='id' isKey={true} className={"columnHeaderColor"} dataSort={true}
                          expandable={false} editable={false} width="20px">Select</TableHeaderColumn>
                        <TableHeaderColumn dataField="menuCode" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                          expandable={false} editable={false} width="40px" > Menu Code</TableHeaderColumn>
                          <TableHeaderColumn dataField="menuDesc" csvHeader="Last Name"  className={"columnHeaderColor"}
                          expandable={false} editable={false} width="40px" >Menu Description</TableHeaderColumn>
                          
                        <TableHeaderColumn dataField="menuName" csvHeader="First Name"  className={"columnHeaderColor"}
                          expandable={false} editable={false}  width="40px">Menu Name</TableHeaderColumn>
                        <TableHeaderColumn dataField="menuURL" csvHeader="First Name"
                        expandable={false} editable={false} width="40px" > Menu Url</TableHeaderColumn>
                      
                      </BootstrapTable>
                               
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
const mapStateToProps = (state) => {
    const {rolemasterList} = state.rolelist
    const {rolerightmasterList} = state.rolerightlist
    console.log("rolerightmasterList", rolerightmasterList)
    console.log("rolemasterList", rolemasterList)
  
    return { 
     
      rolelists:rolemasterList,
      rolerights:rolerightmasterList
    }
  }
export default connect(mapStateToProps) (rolerights)
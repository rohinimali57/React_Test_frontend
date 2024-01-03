import React, { Component } from 'react'
import Universal from '../../common/universal'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import {  handleGetUserMasterList,handleGetGroupUserHierychy,handlesaveGroupUserHierychy,handleupdateGroupUser } from '../../actions/userMaster'
import {handleSaveGroupMaster, handleGetGroupMasterList ,handleUpdateGroupMaster } from '../../actions/group'
 class user_hierarchy extends Component {
       constructor(props) {
      super(props)
      var today = new Date(),
      date = today.getFullYear() + '/'+(today.getMonth() < 10 ? "0" : "") + (today.getMonth() + 1) + '/'+(today.getDate() < 10 ? "0" : "") + today.getDate();

      this.state = {
        date: date,
         list: [],
         getApiData: [],
         userlists:[
          { userId: "admin", firstName: "John", lastName: "Doe" },
          { userId: "admin", firstName: "Jane", lastName: "Smith" },
          { userId: "admin", firstName: "Bob", lastName: "Johnson" },
          { userId: "admin", firstName: "Amy", lastName: "Williams" }
        ],
         botapidata: {
            "userId": ""
            
          },
      }
   }
   componentDidMount() {
      //this.getApiData();
      var token = (localStorage.getItem("tokendata"))
      var bankCode =localStorage.getItem("bankdata")
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token,
        }
     this.props.dispatch(handleGetUserMasterList(bankCode,headers))
   //   this.props.dispatch(handleGetGroupMasterList(bankCode,headers))

   }
   handleChange = (e) => {
    
      var token = (localStorage.getItem("tokendata"))
      var bankCode =localStorage.getItem("bankdata")
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token,
        'bankCode': bankCode,
        }
      var botapidata1 = this.state.botapidata
      botapidata1[e.target.id] = e.target.value
      this.setState({ botapidata: botapidata1 });
      //var userId = e.target.value
      this.props.dispatch(handleGetGroupUserHierychy(e.target.value,headers))
    }
   
   getApiData1=(cell,row,e)=>{

      var group = row;
      group.groupName=row.groupName
      group.userId=this.state.botapidata.userId
      var lists = this.state.list
      lists.push(group)
      this.setState({this:lists}) 
    
  }
  getApiData2=(cell,row,e)=>{
  
   var group = row;
     group.reportedUserId=row.userId
      group.userId=this.state.botapidata.userId
     //  group.userId=this.state.botapidata.userId
       group.groupName=""
   var lists = this.state.list
   lists.push(group)
   
   this.setState({this:lists}) 
}
savegroupUser = async (cell,row,e) =>{
   debugger

   if(this.state.botapidata.userId==null||this.state.botapidata.userId==""||this.state.botapidata.userId==undefined)
      {
        Swal.fire("Please select userId");
        return
     }
   var groupUser = this.state.list
   // var userId =  this.state.botapidata
     console.log("groupUser",groupUser)
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
   Swal.fire({
      title: 'Saved!',
      text: 'Your Data Saved Sucessfully.',
      icon: 'success',
      // showCancelButton: true,
      // confirmButtonText: 'Yes',
      // cancelButtonText: 'No'
    })
await this.props.dispatch(handlesaveGroupUserHierychy(groupUser,headers))
 //this.props.dispatch(handleGetGroupUserHierychy(userId,headers))

     this.setState({  
       botapidata:{
         "userId": '',  
       },    
  }) 
   
}
updateuser=(cell,row,e)=> {
  //  debugger
   var groupupdate =row.id
   console.log("groupupdates",groupupdate)
   if(e.target.id=='userId'){
  // var userId = this.state.botapidata;
  
  // userId[e.target.id] = e.target.value;
  this.UpdategroupUser(cell,row,e)
      
   }
 }
UpdategroupUser = async (cell,row,e) =>{
  //  debugger
     var id = row
     id.id=row.id
     console.log("this.state.botapidata",this.state.botapidata.user)
 var userId =  this.state.botapidata

     var bankcode=(localStorage.getItem("bankdata"))
     var token = (localStorage.getItem("tokendata"))
   const headers = {
      'Content-Type': 'application/json',
     'Authorization': 'Bearer '+token,
     'bankCode': bankcode,
     'currentdate': this.state.date,
   }
   this.props.dispatch(handleGetGroupUserHierychy(this.state.botapidata.userId,headers))
await this.props.dispatch(handleupdateGroupUser(id,headers))

     this.setState({  
       botapidata:{
         "userId": '',  
       },    
  }) 
   
}
   Group = (cell,row,e) => {
      debugger
      var userId= row.userId
      return (
         <div >
            {  userId == 0 ? 
<input onChange={(e) => this.getApiData1(cell,row,e)}  type="checkbox" id="userId" name="userId"  />
:<input onChange={(e) => this.updateuser(cell,row,e)}  type="checkbox" id="userId" name="userId"  checked  />
}
         </div>
      )
   }
   User2 = (cell,row,e) => {
      debugger
      var userRole = row.userRole

      return (
         <div >
              { userRole == 0 ? 
<input onChange={(e) => this.getApiData2(cell,row,e)}  type="checkbox" id="reportedUserId" name="userId"   />
:<input onChange={(e) => this.updateuser(cell,row,e)}  type="checkbox" id="userId" name="userId"   checked/>
}
         </div>
      )
   }
   
   render() {
      console.log("list",this.state.list)
      let arrayListt = [{ name: 'HO GROUP', desc: 'HO LEVEL GROUP', code: 'HEAD OFFICE' }]
     
       let Branchoptions = this.state.userlists.map(value => (
         <option value={value.userId}>{value.firstName}</option>
       ));
      // console.log("Branchoptions",Branchoptions)
      return (
   
           <React.Fragment>
            <Universal/>
            <section id="main-content">
        <section className="wrapper">
          <div className="row">
            <div className="col-lg-9 main-chart">
              <section className="dashboard-counts no-padding-bottom">
               
                <div className="container-fluid" style={{marginTop: '-1rem'}}>
                  <h1 style={{fontSize: '22px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid #e9ecef'}}>User Hierarchy Maintenance</h1>
                  <div className="container-fluid">
                    <div className="row bg-blue has-shadow mt-3" style={{borderRadius: '1rem'}}>
                      <div className="col-12 col-md-2 col-lg-2 rightCol">
                        <p  style={{color:"white",ProlefontWeight:"bolder",fontSize:"15px"}}>Select User &nbsp;<span style={{ color: "red" }}>*</span></p>
                       
                      </div>
                      <div className="col-12 col-md-4" >
                      <div className="form-group">
                    <select  className="form-select form-select-sm minimal heightForm"  style={{width: '100%',height:"30px"}}
                      title="User" id="userId"  onChange={this.handleChange}>
                           <option value="">Select User</option>
                           {Branchoptions}
                          </select>
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
                                  data={this.props.grouphlist.group}
                                //  pagination={true}
                       // search
                        ClearSearchButton
                      // exportCSV
                      >
                        <TableHeaderColumn dataFormat={this.Group} dataField="dgfdfg" csvHeader="First Name" isKey={true} className={"columnHeaderColor"} dataSort={true}
                          expandable={false} editable={false} > Select</TableHeaderColumn>
                        <TableHeaderColumn dataField="groupName" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                          expandable={false} editable={false} >Group Name</TableHeaderColumn>
                        <TableHeaderColumn dataField="groupDescription" csvHeader="Last Name"  className={"columnHeaderColor"}
                          expandable={false} editable={false} >Group Description</TableHeaderColumn>

                        {/* <TableHeaderColumn dataField="ch"  expandable={false} editable={false} dataSort={true} > </TableHeaderColumn> */}
                      </BootstrapTable>
                               </div>
                               </div>
                                   </div>
                              
                        </div>
                        <div className="row has-shadow mt-3" style={{borderRadius: '1rem',width:'94%',marginLeft:'3%', backgroundColor: 'white', marginTop: '5rem'}}>
               
                               <div className="col-xs-12">
                               <div className="box">
                               <div className="box-body  no-LR-padding expandcontentscell">
                               <BootstrapTable striped hover
                                  data={this.props.grouphlist.user}
                                    // pagination={true}
                       // search
                        ClearSearchButton
                      // exportCSV
                      >
                        <TableHeaderColumn dataFormat={this.User2} dataField="Role-Name"isKey={true} csvHeader="First Name" className={"columnHeaderColor"} dataSort={true}
                          expandable={false} editable={false} > Select</TableHeaderColumn>
                        <TableHeaderColumn dataField="userName" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                          expandable={false} editable={false} >Users</TableHeaderColumn>
                        <TableHeaderColumn dataField="userRoleName" csvHeader="Last Name"  className={"columnHeaderColor"}
                          expandable={false} editable={false} >User Roles</TableHeaderColumn>
                            {/* <TableHeaderColumn dataField="Description " csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                                    expandable={false} editable={false} width="10px"></TableHeaderColumn> */}

                        {/* <TableHeaderColumn dataFormat={this.actionMethod} dataField='id' expandable={false} editable={false}  > Action</TableHeaderColumn> */}
                      </BootstrapTable>
                               </div>
                               </div>
                                   </div>
                                   <div class="divider"/>

                                 
                        </div>
                        <div className="row has-shadow mt-3" style={{borderRadius: '1rem',width:'94%',marginLeft:'3%', backgroundColor: 'white', marginTop: '5rem'}}>
                        <button  className="btn btn-primary" style={{borderColor: '#303974', backgroundColor: '#303974', fontSize: '15px',marginLeft:'92%'}} id="userId" name="id" value={this.state.botapidata.userId} onClick={(cell,row,e) => this.savegroupUser(cell,row,e)}>Save</button>

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
      const { bankcode } = state.bankMaster
  
    
    const {usermasterList} = state.userslist
      console.log("gauravvvv", state.bankMaster.bankcode)
    
    console.log("usermasterListQ", usermasterList)
    const{groupmasterList} = state.grouplist
    const{groupusermasterList} = state.userslist
    console.log("groupmasterListqq", groupmasterList)
    console.log("groupmasterList1234", groupusermasterList)
    return {
        bankcode,
      grouplists:groupmasterList,
      userlists:usermasterList,
      grouphlist:groupusermasterList
    }
  }
 export default connect(mapStateToProps)(user_hierarchy)
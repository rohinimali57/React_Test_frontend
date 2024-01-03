import React, { Component } from 'react'
import Universal from '../common/universal'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import {handleSaveGroupMaster, handleGetGroupMasterList ,handleUpdateGroupMaster,handleDeleteGroupMatser} from '../actions/group'
 class group extends Component {
    constructor(props) {
        super(props)
        var today = new Date(),
        date = today.getFullYear() + '/'+(today.getMonth() < 10 ? "0" : "") + (today.getMonth() + 1) + '/'+(today.getDate() < 10 ? "0" : "") + today.getDate();
    
        this.state = {
          date: date,
            savebutton: true,
            updatebutton:false,
            groupdata:{
                "groupName":"",
                  "groupDescription":"",                 
                },
           
        }
    }
    componentDidMount() {
        this.getGroupData();

    }

    saveGroup = async () =>{
        debugger
        var groupData = this.state.groupdata;
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
        if((this.state.groupdata.groupName===null||this.state.groupdata.groupName===""||this.state.groupdata.groupName===undefined)||
        (this.state.groupdata.groupDescription===null||this.state.groupdata.groupDescription===""||this.state.groupdata.groupDescription===undefined)       
            ){
           Swal.fire("Please Fill the All Details");
         return
        }
     await this.props.dispatch(handleSaveGroupMaster(groupData, headers))
     this.getGroupData();
          this.setState({  
            groupdata:{
                "groupName":"",
                "groupDescription":"", 
            },
    
       }) 
    }
    updateGroupMaster = async ()  =>{
        debugger
        var UpdateGroupData= this.state.groupdata;
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
       
      await this.props.dispatch(handleUpdateGroupMaster(UpdateGroupData, headers))
      this.getGroupData();
          this.setState({  
           groupdata:{
            "groupName":"",
            "groupDescription":"", 
           },updatebutton:false,savebutton: true
         
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
          //'bankCode': bankcode,
        }
      await  this.props.dispatch(handleDeleteGroupMatser(data,headers))
        this.getGroupData();
      }
    getGroupData=(urlQuery)=>{ 
        debugger
        var token = (localStorage.getItem("tokendata"))
    var bankCode =localStorage.getItem("bankdata")
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token,
      }
        this.props.dispatch(handleGetGroupMasterList(bankCode,headers))
      }

      editApiData = (row, cell) => {
        debugger
        console.log("In Edit", row);
        this.setState({ groupdata: cell, savebutton: false, updatebutton: true })
      }
    actionMethod = (row, cell) => {
        return (
            < React.Fragment>
                <div >
            <i class="fa fa-edit" aria-hidden="true" title="Edit" style={{color:"blue"}} onClick={() => this.editApiData(row,cell)} ></i>
            &nbsp;&nbsp;
             <i class="fa fa-trash" aria-hidden="true" title="Delete" style={{color:"red"}} onClick={() => this.DeleteApi(row,cell)} ></i>
                       </div>
            </React.Fragment>
        )
    }
    handleChange= (e)=> {  
        var groupdata1 = this.state.groupdata
        groupdata1[e.target.id] = e.target.value
        this.setState({groupdata:groupdata1});  
        }
        handleChange1= ()=> {  
            debugger
            this.setState({  
              groupdata:{
                "groupName":"",
                "groupDescription":"", 
               },updatebutton:false,savebutton: true
            
           })
            } 
    backFromCustomerList() {
        window.history.back();
    }
    render() {
        return (
            <React.Fragment>
            <Universal/>
            <section id="main-content">
    <section className="wrapper">
      <div className="row">
        <div className="col-lg-9 main-chart">
          <section className="dashboard-counts no-padding-bottom">
           
            <div className="container-fluid" style={{marginTop: '-1rem'}}>
              <h1 style={{fontSize: '22px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid #e9ecef'}}>Group Master </h1>
              <div className="container-fluid">
                <div className="row bg-blue has-shadow mt-3" style={{borderRadius: '1rem'}}>
                  <div className="col-12 col-md-2 col-lg-2 rightCol">
                    <p  style={{fontWeight:"bolder",color:"white",fontSize:"15px"}}>Group Name <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" >
                    <div className="form-group">
                    <input type="text"  id="groupName" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                  placeholder="Enter Group Name" onChange={this.handleChange} 
                  value={this.state.groupdata.groupName!==""?this.state.groupdata.groupName:""}/>
                    </div>
                  </div>
                  <div className="col-11  col-lg-2 rightCol">
                    <p style={{fontWeight:"bolder",color:"white",fontSize:"15px"}} className="">Description <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" >
                    <div className="form-group">
                    <input type="text"  id="groupDescription" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                    onChange={this.handleChange}  placeholder="Enter Group Description"
                    value={this.state.groupdata.groupDescription!==""?this.state.groupdata.groupDescription:""}  />
                    </div>
                   
                   
                    <div className="row pull-right" style={{marginRight:'-28px'}}>
                                                               
                                                              <div className="pr-3">
                                                                <button type="button" className="btn btn-primary " style={{float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px'}} onClick={() => this.handleChange1()}>Reset</button>
                                                              </div>
                                                              {this.state.savebutton === true ?
                                                              <div className="pr-3">
                                                             
                                                                <button type="button" className="btn btn-primary " style={{float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px'}} onClick={() => this.saveGroup()}
                                                                >Save</button>
                                                              </div>:""}
                                                              {this.state.updatebutton === true ?
                                                              <div className="pr-3">
                                                             
                                                                <button type="button" className="btn btn-primary " style={{float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px'}} onClick={() => this.updateGroupMaster()}>Update</button>
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
                    data={this.props.grouplists}
                   pagination={true}
                   // search
                    ClearSearchButton
                  // exportCSV
                  >
                    <TableHeaderColumn dataField="groupName" csvHeader="Last Name" isKey={true} className={"columnHeaderColor"} dataSort={true}
                      expandable={false} editable={false} >Group Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="groupDescription" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
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
const mapStateToProps = (state) =>{
    
    const{groupmasterList} = state.grouplist
    console.log("groupmasterList", groupmasterList)

    return {
        grouplists:groupmasterList
       }
  }
export default connect(mapStateToProps) (group)

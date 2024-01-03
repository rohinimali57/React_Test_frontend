import React, { Component } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Swal from 'sweetalert2'
 import Universal from '../common/universal'
 import { connect } from 'react-redux'
 import { handleSaveDeligenceMaster,handleUpdateDeligenceMaster,handleGetDeligenceMasterList,handleDeleteDeligenceMaster } from '../actions/delligence';
 import {handlerunDueDiligenceJob} from '../actions/userMaster'
 class due_deligence_master extends Component {
    constructor(props){
        super(props)
        var today = new Date(),
        date = today.getFullYear() + '/'+(today.getMonth() < 10 ? "0" : "") + (today.getMonth() + 1) + '/'+(today.getDate() < 10 ? "0" : "") + today.getDate();

        this.state={
          date: date,
          savebutton: true,
          updatebutton: false,
          duediligencedata: {
            "entityCode": "",
            "fieldname": "",
          },
        }
  }

  componentDidMount() {
   
    this.getStateData()
   }
  saveDeligenceMaster = async()  => {
    debugger
    var stateData = this.state.duediligencedata;
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
  
    if((this.state.duediligencedata.entityCode===null||this.state.duediligencedata.entityCode===""||this.state.duediligencedata.entityCode===undefined)||
    (this.state.duediligencedata.fieldname===null||this.state.duediligencedata.fieldname===""||this.state.duediligencedata.fieldname===undefined)       
        ){
       Swal.fire("Please Fill the All Details");
     return
    }
  await  this.props.dispatch(handleSaveDeligenceMaster(stateData, headers))
    this.getStateData()
    this.setState({
      duediligencedata: {
        "entityCode": "",
        "fieldname": "",
      },
    })
  }
  updateDeligenceMaster = async () => {
    debugger
    var UpddateStateData = this.state.duediligencedata;
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

    Swal.fire({
      title: 'Updated!',
      text: 'Your Data Updated Sucessfully.',
      icon: 'success',
      // showCancelButton: true,
      // confirmButtonText: 'Yes',
      // cancelButtonText: 'No'
    })
   await this.props.dispatch(handleUpdateDeligenceMaster(UpddateStateData, headers))
    this.getStateData()
    this.setState({
      duediligencedata: {
        "entityCode": "",
        "fieldname": "",
      
      }, updatebutton: false, savebutton: true
    })
  }
  handleClear = () => {
    debugger
    this.setState({
      duediligencedata: {
        "entityCode": "",
        "fieldname": "",
      }, updatebutton: false, savebutton: true

    })
  }
  handleChange = (e) => {
    var duediligencedata1 = this.state.duediligencedata
    duediligencedata1[e.target.id] = e.target.value
    this.setState({ duediligencedata: duediligencedata1 });
   
  }
  
  getStateData = () => {
    debugger
    var token = (localStorage.getItem("tokendata"))
    var bankCode =localStorage.getItem("bankdata")
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token,
      }
    this.props.dispatch(handleGetDeligenceMasterList(bankCode,headers));

  }
  editApiData = (row, cell) => {
    debugger
    console.log("In Edit", row);
    this.setState({ duediligencedata: cell ,savebutton: false, updatebutton: true })
  }
  saveDownloadFile = ()  => {
    debugger
    
    var bankcode = (localStorage.getItem("bankdata"))
    var token = (localStorage.getItem("tokendata"))
  
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token,
      
     
    }
    // Swal.fire({
    //   title: 'Downloaded!',
    //   text: 'Your Data Downloaded Sucessfully.',
    //   icon: 'success',
    // })
  
    this.props.dispatch(handlerunDueDiligenceJob(bankcode, headers))
   
  }
  actionMethod = (row,cell) => {

    return (
        < React.Fragment>
        

               <div >
                        <i class="fa fa-pencil-square-o"  title="Edit" style={{color:"blue"}} aria-hidden="true" onClick={() => this.editApiData(row, cell)} ></i>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <i class="fa fa-trash" aria-hidden="true" title="Delete" style={{color:"red"}} onClick={() => this.deleteApiData(row, cell)} ></i>
                        </div>

        </React.Fragment>
    )
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
      //'bankCode': bankcode,
    }
   
   await this.props.dispatch(handleDeleteDeligenceMaster(id, headers))
    this.getStateData()
    Swal.fire({
      title: 'Deleted!',
      text: 'Your Data Deleted Sucessfully.',
      icon: 'success',
     
    })
  }
  
  updateDeligenceMaster = async () => {
    debugger
    var UpddateStateData = this.state.duediligencedata;
    var bankcode = (localStorage.getItem("bankdata"))
    var token = (localStorage.getItem("tokendata"))

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token,
      'bankCode': bankcode,
      //'branchcode': 'A1000-01',
      'currentdate': "2020/09/04",
      'defaultlang': 'Eng',
      'currancy': 'INR',
      'userid': '101'
    }

    Swal.fire({
      title: 'Updated!',
      text: 'Your Data Updated Sucessfully.',
      icon: 'success',
      // showCancelButton: true,
      // confirmButtonText: 'Yes',
      // cancelButtonText: 'No'
    })
   await this.props.dispatch(handleUpdateDeligenceMaster(UpddateStateData, headers))
    this.getStateData()
    this.setState({
      duediligencedata: {
        "entityCode": "",
        "fieldname": "",
      
      }, updatebutton: false, savebutton: true
    })
  }
  
  
  
    
     
              
    render() {
        console.log("this.state.duediligencedata",this.state.duediligencedata)
        return (
           <React.Fragment>
                <Universal/> 
                <section id="main-content">
        <section className="wrapper">
          <div className="row">
            <div className="col-lg-9 main-chart">
              <section className="dashboard-counts no-padding-bottom">
               
                <div className="container-fluid" style={{marginTop: '-1rem'}}>
                  <h1 style={{fontSize: '22px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid #e9ecef'}}>Due Diligence Master -</h1>
                  <div className="container-fluid">
                    <div className="row bg-blue has-shadow mt-3" style={{borderRadius: '1rem', background: '#c9ccdf'}}>
                      <div className="col-12 col-md-2 col-lg-2 rightCol">
                        <p  style={{color:"white",fontWeight:"bolder",fontSize:"15px"}}>Entity  <span style={{ color: "red" }}>*</span></p>
                        {/* <p style={{marginTop: '2.5rem',fontWeight:"bolder",fontSize:"15px"}}> State Code</p> */}
                       
                      </div>
                      <div className="col-12 col-md-4" >
                    <div className="form-group">
     <select  className="form-select form-select-sm minimal heightForm"  style={{width: '100%',height:"30px"}} id="entityCode" onChange={this.handleChange}
                     value={this.state.duediligencedata.entityCode != "" ? this.state.duediligencedata.entityCode : ""}  >
                            <option value="">Select Entity </option>
                                                          <option value="Customer">Customer</option>
                                                          <option value="Account">Account</option>
                          </select>
                    </div>
                  </div>
                      <div className="col-11  col-lg-2 rightCol">
                        <p style={{fontWeight:"bolder",color:"white",fontSize:"15px"}} className="">Field<span style={{ color: "red" }}>*</span></p>

                       
                        
                      </div>
                      <div className="col-12 col-md-4" >
                      <div className="form-group">
                    <select  className="form-select form-select-sm minimal heightForm"  style={{width: '100%',height:"30px"}}
                      onChange={this.handleChange} id="fieldname"
                      value={this.state.duediligencedata.fieldname != "" ? this.state.duediligencedata.fieldname : ""}  >
                           <option value="">Select Field </option>

<option value="Mobile Number">Mobile Number</option>
<option value="PAN Number">PAN Number</option>
<option value="Customer Name">Customer Name</option>
<option value="Account Number">Account Number</option>
<option value="Income">Income</option>
<option value="Gender">Gender</option>

                          </select>
                    </div>
                       
                       
                       
                        <div className="row pull-right" style={{marginRight:'-28px'}}>
            
                <div className="pr-3">
            <input type="button"className="btn btn-primary " style={{float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px'}} onClick={() => this.handleClear()} value="Reset" />
                                                                  </div>
                                                                  <div className="pr-3">
              {this.state.savebutton == true ?
                <button type="button" className="btn btn-primary " style={{float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px'}} id="save" onClick={() => this.saveDeligenceMaster()}>Save</button>: ""}
                                                                 
                                                                
             {this.state.updatebutton == true ?
               <button type="button" className="btn btn-primary " style={{float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px'}} id="save" onClick={() => this.updateDeligenceMaster()}>update</button>: ""}
               </div>
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
                        data={this.props.deligencelists}
                        pagination={true}
                        //search
                        ClearSearchButton
                        //exportCSV
                      >
                       
                          <TableHeaderColumn dataField="entityCode" csvHeader="First Name" isKey={true} className={"columnHeaderColor"}
                          expandable={false} editable={false} >Entity</TableHeaderColumn>
                          
                        <TableHeaderColumn dataField="fieldname" csvHeader="Last Name"  className={"columnHeaderColor"}
                          expandable={false} editable={false} >Field Name</TableHeaderColumn>
                        <TableHeaderColumn dataFormat={this.actionMethod} dataField='id' expandable={false} editable={false}  > Action</TableHeaderColumn>
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
const mapStateToProps = (state) => {
  
    const {deligencemasterList} = state.deligenclist
    
    console.log("deligencemasterList", deligencemasterList)
    return {
      
      deligencelists:deligencemasterList
    }
  }
export default connect(mapStateToProps)(due_deligence_master)
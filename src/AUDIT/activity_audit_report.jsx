import React, { Component } from 'react'
import Universal from '../common/universal'
import axios from 'axios'
import {applicationContextPath} from '../common/api'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import Swal from 'sweetalert2'

class activity_audit_report extends Component {
    constructor(props){
        super(props)
  
        this.state={
         getApiData:[],
          fromdate:"",
          todate:"",
          activity:"",
          statusList:[],
          auditData:[]
        }
  }

  componentDidMount() {
    this.getAllAlertStatus();
   
  }
  
  searchData=()=>{
    
    var token = localStorage.getItem("tokendata")
 
    if((this.state.todate==null||this.state.todate==""||this.state.todate==undefined) &&
(this.state.fromdate==null||this.state.fromdate==""||this.state.fromdate==undefined) &&
(this.state.activity==null||this.state.activity==""||this.state.activity==undefined))
{
  Swal.fire("Please Enter All Mandatory Fields");
  return
}

if(this.state.fromdate==null||this.state.fromdate==""||this.state.fromdate==undefined)
{
  Swal.fire("Please enter From date");
return
} 
if(this.state.todate==null||this.state.todate==""||this.state.todate==undefined)
{
  Swal.fire("Please enter To date");
return
}
if(this.state.activity==null||this.state.activity==""||this.state.activity==undefined)
{
  Swal.fire("Please Select activity");
return
}
  
    const param = new URLSearchParams({
        toDate: this.state.todate,
        fromDate: this.state.fromdate,
        activity: this.state.activity,
      })

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token,
      'bankCode': localStorage.getItem("bankdata")
      }
      debugger
    axios.post(applicationContextPath+'/getActivityAudit?'+param,null,{headers})
  .then(response => {
    this.setState({auditData:response.data})
  }

).catch(error => {
    console.log(error);
});
  
  } 


  getAllAlertStatus=()=>{
    debugger
    var token = localStorage.getItem("tokendata")
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token,
      'bankCode': localStorage.getItem("bankdata")
      }

    axios.post(applicationContextPath+'/getAllAlertStatus',null,{headers})
  .then(response => {
    this.setState({statusList:response.data})
  }

).catch(error => {
    console.log(error);
});
  } 

  date = (row,cell) => { 
    let dateParts = cell.createdDate.split("-");
    let year = dateParts[0];
    let month = dateParts[1];
    let day = dateParts[2].split("T");
    let day1 = day[0]
    let hhmm = day[1].split(":")
    let hh = hhmm[0]
    let mm = hhmm[1]

    return(
     <div className='expandcontents'>
        {year+"-"+month+"-"+day1+ " "+hh+":"+mm} 
     </div>
    )
  }

  userName = (row,cell) => { 
    return(
     <div className='expandcontents'>
      {cell.assignedUserId+"-"+cell.assignedUser} 
     </div>
    )
  }

  handleChange= (e)=> {  
    var botapidata1 = this.state.botapidata
    botapidata1[e.target.id] = e.target.value
    this.setState({botapidata:botapidata1});  
    }

    render() {
        const statusList = this.state.statusList.map((item, index) =>
        <option  value={item.alertStatus}>{item.alertStatus}</option>
    );
        return (
            <React.Fragment>
            <Universal/> 
            <section id="main-content">
    <section className="wrapper">
      <div className="row">
        <div className="col-lg-9 main-chart">
          <section className="dashboard-counts no-padding-bottom">
           
            <div className="container-fluid" style={{marginTop: '-1rem'}}>
              <h1 style={{fontSize: '22px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid #e9ecef'}}>Activity Audit Report</h1>
              <div className="container-fluid">
                <div className="row bg-blue has-shadow mt-3" style={{borderRadius: '1rem'}}>
                  <div className="col-12 col-md-2 col-lg-2 rightCol">
                    <p  style={{color:"white",fontWeight:"bolder",fontSize:"15px"}}>From Date  <span style={{color:"red"}}>*</span></p>
                   
                  </div>
                  <div className="col-12 col-md-4" >
                    <div className="form-group">
                    <input className="form-control" id="fromdate" type="date" onChange={(e)=>this.setState({fromdate:e.target.value})} 
                                             value={this.state.fromdate}/>
                    </div>
                  
                   
                  </div>

                  <div className="col-12 col-md-2 col-lg-2 rightCol">
                    <p  style={{color:"white",fontWeight:"bolder",fontSize:"15px"}}>To Date  <span style={{color:"red"}}>*</span></p>
                   
                  </div>
                  <div className="col-12 col-md-4" >
                    <div className="form-group">
                    <input className="form-control" id="todate" type="date" onChange={(e)=>this.setState({todate:e.target.value})} 
                                      value={this.state.todate}/>
                    </div>
                  
                   
                  </div>

                  <div className="col-12 col-md-2 col-lg-2 rightCol">
                    <p  style={{marginTop: '1rem',color:"white",fontWeight:"bolder",fontSize:"15px"}}>Activity  <span style={{color:"red"}}>*</span></p>
                   
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '1rem'}}>
                  <div className="form-group" >
                        <select  id="activity" title="activity" className="form-select form-select-sm minimal heightForm"  style={{width: '100%',height:"auto"}}
                        onChange={(e)=>this.setState({activity:e.target.value})}
                      value={this.state.activity !== "" ? this.state.activity : ""}>
                        <option value="">--Select--</option>
                                                         {statusList}
                    </select>
                        </div>
                  
                   
                  </div>
                
               
                </div>
              </div>
            </div>
            
            <div className="row has-shadow mt-3" style={{borderRadius: '1rem',width:'94%', backgroundColor: 'white', marginTop: '5rem',marginLeft: '3%'}}>
       
            <button type="button" id="Reset"  className="btn btn-primary "  style={{borderColor: '#303974',marginLeft:'90%', backgroundColor: '#303974', fontSize: '15px'}} onClick={()=>this.searchData()}> Search </button>
          
                                    </div>
                                    
          </section>
          <div className="row has-shadow mt-3" style={{borderRadius: '1rem',width:'94%',marginLeft:'3%', backgroundColor: 'white', marginTop: '5rem'}}>
               
                               <div className="col-xs-12">
                               <div className="box">
                               <div className="box-body  no-LR-padding expandcontentscell">
                               <BootstrapTable striped hover
                                       data={this.state.auditData}
                                       pagination={true}
                        //search
                        ClearSearchButton
                        //exportCSV
                      >
                       
                       <TableHeaderColumn  dataField='alertCode'  expandable={false}  editable={false} width="100px" isKey>Activity Id </TableHeaderColumn>
                                       <TableHeaderColumn  dataField='alertSubTypeCode'  expandable={false}  editable={false} width="100px" >Description</TableHeaderColumn>
                                       <TableHeaderColumn dataFormat={this.date}  dataField='createdDate'  expandable={false}  editable={false} width="100px" >Date Time</TableHeaderColumn>
                                       <TableHeaderColumn dataFormat={this.userName} dataField='assignedUser'  expandable={false}  editable={false} width="100px">User Id- Name </TableHeaderColumn>

                      </BootstrapTable>
                               </div>
                               </div>
                                   </div>
                           
                        </div>
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

export default activity_audit_report

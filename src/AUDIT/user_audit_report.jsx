import React, { Component } from 'react'
import Universal from '../common/universal'
import axios from 'axios'
import {applicationContextPath} from '../common/api'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import Swal from 'sweetalert2'


class user_audit_report extends Component {
    constructor(props){
        super(props)
  
        this.state={
         auditData:[],
      
          fromdate:"",
          todate:"",
          userId:"",
          userList:[]
        }
  }

  componentDidMount() {
    this.getUser();
   
  }

  getUser=()=>{
    var token = localStorage.getItem("tokendata")
    var bankCode= localStorage.getItem("bankdata")
  
       const headers = {
         'Content-Type': 'application/json',
         'Authorization': 'Bearer '+token,
         }
     axios.get(applicationContextPath+`/userList?bankCode=${bankCode}`,{headers})
    .then(response => {
      this.setState({userList:response.data})
    }
    ).catch(error => {
     console.log(error);
    });  
}


searchData=()=>{
    debugger
    var token = localStorage.getItem("tokendata")
 
if((this.state.todate==null||this.state.todate==""||this.state.todate==undefined) &&
(this.state.fromdate==null||this.state.fromdate==""||this.state.fromdate==undefined) &&
(this.state.userId==null||this.state.userId==""||this.state.userId==undefined))
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
if(this.state.userId==null||this.state.userId==""||this.state.userId==undefined)
{
  Swal.fire("Please Select UserID");
return
}
    const param = new URLSearchParams({
        toDate: this.state.todate,
        fromDate: this.state.fromdate,
        userId: this.state.userId,
      })

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token,
      'bankCode': localStorage.getItem("bankdata")
      }

    axios.post(applicationContextPath+'/getAlertAuditByUser?'+param,null,{headers})
  .then(response => {
    this.setState({auditData:response.data})
  }

).catch(error => {
    console.log(error);
});

  } 

  date = (row,cell) => { 
    debugger
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
    render() {
        const userList = this.state.userList.map((item, index) =>
        <option  value={item.userId}>{item.firstName+" "+item.lastName}</option>
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
              <h1 style={{fontSize: '22px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid #e9ecef'}}>User Audit Report</h1>
              <div className="container-fluid">
                <div className="row bg-blue has-shadow mt-3" style={{borderRadius: '1rem'}}>
                  <div className="col-12 col-md-2 col-lg-2 rightCol">
                    <p  style={{color:"white",fontWeight:"bolder",fontSize:"15px"}}>From Date <span style={{color:"red"}}>*</span></p>
                   
                  </div>
                  <div className="col-12 col-md-4" >
                    <div className="form-group">
                    <input  className="form-control" id="fromdate" type="date" onChange={(e)=>this.setState({fromdate:e.target.value})} />

                    </div>
                  
                   
                  </div>

                  <div className="col-12 col-md-2 col-lg-2 rightCol">
                    <p  style={{color:"white",fontWeight:"bolder",fontSize:"15px"}}>To Date  <span style={{color:"red"}}>*</span></p>
                   
                  </div>
                  <div className="col-12 col-md-4" >
                    <div className="form-group">
                    <input className="form-control" id="todate" type="date" onChange={(e)=>this.setState({todate:e.target.value})} />
                    </div>
                  
                   
                  </div>

                  <div className="col-12 col-md-2 col-lg-2 rightCol">
                    <p  style={{marginTop: '1rem',color:"white",fontWeight:"bolder",fontSize:"15px"}}>User  <span style={{color:"red"}}>*</span></p>
                   
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '1rem'}}>
                  <div className="form-group" >
                        <select  id="userId" title="userId" className="form-select form-select-sm minimal heightForm"  style={{width: '100%',height:"auto"}}
                        onChange={(e)=>this.setState({userId:e.target.value})}
                        value={this.state.userId}>
                       <option value="">--Select--</option>
                                                      {userList}
                    </select>
                        </div>
                  
                   
                  </div>
                
               
                </div>
              </div>
            </div>
            
            <div className="row has-shadow mt-3" style={{borderRadius: '1rem', backgroundColor: 'white', width:'94%',marginTop: '5rem',marginLeft: '3%'}}>
           
            <button type="button" id="Reset"  className="btn btn-primary " style={{borderColor: '#303974',marginLeft:'90%', backgroundColor: '#303974', fontSize: '15px'}} onClick={()=>this.searchData()}> Search </button>
                 
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
                       
                       <TableHeaderColumn dataField='assignedUserId'  expandable={false}  editable={false} width="100px" isKey>User Id </TableHeaderColumn>
                                       <TableHeaderColumn  dataField='assignedUser'  expandable={false}  editable={false} width="100px" >User Name</TableHeaderColumn>
                                       <TableHeaderColumn dataFormat={this.date} dataField='id'  expandable={false}  editable={false} width="100px" >Date Time</TableHeaderColumn>

                                       <TableHeaderColumn  dataField='alertStatus'  expandable={false}  editable={false} width="100px">Activity </TableHeaderColumn>
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

export default user_audit_report

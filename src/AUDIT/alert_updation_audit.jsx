import React, { Component } from 'react'
import Universal from '../common/universal'
import axios from 'axios'
import {applicationContextPath} from '../common/api'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

class alert_updation_audit extends Component {
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
  //this.getUser();
 
}
searchData=()=>{
  debugger
  var token = localStorage.getItem("tokendata")

  const param = new URLSearchParams({
      toDate: this.state.todate,
      fromDate: this.state.fromdate,
    //  userId: this.state.userId,
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

componentDidMount() {
  this.getAllAlertStatus();
 
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
              <h1 style={{fontSize: '22px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid #e9ecef'}}>Alert Updation Audit Report</h1>
              <div className="container-fluid">
                <div className="row bg-blue has-shadow mt-3" style={{borderRadius: '1rem'}}>
                  <div className="col-12 col-md-2 col-lg-2 rightCol">
                    <p  style={{color:"white",fontWeight:"bolder",fontSize:"15px"}}>From Date  <span style={{color:"red"}}>*</span></p>
                   
                  </div>
                  <div className="col-12 col-md-4" >
                    <div className="form-group">
                    <input className="form-control" id="fromdate" type="date"  onChange={(e)=>this.setState({fromdate:e.target.value})} 
                                             value={this.state.fromdate}  />
                    </div>
                  
                   
                  </div>

                  <div className="col-12 col-md-2 col-lg-2 rightCol">
                    <p  style={{color:"white",fontWeight:"bolder",fontSize:"15px"}}>To Date  <span style={{color:"red"}}>*</span></p>
                   
                  </div>
                  <div className="col-12 col-md-4" >
                    <div className="form-group">
                    <input className="form-control" id="todate" type="date"  onChange={(e)=>this.setState({todate:e.target.value})} 
                                      value={this.state.todate}
                                     />
                    </div>
                  
                   
                  </div>

                  <div className="col-12 col-md-2 col-lg-2 rightCol">
                    {/* <h4 className="searchFilter" style={{fontFamily: 'LATO-BOLD', color: '#303974'}}></h4> */}
                    {/* <p  style={{marginTop: '1rem',color:"white",fontWeight:"bolder",fontSize:"15px"}}>Alert  <span style={{color:"red"}}>*</span></p> */}
                   
                  </div>
                  {/* <div className="col-12 col-md-4" style={{marginTop: '1rem'}}>
                  <div className="form-group" >
                        <select  id="activity" title="activity" className="form-select form-select-sm minimal heightForm"  style={{width: '100%',height:"auto"}}
                        onChange={(e)=>this.setState({activity:e.target.value})}
                      >
                        <option value="">--Select--</option>

                    </select>
                        </div>
                  
                   
                  </div> */}
                
               
                </div>
              </div>
            </div>
            
            <div className="row has-shadow mt-3" style={{borderRadius: '1rem', width:'94%',backgroundColor: 'white', marginTop: '5rem',marginLeft: '3%'}}>
            <button type="button" id="Reset" style={{borderColor: '#303974',marginLeft:'90%', backgroundColor: '#303974', fontSize: '15px'}} className="btn btn-primary " onClick={()=>this.searchData()} > Search </button>
                                    </div>
                                    
          </section>
          <div className="row has-shadow mt-3" style={{borderRadius: '1rem',width:'94%',marginLeft:'3%', backgroundColor: 'white', marginTop: '5rem'}}>
                
                               <div className="col-xs-12">
                               <div className="box">
                               <div className="box-body  no-LR-padding expandcontentscell">
                               <BootstrapTable striped hover
                                    //    data={this.state.auditData}
                                     pagination={true}
                        //search
                        ClearSearchButton
                        //exportCSV
                      >
                       
                       {/* <TableHeaderColumn   dataField='alertId'  expandable={false}  editable={false} width="50px" isKey> Alert ID</TableHeaderColumn>
                                       <TableHeaderColumn   dataField='Previous_Value'  expandable={false}  editable={false} width="150px" >Previous Value</TableHeaderColumn>
                                       <TableHeaderColumn   dataField='Current_Value'  expandable={false}  editable={false} width="150px" >Current Value	</TableHeaderColumn>

                                       <TableHeaderColumn   dataField='Updated_Date'  expandable={false}  editable={false} width="70px" >Updated Date </TableHeaderColumn>
                                       <TableHeaderColumn   dataField='Updated_By'  expandable={false}  editable={false} width="70px" >Updated By</TableHeaderColumn>
                                       <TableHeaderColumn   dataField='Authorised_By'  expandable={false}  editable={false} width="90px" >Authorized By</TableHeaderColumn>
                                       <TableHeaderColumn  dataField='id'  expandable={false}  editable={false} width="1px" ></TableHeaderColumn> */}


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

export default alert_updation_audit

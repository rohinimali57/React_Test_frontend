import React, { Component } from 'react'
import Universal from '../common/universal'
import axios from 'axios'
import {applicationContextPath,birtReport} from '../api/api'
import 'react-s-alert/dist/s-alert-default.css';
import Swal from 'sweetalert2'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class confirmed_fraud_report extends Component {
    constructor(props){
        super(props)

        this.state={
         getApiData:[],
         fromDate:"",
         toDate:"",
         amount:"",
         operatorValue:""

        }        
  }

  componentDidMount() {
    // this.getApiData();
   
  }


getData=()=>{
  debugger
    if((this.state.fromDate===null||this.state.fromDate===""||this.state.fromDate===undefined)||
    (this.state.toDate===null||this.state.toDate===""||this.state.toDate===undefined) ||
    (this.state.operatorValue===null||this.state.operatorValue===""||this.state.operatorValue===undefined)||
    (this.state.amount===null||this.state.amount===""||this.state.amount===undefined)    
    ){
       Swal.fire("Please Fill the All Details");
     return
    }
   if (isNaN(this.state.amount)) {
      Swal.fire("Please Fill Valid Amount");
      return
    } else if (this.state.amount <= 0) {
      Swal.fire("Please Fill Valid Amount");
     return
    }
    return '';

    var createA = document.createElement('a');
    createA.setAttribute('href', birtReport+`/aml/confirmCaseReport?bankCode=${localStorage.getItem("bankdata")}&amount=${this.state.amount}&fromDate=${this.state.fromDate}&toDate=${this.state.toDate}&operatorValue=${this.state.operatorValue}`);
    createA.click()
}



    render(){

      
        return (
           <React.Fragment>
             {/* <div id="loader-wrapper">
                    <div id="loader"></div>
                </div> */}
                <Universal/> 
                <section id="main-content">
        <section className="wrapper">
          <div className="row">
            <div className="col-lg-9 main-chart">
              <section className="dashboard-counts no-padding-bottom">
               
                <div className="container-fluid" style={{marginTop: '-1rem'}}>
                  <h1 style={{fontSize: '22px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid #e9ecef'}}>Confirmed Case Report</h1>
                  <div className="container-fluid">
                    <div className="row  bg-blue  has-shadow mt-3" style={{borderRadius: '1rem', background: '#c9ccdf'}}>
                      <div className="col-12 col-md-2 col-lg-2 rightCol">
                        <p  style={{fontWeight:"bolder",color:"white",fontSize:"15px"}}>From Date <span style={{ color: "red" }}>*</span></p>
                        </div>
                        <div className="col-12 col-md-4" >
                        <div className="form-group">
                        <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                      id="fromdate" type ="date"onChange={(e)=>this.setState({fromDate:e.target.value})} value={this.state.fromDate}/>
                        </div>
                        </div>

                        <div className="col-11  col-lg-2 rightCol">
                        <p style={{fontWeight:"bolder",color:"white",fontSize:"15px"}} className="">To Date <span style={{ color: "red" }}>*</span></p>
                        </div>
                        <div className="col-12 col-md-4" >
                        <div className="form-group">
                        <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                         id="todate" type="date" onChange={(e)=>this.setState({toDate:e.target.value})}
                         value={this.state.toDate}/>
                        </div>
                        </div>

                       
                         <div className="col-11  col-lg-2 rightCol">
                        <p style={{marginTop: '1rem',fontWeight:"bolder",color:"white",fontSize:"15px"}} className="">Operator <span style={{ color: "red" }}>*</span></p>
                        </div>
                        <div className="col-12 col-md-4" style={{marginTop: '1rem'}}>
                        <div className="form-group" style={{marginTop: '0rem'}}>
                        <select id="operatorValue" className="form-control select2" className="form-select form-select-sm minimal heightForm"  style={{width: '100%',height:"auto"}}
                                     value={this.state.operatorValue} onChange={(e)=>this.setState({operatorValue:e.target.value})}>
                                    <option value="">--Select--</option>
                                    <option value=">">&gt;</option>
                                    <option value="=">=</option>
                                    <option value=">=">&gt;=</option>
                                    <option value="!=">!=</option>
                                    <option value="<">&lt;</option>
                                    <option value="<=">&lt;=</option>
                                </select>
                        </div>
                        </div>

                        <div className="col-12 col-md-2 col-lg-2 rightCol">
                        <p style={{marginTop: '1rem',fontWeight:"bolder",color:"white",fontSize:"15px"}}>Amount <span style={{ color: "red" }}>*</span></p>
                         </div>
                         <div className="col-12 col-md-4" style={{marginTop: '1rem'}}>
                         <div className="form-group" style={{marginTop: '0rem'}}>
                        <input type="text" placeholder="Enter Amount" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                           value={this.state.amount} onChange={(e)=>this.setState({amount:e.target.value})}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row has-shadow mt-3" style={{ borderRadius: '1rem', width: '94%', backgroundColor: 'white', marginTop: '5rem', marginLeft: '29px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <button type="button" id="Reset" style={{ borderColor: '#303974', backgroundColor: '#303974', fontSize: '15px',marginLeft :'70%' }} onClick={() => this.getApiData()} className="btn btn-primary">View</button>
    <button type="button" id="Download" style={{ borderColor: '#303974', backgroundColor: '#303974', fontSize: '15px' }} onClick={() => this.downloadData()} className="btn btn-primary">Download</button>
</div>
            
              </section>

              <section className="content">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box">
                                <div className="box-body  no-LR-padding expandcontentscell bs-table-actionButton">
                                <h4 class="thick" style ={{color:'black'}}></h4>
                                  
                                  <div  style={{
                                      marginTop :"20px",
                                      marginLeft:"48px"}}>
                                      <BootstrapTable
                                        data={this.state.getApiData}
                                        pagination={true}
                                        // search
                                        // ClearSearchButton
                                        // exportCSV
                                    >
                                    <TableHeaderColumn dataFormat={this.customerId} dataField="Role-Name" csvHeader="First Name" isKey={true} className={"columnHeaderColor"}
                                        expandable={false}  editable={false} width="50px">Customer Id</TableHeaderColumn>
                                        
                                    <TableHeaderColumn dataFormat={this.caseReportedDate} dataField="Role-Name" csvHeader="First Name" className={"columnHeaderColor"}
                                       expandable={false}  editable={false}  width="50px">Case Reported Date</TableHeaderColumn>

                                    <TableHeaderColumn dataFormat={this.caseId} dataField="Role-Name" csvHeader="First Name" className={"columnHeaderColor"}
                                       expandable={false}  editable={false} width="50px">Case Id</TableHeaderColumn>

                                    <TableHeaderColumn dataFormat={this.caseReportedby} dataField="Role-Name" csvHeader="First Name" className={"columnHeaderColor"}
                                       expandable={false}  editable={false} width="50px">Case Reported By</TableHeaderColumn>
                            
                                    <TableHeaderColumn dataFormat={this.analysis} dataField="Role-Name" csvHeader="First Name" className={"columnHeaderColor"}
                                        expandable={false}  editable={false} width="100px">Analysis</TableHeaderColumn>

                                        {/* <TableHeaderColumn  dataField="Role-Name" csvHeader="First Name" className={"columnHeaderColor"}
                                        expandable={false}  editable={false} width="10px"></TableHeaderColumn> */}

                                    </BootstrapTable>
                                  </div>
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


export default confirmed_fraud_report

import React, { Component } from 'react'
import Universal from '../common/universal'
import axios from 'axios'
import {applicationContextPath} from '../common/api'
import Swal from 'sweetalert2'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'


class rules_exception_mark extends Component {
    constructor(props){
        super(props)

        this.state={
         ruleData:[],
         customerList:[],
         getApiData:[],
         senarioDescription:"",
         selectedCustomer:"",
         reasonException:"",
         fromDate:"",
         toDate:""
        }
  }

  componentDidMount() {
    this.getBaseRule();
    this.getCustomerList()
  }

  
handleChange1= ()=> {  
  debugger
  this.setState({  
    senarioDescription:"",
         selectedCustomer:"",
         reasonException:"",
         fromDate:"",
         toDate:""
  
 })
  } 

  getBaseRule=()=>{
    debugger
    var token = localStorage.getItem("tokendata")
     var bankCode= localStorage.getItem("bankdata")


      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token,
        }
    axios.get(applicationContextPath+`/getBaseRules?bankCode=${bankCode}`,{headers})
  .then(response => {
    console.log(response.data)
    this.setState({ruleData:response.data})
  }

).catch(error => {
    console.log(error);
});

} 

getCustomerList=()=>{
    var token = localStorage.getItem("tokendata")

    var data={}
    data.bankCode = localStorage.getItem("bankdata")

       const headers = {
         'Content-Type': 'application/json',
         'Authorization': 'Bearer '+token,
         }
     axios.post(applicationContextPath+`/getCustomerList`,data,{headers})
    .then(response => {
      this.setState({customerList:response.data})
    }
    ).catch(error => {
     console.log(error);
    });  
  }


  saveRuleException=()=>{
    debugger
    if((this.state.senarioDescription==null||this.state.senarioDescription===""||this.state.senarioDescription===undefined)||
    (this.state.selectedCustomer==null||this.state.selectedCustomer===""||this.state.selectedCustomer===undefined)||
    (this.state.fromDate==null||this.state.fromDate===""||this.state.fromDate==undefined)||
    (this.state.toDate==null||this.state.toDate==""||this.state.toDate==undefined)||
    (this.state.reasonException==null||this.state.reasonException==""||this.state.reasonException==undefined)
    ){
       Swal.fire("Please Fill the All Details");
     return
    }
    var token = localStorage.getItem("tokendata")

    var customerData = this.state.selectedCustomer.split("-")

    var data={}
    data.bankCode = localStorage.getItem("bankdata")
    data.customerName = customerData[1]
    data.cust_code = customerData[0]
    data.fromDate = this.state.fromDate
    data.toDate = this.state.toDate
    data.senarioDescription = this.state.senarioDescription
    data.reasonException = this.state.reasonException
       const headers = {
         'Content-Type': 'application/json',
         'Authorization': 'Bearer '+token,
         }
     axios.post(applicationContextPath+`/saveRuleException`,data,{headers})
    .then(response => {
        this.setState({selectedCustomer:"",fromDate:"",toDate:"",senarioDescription:"",reasonException:""})
        Swal.fire(response.data.mesg);
    }
    ).catch(error => {
     console.log(error);
    });  
}

handleChangeCustomer=(e)=>{
    this.setState({selectedCustomer:e.target.value})
  }

  
    render() {
        const rules = this.state.ruleData.map((item) =>
        <option  value={item.scenarioDescription}>{item.scenarioDescription}</option>
       );

       let customer =  this.state.customerList.map(value => (
        <option value={value.custCode+"-"+value.customerName}>{value.custCode}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{value.customerName}</option>
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
              <h1 style={{fontSize: '22px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid #e9ecef'}}>Rules Exception Mark</h1>
              <div className="container-fluid">
                <div className="row bg-blue has-shadow mt-3" style={{borderRadius: '1rem'}}>
                <div className="col-12 col-md-2 col-lg-2 rightCol">
                    <p  style={{color:"white",fontWeight:"bolder",fontSize:"15px"}}>Rule  <span style={{color:"red"}}>*</span></p>
                   
                  </div>
                  <div className="col-12 col-md-4" >
                  <div className="form-group" >
                        <select  id="senarioDescription" title="senarioDescription" className="form-select form-select-sm minimal heightForm"  style={{width: '100%',height:"auto"}}
                        value={this.state.senarioDescription}
                        onChange={(e)=>this.setState({senarioDescription:e.target.value})}           >
                        <option value="">--Select--</option>
                        <option value="Ready" >Ready</option>
                        <option value="Start" >Start</option>
                        <option value="Stop" >Stop</option>
                        {rules}
                    </select>
                        </div>
                  
                   
                  </div>
                  <div className="col-12 col-md-2 col-lg-2 rightCol">
                    <p  style={{color:"white",fontWeight:"bolder",fontSize:"15px"}}>Exception For Customer  <span style={{color:"red"}}>*</span></p>
                   
                  </div>
                  <div className="col-12 col-md-4" >
                  <div className="form-group" >
                        <select  id="exception" title="exception" className="form-select form-select-sm minimal heightForm"  style={{width: '100%',height:"auto"}}
                         value={this.state.selectedCustomer}
                         onChange={(e)=>this.handleChangeCustomer(e)}  >
                        <option value="">--Select--</option>
                        
                        {customer}
                    </select>
                        </div>
                  
                   
                  </div>
                  <div className="col-12 col-md-2 col-lg-2 rightCol">
                    <p  style={{marginTop: '1rem',color:"white",fontWeight:"bolder",fontSize:"15px"}}>From Date  <span style={{color:"red"}}>*</span></p>
                   
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '1rem'}}>
                    <div className="form-group">
                    <input className="form-control" id="fromDate" type="date"  
 onChange={(e)=>this.setState({fromDate:e.target.value})}
 value={this.state.fromDate}                                            />
                    </div>
                  
                   
                  </div>

                  <div className="col-12 col-md-2 col-lg-2 rightCol">
                    <p  style={{marginTop: '1rem',color:"white",fontWeight:"bolder",fontSize:"15px"}}>To Date  <span style={{color:"red"}}>*</span></p>
                   
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '1rem'}}>
                    <div className="form-group">
                    <input className="form-control" id="toDate" type="date"  
                   onChange={(e)=>this.setState({toDate:e.target.value})}
                   value={this.state.toDate}
                                     />
                    </div>
                  
                   
                  </div>
                  <div className="col-12 col-md-2 col-lg-2 rightCol">
                    <p  style={{marginTop: '1rem',color:"white",fontWeight:"bolder",fontSize:"15px"}}>Reason For Exception <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-10" style={{marginTop: '1rem'}}>
                    <div className="form-group">
                    <input type="text" placeholder="Exception Reason"  id="reasonException" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                      onChange={(e)=>this.setState({reasonException:e.target.value})}
                     value={this.state.reasonException}
                     />
                    </div>
                  </div>
                 
                
               
                </div>
              </div>
            </div>
            
            <div className="row has-shadow mt-3" style={{borderRadius: '1rem', backgroundColor: 'white',width:'94%', marginTop: '5rem',marginLeft: '29px'}}>
            <button type="button" id="Save"  className="btn btn-primary "  style={{borderColor: '#303974',marginLeft:'90%', backgroundColor: '#303974', fontSize: '15px'}}  onClick={() => this.saveRuleException()}  > Save </button>
            {/* <button type="button" className="btn btn-primary " style={{borderColor: '#303974', marginLeft:'82%',backgroundColor: '#303974', fontSize: '15px',marginTop: "-37px"}} id="Reset" onClick={() => this.handleChange1()}
            >Reset</button> */}
                                    </div>
                                    <div style={{
                                   marginTop: "20px",
                                   marginRight :"-250px"

                  }}>

                    <BootstrapTable striped hover
                      data={this.state.getApiData}
                      pagination={ true }
                      //  pagination={true}
                      // search
                      ClearSearchButton
                    // exportCSV

                    >
                      <TableHeaderColumn dataField="id" csvHeader="First Name" isKey={true} className={"columnHeaderColor"}
                        expandable={false} editable={false} width="180px"> Rule </TableHeaderColumn>

                      <TableHeaderColumn dataFormat={this.description} dataField="scenarioDescription" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                        expandable={false} editable={false} width="70px"> Exception For Customer </TableHeaderColumn>

                      <TableHeaderColumn dataField="type" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                        expandable={false} editable={false} width="60px"> From Date </TableHeaderColumn>

                      <TableHeaderColumn dataField="customer" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                        expandable={false} editable={false} width="60px"> To Date </TableHeaderColumn>

                      <TableHeaderColumn dataField="sevrity" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                        expandable={false} editable={false} width="170px"> Reason For Exception </TableHeaderColumn>

                      <TableHeaderColumn dataField="status" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                        expandable={false} editable={false} width="45px"> Action </TableHeaderColumn>


                      {/* <TableHeaderColumn dataFormat={this.action}  dataField="Edit" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                                     expandable={false} editable={false} width="25px">Action</TableHeaderColumn> */}
                    </BootstrapTable>

                  </div>
                                    
          </section>
        </div>
       
      </div>
      {/* /row */}
    </section>
  </section>
       </React.Fragment>
        )
    }
}

export default rules_exception_mark

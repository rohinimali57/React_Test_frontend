import React, { Component } from 'react'
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Tab, Tabs, TabList } from 'react-bootstrap'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Universal from '../src/common/universal'
import { connect } from 'react-redux'
import {handlegetCustomers,handlegetCustomersAccount,handlegetTransactionSearch} from '../src/actions/customer'
import {handleTransactionRiskProfile,handleRiskGraphData,handleKYCRiskProfile} from '../src/actions/dedup'


class View_customers extends Component {
    constructor(props){
        super(props)

        this.state={
            searchbutton:true,
         getApiData:[],
        transactiondata:{
            "acctNo":"",
            "cashflowType":"",
            "transactionAmount":"",
            "toDate":"",
            "fromDate":"",
            "operator":"",
           
           // token : (localStorage.getItem("tokendata"))
          },
        botapidata2:{
            "acctNo":"",
            "customerName":"",
            "acctType":"",
            "acctBaseBr":"",
            "acctStatus":"",
            "acctCreatedDt":"",
            "acctOprnMode":"",
            "acctHasNominee":"",
            token : (localStorage.getItem("tokendata"))
          },
        }        
  }


    componentDidMount= async()=> {
        debugger
        let custCodes = this.props.location.state;
        var custCode = custCodes.custCode
        var branchCode= custCodes.baseBrCode
  
      console.log("urlQuery", custCode)
      var token = (localStorage.getItem("tokendata"))
      const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token,
          
        }
     this.props.dispatch(handlegetCustomers(custCode,headers));
     this.props.dispatch(handlegetCustomersAccount(custCode,headers));
     this.props.dispatch(handleTransactionRiskProfile(custCode,branchCode,headers));
     this.props.dispatch(handleRiskGraphData(custCode,branchCode,headers));
     this.props.dispatch(handleKYCRiskProfile(custCode,branchCode,headers));
  
    
  //    this.saveStateMaster();
  
    }

    FindTransaction = async()  => {
        debugger
        let custCodes = this.props.location.state;
        console.log("data---",custCodes)
        //var stateData = this.state.transactiondata;
        var acctNo = this.state.transactiondata.acctNo
        var custCode =custCodes
        var cashflowType = this.state.transactiondata.cashflowType
        var transactionAmount = this.state.transactiondata.transactionAmount
        var toDate = this.state.transactiondata.toDate
        var fromDate = this.state.transactiondata.fromDate
        var operator = this.state.transactiondata.operator
        // var bankcode = (localStorage.getItem("bankdata"))
        var token = (localStorage.getItem("tokendata"))
      
        const headers = {
        //   'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token,
        //   'bankCode': bankcode,
          // 'branchcode': 'A1000-01',
          // 'currentdate': "2020/09/04",
          // 'defaultlang': 'Eng',
          // 'currancy': 'INR',
          // 'userid': '101'
        }
        this.props.dispatch(handlegetTransactionSearch(acctNo,cashflowType,transactionAmount,toDate,fromDate,operator,custCode,headers));
      
      }

      transactionNo = (row,cell) => { 
        return(
        <div style={{color:'blue'}}  onClick={() => this.SaveApiData1(row)}>
          <a href="">  {cell.txnNo} </a>
        </div>
        )
    }

      SaveApiData1 = (row) => { 
        debugger
        var custcodes = this.props.location.state
         var cust = custcodes.custCode
         console.log("bb",cust)
        var txn_no = {}
        txn_no.txn_no=row
        txn_no.custCode = cust
        this.props.history.push('/Transactiontable',txn_no);
    
    }

    
      SaveApiData=()=>{     
        this.props.history.push('/createCase');   
    }

      handleChange= (e)=> {  
        var botapidata1 = this.state.transactiondata
        botapidata1[e.target.id] = e.target.value
        this.setState({transactiondata:botapidata1});  
        }
    render() {
        let optionTemplate = this.props.Customersacclist.map(value => (
            <option value={value.acctNo}>{value.acctNo}</option>
          ));
        return (
            <React.Fragment>
                              <Universal/>
                              <section id="main-content">
        <section className="wrapper">
            <div>
            <table  align="center" width="95%" border="1px solid black" style={{margin: 14,marginLeft: -10}}>
        <thead>
        <tr style={{textAlign: 'center', color: 'white', background: '#303974'}}>
            <th>Customer Number</th>
            <th>Customer Name</th>
            <th>PEP Status</th>
            <th>Country Risk</th>
        </tr>
        </thead>
        <tbody style={{color: 'blue'}}>
            <tr>
                <td width="23%"><input style={{color:'black'}} value={this.props.Customerlists.custCode}/></td>
                <td width="40%"><input style={{color:'black'}} value={this.props.Customerlists.customerName}/></td>
                <td width="18%"><input style={{color:'black'}} value={this.props.Customerlists.isPEP}/></td>
                <td width="19%"><input style={{color:'black'}} value={this.props.Customerlists.riskManual}/></td>
            </tr>
        </tbody>
    </table>
    <Tabs border="2px solid black"  role="tablist" style={{paddingLeft: '-10%'}}  defaultActiveKey="home" id="uncontrolled-tab-example">
        <Tab eventKey="home" title="Customer Profile" >
        <form>
                           

                           <div class="container">
<div class="table-responsive">          
<table  align="left" width="90%" border="1px solid black" style={{margin: 30}} >
<thead>
  <tr>
    <th colSpan="4" style={{textAlign: 'left', color: 'white', background: '#303974'}}>Customer Details</th>
 </tr>
</thead>
<tbody style={{color: 'black', fontWeight: 'bold'}}>
    <tr>
        <td width="20%" >Name</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser" value={this.props.Customerlists.customerName} title="Header Color" type="text" > 
               
                </input>
            </div>
        </td>
         <td width="20%" >Short_Name</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser" value={this.props.Customerlists.customerFName} title="Header Color" type="text" /> 
            </div>
        </td>
    </tr>
    <tr>
        <td width="20%" >Address Line1</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser" value={this.props.Customerlists.addr1} title="Header Color" type="text" /> 
            </div>
        </td>
         <td width="20%" >Address Line2</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control"  id="assignedUser" value={this.props.Customerlists.addr2} title="Header Color" type="text" /> 
            </div>
        </td>
    </tr>
    <tr>
        <td width="20%" >Address Line3</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser" value={this.props.Customerlists.addr3} title="Header Color" type="text" /> 
            </div>
        </td>
         <td width="20%" >Address Line4</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser" value={this.props.Customerlists.addr3} title="Header Color" type="text" /> 
            </div>
        </td>
    </tr>
    <tr>
        <td width="20%" >State </td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser" value={this.props.Customerlists.state} title="Header Color" type="text" /> 
            </div>
        </td>
         <td width="20%" >Phone Number </td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser" value={this.props.Customerlists.mobileNo} title="Header Color" type="text" /> 
            </div>
        </td>
    </tr>
    <tr>
        <td width="20%" >Zip Code</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser" value={this.props.Customerlists.postalCode} title="Header Color" type="text" /> 
            </div>
        </td>
         <td width="20%" >Customer Credit Line </td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser"   title="Header Color" type="text" /> 
            </div>
        </td>
    </tr>
    <tr>
        <td width="20%" >National Id No</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser" value={this.props.Customerlists.nationalId1} title="Header Color" type="text" /> 
            </div>
        </td>
         <td width="20%" >Date of Birth</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser" value={this.props.Customerlists.customerDOB} title="Header Color" type="text" /> 
            </div>
        </td>
    </tr>
    <tr>
        <td width="20%" >Employer Name</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser" value={this.props.Customerlists.employersName} title="Header Color" type="text" /> 
            </div>
        </td>
         <td width="20%" >Business Phone No</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser" value={this.props.Customerlists.phoneNo} title="Header Color" type="text" /> 
            </div>
        </td>
    </tr>
    <tr>
        <td width="20%" >Customer Status</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser" value={this.props.Customerlists.customerStatus} title="Header Color" type="text" /> 
            </div>
        </td>
         <td width="20%" >Nationality</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser" value={this.props.Customerlists.nationality} title="Header Color" type="text" /> 
            </div>
        </td>
    </tr>
    <tr>
        <td width="20%" >Sex</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser" value={this.props.Customerlists.customerGender} title="Header Color" type="text" /> 
            </div>
        </td>
         <td width="20%" >Martial Status</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser"  title="Header Color" type="text" /> 
            </div>
        </td>
    </tr>
    <tr>
        <td width="20%" >No. Of Dependents</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser" value={this.props.Customerlists.noOfDependants} title="Header Color" type="text" /> 
            </div>
        </td>
         <td width="20%" >Type Of Bank Account</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser" value={this.props.Customerlists.typeOfBusiness} title="Header Color" type="text" /> 
            </div>
        </td>
    </tr>
    <tr>
        <td width="20%" >Risk Score</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser" value={this.props.Customerlists.customerRiskCalc} title="Header Color" type="text" /> 
            </div>
        </td>
         <td width="20%" >Customer Category</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser" value={this.props.Customerlists.customerCategory} title="Header Color" type="text" /> 
            </div>
        </td>
    </tr>
    <tr>
        <td width="20%"> Guarantor Suitability</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser" title="Header Color" type="text" /> 
            </div>
        </td>
         <td width="20%" >Home Owner</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser" title="Header Color" type="text" /> 
            </div>
        </td>
    </tr>
    <tr>
        <td width="20%" >Joint Owner</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser" title="Header Color" type="text" /> 
            </div>
        </td>
         <td width="20%" >Type of Residence</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser"  title="Header Color" type="text" /> 
            </div>
        </td>
    </tr>
    <tr>
        <td width="20%" >Period of Residence</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser"  title="Header Color" type="text" /> 
            </div>
        </td>
         <td width="20%" >Local Expenditure Zone Code</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser"  title="Header Color" type="text" /> 
            </div>
        </td>
    </tr>
    <tr>
        <td width="20%" >Occupation Code</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser"  title="Header Color" type="text" /> 
            </div>
        </td>
         <td width="20%" >Year in Current Employement</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser" value={this.props.Customerlists.yearsOfService} title="Header Color" type="text" /> 
            </div>
        </td>
    </tr>
    <tr>
        <td width="20%" >Type of Employer Code</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser" title="Header Color" type="text" /> 
            </div>
        </td>
         <td width="20%" >Direct Mail Indicator</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser"  title="Header Color" type="text" /> 
            </div>
        </td>
    </tr>
    <tr>
        <td width="20%" >Billing Cycle</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser"  title="Header Color" type="text" /> 
            </div>
        </td>
         <td width="20%" >Tax exemption No.</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser"  title="Header Color" type="text" /> 
            </div>
        </td>
    </tr>
    <tr>
        <td width="20%" >Address expiration Details</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser"  title="Header Color" type="text" /> 
            </div>
        </td>
         <td width="20%" >Statement usage</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser"  title="Header Color" type="text" /> 
            </div>
        </td>
    </tr>
    <tr>
        <td width="20%" >Card Mailer Usage</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser"  title="Header Color" type="text" /> 
            </div>
        </td>
         <td width="20%" >PIN Mailer Usage</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser"  title="Header Color" type="text" /> 
            </div>
        </td>
    </tr>
    <tr>
        <td width="20%" >Collection Usage</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser"  title="Header Color" type="text" /> 
            </div>
        </td>
         <td width="20%" >Direct Mail Usage</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser"  title="Header Color" type="text" /> 
            </div>
        </td>
    </tr>
    <tr>
        <td width="20%" >Member Since</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser"  title="Header Color" type="text" /> 
            </div>
        </td>
         <td width="20%" >Overlimit Percentage</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser"  title="Header Color" type="text" /> 
            </div>
        </td>
    </tr>

    <tr>
        <td width="20%" >Customer Income</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser" value={this.props.Customerlists.currAnnualIncome} title="Header Color" type="text" /> 
            </div>
        </td>
         <td width="20%" >National ID No.</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser" value={this.props.Customerlists.nationalId1} title="Header Color" type="text" /> 
            </div>
        </td>
    </tr>
    <tr>
        <td width="20%" >Permanent Credit Limit</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser"  title="Header Color" type="text" /> 
            </div>
        </td>
         <td width="20%" >Current Credit Limit</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser"  title="Header Color" type="text" /> 
            </div>
        </td>
    </tr>
    <tr>
        <td width="20%" >Temporial Credit Limit</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser"  title="Header Color" type="text" /> 
            </div>
        </td>
         <td width="20%" >Effective Date</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser" value={this.props.Customerlists.modifiedDate} title="Header Color" type="text" /> 
            </div>
        </td>
    </tr>
    <tr>
        <td width="20%" colspan="4" >
        <div className=" min-height30"/>
        </td>
    </tr>
  
   

    <tr style={{textAlign: 'center'}}>
        <td colSpan="4" >
        <button type="button" id="Reset" style={{borderColor: '#303974', backgroundColor: '#303974', fontSize: '15px'}} onClick={() => this.SaveApiData()} 
                        className="btn btn-primary " > Create Case </button>

        </td>  
        
    </tr>

</tbody>
</table>

</div>
</div>

            </form>
                                    </Tab>
        <Tab eventKey="profile" title="Account Profile">
        <section class="wrapper">
        <section className="content">
                             <BootstrapTable
                                      data={this.props.Customersacclist}
                                    //   pagination={true}
                                     // search
                                      ClearSearchButton
                                    //  exportCSV
                                      
                                   //    trClassName={this.rowClassNameFormat}
                                    >
                                     
                                     <TableHeaderColumn  dataField="acctNo" csvHeader="First Name" isKey={true} className={"columnHeaderColor"}
                                       expandable={false}  editable={false} width="100px">Account Number
                                       </TableHeaderColumn>
               
                                       <TableHeaderColumn  dataField="createdBy"  csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                                       expandable={false} editable={false}   width="100px">Name</TableHeaderColumn>

                                    <TableHeaderColumn  dataField="acctType" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                                       expandable={false} editable={false}   width="100px">Type</TableHeaderColumn>
                                       
                                       <TableHeaderColumn  dataField="acctBaseBr" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                                       expandable={false} editable={false}   width="100px">Branch</TableHeaderColumn>

                                    <TableHeaderColumn   dataField='acctStatus'  expandable={false}  editable={false} width="50px" > Status</TableHeaderColumn>

                                    <TableHeaderColumn   dataField='acctCreatedDt'  expandable={false}  editable={false} width="50px" > Open Date</TableHeaderColumn>

               
                                    <TableHeaderColumn   dataField='acctOprnMode'  expandable={false}  editable={false} width="50px" > Operation Mode</TableHeaderColumn>
                                     <TableHeaderColumn   dataField='acctHasNominee'  expandable={false}  editable={false} width="50px" > NomineeYN</TableHeaderColumn>

                                       
           
                                    </BootstrapTable>    
                                    </section>
                                    </section>  
        </Tab>
        <Tab eventKey="transaction" title="Transaction Profile" >
        <form>
           <div>
             <table  align="left" width="95%" border="1px solid black" style={{margin: 30}}>
               <thead>
               <tr style={{textAlign: 'center', color: 'white', background: '#303974'}}>
                   <th colspan="7">Transaction Details</th>
               </tr>
               </thead>
               <tbody>
               <tr>
                      
                       <td>Select Account</td>
                       <td>
                       <div className="form-group">
                               <select className="form-control select2 " id="acctNo" onChange={this.handleChange}
             value={this.state.transactiondata.acctNo!=""?this.state.transactiondata.acctNo:""}>
                                   <option value="">select</option>
                                   {optionTemplate}
                               </select>
                           </div>
                                           </td>
                       <td > </td>
                       <td >
                       </td>
                       
                   </tr>
                  
       
                   <tr>
                      
                       <td>Transaction From</td>
                       <td>
                           <input type="date" name="bday" id="fromDate" onChange={this.handleChange}
             value={this.state.transactiondata.fromDate!=""?this.state.transactiondata.fromDate:""}/> <span class="glyphicon glyphicon-calendar"></span>
                       </td>
                       <td >Till</td>
                       <td >
                           <input type="date" name="bday" id="toDate" onChange={this.handleChange}
             value={this.state.transactiondata.toDate!=""?this.state.transactiondata.toDate:""} /> <span class="glyphicon glyphicon-calendar"></span>
                       </td>
                       
                   </tr>
                   <tr>
                      
                       <td>Amount</td>
                       <td>
                       <div className="form-group col-md-3 min-height80">
                       <select className="form-control select2"  id="operator" onChange={this.handleChange}
             value={this.state.transactiondata.operator!=""?this.state.transactiondata.operator:""} >
                       <option value=""> Select </option>
                                   <option value=">"> &gt; </option>
                                   <option value="<"> &lt; </option>
                                   <option value="="> = </option>
                               </select>
                               &nbsp;&nbsp;&nbsp;
                               <input className="select2" id="transactionAmount" title="Header Color" type="let" placeholder="100000.00" onChange={this.handleChange}
             value={this.state.transactiondata.transactionAmount!=""?this.state.transactiondata.transactionAmount:""}/>
                         
                             
                               
                           </div>
                   
                        </td>
                        <td>Cashflow</td>
                       <td >
                       <div className="form-group">
                               <select className="form-control select2 " id="cashflowType"
                               onChange={this.handleChange}
                               value={this.state.transactiondata.cashflowType!=""?this.state.transactiondata.cashflowType:""}>
                                   <option value="">select</option>
                                   <option value="Both">Both</option>
       
                                   <option value="DR">DR</option>
                                   <option value="CR">CR</option>
                               </select>
                           </div>
                       </td>
                       
                   
                   </tr>
       
                   <tr>
                       <td></td>
                       <td>
                       
                        </td>
                        <td></td>
                       
                       <td rowSpan="2">
                       {this.state.searchbutton==true?
                <button type="button" id="Save"  style={{borderColor: '#303974', backgroundColor: '#303974', fontSize: '15px'}}  className="btn btn-primary " onClick={() => this.FindTransaction()}>Search</button>:""}

                       </td>
                       
                   </tr>
               </tbody>
           </table> 
          
           </div>
           <div>
             
           </div>
           <section class="wrapper">
        <section className="content">
          
                       <BootstrapTable
                           data={this.props.customertransactionlists}
                        //    pagination={true}
                           // search
                           // ClearSearchButton
                           // exportCSV
                           // trClassName={this.rowClassNameFormat}
                       >
                           
                     
       
                           <TableHeaderColumn dataFormat={this.transactionNo} dataField="txnNo"  isKey={true} csvHeader="First Name" className={"columnHeaderColor"}
                           expandable={false}  editable={false} width="60px">Transaction No
                           
                           </TableHeaderColumn>
       
       
                           <TableHeaderColumn   dataField="txnCreatedDtTm" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                           expandable={false} editable={false}   width="80px">Transaction Date</TableHeaderColumn>
                           
                           <TableHeaderColumn  dataField="Particulars" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                           expandable={false} editable={false}   width="60px">Particulars</TableHeaderColumn>
       
                           <TableHeaderColumn  dataField="txnAmount" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                           expandable={false} editable={false} width="60px"> Amount</TableHeaderColumn>
                           
                           <TableHeaderColumn  dataField="txnType" csvHeader="txnType" className={"columnHeaderColor"} dataSort={true}
                           expandable={false} editable={false} width="40px">Transaction Type</TableHeaderColumn>
                           
                       </BootstrapTable>
                   
               </section>
               </section>
           </form>
</Tab>
<Tab eventKey="risk" title="Risk Profile" >
<section class="wrapper">
        <section className="content">
            <div class="container">
                                <form>
                                    <section className=" content-header">
                                        <div>
                                        <div className="col-md-12 col-sm-12 col-xs-12 pull-left no-L-padding" style={{backgroundColor:"#C8D0F0"}}>
                                        </div>
                                        </div>
                                        </section>
                                        <section className="content">
                                        <div className="row">
                                        <div className="col-xs-12">
                                        <div className="box">
                                        <div className="box-body  no-LR-padding expandcontentscell">
                                        <h4 class="thick" style ={{color:'blue'}}>KYC Risk</h4>  
                                        <BootstrapTable
                                        data={this.props.kyclist}
                                         pagination={true}
                                        //  search
                                         //  ClearSearchButton
                                       //   exportCSV
                                           
                                        //    trClassName={this.rowClassNameFormat}  
                                         >
                                          <TableHeaderColumn dataSort={true}  dataField="riskParameter" isKey={true} className={"columnHeaderColor"}
                                            expandable={false}  editable={false} width="30px">KYC Parameter </TableHeaderColumn>
                    
                                            <TableHeaderColumn  dataField="riskValue" className={"columnHeaderColor"} dataSort={true}
                                            expandable={false} editable={false}   width="30px">KYC Value</TableHeaderColumn>
                    
                            
                                          <TableHeaderColumn   dataField="weightage" className={"columnHeaderColor"} dataSort={true}
                                            expandable={false} editable={false} width="30px">Weightage</TableHeaderColumn>
                    
                                              <TableHeaderColumn  csvHeader="Status" className={"columnHeaderColor"} dataSort={true}
                                            expandable={false} dataField="Status" editable={false} width="10px" ></TableHeaderColumn>
                                       
                                         </BootstrapTable>
                                        <h4 class="thick" style ={{color:'blue'}}>Transaction Type Risk(Previous Month) </h4>  
                                        <BootstrapTable
                                        data={this.props.trlists}
                                         pagination={true}
                                        //  search
                                         //  ClearSearchButton
                                       //   exportCSV
                                           
                                        //    trClassName={this.rowClassNameFormat}  
                                         >
                                          <TableHeaderColumn dataSort={true}  dataField="riskParameter" isKey={true} className={"columnHeaderColor"}
                                            expandable={false}  editable={false} width="30px">Transaction Type </TableHeaderColumn>
                    
                                            <TableHeaderColumn  dataField="riskValue" className={"columnHeaderColor"} dataSort={true}
                                            expandable={false} editable={false}   width="30px">Count Percentage</TableHeaderColumn>
                    
                            
                                          <TableHeaderColumn   dataField="weightage" className={"columnHeaderColor"} dataSort={true}
                                            expandable={false} editable={false} width="30px">Weightage</TableHeaderColumn>
                    
                                              <TableHeaderColumn dataFormat={this.actionMethod}  csvHeader="Status" className={"columnHeaderColor"} dataSort={true}
                                            expandable={false} dataField="Status" editable={false} width="10px" ></TableHeaderColumn>
                                       
                                         </BootstrapTable>
                                         <h4 class="thick" style ={{color:'blue'}}>Transaction Trend Risk (3 Months Trend)</h4>  
                                        <BootstrapTable
                                       // data={this.props.trlists}
                                         pagination={true}
                                        //  search
                                         //  ClearSearchButton
                                       //   exportCSV
                                           
                                        //    trClassName={this.rowClassNameFormat}  
                                         >
                                          <TableHeaderColumn dataSort={true}  dataField="riskParameter" isKey={true} className={"columnHeaderColor"}
                                            expandable={false}  editable={false} width="30px"> Trend Deviation </TableHeaderColumn>
                    
                                            <TableHeaderColumn  dataField="riskValue" className={"columnHeaderColor"} dataSort={true}
                                            expandable={false} editable={false}   width="30px">Value</TableHeaderColumn>
                    
                            
                                          <TableHeaderColumn   dataField="weightage" className={"columnHeaderColor"} dataSort={true}
                                            expandable={false} editable={false} width="30px">Weightage</TableHeaderColumn>
                    
                                              <TableHeaderColumn dataFormat={this.actionMethod}  csvHeader="Status" className={"columnHeaderColor"} dataSort={true}
                                            expandable={false} dataField="Status" editable={false} width="10px" ></TableHeaderColumn>
                                       
                                         </BootstrapTable>
                                         <h4 class="thick" style ={{color:'blue'}}>Rule Violation Risk (6 Months)</h4>  
                                        <BootstrapTable
                                       // data={this.props.trlists}
                                         pagination={true}
                                        //  search
                                         //  ClearSearchButton
                                       //   exportCSV
                                           
                                        //    trClassName={this.rowClassNameFormat}  
                                         >
                                          <TableHeaderColumn dataSort={true}  dataField="riskParameter" isKey={true} className={"columnHeaderColor"}
                                            expandable={false}  editable={false} width="30px">Rule Severity </TableHeaderColumn>
                    
                                            <TableHeaderColumn  dataField="riskValue" className={"columnHeaderColor"} dataSort={true}
                                            expandable={false} editable={false}   width="30px"> Violation Count</TableHeaderColumn>
                    
                            
                                          <TableHeaderColumn   dataField="weightage" className={"columnHeaderColor"} dataSort={true}
                                            expandable={false} editable={false} width="30px">Weightage</TableHeaderColumn>
                    
                                              <TableHeaderColumn dataFormat={this.actionMethod}  csvHeader="Status" className={"columnHeaderColor"} dataSort={true}
                                            expandable={false} dataField="Status" editable={false} width="10px" ></TableHeaderColumn>
                                       
                                         </BootstrapTable>
                                        </div>
                                        </div>
                                            </div>
                                            </div>
                                        </section>
                                        </form>
                                        </div>
                                        </section>
                                        </section>
</Tab>
<Tab eventKey="investigation" title="Investigation History" >
<section class="wrapper">
        <section className="content">
                                      
                                        <BootstrapTable
                                            // data={this.state.getApiData}
                                        //    pagination={true}
                                          // search
                                           ClearSearchButton
                                         //  exportCSV
                                           
                                        //    trClassName={this.rowClassNameFormat}
                                         >
                                            <TableHeaderColumn dataFormat={this.transactionNo} dataField="Description " csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                                            expandable={false} editable={false}   width="50px">Transaction No.</TableHeaderColumn>

                                          <TableHeaderColumn  dataField="transactionDate" csvHeader="First Name" isKey={true} className={"columnHeaderColor"}
                                            expandable={false}  editable={false} width="60px">Transaction Date</TableHeaderColumn>
                    
                                            <TableHeaderColumn  dataField="Particulars" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                                            expandable={false} editable={false}   width="100px">Particulars</TableHeaderColumn>

                                      
                    
                    
                            
                                          <TableHeaderColumn  dataField="Amount" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                                            expandable={false} editable={false} width="50px">Amount</TableHeaderColumn>

                                            <TableHeaderColumn dataField="Type" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                                            expandable={false} editable={false} width="50px">Type </TableHeaderColumn>

                                        <TableHeaderColumn dataFormat={this.merchantName} dataField="Edit" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                                            expandable={false} editable={false} width="80px">Alert Id (A)</TableHeaderColumn>

                                            <TableHeaderColumn dataFormat={this.MCC} dataField="Edit" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                                            expandable={false} editable={false} width="100px">Case Id (B)</TableHeaderColumn>

                                         
                                           
                
                                         </BootstrapTable>
                                      
                                        </section>
                                        </section>
</Tab>
<Tab eventKey="auxilary" title="Auxilary Information" >
<div class="container">
                                <div class="table-responsive">
                                <table  align="left" width="95%" border="1px solid #758080" style={{margin: 15}}>
        <thead>
        <tr style={{textAlign: 'center',color:'white', background: '#303974'}}>
            <th >&nbsp;&nbsp;&nbsp;Parameter</th>
            <th>&nbsp;&nbsp;&nbsp;Status</th>
            <th>&nbsp;&nbsp;&nbsp;Remarks</th>
        </tr>
       
       
        </thead>
        <tbody style={{color: 'black'}}>
            <tr>
                <td >&nbsp;&nbsp;&nbsp; Business Expansion or Deterioration</td>
                <td>&nbsp;&nbsp;&nbsp;
                <div className="form-group  ">
                        <select className="form-control select2 " id="generationDate">
                            <option value="">Expansion- Fast Pace</option>
                            <option value="">Expansion- Medium Pace</option>
                            <option value="">Expansion- Slow Pace</option>
                            <option value="">Same for Deterioration</option>
                        </select>
                    </div>
                </td>
                <td>&nbsp;&nbsp;&nbsp;
                <div className="form-group col-md-10 min-height30">
                    <input  className="form-control"  title="Remarks" placeholder="Write Observation Here" type="text" /> 
                </div>
                </td>
               
            </tr>
            <tr>
                <td >&nbsp;&nbsp;&nbsp;Number of requests for Financing</td>
                <td>&nbsp;&nbsp;&nbsp;
                <div className="form-group  ">
                        <select className="form-control select2 " id="generationDate">
                            <option value="">High</option>
                            <option value="">Medium</option>
                            <option value="">Low</option>
                        </select>
                    </div>
                </td>
                <td>&nbsp;&nbsp;&nbsp;
                <div className="form-group col-md-10 min-height30">
                    <input  className="form-control"  title="Remarks" placeholder="Write Observation Here" type="text" /> 
                </div>
                </td>
              
            </tr>
            <tr>
                <td >&nbsp;&nbsp;&nbsp;Investors involvement in Business </td>
                <td>&nbsp;&nbsp;&nbsp;
                <div className="form-group  ">
                        <select className="form-control select2 " id="generationDate">
                            <option value="">High</option>
                            <option value="">Medium</option>
                            <option value="">Low</option>

                        </select>
                    </div>
                </td>
                <td>&nbsp;&nbsp;&nbsp;
                <div className="form-group col-md-10 min-height30">
                    <input  className="form-control"  title="Remarks" placeholder="Write Observation Here" type="text" /> 
                </div>
                </td>
               
            </tr>
            <tr>
                <td >&nbsp;&nbsp;&nbsp;Response to Bank’s Inquiry</td>
                <td>&nbsp;&nbsp;&nbsp;
                <div className="form-group  ">
                        <select className="form-control select2 " id="generationDate">
                            <option value="">Good</option>
                            <option value="">Average</option>
                            <option value="">Poor</option>
                        </select>
                    </div> </td>
                <td>&nbsp;&nbsp;&nbsp;
                <div className="form-group col-md-10 min-height30">
                    <input  className="form-control" title="Remarks" placeholder="Write Observation Here" type="text" /> 
                </div>
                </td>
               
            </tr>
            <tr>
                <td >&nbsp;&nbsp;&nbsp; New Legal Litigations in 6 months</td>
                <td>&nbsp;&nbsp;&nbsp;
                <div className="form-group  ">
                        <select className="form-control select2 " id="generationDate">
                            <option value="">Yes</option>
                            <option value="">No</option>
                        </select>
                    </div> </td>
                <td>&nbsp;&nbsp;&nbsp;
                <div className="form-group col-md-10 min-height30">
                    <input  className="form-control" title="Remarks" placeholder="Write Observation Here" type="text" /> 
                </div>
                </td>
               
            </tr>
            <tr>
                <td > &nbsp;&nbsp;&nbsp;Due Diligence Completed</td>
                <td>&nbsp;&nbsp;&nbsp;
                <div className="form-group  ">
                        <select className="form-control select2 " id="generationDate">
                            <option value="">Yes</option>
                            <option value="">No</option>
                        </select>
                    </div>
                </td>
                <td> &nbsp;&nbsp;&nbsp; 
                <div className="form-group col-md-10 min-height30">
                    <input  className="form-control"  title="Remarks" placeholder="Write Observation Here" type="text" /> 
                </div>
                </td>
               
            </tr>
            <tr>
                <td >&nbsp;&nbsp;&nbsp; Upward Risk Movement in 6 months</td>
                <td>&nbsp;&nbsp;&nbsp;
                <div className="form-group  ">
                        <select className="form-control select2 " id="generationDate">
                            <option value="">Yes</option>
                            <option value="">No</option>
                        </select>
                    </div>
                </td>
                <td>&nbsp;&nbsp;&nbsp;
                <div className="form-group col-md-10 min-height30">
                    <input  className="form-control"  title="Remarks" placeholder="Write Observation Here" type="text" /> 
                </div>
                </td>
              
            </tr>
            <tr>
                <td >&nbsp;&nbsp;&nbsp; Acquired New Customers / Orders from Disputed Countries in 6 months</td>
                <td>&nbsp;&nbsp;&nbsp; 
                <div className="form-group  ">
                        <select className="form-control select2 " id="generationDate">
                            <option value="">Yes</option>
                            <option value="">No</option>
                        </select>
                    </div>
                </td>
                <td>&nbsp;&nbsp;&nbsp;
                <div className="form-group col-md-10 min-height30">
                    <input  className="form-control" title="Remarks" placeholder="Write Observation Here" type="text" /> 
                </div>
                </td>
              
            </tr>
            <tr>
                <td >&nbsp;&nbsp;&nbsp;Blacklisted anytime in 6 months</td>
                <td>&nbsp;&nbsp;&nbsp;
                <div className="form-group  ">
                        <select className="form-control select2 " id="generationDate">
                            <option value="">Yes</option>
                            <option value="">No</option>
                        </select>
                    </div>
                </td>
                <td>&nbsp;&nbsp;&nbsp;
                <div className="form-group col-md-10 min-height30">
                    <input  className="form-control"  title="Remarks"  placeholder="Write Observation Here"  type="text" /> 
                </div>
                </td>
               
            </tr>
           
       
        
       
        </tbody>
    </table>
                                                        
                                                        <table align="left" width="90%" >
                                                <thead>
                                                        <tr style={{ textAlign: 'left'}}>
                                                                <td colSpan="1" >
                                                                <button type="button" id="Save"  style={{borderColor: '#303974', backgroundColor: '#303974', fontSize: '15px',marginLeft:35}}  className="btn btn-primary " onClick={() => this.Save()}>Save</button>
                                                                </td>
                                                        </tr>
                                                </thead>
                                                
                                                        

                                        </table>
                                </div>
                        </div>
</Tab>
       
      </Tabs>







    {/* <Tabs>
                  
                  <section className="content">
                  <div className="row">
                  <div className="col-xs-12 col-xs-12 margin-top-minus15">
                  <div className="nav-tabs-custom">
                           <TabList style={{ backgroundColor: '#ecf0f5' }} >
                           <Tab activeTabPanelClassName="active" id="CompanyDetailsTab" >Customer Profile </Tab>
                           <Tab activeTabPanelClassName="active" id="CompanyDetailsTab" style={{ color: '#B92100' }}>Account Profile </Tab>
                               <Tab activeTabPanelClassName="active" id="CompanyDetailsTab" style={{ color: 'blue' }}  >Transaction Profile </Tab>
                               <Tab activeTabPanelClassName="active" id="CompanyDetailsTab" style={{ color: 'red' }} >Risk Profile </Tab>
                               <Tab activeTabPanelClassName="active" id="CompanyDetailsTab" style={{ color: '#789E00 ' }} >Investigation History </Tab>
                               <Tab activeTabPanelClassName="active" id="CompanyDetailsTab" style={{ color: '#8D006D' }} >Auxilary Information </Tab>

                          </TabList>
                          <TabPanel>
    <React.Fragment>
                  <form>
                           

                           <div class="container">
<div class="table-responsive">          
<table  align="left" width="90%" border="1px solid black" style={{margin: 30}} >
<thead>
  <tr>
    <th colSpan="4" style={{textAlign: 'left', color: 'white', background: 'blue'}}>Customer Details</th>
 </tr>
</thead>
<tbody style={{color: 'black', fontWeight: 'bold'}}>
    <tr>
        <td width="20%" >Name</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser" value={this.props.Customerlists.customerName} title="Header Color" type="text" > 
               
                </input>
            </div>
        </td>
         <td width="20%" >Short_Name</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser" value={this.props.Customerlists.customerFName} title="Header Color" type="text" /> 
            </div>
        </td>
    </tr>
    <tr>
        <td width="20%" >Address Line1</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser" value={this.props.Customerlists.addr1} title="Header Color" type="text" /> 
            </div>
        </td>
         <td width="20%" >Address Line2</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control"  id="assignedUser" value={this.props.Customerlists.addr2} title="Header Color" type="text" /> 
            </div>
        </td>
    </tr>
    <tr>
        <td width="20%" >Address Line3</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser" value={this.props.Customerlists.addr3} title="Header Color" type="text" /> 
            </div>
        </td>
         <td width="20%" >Address Line4</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser" value={this.props.Customerlists.addr3} title="Header Color" type="text" /> 
            </div>
        </td>
    </tr>
    <tr>
        <td width="20%" >State </td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser" value={this.props.Customerlists.state} title="Header Color" type="text" /> 
            </div>
        </td>
         <td width="20%" >Phone Number </td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser" value={this.props.Customerlists.mobileNo} title="Header Color" type="text" /> 
            </div>
        </td>
    </tr>
    <tr>
        <td width="20%" >Zip Code</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser" value={this.props.Customerlists.postalCode} title="Header Color" type="text" /> 
            </div>
        </td>
         <td width="20%" >Customer Credit Line </td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser"   title="Header Color" type="text" /> 
            </div>
        </td>
    </tr>
    <tr>
        <td width="20%" >National Id No</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser" value={this.props.Customerlists.nationalId1} title="Header Color" type="text" /> 
            </div>
        </td>
         <td width="20%" >Date of Birth</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser" value={this.props.Customerlists.customerDOB} title="Header Color" type="text" /> 
            </div>
        </td>
    </tr>
    <tr>
        <td width="20%" >Employer Name</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser" value={this.props.Customerlists.employersName} title="Header Color" type="text" /> 
            </div>
        </td>
         <td width="20%" >Business Phone No</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser" value={this.props.Customerlists.phoneNo} title="Header Color" type="text" /> 
            </div>
        </td>
    </tr>
    <tr>
        <td width="20%" >Customer Status</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser" value={this.props.Customerlists.customerStatus} title="Header Color" type="text" /> 
            </div>
        </td>
         <td width="20%" >Nationality</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser" value={this.props.Customerlists.nationality} title="Header Color" type="text" /> 
            </div>
        </td>
    </tr>
    <tr>
        <td width="20%" >Sex</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser" value={this.props.Customerlists.customerGender} title="Header Color" type="text" /> 
            </div>
        </td>
         <td width="20%" >Martial Status</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser"  title="Header Color" type="text" /> 
            </div>
        </td>
    </tr>
    <tr>
        <td width="20%" >No. Of Dependents</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser" value={this.props.Customerlists.noOfDependants} title="Header Color" type="text" /> 
            </div>
        </td>
         <td width="20%" >Type Of Bank Account</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser" value={this.props.Customerlists.typeOfBusiness} title="Header Color" type="text" /> 
            </div>
        </td>
    </tr>
    <tr>
        <td width="20%" >Risk Score</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser" value={this.props.Customerlists.customerRiskCalc} title="Header Color" type="text" /> 
            </div>
        </td>
         <td width="20%" >Customer Category</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser" value={this.props.Customerlists.customerCategory} title="Header Color" type="text" /> 
            </div>
        </td>
    </tr>
    <tr>
        <td width="20%"> Guarantor Suitability</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser" title="Header Color" type="text" /> 
            </div>
        </td>
         <td width="20%" >Home Owner</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser" title="Header Color" type="text" /> 
            </div>
        </td>
    </tr>
    <tr>
        <td width="20%" >Joint Owner</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser" title="Header Color" type="text" /> 
            </div>
        </td>
         <td width="20%" >Type of Residence</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser"  title="Header Color" type="text" /> 
            </div>
        </td>
    </tr>
    <tr>
        <td width="20%" >Period of Residence</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser"  title="Header Color" type="text" /> 
            </div>
        </td>
         <td width="20%" >Local Expenditure Zone Code</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser"  title="Header Color" type="text" /> 
            </div>
        </td>
    </tr>
    <tr>
        <td width="20%" >Occupation Code</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser"  title="Header Color" type="text" /> 
            </div>
        </td>
         <td width="20%" >Year in Current Employement</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser" value={this.props.Customerlists.yearsOfService} title="Header Color" type="text" /> 
            </div>
        </td>
    </tr>
    <tr>
        <td width="20%" >Type of Employer Code</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser" title="Header Color" type="text" /> 
            </div>
        </td>
         <td width="20%" >Direct Mail Indicator</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser"  title="Header Color" type="text" /> 
            </div>
        </td>
    </tr>
    <tr>
        <td width="20%" >Billing Cycle</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser"  title="Header Color" type="text" /> 
            </div>
        </td>
         <td width="20%" >Tax exemption No.</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser"  title="Header Color" type="text" /> 
            </div>
        </td>
    </tr>
    <tr>
        <td width="20%" >Address expiration Details</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser"  title="Header Color" type="text" /> 
            </div>
        </td>
         <td width="20%" >Statement usage</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser"  title="Header Color" type="text" /> 
            </div>
        </td>
    </tr>
    <tr>
        <td width="20%" >Card Mailer Usage</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser"  title="Header Color" type="text" /> 
            </div>
        </td>
         <td width="20%" >PIN Mailer Usage</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser"  title="Header Color" type="text" /> 
            </div>
        </td>
    </tr>
    <tr>
        <td width="20%" >Collection Usage</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser"  title="Header Color" type="text" /> 
            </div>
        </td>
         <td width="20%" >Direct Mail Usage</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser"  title="Header Color" type="text" /> 
            </div>
        </td>
    </tr>
    <tr>
        <td width="20%" >Member Since</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser"  title="Header Color" type="text" /> 
            </div>
        </td>
         <td width="20%" >Overlimit Percentage</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser"  title="Header Color" type="text" /> 
            </div>
        </td>
    </tr>

    <tr>
        <td width="20%" >Customer Income</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser" value={this.props.Customerlists.currAnnualIncome} title="Header Color" type="text" /> 
            </div>
        </td>
         <td width="20%" >National ID No.</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser" value={this.props.Customerlists.nationalId1} title="Header Color" type="text" /> 
            </div>
        </td>
    </tr>
    <tr>
        <td width="20%" >Permanent Credit Limit</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser"  title="Header Color" type="text" /> 
            </div>
        </td>
         <td width="20%" >Current Credit Limit</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser"  title="Header Color" type="text" /> 
            </div>
        </td>
    </tr>
    <tr>
        <td width="20%" >Temporial Credit Limit</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser"  title="Header Color" type="text" /> 
            </div>
        </td>
         <td width="20%" >Effective Date</td>
        <td >
            <div className="form-group col-md-10 min-height30">
                <input  className="form-control" id="assignedUser" value={this.props.Customerlists.modifiedDate} title="Header Color" type="text" /> 
            </div>
        </td>
    </tr>
    <tr>
        <td width="20%" colspan="4" >
        <div className=" min-height30"/>
        </td>
    </tr>
  
   

    <tr style={{textAlign: 'center'}}>
        <td colSpan="4" >
        <button type="button" id="Reset" style={{borderColor: '#303974', backgroundColor: '#303974', fontSize: '15px'}} onClick={() => this.SaveApiData()} 
                        className="btn btn-primary " > Create Case </button>

        </td>  
        
    </tr>

</tbody>
</table>

</div>
</div>

            </form>
            </React.Fragment>
            </TabPanel>
            <TabPanel  >
            <section class="wrapper">
        <section className="content">
                             <BootstrapTable
                                      data={this.props.Customersacclist}
                                    //   pagination={true}
                                     // search
                                      ClearSearchButton
                                    //  exportCSV
                                      
                                   //    trClassName={this.rowClassNameFormat}
                                    >
                                     
                                     <TableHeaderColumn  dataField="acctNo" csvHeader="First Name" isKey={true} className={"columnHeaderColor"}
                                       expandable={false}  editable={false} width="100px">Account Number
                                       </TableHeaderColumn>
               
                                       <TableHeaderColumn  dataField="createdBy"  csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                                       expandable={false} editable={false}   width="100px">Name</TableHeaderColumn>

                                    <TableHeaderColumn  dataField="acctType" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                                       expandable={false} editable={false}   width="100px">Type</TableHeaderColumn>
                                       
                                       <TableHeaderColumn  dataField="acctBaseBr" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                                       expandable={false} editable={false}   width="100px">Branch</TableHeaderColumn>

                                    <TableHeaderColumn   dataField='acctStatus'  expandable={false}  editable={false} width="50px" > Status</TableHeaderColumn>

                                    <TableHeaderColumn   dataField='acctCreatedDt'  expandable={false}  editable={false} width="50px" > Open Date</TableHeaderColumn>

               
                                    <TableHeaderColumn   dataField='acctOprnMode'  expandable={false}  editable={false} width="50px" > Operation Mode</TableHeaderColumn>
                                     <TableHeaderColumn   dataField='acctHasNominee'  expandable={false}  editable={false} width="50px" > NomineeYN</TableHeaderColumn>

                                       
           
                                    </BootstrapTable>    
                                    </section>
                                    </section>                        
                                     </TabPanel>
                                     <TabPanel>
                             <React.Fragment>
           
                   
                      
                                
           <form>
           <div>
             <table  align="left" width="95%" border="1px solid black" style={{margin: 30}}>
               <thead>
               <tr style={{textAlign: 'center', color: 'white', background: '#94D1D4'}}>
                   <th colspan="7">Transaction Details</th>
               </tr>
               </thead>
               <tbody>
               <tr>
                      
                       <td>Select Account</td>
                       <td>
                       <div className="form-group">
                               <select className="form-control select2 " id="acctNo" onChange={this.handleChange}
             value={this.state.transactiondata.acctNo!=""?this.state.transactiondata.acctNo:""}>
                                   <option value="">select</option>
                                   {optionTemplate}
                               </select>
                           </div>
                                           </td>
                       <td > </td>
                       <td >
                       </td>
                       
                   </tr>
                  
       
                   <tr>
                      
                       <td>Transaction From</td>
                       <td>
                           <input type="date" name="bday" id="fromDate" onChange={this.handleChange}
             value={this.state.transactiondata.fromDate!=""?this.state.transactiondata.fromDate:""}/> <span class="glyphicon glyphicon-calendar"></span>
                       </td>
                       <td >Till</td>
                       <td >
                           <input type="date" name="bday" id="toDate" onChange={this.handleChange}
             value={this.state.transactiondata.toDate!=""?this.state.transactiondata.toDate:""} /> <span class="glyphicon glyphicon-calendar"></span>
                       </td>
                       
                   </tr>
                   <tr>
                      
                       <td>Amount</td>
                       <td>
                       <div className="form-group col-md-3 min-height80">
                       <select className="form-control select2"  id="operator" onChange={this.handleChange}
             value={this.state.transactiondata.operator!=""?this.state.transactiondata.operator:""} >
                       <option value=""> Select </option>
                                   <option value=">"> &gt; </option>
                                   <option value="<"> &lt; </option>
                                   <option value="="> = </option>
                               </select>
                               &nbsp;&nbsp;&nbsp;
                               <input className="select2" id="transactionAmount" title="Header Color" type="let" placeholder="100000.00" onChange={this.handleChange}
             value={this.state.transactiondata.transactionAmount!=""?this.state.transactiondata.transactionAmount:""}/>
                         
                             
                               
                           </div>
                   
                        </td>
                        <td>Cashflow</td>
                       <td >
                       <div className="form-group">
                               <select className="form-control select2 " id="cashflowType"
                               onChange={this.handleChange}
                               value={this.state.transactiondata.cashflowType!=""?this.state.transactiondata.cashflowType:""}>
                                   <option value="">select</option>
                                   <option value="Both">Both</option>
       
                                   <option value="DR">DR</option>
                                   <option value="CR">CR</option>
                               </select>
                           </div>
                       </td>
                       
                   
                   </tr>
       
                   <tr>
                       <td></td>
                       <td>
                       
                        </td>
                        <td></td>
                       
                       <td rowSpan="2">
                       {this.state.searchbutton==true?
                <button type="button" id="Save"  style={{borderColor: '#303974', backgroundColor: '#303974', fontSize: '15px'}}  className="btn btn-primary " onClick={() => this.FindTransaction()}>Search</button>:""}

                       </td>
                       
                   </tr>
               </tbody>
           </table> 
          
           </div>
           <div>
             
           </div>
           <section class="wrapper">
        <section className="content">
          
                       <BootstrapTable
                           data={this.props.customertransactionlists}
                        //    pagination={true}
                           // search
                           // ClearSearchButton
                           // exportCSV
                           // trClassName={this.rowClassNameFormat}
                       >
                           
                     
       
                           <TableHeaderColumn dataFormat={this.transactionNo} dataField="txnNo"  isKey={true} csvHeader="First Name" className={"columnHeaderColor"}
                           expandable={false}  editable={false} width="60px">Transaction No
                           
                           </TableHeaderColumn>
       
       
                           <TableHeaderColumn   dataField="txnCreatedDtTm" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                           expandable={false} editable={false}   width="80px">Transaction Date</TableHeaderColumn>
                           
                           <TableHeaderColumn  dataField="Particulars" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                           expandable={false} editable={false}   width="60px">Particulars</TableHeaderColumn>
       
                           <TableHeaderColumn  dataField="txnAmount" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                           expandable={false} editable={false} width="60px"> Amount</TableHeaderColumn>
                           
                           <TableHeaderColumn  dataField="txnType" csvHeader="txnType" className={"columnHeaderColor"} dataSort={true}
                           expandable={false} editable={false} width="40px">Transaction Type</TableHeaderColumn>
                           
                       </BootstrapTable>
                   
               </section>
               </section>
           </form>
          
           </React.Fragment>                            
            </TabPanel>
            <TabPanel>
            <section class="wrapper">
        <section className="content">
            <div class="container">
                                <form>
                                    <section className=" content-header">
                                        <div>
                                        <div className="col-md-12 col-sm-12 col-xs-12 pull-left no-L-padding" style={{backgroundColor:"#C8D0F0"}}>
                                        </div>
                                        </div>
                                        </section>
                                        <section className="content">
                                        <div className="row">
                                        <div className="col-xs-12">
                                        <div className="box">
                                        <div className="box-body  no-LR-padding expandcontentscell">
                                        <h4 class="thick" style ={{color:'blue'}}>KYC Risk</h4>  
                                        <BootstrapTable
                                        data={this.props.kyclist}
                                         pagination={true}
                                        //  search
                                         //  ClearSearchButton
                                       //   exportCSV
                                           
                                        //    trClassName={this.rowClassNameFormat}  
                                         >
                                          <TableHeaderColumn dataSort={true}  dataField="riskParameter" isKey={true} className={"columnHeaderColor"}
                                            expandable={false}  editable={false} width="30px">KYC Parameter </TableHeaderColumn>
                    
                                            <TableHeaderColumn  dataField="riskValue" className={"columnHeaderColor"} dataSort={true}
                                            expandable={false} editable={false}   width="30px">KYC Value</TableHeaderColumn>
                    
                            
                                          <TableHeaderColumn   dataField="weightage" className={"columnHeaderColor"} dataSort={true}
                                            expandable={false} editable={false} width="30px">Weightage</TableHeaderColumn>
                    
                                              <TableHeaderColumn  csvHeader="Status" className={"columnHeaderColor"} dataSort={true}
                                            expandable={false} dataField="Status" editable={false} width="10px" ></TableHeaderColumn>
                                       
                                         </BootstrapTable>
                                        <h4 class="thick" style ={{color:'blue'}}>Transaction Type Risk(Previous Month) </h4>  
                                        <BootstrapTable
                                        data={this.props.trlists}
                                         pagination={true}
                                        //  search
                                         //  ClearSearchButton
                                       //   exportCSV
                                           
                                        //    trClassName={this.rowClassNameFormat}  
                                         >
                                          <TableHeaderColumn dataSort={true}  dataField="riskParameter" isKey={true} className={"columnHeaderColor"}
                                            expandable={false}  editable={false} width="30px">Transaction Type </TableHeaderColumn>
                    
                                            <TableHeaderColumn  dataField="riskValue" className={"columnHeaderColor"} dataSort={true}
                                            expandable={false} editable={false}   width="30px">Count Percentage</TableHeaderColumn>
                    
                            
                                          <TableHeaderColumn   dataField="weightage" className={"columnHeaderColor"} dataSort={true}
                                            expandable={false} editable={false} width="30px">Weightage</TableHeaderColumn>
                    
                                              <TableHeaderColumn dataFormat={this.actionMethod}  csvHeader="Status" className={"columnHeaderColor"} dataSort={true}
                                            expandable={false} dataField="Status" editable={false} width="10px" ></TableHeaderColumn>
                                       
                                         </BootstrapTable>
                                         <h4 class="thick" style ={{color:'blue'}}>Transaction Trend Risk (3 Months Trend)</h4>  
                                        <BootstrapTable
                                       // data={this.props.trlists}
                                         pagination={true}
                                        //  search
                                         //  ClearSearchButton
                                       //   exportCSV
                                           
                                        //    trClassName={this.rowClassNameFormat}  
                                         >
                                          <TableHeaderColumn dataSort={true}  dataField="riskParameter" isKey={true} className={"columnHeaderColor"}
                                            expandable={false}  editable={false} width="30px"> Trend Deviation </TableHeaderColumn>
                    
                                            <TableHeaderColumn  dataField="riskValue" className={"columnHeaderColor"} dataSort={true}
                                            expandable={false} editable={false}   width="30px">Value</TableHeaderColumn>
                    
                            
                                          <TableHeaderColumn   dataField="weightage" className={"columnHeaderColor"} dataSort={true}
                                            expandable={false} editable={false} width="30px">Weightage</TableHeaderColumn>
                    
                                              <TableHeaderColumn dataFormat={this.actionMethod}  csvHeader="Status" className={"columnHeaderColor"} dataSort={true}
                                            expandable={false} dataField="Status" editable={false} width="10px" ></TableHeaderColumn>
                                       
                                         </BootstrapTable>
                                         <h4 class="thick" style ={{color:'blue'}}>Rule Violation Risk (6 Months)</h4>  
                                        <BootstrapTable
                                       // data={this.props.trlists}
                                         pagination={true}
                                        //  search
                                         //  ClearSearchButton
                                       //   exportCSV
                                           
                                        //    trClassName={this.rowClassNameFormat}  
                                         >
                                          <TableHeaderColumn dataSort={true}  dataField="riskParameter" isKey={true} className={"columnHeaderColor"}
                                            expandable={false}  editable={false} width="30px">Rule Severity </TableHeaderColumn>
                    
                                            <TableHeaderColumn  dataField="riskValue" className={"columnHeaderColor"} dataSort={true}
                                            expandable={false} editable={false}   width="30px"> Violation Count</TableHeaderColumn>
                    
                            
                                          <TableHeaderColumn   dataField="weightage" className={"columnHeaderColor"} dataSort={true}
                                            expandable={false} editable={false} width="30px">Weightage</TableHeaderColumn>
                    
                                              <TableHeaderColumn dataFormat={this.actionMethod}  csvHeader="Status" className={"columnHeaderColor"} dataSort={true}
                                            expandable={false} dataField="Status" editable={false} width="10px" ></TableHeaderColumn>
                                       
                                         </BootstrapTable>
                                        </div>
                                        </div>
                                            </div>
                                            </div>
                                        </section>
                                        </form>
                                        </div>
                                        </section>
                                        </section>
                             </TabPanel>
                             <TabPanel>
                             <section class="wrapper">
        <section className="content">
                                      
                                        <BootstrapTable
                                            // data={this.state.getApiData}
                                        //    pagination={true}
                                          // search
                                           ClearSearchButton
                                         //  exportCSV
                                           
                                        //    trClassName={this.rowClassNameFormat}
                                         >
                                            <TableHeaderColumn dataFormat={this.transactionNo} dataField="Description " csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                                            expandable={false} editable={false}   width="50px">Transaction No.</TableHeaderColumn>

                                          <TableHeaderColumn  dataField="transactionDate" csvHeader="First Name" isKey={true} className={"columnHeaderColor"}
                                            expandable={false}  editable={false} width="60px">Transaction Date</TableHeaderColumn>
                    
                                            <TableHeaderColumn  dataField="Particulars" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                                            expandable={false} editable={false}   width="100px">Particulars</TableHeaderColumn>

                                      
                    
                    
                            
                                          <TableHeaderColumn  dataField="Amount" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                                            expandable={false} editable={false} width="50px">Amount</TableHeaderColumn>

                                            <TableHeaderColumn dataField="Type" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                                            expandable={false} editable={false} width="50px">Type </TableHeaderColumn>

                                        <TableHeaderColumn dataFormat={this.merchantName} dataField="Edit" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                                            expandable={false} editable={false} width="80px">Alert Id (A)</TableHeaderColumn>

                                            <TableHeaderColumn dataFormat={this.MCC} dataField="Edit" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                                            expandable={false} editable={false} width="100px">Case Id (B)</TableHeaderColumn>

                                         
                                           
                
                                         </BootstrapTable>
                                      
                                        </section>
                                        </section>
                             </TabPanel>
                             <TabPanel>
                             <div class="container">
                                <div class="table-responsive">
                                <table  align="left" width="95%" border="1px solid #758080" style={{margin: 30}}>
        <thead>
        <tr style={{textAlign: 'center', background: 'lightblue'}}>
            <th >&nbsp;&nbsp;&nbsp;Parameter</th>
            <th>&nbsp;&nbsp;&nbsp;Status</th>
            <th>&nbsp;&nbsp;&nbsp;Remarks</th>
        </tr>
       
       
        </thead>
        <tbody style={{color: 'black'}}>
            <tr>
                <td >&nbsp;&nbsp;&nbsp; Business Expansion or Deterioration</td>
                <td>&nbsp;&nbsp;&nbsp;
                <div className="form-group  ">
                        <select className="form-control select2 " id="generationDate">
                            <option value="">Expansion- Fast Pace</option>
                            <option value="">Expansion- Medium Pace</option>
                            <option value="">Expansion- Slow Pace</option>
                            <option value="">Same for Deterioration</option>
                        </select>
                    </div>
                </td>
                <td>&nbsp;&nbsp;&nbsp;
                <div className="form-group col-md-10 min-height30">
                    <input  className="form-control"  title="Remarks" placeholder="Write Observation Here" type="text" /> 
                </div>
                </td>
               
            </tr>
            <tr>
                <td >&nbsp;&nbsp;&nbsp;Number of requests for Financing</td>
                <td>&nbsp;&nbsp;&nbsp;
                <div className="form-group  ">
                        <select className="form-control select2 " id="generationDate">
                            <option value="">High</option>
                            <option value="">Medium</option>
                            <option value="">Low</option>
                        </select>
                    </div>
                </td>
                <td>&nbsp;&nbsp;&nbsp;
                <div className="form-group col-md-10 min-height30">
                    <input  className="form-control"  title="Remarks" placeholder="Write Observation Here" type="text" /> 
                </div>
                </td>
              
            </tr>
            <tr>
                <td >&nbsp;&nbsp;&nbsp;Investors involvement in Business </td>
                <td>&nbsp;&nbsp;&nbsp;
                <div className="form-group  ">
                        <select className="form-control select2 " id="generationDate">
                            <option value="">High</option>
                            <option value="">Medium</option>
                            <option value="">Low</option>

                        </select>
                    </div>
                </td>
                <td>&nbsp;&nbsp;&nbsp;
                <div className="form-group col-md-10 min-height30">
                    <input  className="form-control"  title="Remarks" placeholder="Write Observation Here" type="text" /> 
                </div>
                </td>
               
            </tr>
            <tr>
                <td >&nbsp;&nbsp;&nbsp;Response to Bank’s Inquiry</td>
                <td>&nbsp;&nbsp;&nbsp;
                <div className="form-group  ">
                        <select className="form-control select2 " id="generationDate">
                            <option value="">Good</option>
                            <option value="">Average</option>
                            <option value="">Poor</option>
                        </select>
                    </div> </td>
                <td>&nbsp;&nbsp;&nbsp;
                <div className="form-group col-md-10 min-height30">
                    <input  className="form-control" title="Remarks" placeholder="Write Observation Here" type="text" /> 
                </div>
                </td>
               
            </tr>
            <tr>
                <td >&nbsp;&nbsp;&nbsp; New Legal Litigations in 6 months</td>
                <td>&nbsp;&nbsp;&nbsp;
                <div className="form-group  ">
                        <select className="form-control select2 " id="generationDate">
                            <option value="">Yes</option>
                            <option value="">No</option>
                        </select>
                    </div> </td>
                <td>&nbsp;&nbsp;&nbsp;
                <div className="form-group col-md-10 min-height30">
                    <input  className="form-control" title="Remarks" placeholder="Write Observation Here" type="text" /> 
                </div>
                </td>
               
            </tr>
            <tr>
                <td > &nbsp;&nbsp;&nbsp;Due Diligence Completed</td>
                <td>&nbsp;&nbsp;&nbsp;
                <div className="form-group  ">
                        <select className="form-control select2 " id="generationDate">
                            <option value="">Yes</option>
                            <option value="">No</option>
                        </select>
                    </div>
                </td>
                <td> &nbsp;&nbsp;&nbsp; 
                <div className="form-group col-md-10 min-height30">
                    <input  className="form-control"  title="Remarks" placeholder="Write Observation Here" type="text" /> 
                </div>
                </td>
               
            </tr>
            <tr>
                <td >&nbsp;&nbsp;&nbsp; Upward Risk Movement in 6 months</td>
                <td>&nbsp;&nbsp;&nbsp;
                <div className="form-group  ">
                        <select className="form-control select2 " id="generationDate">
                            <option value="">Yes</option>
                            <option value="">No</option>
                        </select>
                    </div>
                </td>
                <td>&nbsp;&nbsp;&nbsp;
                <div className="form-group col-md-10 min-height30">
                    <input  className="form-control"  title="Remarks" placeholder="Write Observation Here" type="text" /> 
                </div>
                </td>
              
            </tr>
            <tr>
                <td >&nbsp;&nbsp;&nbsp; Acquired New Customers / Orders from Disputed Countries in 6 months</td>
                <td>&nbsp;&nbsp;&nbsp; 
                <div className="form-group  ">
                        <select className="form-control select2 " id="generationDate">
                            <option value="">Yes</option>
                            <option value="">No</option>
                        </select>
                    </div>
                </td>
                <td>&nbsp;&nbsp;&nbsp;
                <div className="form-group col-md-10 min-height30">
                    <input  className="form-control" title="Remarks" placeholder="Write Observation Here" type="text" /> 
                </div>
                </td>
              
            </tr>
            <tr>
                <td >&nbsp;&nbsp;&nbsp;Blacklisted anytime in 6 months</td>
                <td>&nbsp;&nbsp;&nbsp;
                <div className="form-group  ">
                        <select className="form-control select2 " id="generationDate">
                            <option value="">Yes</option>
                            <option value="">No</option>
                        </select>
                    </div>
                </td>
                <td>&nbsp;&nbsp;&nbsp;
                <div className="form-group col-md-10 min-height30">
                    <input  className="form-control"  title="Remarks"  placeholder="Write Observation Here"  type="text" /> 
                </div>
                </td>
               
            </tr>
           
       
        
       
        </tbody>
    </table>
                                                        
                                                        <table align="left" width="90%" >
                                                <thead>
                                                        <tr style={{ textAlign: 'left'}}>
                                                                <td colSpan="1" >
                                                                <button type="button" id="Save"  style={{borderColor: '#303974', backgroundColor: '#303974', fontSize: '15px',marginLeft:35}}  className="btn btn-primary " onClick={() => this.Save()}>Save</button>
                                                                </td>
                                                        </tr>
                                                </thead>
                                                
                                                        

                                        </table>
                                </div>
                        </div>
                             </TabPanel>
            </div>

</div>

</div>           
</section>
</Tabs> */}
            
            </div>
            </section>
            </section>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    debugger
    const {customersLists} = state.customerlist
    const {customersaccLists} = state.customerlist
    var customertransactionList = state.customerlist.customersTransactionLists
    const {tranctionprofilemasterList} = state.deduplist
    const {riskgraphmasterList} = state.deduplist
    const {kycriskmasterList} = state.deduplist
    console.log("customerList123", customersLists)
    console.log("tranctionprofilemasterList", tranctionprofilemasterList)

    console.log("customerList", customersLists)
   return {
    Customerlists:customersLists,
    Customersacclist:customersaccLists,
    customertransactionlists:customertransactionList,
    trlists:tranctionprofilemasterList,
    riskgraph:riskgraphmasterList,
    kyclist:kycriskmasterList
   }
 }
 export default connect(mapStateToProps)(View_customers)
 
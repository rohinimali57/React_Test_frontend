import React, { Component } from 'react'
import 'react-tabs/style/react-tabs.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

 import Universal from '../common/universal'

class swift_message_configuration extends Component {
    constructor(props){
        super(props)

        this.state={
          botapidata:{
            "failure_Type" :"",
         }, 
                }
  }
  componentDidMount() {
    // this.getApiData();
   
  }
//   getApiData=(urlQuery)=>{
//     debugger
//     var getapidata ={};
//     document.getElementById("loader-wrapper").style.visibility = "visible";
//     axios.get(applicationContextPath+'/swiftMessageConfiguration')
//   .then(response => {
//     document.getElementById("loader-wrapper").style.visibility = "hidden";
//     console.log(response.data)
//     this.setState({getApiData:response.data.message})
//     console.log("data---",this.state.getApiData)
//   }

// ).catch(error => {
//     console.log(error);
// });

// } 

fieldLabel = (row,cell) => { 
    return(
     <div className='expandcontents'>
       {cell.fieldLabel} 
     </div>
    )
}
fieldName = (row,cell) => { 
    return(
     <div className='expandcontents'>
       {cell.fieldName} 
     </div>
    )
}
subFieldLabel = (row,cell) => { 
    return(
     <div className='expandcontents'>
       {cell.subFieldLabel} 
     </div>
    )
}
subFieldName = (row,cell) => { 
  return(
   <div className='expandcontents'>
     {cell.subFieldName} 
   </div>
  )
}
scannable = (row,cell) => { 
    return(
     <div className='expandcontents'>
       {cell.scannable} 
     </div>
    )
}
scanParameter = (row,cell) => { 
    return(
     <div className='expandcontents'>
       {cell.scanParameter} 
     </div>
    )
}
msgFlowType = (row,cell) => { 
    return(
     <div className='expandcontents'>
       {cell.msgFlowType} 
     </div>
    )
}
handleChange= (e)=> {  
  var botapidata1 = this.state.botapidata
  botapidata1[e.target.id] = e.target.value
  this.setState({botapidata:botapidata1});  
  } 

backFromCustomerList()
{
  window.history.back();
}
failureType = (cell, row) => {
    
  return (
    
    <React.Fragment>
          <select className="form-control select2 " id="failure_Type" name="failureType"
             style={{ width: '100%' }} >
            {/* <option  selected="">-- Select --</option> */}
            <option value="No Change Required">BIC</option>
            <option value="KB Needs Change">Name</option>
           <option value="Task Needs Change">Free Text</option>
          </select>
        </React.Fragment> 
    
  )
}
failureType1 = (cell, row) => {
    
  return (
    
    <React.Fragment>
          <select className="form-control select2 " id="failure_Type" name="failureType"
             style={{ width: '100%' }} >
            {/* <option  selected="">-- Select --</option> */}
            <option value="No Change Required">Both</option>
            <option value="KB Needs Change">IN</option>
            <option value="KB Needs Change">OUT</option>

          </select>
        </React.Fragment> 
    
  )
}
failureType4 = (cell, row) => {
    
  return (
    
    <React.Fragment>
          <select className="form-control select2 " id="failure_Type" name="failureType"
             style={{ width: '100%' }} >
            {/* <option  selected="">-- Select --</option> */}
            <option value="No Change Required">Yes</option>
            <option value="KB Needs Change">No</option>
            {/* <option value="KB Needs Change">OUT</option> */}

          </select>
        </React.Fragment> 
    
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
              <h1 style={{fontSize: '22px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid #e9ecef'}}>Swift Message Configuration</h1>
              <div className="container-fluid">
             
                </div>
              </div>

           
            
          </section>
          
          {/* /row */}
        </div>
        {/* /col-lg-3 */}
      </div>
                       <div className="content-wrapper">
                  
                            <section className="content">
                            <div className="row">
                            <div className="col-xs-12 col-xs-12 margin-top-minus15">
                            <div className="nav-tabs-custom">
                           
                                        
                                        <div className="form-group col-md-4 min-height80">
                                                        <lable> <b>Message Type</b> : &nbsp;<span style={{color:"red"}}>*</span></lable>
                                                        {/* <input className="form-control" id="title" title="Header Color" type="text" placeholder="Enter Message" /> */}
                                                        <select className="form-control select2 " id="failure_Type"  name="failureType"
                                                            >
                                                          {/* <option  selected="">-- Select Type --</option> */}
                                                          <option value="MT103">MT103</option>
                                                          <option value="MT106">MT106</option>
                                                         <option value="MT104">MT104</option>
                                                        </select>
                                                    </div>


                                                    <div className="form-group col-md-2 min-height80">
                                                      <button type="button" id="Reset"  style={{borderColor: '#303974', backgroundColor: '#303974', fontSize: '15px'}}
                                                            className="btn btn-primary " > View </button>
                                                            </div>

                                                            <div className="row has-shadow mt-3" style={{borderRadius: '1rem', backgroundColor: 'white', marginTop: '5rem',width: '94%',marginLeft: '10px'}}>
                     
                                        <div className="col-xs-12">
                                        <div className="box">
                                        <div className="box-body  no-LR-padding expandcontentscell">
                                        <BootstrapTable
                                           data={this.state.getApiData}
                                          pagination={true}
                                           //search
                                           ClearSearchButton
                                           //exportCSV
                                           
                                         >
                                          <TableHeaderColumn dataFormat={this.fieldLabel} dataField="Name" csvHeader="First Name" isKey={true} className={"columnHeaderColor"}
                                            expandable={false}  editable={false} width="100px">Field Label</TableHeaderColumn>
                    
                                            <TableHeaderColumn dataFormat={this.fieldName} dataField="Last Name" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                                            expandable={false} editable={false}   width="100px">Field Name</TableHeaderColumn>
                    
                            
                                          <TableHeaderColumn dataFormat={this.subFieldLabel}  dataField="Login-Id" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                                            expandable={false} editable={false} width="100px">Sub Field Label</TableHeaderColumn>

                                          <TableHeaderColumn dataFormat={this.subFieldName}  dataField="Login-Id" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                                            expandable={false} editable={false} width="100px">Sub Field Name</TableHeaderColumn>
                                         
                                          <TableHeaderColumn dataFormat={this.failureType4} csvHeader="Status" className={"columnHeaderColor"} dataSort={true}
                                            expandable={false} dataField="Status" editable={false} width="100px" >Scannable</TableHeaderColumn>
                    
                                            <TableHeaderColumn  dataFormat={this.failureType} csvHeader="Role" className={"columnHeaderColor"} dataSort={true}
                                              expandable={false} dataField="Role" editable={false} width="100px" >Scan Parameter</TableHeaderColumn>
                                            
                                            <TableHeaderColumn dataFormat={this.failureType1} csvHeader="Branch/Zone/Reclon/HO" className={"columnHeaderColor"} dataSort={true}
                                              expandable={false} dataField="user_Id" editable={false} width="100px" >Message Flow Type</TableHeaderColumn>
                                            
                                           
                                         </BootstrapTable>
                                        </div>
                                        </div>
                                            </div>
                                     
                                        </div>
                                        </div>



                                     
                                    
                                     </div>

                             </div>
                             
                            </section>
                            
                           </div>
                           </section>
                           </section>

                </React.Fragment>
        )
    }
}

export default swift_message_configuration

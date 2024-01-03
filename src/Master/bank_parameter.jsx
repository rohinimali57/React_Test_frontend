import React, { Component } from 'react'
import Universal from '../common/universal'
import {connect} from 'react-redux'
import Swal from 'sweetalert2'

import {handlebankparameterpData} from '../actions/bankparameter' 
export class bank_parameter extends Component {
  constructor(props){
    super(props)
    var today = new Date(),
    date = today.getFullYear() + '/'+(today.getMonth() < 10 ? "0" : "") + (today.getMonth() + 1) + '/'+(today.getDate() < 10 ? "0" : "") + today.getDate();
    this.state={
     getApiData:[],
     date:date,
     bankparametersdata:{
        // "bankcode":"",
        "defaultDateFormat":"",
        "defaultAmtFormat":"",
        "decimalSep":"",
        "digitSep":"",
        "defaultCurrency":"",
        "defaultLanguage":"",
        "defaultHome":"",
        "customerDays":""
      },
    }
}
handleChange= (e)=> {  
  var bankparametersdata1 = this.state.bankparametersdata
  bankparametersdata1[e.target.id] = e.target.value
  this.setState({bankparametersdata:bankparametersdata1});  
  }
  saveBankParameter = () =>{
    debugger
    var notificationData={}
     notificationData = this.state.bankparametersdata;
     var bankcode=(localStorage.getItem("bankdata"))
     var token = (localStorage.getItem("tokendata"))
     const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token,
        'bankcode': bankcode,
        'branchcode': 'A1000-01',
        'currentdate': this.state.date,
        'defaultlang': 'Eng',
        'currancy': 'INR',
        'userid': '101'
      }
      var saveapidata=this.state.bankparametersdata;
      if(this.state.bankparametersdata.defaultDateFormat==null||this.state.bankparametersdata.defaultDateFormat==""||this.state.bankparametersdata.defaultDateFormat==undefined)
      {
        Swal.fire("Please select date format");
        return
     }
      if(this.state.bankparametersdata.defaultAmtFormat==null||this.state.bankparametersdata.defaultAmtFormat==""||this.state.bankparametersdata.defaultAmtFormat==undefined)
      {
        Swal.fire("Please select number format ");
        return
     }
      if(this.state.bankparametersdata.decimalSep==null||this.state.bankparametersdata.decimalSep==""||this.state.bankparametersdata.decimalSep==undefined)
      {
        Swal.fire("Please select decimal format");
        return
     }
      if(this.state.bankparametersdata.digitSep==null||this.state.bankparametersdata.digitSep==""||this.state.bankparametersdata.digitSep==undefined)
      {
        Swal.fire("Please select digital separator");
        return
     }
      if(this.state.bankparametersdata.defaultCurrency==null||this.state.bankparametersdata.defaultCurrency==""||this.state.bankparametersdata.defaultCurrency==undefined)
      {
        Swal.fire("Please select default currency");
        return
     }
      if(this.state.bankparametersdata.defaultLanguage==null||this.state.bankparametersdata.defaultLanguage==""||this.state.bankparametersdata.defaultLanguage==undefined)
      {
        Swal.fire("Please select default language");
        return
     }
      if(this.state.bankparametersdata.defaultHome==null||this.state.bankparametersdata.defaultHome==""||this.state.bankparametersdata.defaultHome==undefined)
      {
        Swal.fire("Please enter default swift home location");
        return
     }
     if (this.state.bankparametersdata.customerDays==null||this.state.bankparametersdata.customerDays==""||this.state.bankparametersdata.customerDays==undefined)
      {
         Swal.fire("Please enter days for customer");
       return
      }
      if (this.state.bankparametersdata.customerDays<1)
      {
         Swal.fire("Please enter Valid days for customer");
       return
      }

      this.props.dispatch(handlebankparameterpData(notificationData,headers))
      this.setState({  
        bankparametersdata:{
            "defaultDateFormat":"",
            "defaultAmtFormat":"",
            "decimalSep":"",
            "digitSep":"",
            "defaultCurrency":"",
            "defaultLanguage":"",
            "defaultHome":"",
            "customerDays":""
        },
   }) 
}
handleClear= ()=> {  
  debugger
  this.setState({  
    bankparametersdata:{
      "defaultDateFormat":"",
      "defaultAmtFormat":"",
      "decimalSep":"",
      "digitSep":"",
      "defaultCurrency":"",
      "defaultLanguage":"",
      "defaultHome":"",
      "customerDays":""
    },
  
 })
  } 
    render() {
      console.log("parameters",this.state.bankparametersdata)
        return (
            <React.Fragment>
                <Universal/>
                <section id="main-content">
        <section className="wrapper">
          <div className="row">
            <div className="col-lg-9 main-chart">
              <section className="dashboard-counts no-padding-bottom">
               
                <div className="container-fluid" style={{marginTop: '-1rem'}}>
                  <h1 style={{fontSize: '22px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid #e9ecef'}}>Bank Parameter </h1>
                  <div className="container-fluid">
                    <div className="row bg-blue  has-shadow mt-3" style={{borderRadius: '1rem'}}>
                    
                      
                  <div className="col-12 col-md-2 col-lg-2 rightCol">
                  <p  style={{fontWeight:"bolder",color:"white",fontSize:"13px"}}>Default Digit Separator <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" >
                  <div className="form-group">
                          <select id="digitSep" className="form-select form-select-sm minimal heightForm"  style={{width: '100%',height:"auto"}}
                          onChange={this.handleChange}  value={this.state.bankparametersdata.digitSep!==""?this.state.bankparametersdata.digitSep:""}>
                           <option value=""> Select Digit Separator </option>
                             <option value=",">Comma (,)</option>
                              <option value=".">Period (.)</option>
                          </select>
                        </div>
                  </div>
                  <div className="col-12 col-md-2 col-lg-2 rightCol">
                  <p style={{fontWeight:"bolder",color:"white",fontSize:"13px"}} className="">Default Date Format <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" >
                  <div className="form-group">
                          <select  id="defaultDateFormat" className="form-select form-select-sm minimal heightForm" aria-label=".form-select-sm example" style={{width: '100%',height:"auto"}}
                           onChange={this.handleChange}  value={this.state.bankparametersdata.defaultDateFormat!==""?this.state.bankparametersdata.defaultDateFormat:""}>
                           <option value="">Default Date Format</option>
                                        <option value="YYYY/MM/DD">YYYY/MM/DD</option>
                                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                          </select>
                        </div>
                  </div>
                  <div className="col-12 col-md-2 col-lg-2 rightCol">
                  <p style={{marginTop: '0rem',fontWeight:"bolder",color:"white",fontSize:"13px"}}>Default Number Format <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" >
                  <div className="form-group" style={{marginTop: '0rem'}}>
                          <select id="defaultAmtFormat" className="form-select form-select-sm minimal heightForm" aria-label=".form-select-sm example" style={{width: '100%',height:"auto"}}
                           onChange={this.handleChange} value={this.state.bankparametersdata.defaultAmtFormat!==""?this.state.bankparametersdata.defaultAmtFormat:""}>
                          <option value="">Default Number Format</option>
                                        <option value="millions">millions</option>
                                        <option value="lakhs">lakhs</option>
                          </select>
                        </div>
                  </div>
                  <div className="col-12 col-md-2 col-lg-2 rightCol">
                  <p style={{marginTop: '0rem',fontWeight:"bolder",color:"white",fontSize:"13px"}} >Default Decimal Separator <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" >
                  <div className="form-group" style={{marginTop: '0rem'}}>
                          <select  id="decimalSep" className="form-select form-select-sm minimal heightForm" aria-label=".form-select-sm example" style={{width: '100%',height:"auto"}}
                          onChange={this.handleChange} 
                          value={this.state.bankparametersdata.decimalSep!==""?this.state.bankparametersdata.decimalSep:""}>
                          <option value=""> Decimal Separator </option>
                                        <option value=".">Period (.)</option>
                                        <option value=",">Comma (,)</option>
                          </select>
                        </div>
                  </div>
                  <div className="col-12 col-md-2 col-lg-2 rightCol">
                  <p style={{marginTop: '0rem',fontWeight:"bolder",color:"white",fontSize:"13px"}}>Default Currency <span style={{ color: "red" }}>*</span></p>
                    </div>
                  <div className="col-12 col-md-4" >
                  <div className="form-group" style={{marginTop: '0rem'}}>
                          <select id="defaultCurrency" className="form-select form-select-sm minimal heightForm" aria-label=".form-select-sm example" style={{width: '100%',height:"auto"}}
                          onChange={this.handleChange} 
                          value={this.state.bankparametersdata.defaultCurrency!==""?this.state.bankparametersdata.defaultCurrency:""} >
                              <option value=""> Select Currency</option>
                               <option value="INR">INR</option>
                                 <option value="USD">USD</option>
                          </select>
                        </div>
                  </div>
                  <div className="col-12 col-md-2 col-lg-2 rightCol">
                  <p style={{marginTop: '0rem',fontWeight:"bolder",color:"white",fontSize:"13px"}}>Default Language <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" >
                  <div className="form-group" style={{marginTop: '0rem'}}>
                          <select id="defaultLanguage" className="form-select form-select-sm minimal heightForm" aria-label=".form-select-sm example" style={{width: '100%',height:"auto"}}
                          onChange={this.handleChange}  value={this.state.bankparametersdata.defaultLanguage!==""?this.state.bankparametersdata.defaultLanguage:""}>
                            <option value=""> Select Language</option>
                             <option value="EN">English</option>
                             <option value="HN">Hindi</option>
                          </select>
                        </div>
                  </div>
                  <div className="col-12 col-md-2 col-lg-2 rightCol">
                  <p style={{marginTop: '1rem',fontWeight:"bolder",color:"white",fontSize:"13px"}}>Default SWIFT Home Location <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" >
                  <div className="form-group" style={{marginTop: '1rem'}}>
                        <input type="text"  id="defaultHome" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                          onChange={this.handleChange} 
                          placeholder="Enter Swift Location" value={this.state.bankparametersdata.defaultHome!==""?this.state.bankparametersdata.defaultHomes:""} />
                        </div>
                  </div>
                  <div className="col-12 col-md-2 col-lg-2 rightCol">
                  <p style={{marginTop: '1rem',fontWeight:"bolder",color:"white",fontSize:"13px"}}>New Customer Days <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" >
                  <div className="form-group" style={{marginTop: '1rem'}}>
                        <input type="text"  id="customerDays" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                          onChange={this.handleChange} 
                          placeholder="Enter Customer Days" value={this.state.bankparametersdata.customerDays!==""?this.state.bankparametersdata.customerDays:""} />
                        </div>
                  </div>
                  
                  <div className="col-12 col-md-4" style={{marginTop: '-1rem',marginLeft:'600px'}}>
                    
                        <div className="row pull-right">
                                                                 
                                                                  <div className="pr-3">
                                                                    <button type="button" className="btn btn-primary " style={{float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px'}} onClick={() => this.handleClear()}>Reset</button>
                                                                  </div>
                                                                  <div className="pr-3">
                                                                    <button type="button" className="btn btn-primary " style={{float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px'}} onClick={() => this.saveBankParameter()}
                                                                      >Save</button>
                                                                  </div>
                                                                </div>
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

  return {
     
  }

}
export default connect(mapStateToProps)(bank_parameter)

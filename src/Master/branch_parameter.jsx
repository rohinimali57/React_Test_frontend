import React, { Component } from 'react'
import Universal from '../common/universal'
import Swal from 'sweetalert2'
import { connect } from 'react-redux'
import { handleGetBranchByBankCode } from '../actions/branchMaster'
import {handleSaveBranchParameter} from '../actions/branchparameter'

 class branch_parateter extends Component {
    constructor(props) {
        super(props)
        var today = new Date(),
        date = today.getFullYear() + '/'+(today.getMonth() < 10 ? "0" : "") + (today.getMonth() + 1) + '/'+(today.getDate() < 10 ? "0" : "") + today.getDate();
        this.state = {
            date:date,
          getApiData: [],
          branchparameterdata: {
            "branchCode":"",
            "defaultDateFormat": "",
            "defaultAmtFormat": "",
            "decimalSep": "",
            "digitSep": "",
            "deafultNumberFormat": "",
            "deafultLanguage": "",
          },
        }
      }
      componentDidMount() {
        var token = (localStorage.getItem("tokendata"))
        var bankCode =localStorage.getItem("bankdata")
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token,
          }
       this.props.dispatch(handleGetBranchByBankCode(bankCode,headers))
      
    
      }
      saveBranchParameter = () => {
        debugger
        var notificationData = this.state.branchparameterdata;
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
        if((this.state.branchparameterdata.branchCode===null||this.state.branchparameterdata.branchCode===""||this.state.branchparameterdata.branchCode===undefined)||
        (this.state.branchparameterdata.defaultDateFormat===null||this.state.branchparameterdata.defaultDateFormat===""||this.state.branchparameterdata.defaultDateFormat===undefined)||
        (this.state.branchparameterdata.defaultAmtFormat===null||this.state.branchparameterdata.defaultAmtFormat===""||this.state.branchparameterdata.defaultAmtFormat===undefined)||
        (this.state.branchparameterdata.decimalSep===null||this.state.branchparameterdata.decimalSep===""||this.state.branchparameterdata.decimalSep===undefined)||
        (this.state.branchparameterdata.digitSep===null||this.state.branchparameterdata.digitSep===""||this.state.branchparameterdata.digitSep===undefined)||
        (this.state.branchparameterdata.deafultNumberFormat===null||this.state.branchparameterdata.deafultNumberFormat===""||this.state.branchparameterdata.deafultNumberFormat===undefined)||
        (this.state.branchparameterdata.deafultLanguage===null||this.state.branchparameterdata.deafultLanguage===""||this.state.branchparameterdata.deafultLanguage===undefined)
        ){
           Swal.fire("Please Fill the All Details");
         return
        }
       this.props.dispatch(handleSaveBranchParameter(notificationData, headers))
        this.setState({
          branchparameterdata: {
            "branchCode":"",
            "defaultDateFormat": "",
            "defaultAmtFormat": "",
            "decimalSep": "",
            "digitSep": "",
            "deafultNumberFormat": "",
            "deafultLanguage": ""
          },
    
        })
      }
     handleChange = (e) => {
        var branchparameterdata1 = this.state.branchparameterdata
        branchparameterdata1[e.target.id] = e.target.value
        this.setState({ branchparameterdata: branchparameterdata1 });
      }
      handleClear = () => {
        debugger
        this.setState({
          branchparameterdata: {
            "branchCode":"",
            "defaultDateFormat": "",
            "defaultAmtFormat": "",
            "decimalSep": "",
            "digitSep": "",
            "deafultNumberFormat": "",
            "deafultLanguage": ""
          },
    
        })
      }
    render() {
        console.log("xq",this.state.branchparameterdata)
        let Branchoptions = this.props.branchlistbybankcode.map(value => (
            <option value={value.branchCode}>{value.branchCode}</option>
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
              <h1 style={{fontSize: '22px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid #e9ecef'}}>Branch Parameter</h1>
              <div className="container-fluid">
              <div className="row bg-blue  has-shadow mt-3" style={{borderRadius: '1rem'}}>
                  <div className="col-12 col-md-2 col-lg-2 rightCol">
                    <p  style={{fontWeight:"bolder",color:"white",fontSize:"15px"}}>Branch Code <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" >
                    <div className="form-group">
                    <select id="branchCode" className="form-select form-select-sm minimal heightForm"  style={{width: '100%',height:"30px"}}
                       onChange={this.handleChange}  value={this.state.branchparameterdata.branchCode !== "" ? this.state.branchparameterdata.branchCode : ""}  >
                           <option value=""> Select Branch Code </option>
                             {Branchoptions}
                          </select>
                    </div>
                  </div>
                  <div className="col-11  col-lg-2 rightCol">
                    <p style={{marginTop: '0rem',color:"white",fontWeight:"bolder",fontSize:"15px"}} className="">Default Date Format <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" >
                    <div className="form-group">
                    <select id="defaultDateFormat" className="form-select form-select-sm minimal heightForm"  style={{width: '100%',height:"30px"}}
                         onChange={this.handleChange} 
                         value={this.state.branchparameterdata.defaultDateFormat !== "" ? this.state.branchparameterdata.defaultDateFormat : ""}  >
                           <option value="">Default Number Format</option>
                           <option value="YYYY/MM/DD">YYYY/MM/DD</option>
                           <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                           <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                          </select>
                    </div>
                  </div>
                  <div className="col-12 col-md-2 col-lg-2 rightCol">
                    <p  style={{marginTop: '0rem',color:"white",fontWeight:"bolder",fontSize:"15px"}}>Default Number Format <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '0rem'}}>
                    <div className="form-group">
                    <select id="defaultAmtFormat" className="form-select form-select-sm minimal heightForm"  style={{width: '100%',height:"30px"}}
                        onChange={this.handleChange}  value={this.state.branchparameterdata.defaultAmtFormat !== "" ? this.state.branchparameterdata.defaultAmtFormat : ""}  >
                          <option value="">Default Number Format</option>
                          <option value="millions">millions</option>
                          <option value="lakhs">lakhs</option>
                             
                          </select>
                    </div>
                  </div>
                  <div className="col-11  col-lg-2 rightCol">
                    <p style={{marginTop: '0rem',fontWeight:"bolder",color:"white",fontSize:"15px"}} className="">Default Digit Separator <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '0rem'}}>
                    <div className="form-group">
                    <select id="digitSep" className="form-select form-select-sm minimal heightForm"  style={{width: '100%',height:"30px"}}
                        onChange={this.handleChange}
                        value={this.state.branchparameterdata.digitSep !== "" ? this.state.branchparameterdata.digitSep : ""}  >
                           <option value="">Default Digit Separator </option>
                           <option value=",">Comma(,)</option>
                           <option value=".">Period(.)</option>
                          </select>
                    </div>
                  </div>
                  <div className="col-12 col-md-2 col-lg-2 rightCol">
                    <p  style={{marginTop: '0rem',fontWeight:"bolder",color:"white",fontSize:"15px"}}>Default Decimal Separator <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '0rem'}}>
                    <div className="form-group">
                    <select id="decimalSep" className="form-select form-select-sm minimal heightForm"  style={{width: '100%',height:"30px"}}
                        onChange={this.handleChange} value={this.state.branchparameterdata.decimalSep !== "" ? this.state.branchparameterdata.decimalSep : ""} >
                         <option value="">Default Decimal  Separator </option>
                         <option value=",">Comma(,)</option>
                         <option value=".">Period(.)</option>
                             
                          </select>
                    </div>
                  </div>
                  <div className="col-11  col-lg-2 rightCol">
                    <p style={{fontWeight:"bolder",color:"white",fontSize:"15px"}} className="">Default Currency <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="form-group">
                    <select id="deafultNumberFormat" className="form-select form-select-sm minimal heightForm"  style={{width: '100%',height:"30px"}}
                          onChange={this.handleChange}
                          value={this.state.branchparameterdata.deafultNumberFormat !== "" ? this.state.branchparameterdata.deafultNumberFormat : ""} >
                            <option value="">Default Currency</option>
                            <option value="Rs">INR</option>
                            <option value="Dollar">USD</option>
                          </select>
                    </div>
                  </div>
                  <div className="col-12 col-md-2 col-lg-2 rightCol">
                    <p  style={{fontWeight:"bolder",color:"white",fontSize:"15px"}}>Default Language <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" >
                    <div className="form-group">
                    <select id="deafultLanguage" className="form-select form-select-sm minimal heightForm"  style={{width: '100%',height:"30px"}}
                          onChange={this.handleChange}
                          value={this.state.branchparameterdata.deafultLanguage !== "" ? this.state.branchparameterdata.deafultLanguage : ""} >
                         <option value="">Default Language</option>
                            <option value="eng">English</option>
                            <option value="hin">Hindi</option>
                             
                          </select>
                    </div>
                    
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '-2rem',marginLeft:'600px'}}>

                  <div className="row pull-right" >    
                       
                                <div className="pr-3">
                                    <button type="button" className="btn btn-primary " style={{float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px'}} onClick={() => this.handleClear()}>Reset</button>
                                  </div>
                                  <div className="pr-3">
                            <button type="button" className="btn btn-primary " style={{float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px'}} onClick={() => this.saveBranchParameter()} >Save</button>
                             </div>
									</div>  
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  </section>

           </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    const { branchlistbybankcode } = state.branchlist
    console.log("gauravvvv", branchlistbybankcode)
    return {
      branchlistbybankcode,
    }
  }
export default connect(mapStateToProps)(branch_parateter)

import React, { Component } from 'react'
import Universal from '../common/universal'
import Swal from 'sweetalert2'
import { connect } from 'react-redux'
import { handlebranchmaster, handleGetBranchByBankCode, handleGetBranchByCode } from '../actions/branchMaster'
import { handleGetCityMasterList  } from '../actions/cities'
import { handleGetStateMasterList  } from '../actions/state'
import { handleGetCountryMasterList } from '../actions/city';
import validator from 'validator' 



class branch_management extends Component {
    constructor(props) {
        super(props)
        var today = new Date(),
        date = today.getFullYear() + '/'+(today.getMonth() < 10 ? "0" : "") + (today.getMonth() + 1) + '/'+(today.getDate() < 10 ? "0" : "") + today.getDate();
    
        this.state = {
          date: date,
          branchCode: [],
          bank: (localStorage.getItem("bankdata")).bank_code,
          countryList: [],
          savebutton: false,
          updatebutton: false,
          stateList: [],
          checkmail: true,
          checkPhone: true,
          cityList: [],
          branchmanagementdata: {
    
            "branchCode": "",
            "branchType": "",
            "branchName": "",
            "branchAddress": "",
            "branchCity": "",
            "branchState": "",
            "branchCountry": "",
            "postalCode": "",
            "tele1": "",
            "tele2": "",
            "mobile": "",
            "fax": "",
            "emailId": "",
            "branchManager": ""
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
        this.props.dispatch(handleGetCountryMasterList(bankCode,headers));
        this.props.dispatch(handleGetStateMasterList(bankCode,headers));
        this.props.dispatch(handleGetCityMasterList(bankCode,headers));
        this.props.dispatch(handleGetBranchByBankCode(bankCode,headers))
      }

      saveBranchdata   () {
        debugger
        var notificationData = {}
        notificationData = this.state.branchmanagementdata;
        var bankcode = (localStorage.getItem("bankdata"))
        var token = (localStorage.getItem("tokendata"))
    
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token,
          'bankcode': bankcode,
          // 'branchcode': 'A1000-01',
          'currentdate': this.state.date,
          'defaultlang': 'Eng',
          'currancy': 'INR',
          'userid': '101'
        }
        if((this.state.branchmanagementdata.branchCode===null||this.state.branchmanagementdata.branchCode===""||this.state.branchmanagementdata.branchCode===undefined)||
        (this.state.branchmanagementdata.branchType===null||this.state.branchmanagementdata.branchType===""||this.state.branchmanagementdata.branchType===undefined)||
        (this.state.branchmanagementdata.branchName===null||this.state.branchmanagementdata.branchName===""||this.state.branchmanagementdata.branchName===undefined)||
        (this.state.branchmanagementdata.branchAddress===null||this.state.branchmanagementdata.branchAddress===""||this.state.branchmanagementdata.branchAddress===undefined)||
        (this.state.branchmanagementdata.branchCity===null||this.state.branchmanagementdata.branchCity===""||this.state.branchmanagementdata.branchCity===undefined)||
        (this.state.branchmanagementdata.branchState===null||this.state.branchmanagementdata.branchState===""||this.state.branchmanagementdata.branchState===undefined)||
        (this.state.branchmanagementdata.branchCountry===null||this.state.branchmanagementdata.branchCountry===""||this.state.branchmanagementdata.branchCountry===undefined)||
        (this.state.branchmanagementdata.postalCode===null||this.state.branchmanagementdata.postalCode===""||this.state.branchmanagementdata.postalCode===undefined)||
        (this.state.branchmanagementdata.tele1===null||this.state.branchmanagementdata.tele1===""||this.state.branchmanagementdata.tele1===undefined)||
        // (this.state.branchmanagementdata.tele2===null||this.state.branchmanagementdata.tele2===""||this.state.branchmanagementdata.tele2===undefined)||
        (this.state.branchmanagementdata.mobile===null||this.state.branchmanagementdata.mobile===""||this.state.branchmanagementdata.mobile===undefined)||
        (this.state.branchmanagementdata.fax===null||this.state.branchmanagementdata.fax===""||this.state.branchmanagementdata.fax===undefined)||
        (this.state.branchmanagementdata.emailId===null||this.state.branchmanagementdata.emailId===""||this.state.branchmanagementdata.emailId===undefined)||
        (this.state.branchmanagementdata.branchManager===null||this.state.branchmanagementdata.branchManager===""||this.state.branchmanagementdata.branchManager===undefined)

        ){
           Swal.fire("Please Fill the All Details");
         return
        }
        var phoneno = /^\d{10}$/;
        if(!this.state.branchmanagementdata.mobile.match(phoneno))
        {
          Swal.fire("Please Enter Valid Mobile No");
         return true;
        }

        var phoneno = /^\d{10}$/;
        if(!this.state.branchmanagementdata.tele1.match(phoneno))
        {
          Swal.fire("Please Enter Valid Landline No");
         return true;
        }

        var phoneno = /^\d{10}$/;
        if(!this.state.branchmanagementdata.tele2===null){
        if(!this.state.branchmanagementdata.tele2.match(phoneno))
        {
          Swal.fire("Please Enter Valid Optional Landline No");
         return true;
        }
      }
          var faxRegEx = /[\+? *[1-9]+]?[0-9 ]+/;
      if (!this.state.branchmanagementdata.fax.match(faxRegEx)) {
          Swal.fire("Please Enter Valid Fax no");
          return ;
        }
         this.props.dispatch(handlebranchmaster(notificationData, headers))
        this.props.dispatch(handleGetBranchByBankCode(bankcode,headers))
        this.setState({
          branchmanagementdata: {
            "branchCode": "",
            "branchType": "",
            "branchName": "",
            "branchAddress": "",
            "branchCity": "",
            "branchState": "",
            "branchCountry": "",
            "postalCode": "",
            "tele1": "",
            "tele2": "",
            "mobile": "",
            "fax": "",
            "emailId": "",
            "branchManager": ""
          },
        })
      }

getBranchMastByCode  = async() => {
  debugger
  var branchCode  =this.state.branchmanagementdata.branchCode
  var token = (localStorage.getItem("tokendata"))
  const headers = {
   'Content-Type': 'application/json',
  'Authorization': 'Bearer '+token,
}
await   this.props.dispatch(handleGetBranchByCode(branchCode,headers))
  const { branchlistbycode } = this.props;
  this.setState({
    branchmanagementdata: branchlistbycode
  })

}

checkemail(){
  let emailid = document.getElementById('emailId').value
  var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if(!filter.test(emailid)){
    document.getElementById('emailId').focus()
    this.setState({checkmail : false})
    }else{
      this.setState({checkmail: true})
    }
  }




actionMethod = (row,cell) => {

return (
    < React.Fragment>
     <div >
          <i class="fa fa-edit" aria-hidden="true" title="Edit" style={{color:"blue"}} onClick={() => this.editApiData(row,cell)} ></i>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         <i class="fa fa-trash" aria-hidden="true" title="Delete" style={{color:"red"}} onClick={() => this.DeleteApi(row,cell)} ></i>
       </div>
      
    </React.Fragment>
)
}
handleChange= (e)=> {  
var branchmanagementdata1 = this.state.branchmanagementdata

branchmanagementdata1[e.target.id] = e.target.value
this.setState({branchmanagementdata:branchmanagementdata1});  
} 

  
  editApiData ()  {
    debugger

    this.setState({ savebutton: false, updatebutton: true })
  }
  editApiData1 ()  {
    debugger

    this.setState({ savebutton: true, updatebutton: false })
  }
  checkMobile() {
    debugger
      let phone = document.getElementById('mobile').value

     let validatePhoneNumber = (phone) => {
        const isValidPhoneNumber = validator.isMobilePhone(phone)
        if(isValidPhoneNumber){
          Swal.fire("Please Enter Valid No");
          return
        }
       }

          // if (phone.length > 10 || phone.length < 10 || phone==="") {
          //   document.getElementById('mobile').focus()
          //     this.setState({ checkPhone: false })
          // } else {
          //     this.setState({ checkPhone: true })
          // }
      
  }
  checkMobile1() {
    debugger


     
          // if (phone.length > 10 || phone.length < 10 || phone==="") {
          //   document.getElementById('tele1').focus()
          //     this.setState({ checkPhone: false })
          // } else {
          //     this.setState({ checkPhone: true })
          // }
      
  }
    render() {
        console.log("branchmanagementdata", this.state.branchmanagementdata)
        let Countryoptions = this.props.countrylists.map(value => (
          <option value={value.countryName}>{value.countryName}</option>
        ));
        let Stateoptions = this.props.statelists.map(value => (
          <option value={value.stateName}>{value.stateName}</option>
        ));
        let Cityoptions = this.props.citylists.map(value => (
          <option value={value.cityName}>{value.cityName}</option>
        ));
        let Branchoptions = this.props.branchlistbybankcode.map(value => (
          <option value={value.branchCode}>{value.branchCode}</option>
        ));
        return (
            <React.Fragment>
            <div>

                                <Universal/>
                                <section id="main-content">
        <section className="wrapper">
          <div className="row">
            <div className="col-lg-9 main-chart">
              <section className="dashboard-counts no-padding-bottom">
               
                <div className="container-fluid" style={{marginTop: '-1rem'}}>
                  <h1 style={{fontSize: '22px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid #e9ecef'}}>Branch Management </h1>
                  
                  <div class="divider">
                  <div className=" pull-left" >
                  <div class="row">
              <button type="button" id="Save" onClick={() => this.editApiData1()}
                className="btn btn-primary " style={{borderColor: '#303974', backgroundColor: '#303974', fontSize: '16px'}}>Create New</button>
             
            </div>
            </div>
                  </div>
                  <div class="divider">
                  <div className=" pull-right1" >
                  <div class="row">
              <button type="button" id="Save"  onClick={() => this.editApiData()}
                className="btn btn-primary " style={{borderColor: '#303974', backgroundColor: '#303974', fontSize: '16px'}}>Update</button>
            
            </div>
            </div>
                  </div>
                  <div class="divider"/>
                  <div class="divider"/>
                  <div class="divider"/>

                  <div className="container-fluid">
                  {this.state.savebutton === true ?
                    <div className="row bg-blue  has-shadow mt-3" style={{borderRadius: '1rem'}}>
                    
       <div className="col-12 col-md-2 col-lg-2 rightCol">
       <p  style={{fontWeight:"bolder",fontSize:"15px",color:"white"}}>Branch Code <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" >
                  <div className="form-group">
                        <input type="text"  id="branchCode" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                         
                          placeholder="Enter Branch Code"
                          onChange={(e)=>this.handleChange(e)}
                          value={this.state.branchmanagementdata.branchCode!== "" ? this.state.branchmanagementdata.branchCode : ""}  />
                        </div>
                  </div>
                  <div className="col-11  col-lg-2 rightCol">
                  <p style={{fontWeight:"bolder",color:"white",fontSize:"15px"}} className="">Branch Type <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" >
                  <div className="form-group">
                        <select type="text"  id="branchType" className="form-select form-select-sm minimal heightForm"  style={{width: '100%',height:"auto"}}
                          onChange={(e)=>this.handleChange(e)}
                          value={this.state.branchmanagementdata.branchType!== "" ? this.state.branchmanagementdata.branchType : ""}>
                          <option value="">Select Branch</option>
                      <option value="head_office">Head Office </option>
                          </select>
                        </div>
                  </div>
                  <div className="col-12 col-md-2 col-lg-2 rightCol">
                  <p style={{marginTop: '1rem',fontWeight:"bolder",color:"white",fontSize:"15px"}}> Branch Name <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '1rem'}} >
                  <div className="form-group">
                        <input type="text"  id="branchName" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                          placeholder="Enter Branch Name" 
                          onChange={(e)=>this.handleChange(e)}
                      value={this.state.branchmanagementdata.branchName!== "" ? this.state.branchmanagementdata.branchName : ""}/>
                        </div>
                  </div>
                  <div className="  col-11  col-lg-2 rightCol">
                  <p style={{marginTop: '1rem',fontWeight:"bolder",color:"white",fontSize:"14px"}} className="">Branch Address <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '1rem'}} >
                  <div className="form-group">
                        <input type="text"  id="branchAddress" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                          placeholder="Enter Branch Address"
                          onChange={(e)=>this.handleChange(e)}
                      value={this.state.branchmanagementdata.branchAddress!== "" ? this.state.branchmanagementdata.branchAddress : ""} />
                        </div>
                  </div>
                    






                  <div className="col-12 col-md-2 col-lg-2 rightCol">
                  <p style={{marginTop: '1rem',fontWeight:"bolder",color:"white",fontSize:"15px"}}> Country <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '1rem'}}  >
                  <div className="form-group">
                        <select type="text"  id="branchCountry" className="form-select form-select-sm minimal heightForm"  style={{width: '100%',height:"auto"}}
                          onChange={(e)=>this.handleChange(e)}
                          value={this.state.branchmanagementdata.branchCountry!== "" ? this.state.branchmanagementdata.branchCountry : ""}>
                          <option value="">Select Country</option>
                             {Countryoptions}
                          </select>
                        </div>
                  </div>
                  <div className="col-11  col-lg-2 rightCol">
                  <p style={{marginTop: '1rem',fontWeight:"bolder",color:"white",fontSize:"15px"}} className="">State <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '1rem'}} >
                  <div className="form-group">
                        <select type="text"  id="branchState" className="form-select form-select-sm minimal heightForm"  style={{width: '100%',height:"auto"}}
                          onChange={(e)=>this.handleChange(e)}
                          value={this.state.branchmanagementdata.branchState!== "" ? this.state.branchmanagementdata.branchState : ""}>
                          <option value="">Select State</option>
                          {Stateoptions}
                          </select>
                        </div>
                  </div> 
                   <div className="col-12 col-md-2 col-lg-2 rightCol">
                  <p style={{marginTop: '1rem',fontWeight:"bolder",color:"white",fontSize:"15px"}}>City <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '1rem'}} >
                  <div className="form-group">
                        <select type="text"  id="branchCity" className="form-select form-select-sm minimal heightForm"  style={{width: '100%',height:"auto"}}
                          onChange={(e)=>this.handleChange(e)}
                          value={this.state.branchmanagementdata.branchCity!== "" ? this.state.branchmanagementdata.branchCity : ""}>
                          <option value="">Select City</option>
                         {Cityoptions}
                          </select>
                        </div>
                  </div>
                  <div className="col-11  col-lg-2 rightCol">
                  <p style={{marginTop: '1rem',fontWeight:"bolder",color:"white",fontSize:"15px"}} className="">Pin-Code <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '1rem'}} >
                  <div className="form-group">
                        <input type="text"  id="postalCode" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                          placeholder="Enter Pin Code" 
                          onChange={(e)=>this.handleChange(e)}
                      value={this.state.branchmanagementdata.postalCode!== "" ? this.state.branchmanagementdata.postalCode : ""}/>
                        </div>
                  </div> 
                   <div className="col-12 col-md-2 col-lg-2 rightCol">
                  <p style={{marginTop: '1rem',fontWeight:"bolder",color:"white",fontSize:"15px"}}> Branch Manager Name <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '1rem'}} >
                  <div className="form-group">
                        <input type="text"  id="branchManager" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                          onChange={(e)=>this.handleChange(e)}
                      placeholder=" Enter Branch Manager Name" value={this.state.branchmanagementdata.branchManager!== "" ? this.state.branchmanagementdata.branchManager : ""}
                       />
                        </div>
                  </div>
                  <div className="col-11  col-lg-2 rightCol">
                  <p style={{marginTop: '1rem',fontWeight:"bolder",color:"white",fontSize:"15px"}} className="">Landline Number <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '1rem'}} >
                  <div className="form-group">
                        <input type="text"  id="tele1" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                       onChange={(e)=>this.handleChange(e)} onBlur={() => this.checkMobile1()} required
                      placeholder=" Enter Landline" value={this.state.branchmanagementdata.tele1!== "" ? this.state.branchmanagementdata.tele1 : ""} />
                       {/* {this.state.checkPhone===true ?
                                        <span></span> : <span style={{ color: "red" }}>Landline number should be 10 digits</span>
                                    } */}
                        </div>
                  </div> 
                   <div className="col-12 col-md-2 col-lg-2 rightCol">
                   <p style={{marginTop: '0rem',fontWeight:"bolder",color:"white",fontSize:"15px"}}> Mobile No <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '0rem'}} >
                  <div className="form-group">
                        <input type="text"  id="mobile" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                          placeholder="Enter Mobile No"
                          maxLength='10' onChange={(e)=>this.handleChange(e)}  onBlur={() => this.checkMobile()} required
                          value={this.state.branchmanagementdata.mobile!==""?this.state.branchmanagementdata.mobile:""} />
                           {/* {this.state.checkPhone===true ?
                                        <span></span> : <span style={{ color: "red" }}>Phone number should be 10 digits</span>
                                    } */}
                        </div>
                  </div>
                  <div className="col-11  col-lg-2 rightCol">
                  <p style={{marginTop: '0rem',fontWeight:"bolder",color:"white",fontSize:"15px"}} className="">Email-ID <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '0rem'}}>
                  <div className="form-group">
                        <input type="text"  id="emailId" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                          placeholder="Enter E-mail Id"
                          value={this.state.branchmanagementdata.emailId!== "" ? this.state.branchmanagementdata.emailId : ""} onChange={(e)=>this.handleChange(e)} onBlur={() => this.checkemail()} required />
                                                              {this.state.checkmail ? '' : <span style={{ color: "red" }}>Please provide valid email</span>}
                        </div>
                  </div> 
                   <div className="col-12 col-md-2 col-lg-2 rightCol">
                   <p style={{marginTop: '1rem',fontWeight:"bolder",color:"white",fontSize:"15px"}}> Fax Number <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '1rem'}}>
                  <div className="form-group">
                        <input type="text"  id="fax" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                          onChange={(e)=>this.handleChange(e)}
                      placeholder=" Enter FAX NO." value={this.state.branchmanagementdata.fax!== "" ? this.state.branchmanagementdata.fax : ""} />
                        </div>
                  </div>
                  <div className="col-11  col-lg-2 rightCol">
                  <p style={{marginTop: '1rem',fontWeight:"bolder",color:"white",fontSize:"15px"}} className="">Landline Number 2:(Optional)</p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '1rem'}}>
                  <div className="form-group">
                        <input type="text"  id="tele2" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                        
                          onChange={(e)=>this.handleChange(e)}
                      placeholder=" Enter Landline NO." value={this.state.branchmanagementdata.tele2!== "" ? this.state.branchmanagementdata.tele2 : ""} />
                       
                        </div>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '-2rem',marginLeft:'600px'}}>
                     
                        <div class="divider"/>
                       
                       
                        <div className="row pull-right">
                                                                  {/* <div className="pr-3">
                                                                    <button type="button" className="btn btn-primary" >Save</button>
                                                                  </div> */}
                                                                 
                                                                  <div className="pr-3">
                                                                    <button type="button" className="btn btn-primary " style={{float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px'}}onClick={() => this.saveBranchdata()} >Save</button>
                                                                  </div>

                                                                </div>
                      </div>
                    </div> 
                     :""}



                    {this.state.updatebutton === true ?
                  <div className=" pull-center" >
                    {/* <button type="button" id="Save" title="Add Data"  onClick={this.getBranchMastByCode}
                      className="btn btn-primary " style={{borderColor: '#303974', backgroundColor: '#303974', fontSize: '16px'}}>View</button> */}
                  </div> : ""}


                    {this.state.updatebutton === true ?

                    <div className="row bg-blue  has-shadow mt-3" style={{borderRadius: '1rem'}}>
                    <div className="col-12 col-md-2 col-lg-2 rightCol">
       <p  style={{fontWeight:"bolder",fontSize:"15px",color:"white"}}>Branch Code <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" >
                  <div className="form-group">
                        <select type="text"  id="branchCode" className="form-select form-select-sm minimal heightForm"  style={{width: '100%',height:"auto"}}
                          onChange={(e)=>this.handleChange(e)}
                          value={this.state.branchmanagementdata.branchCode!== "" ? this.state.branchmanagementdata.branchCode : ""}  >
                             <option value="">Select Branch Code</option>
                      {Branchoptions}
                          </select>
                        </div>
                  </div>
                  <div className="col-11  col-lg-2 rightCol">
                  <p style={{fontWeight:"bolder",color:"white",fontSize:"15px"}} className="">Branch Type <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" >
                  <div className="form-group">
                        <select type="text"  id="branchType" className="form-select form-select-sm minimal heightForm"  style={{width: '100%',height:"auto"}}
                          onChange={(e)=>this.handleChange(e)}
                          value={this.state.branchmanagementdata.branchType!== "" ? this.state.branchmanagementdata.branchType : ""}>
                          <option value="">Select Branch</option>
                      <option value="head_office">Head Office </option>
                          </select>
                        </div>
                  </div>
                  <div className="col-12 col-md-2 col-lg-2 rightCol">
                  <p style={{marginTop: '1rem',color:"white",fontWeight:"bolder",fontSize:"15px"}}> Branch Name <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '1rem'}} >
                  <div className="form-group">
                        <input type="text"  id="branchName" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                          placeholder="Enter Branch Name" 
                          onChange={(e)=>this.handleChange(e)}
                      value={this.state.branchmanagementdata.branchName!== "" ? this.state.branchmanagementdata.branchName : ""}/>
                        </div>
                  </div>
                  <div className="col-11  col-lg-2 rightCol">
                  <p style={{marginTop: '1rem',color:"white",fontWeight:"bolder",fontSize:"14px"}} className="">Branch Address <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '1rem'}} >
                  <div className="form-group">
                        <input type="text"  id="branchAddress" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                          placeholder="Enter Branch Address"
                          onChange={(e)=>this.handleChange(e)}
                      value={this.state.branchmanagementdata.branchAddress!== "" ? this.state.branchmanagementdata.branchAddress : ""} />
                        </div>
                  </div>
                    






                  <div className="col-12 col-md-2 col-lg-2 rightCol">
                  <p style={{marginTop: '1rem',color:"white",fontWeight:"bolder",fontSize:"15px"}}> Country <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '1rem'}}  >
                  <div className="form-group">
                        <select type="text"  id="branchCountry" className="form-select form-select-sm minimal heightForm"  style={{width: '100%',height:"auto"}}
                          onChange={(e)=>this.handleChange(e)}
                          value={this.state.branchmanagementdata.branchCountry!== "" ? this.state.branchmanagementdata.branchCountry : ""}>
                          <option value="">Select Country</option>
                             {Countryoptions}
                          </select>
                        </div>
                  </div>
                  <div className="col-11  col-lg-2 rightCol">
                  <p style={{marginTop: '1rem',color:"white",fontWeight:"bolder",fontSize:"15px"}} className="">State <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '1rem'}} >
                  <div className="form-group">
                        <select type="text"  id="branchState" className="form-select form-select-sm minimal heightForm"  style={{width: '100%',height:"auto"}}
                          onChange={(e)=>this.handleChange(e)}
                          value={this.state.branchmanagementdata.branchState!== "" ? this.state.branchmanagementdata.branchState : ""}>
                          <option value="">Select State</option>
                          {Stateoptions}
                          </select>
                        </div>
                  </div> 
                   <div className="col-12 col-md-2 col-lg-2 rightCol">
                  <p style={{marginTop: '1rem',color:"white",fontWeight:"bolder",fontSize:"15px"}}>City <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '1rem'}} >
                  <div className="form-group">
                        <select type="text"  id="branchCity" className="form-select form-select-sm minimal heightForm"  style={{width: '100%',height:"auto"}}
                          onChange={(e)=>this.handleChange(e)}
                          value={this.state.branchmanagementdata.branchCity!== "" ? this.state.branchmanagementdata.branchCity : ""}>
                          <option value="">Select City</option>
                         {Cityoptions}
                          </select>
                        </div>
                  </div>
                  <div className="col-11  col-lg-2 rightCol">
                  <p style={{marginTop: '1rem',color:"white",fontWeight:"bolder",fontSize:"15px"}} className="">Pin-Code <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '1rem'}} >
                  <div className="form-group">
                        <input type="text"  id="postalCode" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                          placeholder="Enter Pin Code" 
                          onChange={(e)=>this.handleChange(e)}
                      value={this.state.branchmanagementdata.postalCode!== "" ? this.state.branchmanagementdata.postalCode : ""}/>
                        </div>
                  </div> 
                   <div className="col-12 col-md-2 col-lg-2 rightCol">
                  <p style={{marginTop: '1rem',color:"white",fontWeight:"bolder",fontSize:"15px"}}> Branch Manager Name <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '1rem'}} >
                  <div className="form-group">
                        <input type="text"  id="branchManager" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                          onChange={(e)=>this.handleChange(e)}
                      placeholder=" Enter Branch Manager Name" value={this.state.branchmanagementdata.branchManager!== "" ? this.state.branchmanagementdata.branchManager : ""}
                       />
                        </div>
                  </div>
                  <div className="col-11  col-lg-2 rightCol">
                  <p style={{marginTop: '1rem',color:"white",fontWeight:"bolder",fontSize:"15px"}} className="">Landline Number <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '1rem'}} >
                  <div className="form-group">
                        <input type="text"  id="tele1" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                       onChange={(e)=>this.handleChange(e)} onBlur={() => this.checkMobile1()} required
                      placeholder=" Enter Landline" value={this.state.branchmanagementdata.tele1!== "" ? this.state.branchmanagementdata.tele1 : ""} />
                       {/* {this.state.checkPhone===true ?
                                        <span></span> : <span style={{ color: "red" }}>Landline number should be 10 digits</span>
                                    } */}
                        </div>
                  </div> 
                   <div className="col-12 col-md-2 col-lg-2 rightCol">
                   <p style={{marginTop: '0rem',color:"white",fontWeight:"bolder",fontSize:"15px"}}> Mobile No <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '0rem'}} >
                  <div className="form-group">
                        <input type="text"  id="mobile" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                          placeholder="Enter Mobile No"
                          maxLength='10' onChange={(e)=>this.handleChange(e)}  onBlur={() => this.checkMobile()} required
                          value={this.state.branchmanagementdata.mobile!==""?this.state.branchmanagementdata.mobile:""} />
                           {/* {this.state.checkPhone===true ?
                                        <span></span> : <span style={{ color: "red" }}>Phone number should be 10 digits</span>
                                    } */}
                        </div>
                  </div>
                  <div className="col-11  col-lg-2 rightCol">
                  <p style={{marginTop: '0rem',color:"white",fontWeight:"bolder",fontSize:"15px"}} className="">Email-ID <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '0rem'}}>
                  <div className="form-group">
                        <input type="text"  id="emailId" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                          placeholder="Enter E-mail Id"
                          value={this.state.branchmanagementdata.emailId!== "" ? this.state.branchmanagementdata.emailId : ""} onChange={(e)=>this.handleChange(e)} onBlur={() => this.checkemail()} required />
                                                              {this.state.checkmail ? '' : <span style={{ color: "red" }}>Please provide valid email</span>}
                        </div>
                  </div> 
                   <div className="col-12 col-md-2 col-lg-2 rightCol">
                   <p style={{marginTop: '1rem',color:"white",fontWeight:"bolder",fontSize:"15px"}}> Fax Number <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '1rem'}}>
                  <div className="form-group">
                        <input type="text"  id="fax" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                          onChange={(e)=>this.handleChange(e)}
                      placeholder=" Enter FAX NO." value={this.state.branchmanagementdata.fax!== "" ? this.state.branchmanagementdata.fax : ""} />
                        </div>
                  </div>
                  <div className="col-11  col-lg-2 rightCol">
                  <p style={{marginTop: '1rem',color:"white",fontWeight:"bolder",fontSize:"15px"}} className="">Landline Number 2:(Optional)</p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '1rem'}}>
                  <div className="form-group">
                        <input type="text"  id="tele2" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                        
                          onChange={(e)=>this.handleChange(e)}
                      placeholder=" Enter Landline NO." value={this.state.branchmanagementdata.tele2!== "" ? this.state.branchmanagementdata.tele2 : ""} />
                       
                        </div>
                  </div>
                      
                
                  <div className="col-12 col-md-4" style={{marginTop: '-2rem',marginLeft:'600px'}}>


                   
                      
                     
                      
                      
                       
                       
                       
                        <div className="row pull-right">
                                                                  {/* <div className="pr-3">
                                                                    <button type="button" className="btn btn-primary" >Save</button>
                                                                  </div> */}
                                                                 
                                                                  <div className="pr-3">
                                                                    <button type="button" className="btn btn-primary " style={{float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px'}} onClick={() => this.saveBranchdata()} >Update</button>
                                                                  </div>

                                                                </div>
                      </div>
                    </div>: ""}
                  </div>
                </div>
                
              </section>
              
            </div>
         
          </div>
        </section>
      </section>
                
            </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
  const { branchlistbybankcode, branchlistbycode } = state.branchlist

  const {countrymasterList} = state.countrylist
  const {statemasterList} = state.statelist
  const {citymasterList} = state.citieslist
  console.log("countrymasterList", countrymasterList)
  console.log("statemasterList", statemasterList)
  console.log("citymasterList", citymasterList)
  console.log("branchlistbycode", branchlistbycode)
  return {
    branchlistbybankcode,
    branchlistbycode,
    countrylists:countrymasterList,
    statelists:statemasterList,
    citylists:citymasterList
  }

}
export default connect(mapStateToProps)(branch_management)

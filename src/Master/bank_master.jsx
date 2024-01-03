import React, { Component } from 'react'
import Universal from '../common/universal'
import axios from 'axios';
import Swal from 'sweetalert2'
import { connect } from 'react-redux'
import { handleGetBankMasterData } from '../actions/bankMaster'
import {applicationContextPath} from '../common/api'

export class bank_master extends Component {
    constructor(props) {
        super(props)
        var today = new Date(),
        date = today.getFullYear() + '/'+(today.getMonth() < 10 ? "0" : "") + (today.getMonth() + 1) + '/'+(today.getDate() < 10 ? "0" : "") + today.getDate();
        this.state = {
          //loginData:(localStorage.getItem("LoginData")),
          loginData: (JSON.parse(localStorage.getItem('LoginData'))).user,
          date:date,
          file:"",
          fileList:"",
          checkifsc: true,
          checkPhone: true,
          bankname:[],
          bank_address:[],
          bank_contactNo:[],
          bank_ifsc:[],
          bank_data:[],
            BankStore:{
                "bankCode":(localStorage.getItem("bankdata")),
                "bank_name":"",
                "bank_address":"",
                "bank_contactNo":"",
                "bank_ifsc":"",
                // "file":"",
              },
              bankDetails:{},
              bankNames:"",
              bankAddress: "",
              bankContactNo:"",
              bankIfscs: "",
              bankLogo: "",
              updatebankDetails:false
            

        }
    }


    componentDidMount() {
         this.getFailureRecords()
      }
      
      getFailureRecords = (props) =>{
        debugger
       var bankCode =  this.state.BankStore.bankCode
       var token = (localStorage.getItem("tokendata"))

       const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token,
        }
        axios.get( applicationContextPath+`/getbankdetail?bankCode=${bankCode}`,{headers:headers})
        .then(response => {
          console.log("suborgDetailList",response.data)
          if (response.data.length > 0) {
            this.setState({ BankStore: response.data[0],bankAddress:response.data[0].bankAddress,bankNames:response.data[0].bankName,
              bankContactNo:response.data[0].bankContactNo,bankIfscs:response.data[0].bankIfsc, })   
          }
      }
      
      ).catch(error => {
          console.log(error);
      });
      
      }
      updatebankinfo =()=>{
        if(this.state.BankStore.bankCode===null||this.state.BankStore.bankCode===""||this.state.BankStore.bankCode===undefined)
          {
            Swal.fire("Please enter Bankcode");
            return
         }
         if (this.state.BankStore.bank_name===null||this.state.BankStore.bank_name===""||this.state.BankStore.bank_name===undefined)
         {
          Swal.fire("Please enter bank name");
          return
          }
          if(this.state.BankStore.bank_address===null||this.state.BankStore.bank_address===""||this.state.BankStore.bank_address===undefined)
          {
            Swal.fire("Please enter bank address");
          return
         }
         var phoneno = /^\d{10}$/;
          if(this.state.BankStore.bank_contactNo===null||this.state.BankStore.bank_contactNo===""||this.state.BankStore.bank_contactNo===undefined)
          {
            Swal.fire("Please enter contact no");
          return
         }else if(!this.state.BankStore.bank_contactNo.match(phoneno))
               {
                Swal.fire("Please enter Valid contact no");
                return
               }

          var reg = /[A-Z|a-z]{4}[0][a-zA-Z0-9]{6}$/;
          if(this.state.BankStore.bank_ifsc==null||this.state.BankStore.bank_ifsc===""||this.state.BankStore.bank_ifsc===undefined)
          {
            Swal.fire("Please enter bank IFSC code");
          return
         }else if (!this.state.BankStore.bank_ifsc.match(reg)) {
          Swal.fire("Invalid IFSC code");
          return 
        }
         
        if(this.state.fileList==null||this.state.fileList===""||this.state.fileList===undefined)
        {
          Swal.fire("Please Select image For Bank Logo");
        return
        
       }else{
        if (!this.state.fileList.name.match(/\.(jpg|jpeg|png|gif)$/)) {
         
          Swal.fire("Invalid Image Format For Bank Logo");
         return
        }
       }
        var saveapidata=this.state.BankStore;
        console.log(saveapidata)
        var bankCode =  (localStorage.getItem("bankdata"))
        var token = (localStorage.getItem("tokendata"))
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token,
          'bankCode': bankCode,
        }
          
        axios.post( applicationContextPath+'/updateBankMst',saveapidata,{headers})
        .then(response => {
          Swal.fire({
            title: 'Saved!',
            text: 'Your Data Saved Sucessfully.',
            icon: 'success',
          
          })
          this.getbankparameter()
          console.log("updatebankparameter",response.data)
         
      }
      
      ).catch(error => {
          console.log(error);
      });
         //this.setState({ updatebankDetails:true})
      }
    SaveBankMaster = async() =>{
        debugger
         const data = new FormData()
        var token = (localStorage.getItem("tokendata"))
        const headers = {
           'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token,
            //'bankCode': 'A1000',
           // 'branchcode': 'A1000-01',
            'currentdate':   this.state.date,
            'defaultlang': 'Eng',
            'currancy': 'INR',
            'userid': '101'
          }
         
          if(this.state.BankStore.bankCode===null||this.state.BankStore.bankCode===""||this.state.BankStore.bankCode===undefined)
          {
            Swal.fire("Please enter Bankcode");
            return
         }
        
         if (this.state.BankStore.bank_name===null||this.state.BankStore.bank_name===""||this.state.BankStore.bank_name===undefined)
         {
          Swal.fire("Please enter bank name");
          return
          }
          if(this.state.BankStore.bank_address===null||this.state.BankStore.bank_address===""||this.state.BankStore.bank_address===undefined)
          {
            Swal.fire("Please enter bank address");
          return
         }
         var phoneno = /^\d{10}$/;
          if(this.state.BankStore.bank_contactNo===null||this.state.BankStore.bank_contactNo===""||this.state.BankStore.bank_contactNo===undefined)
          {
            Swal.fire("Please enter contact no");
          return
         }else if(!this.state.BankStore.bank_contactNo.match(phoneno))
               {
                Swal.fire("Please enter Valid contact no");
                return
               }
              
          var reg = /[A-Z|a-z]{4}[0][a-zA-Z0-9]{6}$/;
          if(this.state.BankStore.bank_ifsc==null||this.state.BankStore.bank_ifsc===""||this.state.BankStore.bank_ifsc===undefined)
          {
            Swal.fire("Please enter bank IFSC code");
          return
         }else if (!this.state.BankStore.bank_ifsc.match(reg)) {
          Swal.fire("Invalid IFSC code");
          return 
        }
         
        if(this.state.fileList==null||this.state.fileList===""||this.state.fileList===undefined)
        {
          Swal.fire("Please Select image For Bank Logo");
        return
        
       }else{
        if (!this.state.fileList.name.match(/\.(jpg|jpeg|png|gif)$/)) {
         
          Swal.fire("Invalid Image Format For Bank Logo");
         return
        }
       }
          

         data.append('bankCode', this.state.BankStore.bankCode)
        data.append('file', this.state.fileList)
        data.append('bank_name',this.state.BankStore.bank_name);
        data.append('bank_address',this.state.BankStore.bank_address);
        data.append('bank_contactNo',this.state.BankStore.bank_contactNo);
        data.append('bank_ifsc',this.state.BankStore.bank_ifsc); 
       await this.props.dispatch(handleGetBankMasterData(data, headers))   
        this.getFailureRecords()
    //       this.setState({  
    //         BankStore:{
    //         bankCode:"",
    //             bank_name:"",
    //             bank_address:"",
    //             bank_contactNo:"",
    //             bank_ifsc:"",
    //             file:"",
    //             fileList:'',
    //         },
    //    }) 
    }
   
    handleChange= (e)=> {  
        var BankStore1 = this.state.BankStore
        BankStore1[e.target.id] = e.target.value
        this.setState({BankStore:BankStore1});  
        } 
        handleFileSelect = (e) =>{
            debugger
            const files = e.target.files[0] || e.dataTransfer.files[0];
            
            this.setState({fileList:files})
            }
            checkBankIfsc(){
                let bankifsc = document.getElementById('bank_ifsc').value
                var filter = /^[A-Za-z]{4}[0-9]{6,7}$/;
                if(!filter.test(bankifsc)){
                  document.getElementById('bank_ifsc').focus()
                  this.setState({checkifsc : false})
                  }else{
                    this.setState({checkifsc: true})
                  }
                }
                checkMobile() {
                    debugger
                      let phone = document.getElementById('bank_contactNo').value
                          if (phone.length > 10 || phone.length < 10 || phone==="") {
                            document.getElementById('bank_contactNo').focus()
                              this.setState({ checkPhone: false })
                          } else {
                              this.setState({ checkPhone: true })
                          }
                      
                  }
                  handleChange1= ()=> {  
                    debugger
                    document.getElementById('fileList').value = '';
                    this.setState({  
                      BankStore:{
                        "bank_code":"",
                        "bank_name":"",
                        "bank_address":"",
                        "bank_contactNo":"",
                        "bank_ifsc":"",
                        "file":"",
                        "fileList":"",
                        "bankLogo":""
                      },
                      bankLogo:"",
                      fileList:"",
                      file:"",
                  
                   })
                    } 
                
    render() {
        console.log("x1", this.state.bankAddress)
        
        return (
            <React.Fragment>
                <Universal />
                <section id="main-content">
        <section className="wrapper">
          <div className="row">
            <div className="col-lg-9 main-chart">
              <section className="dashboard-counts no-padding-bottom">
               {this.state.BankStore.length !== 0 ?
              
              <div className="container-fluid" style={{marginTop: '-1rem'}}>
                  <h1 style={{fontSize: '22px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid #e9ecef'}}>Bank Master </h1>
                  <div className="container-fluid">
                    <div className="row bg-blue  has-shadow mt-3" style={{borderRadius: '1rem'}}>
                    <div className="col-12 col-md-2 col-lg-2 rightCol" >
                  <p  style={{fontWeight:"bolder",fontSize:"15px",color:"white"}}>Bank Code <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" >
                  <div className="form-group">
                        <input type="text" id="bankCode" className="form-control inputField glowing-border" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                            placeholder="Enter Bank Code"  onChange={this.handleChange}  value={this.state.BankStore.bankCode!==""?this.state.BankStore.bankCode:""}  />
                        </div>
                  </div>
                  <div className="col-11  col-lg-2 rightCol">
                  <p style={{fontWeight:"bolder",color:"white",fontSize:"15px"}} className="">Bank Name <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" >
                  <div className="form-group">
                        <input type="text" id="bank_name" className="form-control inputField glowing-border" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }}
                            onChange={this.handleChange}  placeholder="Enter Bank Name"
                            value={this.state.BankStore.bank_name!==""?this.state.BankStore.bank_name:""} />
                        </div>
                  </div>
                  <div className="col-12 col-md-2 col-lg-2 rightCol">
                  <p style={{marginTop: '1rem',fontWeight:"bolder",color:"white",fontSize:"15px"}}> Bank Address <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" >
                  <div className="form-group" style={{marginTop: '1rem'}}>
                        <input type="text" id="bank_address" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                           placeholder="Enter Bank Address" onChange={this.handleChange}  value={this.state.BankStore.bank_address!==""?this.state.BankStore.bank_address:""}/>

                        </div>
                  </div>
                  <div className="col-11  col-lg-2 rightCol">
                  <p style={{marginTop: '1rem',fontWeight:"bolder",color:"white",fontSize:"14px"}} className="">Bank Mobile No <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" >
                  <div className="form-group" style={{marginTop: '1rem'}}>
                        <input type="text" id="bank_contactNo" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }}
                        placeholder="Enter Bank Contact No" onChange={this.handleChange}  value={this.state.BankStore.bank_contactNo!==""?this.state.BankStore.bank_contactNo:""}  required   />
                        
                        </div>
                  </div>

                  <div className="col-12 col-md-2 col-lg-2 rightCol">
                  <p style={{marginTop: '1rem',fontWeight:"bolder",color:"white",fontSize:"15px"}}> Bank IFSC <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4">
                  <div className="form-group" style={{marginTop: '1rem'}}>
                        <input type="text" id="bank_ifsc" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }}
                      placeholder="Enter Bank IFSC"  onChange={this.handleChange} onBlur={() => this.checkBankIfsc()} required  value={this.state.BankStore.bank_ifsc!==""?this.state.BankStore.bank_ifsc:""} />
                           {/* {this.state.checkifsc===true ?
                                        <span></span> : <span style={{ color: "red" }}>Please Enter Valid Bank IFSC Code</span>
                                    } */}
                        </div>
                  </div>
                
                  <div className="col-12 col-md-2 col-lg-2 rightCol">
                  <p style={{marginTop: '1rem',fontWeight:"bolder",color:"white",fontSize:"15px"}} className="">Bank Logo <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" >
                  <div className="form-group" style={{marginTop: '1rem'}}>
                        <input type="file"  id="fileList" className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(3em + 0.75rem + 2px)', marginRight: '1rem' }}
                                                                  onChange={(e) => this.handleFileSelect(e)} />
                        </div>
                  </div>
                 
                    
                      <div className="col-12 col-md-4" style={{marginTop: '0rem',marginLeft:'600px'}}>
                       
                       
                       
                        <div className="row pull-right">
                        <div className="pr-3">
                        <button type="button" className="btn btn-primary " style={{float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px'}} id="Reset" onClick={() => this.handleChange1()}
                                                                >Reset</button>
                                                                </div>
                                                                  <div className="pr-3">
                                                            
                                                                    {/* <button type="button" className="btn btn-primary " style={{float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px'}} onClick={() => this.SaveBankMaster()}>Save</button> */}
                                                                  </div>
                                                                  
                                                                  <div className="pr-3">
                                                                    <button type="button" className="btn btn-primary " style={{float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px'}} onClick={() => this.updatebankinfo()}
                                                                      >Save</button>
                                                                  </div>
                                                                </div>
                                                                <div className="col-lg-3 ds" style={{paddingLeft: 0, marginTop: '1rem'}}>
</div>
                      </div>
                    </div>
                  </div>
                </div>:""
              }
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

export default connect () (bank_master)

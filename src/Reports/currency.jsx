import React, { Component } from 'react'
import Universal from '../common/universal'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import axios from 'axios'
import {applicationContextPath} from '../common/api'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import { handleSaveCurrencyMaster,handleUpdateCurrencyMaster, handleGetCurrencyMasterList } from '../actions/currency';
 class currency extends Component {
    constructor(props){
        super(props)
        var today = new Date(),
        date = today.getFullYear() + '/'+(today.getMonth() < 10 ? "0" : "") + (today.getMonth() + 1) + '/'+(today.getDate() < 10 ? "0" : "") + today.getDate();
    
        this.state={
            date: date,
          currencyList:[],
          savebutton: true,
          updatebutton:false,
         currencydata:{
          "currencyCode":"",
            "currencyName":"",
            "majorUnit":"",
            "minorUnit":"",
            "conversionFactor":"",
            "decimalUnit":"",
          },
        }
  }
  componentDidMount() {
    this.getCurrencyData();
  }
  handleChange= (e)=> {  
    var currencydata1 = this.state.currencydata
    currencydata1[e.target.id] = e.target.value
    this.setState({currencydata:currencydata1});  
    }
    saveCurrency = async () =>{
        debugger
        var currencyData = this.state.currencydata;
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
       
        if((this.state.currencydata.currencyCode===null||this.state.currencydata.currencyCode===""||this.state.currencydata.currencyCode===undefined)||
        (this.state.currencydata.currencyName===null||this.state.currencydata.currencyName===""||this.state.currencydata.currencyName===undefined)||
        (this.state.currencydata.majorUnit===null||this.state.currencydata.majorUnit===""||this.state.currencydata.majorUnit===undefined)||
        (this.state.currencydata.minorUnit===null||this.state.currencydata.minorUnit===""||this.state.currencydata.minorUnit===undefined)||
        (this.state.currencydata.conversionFactor===null||this.state.currencydata.conversionFactor===""||this.state.currencydata.conversionFactor===undefined)||
        (this.state.currencydata.decimalUnit===null||this.state.currencydata.decimalUnit===""||this.state.currencydata.decimalUnit===undefined)
        ){
           Swal.fire("Please Fill the All Details");
         return
        }
        await this.props.dispatch(handleSaveCurrencyMaster(currencyData, headers))
         this.getCurrencyData();
          this.setState({  
            currencydata:{
              "currencyCode":"",
              "currencyName":"",
              "majorUnit":"",
              "minorUnit":"",
              "conversionFactor":"",
              "decimalUnit":"",
            
            },
    
       }) 
    }
    updateApi = async ()  =>{
        debugger
        var UpddateApiData= this.state.currencydata;
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
     
        await  this.props.dispatch(handleUpdateCurrencyMaster(UpddateApiData, headers))
          
        this.getCurrencyData();
          this.setState({  
           currencydata:{
            "currencyCode":"",
                "currencyName":"",
                "majorUnit":"",
                "minorUnit":"",
                "conversionFactor":"",
                "decimalUnit":"",
           },updatebutton:false,savebutton: true
         
        })
      }
    getCurrencyData=()=>{
        debugger 
         var token = (localStorage.getItem("tokendata"))
        var bankCode =localStorage.getItem("bankdata")
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token,
          }
        this.props.dispatch(handleGetCurrencyMasterList(bankCode,headers))
      
      }
    handleChange1= ()=> {  
        debugger
        this.setState({  
          currencydata:{
            "currencyCode":"",
                "currencyName":"",
                "majorUnit":"",
                "minorUnit":"",
                "conversionFactor":"",
                "decimalUnit":"",
           },updatebutton:false,savebutton: true
        
       })
        } 
        editApiData =(row,cell) =>  {
            debugger
            console.log("In Edit", row);
          this.setState({currencydata:cell,savebutton:false,updatebutton:true})
          }
          DeleteApi = (row,cell)  =>{
            debugger
           // var UpddateApiData= this.state.botapidata;
            var data = {}
            data.id = cell.id
            var token = (localStorage.getItem("tokendata"))
            const headers = {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+token,
              //'bankCode': bankcode,
            }
            axios.post(applicationContextPath+'/deleteCurrency',data,{headers})
            .then(response => {
                   this.getCurrencyData()
                   Swal.fire({
                    title: 'Deleted!',
                    text: 'Your Data Deleted Sucessfully.',
                    icon: 'success',
                    // showCancelButton: true,
                    // confirmButtonText: 'Yes',
                    // cancelButtonText: 'No'
                  })
           }
          ).catch(error => {
              console.log(error);
          });
          
          }
                  actionMethod =(row,cell)=> {
        debugger
                    return (
                        < React.Fragment>
                            <div >
                            <i class="fa fa-pencil-square-o"  title="Edit" style={{color:"blue"}} aria-hidden="true" onClick={() => this.editApiData(row,cell)} ></i>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <i class="fa fa-trash" aria-hidden="true" title="Delete" style={{color:"red"}} onClick={() => this.DeleteApi(row,cell)} ></i>
                            </div>
                          
                        </React.Fragment>
                    )
                }
    render() {
        console.log("currency",this.state.currencydata)
        return (
           
           <React.Fragment>
            <Universal/>
            <section id="main-content">
        <section className="wrapper">
          <div className="row">
            <div className="col-lg-9 main-chart">
              <section className="dashboard-counts no-padding-bottom">
               
                <div className="container-fluid" style={{marginTop: '-1rem'}}>
                  <h1 style={{fontSize: '22px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid #e9ecef'}}>Currency Master </h1>
                  <div className="container-fluid">
                    <div className="row bg-blue has-shadow mt-3" style={{borderRadius: '1rem', background: '#c9ccdf'}}>
                    <div className="col-12 col-md-2 col-lg-2 rightCol">
                  <p  style={{fontWeight:"bolder",color:"white",fontSize:"15px"}}>Currency Code &nbsp;<span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" >
                  <div className="form-group">
                        <input type="text"  id="currencyCode"  placeholder="Enter Currency Code" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                         onChange={this.handleChange} 
                         value={this.state.currencydata.currencyCode!==""?this.state.currencydata.currencyCode:""} />
                        </div>
                  </div>
                  <div className="col-11  col-lg-2 rightCol">
                  <p style={{fontWeight:"bolder",color:"white",fontSize:"14px"}} className="">Currency Name  <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" >
                  <div className="form-group">
                        <input type="text"  id="currencyName"  placeholder="Enter Currency Name" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                         onChange={this.handleChange}  value={this.state.currencydata.currencyName!==""?this.state.currencydata.currencyName:""} />
                        </div>
                  </div>
                  <div className="col-12 col-md-2 col-lg-2 rightCol">
                  <p style={{marginTop: '1rem',color:"white",fontWeight:"bolder",fontSize:"15px"}}> Major Unit &nbsp;<span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" >
                  <div className="form-group" style={{marginTop: '1rem'}}>
                        <input type="text"  id="majorUnit"  placeholder="Major Unit" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                           onChange={this.handleChange} value={this.state.currencydata.majorUnit!==""?this.state.currencydata.majorUnit:""} />
                        </div>
                  </div>
                  <div className="col-11  col-lg-2 rightCol">
                  <p style={{marginTop: '1rem',color:"white",fontWeight:"bolder",fontSize:"15px"}} className="">Minor Unit  &nbsp;<span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" >
                  <div className="form-group" style={{marginTop: '1rem'}}>
                        <input type="text"  id="minorUnit"  placeholder="Minor Unit" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                        onChange={this.handleChange}  value={this.state.currencydata.minorUnit!==""?this.state.currencydata.minorUnit:""} />
                        </div>
                  </div>

                  <div className="col-12 col-md-2 col-lg-2 rightCol">
                  <p style={{marginTop: '1rem',color:"white",fontWeight:"bolder",fontSize:"15px"}}> Major/Minor &nbsp;<span style={{ color: "red" }}>*</span> Conversion Factor</p>
                  </div>
                  <div className="col-12 col-md-4">
                  <div className="form-group" style={{marginTop: '1rem'}}>
                        <input type="text"  id="conversionFactor"  placeholder="Enter Conversion Factor" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                        onChange={this.handleChange}  value={this.state.currencydata.conversionFactor!==""?this.state.currencydata.conversionFactor:""} />
                        </div>
                  </div>
                
                  <div className="col-12 col-md-2 col-lg-2 rightCol">
                  <p style={{marginTop: '1rem',color:"white",fontWeight:"bolder",fontSize:"15px"}} className="">Decimal Unit &nbsp;<span style={{ color: "red" }}>*</span> </p>
                  </div>
                  <div className="col-12 col-md-4" >
                  <div className="form-group" style={{marginTop: '1rem'}}>
                        <input type="text"  id="decimalUnit"  placeholder="Decimal Unit" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                        onChange={this.handleChange}   value={this.state.currencydata.decimalUnit!==""?this.state.currencydata.decimalUnit:""} />
                        </div>
                  </div>
                    
                      
                  <div className="col-12 col-md-4" style={{marginTop: '-2rem',marginLeft:'600px'}}>
                       
                        
                       
                       
                        <div className="row pull-right">
                       
                          <div className="pr-3">
                            <button type="button" className="btn btn-primary " style={{float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px'}} onClick={() => this.handleChange1()}>Reset</button>
                          </div>
                          {this.state.savebutton===true ?
                          <div className="pr-3">
                            <button type="button" className="btn btn-primary " style={{float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px'}} onClick={() => this.saveCurrency()}>Save</button>
                          </div>:""}
                          {this.state.updatebutton===true ?
                          <div className="pr-3">
                            <button type="button" className="btn btn-primary " style={{float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px'}} onClick={() => this.updateApi()}
                           >Update</button>
                          </div>:""}

                                                                </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row has-shadow mt-3" style={{borderRadius: '1rem',width:'94%',marginLeft:'3%', backgroundColor: 'white', marginTop: '5rem'}}>
               
                               <div className="col-xs-12">
                               <div className="box">
                               <div className="box-body  no-LR-padding expandcontentscell">
                               <BootstrapTable striped hover
                       data={this.props.currencylistsL}
                       pagination={true}
                       // search
                        ClearSearchButton
                      // exportCSV
                      >
                        <TableHeaderColumn dataField="currencyCode" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                          expandable={false} editable={false} > Code</TableHeaderColumn>
                        <TableHeaderColumn dataField="currencyName" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                          expandable={false} editable={false} >Currency</TableHeaderColumn>
                        <TableHeaderColumn dataField="majorUnit" csvHeader="First Name" isKey={true} className={"columnHeaderColor"}
                          expandable={false} editable={false} >Major Unit</TableHeaderColumn>
                              <TableHeaderColumn dataField="minorUnit" csvHeader="First Name" className={"columnHeaderColor"}
                          expandable={false} editable={false} >Minor Unit Factor</TableHeaderColumn>

                            <TableHeaderColumn dataField="conversionFactor" csvHeader="First Name" className={"columnHeaderColor"}
                          expandable={false} editable={false} >Conversion Factor</TableHeaderColumn>
                        <TableHeaderColumn dataFormat={this.actionMethod} dataField='id' expandable={false} editable={false}  > Action</TableHeaderColumn>
                      </BootstrapTable>
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
const mapStateToProps = (state) =>{
    
     const {currencymasterList} = state.currencylist
     console.log("currencymasterList", currencymasterList)
    return {
       currencylistsL:currencymasterList
       }
  }
export default connect(mapStateToProps) (currency)

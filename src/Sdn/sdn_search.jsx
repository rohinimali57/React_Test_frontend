import React, { Component } from 'react'
import Universal from '../common/universal'
import 'react-tabs/style/react-tabs.css';
import Swal from 'sweetalert2'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import { handleSdnSearch } from '../actions/sdnsearch'
import { connect } from 'react-redux'

 class sdn_search extends Component {
  constructor(props){
    super(props)

    this.state={
     getApiData:[],
     botapidata:{
      "id":"",
        "firstName":"",
        "country":"",
        "city":"",
        "state":"",
        "address":"",
        "Profesion":"",
        "list":"",
       // token: (localStorage.getItem("tokendata"))
      },
    }
}

  componentDidMount() {
   // this.getApiData();
   
  }
  handleChange= (e)=> {  
    var botapidata1 = this.state.botapidata
    botapidata1[e.target.id] = e.target.value
    this.setState({botapidata:botapidata1});  
    }

    handleChange1= ()=> {  
      debugger
      this.setState({  
        botapidata:{
          "firstName":"",
          "country":"",
          "city":"",
          "state":"",
          "address":"",
          "Profesion":""
          // "list":"",
         // token: (localStorage.getItem("tokendata"))
        },
    
     })
      } 
  
    onReset=()=>{
      this.setState({
        botapidata:{
          id:"",
         firstName:"",
         country:"",
         city:"",
         state:"",
         address:"",
         Profesion:"",
         list:""
        }
      })
     
    }
           saveStateMaster = ()  => {
            debugger
            var name = this.state.botapidata;
            //var bankcode = (localStorage.getItem("bankdata"))
            var token = (localStorage.getItem("tokendata"))
        
            const headers = {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+token,
              
            }
            var saveapidata=this.state.botapidata;
            if((this.state.botapidata.firstName==null||this.state.botapidata.firstName==""||this.state.botapidata.firstName==undefined)||
            (this.state.botapidata.country==null||this.state.botapidata.country==""||this.state.botapidata.country==undefined))
            {
               Swal.fire("Please Fill the All Details");
             return
            }
        
            // window.swal({
            //   title: "Checking...",
            //   text: "Please wait",   
            //   imageUrl: "images/page_loader1.gif",
            //   showConfirmButton: false,
            //   allowOutsideClick: false, 
             
            // });
            // setTimeout(() => {
            //   window.swal({
            //     title: "Finished!",
            //     type: 'success',
            //     showConfirmButton: false,
            //     timer: 1000,
                
            //   });
            // }, 1000);
          this.props.dispatch(handleSdnSearch(name,headers))
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
              <h1 style={{fontSize: '22px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid #e9ecef'}}>SDN Search</h1>
              <div className="container-fluid">
                <div className="row bg-blue has-shadow mt-3" style={{borderRadius: '1rem'}}>
                  <div className="col-12 col-md-2 col-lg-2 rightCol">
                    <p  style={{color:"white",fontWeight:"bolder",fontSize:"15px"}}>Type<span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" >
                    <div className="form-group">
                    <select className="form-control" id="Profesion" onChange={this.handleChange} className="form-select form-select-sm minimal heightForm"  style={{width: '100%',height:"auto"}}
                                                         value={this.state.botapidata.Profesion!=""?this.state.botapidata.Profesion:""}>
                                                        <option value="">Select Type</option>
                                                        <option value="Individual">Individual</option>
                                                        <option value="Corporate  ">Corporate</option>
                                                       
                                                     </select>                    </div>
                  </div>

                  <div className="col-11  col-lg-2 rightCol">
                    <p style={{color:"white",fontWeight:"bolder",fontSize:"15px"}} className="">City<span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" >
                    <div className="form-group">
                    <input type="text"   id="city" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                    title="Header Color"  
                    placeholder="city" onChange={this.handleChange}
                    value={this.state.botapidata.city!=""?this.state.botapidata.city:""}    />
                    </div>
                     </div>
                     
                    <div className="col-11  col-lg-2 rightCol">
                    <p style={{marginTop: '1rem',color:"white",fontWeight:"bolder",fontSize:"15px"}} className="">Name<span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '1rem'}}>
                    <div className="form-group">
                    <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                    id="firstName" title="Header Color" 
                    placeholder="Name" onChange={this.handleChange}
                    value={this.state.botapidata.firstName!=""?this.state.botapidata.firstName:""} />
                    </div>
                    </div>

                    <div className="col-11  col-lg-2 rightCol">
                    <p style={{marginTop: '1rem',color:"white",fontWeight:"bolder",fontSize:"15px"}} className="">State<span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '1rem'}}>
                    <div className="form-group">
                    <input type="text"   id="state" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                    title="Header Color" 
                    placeholder="state" onChange={this.handleChange}
                    value={this.state.botapidata.state!=""?this.state.botapidata.state:""}/>
                    </div>
                    </div>

                    <div className="col-11  col-lg-2 rightCol">
                    <p style={{marginTop: '1rem',color:"white",fontWeight:"bolder",fontSize:"15px"}} className="">ID<span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '1rem'}}>
                    <div className="form-group">
                    <input type="text"   id="id" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                    title="Header Color"  
                    placeholder="ID" onChange={this.handleChange}
                    value={this.state.botapidata.id!=""?this.state.botapidata.id:""} />
                    </div>
                    </div>

                    <div className="col-11  col-lg-2 rightCol">
                    <p style={{marginTop: '1rem',color:"white",fontWeight:"bolder",fontSize:"15px"}} className="">Country<span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '1rem'}}>
                    <div className="form-group">
                    <select className="form-control select2 " id="country"
                                                        onChange={this.handleChange}className="form-select form-select-sm minimal heightForm"  style={{width: '100%',height:"auto"}}
                                                        value={this.state.botapidata.country!=""?this.state.botapidata.country:""}>
                                                        <option value="">Select Country</option>
                                                        <option value="CUBA">CUBA</option>
                                                        </select>
                    </div>
                    </div>

                    <div className="col-11  col-lg-2 rightCol">
                    <p style={{marginTop: '1rem',color:"white",fontWeight:"bolder",fontSize:"15px"}} className="">Address<span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '1rem'}}>
                    <div className="form-group">
                    <textarea  id="address" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                   title="Header Color"   
                   placeholder="Address" onChange={this.handleChange}
                   value={this.state.botapidata.address!=""?this.state.botapidata.address:""} />
                    </div>
                    </div>

                    <div className="col-11  col-lg-2 rightCol">
                    <p style={{marginTop: '1rem',color:"white",fontWeight:"bolder",fontSize:"15px"}} className="">List <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '1rem'}}>
                    <div className="form-group">
                    <select className="form-control select2 " id="list"
                                                        onChange={this.handleChange} className="form-select form-select-sm minimal heightForm"  style={{width: '100%',height:"auto"}}
                                                        value={this.state.botapidata.list!=""?this.state.botapidata.list:""}>
                                                        

                                                        <option value="All">All</option>
                                                        <option value="Dow Jones">Dow Jones</option>
                                                        <option value="Worldcheck">Worldcheck</option>
                                                        <option value="OFAC">OFAC</option>
                                                        <option value="Internal">Internal</option>

                                                        </select>
                    </div>
                    </div>

                    {/* <div className="col-11  col-lg-2 rightCol">
                    <p style={{marginTop: '1.8rem',fontWeight:"bolder",fontSize:"15px"}} className="">Acquirer Bank Name<span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '2rem'}}>
                    <div className="form-group">
                    <input type="text"   id="assignedUser" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                    onChange={this.handleChange} />
                    </div>
                    </div>

                    <div className="col-11  col-lg-2 rightCol">
                    <p style={{marginTop: '1.8rem',fontWeight:"bolder",fontSize:"15px"}} className="">Detection Source<span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '2rem'}}>
                    <div className="form-group">
                    <input type="text"   id="assignedUser" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                    onChange={this.handleChange}  />
                    </div>
                    </div> */}
                    
                    <div className="col-11  col-lg-2 rightCol">
                    <p style={{marginTop: '1rem',color:"white",fontWeight:"bolder",fontSize:"15px"}} className=""> Minimum name score</p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '1rem'}}>
                    <div className="form-group">
                    <input type="range" min="1" max="100" value="50" class="slider" id="myRange"/>
                    </div>
                    </div>

                   
                    
                    
                   
                   
                    <div className="row pull-right" style={{marginLeft: '41rem',marginTop: '-5rem'}}>
                                                               
                                                            
                                                              <div className="pr-3">

                                                                <button type="button" id="Save" className="btn btn-primary " style={{float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px'}} onClick={() => this.onReset()} >Reset</button>

                                                               {/* <button type="button" id="Save" className="btn btn-primary " style={{float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px'}} onClick={() => this.handleChange1()}>Reset</button> */}

                                                              </div>
                                                              <div className="pr-3" >
                                                             
                                                             <button type="button" className="btn btn-primary " style={{float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px'}} id="Save" onClick={() => this.saveStateMaster()}
                                                             >Search</button>
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
                        data={this.props.sdnlists}
                        pagination={true}
                       // search
                        ClearSearchButton
                        //exportCSV
                        
                    //    trClassName={this.rowClassNameFormat}
                    >
                        
                        <TableHeaderColumn dataField="firstName" csvHeader="First Name" isKey={true} className={"columnHeaderColor"}
                        expandable={false}  editable={false} width="50px">Name</TableHeaderColumn>

                        <TableHeaderColumn  dataField="address" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                        expandable={false} editable={false}   width="70px">Address</TableHeaderColumn>

                    <TableHeaderColumn  dataField="country" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                        expandable={false} editable={false}   width="60px">Type</TableHeaderColumn>
                        
                        <TableHeaderColumn  dataField="profesion" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                        expandable={false} editable={false}   width="60px">List</TableHeaderColumn>

                        <TableHeaderColumn dataFormat={this.score} dataField="Edit" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                        expandable={false} editable={false} width="30px">Score</TableHeaderColumn>
                        

                    </BootstrapTable>
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

const mapStateToProps = (state) => {
  debugger
  const {sdnsearchList} = state.sdnlist
  
  console.log("sdnsearchList", sdnsearchList)
  return {
   sdnlists: sdnsearchList
   
  }
}
export default connect(mapStateToProps)(sdn_search)
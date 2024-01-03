import React, { Component } from 'react'
import Universal from '../common/universal'
import 'react-tabs/style/react-tabs.css';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import axios from 'axios'
import {applicationContextPath} from '../common/api'

 class travel_log extends Component {
    constructor(props){
        super(props)

        this.state={
         getApiData:[],
         botapidata:{
            "fromdate":"",
            "todate":"",
            "country":"",
          },
        }        
  }

  componentDidMount() {
    this.getApiData();
   
  }
  getApiData=(urlQuery)=>{
    debugger
    var getapidata =[];
    getapidata.fromdate=this.state.botapidata.fromdate
    getapidata.todate=this.state.botapidata.todate
    getapidata.country=this.state.botapidata.country
    var token = (localStorage.getItem("tokendata"))
    var bankCode =localStorage.getItem("bankdata")
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token,
      }
    // document.getElementById("loader-wrapper").style.visibility = "visible";
    axios.get(applicationContextPath+`/getTravelLogByBankCode?bankCode=${bankCode}`,{headers})
  .then(response => {
    // document.getElementById("loader-wrapper").style.visibility = "hidden";

    console.log(response.data)
    this.setState({getApiData:response.data})
    console.log("data---",this.state.getApiData)
  }

).catch(error => {
    console.log(error);
});

} 


  handleChange= (e)=> {  
    var botapidata1 = this.state.botapidata
    botapidata1[e.target.id] = e.target.value
    this.setState({botapidata:botapidata1});  
    } 
   
render() {
  console.log("x1",this.state.getApiData)
    return (
  
            <React.Fragment>
            <Universal/>
            <section id="main-content">
    <section className="wrapper">
      <div className="row">
        <div className="col-lg-9 main-chart">
          <section className="dashboard-counts no-padding-bottom">
           
            <div className="container-fluid" style={{marginTop: '-1rem'}}>
              <h1 style={{fontSize: '22px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid #e9ecef'}}>Travel Log</h1>
              <div className="container-fluid">
                <div className="row bg-blue has-shadow mt-3" style={{borderRadius: '1rem'}}>
                  <div className="col-12 col-md-2 col-lg-2 rightCol">
                    <p  style={{fontWeight:"bolder",color:"white",fontSize:"15px"}}>From Date<span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" >
                    <div className="form-group">
                    <input type="date"  id="fromdate" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                   onChange={this.handleChange}/>                   
                    </div>
                  </div>

                  <div className="col-11  col-lg-2 rightCol">
                    <p style={{fontWeight:"bolder",color:"white",fontSize:"15px"}} className="">To Date<span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" >
                    <div className="form-group">
                    <input type="date"  id="todate" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                   onChange={this.handleChange}/>  
                    </div>
                     </div>
                     
                    <div className="col-11  col-lg-2 rightCol">
                    <p style={{marginTop: '1rem',fontWeight:"bolder",color:"white",fontSize:"15px"}} className="">Country<span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '1rem'}}>
                    <div className="form-group">
                    <select className="form-control select2" id="country"onChange={this.handleChange} ClassName="form-select form-select-sm minimal heightForm"  style={{width: '100%',height:"auto"}}>
                                    <option value="All">All</option>
                                    <option value="South Africa">South Africa</option>
                                     <option value="London">London</option>
                                     <option value="New York">New York</option>
                                     <option value="Japan">Japan</option>
                                     <option value="Austria">Austria</option>
                                </select>
                    </div>
                    </div>

   
                    <div className="row pull-right" style={{marginLeft: '47.8rem',marginTop:'-4rem'}}>
                                                               
                                                            
                                                              <div className="pr-3">
                            <button type="button"  onClick={() => this.getApiData()} className="btn btn-primary " style={{float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px'}} >View</button>
                          </div>
                                                            </div>
                  </div>
                </div>
              </div>
              <div className="row has-shadow mt-3" style={{borderRadius: '1rem', width:'94%',marginLeft:'3%',backgroundColor: 'white', marginTop: '5rem'}}>
            
                           <div className="col-xs-12">
                           <div className="box">
                           <div className="box-body  no-LR-padding expandcontentscell">
                           <BootstrapTable striped hover
                     data={this.state.getApiData}
                    pagination={true}
                   // search
                    ClearSearchButton
                  // exportCSV
                  >
                    <TableHeaderColumn dataField="customerNo"   csvHeader="Last Name" isKey={true} className={"columnHeaderColor"} dataSort={true}
                      expandable={false} editable={false} >Customer Id</TableHeaderColumn>
                    <TableHeaderColumn dataField="customerName"   csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                      expandable={false} editable={false} >Customer Name</TableHeaderColumn>
                       <TableHeaderColumn dataField="travelLocation"  csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                      expandable={false} editable={false} >Location/Country Travelled</TableHeaderColumn>
                       <TableHeaderColumn dataField="travelDateFrom"  csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                      expandable={false} editable={false} >From Date</TableHeaderColumn>
                       <TableHeaderColumn dataField="travelDateTo"  csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                      expandable={false} editable={false} >To Date</TableHeaderColumn>
                      
                      <TableHeaderColumn dataField="Role-Name" csvHeader="First Name" className={"columnHeaderColor"}
                                        expandable={false}  editable={false} width="1px"></TableHeaderColumn>
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

export default travel_log

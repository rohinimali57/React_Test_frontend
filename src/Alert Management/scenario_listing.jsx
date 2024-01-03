import React, { Component } from 'react'
import Universal from '../common/universal'
import axios from 'axios'
import {applicationContextPath} from '../common/api'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

class scenario_listing extends Component {
    constructor(props){
        super(props)

        this.state={
         getApiData:[],
        }
  }

  componentDidMount() {
    this.getApiData();
   
  }

  getApiData=()=>{
    debugger
    var token = localStorage.getItem("tokendata")
     var bankCode= localStorage.getItem("bankdata")


      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token,
        }
    // document.getElementById("loader-wrapper").style.visibility = "visible";
    axios.get(applicationContextPath+`/getBaseRules?bankCode=${bankCode}`,{headers})
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

gotoScenario=()=>{
    var uidata = {}
    uidata.uirule = "UI"
    this.props.history.push('/scenario_add',uidata);

  }

  Modify = (cell) => { 
 
    this.props.history.push('/scenario_add',cell);

}
Modify1 = (cell) => { 
  this.props.history.push('/treshold_Based_Rule',cell);

}

action = (row,cell) =>{ 
    debugger
  return(
  cell.type=="UI" ?
  <div className='expandcontents' style={{cursor:'pointer',color:'blue'}} onClick={()=>this.Modify(cell)}>
      Modify
  </div>:
   <div className='expandcontents' style={{cursor:'pointer',color:'blue'}} onClick={()=>this.Modify1(cell)}>
    Modify
  </div>
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
                  <h1 style={{fontSize: '22px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid #e9ecef'}}>Scenario Listing</h1>
                  <div className="container-fluid">

                <div className="form-group col-md-3 min-height80">
                                                   <label htmlFor="marginColor" ></label>
                                                   {/* <button type="button" id="Save"  style={{borderColor: '#303974', backgroundColor: '#303974', fontSize: '15px',marginLeft:35}}  className="btn btn-primary " onClick={() => this.Save()}>Save</button> */}

                                                   <button type="button" id="Save"  onClick={() => this.gotoScenario()}  style={{borderColor: '#303974', backgroundColor: '#303974', fontSize: '15px',marginLeft:-40}}
                                                       className="btn btn-primary "><i class="fa fa-plus" aria-hidden="true"/></button>
                                    <label htmlFor="marginColor" ></label>

                                               </div> 
                                               
                                               <div className="row has-shadow mt-3" style={{borderRadius: '1rem', backgroundColor: 'white',width: '145%',marginLeft: '-5%' ,marginTop: '5rem'}}>
            <section className="content">
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
                      <TableHeaderColumn dataField="id" csvHeader="First Name" isKey={true} className={"columnHeaderColor"}
                                     expandable={false}  editable={false} width="20px">ID</TableHeaderColumn>
             
                                     <TableHeaderColumn dataFormat={this.description} dataField="scenarioDescription" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                                     expandable={false} editable={false}   width="100px">Scenario Description</TableHeaderColumn>

                                        <TableHeaderColumn  dataField="type" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                                     expandable={false} editable={false} width="50px">Type</TableHeaderColumn>

                                    <TableHeaderColumn  dataField="customer" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                                     expandable={false} editable={false} width="50px">Customer</TableHeaderColumn>
                     
                                    <TableHeaderColumn  dataField="sevrity" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                                     expandable={false} editable={false} width="50px">Severity</TableHeaderColumn>
                     
                                     <TableHeaderColumn  dataField="status" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                                     expandable={false} editable={false} width="50px">Status</TableHeaderColumn>
                     
                     
                                   <TableHeaderColumn dataFormat={this.action}  dataField="Edit" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                                     expandable={false} editable={false} width="25px">Action</TableHeaderColumn>
                      </BootstrapTable>
                               </div>
                               </div>
                                   </div>
                               </section>
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

export default scenario_listing

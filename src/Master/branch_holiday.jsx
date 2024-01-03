import React, { Component } from 'react'
import Universal from '../common/universal'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import { handleGetBranchByBankCode } from '../actions/branchMaster'
import { handleSaveBranchHoliday , handleGetHolidayList } from '../actions/holiday';

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
 class branch_holiday extends Component {
    constructor(props){
        super(props)

        this.state={
            savebutton: true,
            holidaylistbycode:[
              {
                "branchCode": "BR001",
                "holidayCode": "HOL001",
                "holidayDate": "2023-12-25",
                "holidayDesc": "Christmas",
                "id": 1
              },
              {
                "branchCode": "BR002",
                "holidayCode": "HOL002",
                "holidayDate": "2023-11-26",
                "holidayDesc": "Thanksgiving",
                "id": 2
              },
              {
                "branchCode": "BR003",
                "holidayCode": "HOL003",
                "holidayDate": "2023-07-04",
                "holidayDesc": "Independence Day",
                "id": 3
              }
                        ],
            currencyList:[],
       
         holidaydata:{
          // "bankCode":(localStorage.getItem("bankdata")),
            "branchCode":"",
            "holidayCode":"",
            "holidayDate":"",
            "holidayDesc":"", 
          },
          
          
          
      
        } 

  }
  handleChange= (e)=> {  
      debugger
    var token = (localStorage.getItem("tokendata"))
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token,
        }
    var holidaydata1 = this.state.holidaydata
    holidaydata1[e.target.id] = e.target.value
    this.setState({holidaydata:holidaydata1});  
    this.props.dispatch(handleGetHolidayList(e.target.value,headers))


    }
    handleClear = () => {
        debugger
        this.setState({
          holidaydata: {
            "branchCode":"",
            "holidayCode":"",
            "holidayDate":"",
            "holidayDesc":"", 
          }, 
    
        })
      }
      componentDidMount() {
        this.getholidaydata();
        var token = (localStorage.getItem("tokendata"))
        var bankCode =localStorage.getItem("bankdata")
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token,
          }
        this.props.dispatch(handleGetBranchByBankCode(bankCode,headers))
      // this.props.dispatch(handleGetHolidayList(this.state.holidaydata.branchCode))
      
    }
    saveHoliday = async () =>{
        debugger
        var holidayData = this.state.holidaydata;
        var bankcode=(localStorage.getItem("bankdata"))
        var token = (localStorage.getItem("tokendata"))
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token,
          'bankCode': bankcode,
         //'branchcode': 'A1000-01',
          'currentdate': "2020/09/02",
          'defaultlang': 'Eng',
          'currancy': 'INR',
          'userid': '101'
        }

        if((this.state.holidaydata.branchCode===null||this.state.holidaydata.branchCode===""||this.state.holidaydata.branchCode===undefined)||
        (this.state.holidaydata.holidayCode===null||this.state.holidaydata.holidayCode===""||this.state.holidaydata.holidayCode===undefined)||
        (this.state.holidaydata.holidayDate===null||this.state.holidaydata.holidayDate===""||this.state.holidaydata.holidayDate===undefined)||
        (this.state.holidaydata.holidayDesc===null||this.state.holidaydata.holidayDesc===""||this.state.holidaydata.holidayDesc===undefined)        ){
           Swal.fire("Please Fill the All Details");
         return
        }
        const date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        if (month < 10) {
          month = "0" + month;
        }
        if (day < 10) {
          day = "0" + day;
        }
        let currentDate = `${year}-${month}-${day}`;
        console.log(currentDate);
        console.log(this.state.holidaydata.holidayDate)
        if(this.state.holidaydata.holidayDate<currentDate){
          Swal.fire("Date Should Not be Past");
          return
        }
        
      await  this.props.dispatch(handleSaveBranchHoliday(holidayData, headers))
       // this.props.dispatch(handleGetHolidayList(this.state.holidaydata.branchCode,headers))
       this.getholidaydata()
          this.setState({  
            holidaydata:{
                "branchCode":"",
                "holidayCode":"",
                "holidayDate":"",
                "holidayDesc":"",
            },
    
       }) 
    }

    editApiData = (row, cell) => {
        debugger
        console.log("In Edit", row);
        this.setState({ holidaydata: cell, savebutton: true, updatebutton: false })
      }
    
    
    getholidaydata=(cell)=>{
debugger
     var branchCode=this.state.holidaydata.branchCode
     var token = (localStorage.getItem("tokendata"))

     const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token,
      //'bankCode': bankcode,
    
    }
      this.props.dispatch(handleGetHolidayList(branchCode,headers))
      }

  actionMethod = (row,cell) => {

    return (
        < React.Fragment>
        <div >
            <i class="fa fa-edit" aria-hidden="true" title="Edit" style={{color:"blue"}} onClick={() => this.editApiData(row,cell)} ></i>
            &nbsp;&nbsp;
             {/* <i class="fa fa-trash" aria-hidden="true" title="Delete" style={{color:"red"}} onClick={() => this.DeleteApi(row,cell)} ></i> */}
                       </div>
           
        </React.Fragment>
    )
}
    render() {
        console.log("hoiday",this.state.holidaydata)
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
              <h1 style={{fontSize: '22px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid #e9ecef'}}>Holiday Master </h1>
              <div className="container-fluid">
                <div className="row bg-blue has-shadow mt-3" style={{borderRadius: '1rem'}}>
                  <div className="col-12 col-md-2 col-lg-2 rightCol">
                    <p  style={{color:"white",fontWeight:"bolder",fontSize:"15px"}}>Branch Code <span style={{ color: "red" }}>*</span> </p>
                  </div>
                  <div className="col-12 col-md-4" >
                    <div className="form-group">
                    <select id="branchCode" className="form-select form-select-sm minimal heightForm"  style={{width: '100%',height:"30px"}}
                      onChange={this.handleChange} value={this.state.holidaydata.branchCode!==""?this.state.holidaydata.branchCode:""}   >
                           <option value=""> Select Branch Code </option>
                             {Branchoptions}
                          </select>
                    </div>
                  </div>
                  <div className="col-11  col-lg-2 rightCol">
                    <p style={{fontWeight:"bolder",color:"white",fontSize:"15px"}} className="">Holiday Code <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="form-group">
                    <input type="text"  id="holidayCode" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                    placeholder="Enter Holiday Code"             onChange={this.handleChange}
                    value={this.state.holidaydata.holidayCode!==""?this.state.holidaydata.holidayCode:""}  />
                    </div>
                  </div>
                  <div className="col-12 col-md-2 col-lg-2 rightCol">
                    <p  style={{marginTop: '1rem',fontWeight:"bolder",color:"white",fontSize:"15px"}}>Holiday Date <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '1rem'}}>
                    <div className="form-group">
                    <input type="date"  id="holidayDate" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                  onChange={this.handleChange} value={this.state.holidaydata.holidayDate!==""?this.state.holidaydata.holidayDate:""}
                      />
                    </div>
                  </div>
                  <div className="col-11  col-lg-2 rightCol">
                    <p style={{marginTop: '1rem',fontWeight:"bolder",color:"white",fontSize:"15px"}} className="">Holiday Reason <span style={{ color: "red" }}>*</span></p>
                  </div>
                  <div className="col-12 col-md-4" style={{marginTop: '1rem'}}>
                    <div className="form-group">
                    <input type="text"  id="holidayDesc" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} 
                     placeholder="Enter Holiday Reason"  onChange={this.handleChange} value={this.state.holidaydata.holidayDesc!==""?this.state.holidaydata.holidayDesc:""} />
                    </div>
                    
                    <div className="row pull-right" style={{marginRight:'-28px'}}>    
                        
                                <div className="pr-3">
                                    <button type="button" className="btn btn-primary " style={{float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px'}} onClick={() => this.handleClear()}>Reset</button>
                                  </div>
                                  <div className="pr-3">
                            <button type="button" className="btn btn-primary " style={{float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px'}} onClick={() => this.saveHoliday()} >Save</button>
                             </div>
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
                   data={this.props.holidaylistbycode}
                   pagination={true}
                   // search
                    ClearSearchButton
                  // exportCSV
                  >
                    <TableHeaderColumn dataField="branchCode" csvHeader="Last Name" isKey={true} className={"columnHeaderColor"} dataSort={true}
                      expandable={false} editable={false} >Branch</TableHeaderColumn>
                    
                    <TableHeaderColumn dataField="holidayCode" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                      expandable={false} editable={false} >Holiday Code</TableHeaderColumn>

                    <TableHeaderColumn dataField="holidayDate" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                      expandable={false} editable={false} >Holiday Date</TableHeaderColumn>

                    

                    <TableHeaderColumn dataField="holidayDesc" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                      expandable={false} editable={false} >Description</TableHeaderColumn>
                   
                    <TableHeaderColumn dataFormat={this.actionMethod} dataField='id' expandable={false} editable={false}  > Action</TableHeaderColumn>
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
    const { branchlistbybankcode } = state.branchlist
    const { holidaylistbycode } = state.holidaylist
    console.log("gauravvvv", branchlistbybankcode)
    return {
      branchlistbybankcode,
      holidaylistbycode
    }
  }
export default connect(mapStateToProps)(branch_holiday)

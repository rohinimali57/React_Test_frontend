import React, { Component } from 'react'
import Universal from '../common/universal'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Swal from 'sweetalert2'
import { connect } from 'react-redux'
import { handlesaveBannedMaterialMaster, handleGetBanMaterialByBankCode, handleupdateBanMaterialMst, handleDeleteBanMaterialMst } from '../actions/bannedMaterial';

class banned_material_master extends Component {
  constructor(props) {
    super(props)
    var today = new Date(),
      date = today.getFullYear() + '/' + (today.getMonth() < 10 ? "0" : "") + (today.getMonth() + 1) + '/' + (today.getDate() < 10 ? "0" : "") + today.getDate();

    this.state = {
      getApiData: [],
      savebutton: true,
      updatebutton: false,
      date: date,
      botapidata: {
        "materialcode": "",
        "materialname": "",
        "fromdate": "",
        "tilldate": ""
      },
      currentPage: 1,
      pageSize: 10,
      totalPages: 1
    }

  }
  componentDidMount() {
    this.getbannedmaterial();

  }


  handleChange1 = () => {
    debugger
    this.setState({
      botapidata: {
        "materialcode": "",
        "materialname": "",
        "fromdate": "",
        "tilldate": ""
      },

    })
  }

  saveMaterialMaster = async () => {
    debugger
    var BanmaterialData = {}
    BanmaterialData.materialcode = this.state.botapidata.materialcode
    BanmaterialData.materialname = this.state.botapidata.materialname
    BanmaterialData.fromdate = this.state.botapidata.fromdate
    BanmaterialData.tilldate = this.state.botapidata.tilldate
    var bankcode = (localStorage.getItem("bankdata"))
    var token = (localStorage.getItem("tokendata"))

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
      'bankCode': bankcode,
      //'branchcode': 'A1000-01',
      // 'currentdate': this.state.date,
      // 'defaultlang': 'Eng',
      // 'currancy': 'INR',
      // 'userid': '101'
    }


    if (this.state.botapidata.materialcode == null || this.state.botapidata.materialcode == "" || this.state.botapidata.materialcode == undefined) {
      Swal.fire("please enter Material code");
      return
    }
    if (this.state.botapidata.materialname == null || this.state.botapidata.materialname == "" || this.state.botapidata.materialname == undefined) {
      Swal.fire("Please enter Material name");
      return
    }
    if (this.state.botapidata.fromdate == null || this.state.botapidata.fromdate == "" || this.state.botapidata.fromdate == undefined) {
      Swal.fire("Please Select Start Date ");
      return
    }
    if (this.state.botapidata.tilldate == null || this.state.botapidata.tilldate == "" || this.state.botapidata.tilldate == undefined) {
      Swal.fire("Please Select End Date");
      return
    }
    await this.props.dispatch(handlesaveBannedMaterialMaster(BanmaterialData, headers))
    this.getbannedmaterial()
    this.setState({
      botapidata: {
        "materialcode": "",
        "materialname": "",
        "fromdate": "",
        "tilldate": ""
      },
    })
  }
  getbannedmaterial = () => {
    debugger
    var token = (localStorage.getItem("tokendata"))
    var bankCode = localStorage.getItem("bankdata")
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,

    }
    this.props.dispatch(handleGetBanMaterialByBankCode(bankCode, headers));

  }
  updateBanMaterial = async () => {
    debugger
    var UpddateMaterialData = this.state.botapidata;
    var bankcode = (localStorage.getItem("bankdata"))
    var token = (localStorage.getItem("tokendata"))

    if (this.state.botapidata.materialcode == null || this.state.botapidata.materialcode == "" || this.state.botapidata.materialcode == undefined) {
      Swal.fire("please enter Material code");
      return
    }
    if (this.state.botapidata.materialname == null || this.state.botapidata.materialname == "" || this.state.botapidata.materialname == undefined) {
      Swal.fire("Please enter Material name");
      return
    }
    if (this.state.botapidata.fromdate == null || this.state.botapidata.fromdate == "" || this.state.botapidata.fromdate == undefined) {
      Swal.fire("Please Select Start Date ");
      return
    }
    if (this.state.botapidata.tilldate == null || this.state.botapidata.tilldate == "" || this.state.botapidata.tilldate == undefined) {
      Swal.fire("Please Select End Date");
      return
    }
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
      'bankCode': bankcode,
      // 'currentdate': this.state.date,
      // 'defaultlang': 'Eng',
      // 'currancy': 'INR',
      // 'userid': '101'
    }

    await this.props.dispatch(handleupdateBanMaterialMst(UpddateMaterialData, headers))
    this.getbannedmaterial()
    this.setState({
      botapidata: {
        "materialcode": "",
        "materialname": "",
        "fromdate": "",
        "tilldate": ""
      },
    })
  }



  handleChange = (e) => {
    var botapidata1 = this.state.botapidata
    botapidata1[e.target.id] = e.target.value
    const today = new Date();
    this.setState({ botapidata: botapidata1 });
    let inputDate = new Date(this.state.botapidata.fromdate)
    console.log(today)
    console.log(this.state.botapidata.fromdate)
    const inputDateOnly = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());
    const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    if (inputDateOnly < todayOnly) {
      Swal.fire("Please Enter Vaild Date")
      return
    }

    if (new Date(this.state.botapidata.fromdate) > new Date(this.state.botapidata.tilldate)) {
      Swal.fire("Please Select valid Date ");
      return
    }
  }

  deleteStateData = async (row, cell) => {
    debugger
    var id = {}
    id.id = cell.id
    console.log("In Edit", id);
    var token = (localStorage.getItem("tokendata"))
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    }

    await this.props.dispatch(handleDeleteBanMaterialMst(id, headers))
    this.getbannedmaterial()
  }


  editApiData = (row, cell) => {
    debugger
    console.log("In Edit", row);
    this.setState({ botapidata: cell, savebutton: false, updatebutton: true })
  }
  handlePageChange = (pageNumber) => {
    console.log("==>", pageNumber);
    this.setState({ currentPage: pageNumber });
  };

  handlePageSizeChange = (event) => {
    this.setState({
      pageSize: parseInt(event.target.value, 10),
      currentPage: 1,
    });
  };

  actionMethod = (row, cell) => {


    return (
      < React.Fragment>

        <div >
          <i class="fa fa-edit" aria-hidden="true" title="Edit" style={{ color: "blue" }} onClick={() => this.editApiData(row, cell)} ></i>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <i class="fa fa-trash" aria-hidden="true" title="Delete" style={{ color: "red" }} onClick={() => this.deleteStateData(row, cell)} ></i>
        </div>

      </React.Fragment>
    )
  }


  render() {
    console.log("state", this.state.botapidata)
    const { materiallists, currentPage, pageSize } = this.state;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;


    const totalPages = Math.ceil(this.props.materiallists.length / pageSize);

    // Create an array of page numbers
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return (

      <React.Fragment>
        <Universal />
        <section id="main-content">
          <section className="wrapper">
            <div className="row">
              <div className="col-lg-9 main-chart">
                <section className="dashboard-counts no-padding-bottom">

                  <div className="container-fluid" style={{ marginTop: '-1rem' }}>
                    <h1 style={{ fontSize: '22px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid #e9ecef' }}>  </h1>
                    <div className="container-fluid">
                      <div className="row bg-blue has-shadow mt-3" style={{ borderRadius: '1rem', background: '#c9ccdf' }}>
                        <div className="col-12 col-md-2 col-lg-2 rightCol">
                          <p style={{ color: "white", fontWeight: "bolder", fontSize: "14px" }}>Banned Material Code  <span style={{ color: "red" }}>*</span></p>

                        </div>
                        <div className="col-12 col-md-4" >
                          <div className="form-group">
                            <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }}
                              id="materialcode" onChange={this.handleChange} placeholder="Enter Banned Material Code"
                              value={this.state.botapidata.materialcode !== "" ? this.state.botapidata.materialcode : ""} />
                          </div>


                        </div>

                        <div className="col-12 col-md-2 col-lg-2 rightCol">
                          <h4 className="searchFilter " style={{ fontFamily: 'LATO-BOLD', color: '#303974' }}></h4>
                          <p style={{ color: "white", fontWeight: "bolder", fontSize: "14px" }}>Banned Material Name  <span style={{ color: "red" }}>*</span></p>

                        </div>
                        <div className="col-12 col-md-4" >
                          <div className="form-group">
                            <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }}
                              id="materialname" onChange={this.handleChange} placeholder="Enter Banned Material Name"
                              value={this.state.botapidata.materialname !== "" ? this.state.botapidata.materialname : ""} />
                          </div>


                        </div>

                        <div className="col-12 col-md-2 col-lg-2 rightCol">
                          <p style={{ marginTop: '1rem', color: "white", fontWeight: "bolder", fontSize: "14px" }}>Banned From Date <span style={{ color: "red", marginLeft: "-2px" }}>*</span></p>

                        </div>

                        <div className="col-12 col-md-4" style={{ marginTop: '1rem' }}>
                          <div className="form-group">
                            <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }}
                              id="fromdate" Type="date" onChange={this.handleChange}
                              value={this.state.botapidata.fromdate !== "" ? this.state.botapidata.fromdate : ""} />
                          </div>


                        </div>
                        <div className="col-11  col-lg-2 rightCol">
                          <p style={{ marginTop: '1rem', color: "white", fontWeight: "bolder", fontSize: "14px" }} className="">Banned Till  Date  <span style={{ color: "red" }}>*</span></p>



                        </div>
                        <div className="col-12 col-md-4" style={{ marginTop: '1rem' }}>
                          <div className="form-group">
                            <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }}
                              id="tilldate" Type="date" onChange={this.handleChange}
                              value={this.state.botapidata.tilldate !== "" ? this.state.botapidata.tilldate : ""} />
                          </div>

                          <div className="row pull-right" style={{ marginRight: '-28px' }}>
                            <div className="pr-3">
                              <button type="button" className="btn btn-primary " style={{ float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px' }} onClick={() => this.handleChange1()}>Reset</button>
                            </div>
                            <div className="pr-3">
                              {this.state.savebutton === true ?
                                <button type="button" id="Save" className="btn btn-primary " style={{ float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px' }} onClick={() => this.saveMaterialMaster()}
                                // disabled={!this.state.botapidata.fromdate|| !this.state.botapidata.materialcode ||!this.state.botapidata.materialname|| !this.state.botapidata.tilldate}
                                >Save</button> : ""}
                              {this.state.updatebutton === true ?
                                <button type="button" id="Save" className="btn btn-primary " style={{ float: 'right', marginTop: '1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px' }} onClick={() => this.updateBanMaterial()}
                                // disabled={!this.state.botapidata.fromdate|| !this.state.botapidata.materialcode ||!this.state.botapidata.materialname|| !this.state.botapidata.tilldate}
                                >Update</button> : ""}


                            </div>
                          </div>



                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row has-shadow mt-3" style={{ borderRadius: '1rem', width: '94%', marginLeft: '3%', backgroundColor: 'white', marginTop: '5rem', marginLeft: '29px' }}>

                    <div className="col-xs-12">
                      <div className="box">
                        <div className="box-body  no-LR-padding expandcontentscell">
                          <h4 style={{ justifyItems: "center" }}> BANNED  MATERIAL  LIST</h4>
                          <BootstrapTable striped hover
                            data={this.props.materiallists}
                            pagination={true}
                            // search
                            ClearSearchButton
                          // exportCSV
                          >
                            <TableHeaderColumn dataField="materialcode" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                              expandable={false} editable={false} > Banned Material Code</TableHeaderColumn>
                            <TableHeaderColumn dataField="materialname" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                              expandable={false} editable={false} > Banned Material Name</TableHeaderColumn>
                            <TableHeaderColumn dataField="fromdate" csvHeader="First Name" isKey={true} className={"columnHeaderColor"}
                              expandable={false} editable={false} >Banned From Date</TableHeaderColumn>
                            <TableHeaderColumn dataField="tilldate" csvHeader="First Name" className={"columnHeaderColor"}
                              expandable={false} editable={false} >Banned Till  Date</TableHeaderColumn>

                            <TableHeaderColumn dataField="conversionFactor" csvHeader="First Name" className={"columnHeaderColor"}
                              expandable={false} dataFormat={this.actionMethod} editable={false} >Action</TableHeaderColumn>

                          </BootstrapTable>
                          {/* <div className="pagination-select">
                          <label>Page Size:</label>
                          <select
                            value={pageSize}
                            onChange={this.handlePageSizeChange}
                          >
                            <option value="10">10</option>
                            <option value="50">50</option>
                          </select>
                          <ui style={{ marginTop: '-2px', marginRight: '-750px' }} className="react-bootstrap-table-page-btns-ul pagination">
                            {Array.from({ length: this.state.totalPages }, (_, index) => (
                              <li key={index} className="page-item">
                                <label className="page-link" onClick={() => this.handlePageChange(index+1)}>{index + 1}</label>
                              </li>
                            ))}
                          </ui>
                        </div> */}
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
const mapStateToProps = (state) => {
  const { banmaterialList } = state.materiallist
  console.log("banmaterialList", banmaterialList)

  return {
    materiallists: banmaterialList,

  }
}
export default connect(mapStateToProps)(banned_material_master)

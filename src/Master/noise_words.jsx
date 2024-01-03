import React, { Component } from 'react'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import axios from 'axios'
import Universal from '../common/universal'
import Swal from 'sweetalert2'
// import Footer from '../Common/Footer'
import { applicationContextPath } from '../common/api';

class internal_list extends Component {
  constructor(props) {
    super(props)

    this.state = {
      savebutton: true,
      updatebutton: false,
      getApiData: [],
      today: new Date(),
      botapidata: {
        "noiseword": "",

      },
    }
  }
  componentDidMount() {
    this.getnoiseword();

  }
  savenoiseword = async () => {
    debugger
    var savenoiseword = {}
    savenoiseword.noiseword = this.state.botapidata.noiseword
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
    if (this.state.botapidata.noiseword == null || this.state.botapidata.noiseword == "" || this.state.botapidata.noiseword == undefined) {
      Swal.fire("please Select Entity");
      return
    }
    axios.post(applicationContextPath + '/saveNoiseWord', savenoiseword, { headers: headers })
      .then(response => {
        Swal.fire({
          title: 'Submitted!',
          text: 'Your Data Submitted Sucessfully.',
          icon: 'success',
        })
        this.getnoiseword()

        this.setState({
          botapidata: {
            "noiseword": "",


          },

        })
      }
      ).catch(error => {
        console.log(error);
      });
  }
  getnoiseword(urlQuery) {
    debugger
    var token = (localStorage.getItem("tokendata"))
    var bankCode = localStorage.getItem("bankdata")
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
      //'bankCode': bankCode,
    }

    axios.get(applicationContextPath + `/getNoiseWordByBankCode?bankCode=${bankCode}`, { headers })
      .then(response => {
        this.setState({ getApiData: response.data })
      }

      ).catch(error => {
        console.log(error);
      });

  }
  updatenoiseword = async () => {
    debugger
    var Updatenoiseword = this.state.botapidata;
    var bankcode = (localStorage.getItem("bankdata"))
    var token = (localStorage.getItem("tokendata"))

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
      'bankCode': bankcode,
      // 'currentdate': this.state.date,
      // 'defaultlang': 'Eng',
      // 'currancy': 'INR',
      // 'userid': '101'
    }

    axios.post(applicationContextPath + '/updateNoiseWord', Updatenoiseword, { headers: headers })
      .then(response => {
        Swal.fire({
          title: 'Updated!',
          text: 'Your Data Updated Sucessfully.',
          icon: 'success',

        })
        this.getnoiseword()
        // Alert.success(" Record Added Sucessfully",{ position: 'top' })
        this.setState({
          botapidata: {
            "noiseword": "",


          }, updatebutton: false, savebutton: true

        })
      }
      ).catch(error => {
        console.log(error);
      });
  }
  deleteNoiseWord = async (row, cell) => {
    debugger
    var id = {}
    id.id = cell.id
    console.log("In Edit", id);
    var token = (localStorage.getItem("tokendata"))
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    }
    axios.post(applicationContextPath + '/deleteNoiseWord', id, { headers: headers })
      .then(response => {

        this.getnoiseword()

      }
      ).catch(error => {
        console.log(error);
      });
  }
  handleChange = (e) => {
    var botapidata1 = this.state.botapidata
    botapidata1[e.target.id] = e.target.value
    this.setState({ botapidata: botapidata1 });
  }
  editApiData = (row, cell) => {
    debugger
    console.log("In Edit", row);
    this.setState({ botapidata: cell, savebutton: false, updatebutton: true })
  }
  actionMethod = (row, cell) => {

    return (
      < React.Fragment>
        <div >
          <i class="fa fa-edit" aria-hidden="true" title="Edit" style={{ color: "blue" }} onClick={() => this.editApiData(row, cell)} ></i>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <i class="fa fa-trash" aria-hidden="true" title="Delete" style={{ color: "red" }} onClick={() => this.deleteNoiseWord(row, cell)} ></i>
        </div>

      </React.Fragment>
    )
  }

  backFromSummary() {
    window.history.back();
  }
  render() {
    let arrayListt = [{ name: 'sumit Ramchandra Bose' }]
    return (
      <React.Fragment>
        <Universal />
        <section id="main-content">
          <section className="wrapper">
            <div className="row">
              <div className="col-lg-9 main-chart">
                <section className="dashboard-counts no-padding-bottom">

                  <div className="container-fluid" style={{ marginTop: '-1rem' }}>
                    {/* <h1 style={{ fontSize: '22px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid #e9ecef' }}>Noise Word / Phrase Word </h1> */}
                    <h1 style={{ fontSize: '22px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid #e9ecef' }}>Noise Words </h1>
                    <div className="container-fluid">
                      <div className="row bg-blue has-shadow mt-3" style={{ borderRadius: '1rem' }}>
                        <div className="col-12 col-md-2 col-lg-2 rightCol">
                          <p style={{ color: "white", fontWeight: "bolder", fontSize: "15px" }}>Noise Word/Phrase <span style={{ color: "red" }}>*</span></p>

                        </div>
                        <div className="col-12 col-md-4" >
                          <div className="form-group">
                            <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size={5} style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }}
                              id="noiseword" type="text" placeholder="Enter Noise Word/Phrase" onChange={this.handleChange}
                              value={this.state.botapidata.noiseword !== "" ? this.state.botapidata.noiseword : ""} />
                          </div>


                        </div>

                        <div className="col-12 col-md-4" >

                          <div className="row pull-center">
                            <div className="pr-3" >
                              {this.state.savebutton === true ?
                                <button type="button" className="btn btn-primary " style={{ float: 'right', marginTop: '-1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px' }} id="Save" onClick={() => this.savenoiseword()}
                                >Save</button> : ""}
                              {this.state.updatebutton === true ?
                                <button type="button" className="btn btn-primary " style={{ float: 'right', marginTop: '-1rem', backgroundColor: '#fff', borderColor: '#fff', color: 'black', fontSize: '14px' }} id="Save" onClick={() => this.updatenoiseword()}
                                >Update</button> : ""}
                            </div>


                          </div>

                        </div>



                      </div>
                    </div>
                  </div>
                  <div className="row has-shadow mt-3" style={{ borderRadius: '1rem', width: '94%', marginLeft: '3%', backgroundColor: 'white', marginTop: '5rem' }}>

                    <div className="col-xs-12">
                      <div className="box">
                        <div className="box-body  no-LR-padding expandcontentscell">

                          <BootstrapTable
                            data={this.state.getApiData}
                            pagination={true}
                            // search
                            ClearSearchButton
                          //  exportCSV
                          >
                            <TableHeaderColumn dataField='noiseword' expandable={false} editable={false} width="100px" isKey>Noise Word/Phrase</TableHeaderColumn>

                            <TableHeaderColumn dataFormat={this.actionMethod} dataField='id' expandable={false} editable={false} width="10px" > Action</TableHeaderColumn>

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

export default internal_list
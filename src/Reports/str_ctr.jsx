import React, { Component } from 'react'
import Universal from '../common/universal'
import axios from 'axios'
import Swal from 'sweetalert2'
import { applicationContextPath, birtReport } from '../common/api'

class str_ctr extends Component {

  constructor(props) {
    super(props)

    this.state = {
      customerList: [],
      custCode: ""
    }
  }

  componentDidMount() {
    this.getCustomerList()
  }

  getCustomerList = () => {
    var token = localStorage.getItem("tokendata")

    var data = {}
    data.bankCode = localStorage.getItem("bankdata")

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    }
    axios.post(applicationContextPath + `/getCustomerList`, data, { headers })
      .then(response => {
        this.setState({ customerList: response.data })
      }
      ).catch(error => {
        console.log(error);
      });
  }

  downloadCTR = () => {
    debugger
    if ((this.state.custCode == null || this.state.custCode === "" || this.state.custCode === undefined)

    ) {
      Swal.fire("Please Select The Customer");
      return
    }
    var createA = document.createElement('a');
    // createA.setAttribute('href', `http://bot.nellinfotech.com:8443/aml-birt-mis-reports/aml/ctr/${this.state.custCode}?custCode=${this.state.custCode}`);
    createA.setAttribute('href', `http://localhost:8080/aml-birt-mis-reports-1.0//aml/ctr/${this.state.custCode}?custCode=${this.state.custCode}`);

    createA.click()
  }

  render() {
    let optionTemplate = this.state.customerList.length > 0 ? this.state.customerList.map(value => (
      <option value={value.custCode}>{value.custCode}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{value.customerName}</option>
    )) : [];
    return (
      <React.Fragment>
        <Universal />
        <section id="main-content">
          <section className="wrapper">
            <div className="row">
              <div className="col-lg-9 main-chart">
                <section className="dashboard-counts no-padding-bottom">

                  <div className="container-fluid" style={{ marginTop: '-1rem' }}>
                    <h1 style={{ fontSize: '22px', color: '#303974', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid #e9ecef' }}>STR & CTR Report</h1>
                    <div className="container-fluid">
                      <div className="row bg-blue has-shadow mt-3" style={{ borderRadius: '1rem' }}>
                        <div className="col-12 col-md-2 col-lg-3 rightCol">
                          <p style={{ color: "white", fontWeight: "bolder", fontSize: "15px" }}> Select Customer <span style={{ color: "red" }}>*</span></p>

                        </div>
                        <div className="col-12 col-md-4">
                          <div className="form-group">
                            <select id="custCode" style={{ width: '100%', height: "auto" }} className="form-control minimal " onChange={(e) => this.setState({ custCode: e.target.value })}>
                              <option value="">--Select--</option>
                              {optionTemplate}
                            </select>
                          </div>


                        </div>



                      </div>
                    </div>
                  </div>

                  <div className="row has-shadow mt-3" style={{ borderRadius: '1rem', width: '94%', backgroundColor: 'white', marginTop: '5rem', marginLeft: '3%' }}>
                    <button type="button" id="Reset" style={{ borderColor: '#303974', backgroundColor: '#303974', fontSize: '15px' }} className="btn btn-primary " > Download STR File </button>
                    <div class="divider" />
                    <div class="divider" />
                    <button type="button" id="Reset" style={{ borderColor: '#303974', backgroundColor: '#303974', fontSize: '15px' }} className="btn btn-primary " onClick={() => this.downloadCTR()} > Download CTR File </button>

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

export default str_ctr

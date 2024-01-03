import React, { Component } from 'react';
import { connect } from 'react-redux';
import Universal from '../common/universal';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { applicationContextPath } from '../common/api';
import Swal from 'sweetalert2';

// Define a class component named 'ViewCase'
export class ViewCase extends Component {
  state = {
    alertInfo: {
      caseId: "",
      reportTYpe: "",
      caseSeverity: "",
      classification: "",
      description: "",
      recordsReferred: ""
    },
  };

  async componentDidMount() {
    const { location } = this.props;
    const id = location.state?.id;
    var token = localStorage.getItem("tokendata")
    var bankCode = localStorage.getItem("bankdata")
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
      'bankCode': bankCode
    }
    console.log("=====id>", id);
    if (id) {
      try {
        const response = await fetch(applicationContextPath + `/getCaseInfo?caseId=${id}`, { headers });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.setState({ alertInfo: data })
        console.log(this.state.alertInfo);
      } catch (error) {
        console.error('Error fetching alert information:', error);
      }
    }
  }
  handleReportTypeChange = (event) => {
    const selectedReportType = event.target.value;
    this.setState({
      alertInfo: {
        ...this.state.alertInfo,
        reportTYpe: selectedReportType
      }
    });
  }
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      alertInfo: {
        ...this.state.alertInfo,
        [name]: value
      }
    });
  }
  handleSaveClick = () => {
    // Your logic to save the data to the API goes here
    // ...

    // After successfully saving the data, show a success message
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Record Added Sucessfully',
    });
  };
  handleRejectClick = () => {
    // Your logic for rejecting the data goes here
    // ...

    // After successfully rejecting the data, show a success message
    Swal.fire({
      icon: 'success',
      title: 'Rejected',
      text: 'Rejected successfully!',
    });
  };
  handleCancelClick = () => {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Canceled Sucessfully',
    });
  }

  handleCaseSeverityChange = (event) => {
    const selectedCaseSeverity = event.target.value;
    this.setState({
      alertInfo: {
        ...this.state.alertInfo,
        caseSeverity: selectedCaseSeverity
      }
    });
  }

  handleEscalateClick = () => {
    Swal.fire({
      title: "Are you sure you want to escalate?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, escalate!",
    })
      .then(async (result) => {
        const { location } = this.props;
        const id = location.state?.id;
        var token = localStorage.getItem("tokendata")
        var bankCode = localStorage.getItem("bankdata")
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
          'bankCode': bankCode
        }
        if (result.isConfirmed) {
          const response = await fetch(applicationContextPath + `/confirmedCase?caseId=${id}`, { headers });
          Swal.fire("Escalated successfully!", {
            icon: "success",
          });
        }
      });
  }

  handleRejectClick = () => {
    Swal.fire({
      title: "Are you sure you want to reject?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject!",
    })
      .then((result) => {
        if (result.isConfirmed) {
          // User clicked the "Yes, reject!" button, you can add your logic here for rejection
          Swal.fire("Rejected successfully!", {
            icon: "success",
          });
        }
      });
  }
  handleConfirmedFraudClick = () => {
    Swal.fire({
      title: "Are you sure this is a confirmed fraud?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm fraud!",
    })
      .then((result) => {
        if (result.isConfirmed) {

          Swal.fire("Confirmed fraud successfully!", {
            icon: "success",
          });
        }
      });
  }
  render() {
    const { alertInfo } = this.state;

    return (
      <React.Fragment>
        <Universal />
        <div className='row' style={{ marginLeft: "100px", marginTop: '100px', boxSizing: 'border-box' }}>
          <div className="col-lg-9 main-chart">
            <section className="dashboard-counts no-padding-bottom">
              {/* <div className='container-fluid'>
                <div className='row bg-blue has-shadow mt-3' style={{ borderRadius: "1rem" }}>
                  <div className='col-12 col-md-2 col-lg-2 rightCol'>
                    <p style={{ color: 'white', fontWeight: 'border', fontSize: '15px' }}>Case Id </p>
                  </div>
                  <div className="col-12 col-md-4"><div className="form-group">
                    <input type="text" id="cityCode" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size="5" value="1/11/2010/266" style={{ height: 'calc(1rem+0.75rem+2px)', marginRight: '1rem' }} />
                  </div>
                  </div>
                </div>
              </div> */}
              <div className="container-fluid">
                <div className="row bg-blue has-shadow mt-3" style={{ borderRadius: '1rem' }}>
                  {/* Case Id */}
                  <div className="col-12 col-md-2 col-lg-2 rightCol">
                    <p style={{ color: 'white', fontWeight: 'bolder', fontSize: '15px' }}>Case Id</p>
                  </div>''
                  <div className="col-12 col-md-4">
                    <div className="form-group">
                      <input
                        type="text"
                        id="cityCode"
                        className="form-control"
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                        size="5"
                        value={this.state.alertInfo.caseId}
                        style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }}
                      />
                    </div>
                  </div>

                  {/* Case Report Type */}
                  <div className="col-11 col-lg-2 rightCol">
                    <p className="" style={{ color: 'white', fontWeight: 'bolder', fontSize: '15px' }}>Case Report Type</p>
                  </div>
                  <div className="col-12 col-md-3 ">
                    <div className="form-group">
                      <select
                        id="countryCode"
                        title="Country"
                        className="form-select form-select-sm minimal heightForm"
                        style={{ width: '100%', height: 'auto' }}
                        value={this.state.alertInfo.reportTYpe}
                        onChange={this.handleReportTypeChange}
                      >
                        <option value="CEP">CEP</option>
                        <option value="SDN">SDN</option>
                        <option value="Manual">Manual</option>
                        <option value="RBI">RBI</option>
                      </select>
                    </div>
                  </div>

                  {/* Case Severity */}
                  <div className="col-12 col-md-2 col-lg-2 rightCol">
                    <p style={{ color: 'white', fontWeight: 'bolder', fontSize: '15px' }}>Case Severity</p>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="form-group">
                      <select
                        id="countryCode"
                        title="Country"
                        className="form-select form-select-sm minimal heightForm"
                        style={{ width: '100%', height: 'auto' }}
                        value={this.state.alertInfo.caseSeverity} // Bind the selected value to the state
                        onChange={this.handleCaseSeverityChange} // Attach the event handler
                      >
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>
                  </div>

                  {/* Classification */}
                  <div className="col-11 col-lg-2 rightCol">
                    <p className="" style={{ color: 'white', fontWeight: 'bolder', fontSize: '15px' }}>Classification</p>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="form-group">
                      <input
                        type="text"
                        id="classification"
                        name="classification" // Add a name attribute
                        className="form-control"
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                        value={this.state.alertInfo.classification} // Bind the value to the state
                        size="5"
                        style={{
                          height: 'calc(1em + 0.75rem + 2px)',
                          marginRight: '1rem'
                        }}
                        onChange={this.handleInputChange} // Attach the event handler
                      />
                    </div>
                  </div>

                  {/* Case Description */}
                  <div className="col-12 col-md-2 col-lg-2 rightCol">
                    <p style={{ color: 'white', fontWeight: 'bolder', fontSize: '15px' }}>Case Description</p>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="form-group">
                      <textarea
                        rows="6"
                        cols="50"
                        id="cityCode"
                        name="description" // Add a name attribute
                        className="form-control"
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                        value={this.state.alertInfo.description} // Bind the value to the state
                        size="5"
                        style={{
                          height: 'calc(1em + 0.75rem + 2px)',
                          marginRight: '1rem'
                        }}
                        onChange={this.handleInputChange} // Attach the event handler
                      ></textarea>
                    </div>
                  </div>

                  {/* Records Referred */}
                  <div className="col-11 col-lg-2 rightCol">
                    <p className="" style={{ color: 'white', fontWeight: 'bolder', fontSize: '15px' }}>Records Referred</p>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="form-group">
                      <textarea
                        rows="6"
                        cols="50"
                        id="cityCode"
                        name="recordsReferred" // Add a name attribute
                        className="form-control"
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                        value={this.state.alertInfo.recordsReferred} // Bind the value to the state
                        size="5"
                        style={{
                          height: 'calc(1em + 0.75rem + 2px)',
                          marginRight: '1rem'
                        }}
                        onChange={this.handleInputChange} // Attach the event handler
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div className='row' style={{ marginLeft: "100px", marginTop: '10px', boxSizing: 'border-box' }}>
          <div className="col-lg-9 main-chart">
            <section className="dashboard-counts no-padding-bottom">
              <div className="container-fluid" style={{ marginTop: '-1rem' }}>
                <h1 style={{ fontSize: '22px', color: 'rgb(48, 57, 116)', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid rgb(233, 236, 239)' }}>
                  {' '}
                </h1>
                <div className="container-fluid">
                  {/* Linked Category */}
                  <div className="row bg-blue has-shadow mt-3" style={{ borderRadius: '1rem' }}>
                    <table style={{ margin: '30px', width: '110%', border: '1px solid black' }}>
                      <tbody style={{ color: 'black', fontWeight: 'bold' }}>
                        <tr>
                          <td colSpan="10">
                            <label style={{ color: 'white' }}>Linked Category</label>
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <td style={{ width: '30px' }}>
                              <input type="checkbox" checked />
                            </td>
                            <td className="middlesacle" style={{ color: 'white' }}>Money Laundering</td>
                            <td style={{ width: '30px' }}></td>
                            {/* ... Repeat for other categories */}
                          </th>
                          <th>
                            <td style={{ width: '30px' }}>
                              <input type="checkbox" />
                            </td>
                            <td className="middlesacle" style={{ color: 'white' }}>Structuring</td>
                            <td style={{ width: '30px' }}></td>
                            <td style={{ width: '25px' }}>
                              <input type="checkbox" />
                            </td>
                            <td className="middlesacle" style={{ color: 'white' }}>Terrorist Financing</td>
                            <td style={{ width: '30px' }}></td>
                            <td style={{ width: '20px' }}>
                              <input type="checkbox" />
                            </td>
                            <td className="middlesacle" style={{ color: 'white' }}>0 (Specify)</td>
                            <td>
                              <input type="text" id="other" value="" />
                            </td>
                          </th>
                        </tr>
                      </tbody>
                    </table>

                    {/* Channel Involved */}
                    <table style={{ margin: '30px', width: '110%', border: '1px solid black' }}>
                      <tbody style={{ color: 'black', fontWeight: 'bold' }}>
                        <tr>
                          <td colSpan="10">
                            <label style={{ color: 'white' }}>Channel Involved</label>
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <td style={{ width: '30px' }}>
                              <input type="checkbox" />
                            </td>
                            <td className="middlesacle" style={{ color: 'white' }}>Internet</td>
                            <td style={{ width: '30px' }}></td>
                            {/* ... Repeat for other channels */}

                            <td style={{ width: '25px' }}>
                              <input type="checkbox" />
                            </td>
                            <td className="middlesacle" style={{ color: 'white' }}>Mobile</td>
                            <td style={{ width: '30px' }}></td>
                            <td style={{ width: '20px' }}>
                              <input type="checkbox" />
                            </td>
                            <td className="middlesacle" style={{ color: 'white' }}>IVR</td>
                            <td style={{ width: '30px' }}></td>
                            <td style={{ width: '20px' }}>
                              <input type="checkbox" />
                            </td>
                            <td style={{ width: '30px' }}></td>
                            <td className="middlesacle" style={{ color: 'white' }}>POS</td>
                            <td>
                              <input type="checkbox" />
                            </td>
                          </th>
                        </tr>
                        <tr>

                          <th>
                            <td className="middlesacle" style={{ color: 'white' }}>Instrument</td>
                            <td style={{ width: '30px' }}></td>
                            <td>
                              <input type="checkbox" />
                            </td>
                            <td className="middlesacle" style={{ color: 'white' }}>Teller</td>
                            <td style={{ width: '30px' }}></td>
                            <td>
                              <input type="checkbox" />
                            </td>
                            <td className="middlesacle" style={{ color: 'white' }}>ATM</td>
                            <td style={{ width: '30px' }}></td>
                            <td className="middlesacle" style={{ color: 'white' }}>Other</td>
                            <td>
                              <input type="text" id="other" value="" />
                            </td>
                          </th>
                        </tr>
                      </tbody>
                    </table>

                    {/* Check All Of the Following That Apply */}
                    <table style={{ margin: '30px', width: '110%', border: '1px solid black' }}>
                      <tbody style={{ color: 'black', fontWeight: 'bold' }}>
                        <tr>
                          <td colSpan="4">
                            <label style={{ color: 'white' }}>Check All Of the Following That Apply</label>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <input type="checkbox" checked />
                          </td>
                          <td style={{ color: 'white' }}>Customer Violating Multiple Scenarios</td>
                          <td>
                            <input type="checkbox" />
                          </td>
                          <td style={{ color: 'white' }}>Customer Associates Links</td>
                        </tr>
                        <tr>
                          <td>
                            <input type="checkbox" />
                          </td>
                          <td style={{ color: 'white' }}>Suspicious Customer</td>
                          <td>
                            <input type="checkbox" />
                          </td>
                          <td style={{ color: 'white' }}>Unusual High volume of alerts</td>
                        </tr>
                        <tr>
                          <td>
                            <input type="checkbox" checked />
                          </td>
                          <td style={{ color: 'white' }}>Habitual Offender</td>
                          <td>
                            <input type="checkbox" />
                          </td>
                          <td style={{ color: 'white' }}>Unusual High Number of Cases</td>
                        </tr>
                        <tr>
                          <td>
                            <input type="checkbox" />
                          </td>
                          <td style={{ color: 'white' }}>First Time Offender</td>
                          <td>
                            <input type="checkbox" />
                          </td>
                          <td style={{ color: 'white' }}>Identity to be re-established</td>
                        </tr>
                        <tr>
                          <td>
                            <input type="checkbox" />
                          </td>
                          <td style={{ color: 'white' }}>Customer Has Suspicious Links</td>
                          <td>
                            <input type="checkbox" />
                          </td>
                          <td style={{ color: 'white' }}>High Risk Peer Groups</td>
                        </tr>
                        <tr>
                          <td>
                            <input type="checkbox" />
                          </td>
                          <td style={{ color: 'white' }}>Identified in Watchlist</td>
                          <td>
                            <input type="checkbox" />
                          </td>
                          <td style={{ color: 'white' }}>Is politically exposed person</td>
                        </tr>

                      </tbody>
                    </table>

                    {/* Comments */}
                    <table style={{ border: '1px solid', margin: '30px', width: '110%' }}>
                      <tbody style={{ color: 'black', fontWeight: 'bold' }}>
                        <tr>
                          <td>Comments</td>
                          <td>
                            <textarea
                              className="form-control"
                              rows="3"
                              cols="50"
                              id="assignedUser"
                              title="Header Color"
                              type="textarea"
                            >
                              “It is observed that this Customer has been a consistent violator in his transactions. He performs unusual high value transactions in Cash”
                            </textarea>
                          </td>

                          <td width="20%">Attachment</td>
                          <td>
                            <div className="form-group col-md-12 min-height30">
                              <input className="form-control" id="assignedUser" title="Header Color" type="File" />
                            </div>
                            <div className="form-group col-md-12 min-height30">
                              <button type="button">Upload</button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2"></td>
                          <td width="10%">Send To</td>
                          <td>
                            <div className="form-group col-md-10 min-height30">
                              <select
                                id="cars"
                                className="form-select form-select-sm minimal heightForm"
                                style={{ height: '31px', backgroundColor: 'lightgrey' }}
                              >
                                <option value="volvo">Select</option>
                                <option value="volvo">umesh.desai.UMESH DESAI</option>
                                <option value="volvo">sumit.bose.SUMIT BOSE</option>
                              </select>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                  </div>
                </div>
                <div style={{ marginLeft: '10%', marginTop: '1rem' }}>
                  <button
                    type="button"
                    id="Save"
                    className="btn btn-primary"
                    style={{
                      borderColor: 'rgb(48, 57, 116)',
                      backgroundColor: 'rgb(48, 57, 116)',
                      fontSize: '14px',
                      marginRight: '10px'
                    }}
                    onClick={this.handleSaveClick} // Add this onClick event handler
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    id="excalate"
                    className="btn btn-primary"
                    style={{
                      borderColor: 'rgb(48, 57, 116)',
                      backgroundColor: 'rgb(48, 57, 116)',
                      fontSize: '14px',
                      marginRight: '10px',
                    }}
                    onClick={this.handleEscalateClick}
                  >
                    Escalate
                  </button>
                  <button
                    type="button"
                    id="Reject"
                    className="btn btn-primary"
                    style={{
                      borderColor: 'rgb(48, 57, 116)',
                      backgroundColor: 'rgb(48, 57, 116)',
                      fontSize: '14px',
                      marginRight: '10px',
                    }}
                    onClick={this.handleConfirmedFraudClick}
                  >
                    Confirmed Fraud
                  </button>
                  <button
                    type="button"
                    id="Reject"
                    className="btn btn-primary"
                    style={{
                      borderColor: 'rgb(48, 57, 116)',
                      backgroundColor: 'rgb(48, 57, 116)',
                      fontSize: '14px',
                      marginRight: '10px'
                    }}
                    onClick={this.handleRejectClick}
                  >
                    Reject
                  </button>
                  <button
                    type="button"
                    id="Cancel"
                    className="btn btn-primary"
                    style={{
                      borderColor: 'rgb(48, 57, 116)',
                      backgroundColor: 'rgb(48, 57, 116)',
                      fontSize: '14px',
                      marginRight: '10px'
                    }}
                    onClick={this.handleCancelClick}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>

      </React.Fragment>
    );
  }
}

export default connect()(ViewCase)

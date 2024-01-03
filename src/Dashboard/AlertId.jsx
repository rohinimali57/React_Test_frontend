import React, { Component } from 'react';
import { connect } from 'react-redux';
import Universal from '../common/universal';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { applicationContextPath } from '../common/api';
import axios from 'axios';
import { handleAlertManagmentData, } from '../actions/alertManagment'
import Swal from 'sweetalert2';



// Define a class component named 'AlertId'
export class AlertId extends Component {
  state = {
    alertInfo: null,
    showModal: false,
    selectedUser: '',
    id: ''
  };

  async componentDidMount() {
    const { location, handleAlertManagmentData } = this.props;
    const id = location.state?.id;
    this.setState({ id: id });
    console.log("=====>id", id);
    var token = localStorage.getItem("tokendata")
    var bankCode = localStorage.getItem("bankdata")
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
      'bankCode': bankCode
    }
    if (id !== null) {
      // try {
      //   const response = await fetch(applicationContextPath + `/getAlertInfo?alertId=${id}`);
      //   if (!response.ok) {
      //     throw new Error('Network response was not ok');
      //   }
      //   const data = await response.json();
      //   this.setState({ alertInfo: data });
      // } catch (error) {
      //   console.error('Error fetching alert information:', error);
      // }
      // await this.props.dispatch(console.log("adshdkasdjhsd",handleAlertManagmentData(id, headers)))
      // .then(() => {
      //   // The data is now available in this.props.alertInfo
      //   const { alertInfo } = this.props;
      //   this.setState({ alertInfo:alertInfo });
      // })
      // .catch((error) => {
      //   console.error('Error fetching alert information:', error);
      // }); 

      handleAlertManagmentData(id, headers, this.handleAlertInfoUpdate)
        .then((response) => {
          // The data is now available in this.props.alertInfo
          console.log("==->", this.state.alertInfo);
        })
        .catch((error) => {
          console.error('Error fetching alert information:', error);
        });
      //   axios.get(applicationContextPath + `/getAlertInfo?alertId=${id}`, { headers })
      // .then(response => {
      //   console.log("check==>",response);
      //   this.setState({ alertInfo: response.data });
      //   console.log("data---", this.state.alertInfo);
      // })
      //     .catch(error => {
      //       console.error('Error fetching alert information:', error);
      //     });
    }
  }
  handleAlertInfoUpdate = (alertInfo) => {
    this.setState({ alertInfo });
  }

  handleButtonClick() {
    var token = localStorage.getItem("tokendata")
    var bankCode = localStorage.getItem("bankdata")
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
      'bankCode': bankCode
    }
    Swal.fire({
      title: 'Reject Alert',
      input: 'text',
      inputPlaceholder: 'Enter your rejection reason',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Reject',
      showLoaderOnConfirm: true,
      preConfirm: (reason) => {
        // Check if the reason is 'rejected'
        if (reason === 'rejected') {
          // Use the entered reason as the value for the 'remark' parameter
          const apiUrl = `http://localhost:8080/rejectAlert?remark="Rejected"&alertId=${this.state.id}`;

          return axios
            .post(apiUrl, null, { headers }) // Make a GET or POST request as needed for your API
            .then((response) => {
              // Handle the API response here
              if (response.data.success) {
                Swal.fire('Rejected', 'The alert has been rejected.', 'success');
              } else {
                Swal.fire('Error', 'Failed to reject the alert.', 'error');
              }
            })
            .catch((error) => {
              Swal.fire('Error', 'Failed to connect to the API.', 'error');
              console.error('API Request Error:', error);
            });
        } else {
          // If reason is not 'rejected', resolve without making the API call
          return Promise.resolve();
        }
      },
    });
  }
  handleCreateButtonClick() {
    var token = localStorage.getItem("tokendata")
    var bankCode = localStorage.getItem("bankdata")
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
      'bankCode': bankCode
    }
    Swal.fire({
      title: 'Create case',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Create',
      showLoaderOnConfirm: true,
      preConfirm: (reason) => {
        // Check if the reason is 'rejected'
        if (reason === 'rejected') {
          // Use the entered reason as the value for the 'remark' parameter
          const apiUrl = `http://localhost:8080/rejectAlert?remark="Rejected"&alertId=${this.state.id}`;

          return axios
            .post(apiUrl, null, { headers }) // Make a GET or POST request as needed for your API
            .then((response) => {
              // Handle the API response here
              if (response.data.success) {
                Swal.fire('Rejected', 'The Case has been rejected.', 'success');
              } else {
                Swal.fire('Error', 'Failed to Create the case.', 'error');
              }
            })
            .catch((error) => {
              Swal.fire('Error', 'Failed to connect to the API.', 'error');
              console.error('API Request Error:', error);
            });
        } else {
          // If reason is not 'rejected', resolve without making the API call
          return Promise.resolve();
        }
      },
    });
  }
  handleOpenModal = () => {
    var token = localStorage.getItem("tokendata")
    var bankCode = localStorage.getItem("bankdata")
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
      'bankCode': bankCode
    }
    const targetItem = this.state.alertInfo.find(item => item.Attribute === "Alert Id");
    console.log("in alert", targetItem.Value);
    Swal.fire({
      title: 'Assign Alert',
      html:
        '<select id="assignUser" class="swal2-select">' +
        '  <option value="mahesh">Mahesh</option>' +
        '  <option value="rajesh">Rajesh</option>' +
        '</select>',
      showCancelButton: true,
      confirmButtonText: 'Assign',
      cancelButtonText: 'Cancel',
      preConfirm: () => {
        // Get values from the input fields
        const assignUser = Swal.getPopup().querySelector('#assignUser').value;
        //const alertId = Swal.getPopup().querySelector('#alertId').value;

        // Make the API call with the obtained values
        const apiUrl = `http://localhost:8080/assignAlert?assignUser=mahesh&alertId=${targetItem.Value}&assignUserId=21`;

        return axios
          .post(apiUrl, null, { headers }) // Adjust the method to .get() or .post() as needed
          .then((response) => {
            // Handle the API response here
            if (response.data
            ) {
              Swal.fire('Assigned', 'The alert has been assigned.', 'success');
            } else {
              Swal.fire('Error', 'Failed to assign the alert.', 'error');
            }
          })
          .catch((error) => {
            Swal.fire('Error', 'Failed to connect to the API.', 'error');
            console.error('API Request Error:', error);
          });
      },
    });    //this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleUserSelect = (event) => {
    this.setState({ selectedUser: event.target.value });
  };

  handleAssignUser = () => {
    // Add your logic to handle user assignment here
    // For example, you can access this.state.selectedUser
    // to get the selected user for assignment
    console.log('Assigning user:', this.state.selectedUser);

    // Close the modal
    this.handleCloseModal();
  };
  render() {
    const buttonStyles = {
      float: 'right',
      marginTop: '1rem',
      backgroundColor: 'blue',
      borderColor: 'white',
      color: 'white',
      fontSize: '14px'
    };

    const { alertInfo } = this.state;
    // let { alertInfo } = this.state;
    // alertInfo = {
    //   "alertInfo": [
    //     {
    //       "Attribute": "Alert Id",
    //       "Value": "16999",
    //       "Violation Parameter": "3"
    //     },
    //     {
    //       "Attribute": "Transaction No",
    //       "Value": "14",
    //       "Violation Parameter": "3"
    //     },
    //     {
    //       "Attribute": "Transaction Date",
    //       "Value": "2020-12-14 05:30:00.0",
    //       "Violation Parameter": "3"
    //     },
    //     {
    //       "Attribute": "Transaction Currency",
    //       "Value": "",
    //       "Violation Parameter": "3"
    //     },
    //     {
    //       "Attribute": "Transaction Amount",
    //       "Value": "24642.0000",
    //       "Violation Parameter": "3"
    //     },
    //     {
    //       "Attribute": "Transaction type",
    //       "Value": "SA",
    //       "Violation Parameter": "3"
    //     },
    //     {
    //       "Attribute": "Cashflow",
    //       "Value": "cr",
    //       "Violation Parameter": "3"
    //     },
    //     {
    //       "Attribute": "Account Number",
    //       "Value": "14",
    //       "Violation Parameter": "3"
    //     },
    //     {
    //       "Attribute": "Customer Number",
    //       "Value": "C001",
    //       "Violation Parameter": "3"
    //     },
    //     {
    //       "Attribute": "Scenario Violated",
    //       "Value": "",
    //       "Violation Parameter": "3"
    //     },
    //     {
    //       "Attribute": "Assigned To",
    //       "Value": "Gaurav Dudkekar",
    //       "Violation Parameter": "3"
    //     }
    //   ]
    // }

    return (
      <React.Fragment>
        <Universal />
        <div className='row' style={{ marginLeft: "100px", marginTop: '100px', boxSizing: 'border-box' }}>
          <div className="col-lg-10 main-chart">
            <section className='class="dashboard-counts no-padding-bottom"'>
              <div className='row has-shadow mt-3' style={{ borderRadius: '1rem', width: '120%', marginLeft: '3%', backgroundColor: 'white', marginTop: '5rem' }}></div>
              {alertInfo !== null && (
                <BootstrapTable data={alertInfo}>
                  <TableHeaderColumn dataField='Attribute' isKey={true}>Attribute</TableHeaderColumn>
                  <TableHeaderColumn dataField='Value'>Value</TableHeaderColumn>
                  <TableHeaderColumn dataField='Violation Parameter'>Violation Parameter</TableHeaderColumn>
                </BootstrapTable>
              )}


              <div className='row pull-right' style={{ marginRight: '100px' }}>
                <div className='pr-3'>
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={buttonStyles}
                    onClick={this.handleOpenModal}
                  >
                    Assign Alert
                  </button>
                </div>
                {this.showModal && (
                  <div className="ReactModal__Content" style={{/* Your styles here */ }}>
                    <p className="login-box-msg" style={{ float: 'right', cursor: 'pointer' }} onClick={this.handleCloseModal}>
                      X
                    </p>
                    <p className="login-box-msg">Assign User</p>
                    <div className="form-group has-feedback">
                      <select
                        className="form-select form-select-sm minimal heightForm"
                        placeholder="UserName"
                        style={{ height: '31px' }}
                        value={this.selectedUser}
                        onChange={this.handleUserSelect}
                      >
                        <option value="">Select User</option>
                        <option value="Mahesh">Mahesh</option>
                        <option value="Rajesh">Rajesh</option>
                      </select>
                    </div>
                    <div className="col-xs-5" style={{ float: 'right' }}>
                      <button className="btn btn-primary btn-block btn-flat" onClick={this.handleAssignUser}>
                        Assign
                      </button>
                    </div>
                  </div>
                )}
                <div className='pr-3'>
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={buttonStyles}
                    onClick={this.handleButtonClick}
                  >
                    Reject Alert
                  </button>
                </div>
                <div className='pr-3'>
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={buttonStyles}
                    onClick={this.handleCreateButtonClick}
                  >
                    Create Case
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
const mapStateToProps = (state) => {

  return {
    alertInfo: state.alertInfo,
  }
}

const mapDispatchToProps = {
  handleAlertManagmentData, // Map the action creator to props
};
export default connect(mapStateToProps, mapDispatchToProps)(AlertId);

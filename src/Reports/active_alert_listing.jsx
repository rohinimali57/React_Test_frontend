import React, { Component } from 'react'
import Universal from '../common/universal'
import Swal from 'sweetalert2'
import { applicationContextPath, birtReport } from '../common/api'

class active_alert_listing extends Component {



  // componentDidMount() {
  //     this.getApiData();

  //   }

  // getApiData=()=>{
  //   debugger
  //   var createA = document.createElement('a');
  //   createA.setAttribute('href', birtReport+`/aml/activeAlert?bankCode=${localStorage.getItem("bankdata")}`);
  //   createA.click()


  //   var token = localStorage.getItem("tokendata")


  //   const headers = {
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer '+token,
  //     'bankCode': localStorage.getItem("bankdata")
  //     }
  //     window.Swal({
  //       title: "Checking...",
  //       text: "Please wait",   
  //       imageUrl: "images/page_loader1.gif",
  //       showConfirmButton: false,
  //       allowOutsideClick: false, 

  //     });
  //     setTimeout(() => {
  //       window.Swal({
  //         title: "Finished!",
  //         type: 'success',
  //         showConfirmButton: false,
  //         timer: 1000,

  //       });
  //     }, 1000);

  // } 
  render() {
    return (
      <React.Fragment>
        <div>
          <Universal />
          <div className="row" style={{ marginTop: "70px", marginLeft: "50px" }}>
            <div className="col-lg-9 main-chart">
              <section className="dashboard-counts no-padding-bottom">
                <h1 style={{ fontSize: '22px', color: 'rgb(48, 57, 116)', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid rgb(233, 236, 239)' }}>Active Alert Listing</h1>
                <div className="row has-shadow mt-3" style={{ borderRadius: '1rem', width: '103%', marginLeft: '1%', backgroundColor: 'white', marginTop: '5rem' }}>
                  <div className="react-bs-table-container">
                    <div className="react-bs-table-container">
                      <div className="react-bs-table react-bs-table-bordered" style={{ height: '100%' }}>
                        <div className="react-bs-container-header table-header-wrapper">
                          <table className="table table-hover table-bordered">
                            <colgroup>
                              <col style={{ width: '15px', minWidth: '15px' }} />
                              <col style={{ width: '50px', minWidth: '50px' }} />
                              <col style={{ width: '20px', minWidth: '20px' }} />
                            </colgroup>
                            <thead>
                              <tr>
                                <th className="" data-is-only-head="false" title="Alert ID" data-field="Alert-ID" style={{ textAlign: 'left' }}>Alert ID<div></div></th>
                                <th className="" data-is-only-head="false" title="Description" data-field="id" style={{ textAlign: 'left' }}>Description<div></div></th>
                                <th className="" data-is-only-head="false" title="Last Updated On" data-field="id" style={{ textAlign: 'left' }}>Last Updated On<div></div></th>
                              </tr>
                            </thead>
                          </table>
                        </div>
                        <div className="react-bs-container-body" style={{ height: '100%' }}>
                          <table className="table table-striped table-bordered table-hover">
                            <colgroup>
                              <col style={{ width: '15px', minWidth: '15px' }} />
                              <col style={{ width: '50px', minWidth: '50px' }} />
                              <col style={{ width: '20px', minWidth: '20px' }} />
                            </colgroup>
                            <tbody>
                              {/* Sample data rows */}
                              <tr className="">
                                <td tabIndex="1" className="" style={{ textAlign: 'left' }}>
                                  <div className="expandcontents">A001</div>
                                </td>
                                <td tabIndex="2" className="" style={{ textAlign: 'left' }}>
                                  <div className="expandcontents">Exceeded daily withdrawal limit of INR 100000.00</div>
                                </td>
                                <td tabIndex="3" className="" style={{ textAlign: 'left' }}>
                                  <div className="expandcontents">31-12-2019</div>
                                </td>
                              </tr>
                              {/* More data rows */}
                            </tbody>
                          </table>
                        </div>
                        {/* Pagination section */}
                        <div className="react-bs-table-pagination">
                          {/* Pagination content */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default active_alert_listing

import React, { Component } from 'react'
import 'react-tabs/style/react-tabs.css'
import Universal from '../common/universal'
import Swal from 'sweetalert2'
import {handlegetCase, handleUpdateCaseStatus, handleConfirmCase} from '../actions/case'
import { connect } from 'react-redux'



class ViewCase extends Component {

    constructor(props) {
        super(props)

        this.state = {
            getApiData: [],
            botapidata:{
                   
              },
        }
    }
    componentDidMount() {
        debugger
        let caseID = this.props.location.state;
        // var caseID = custCodes.caseID
        var bankCode =localStorage.getItem("bankdata")

  
      console.log("urlQuery", caseID)
      var token = (localStorage.getItem("tokendata"))
      const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token,
          'bankCode': bankCode,
          
        }
             this.props.dispatch(handlegetCase(caseID,headers));
    }

    UpdateCase =  () =>{
        debugger
        var data=[]
        var data1={}
        data1.id = this.props.Risklists[0].id;
        data1.caseStatus = "Reject"
       data.push(data1)
        var bankcode=(localStorage.getItem("bankdata"))
        var token = (localStorage.getItem("tokendata"))
        const headers = {
           'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token,
          'bankCode': bankcode,
          'userId':localStorage.getItem("user_id")
        }
        Swal.fire({
            title: 'Rejected!',
            text: 'Your Case Rejected Successfully.',
            icon: 'success',
          
          })
      this.props.dispatch(handleUpdateCaseStatus(data,headers))
      

   }


   ConfirmCase =  () =>{
    debugger
    var data=[]
    var data1={}
    data1.id = this.props.Risklists[0].id;
    data1.confirmedCase = "Yes"
   data.push(data1)
    var bankcode=(localStorage.getItem("bankdata"))
    var token = (localStorage.getItem("tokendata"))
    const headers = {
       'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token,
      'bankCode': bankcode,
      'userId':localStorage.getItem("user_id")
    }
    Swal.fire({
        title: 'Confirmed!',
        text: 'Your Case Is Confirmed.',
        icon: 'success',
    
      })
  this.props.dispatch(handleConfirmCase(data,headers))
  

}

    handleChange= (e)=> {  
        var botapidata1 = this.state.botapidata
        botapidata1[e.target.id] = e.target.value
        this.setState({botapidata:botapidata1});  
        }
    SaveApiData=()=>{
        debugger
             //var saveapidata=this.state.botapidata;
             var saveapidata=this.state.botapidata;
            // saveapidata.flag = this.state.BotFlag.hrbot
             if((this.state.botapidata.other==null||this.state.botapidata.other==""||this.state.botapidata.other==undefined)
             
             ){
                Swal.fire("Please Fill the All Details");
              return
             }
             else{
                Swal.fire(" Record Added Sucessfully")
                this.setState({  
                  botapidata:{
                    "name":"",
                    "desc":""
                  }
                
               })
    
             }
             
           }
           excalate = (row, cell) => {
            return (
                Swal.fire({
                    title: 'You Want to Excalate data?',
                    text: '',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No'
                  }).then((result) => {
                    if (result.value) {
                      Swal.fire(
                        'Excalate!',
                        'Your Data excalated Sucessfully.',
                        'success'
                      )
                      window.history.back();
                    // For more information about handling dismissals please visit
                    // https://sweetalert2.github.io/#handling-dismissals
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                    //   Swal.fire(
                    //     'Cancelled',
                    //     '',
                    //     'error'
                    //   )
                    }
                  })
            )
        }

        // Reject = (row, cell) => {
        //     return (
        //         Swal.fire({
        //             title: 'You Want to Reject data?',
        //             text: '',
        //             icon: 'warning',
        //             showCancelButton: true,
        //             confirmButtonText: 'Yes',
        //             cancelButtonText: 'No'
        //           }).then((result) => {
        //             if (result.value) {
        //               Swal.fire(
        //                 'Reject!',
        //                 'Your Data Rejected Sucessfully.',
        //                 'success'
        //               )
        //             // For more information about handling dismissals please visit
        //             // https://sweetalert2.github.io/#handling-dismissals
        //             } else if (result.dismiss === Swal.DismissReason.cancel) {
        //               Swal.fire(
        //                 'Cancelled',
        //                 '',
        //                 'error'
        //               )
        //             }
        //           })
        //     )
        // }

        Cancel = (row, cell) => {
            return (
                // Swal.fire({
                //     title: 'You Want to Cancel data?',
                //     text: '',
                //     icon: 'warning',
                //     showCancelButton: true,
                //     confirmButtonText: 'Yes',
                //     cancelButtonText: 'No'
                //   }).then((result) => {
                //     if (result.value) {
                //       Swal.fire(
                //         'Cancel!',
                //         'Your Data Cancelled Sucessfully.',
                //         'success'
                //       )
                //       window.history.back();
                //     // For more information about handling dismissals please visit
                //     // https://sweetalert2.github.io/#handling-dismissals
                //     } else if (result.dismiss === Swal.DismissReason.cancel) {
                //     //   Swal.fire(
                //     //     'Cancelled',
                //     //     '',
                //     //     'error'
                //     //   )
                //     }
                //   })
                window.history.back()
            )
        }
  
   
  
   
   

  
    render() {
        console.log("Risklistsdsfs",this.props.Risklists)
        console.log("alertCodeabcd",this.props.Risklists.length>0?this.props.Risklists[0].alertCode:[])
        return (
            <React.Fragment>

            <div>

                <Universal/>

                <section id="main-content">
        <section className="wrapper">

                <div className="content-wrapper">
               
                <section className=" content-header">
                <div className="row">

                <table style={{ margin: 10, align: "left", width: "90%", border: "1px solid black" }}>
                    <div> <table style={{ margin: 10, align: "left", width: "98%", border: "1px solid black" }}>
                        <div> <tbody style={{ color: 'black', fontWeight: 'bold' }}>

                            <tr>
                                <td width="15%" style={{ border: "1px solid black" }}>Case Id</td>
                                <td width="35%">
                                        <input style={{ border: "1px solid black" }} className="form-control" id="assignedUser" value={this.props.Risklists.length>0?this.props.Risklists[0].caseID:[]} title="Header Color" type="text"   />
                                </td>
                                <td width="15%" style={{ border: "1px solid black" }}>Case Report Type</td>
                                <td width="35%">
                                        <input style={{ border: "1px solid black" }} className="form-control" value={this.props.Risklists.length>0?this.props.Risklists[0].reportTYpe:[]} id="assignedUser" title="Header Color" type="text"   />

                             </td>
                            </tr>
                            <tr>
                                <td width="10%" style={{ border: "1px solid black" }}>Case Severity</td>
                                <td style={{ border: "1px solid black" }}>
                                    <input style={{ border: "1px solid black" }} className="form-control" id="assignedUser" value={this.props.Risklists.length>0?this.props.Risklists[0].caseSeverity:[]} title="Header Color" type="text"   />

                                </td>
                                <td width="10%" style={{ border: "1px solid black" }}>Classification</td>
                                <td style={{ border: "1px solid black" }}>
                                    <input style={{ border: "1px solid black" }} className="form-control" id="assignedUser" value={this.props.Risklists.length>0?this.props.Risklists[0].classification:[]} title="Header Color" type="text"   />
                                </td>
                            </tr>
                            <tr>
                                <td width="10%" style={{ border: "1px solid black" }}>Case Description</td>
                                <td style={{ border: "1px solid black" }}>
                                    <div className="form-group col-md-10 min-height30">
                                        <textarea className="form-control" id="description" title="Header Color" value={this.props.Risklists.length>0?this.props.Risklists[0].description:[]} type="text" 
                                                />
                                    </div>
                                </td>
                                <td width="10%" style={{ border: "1px solid black" }}>Records Referred </td>
                                <td style={{ border: "1px solid black" }}>
                                    <div className="form-group col-md-10 min-height30">
                                        <textarea className="form-control" id="recordsReferred" title="Header Color"  value={this.props.Risklists.length>0?this.props.Risklists[0].recordsReferred:[]} type="text"  
                                                />
                                    </div>
                                </td>
                            </tr>
                     

                            <table border="1px solid"style={{ margin: 10, align: "left", width: "200%", border: "1px solid black" }}>
                                <div> <tbody style={{ color: 'black', fontWeight: 'bold' }}>
                                    <tr><td colspan="8"><label>Suspicious Activity Information</label></td></tr>

                                    <table style={{ margin: 30, align: "left", width: "110%", border: "1px solid black" }}>
                                        <div>  <tbody style={{ color: 'black', fontWeight: 'bold' }}>
                                            <tr><td colspan="10"><label>Linked Category</label></td></tr>
                                            <tr>
                                                <th>
                                                    <td style={{ width: "30px" }}><input type="checkbox" id="moneyLaundering" checked  
                                                ></input></td>
                                                    
                                                    <td className="middlesacle" >Money Laundering</td>

                                                    <td style={{ width: "30px" }}></td>
                                                    <td style={{ width: "25px" }}><input type="checkbox" id="structuring" checked={this.props.Risklists.length>0&&this.props.Risklists[0].structuring=="Yes"?true:false}
                                                /></td>
                                                    <td className="middlesacle" >Structuring</td>
                                                    <td style={{ width: "30px" }}></td>
                                                    <td style={{ width: "20px" }}><input type="checkbox" id="terroristFinancing" checked={this.props.Risklists.length>0&&this.props.Risklists[0].terroristFinancing=="Yes"?true:false}
                                                /></td>
                                                    <td className="middlesacle" >Terrorist Financing</td>
                                                    <td style={{ width: "30px" }}></td>
                                                    {/* <td style={{ width: "20px" }} ><input type="checkbox" id="otherActivity" checked={this.props.Risklists.length>0&&this.props.Risklists[0].otherActivity=="Yes"?true:false}
                                                /></td> */}
                                                    <td style={{ width: "30px" }}></td>
                                                    <td className="middlesacle"   >Other (Specify) </td>
                                                    <td> <input type="text" id="otherActivity" value={this.props.Risklists.length>0?this.props.Risklists[0].otherActivity:[]}

                                                    
                                                   /></td>

                                                </th>
                                            </tr>
                                        </tbody>
                                        </div>
                                    </table>

                                    <table border="1px solid" style={{ margin: 30, align: "left", width: "110%", border: "1px solid black" }}>
                                        <div>  <tbody style={{ color: 'black', fontWeight: 'bold' }}>
                                            <tr><td colspan="8"><label>Channel Involved &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label><input type="checkbox" /></td></tr>
                                            <tr>
                                                <th>
                                                    <td style={{ width: "20px" }}><input type="checkbox" id="internet" checked={this.props.Risklists.length>0&&this.props.Risklists[0].internet=="Yes"?true:false}
                                               /></td>
                                                    <td className="middlesacle">Internet</td>
                                                    <td style={{ width: "30px" }}></td>

                                                    <td style={{ width: "20px" }}><input type="checkbox" id="mobile"  checked={this.props.Risklists.length>0&&this.props.Risklists[0].mobile=="Yes"?true:false}
                                               /></td>
                                                    <td className="middlesacle">Mobile</td>
                                                    <td style={{ width: "30px" }}></td>

                                                    <td style={{ width: "20px" }}><input type="checkbox" id="ivr" checked={this.props.Risklists.length>0&&this.props.Risklists[0].ivr=="Yes"?true:false}
                                               /></td>
                                                    <td className="middlesacle" >IVR</td>
                                                    <td style={{ width: "30px" }}></td>

                                                    <td style={{ width: "20px" }} ><input type="checkbox" id="pos" checked={this.props.Risklists.length>0&&this.props.Risklists[0].pos=="Yes"?true:false}
                                             /></td>
                                                    <td width="5%" >POS</td>
                                                </th>
                                            </tr>
                                            <tr>
                                                <th>
                                                    <td style={{ width: "20px" }}><input type="checkbox" id="instrument"  checked={this.props.Risklists.length>0&&this.props.Risklists[0].instrument=="Yes"?true:false}
                                                /></td>
                                                    <td className="middlesacle"  >Instrument</td>
                                                    <td style={{ width: "10px" }}></td>

                                                    <td style={{ width: "20px" }}><input type="checkbox" id="teller"  checked={this.props.Risklists.length>0&&this.props.Risklists[0].teller=="Yes"?true:false}
                                               /></td>
                                                    <td className="middlesacle">Teller</td>
                                                    <td style={{ width: "38px" }}></td>

                                                    <td style={{ width: "20px" }}><input type="checkbox" id="atm"  checked={this.props.Risklists.length>0&&this.props.Risklists[0].atm=="Yes"?true:false}
                                                /></td>
                                                    <td className="middlesacle">ATM</td>
                                                    <td style={{ width: "25px" }}></td>

                                                    <td style={{ width: "20px" }}><input type="checkbox" id="otherChannel"  checked={this.props.Risklists.length>0&&this.props.Risklists[0].otherChannel=="Yes"?true:false}
                                              /></td>
                                                    <td className="middlesacle" > Other <input type="text" id="otherChannel"                                                      value={this.props.Risklists.length>0?this.props.Risklists[0].otherChannel:[]}

                                               /></td>
                                                </th>
                                            </tr>
                                        </tbody>
                                        </div>
                                    </table>

                                    <table border="01px solid" style={{ margin: 30, align: "left", width: "110%" }}>
                                        <tbody style={{ color: 'black', fontWeight: 'bold' }}>
                                         
                                                <tr><td colspan="4"><label>Check All Of the Following That Apply</label></td></tr>
                                                <tr></tr>
                                                <tr>
                                                        <td width="5%" style={{}}>
                                                            <input type="checkbox" id="multipleViolations"  
                                                checked/>
                                                        </td >
                                                        <td width="35%">Customer Violating Multiple Scenarios</td>

                                                        <td width="15%">
                                                            <input type="checkbox" id="associateLinks"  checked={this.props.Risklists.length>0&&this.props.Risklists[0].associateLinks=="Yes"?true:false}
                                               />
                                                        </td>
                                                        <td width="35%">Customer Associates Links</td>
                                                </tr>
                                                <tr>
                                                        <td width="15%">
                                                            <input type="checkbox" id="suspiciousCustomer"  checked={this.props.Risklists.length>0&&this.props.Risklists[0].suspiciousCustomer=="Yes"?true:false}
                                                />
                                                        </td >
                                                        <td width="35%">Suspious Customer</td>

                                                        <td width="15%">
                                                            <input type="checkbox" id="unusalHighVolumeAlert"  checked={this.props.Risklists.length>0&&this.props.Risklists[0].unusalHighVolumeAlert=="Yes"?true:false}
                                                />
                                                        </td>
                                                        <td width="35%">Unusual High volume of alerts</td>
                                                </tr>
                                                <tr>
                                                        <td width="15%">
                                                            <input type="checkbox" id="habitualOffender"  
                                                checked />
                                                        </td >
                                                        <td width="35%">Habitual Offender</td>

                                                        <td width="15%">
                                                            <input type="checkbox" id="unusalHighCaseeAlert"  checked={this.props.Risklists.length>0&&this.props.Risklists[0].unusalHighCaseeAlert=="Yes"?true:false}
                                                />
                                                        </td>
                                                        <td width="35%">Unusual High Number of Cases</td>
                                                </tr>
                                                <tr>
                                                        <td width="15%">
                                                            <input type="checkbox" id="firstTimer"  checked={this.props.Risklists.length>0&&this.props.Risklists[0].firstTimer=="Yes"?true:false}
                                                 />
                                                        </td >
                                                        <td width="35%"> First Time Offender</td>

                                                        <td width="15%">
                                                            <input type="checkbox" id="reestablishedIdentified"  checked={this.props.Risklists.length>0&&this.props.Risklists[0].reestablishedIdentified=="Yes"?true:false}
                                                />
                                                        </td>
                                                        <td width="35%">Identity to be re-established</td>
                                                </tr>
                                                 <tr>
                                                        <td width="15%">
                                                            <input type="checkbox" id="suspiciousLinks"  checked={this.props.Risklists.length>0&&this.props.Risklists[0].suspiciousLinks=="Yes"?true:false}
                                                />
                                                        </td >
                                                        <td width="35%"> Customer Has Suspicious Links</td>

                                                        <td width="15%">
                                                            <input type="checkbox" id="highRiskPeerGroup"  checked={this.props.Risklists.length>0&&this.props.Risklists[0].highRiskPeerGroup=="Yes"?true:false}
                                                />
                                                        </td>
                                                        <td width="35%">High Risk Peer Groups</td>
                                                </tr>
                                                <tr>
                                                        <td width="15%">
                                                            <input type="checkbox" id="watchlistIdetified"   checked={this.props.Risklists.length>0&&this.props.Risklists[0].watchlistIdetified=="Yes"?true:false}
                                                />
                                                        </td >
                                                        <td width="35%"> Identified in Watchlist</td>

                                                        <td width="15%">
                                                        <input type="checkbox" id="politicallyExposed"   checked={this.props.Risklists.length>0&&this.props.Risklists[0].politicallyExposed=="Yes"?true:false}
                                                />
                                                        </td>
                                                        <td width="35%">
                                                            Is politically exposed person
                                                        </td>
                                                </tr>
                                                
                                               
                                        </tbody>
                                        
                                    </table>

                                </tbody>
                                </div>
                            </table>
                            <tr>
                                <td>Comments  <textarea className="form-control" rows="3" cols="50" id="comments" title="Header Color" value={this.props.Risklists.length>0?this.props.Risklists[0].comments:[]} type="textarea"  
                                               >

                                </textarea>
                                </td>
                                <td >
                                   
                                       
                                    
                                </td>
                             
                            </tr>
                            


                        </tbody></div>
                    </table>
                        <tr >
                            <td colspan="4" >
                                <button type="button" id="excalate" onClick={() => this.excalate()}  className="btn btn-primary " >Escalate</button>&nbsp;&nbsp;
                                <button type="button" id="Confirm Fraud"  onClick={() => this.ConfirmCase()}  className="btn btn-primary " >Confirm Case</button>&nbsp;&nbsp;
                                <button type="button" id="Reject"  onClick={() => this.UpdateCase()} className="btn btn-primary " >Reject</button>&nbsp;&nbsp;
                                <button type="button" id="Save" onClick={() => this.Cancel()} className="btn btn-primary " >Cancel</button>&nbsp;&nbsp;
                            </td>
                        </tr>
                    </div>
                </table>
                </div>
            </section>
            </div>
          </section>
          </section>

            </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    debugger
    // const { bankcode } = state.bankMaster
    const {customersRisks} = state.caselist

    // const {saveCase} = state.Savecase
   // console.log("customerList", customerList)
 console.log('customersRisks',customersRisks)
   return {
    //    bankcode,
       Risklists:customersRisks,
    //   SaveCase:saveCase
   }
 }
 export default connect(mapStateToProps)(ViewCase)


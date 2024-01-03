import React, { Component } from 'react'
import 'react-tabs/style/react-tabs.css';
import Universal from '../common/universal'
import Swal from 'sweetalert2'
import {handleSavecase } from '../actions/case'
import { connect } from 'react-redux'



class CreateCase extends Component {

    constructor(props) {
        super(props)

        this.state = {
            getApiData: [],
            createcasedata:{
                    "branchCode":"",
                    "alertCode":"",
                    "alertSubTypeCode":"",
                    "reportTYpe":"",
                    "caseSeverity":"",
                    "classification":"",
                    "description":"",
                    "recordsReferred":"",
                    "moneyLaundering":"",
                    "structuring":"",
                    "terroristFinancing":"",
                    "otherActivity":"",
                    "internet":"",
                    "mobile":"",
                    "ivr":"",
                    "pos":"",
                    "instrument":"",
                    "teller":"",
                    "atm":"",
                    "otherChannel":"",
                    "multipleViolations":"",
                    "suspiciousCustomer":"",
                    "habitualOffender":"",
                    "firstTimer":"",
                    "suspiciousLinks":"",
                    "watchlistIdetified":"",
                    "associateLinks":"",
                    "unusalHighVolumeAlert":"",
                    "unusalHighCaseeAlert":"",
                    "reestablishedIdentified":"",
                    "highRiskPeerGroup":"",
                    "politicallyExposed":"",
                    "comments":"",
                    "fileLink":"",
                    "assignedTo":"",
                    "assignedToName":"",
                    "custCode":"",
                    "accountId":"",
                    "customerName":" ",
                    "alertID":"",
                    "caseStatus":""              
              },
        }
    }
    componentDidMount() {
        // this.getApiData();

    }

  
   
    saveCase = () =>{
        debugger
        var notificationData={}
         notificationData = this.state.createcasedata;
         var bankcode=(localStorage.getItem("bankdata"))
         var token = (localStorage.getItem("tokendata"))
         const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token,
            'bankcode': bankcode,
            'branchcode': 'A1000-01',
            'currentdate': '2020/09/01',
            'defaultlang': 'Eng',
            'currancy': 'INR',
            'userid': '101'
          }
          Swal.fire({
            title: 'Saved!',
            text: 'Your Data Saved Sucessfully.',
            icon: 'success',
           
          })
          this.props.dispatch(handleSavecase(notificationData,headers))
          this.setState({  
            createcasedata:{
                "branchCode":"",
                "alertCode":"",
                "alertSubTypeCode":"",
                "reportTYpe":"",
                "caseSeverity":"",
                "classification":"",
                "description":"",
                "recordsReferred":"",
                "moneyLaundering":"",
                "structuring":"",
                "terroristFinancing":"",
                "otherActivity":"",
                "internet":"",
                "mobile":"",
                "ivr":"",
                "pos":"",
                "instrument":"",
                "teller":"",
                "atm":"",
                "otherChannel":"",
                "multipleViolations":"",
                "suspiciousCustomer":"",
                "habitualOffender":"",
                "firstTimer":"",
                "suspiciousLinks":"",
                "watchlistIdetified":"",
                "associateLinks":"",
                "unusalHighVolumeAlert":"",
                "unusalHighCaseeAlert":"",
                "reestablishedIdentified":"",
                "highRiskPeerGroup":"",
                "politicallyExposed":"",
                "comments":"",
                "fileLink":"",
                "assignedTo":"",
                "assignedToName":"",
                "custCode":"",
                "accountId":"",
                "customerName":" ",
                "alertID":"",
                "caseStatus":""              
          },
       }) 
    }

  
    handleChange= (e)=> {  
        var createcasedata1 = this.state.createcasedata
        createcasedata1[e.target.id] = e.target.value
        this.setState({createcasedata:createcasedata1});  
        }
    SaveApiData=()=>{
        debugger
             //var saveapidata=this.state.createcasedata;
             var saveapidata=this.state.createcasedata;
            // saveapidata.flag = this.state.BotFlag.hrbot
             if((this.state.createcasedata.other==null||this.state.createcasedata.other==""||this.state.createcasedata.other==undefined)
             
             ){
                Swal.fire("Please Fill the All Details");
              return
             }
             else{
                Swal.fire(" Record Added Sucessfully")
                this.setState({  
                  createcasedata:{
                    "name":"",
                    "desc":""
                  }
                
               })
    
             }
             
           }
         
   

      
    render() {
        // console.log("Customerlists",this.props.Customerlists.customerName)
        // let Customeroptions = this.props.Customerlists.map(value => (
        //     <option value={value.customerName}>{value.customerName}</option>
        //   ));
        return (
            <React.Fragment>
              <Universal/>
              
              <section id="main-content">
        <section className="wrapper">
                <section className=" content-header">
                        <div>
                        <div className="col-md-12 col-sm-12 col-xs-12 pull-left no-L-padding" style={{backgroundColor:"white"}}>
                        <div className="pull-left no-L-padding pg-back-arrow">
                        {/* <a  onClick={() => this.backFromAlertMonitor()}> <i className="fa fa-chevron-left"></i></a> */}
                                     </div>
                                     <div class="h4 pull-left no-L-padding page-heading">
                                     <div className="page-head-text">Create Case </div>
                                    
                                </div>
                            </div>
                            </div>
                            </section>
                <section className=" content-header">
                <div className="row">

                <table style={{ margin: 10, align: "left", width: "90%", border: "1px solid black" }}>
                    <div> <table style={{ margin: 10, align: "left", width: "98%", border: "1px solid black" }}>
                        <div> <tbody style={{ color: 'black', fontWeight: 'bold' }}>

                            <tr>
                                {/* <td width="15%" style={{ border: "1px solid black" }}>Case Id</td>
                                <td width="35%">
                                        <input style={{ border: "1px solid black" }} className="form-control" id="assignedUser" title="Header Color" type="text"  disabled />
                                </td> */}
                                <td width="15%" style={{ border: "1px solid black" }}>Case Report Type</td>
                                <td width="15%">
                                        {/* <input style={{ border: "1px solid black" }} className="form-control" id="assignedUser" title="Header Color" type="text" /> */}
                                        <select id="reportTYpe" className="form-control"onChange={this.handleChange} 
                                                value={this.state.createcasedata.reportTYpe!=""?this.state.createcasedata.reportTYpe:""}>
                                        <option value="">Select</option>

                                        <option value="CEP">CEP</option>
                                          <option value="SDN">SDN</option>
                                          <option value="Manual">Manual</option>
                                          <option value="RBI">RBI</option>
                                        </select>
                             </td>
                             <td width="10%" style={{ border: "1px solid black" }}>Case Severity</td>
                                <td style={{ border: "1px solid black" }}>
                                    <div className="form-group col-md-10 min-height30">
                                    <select id="caseSeverity" className="form-control" onChange={this.handleChange} 
                                                value={this.state.createcasedata.caseSeverity!=""?this.state.createcasedata.caseSeverity:""}>
                                    <option value="Medium">Medium</option>

                                          <option value="High">High</option>
                                          <option value="Low">Low</option>
                                        </select>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                               
                                <td width="10%" style={{ border: "1px solid black" }}>Classification</td>
                                <td style={{ border: "1px solid black" }}>
                                    <div className="form-group col-md-10 min-height30">
                                        <input className="form-control" id="classification" title="Header Color" type="text" onChange={this.handleChange} 
                                                value={this.state.createcasedata.classification!=""?this.state.createcasedata.classification:""} />
                                    </div>
                                </td>
                                <td width="10%" style={{ border: "1px solid black" }}>Case Description</td>
                                <td style={{ border: "1px solid black" }}>
                                    <div className="form-group col-md-10 min-height30">
                                        <textarea className="form-control" id="description" title="Header Color" type="text" onChange={this.handleChange} 
                                                value={this.state.createcasedata.description!=""?this.state.createcasedata.description:""}/>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                               
                                <td width="10%" style={{ border: "1px solid black" }}>Records Referred </td>
                                <td style={{ border: "1px solid black" }}>
                                    <div className="form-group col-md-10 min-height30">
                                        <textarea className="form-control" id="recordsReferred" title="Header Color" type="text" onChange={this.handleChange} 
                                                value={this.state.createcasedata.recordsReferred!=""?this.state.createcasedata.recordsReferred:""}/>
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
                                                    <td style={{ width: "30px" }}><input type="checkbox" id="moneyLaundering"  onChange={this.handleChange} 
                                                value={this.state.createcasedata.moneyLaundering!=""?this.state.createcasedata.moneyLaundering:""}></input></td>
                                                    
                                                    <td className="middlesacle" >Money Laundering</td>

                                                    <td style={{ width: "30px" }}></td>
                                                    <td style={{ width: "25px" }}><input type="checkbox" id="structuring" onChange={this.handleChange} 
                                                value={this.state.createcasedata.structuring!=""?this.state.createcasedata.structuring:"Yes"}/></td>
                                                    <td className="middlesacle" >Structuring</td>
                                                    <td style={{ width: "30px" }}></td>
                                                    <td style={{ width: "20px" }}><input type="checkbox" id="terroristFinancing" onChange={this.handleChange} 
                                                value={this.state.createcasedata.terroristFinancing!=""?this.state.createcasedata.terroristFinancing:"Yes"}/></td>
                                                    <td className="middlesacle" >Terrorist Financing</td>
                                                    <td style={{ width: "30px" }}></td>
                                                    {/* <td style={{ width: "20px" }} ><input type="checkbox" id="otherActivity" onChange={this.handleChange} 
                                                value={this.state.createcasedata.otherActivity!=""?this.state.createcasedata.otherActivity:"Yes"}/></td> */}
                                                    <td style={{ width: "30px" }}></td>
                                                    <td className="middlesacle"   >Other (Specify) </td>
                                                    <td> <input type="text" id="otherActivity"
                                                    onChange={this.handleChange}
                                                    value={this.state.createcasedata.otherActivity!=""?this.state.createcasedata.otherActivity:""} /></td>

                                                </th>
                                            </tr>
                                        </tbody>
                                        </div>
                                    </table>

                                    <table border="1px solid" style={{ margin: 30, align: "left", width: "110%", border: "1px solid black" }}>
                                        <div>  <tbody style={{ color: 'black', fontWeight: 'bold' }}>
                                            <tr><td colspan="8"><label>Channel Involved &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                            {/* <input type="checkbox" /> */}
                                            </td></tr>
                                            <tr>
                                                <th>
                                                    <td style={{ width: "20px" }}><input type="checkbox" id="internet" onChange={this.handleChange} 
                                                value={this.state.createcasedata.internet!=""?this.state.createcasedata.internet:"Yes"}/></td>
                                                    <td className="middlesacle">Internet</td>
                                                    <td style={{ width: "30px" }}></td>

                                                    <td style={{ width: "20px" }}><input type="checkbox" id="mobile" onChange={this.handleChange} 
                                                value={this.state.createcasedata.mobile!=""?this.state.createcasedata.mobile:"Yes"}/></td>
                                                    <td className="middlesacle">Mobile</td>
                                                    <td style={{ width: "30px" }}></td>

                                                    <td style={{ width: "20px" }}><input type="checkbox" id="ivr" onChange={this.handleChange} 
                                                value={this.state.createcasedata.ivr!=""?this.state.createcasedata.ivr:"Yes"}/></td>
                                                    <td className="middlesacle" >IVR</td>
                                                    <td style={{ width: "30px" }}></td>

                                                    <td style={{ width: "20px" }} ><input type="checkbox" id="pos" onChange={this.handleChange} 
                                                value={this.state.createcasedata.pos!=""?this.state.createcasedata.pos:"Yes"}/></td>
                                                    <td width="5%" >POS</td>
                                                </th>
                                            </tr>
                                            <tr>
                                                <th>
                                                    <td style={{ width: "20px" }}><input type="checkbox" id="instrument" onChange={this.handleChange} 
                                                value={this.state.createcasedata.instrument!=""?this.state.createcasedata.instrument:"Yes"}/></td>
                                                    <td className="middlesacle"  >Instrument</td>
                                                    <td style={{ width: "10px" }}></td>

                                                    <td style={{ width: "20px" }}><input type="checkbox" id="teller" onChange={this.handleChange} 
                                                value={this.state.createcasedata.teller!=""?this.state.createcasedata.teller:"Yes"}/></td>
                                                    <td className="middlesacle">Teller</td>
                                                    <td style={{ width: "38px" }}></td>

                                                    <td style={{ width: "20px" }}><input type="checkbox" id="atm" onChange={this.handleChange} 
                                                value={this.state.createcasedata.atm!=""?this.state.createcasedata.atm:"Yes"}/></td>
                                                    <td className="middlesacle">ATM</td>
                                                    <td style={{ width: "25px" }}></td>

                                                    <td style={{ width: "20px" }}><input type="checkbox" id="otherChannel" onChange={this.handleChange} 
                                                value={this.state.createcasedata.otherChannel!=""?this.state.createcasedata.otherChannel:"Yes"}/></td>
                                                    <td className="middlesacle" > Other <input type="text" id="otherChannel" onChange={this.handleChange} 
                                                value={this.state.createcasedata.otherChannel!=""?this.state.createcasedata.otherChannel:"Yes"}/></td>
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
                                                            <input type="checkbox" id="multipleViolations" onChange={this.handleChange} 
                                                value={this.state.createcasedata.multipleViolations!=""?this.state.createcasedata.multipleViolations:"Yes"}/>
                                                        </td >
                                                        <td width="35%">Customer Violating Multiple Scenarios</td>

                                                        <td width="15%">
                                                            <input type="checkbox" id="associateLinks" onChange={this.handleChange} 
                                                value={this.state.createcasedata.associateLinks!=""?this.state.createcasedata.associateLinks:"Yes"}/>
                                                        </td>
                                                        <td width="35%">Customer Associates Links</td>
                                                </tr>
                                                <tr>
                                                        <td width="15%">
                                                            <input type="checkbox" id="suspiciousCustomer" onChange={this.handleChange} 
                                                value={this.state.createcasedata.suspiciousCustomer!=""?this.state.createcasedata.suspiciousCustomer:"Yes"}/>
                                                        </td >
                                                        <td width="35%">Suspious Customer</td>

                                                        <td width="15%">
                                                            <input type="checkbox" id="unusalHighVolumeAlert" onChange={this.handleChange} 
                                                value={this.state.createcasedata.unusalHighVolumeAlert!=""?this.state.createcasedata.unusalHighVolumeAlert:"Yes"}/>
                                                        </td>
                                                        <td width="35%">Unusual High volume of alerts</td>
                                                </tr>
                                                <tr>
                                                        <td width="15%">
                                                            <input type="checkbox" id="habitualOffender" onChange={this.handleChange} 
                                                value={this.state.createcasedata.habitualOffender!=""?this.state.createcasedata.habitualOffender:"Yes"}  />
                                                        </td >
                                                        <td width="35%">Habitual Offender</td>

                                                        <td width="15%">
                                                            <input type="checkbox" id="unusalHighCaseeAlert" onChange={this.handleChange} 
                                                value={this.state.createcasedata.unusalHighCaseeAlert!=""?this.state.createcasedata.unusalHighCaseeAlert:"Yes"}/>
                                                        </td>
                                                        <td width="35%">Unusual High Number of Cases</td>
                                                </tr>
                                                <tr>
                                                        <td width="15%">
                                                            <input type="checkbox" id="firstTimer" onChange={this.handleChange} 
                                                value={this.state.createcasedata.firstTimer!=""?this.state.createcasedata.firstTimer:"Yes"} />
                                                        </td >
                                                        <td width="35%"> First Time Offender</td>

                                                        <td width="15%">
                                                            <input type="checkbox" id="reestablishedIdentified" onChange={this.handleChange} 
                                                value={this.state.createcasedata.reestablishedIdentified!=""?this.state.createcasedata.reestablishedIdentified:"Yes"}/>
                                                        </td>
                                                        <td width="35%">Identity to be re-established</td>
                                                </tr>
                                                 <tr>
                                                        <td width="15%">
                                                            <input type="checkbox" id="suspiciousLinks" onChange={this.handleChange} 
                                                value={this.state.createcasedata.suspiciousLinks!=""?this.state.createcasedata.suspiciousLinks:"Yes"}/>
                                                        </td >
                                                        <td width="35%"> Customer Has Suspicious Links</td>

                                                        <td width="15%">
                                                            <input type="checkbox" id="highRiskPeerGroup" onChange={this.handleChange} 
                                                value={this.state.createcasedata.highRiskPeerGroup!=""?this.state.createcasedata.highRiskPeerGroup:"Yes"}/>
                                                        </td>
                                                        <td width="35%">High Risk Peer Groups</td>
                                                </tr>
                                                <tr>
                                                        <td width="15%">
                                                            <input type="checkbox" id="watchlistIdetified"  onChange={this.handleChange} 
                                                value={this.state.createcasedata.watchlistIdetified!=""?this.state.createcasedata.watchlistIdetified:"Yes"}/>
                                                        </td >
                                                        <td width="35%"> Identified in Watchlist</td>

                                                        <td width="15%">
                                                        <input type="checkbox" id="politicallyExposed"  onChange={this.handleChange} 
                                                value={this.state.createcasedata.politicallyExposed!=""?this.state.createcasedata.politicallyExposed:"Yes"}/>
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
                                <td>Comments  <textarea className="form-control" rows="3" cols="50" id="comments" title="Header Color" type="textarea" onChange={this.handleChange} 
                                                value={this.state.createcasedata.comments!=""?this.state.createcasedata.comments:""}>

                                “It is observed that this Customer has been a consist violator in his transactions. He performs unusual high value transactions in Cash”
                                </textarea>
                                </td>
                                <td >
                                   
                                       
                                    
                                </td>
                                <td width="20%">Attachment</td>
                                <td >
                                    <div className="form-group col-md-12 min-height30">
                                        <input className="form-control" id="fileLink" title="Header Color" type="File" onChange={this.handleChange} 
                                                value={this.state.createcasedata.fileLink!=""?this.state.createcasedata.fileLink:""}/>
                                        {/* <button type="button">Upload</button> */}

                                    </div>
                                    <div className="form-group col-md-12 min-height30">
                                        {/* <input className="form-control" id="assignedUser" title="Header Color" type="File" /> */}
                                        <button type="button">Upload</button>

                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2"></td>
                                <td width="10%">Send To</td>
                                <td >
                                    <div className="form-group col-md-10 min-height30">
                                    <select id="assignedToName" className="form-control"onChange={this.handleChange} 
                                                value={this.state.createcasedata.assignedToName!=""?this.state.createcasedata.assignedToName:""}>
                                        <option value="">Select</option>
                                        <option value="umesh.desai.UMESH DESAI">umesh.desai.UMESH DESAI</option>
                                          <option value="sumit.bose.SUMIT BOSE">sumit.bose.SUMIT BOSE</option>
                                        </select>                                    </div>
                                </td>
                                {/* <label>View Group User</label> */}

                            </tr>


                        </tbody></div>
                    </table>
                        <tr >
                            <td colspan="4" >
                                <button  type="button" id="Save"  onClick={() => this.saveCase()}   className="btn btn-primary " >Save</button>&nbsp;&nbsp;
                                {/* <button type="button" id="excalate" onClick={() => this.excalate()}  className="btn btn-primary " >Escalate</button>&nbsp;&nbsp;
                                <button type="button" id="Reject"    className="btn btn-primary " >Confirmed Fraud</button>&nbsp;&nbsp;
                                <button type="button" id="Save"  onClick={() => this.Reject()} className="btn btn-primary " >Reject</button>&nbsp;&nbsp; */}
                                <button type="button" id="Save"  className="btn btn-primary " >Cancel</button>&nbsp;&nbsp;
                            </td>
                        </tr>
                    </div>
                </table>
                </div>
            </section>
            </section>
            </section>
          

            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    debugger
    const {customersLists} = state.customerlist
    console.log("customersLists", customersLists)

   // console.log("customerList", customerList)
 
   return {
      Customerlists:customersLists,
   }
 }
 export default connect(mapStateToProps)(CreateCase)


import React, { Component } from 'react'
import img1 from '../images/nell-logo.svg'
import img2 from '../images/tick.svg'
import { connect } from 'react-redux'
import Scrollbar from 'react-custom-scrollbars'


export class universal extends Component {
  logout = () => {
    localStorage.removeItem('LoginData');
    localStorage.removeItem('bankdata');
    localStorage.removeItem('tokendata');
    localStorage.removeItem('userId');
    localStorage.removeItem('amldata');
    localStorage.removeItem('amldata1');
  }
  render() {
    // console.log("sadads",this.state.LoginData.menuCode)
    const { menulists } = this.props
    const menuList = localStorage.getItem("amldata")
    console.log("ahsha", menuList)
    // console.log("localStorage.getItem", JSON.parse( menuList))
    var bank = JSON.parse(menuList)
    console.log("abcd", bank)
    var checkObj = {

    }

    const bankObj = bank.map((obj) => {
      if (obj == undefined) {
        return
      }
      // ADMINISTRATION
      else if (obj.menuCode == "bank_master") {
        checkObj.checkBankMaster = true;
      }
      else if (obj.menuCode == "bank_parameter") {
        checkObj.checkBankparameter = true;
      }
      else if (obj.menuCode == "branch_management") {
        checkObj.checkBranchmanagement = true;
      }
      else if (obj.menuCode == "lookUp") {
        checkObj.checkLookupmanagement = true;
      }
      else if (obj.menuCode == "branch_parameter") {
        checkObj.checkBranchParameter = true;
      }
      else if (obj.menuCode == "role") {
        checkObj.checkRolemanagement = true;
      }
      else if (obj.menuCode == "user") {
        checkObj.checkListUsermanagement = true;
      }
      else if (obj.menuCode == "user_branch_role_map") {
        checkObj.checkUserBranchRoleMap = true;
      }
      else if (obj.menuCode == "group") {
        checkObj.checkGroupMaintain = true;
      }
      else if (obj.menuCode == "holiday") {
        checkObj.checkBranchHolidayMaster = true;
      }
      else if (obj.menuCode == "user_hierarchy") {
        checkObj.checkUserHierarchy = true;
      }
      else if (obj.menuCode == "role_rights") {
        checkObj.checkRoleRights = true;
      }
      // MASTER
      else if (obj.menuCode == "travel_log") {
        checkObj.checkTravelLog = true;
      }
      else if (obj.menuCode == "banned_material_master") {
        checkObj.checkBannedMaterialMaster = true;
      }
      else if (obj.menuCode == "due_deligence_master") {
        checkObj.checkDueDeligenceMaster = true;
      }
      else if (obj.menuCode == "banned_merchants_master") {
        checkObj.checkBannedMerchantsMaster = true;
      }
      else if (obj.menuCode == "eod_configuration_master") {
        checkObj.checkEodConfigurationMaster = true;
      }
      else if (obj.menuCode == "de_dup_Config") {
        checkObj.checkDeDupConfig = true;
      }
      // BUSINESS
      else if (obj.menuCode == "CustomerSearch") {
        checkObj.checkCustomerSearch = true;
      }
      else if (obj.menuCode == "swift_message_configuration") {
        checkObj.checkSwiftMessageConfiguration = true;
      }

      // REPORT

      else if (obj.menuCode == "confirmed_fraud_report") {
        checkObj.checkConfirmedFraudReport = true;
      }

      else if (obj.menuCode == "monitor") {
        checkObj.checkMonitoring = true;
      }
      else if (obj.menuCode == "case_listing") {
        checkObj.checkCaseListing = true;
      }
      else if (obj.menuCode == "alert_status_report") {
        checkObj.checkAlertStatusReport = true;
      }
      else if (obj.menuCode == "alert_violation_statistics") {
        checkObj.checkAlertViolationStatistics = true;
      }
      else if (obj.menuCode == "false_positive_report") {
        checkObj.checkFalsePositiveReport = true;
      }
      else if (obj.menuCode == "Channel_wise_alert") {
        checkObj.checkChannelWiseAlertSummary = true;
      }
      else if (obj.menuCode == "customer_risk_movement") {
        checkObj.checkCustomerRiskMovement = true;
      }
      else if (obj.menuCode == "active_alert_listing") {
        checkObj.checkActiveAlertListing = true;
      }
      else if (obj.menuCode == "team_performance_report") {
        checkObj.checkTeamPerformanceReport = true;
      }

      // SYSTEM

      else if (obj.menuCode == "Country") {
        checkObj.checkCountryMaster = true;
      }
      else if (obj.menuCode == "state") {
        checkObj.checkStateMaster = true;
      }
      else if (obj.menuCode == "city") {
        checkObj.checkCityMaster = true;
      }
      else if (obj.menuCode == "currency") {
        checkObj.checkCurrencyMaster = true;
      }

      // ALERT MANAGEMENT

      else if (obj.menuCode == "simulate") {
        checkObj.checkSimulate = true;
      }
      else if (obj.menuCode == "alert_search") {
        checkObj.checkAlertSearch = true;
      }
      else if (obj.menuCode == "scenario_listing") {
        checkObj.checkScenarioListing = true;
      }
      else if (obj.menuCode == "rules_exception_mark") {
        checkObj.checkRulesExceptionMark = true;
      }
      else if (obj.menuCode == "treshold_Based_Rule") {
        checkObj.checkThresholdBasedRule = true;
      }
      // SDN

      else if (obj.menuCode == "sdn_search") {
        checkObj.checkSdnSearch = true;
      }
      else if (obj.menuCode == "sdn_list") {
        checkObj.checkSdnList = true;
      }
      else if (obj.menuCode == "internal_list") {
        checkObj.checkInternalList = true;
      }
      else if (obj.menuCode == "noise_words") {
        checkObj.checkNoiseWords = true;
      }
      else if (obj.menuCode == "risk_weightage_master") {
        checkObj.checkRiskWeightageMaster = true;
      }

      // AUDIT

      else if (obj.menuCode == "user_audit_report") {
        checkObj.checkUserAuditReport = true;
      }
      else if (obj.menuCode == "activity_audit_report") {
        checkObj.checkActivityAuditReport = true;
      }
      else if (obj.menuCode == "alert_updation_audit") {
        checkObj.checkAlertUpdationAuditReport = true;
      }

      // CASE MANAGEMENT

      else if (obj.menuCode == "case_search") {
        checkObj.checkCaseSearch = true;
      }
      else if (obj.menuCode == "str_ctr") {
        checkObj.checkStrctr = true;
      }

      //DASHBOARD

      //  else if(obj.menuCode == "analysis"){
      //    checkObj.checkAnalysis = true;
      //  } 
      //  else if(obj.menuCode == "dashboard"){
      //    checkObj.checkDashboard = true;
      //  }
    })
    return (
      <React.Fragment>
        <div className={this.props.enableDisableUniversalBar ? 'disableduniversalbar' : ''}>
          <div className="header">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <a className="navbar-brand" id="menu-action">
                {/* <i className="fa fa-bars" />
                <span>Close</span> */}
              </a>
              <a className="navbar-brand" href="/app">
                <img src={img1} alt="logo" className="img-fluid" />
              </a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item active">
                    <a className="nav-link" href="/app"><img src={img2} alt="logo" className="img-fluid" /></a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/" onClick={() => this.logout()}><p>Logout</p></a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          {/* <div class="w3-sidebar w3-bar-block w3-light-grey w3-card" style={{width: 300}}>
  <a href="#" class="w3-bar-item w3-button">Link 1</a> 
  <a href="#" class="w3-bar-item w3-button">Link 2</a> 
  <div class="w3-dropdown-hover">
    <button class="w3-button">Dropdown
      <i class="fa fa-caret-down"></i>
    </button>
    <div class="w3-dropdown-content w3-bar-block">
      <a href="#" class="w3-bar-item w3-button">Link</a>
      <a href="#" class="w3-bar-item w3-button">Link</a>
    </div>
  </div> 
  <a href="#" class="w3-bar-item w3-button">Link 3</a> 
</div> */}

          <div class="sidebar">
            <Scrollbar
              style={{ color: "black" }}
              className="App"
              autoHide
              removeTracksWhenNotUsed
            >
              <ul>

                <li class="nav-item drop1">
                  <a class="dropdownMenu collapsed" style={{ color: 'white' }} href=""
                    data-toggle="collapse" data-target="#submenu1" >
                    <i class="fas fa-tachometer-alt" style={{ fontSize: '1.3rem' }}></i> <span class="d-none d-sm-inline">
                      Dashboard</span></a>
                  <div class="collapse" id="submenu1" aria-expanded="false">
                    <ul class="flex-column pl-2 nav">
                      <li class="nav-item">
                        <a className="nav-link py-0" href="/analysis"><i class="fa fa-pie-chart" aria-hidden="true" /><span>Analysis</span></a>
                      </li>
                      <li class="nav-item">
                        <a className="nav-link py-0" href="/Dashboard"><i class="fa fa-globe" aria-hidden="true" /><span>Dashboard</span></a>
                      </li>

                    </ul>
                  </div>
                </li>

                <li class="nav-item drop3">
                  <a class="dropdownMenu collapsed" style={{ color: 'white' }} href=""
                    data-toggle="collapse" data-target="#submenu3">
                    <i class="fa fa-address-card" style={{ fontSize: '1.3rem' }}></i> <span class="d-none d-sm-inline">
                      Customer</span></a>
                  <div class="collapse" id="submenu3" aria-expanded="false">
                    <ul class="flex-column pl-2 nav">
                      <li class="nav-item">
                        <a hidden={checkObj.checkCustomerSearch == true ? true : false} className="nav-link py-0" href="/CustomerSearch"><i class="fa fa-user-circle" aria-hidden="true" /><span>Customer Search</span></a>
                      </li>
                      <li class="nav-item">
                        <a hidden={checkObj.checkRiskWeightageMaster == true ? true : false} className="nav-link py-0" href="/risk_weightage_master"><i class="fa fa-check-circle" aria-hidden="true" /><span>Risk Weightage Master</span></a>
                      </li>
                      <li class="nav-item">
                        <a hidden={checkObj.checkDueDeligenceMaster == true ? true : false} className="nav-link py-0" href="/due_deligence_master"><i class="fa fa-flag" aria-hidden="true" /><span >Due Diligence Master</span></a>
                      </li>

                      <li class="nav-item">
                        <a hidden={checkObj.checkDeDupConfig == true ? true : false} className="nav-link py-0" href="/de_dup_Config"><i class="fa fa-flag" aria-hidden="true" /><span >DE-DUP CONFIGURATION</span></a>
                      </li>

                      <li class="nav-item">
                        <a hidden={checkObj.checkTravelLog == true ? true : false} className="nav-link py-0" href="/travel_log"><i class="fa fa-user-circle" aria-hidden="true" /><span>Travel Log</span></a>
                      </li>

                      <li class="nav-item">
                        <a hidden={checkObj.checkConfirmedFraudReport == true ? true : false} className="nav-link py-0" href="/monitor"><i class="fa fa-flag" aria-hidden="true" /><span >Monitoring</span></a>
                      </li>

                    </ul>
                  </div>
                </li>

                <li class="nav-item drop4">
                  <a class="dropdownMenu collapsed" style={{ color: 'white' }} href=""
                    data-toggle="collapse" data-target="#submenu4" >
                    <i class="fas fa-briefcase" style={{ fontSize: '1.3rem' }}></i> <span class="d-none d-sm-inline">
                      Business</span></a>
                  <div class="collapse" id="submenu4" aria-expanded="false">
                    <ul class="flex-column pl-2 nav">
                      <li class="nav-item">
                        <a hidden={checkObj.checkSwiftMessageConfiguration == true ? true : false} className="nav-link py-0" href="/swift_message_configuration"><i class="fa fa-flag" aria-hidden="true" /><span>Swift Message Configuration</span></a>
                      </li>
                      <li class="nav-item">
                        <a className="nav-link py-0" href="/eod_configuration_master"><i class="fa fa-briefcase" aria-hidden="true" /><span>EOD Configuration Master</span></a>
                      </li>
                      <li class="nav-item">
                        <a hidden={checkObj.checkBannedMaterialMaster == true ? true : false} className="nav-link py-0" href="/banned_material_master"><i class="fa fa-check-circle" aria-hidden="true" /><span>Banned Material Master</span></a>
                      </li>
                      <li class="nav-item">
                        <a hidden={checkObj.checkBannedMerchantsMaster == true ? true : false} className="nav-link py-0" href="/banned_merchants_master"><i class="fa fa-check-circle" aria-hidden="true" /><span>Banned Merchants Master</span></a>
                      </li>
                    </ul>
                  </div>
                </li>

                <li class="nav-item drop7">
                  <a class="dropdownMenu collapsed" style={{ color: 'white' }} href=""
                    data-toggle="collapse" data-target="#submenu7" >
                    <i class="fas fa-exclamation-circle" style={{ fontSize: '1.3rem' }}></i> &nbsp;&nbsp; <span class="d-none d-sm-inline">
                      Alert </span></a>
                  <div class="collapse" id="submenu7" aria-expanded="false">
                    <ul class="flex-column pl-2 nav">
                      <li class="nav-item">
                        <a hidden={checkObj.checkSimulate == true ? true : false} className="nav-link py-0" href="/simulate"><i class="fa fa-flag" aria-hidden="true" /><span >Scenario Simulation</span></a>
                      </li>
                      <li class="nav-item">
                        <a hidden={checkObj.checkAlertSearch == true ? true : false} className="nav-link py-0" href="/alert_search"><i class="fa fa-flag" aria-hidden="true" /><span >Alert Search</span></a>
                      </li>
                      <li class="nav-item">
                        <a hidden={checkObj.checkScenarioListing == true ? true : false} className="nav-link py-0" href="/scenario_listing"><i class="fa fa-flag" aria-hidden="true" /><span >Scenario Listing</span></a>
                      </li>
                      <li class="nav-item">
                        <a hidden={checkObj.checkRulesExceptionMark == true ? true : false} className="nav-link py-0" href="/rules_exception_mark"><i class="fa fa-flag" aria-hidden="true" /><span >Rules Exception Mark</span></a>
                      </li>
                      <li class="nav-item">
                        <a hidden={checkObj.checkThresholdBasedRule == true ? true : false} className="nav-link py-0" href="/treshold_Based_Rule"><i class="fa fa-flag" aria-hidden="true" /><span >Threshold Based Rule</span></a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li class="nav-item drop8">
                  <a class="dropdownMenu collapsed" style={{ color: 'white' }} href=""
                    data-toggle="collapse" data-target="#submenu8" >
                    <i class="fas fa-list-alt" style={{ fontSize: '1.3rem' }}></i> &nbsp;&nbsp;&nbsp;&nbsp; <span class="d-none d-sm-inline">
                      SDN</span></a>
                  <div class="collapse" id="submenu8" aria-expanded="false">
                    <ul class="flex-column pl-2 nav">
                      <li class="nav-item">
                        <a hidden={checkObj.checkSdnSearch == true ? true : false} className="nav-link py-0" href="/sdn_search"><i class="fa fa-search" aria-hidden="true" /><span >SDN Search</span></a>
                      </li>
                      <li class="nav-item">
                        <a hidden={checkObj.checkSdnList == true ? true : false} className="nav-link py-0" href="/sdn_list"><i class="fa fa-upload" aria-hidden="true" /><span >SDN Upload</span></a>
                      </li>
                      <li class="nav-item">
                        <a hidden={checkObj.checkInternalList == true ? true : false} className="nav-link py-0" href="/internal_list"><i class="fa fa-upload" aria-hidden="true" /><span >Internal List</span></a>
                      </li>
                      <li class="nav-item">
                        <a hidden={checkObj.checkNoiseWords == true ? true : false} className="nav-link py-0" href="/noise_words"><i class="fa fa-file-word-o" aria-hidden="true" /><span >Noise Words</span></a>
                      </li>

                    </ul>
                  </div>
                </li>

                <li class="nav-item drop10">
                  <a class="dropdownMenu collapsed" style={{ color: 'white' }} href=""
                    data-toggle="collapse" data-target="#submenu10" >
                    <i class="fas fa-tachometer-alt" style={{ fontSize: '1.3rem' }}></i>&nbsp;&nbsp; <span class="d-none d-sm-inline">
                      Case </span></a>
                  <div class="collapse" id="submenu10" aria-expanded="false">
                    <ul class="flex-column pl-2 nav">
                      <li class="nav-item">
                        <a hidden={checkObj.checkCaseSearch == true ? true : false} className="nav-link py-0" href="/case_search"><i class="fa fa-search" aria-hidden="true" /><span >Case Search</span></a>
                      </li>
                      <li class="nav-item">
                        <a hidden={checkObj.checkStrctr == true ? true : false} className="nav-link py-0" href="/str_ctr"><i class="fa fa-flag" aria-hidden="true" /><span >STR CTR Report</span></a>
                      </li>
                      <li class="nav-item">
                      </li>


                    </ul>
                  </div>
                </li>
                <li class="nav-item drop5">
                  <a class="dropdownMenu collapsed" style={{ color: 'white' }} href=""
                    data-toggle="collapse" data-target="#submenu5" >
                    <i class="fa fa-flag" style={{ fontSize: '1.3rem' }}></i> <span class="d-none d-sm-inline">
                      Report</span></a>
                  <div class="collapse" id="submenu5" aria-expanded="false">
                    <ul class="flex-column pl-2 nav">
                      <li class="nav-item">
                        <a hidden={checkObj.checkConfirmedFraudReport == true ? true : false} className="nav-link py-0" href="/confirmed_fraud_report"><i class="fa fa-flag" aria-hidden="true" /><span>Confirmed Case Report</span></a>
                      </li>

                      <li class="nav-item">
                        <a hidden={checkObj.checkCaseListing == true ? true : false} className="nav-link py-0" href="/case_listing"><i class="fa fa-flag" aria-hidden="true" /><span >Case Listing</span></a>
                      </li>
                      <li class="nav-item">
                        <a hidden={checkObj.checkAlertStatusReport == true ? true : false} className="nav-link py-0" href="/alert_status_report"><i class="fa fa-flag" aria-hidden="true" /><span >Alert Status Report </span></a>
                      </li>
                      <li class="nav-item">
                        <a hidden={checkObj.checkAlertViolationStatistics == true ? true : false} className="nav-link py-0" href="/alert_violation_statistics"><i class="fa fa-flag" aria-hidden="true" /><span>Alert Violaton Statistics</span></a>
                      </li>
                      <li class="nav-item">
                        <a hidden={checkObj.checkFalsePositiveReport == true ? true : false} className="nav-link py-0" href="/false_positive_report"><i class="fa fa-flag" aria-hidden="true" /><span >False Positive Report</span></a>
                      </li>
                      <li class="nav-item">
                        <a hidden={checkObj.checkChannelWiseAlertSummary == true ? true : false} className="nav-link py-0" href="/Channel_wise_alert"><i class="fa fa-flag" aria-hidden="true" /><span >Channel Wise Alert Summary</span></a>
                      </li>
                      <li class="nav-item">
                        <a hidden={checkObj.checkCustomerRiskMovement == true ? true : false} className="nav-link py-0" href="/customer_risk_movement"><i class="fa fa-flag" aria-hidden="true" /><span >Customer Risk Movement</span></a>
                      </li>
                      <li class="nav-item">
                        <a hidden={checkObj.checkActiveAlertListing == true ? true : false} className="nav-link py-0" href="/active_alert_listing"><i class="fa fa-flag" aria-hidden="true" /><span >Active Alert Listing</span></a>
                      </li>
                      <li class="nav-item">
                        <a hidden={checkObj.checkTeamPerformanceReport == true ? true : false} className="nav-link py-0" href="/Team_performance_report"><i class="fa fa-flag" aria-hidden="true" /><span >Team Performance Report</span></a>
                      </li>

                    </ul>
                  </div>
                </li>

                <li class="nav-item drop9">
                  <a class="dropdownMenu collapsed" style={{ color: 'white' }} href=""
                    data-toggle="collapse" data-target="#submenu9" >
                    <i class="fas fa-sort-amount-desc" style={{ fontSize: '1.3rem' }}></i>&nbsp;&nbsp;&nbsp; <span class="d-none d-sm-inline">
                      Audit</span></a>
                  <div class="collapse" id="submenu9" aria-expanded="false">
                    <ul class="flex-column pl-2 nav">
                      <li class="nav-item">
                        <a hidden={checkObj.checkUserAuditReport == true ? true : false} className="nav-link py-0" href="/user_audit_report"><i class="fa fa-flag" aria-hidden="true" /><span >User Audit Report</span></a>
                      </li>
                      <li class="nav-item">
                        <a hidden={checkObj.checkActivityAuditReport == true ? true : false} className="nav-link py-0" href="/activity_audit_report"><i class="fa fa-flag" aria-hidden="true" /><span >Activity Audit Report</span></a>
                      </li>
                      <li class="nav-item">
                        <a hidden={checkObj.checkAlertUpdationAuditReport == true ? true : false} className="nav-link py-0" href="/alert_updation_audit"><i class="fa fa-flag" aria-hidden="true" /><span >Alert Updation Audit Report</span></a>
                      </li>


                    </ul>
                  </div>
                </li>

                <li class="nav-item drop2">
                  <a class="dropdownMenu collapsed" style={{ color: 'white' }} href=""
                    data-toggle="collapse" data-target="#submenu2">
                    <i class="fa fa-user-plus" style={{ fontSize: '1.3rem' }}></i> <span class="d-none d-sm-inline">
                      Administration</span></a>
                  <div class="collapse" id="submenu2" aria-expanded="false">
                    <ul class="flex-column pl-2 nav">
                      <li class="nav-item">
                        <a hidden={checkObj.checkBankMaster == true ? true : false} className="nav-link py-0" href="/bank_master"><i class="fa fa-university" aria-hidden="true" /><span >Bank Master</span></a>
                      </li>
                      <li class="nav-item">
                        <a hidden={checkObj.checkBankparameter == true ? true : false} className="nav-link py-0" href="/bank_parameter"><i class="fa fa-university" aria-hidden="true"></i><span >Bank Parameter</span></a>
                      </li>
                      <li class="nav-item">
                        <a hidden={checkObj.checkBranchmanagement == true ? true : false} className="nav-link py-0" href="/branch_management"><i class="fa fa-briefcase" aria-hidden="true" /><span>Branch Management </span></a>
                      </li>
                      <li class="nav-item">
                        <a hidden={checkObj.checkLookupmanagement == true ? true : false} className="nav-link py-0" href="/lookUp"><i class="fa fa-tasks" aria-hidden="true" /><span >LookUp Management</span></a>
                      </li>
                      <li class="nav-item">
                        <a hidden={checkObj.checkBranchParameter == true ? true : false} className="nav-link py-0" href="/branch_parameter"><i class="fa fa-briefcase" aria-hidden="true" /><span>Branch Parameter</span></a>
                      </li>
                      <li class="nav-item">
                        <a hidden={checkObj.checkRolemanagement == true ? true : false} className="nav-link py-0" href="/role"><i class="fa fa-user-plus" aria-hidden="true" /><span >Role Master</span></a>
                      </li>
                      <li class="nav-item">
                        <a hidden={checkObj.checkListUsermanagement == true ? true : false} className="nav-link py-0" href="/user"><i class="fa fa-user" aria-hidden="true" /><span >User Management</span></a>
                      </li>
                      <li class="nav-item">
                        <a hidden={checkObj.checkGroupMaintain == true ? true : false} className="nav-link py-0" href="/group"><i class="fa fa-users" aria-hidden="true" /><span >Group Master</span></a>
                      </li>
                      <li class="nav-item">
                        <a hidden={checkObj.checkBranchHolidayMaster == true ? true : false} className="nav-link py-0" href="/holiday"><i class="fa fa-calendar-check-o" aria-hidden="true" /><span >Holiday Master</span></a>
                      </li>
                      <li class="nav-item">
                        <a hidden={checkObj.checkUserHierarchy == true ? true : false} className="nav-link py-0" href="/user_hierarchy"><i class="fa fa-user-plus" aria-hidden="true" /><span >User Hierarchy Maintenace</span></a>
                      </li>
                      <li class="nav-item">
                        <a hidden={checkObj.checkRoleRights == true ? true : false} className="nav-link py-0" href="/role_rights"><i class="fa fa-user-plus" aria-hidden="true" /><span >Role Rights</span></a>
                      </li>
                    </ul>
                  </div>
                </li>

                <li class="nav-item drop6">
                  <a class="dropdownMenu collapsed" style={{ color: 'white' }} href=""
                    data-toggle="collapse" data-target="#submenu6" >
                    <i class="fa fa-bars" style={{ fontSize: '1.3rem' }} ></i> <span class="d-none d-sm-inline">
                      System</span></a>
                  <div class="collapse" id="submenu6" aria-expanded="false">
                    <ul class="flex-column pl-2 nav">
                      <li class="nav-item">
                        <a hidden={checkObj.checkCountryMaster == true ? true : false} className="nav-link py-0" href="/Country"><i class="fa fa-globe" aria-hidden="true" /><span >Country Master</span></a>
                      </li>
                      <li class="nav-item">
                        <a hidden={checkObj.checkStateMaster == true ? true : false} className="nav-link py-0" href="/state"><i class="fa fa-area-chart" aria-hidden="true" /><span >State Master</span></a>
                      </li>
                      <li class="nav-item">
                        <a hidden={checkObj.checkCityMaster == true ? true : false} className="nav-link py-0" href="/city"><i class="fa fa-id-card" aria-hidden="true" /><span>City Master</span></a>
                      </li>
                      <li class="nav-item">
                        <a hidden={checkObj.checkCurrencyMaster == true ? true : false} className="nav-link py-0" href="/currency"><i class="fa fa-inr" aria-hidden="true" /><span>Currency Master</span></a>
                      </li>

                    </ul>
                  </div>
                </li>

                <li class="nav-item ">
                  <a class="dropdownMenu collapsed" style={{ color: 'white' }} href=""
                    data-toggle="collapse" data-target="#submenu11" >
                    <i class="fas  fa-user-circle" style={{ fontSize: '1.3rem' }}></i> &nbsp;&nbsp;&nbsp;<span class="d-none d-sm-inline">
                      Logout</span></a>
                  <div class="collapse" id="submenu11" aria-expanded="false">
                    <ul class="flex-column pl-2 nav">

                      <li class="nav-item">
                        <a className="nav-link py-0" href="/"><i class="fa fa-user-circle" aria-hidden="true" /><span>Logout</span></a>
                      </li>
                    </ul>
                  </div>
                </li>

              </ul>
            </Scrollbar>
          </div>
          {/* <div className="sidebar">
        <ul>
          <li className="nav-item drop1">
          
                
                          







          
          </li>

        </ul>
      </div> */}
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  debugger
  const { bankcode } = state.bankMaster

  //  const {menuList} =localStorage.getItem("logindata")
  //  console.log("localStorage.getItem",localStorage.getItem("logindata"))
  //console.log("menuList",menuList)

  return {
    bankcode,
    // menulists:menuList,
  }
}

export default connect(mapStateToProps)(universal)

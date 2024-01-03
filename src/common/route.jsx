import React from 'react'
import { BrowserRouter as Router , Route } from 'react-router-dom'
import Login from '../common/login'

import Dashboard from '../Dashboard/Dashboard'
import Analysis from '../Analytics/analysis'

import BankMater from '../Master/bank_master'
import Country from '../Master/country'
import Bank_parameter from '../Master/bank_parameter'
import State from '../Master/state'
import City from '../Master/city'
import Currency from '../Master/currency'
import LookUp from '../Master/lookUp'
import Role from '../Master/role'
import Group from '../Master/group'
import Branch from '../Master/branch_management'
import Branch_parameter from '../Master/branch_parameter'
import User from '../Master/user'
import Holiday from '../Master/branch_holiday'
import RoleRights from './../Master/role_rights'
import CustomerSearch from '../Customer/CustomerSearch'
import ViewCustomers from '../Customer/View_customers'
import CreateCase from '../Customer/createCase'
import Example from '../example'
import user_hierarchy from '../Component/USER/user_hierarchy'
import due_deligence_master from '../Master/due_deligence_master'
import sdn_search from '../Sdn/sdn_search'
import sdn_list from '../Sdn/sdn_list'
import risk_weightage_master from '../Sdn/risk_weightage_master'
import travel_log from '../Reports/travel_log'
import de_dup_Config from '../Reports/de_dup_Config'
import internal_list from '../Master/internal_list'
import noise_words from '../Master/noise_words'
import banned_material_master from '../Master/banned_material_master'
import banned_merchants_master from '../Master/banned_merchants_master'
import EOD_Configuration_master from '../Master/eod_configuration_master'

import confirmed_fraud_report from '../Reports/confirmed_fraud_report'
import case_listing from '../Reports/case_listing'
import monitor from '../Reports/monitor'
import alert_status_report from '../Reports/alert_status_report'
import alert_violation_statistics from '../Reports/alert_violation_statistics'
import false_positive_report from '../Reports/false_positive_report'
import Channel_Wise_Alert from '../Reports/Channel_wise_alert' 
import Customer_risk_movement from '../Reports/customer_risk_movement'
import Active_alert_listing from '../Reports/active_alert_listing'
import Team_Performance_Report from '../Reports/Team_performance_report'
import Case_Search from '../Customer/case_search'
import View_Case from '../Customer/ViewCase'
import STR_CTR from '../Reports/str_ctr'
import Activity_Audit_Report from '../AUDIT/activity_audit_report'
import Alert_Updation_Audit from '../AUDIT/alert_updation_audit'
import User_Audit_Report from '../AUDIT/user_audit_report'
import Simulate from '../Alert Management/simulate'
import Alert_Search from '../Alert Management/alert_search'
import Scenario_Listing from '../Alert Management/scenario_listing'
import Rules_Exception_Mark from '../Alert Management/rules_exception_mark'
import Scenario_Add from '../Alert Management/scenario_add'
import Travel_Logs from '../Reports/travel_logs'


import Swift_Message_Configuration from '../Others/swift_message_configuration'

import Alert_Monitor from '../Analytics/alert_monitor'
import Alert_Statistics from '../Analytics/alert_statistics'
import Alert_Classification from '../Analytics/alert_classification'
import Branch_Risk_Monitor from '../Analytics/branch_risk_monitor'
import Risk_Heat_Map from '../Analytics/risk_heat_map'
import Key_Performance_Indicator from '../Analytics/key_performance_indicator'

import Transaction_Table from '../Customer/transactiontable'
import Threshold_Based_Rule from '../Alert Management/treshold_Based_Rule'
import De_Dup_Process from '../Others/de_Dup_Process'
import AlertId from '../Dashboard/AlertId'
import ViewCase from '../Dashboard/ViewCase'

 const Routes = () => (
    <Router>
      <div>
      <Route exact path="/"  component={Login}/>
      <Route exact path="/alert_id"  component={AlertId}/>
      <Route exact path="/ViewCases"  component={ViewCase}/>
      <Route exact path="/bank_master"  component={BankMater}/>
      <Route exact path="/bank_parameter"  component={Bank_parameter}/>
      <Route exact path="/Country"  component={Country}/>
      <Route exact path="/state"  component={State}/>
      <Route exact path="/city"  component={City}/>
      <Route exact path="/currency"  component={Currency}/>
      <Route exact path="/lookUp"  component={LookUp}/>
      <Route exact path="/role"  component={Role}/>
      <Route exact path="/group"  component={Group}/>
      <Route exact path="/branch_management"  component={Branch}/>
      <Route exact path="/branch_parameter"  component={Branch_parameter}/>
      <Route exact path="/user"  component={User}/>
      <Route exact path="/holiday"  component={Holiday}/>
      <Route exact path="/role_rights"  component={RoleRights}/>
      <Route exact path="/user_hierarchy"  component={user_hierarchy}/>
      <Route exact path="/due_deligence_master"  component={due_deligence_master}/>
      <Route exact path="/confirmed_fraud_report"  component={confirmed_fraud_report}/>
      <Route exact path="/case_listing"  component={case_listing}/>
      <Route exact path="/monitor"  component={monitor}/>
      <Route exact path="/risk_weightage_master"  component={risk_weightage_master}/>
      <Route exact path="/travel_log"  component={travel_log}/>
      <Route exact path="/de_dup_Config"  component={de_dup_Config}/>
      <Route exact path="/sdn_search"  component={sdn_search}/>
      <Route exact path="/sdn_list"  component={sdn_list}/>
      <Route exact path="/case_search"  component={Case_Search}/>
      <Route exact path="/ViewCase"  component={View_Case}/>
      <Route exact path="/eod_configuration_master"  component={EOD_Configuration_master}/>

      
      <Route exact path="/Dashboard"  component={Dashboard}/>
      <Route exact path="/analysis"  component={Analysis}/>

      <Route exact path="/alert_monitor"  component={Alert_Monitor}/>
      <Route exact path="/alert_statistics"  component={Alert_Statistics}/>
      <Route exact path="/alert_classification"  component={Alert_Classification}/>
      <Route exact path="/branch_risk_monitor"  component={Branch_Risk_Monitor}/>
      <Route exact path="/risk_heat_map"  component={Risk_Heat_Map}/>
      <Route exact path="/key_performance_indicator"  component={Key_Performance_Indicator}/>

      <Route exact path="/swift_message_configuration"  component={Swift_Message_Configuration}/>

      <Route exact path="/travel_logs"  component={Travel_Logs}/>

      <Route exact path="/CustomerSearch"  component={CustomerSearch}/>
      <Route exact path="/View_customers"  component={ViewCustomers}/>
      <Route exact path="/createCase"  component={CreateCase}/>
      <Route exact path="/example"  component={Example}/>
      <Route exact path="/alert_status_report"  component={alert_status_report}/>
      <Route exact path="/alert_violation_statistics"  component={alert_violation_statistics}/>
      <Route exact path="/false_positive_report"  component={false_positive_report}/>
      <Route exact path="/internal_list"  component={internal_list}/>
      <Route exact path="/noise_words"  component={noise_words}/>
      <Route exact path="/banned_material_master"  component={banned_material_master}/>
      <Route exact path="/banned_merchants_master"  component={banned_merchants_master}/>
    
      <Route exact path="/Channel_wise_alert"  component={Channel_Wise_Alert}/>
      <Route exact path="/customer_risk_movement"  component={Customer_risk_movement}/>
      <Route exact path="/active_alert_listing"  component={Active_alert_listing}/>
      <Route exact path="/Team_performance_report"  component={Team_Performance_Report}/>
      <Route exact path="/str_ctr"  component={STR_CTR}/>
      <Route exact path="/activity_audit_report"  component={Activity_Audit_Report}/>
      <Route exact path="/user_audit_report"  component={User_Audit_Report}/>
      <Route exact path="/alert_updation_audit"  component={Alert_Updation_Audit}/>

      <Route exact path="/simulate"  component={Simulate}/>
      <Route exact path="/alert_search"  component={Alert_Search}/>
      <Route exact path="/scenario_listing"  component={Scenario_Listing}/>
      <Route exact path="/scenario_add"  component={Scenario_Add}/>
      <Route exact path="/rules_exception_mark"  component={Rules_Exception_Mark}/>

      <Route exact path="/transactiontable"  component={Transaction_Table}/>
      <Route exact path="/treshold_Based_Rule"  component={Threshold_Based_Rule}/>
      <Route exact path="/de_Dup_Process"  component={De_Dup_Process}/>


      </div>
      </Router>
);
export default Routes
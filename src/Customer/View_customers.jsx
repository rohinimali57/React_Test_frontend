import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Universal from '../common/universal'
import { connect } from 'react-redux'
import { handlegetCustomers, handlegetCustomersAccount, handlegetTransactionSearch } from '../actions/customer'
import { handleTransactionRiskProfile, handleRiskGraphData, handleKYCRiskProfile } from '../actions/dedup'
import Chart from 'react-google-charts';
import axios from 'axios';


class View_customers extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchbutton: true,
            customertransactionlists: [{
                txnNo: '123',
                txnCreatedDtTm: '2023-01-15 08:30:00',
                Particulars: 'Purchase',
                txnAmount: 150.00,
                txnType: 'Debit'
            },
            {
                txnNo: '456',
                txnCreatedDtTm: '2023-02-05 14:45:00',
                Particulars: 'Withdrawal',
                txnAmount: 200.00,
                txnType: 'Debit'
            },
            {
                txnNo: '789',
                txnCreatedDtTm: '2023-03-20 10:10:00',
                Particulars: 'Deposit',
                txnAmount: 50.00,
                txnType: 'Credit'
            },
            {
                txnNo: '101',
                txnCreatedDtTm: '2023-04-10 16:20:00',
                Particulars: 'Transfer',
                txnAmount: 300.00,
                txnType: 'Debit'
            },
            {
                txnNo: '202',
                txnCreatedDtTm: '2023-05-18 09:00:00',
                Particulars: 'Payment',
                txnAmount: 100.00,
                txnType: 'Credit'
            },
            {
                txnNo: '303',
                txnCreatedDtTm: '2023-06-25 11:30:00',
                Particulars: 'Purchase',
                txnAmount: 75.00,
                txnType: 'Debit'
            },],
            Customersacclist: [{
                acctNo: '123456',
                createdBy: 'John Doe',
                acctType: 'Savings',
                acctBaseBr: 'Branch A',
                acctStatus: 'Active',
                acctCreatedDt: '2023-01-15',
                acctOprnMode: 'Online',
                acctHasNominee: 'Yes'
            },
            {
                acctNo: '789012',
                createdBy: 'Jane Smith',
                acctType: 'Checking',
                acctBaseBr: 'Branch B',
                acctStatus: 'Inactive',
                acctCreatedDt: '2023-02-20',
                acctOprnMode: 'In-person',
                acctHasNominee: 'No'
            },
            {
                acctNo: '345678',
                createdBy: 'Robert Johnson',
                acctType: 'Savings',
                acctBaseBr: 'Branch C',
                acctStatus: 'Active',
                acctCreatedDt: '2023-03-10',
                acctOprnMode: 'Online',
                acctHasNominee: 'No'
            },
            // ... more customer data objects
            {
                acctNo: '901234',
                createdBy: 'Alice Brown',
                acctType: 'Investment',
                acctBaseBr: 'Branch D',
                acctStatus: 'Active',
                acctCreatedDt: '2023-08-05',
                acctOprnMode: 'Online',
                acctHasNominee: 'Yes'
            },
            {
                acctNo: '567890',
                createdBy: 'David Clark',
                acctType: 'Savings',
                acctBaseBr: 'Branch E',
                acctStatus: 'Active',
                acctCreatedDt: '2023-06-25',
                acctOprnMode: 'In-person',
                acctHasNominee: 'Yes'
            }],
            getApiData: [{
                transactionNo: 1,
                transactionDate: '2023-08-01',
                Particulars: 'Purchase',
                Amount: 100,
                Type: 'Credit',
                Edit: 'Edit',
                MCC: '12345'
            },
            {
                transactionNo: 2,
                transactionDate: '2023-08-02',
                Particulars: 'Withdrawal',
                Amount: 50,
                Type: 'Debit',
                Edit: 'Edit',
                MCC: '67890'
            },
            {
                transactionNo: 3,
                transactionDate: '2023-08-03',
                Particulars: 'Deposit',
                Amount: 200,
                Type: 'Credit',
                Edit: 'Edit',
                MCC: '54321'
            },
            {
                transactionNo: 4,
                transactionDate: '2023-08-04',
                Particulars: 'Transfer',
                Amount: 75,
                Type: 'Debit',
                Edit: 'Edit',
                MCC: '98765'
            },],
            transactiondata: {
                "acctNo": "",
                "cashflowType": "",
                "transactionAmount": "",
                "toDate": "",
                "fromDate": "",
                "operator": "",

                // token : (localStorage.getItem("tokendata"))
            },
            botapidata2: {
                "acctNo": "",
                "customerName": "",
                "acctType": "",
                "acctBaseBr": "",
                "acctStatus": "",
                "acctCreatedDt": "",
                "acctOprnMode": "",
                "acctHasNominee": "",
                token: (localStorage.getItem("tokendata"))
            },
        }
    }


    componentDidMount = async () => {
        debugger
        let custCodes = "this.props.location.state";
        var custCode = "custCodes.custCode"
        var branchCode = "custCodes.baseBrCode"
        console.log("urlQuery", custCode)
        var token = (localStorage.getItem("tokendata"))
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,

        }
        this.props.dispatch(handlegetCustomers(custCode, headers));
        this.props.dispatch(handlegetCustomersAccount(custCode, headers));
        this.props.dispatch(handleTransactionRiskProfile(custCode, branchCode, headers));
        this.props.dispatch(handleRiskGraphData(custCode, branchCode, headers));
        this.props.dispatch(handleKYCRiskProfile(custCode, branchCode, headers));


        //    this.saveStateMaster();

    }

    FindTransaction = async () => {
        debugger
        let custCodes = this.props.location.state;
        console.log("data---", custCodes)
        //var stateData = this.state.transactiondata;
        var acctNo = this.state.transactiondata.acctNo
        var custCode = custCodes
        var cashflowType = this.state.transactiondata.cashflowType
        var transactionAmount = this.state.transactiondata.transactionAmount
        var toDate = this.state.transactiondata.toDate
        var fromDate = this.state.transactiondata.fromDate
        var operator = this.state.transactiondata.operator
        // var bankcode = (localStorage.getItem("bankdata"))
        var token = (localStorage.getItem("tokendata"))

        const headers = {
            //   'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            //   'bankCode': bankcode,
            // 'branchcode': 'A1000-01',
            // 'currentdate': "2020/09/04",
            // 'defaultlang': 'Eng',
            // 'currancy': 'INR',
            // 'userid': '101'
        }
        this.props.dispatch(handlegetTransactionSearch(acctNo, cashflowType, transactionAmount, toDate, fromDate, operator, custCode, headers));

    }

    transactionNo = (row, cell) => {
        return (
            <div style={{ color: 'blue' }} onClick={() => this.SaveApiData1(row)}>
                <a href="">  {cell.txnNo} </a>
            </div>
        )
    }

    SaveApiData1 = (row) => {
        debugger
        var custcodes = this.props.location.state
        var cust = custcodes.custCode
        console.log("bb", cust)
        var txn_no = {}
        txn_no.txn_no = row
        txn_no.custCode = cust
        this.props.history.push('/Transactiontable', txn_no);

    }


    SaveApiData = () => {
        this.props.history.push('/createCase');
    }

    handleChange = (e) => {
        var botapidata1 = this.state.transactiondata
        botapidata1[e.target.id] = e.target.value
        this.setState({ transactiondata: botapidata1 });
    }
    Save = () => {
        var token = (localStorage.getItem("tokendata"))

        // Logic to collect form data and prepare for saving
        const headers = {
            //   'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            //nbg   'bankCode': bankcode,
            // 'branchcode': 'A1000-01',
            // 'currentdate': "2020/09/04",
            // 'defaultlang': 'Eng',
            // 'currancy': 'INR',
            // 'userid': '101'
        }
        // this.props.dispatch(handleKYCRiskProfile(custCode, branchCode, headers));
        axios.post('/saveRiskProfile', FormData)
            .then(response => {
                console.log(response.data);
                // Handle success, reset form, show success message, etc.
            })
            .catch(error => {
                console.error('Error saving data:', error);
                // Handle error, show error message, etc.
            });
    };
    render() {
        const { location } = this.props;
        const { customerdetails } = location.state;
        console.log("SDFdfs==>", customerdetails);

        let optionTemplate = this.props.Customersacclist.map(value => (
            <option value={value.acctNo}>{value.acctNo}</option>
        ));
        const dummyChartData = [
            ['Transaction Type', 'Count Percentage'],
            ['ATM Withdrawal', 65],
            ['Inward Clearing', 10],
            ['Cash Deposits', 25],
        ];
        const kycData = [
            { riskParameter: 'Country of Origin', riskValue: 'Pakistan', weightage: '10%', Status: '...' },
            // Add more rows...
        ];


        const trData = [
            { riskParameter: 'ATM Withdrawal', riskValue: '65%', weightage: '50%', Status: '...' },
            // Add more rows...
        ];

        const trendData = [
            { riskParameter: 'Credit Deviation', riskValue: '162', weightage: '-', Status: '...' },
            // Add more rows...
        ];

        const ruleData = [
            { riskParameter: 'High', riskValue: '15', weightage: '-', Status: '...' },
            // Add more rows...
        ];

        return (
            <React.Fragment>
                <Universal />
                <section id="main-content">
                    <section className="wrapper">
                        <div>
                            <table align="center" width="95%" border="1px solid black" style={{ margin: 14, marginLeft: -10 }}>
                                <thead>
                                    <tr style={{ textAlign: 'center', color: 'white', background: 'rgb(48, 57, 116)' }}>
                                        <th>Customer Number</th>
                                        <th>Customer Name</th>
                                        <th>PEP Status</th>
                                        <th>Country Risk</th>
                                    </tr>
                                </thead>
                                <tbody style={{ color: 'blue' }}>
                                    <tr>
                                        <td width="23%">{customerdetails.custCode}</td>
                                        <td width="40%">{customerdetails.customerName}</td>
                                        <td width="18%">{customerdetails.isPEP}</td>
                                        <td width="19%">{customerdetails.riskManual}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <Tabs>
                                <section className="content">
                                    <div className="row">
                                        <div className="col-xs-12 col-xs-12 margin-top-minus15">
                                            <div className="nav-tabs-custom">
                                                <TabList style={{ backgroundColor: '#ecf0f5' }} >
                                                    <Tab activeTabPanelClassName="active" id="CompanyDetailsTab" >Customer Profile </Tab>
                                                    <Tab activeTabPanelClassName="active" id="CompanyDetailsTab" >Account Profile </Tab>
                                                    <Tab activeTabPanelClassName="active" id="CompanyDetailsTab"   >Transaction Profile </Tab>
                                                    <Tab activeTabPanelClassName="active" id="CompanyDetailsTab"  >Risk Profile </Tab>
                                                    <Tab activeTabPanelClassName="active" id="CompanyDetailsTab"  >Investigation History </Tab>
                                                    <Tab activeTabPanelClassName="active" id="CompanyDetailsTab"  >Auxilary Information </Tab>
                                                    {/* <Tab activeTabPanelClassName="active" id="CompanyDetailsTab" >Simulate </Tab> */}

                                                </TabList>
                                                <TabPanel>
                                                    <React.Fragment>
                                                        <form>

                                                            {/* <section className=" content-header"> */}

                                                            <div class="container">
                                                                <div class="table-responsive">
                                                                    <table align="left" width="90%" border="1px solid black" style={{ margin: 30 }} >
                                                                        <thead>
                                                                            <tr>
                                                                                <th colSpan="4" style={{ textAlign: 'left', color: 'white', background: 'rgb(48, 57, 116)' }}>Customer Details</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody style={{ color: 'black', fontWeight: 'bold' }}>
                                                                            <tr>
                                                                                <td width="20%" >Name</td>
                                                                                <td >
                                                                                    <div className="form-group col-md-10 min-height30">
                                                                                        <input className="form-control" id="assignedUser" value={customerdetails.customerName} title="Header Color" type="text" >

                                                                                        </input>
                                                                                    </div>
                                                                                </td>
                                                                                <td width="20%" >Short_Name</td>
                                                                                <td >
                                                                                    <div className="form-group col-md-10 min-height30">
                                                                                        <input className="form-control" id="assignedUser" value={customerdetails.customerFName} title="Header Color" type="text" />
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td width="20%" >Address Line1</td>
                                                                                <td >
                                                                                    <div className="form-group col-md-10 min-height30">
                                                                                        <input className="form-control" id="assignedUser" value={customerdetails.addr1} title="Header Color" type="text" />
                                                                                    </div>
                                                                                </td>
                                                                                <td width="20%" >Address Line2</td>
                                                                                <td >
                                                                                    <div className="form-group col-md-10 min-height30">
                                                                                        <input className="form-control" id="assignedUser" value={customerdetails.addr2} title="Header Color" type="text" />
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td width="20%" >Address Line3</td>
                                                                                <td >
                                                                                    <div className="form-group col-md-10 min-height30">
                                                                                        <input className="form-control" id="assignedUser" value={customerdetails.addr3} title="Header Color" type="text" />
                                                                                    </div>
                                                                                </td>
                                                                                <td width="20%" >Address Line4</td>
                                                                                <td >
                                                                                    <div className="form-group col-md-10 min-height30">
                                                                                        <input className="form-control" id="assignedUser" value={customerdetails.addr3} title="Header Color" type="text" />
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td width="20%" >State </td>
                                                                                <td >
                                                                                    <div className="form-group col-md-10 min-height30">
                                                                                        <input className="form-control" id="assignedUser" value={customerdetails.state} title="Header Color" type="text" />
                                                                                    </div>
                                                                                </td>
                                                                                <td width="20%" >Phone Number </td>
                                                                                <td >
                                                                                    <div className="form-group col-md-10 min-height30">
                                                                                        <input className="form-control" id="assignedUser" value={customerdetails.mobileNo} title="Header Color" type="text" />
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td width="20%" >Zip Code</td>
                                                                                <td >
                                                                                    <div className="form-group col-md-10 min-height30">
                                                                                        <input className="form-control" id="assignedUser" value={customerdetails.postalCode} title="Header Color" type="text" />
                                                                                    </div>
                                                                                </td>
                                                                                <td width="20%" >Customer Credit Line </td>
                                                                                <td >
                                                                                    <div className="form-group col-md-10 min-height30">
                                                                                        <input className="form-control" id="assignedUser" title="Header Color" type="text" />
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td width="20%" >National Id No</td>
                                                                                <td >
                                                                                    <div className="form-group col-md-10 min-height30">
                                                                                        <input className="form-control" id="assignedUser" value={customerdetails.nationalId1} title="Header Color" type="text" />
                                                                                    </div>
                                                                                </td>
                                                                                <td width="20%" >Date of Birth</td>
                                                                                <td >
                                                                                    <div className="form-group col-md-10 min-height30">
                                                                                        <input className="form-control" id="assignedUser" value={customerdetails.customerDOB} title="Header Color" type="text" />
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td width="20%" >Employer Name</td>
                                                                                <td >
                                                                                    <div className="form-group col-md-10 min-height30">
                                                                                        <input className="form-control" id="assignedUser" value={customerdetails.employersName} title="Header Color" type="text" />
                                                                                    </div>
                                                                                </td>
                                                                                <td width="20%" >Business Phone No</td>
                                                                                <td >
                                                                                    <div className="form-group col-md-10 min-height30">
                                                                                        <input className="form-control" id="assignedUser" value={customerdetails.phoneNo} title="Header Color" type="text" />
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td width="20%" >Customer Status</td>
                                                                                <td >
                                                                                    <div className="form-group col-md-10 min-height30">
                                                                                        <input className="form-control" id="assignedUser" value={customerdetails.customerStatus} title="Header Color" type="text" />
                                                                                    </div>
                                                                                </td>
                                                                                <td width="20%" >Nationality</td>
                                                                                <td >
                                                                                    <div className="form-group col-md-10 min-height30">
                                                                                        <input className="form-control" id="assignedUser" value={customerdetails.nationality} title="Header Color" type="text" />
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td width="20%" >Sex</td>
                                                                                <td >
                                                                                    <div className="form-group col-md-10 min-height30">
                                                                                        <input className="form-control" id="assignedUser" value={customerdetails.customerGender} title="Header Color" type="text" />
                                                                                    </div>
                                                                                </td>
                                                                                <td width="20%" >Martial Status</td>
                                                                                <td >
                                                                                    <div className="form-group col-md-10 min-height30">
                                                                                        <input className="form-control" id="assignedUser" title="Header Color" type="text" />
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td width="20%" >No. Of Dependents</td>
                                                                                <td >
                                                                                    <div className="form-group col-md-10 min-height30">
                                                                                        <input className="form-control" id="assignedUser" value={customerdetails.noOfDependants} title="Header Color" type="text" />
                                                                                    </div>
                                                                                </td>
                                                                                <td width="20%" >Type Of Bank Account</td>
                                                                                <td >
                                                                                    <div className="form-group col-md-10 min-height30">
                                                                                        <input className="form-control" id="assignedUser" value={customerdetails.typeOfBusiness} title="Header Color" type="text" />
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td width="20%" >Risk Score</td>
                                                                                <td >
                                                                                    <div className="form-group col-md-10 min-height30">
                                                                                        <input className="form-control" id="assignedUser" value={customerdetails.customerRiskCalc} title="Header Color" type="text" />
                                                                                    </div>
                                                                                </td>
                                                                                <td width="20%" >Customer Category</td>
                                                                                <td >
                                                                                    <div className="form-group col-md-10 min-height30">
                                                                                        <input className="form-control" id="assignedUser" value={customerdetails.customerCategory} title="Header Color" type="text" />
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td width="20%"> Guarantor Suitability</td>
                                                                                <td >
                                                                                    <div className="form-group col-md-10 min-height30">
                                                                                        <input className="form-control" id="assignedUser" title="Header Color" type="text" />
                                                                                    </div>
                                                                                </td>
                                                                                <td width="20%" >Home Owner</td>
                                                                                <td >
                                                                                    <div className="form-group col-md-10 min-height30">
                                                                                        <input className="form-control" id="assignedUser" title="Header Color" type="text" />
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td width="20%" >Joint Owner</td>
                                                                                <td >
                                                                                    <div className="form-group col-md-10 min-height30">
                                                                                        <input className="form-control" id="assignedUser" title="Header Color" type="text" />
                                                                                    </div>
                                                                                </td>
                                                                                <td width="20%" >Type of Residence</td>
                                                                                <td >
                                                                                    <div className="form-group col-md-10 min-height30">
                                                                                        <input className="form-control" id="assignedUser" title="Header Color" type="text" />
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td width="20%" >Period of Residence</td>
                                                                                <td >
                                                                                    <div className="form-group col-md-10 min-height30">
                                                                                        <input className="form-control" id="assignedUser" title="Header Color" type="text" />
                                                                                    </div>
                                                                                </td>
                                                                                <td width="20%" >Local Expenditure Zone Code</td>
                                                                                <td >
                                                                                    <div className="form-group col-md-10 min-height30">
                                                                                        <input className="form-control" id="assignedUser" title="Header Color" type="text" />
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td width="20%" >Occupation Code</td>
                                                                                <td >
                                                                                    <div className="form-group col-md-10 min-height30">
                                                                                        <input className="form-control" id="assignedUser" title="Header Color" type="text" />
                                                                                    </div>
                                                                                </td>
                                                                                <td width="20%" >Year in Current Employement</td>
                                                                                <td >
                                                                                    <div className="form-group col-md-10 min-height30">
                                                                                        <input className="form-control" id="assignedUser" value={customerdetails.yearsOfService} title="Header Color" type="text" />
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td width="20%" >Type of Employer Code</td>
                                                                                <td >
                                                                                    <div className="form-group col-md-10 min-height30">
                                                                                        <input className="form-control" id="assignedUser" title="Header Color" type="text" />
                                                                                    </div>
                                                                                </td>
                                                                                <td width="20%" >Direct Mail Indicator</td>
                                                                                <td >
                                                                                    <div className="form-group col-md-10 min-height30">
                                                                                        <input className="form-control" id="assignedUser" title="Header Color" type="text" />
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td width="20%" >Billing Cycle</td>
                                                                                <td >
                                                                                    <div className="form-group col-md-10 min-height30">
                                                                                        <input className="form-control" id="assignedUser" title="Header Color" type="text" />
                                                                                    </div>
                                                                                </td>
                                                                                <td width="20%" >Tax exemption No.</td>
                                                                                <td >
                                                                                    <div className="form-group col-md-10 min-height30">
                                                                                        <input className="form-control" id="assignedUser" title="Header Color" type="text" />
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td width="20%" >Address expiration Details</td>
                                                                                <td >
                                                                                    <div className="form-group col-md-10 min-height30">
                                                                                        <input className="form-control" id="assignedUser" title="Header Color" type="text" />
                                                                                    </div>
                                                                                </td>
                                                                                <td width="20%" >Statement usage</td>
                                                                                <td >
                                                                                    <div className="form-group col-md-10 min-height30">
                                                                                        <input className="form-control" id="assignedUser" title="Header Color" type="text" />
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td width="20%" >Card Mailer Usage</td>
                                                                                <td >
                                                                                    <div className="form-group col-md-10 min-height30">
                                                                                        <input className="form-control" id="assignedUser" title="Header Color" type="text" />
                                                                                    </div>
                                                                                </td>
                                                                                <td width="20%" >PIN Mailer Usage</td>
                                                                                <td >
                                                                                    <div className="form-group col-md-10 min-height30">
                                                                                        <input className="form-control" id="assignedUser" title="Header Color" type="text" />
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td width="20%" >Collection Usage</td>
                                                                                <td >
                                                                                    <div className="form-group col-md-10 min-height30">
                                                                                        <input className="form-control" id="assignedUser" title="Header Color" type="text" />
                                                                                    </div>
                                                                                </td>
                                                                                <td width="20%" >Direct Mail Usage</td>
                                                                                <td >
                                                                                    <div className="form-group col-md-10 min-height30">
                                                                                        <input className="form-control" id="assignedUser" title="Header Color" type="text" />
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td width="20%" >Member Since</td>
                                                                                <td >
                                                                                    <div className="form-group col-md-10 min-height30">
                                                                                        <input className="form-control" id="assignedUser" title="Header Color" type="text" />
                                                                                    </div>
                                                                                </td>
                                                                                <td width="20%" >Overlimit Percentage</td>
                                                                                <td >
                                                                                    <div className="form-group col-md-10 min-height30">
                                                                                        <input className="form-control" id="assignedUser" title="Header Color" type="text" />
                                                                                    </div>
                                                                                </td>
                                                                            </tr>

                                                                            <tr>
                                                                                <td width="20%" >Customer Income</td>
                                                                                <td >
                                                                                    <div className="form-group col-md-10 min-height30">
                                                                                        <input className="form-control" id="assignedUser" value={customerdetails.currAnnualIncome} title="Header Color" type="text" />
                                                                                    </div>
                                                                                </td>
                                                                                <td width="20%" >National ID No.</td>
                                                                                <td >
                                                                                    <div className="form-group col-md-10 min-height30">
                                                                                        <input className="form-control" id="assignedUser" value={customerdetails.nationalId1} title="Header Color" type="text" />
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td width="20%" >Permanent Credit Limit</td>
                                                                                <td >
                                                                                    <div className="form-group col-md-10 min-height30">
                                                                                        <input className="form-control" id="assignedUser" title="Header Color" type="text" />
                                                                                    </div>
                                                                                </td>
                                                                                <td width="20%" >Current Credit Limit</td>
                                                                                <td >
                                                                                    <div className="form-group col-md-10 min-height30">
                                                                                        <input className="form-control" id="assignedUser" title="Header Color" type="text" />
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td width="20%" >Temporial Credit Limit</td>
                                                                                <td >
                                                                                    <div className="form-group col-md-10 min-height30">
                                                                                        <input className="form-control" id="assignedUser" title="Header Color" type="text" />
                                                                                    </div>
                                                                                </td>
                                                                                <td width="20%" >Effective Date</td>
                                                                                <td >
                                                                                    <div className="form-group col-md-10 min-height30">
                                                                                        <input className="form-control" id="assignedUser" value={customerdetails.modifiedDate} title="Header Color" type="text" />
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td width="20%" colspan="4" >
                                                                                    <div className=" min-height30" />
                                                                                </td>
                                                                            </tr>

                                                                            {/* <div className="row has-shadow mt-3" style={{borderRadius: '1rem',width:'94%', backgroundColor: 'white', marginTop: '5rem',marginLeft: '29px'}}>
                <button type="button" id="Reset" style={{borderColor: '#303974', marginLeft:'85%',backgroundColor: '#303974', fontSize: '15px'}} onClick={() => this.getApiData()} 
                        className="btn btn-primary " > Download File </button>
                     
                                        </div> */}

                                                                            <tr style={{ textAlign: 'center' }}>
                                                                                <td colSpan="4" >
                                                                                    <button type="button" id="Reset" style={{ borderColor: '#303974', backgroundColor: '#303974', fontSize: '15px' }} onClick={() => this.SaveApiData()}
                                                                                        className="btn btn-primary " > Create Case </button>
                                                                                    {/* <button type="button" id="Save" className="btn btn-primary " onClick={() => this.SaveApiData()}>Create Case</button> */}
                                                                                    {/* <button type="button" id="Save" className="btn btn-primary " onClick={() => this.SaveApiData()}>Reset</button> */}

                                                                                </td>

                                                                            </tr>

                                                                        </tbody>
                                                                    </table>

                                                                </div>
                                                            </div>

                                                            {/* </section><br/><br/> */}
                                                        </form>
                                                    </React.Fragment>
                                                </TabPanel>
                                                <TabPanel>
                                                    <section class="wrapper">
                                                        <section className="content">
                                                            <BootstrapTable
                                                                data={this.state.Customersacclist}
                                                                //   pagination={true}
                                                                // search
                                                                ClearSearchButton
                                                            //  exportCSV

                                                            //    trClassName={this.rowClassNameFormat}
                                                            >

                                                                <TableHeaderColumn dataField="acctNo" csvHeader="First Name" isKey={true} className={"columnHeaderColor"}
                                                                    expandable={false} editable={false} width="100px">Account Number
                                                                </TableHeaderColumn>

                                                                <TableHeaderColumn dataField="createdBy" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                                                                    expandable={false} editable={false} width="100px">Name</TableHeaderColumn>

                                                                <TableHeaderColumn dataField="acctType" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                                                                    expandable={false} editable={false} width="100px">Type</TableHeaderColumn>

                                                                <TableHeaderColumn dataField="acctBaseBr" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                                                                    expandable={false} editable={false} width="100px">Branch</TableHeaderColumn>

                                                                <TableHeaderColumn dataField='acctStatus' expandable={false} editable={false} width="50px" > Status</TableHeaderColumn>

                                                                <TableHeaderColumn dataField='acctCreatedDt' expandable={false} editable={false} width="50px" > Open Date</TableHeaderColumn>


                                                                <TableHeaderColumn dataField='acctOprnMode' expandable={false} editable={false} width="50px" > Operation Mode</TableHeaderColumn>
                                                                <TableHeaderColumn dataField='acctHasNominee' expandable={false} editable={false} width="50px" > NomineeYN</TableHeaderColumn>



                                                            </BootstrapTable>
                                                        </section>
                                                    </section>
                                                </TabPanel>
                                                <TabPanel>
                                                    <React.Fragment>
                                                        <form>
                                                            {/* <div>
                                                                <table align="left" width="95%" border="1px solid black" style={{ margin: 30 }}>
                                                                    <thead>
                                                                        <tr style={{ textAlign: 'center', color: 'white', background: '#94D1D4' }}>
                                                                            <th colspan="7">Transaction Details</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                         <tr>

                                                                            <td>Select Account</td>
                                                                            <td>
                                                                                <div className="form-group">
                                                                                    <select className="form-control select2 " id="acctNo" onChange={this.handleChange}
                                                                                        value={this.state.transactiondata.acctNo != "" ? this.state.transactiondata.acctNo : ""}>
                                                                                        <option value="">select</option>
                                                                                        {optionTemplate}
                                                                                    </select>
                                                                                </div>
                                                                            </td>
                                                                            <td > </td>
                                                                            <td >
                                                                            </td>

                                                                        </tr> 
                                                                        <tr>

                                                                            <td>Transaction From</td>
                                                                            <td>
                                                                                <input type="date" name="bday" id="fromDate" onChange={this.handleChange}
                                                                                    value={this.state.transactiondata.fromDate != "" ? this.state.transactiondata.fromDate : ""} /> <span class="glyphicon glyphicon-calendar"></span>
                                                                            </td>
                                                                            <td >Till</td>
                                                                            <td >
                                                                                <input type="date" name="bday" id="toDate" onChange={this.handleChange}
                                                                                    value={this.state.transactiondata.toDate != "" ? this.state.transactiondata.toDate : ""} /> <span class="glyphicon glyphicon-calendar"></span>
                                                                            </td>

                                                                        </tr>
                                                                        <tr>

                                                                            <td>Amount</td>
                                                                            <td>
                                                                                <div className="form-group col-md-3 min-height80">
                                                                                    <select className="form-control select2" id="operator" onChange={this.handleChange}
                                                                                        value={this.state.transactiondata.operator != "" ? this.state.transactiondata.operator : ""} >
                                                                                        <option value=""> Select </option>
                                                                                        <option value=">"> &gt; </option>
                                                                                        <option value="<"> &lt; </option>
                                                                                        <option value="="> = </option>
                                                                                    </select>
                                                                                    &nbsp;&nbsp;&nbsp;
                                                                                    <input className="select2" id="transactionAmount" title="Header Color" type="let" placeholder="100000.00" onChange={this.handleChange}
                                                                                        value={this.state.transactiondata.transactionAmount != "" ? this.state.transactiondata.transactionAmount : ""} />



                                                                                </div>

                                                                            </td>
                                                                            <td>Cashflow</td>
                                                                            <td >
                                                                                <div className="form-group">
                                                                                    <select className="form-control select2 " id="cashflowType"
                                                                                        onChange={this.handleChange}
                                                                                        value={this.state.transactiondata.cashflowType != "" ? this.state.transactiondata.cashflowType : ""}>
                                                                                        <option value="">select</option>
                                                                                        <option value="Both">Both</option>

                                                                                        <option value="DR">DR</option>
                                                                                        <option value="CR">CR</option>
                                                                                    </select>
                                                                                </div>
                                                                            </td>


                                                                        </tr>
                                                                        <tr>
                                                                            <td></td>
                                                                            <td>

                                                                            </td>
                                                                            <td></td>

                                                                            <td rowSpan="2">
                                                                                {this.state.searchbutton == true ?
                                                                                    <button type="button" id="Save" style={{ borderColor: '#303974', backgroundColor: '#303974', fontSize: '15px' }} className="btn btn-primary " onClick={() => this.FindTransaction()}>Search</button> : ""}
                                                                                <button type="button" id="Save" className="btn btn-primary " onClick={() => this.SaveApiData()}>Reset</button> 

                                                                            </td>

                                                                        </tr>
                                                                    </tbody>
                                                                </table>

                                                            </div> */}
                                                            <div className="row" style={{ marginLeft: '10px' }}>
                                                                <div className="col-lg-9 main-chart">
                                                                    <section className="dashboard-counts no-padding-bottom">
                                                                        <div className="container-fluid" style={{ marginTop: '-1rem' }}>
                                                                            <h1 style={{ fontSize: '22px', color: 'rgb(48, 57, 116)', marginLeft: '1rem', fontFamily: 'LATO-BOLD', borderBottom: '1px solid rgb(233, 236, 239)' }}>Transaction Details</h1>
                                                                            <div className="container-fluid1">
                                                                                <div className="row bg-blue has-shadow mt-3" style={{ borderRadius: '1rem', background: 'rgb(201, 204, 223)' }}>
                                                                                    <div className="col-12 col-md-2 col-lg-2 rightCol">
                                                                                        <p style={{ fontWeight: 'bolder', color: 'white', fontSize: '15px' }}>Select Amount</p>
                                                                                    </div>
                                                                                    <div className="col-12 col-md-4">
                                                                                        <div className="form-group">
                                                                                            <select id="city" title="Country" className="form-select form-select-sm minimal heightForm" style={{ width: '100%', height: 'auto' }}>
                                                                                                <option value="">Select Account</option>
                                                                                                <option value="Pune">89453498</option>
                                                                                                <option value="Aurangabad">45453566</option>
                                                                                            </select>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-11  col-lg-2 rightCol">
                                                                                        <p className="" style={{ fontWeight: 'bolder', color: 'white', fontSize: '15px' }}>Cash Flow</p>
                                                                                    </div>
                                                                                    <div className="col-12 col-md-4">
                                                                                        <div className="form-group">
                                                                                            <select id="city" title="Country" className="form-select form-select-sm minimal heightForm" style={{ width: '100%', height: 'auto' }}>
                                                                                                <option value="">select</option>
                                                                                                <option value="Both">Both</option>
                                                                                                <option value="DR">DR</option>
                                                                                                <option value="CR">CR</option>
                                                                                            </select>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-12 col-md-2 col-lg-2 rightCol">
                                                                                        <p style={{ fontWeight: 'bolder', color: 'white', fontSize: '15px' }}>From Date</p>
                                                                                    </div>
                                                                                    <div className="col-12 col-md-4">
                                                                                        <div className="form-group">
                                                                                            <input type="date" id="customerName" placeholder="Customer/Employee Name" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size="5" value="" style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-11  col-lg-2 rightCol">
                                                                                        <p className="" style={{ fontWeight: 'bolder', color: 'white', fontSize: '15px' }}>Till Date</p>
                                                                                    </div>
                                                                                    <div className="col-12 col-md-4">
                                                                                        <div className="form-group">
                                                                                            <input type="date" id="customerName" placeholder="Account Number" className="form-control inputField glowing-border" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size="5" style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-12 col-md-2 col-lg-2 rightCol">
                                                                                        <p style={{ fontWeight: 'bolder', color: 'white', fontSize: '15px' }}>Amount</p>
                                                                                    </div>
                                                                                    <div className="col-12 col-md-4">
                                                                                        <div className="form-group">
                                                                                            <select id="city" title="Country" className="form-select form-select-sm minimal heightForm" style={{ width: '100%', height: 'auto' }}>
                                                                                                <option value=">">&gt;</option>
                                                                                                <option value="<">&lt;</option>
                                                                                                <option value="=">=</option>
                                                                                            </select>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-12 col-md-2 col-lg-2 rightCol">
                                                                                        <p style={{ fontWeight: 'bolder', color: 'white', fontSize: '15px' }}></p>
                                                                                    </div>
                                                                                    <div className="col-12 col-md-4">
                                                                                        <div className="form-group">
                                                                                            <input type="text" id="countryOfReg" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" size="5" value="100000" style={{ height: 'calc(1em + 0.75rem + 2px)', marginRight: '1rem' }} />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="row pull-right" style={{ marginLeft: '691px', marginTop: '-1rem' }}>
                                                                                        <div className="pr-3">
                                                                                            <button type="button" className="btn btn-primary" id="Reset" style={{ float: 'right', marginTop: '1rem', backgroundColor: 'rgb(255, 255, 255)', borderColor: 'rgb(255, 255, 255)', color: 'black', fontSize: '14px' }}>Reset</button>
                                                                                        </div>
                                                                                        <div className="pr-3">
                                                                                            <button type="button" className="btn btn-primary" id="Reset" style={{ float: 'right', marginTop: '1rem', backgroundColor: 'rgb(255, 255, 255)', borderColor: 'rgb(255, 255, 255)', color: 'black', fontSize: '14px' }}>Search</button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </section>
                                                                </div>
                                                            </div>
                                                            <div>

                                                                {/* <TabPanel>
                                                                    <div class="container">

                                                                        <div class="leftpane2" style={{ border: '1px solid #ADB3B6' }}>
                                                                            <Chart
                                                                                width={'100%'}
                                                                                height={'500px'}
                                                                                chartType="LineChart"
                                                                                loader={<div>Loading Chart</div>}
                                                                                data={[
                                                                                    [
                                                                                        'Day',
                                                                                        'Total Credit',
                                                                                        'Total Debit',

                                                                                    ],
                                                                                    ['Day1', 241, 150],
                                                                                    ['Day2', 254, 210],
                                                                                    ['Day3', 151, 270],
                                                                                    ['Day4', 275, 265],
                                                                                    ['Day5', 415, 166],
                                                                                    ['Day6', 215, 266],
                                                                                    ['Day7', 200, 350],
                                                                                ]}
                                                                                options={{
                                                                                    // title: 'Alert Monitor',
                                                                                    vAxis: { title: 'Values' },
                                                                                    hAxis: { title: 'Days' },
                                                                                    // seriesType: 'line',
                                                                                    // legend: 'none',
                                                                                }}
                                                                            />




                                                                            &nbsp;

                                                                        </div>
                                                                    </div>
                                                                </TabPanel> */}
                                                            </div>
                                                            <section class="wrapper">
                                                                <section className="content">

                                                                    <BootstrapTable
                                                                        data={this.state.customertransactionlists}
                                                                    //    pagination={true}
                                                                    // search
                                                                    // ClearSearchButton
                                                                    // exportCSV
                                                                    // trClassName={this.rowClassNameFormat}
                                                                    >

                                                                        {/* <TableHeaderColumn dataFormat={this.actionMethod4} dataField="Description " csvHeader="Last Name"  className={"columnHeaderColor"} dataSort={true}
                           expandable={false} editable={false}   width="100px">Select</TableHeaderColumn> */}

                                                                        <TableHeaderColumn dataFormat={this.transactionNo} dataField="txnNo" isKey={true} csvHeader="First Name" className={"columnHeaderColor"}
                                                                            expandable={false} editable={false} width="60px">Transaction No

                                                                        </TableHeaderColumn>

                                                                        {/* <TableHeaderColumn dataFormat={this.cardType} dataField="Description " csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                           expandable={false} editable={false}   width="100px"></TableHeaderColumn> */}

                                                                        <TableHeaderColumn dataField="txnCreatedDtTm" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                                                                            expandable={false} editable={false} width="80px">Transaction Date</TableHeaderColumn>

                                                                        <TableHeaderColumn dataField="Particulars" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                                                                            expandable={false} editable={false} width="60px">Particulars</TableHeaderColumn>

                                                                        <TableHeaderColumn dataField="txnAmount" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                                                                            expandable={false} editable={false} width="60px"> Amount</TableHeaderColumn>

                                                                        <TableHeaderColumn dataField="txnType" csvHeader="txnType" className={"columnHeaderColor"} dataSort={true}
                                                                            expandable={false} editable={false} width="40px">Transaction Type</TableHeaderColumn>
                                                                        {/* <TableHeaderColumn  dataField="type1" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                           expandable={false} editable={false} width="10px"></TableHeaderColumn> */}
                                                                        {/* 
                           <TableHeaderColumn dataFormat={this.actionMethod} dataField="Edit" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                           expandable={false} editable={false} width="50px">Create Case</TableHeaderColumn> */}
                                                                    </BootstrapTable>

                                                                </section>
                                                            </section>
                                                        </form>

                                                    </React.Fragment>
                                                </TabPanel>
                                                <TabPanel>
                                                    <section class="wrapper">
                                                        <section className="content">
                                                            <div class="container" style={{ marginTop: '-100px' }}>
                                                                <form>
                                                                    {/* <section className=" content-header">
                                                                        <div>
                                                                            <div className="col-md-12 col-sm-12 col-xs-12 pull-left no-L-padding" style={{ backgroundColor: "#C8D0F0" }}>
                                                                            </div>
                                                                        </div>
                                                                    </section> */}
                                                                    <div className="leftpane3" style={{ border: '2px solid black' }}>
                                                                        <div >
                                                                            <table align="left" width="50%" style={{ margin: '30px' }}>
                                                                                <div>
                                                                                    <svg className="speedometer" width="300px" height="300px" style={{ width: '300px', height: '300px' }}>
                                                                                        <g className="arc" transform="translate(150, 150)">
                                                                                            {/* Path elements for speedo-segment */}
                                                                                            <path className="speedo-segment" fill="rgb(0, 128, 0)" d="M-130,-1.5A130,130,0,0,1,-64.9,-112.5L-34.9,-60.6A70,70,0,0,0,-70,0Z"></path>
                                                                                            <path className="speedo-segment" fill="rgb(114, 170, 0)" d="M-64.9,-112.5A130,130,0,0,1,65,-112.5L35,-60.6A70,70,0,0,0,-35,-60.6Z"></path>
                                                                                            <path className="speedo-segment" fill="rgb(213, 142, 0)" d="M65,-112.5A130,130,0,0,1,130,0L70,0A70,70,0,0,0,35,-60.6Z"></path>
                                                                                        </g>
                                                                                    </svg>


                                                                                </div>
                                                                            </table>
                                                                            <section className="content" style={{ marginLeft: '-130px' }}>
                                                                                <div className="col-xs-14">
                                                                                    <div className="box-body no-LR-padding expandcontentscell"></div>
                                                                                </div>
                                                                            </section>
                                                                        </div>
                                                                    </div>
                                                                    &nbsp;
                                                                    <div className="rightpane2" style={{ border: '2px solid black' }}>
                                                                        <div>
                                                                            <table align="left" width="50%" style={{ margin: '30px' }}>
                                                                                <div style={{ height: '300px', width: '400px' }}>
                                                                                    <div id="reactgooglegraph-1" className="" style={{ height: '300px', width: '400px' }}>
                                                                                        <div style={{ position: 'relative' }}>
                                                                                            <div id="reactgooglegraph-1" className="" style={{ height: '300px', width: '400px' }}>
                                                                                                <Chart
                                                                                                    width={'100%'}
                                                                                                    height={'100%'}
                                                                                                    chartType="BarChart"
                                                                                                    loader={<div>Loading Chart</div>}
                                                                                                    data={dummyChartData}
                                                                                                    options={{
                                                                                                        title: 'Transaction Type Risk (Previous Month)',
                                                                                                        hAxis: { title: 'Transaction Type', titleTextStyle: { color: '#333' } },
                                                                                                        vAxis: { minValue: 0 },
                                                                                                        legend: 'none',
                                                                                                    }}
                                                                                                    rootProps={{ 'data-testid': '1' }}
                                                                                                />
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </table>
                                                                            <section className="content">
                                                                                <div className="col-xs-14">
                                                                                    <div className="box-body no-LR-padding expandcontentscell"></div>
                                                                                </div>
                                                                            </section>
                                                                        </div>
                                                                    </div>
                                                                    <section className="content">
                                                                        <div className="row">
                                                                            <div className="col-xs-12">
                                                                                <div className="box">
                                                                                    <div className="box-body  no-LR-padding expandcontentscell">
                                                                                        <h4 class="thick" style={{ color: 'blue' }}>KYC Risk</h4>
                                                                                        <BootstrapTable
                                                                                            // data={this.props.kyclist}
                                                                                            data={kycData}
                                                                                        pagination={true}
                                                                                        //  search
                                                                                        //  ClearSearchButton
                                                                                        //   exportCSV

                                                                                        //    trClassName={this.rowClassNameFormat}  
                                                                                        >
                                                                                            <TableHeaderColumn dataSort={true} dataField="riskParameter" isKey={true} className={"columnHeaderColor"}
                                                                                                expandable={false} editable={false} width="30px">KYC Parameter </TableHeaderColumn>

                                                                                            <TableHeaderColumn dataField="riskValue" className={"columnHeaderColor"} dataSort={true}
                                                                                                expandable={false} editable={false} width="30px">KYC Value</TableHeaderColumn>


                                                                                            <TableHeaderColumn dataField="weightage" className={"columnHeaderColor"} dataSort={true}
                                                                                                expandable={false} editable={false} width="30px">Weightage</TableHeaderColumn>

                                                                                            <TableHeaderColumn csvHeader="Status" className={"columnHeaderColor"} dataSort={true}
                                                                                                expandable={false} dataField="Status" editable={false} width="10px" ></TableHeaderColumn>

                                                                                        </BootstrapTable>
                                                                                        <h4 class="thick" style={{ color: 'blue' }}>Transaction Type Risk(Previous Month) </h4>
                                                                                        <BootstrapTable
                                                                                            // data={this.props.trlists}
                                                                                            data={trData}
                                                                                        pagination={true}
                                                                                        //  search
                                                                                        //  ClearSearchButton
                                                                                        //   exportCSV

                                                                                        //    trClassName={this.rowClassNameFormat}  
                                                                                        >
                                                                                            <TableHeaderColumn dataSort={true} dataField="riskParameter" isKey={true} className={"columnHeaderColor"}
                                                                                                expandable={false} editable={false} width="30px">Transaction Type </TableHeaderColumn>

                                                                                            <TableHeaderColumn dataField="riskValue" className={"columnHeaderColor"} dataSort={true}
                                                                                                expandable={false} editable={false} width="30px">Count Percentage</TableHeaderColumn>


                                                                                            <TableHeaderColumn dataField="weightage" className={"columnHeaderColor"} dataSort={true}
                                                                                                expandable={false} editable={false} width="30px">Weightage</TableHeaderColumn>

                                                                                            <TableHeaderColumn dataFormat={this.actionMethod} csvHeader="Status" className={"columnHeaderColor"} dataSort={true}
                                                                                                expandable={false} dataField="Status" editable={false} width="10px" ></TableHeaderColumn>

                                                                                        </BootstrapTable>
                                                                                        <h4 class="thick" style={{ color: 'blue' }}>Transaction Trend Risk (3 Months Trend)</h4>
                                                                                        <BootstrapTable
                                                                                            // data={this.props.trlists}
                                                                                            data={trendData}
                                                                                        pagination={true}
                                                                                        //  search
                                                                                        //  ClearSearchButton
                                                                                        //   exportCSV

                                                                                        //    trClassName={this.rowClassNameFormat}  
                                                                                        >
                                                                                            <TableHeaderColumn dataSort={true} dataField="riskParameter" isKey={true} className={"columnHeaderColor"}
                                                                                                expandable={false} editable={false} width="30px"> Trend Deviation </TableHeaderColumn>

                                                                                            <TableHeaderColumn dataField="riskValue" className={"columnHeaderColor"} dataSort={true}
                                                                                                expandable={false} editable={false} width="30px">Value</TableHeaderColumn>


                                                                                            <TableHeaderColumn dataField="weightage" className={"columnHeaderColor"} dataSort={true}
                                                                                                expandable={false} editable={false} width="30px">Weightage</TableHeaderColumn>

                                                                                            <TableHeaderColumn dataFormat={this.actionMethod} csvHeader="Status" className={"columnHeaderColor"} dataSort={true}
                                                                                                expandable={false} dataField="Status" editable={false} width="10px" ></TableHeaderColumn>

                                                                                        </BootstrapTable>
                                                                                        <h4 class="thick" style={{ color: 'blue' }}>Rule Violation Risk (6 Months)</h4>
                                                                                        <BootstrapTable
                                                                                            // data={this.props.trlists}
                                                                                            data={ruleData}
                                                                                        pagination={true}
                                                                                        //  search
                                                                                        //  ClearSearchButton
                                                                                        //   exportCSV

                                                                                        //    trClassName={this.rowClassNameFormat}  
                                                                                        >
                                                                                            <TableHeaderColumn dataSort={true} dataField="riskParameter" isKey={true} className={"columnHeaderColor"}
                                                                                                expandable={false} editable={false} width="30px">Rule Severity </TableHeaderColumn>

                                                                                            <TableHeaderColumn dataField="riskValue" className={"columnHeaderColor"} dataSort={true}
                                                                                                expandable={false} editable={false} width="30px"> Violation Count</TableHeaderColumn>


                                                                                            <TableHeaderColumn dataField="weightage" className={"columnHeaderColor"} dataSort={true}
                                                                                                expandable={false} editable={false} width="30px">Weightage</TableHeaderColumn>

                                                                                            <TableHeaderColumn dataFormat={this.actionMethod} csvHeader="Status" className={"columnHeaderColor"} dataSort={true}
                                                                                                expandable={false} dataField="Status" editable={false} width="10px" ></TableHeaderColumn>

                                                                                        </BootstrapTable>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </section>
                                                                </form>
                                                            </div>
                                                        </section>
                                                    </section>
                                                </TabPanel>
                                                <TabPanel>
                                                    <section class="wrapper">
                                                        <section className="content">

                                                            <BootstrapTable
                                                                data={this.state.getApiData}
                                                                //    pagination={true}
                                                                // search
                                                                ClearSearchButton
                                                            //  exportCSV

                                                            //    trClassName={this.rowClassNameFormat}
                                                            >
                                                                <TableHeaderColumn dataFormat={this.transactionNo} dataField="Description" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                                                                    expandable={false} editable={false} width="50px">Transaction No.</TableHeaderColumn>

                                                                <TableHeaderColumn dataField="transactionDate" csvHeader="First Name" isKey={true} className={"columnHeaderColor"}
                                                                    expandable={false} editable={false} width="60px">Transaction Date</TableHeaderColumn>

                                                                <TableHeaderColumn dataField="Particulars" csvHeader="Last Name" className={"columnHeaderColor"} dataSort={true}
                                                                    expandable={false} editable={false} width="100px">Particulars</TableHeaderColumn>





                                                                <TableHeaderColumn dataField="Amount" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                                                                    expandable={false} editable={false} width="50px">Amount</TableHeaderColumn>

                                                                <TableHeaderColumn dataField="Type" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                                                                    expandable={false} editable={false} width="50px">Type </TableHeaderColumn>

                                                                <TableHeaderColumn dataFormat={this.merchantName} dataField="Edit" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                                                                    expandable={false} editable={false} width="80px">Alert Id (A)</TableHeaderColumn>

                                                                <TableHeaderColumn dataFormat={this.MCC} dataField="Edit" csvHeader="Login-Id" className={"columnHeaderColor"} dataSort={true}
                                                                    expandable={false} editable={false} width="100px">Case Id (B)</TableHeaderColumn>




                                                            </BootstrapTable>

                                                        </section>
                                                    </section>
                                                </TabPanel>
                                                <TabPanel>
                                                    <div class="container">
                                                        <div class="table-responsive">
                                                            <table align="left" width="95%" border="1px solid #758080" style={{ margin: 30 }}>
                                                                <thead>
                                                                    <tr style={{ textAlign: 'center', background: 'lightblue' }}>
                                                                        <th >&nbsp;&nbsp;&nbsp;Parameter</th>
                                                                        <th>&nbsp;&nbsp;&nbsp;Status</th>
                                                                        <th>&nbsp;&nbsp;&nbsp;Remarks</th>
                                                                    </tr>


                                                                </thead>
                                                                <tbody style={{ color: 'black' }}>
                                                                    <tr>
                                                                        <td >&nbsp;&nbsp;&nbsp; Business Expansion or Deterioration</td>
                                                                        <td>&nbsp;&nbsp;&nbsp;
                                                                            <div className="form-group  ">
                                                                                <select className="form-control select2 " id="generationDate">
                                                                                    {/* <option value="">select</option> */}
                                                                                    <option value="">Expansion- Fast Pace</option>
                                                                                    <option value="">Expansion- Medium Pace</option>
                                                                                    <option value="">Expansion- Slow Pace</option>
                                                                                    <option value="">Same for Deterioration</option>
                                                                                </select>
                                                                            </div>
                                                                        </td>
                                                                        <td>&nbsp;&nbsp;&nbsp;
                                                                            <div className="form-group col-md-10 min-height30">
                                                                                <input className="form-control" title="Remarks" placeholder="Write Observation Here" type="text" />
                                                                            </div>
                                                                        </td>

                                                                    </tr>
                                                                    <tr>
                                                                        <td >&nbsp;&nbsp;&nbsp;Number of requests for Financing</td>
                                                                        <td>&nbsp;&nbsp;&nbsp;
                                                                            <div className="form-group  ">
                                                                                <select className="form-control select2 " id="generationDate">
                                                                                    {/* <option value="">select</option> */}
                                                                                    <option value="">High</option>
                                                                                    <option value="">Medium</option>
                                                                                    <option value="">Low</option>
                                                                                </select>
                                                                            </div>
                                                                        </td>
                                                                        <td>&nbsp;&nbsp;&nbsp;
                                                                            <div className="form-group col-md-10 min-height30">
                                                                                <input className="form-control" title="Remarks" placeholder="Write Observation Here" type="text" />
                                                                            </div>
                                                                        </td>

                                                                    </tr>
                                                                    <tr>
                                                                        <td >&nbsp;&nbsp;&nbsp;Investors involvement in Business </td>
                                                                        <td>&nbsp;&nbsp;&nbsp;
                                                                            <div className="form-group  ">
                                                                                <select className="form-control select2 " id="generationDate">
                                                                                    {/* <option value="">select</option> */}
                                                                                    <option value="">High</option>
                                                                                    <option value="">Medium</option>
                                                                                    <option value="">Low</option>

                                                                                </select>
                                                                            </div>
                                                                        </td>
                                                                        <td>&nbsp;&nbsp;&nbsp;
                                                                            <div className="form-group col-md-10 min-height30">
                                                                                <input className="form-control" title="Remarks" placeholder="Write Observation Here" type="text" />
                                                                            </div>
                                                                        </td>

                                                                    </tr>
                                                                    <tr>
                                                                        <td >&nbsp;&nbsp;&nbsp;Response to Bank’s Inquiry</td>
                                                                        <td>&nbsp;&nbsp;&nbsp;
                                                                            <div className="form-group  ">
                                                                                <select className="form-control select2 " id="generationDate">
                                                                                    {/* <option value="">select</option> */}
                                                                                    <option value="">Good</option>
                                                                                    <option value="">Average</option>
                                                                                    <option value="">Poor</option>
                                                                                </select>
                                                                            </div> </td>
                                                                        <td>&nbsp;&nbsp;&nbsp;
                                                                            <div className="form-group col-md-10 min-height30">
                                                                                <input className="form-control" title="Remarks" placeholder="Write Observation Here" type="text" />
                                                                            </div>
                                                                        </td>

                                                                    </tr>
                                                                    <tr>
                                                                        <td >&nbsp;&nbsp;&nbsp; New Legal Litigations in 6 months</td>
                                                                        <td>&nbsp;&nbsp;&nbsp;
                                                                            <div className="form-group  ">
                                                                                <select className="form-control select2 " id="generationDate">
                                                                                    {/* <option value="">select</option> */}
                                                                                    <option value="">Yes</option>
                                                                                    <option value="">No</option>
                                                                                </select>
                                                                            </div> </td>
                                                                        <td>&nbsp;&nbsp;&nbsp;
                                                                            <div className="form-group col-md-10 min-height30">
                                                                                <input className="form-control" title="Remarks" placeholder="Write Observation Here" type="text" />
                                                                            </div>
                                                                        </td>

                                                                    </tr>
                                                                    <tr>
                                                                        <td > &nbsp;&nbsp;&nbsp;Due Diligence Completed</td>
                                                                        <td>&nbsp;&nbsp;&nbsp;
                                                                            <div className="form-group  ">
                                                                                <select className="form-control select2 " id="generationDate">
                                                                                    {/* <option value="">select</option> */}
                                                                                    <option value="">Yes</option>
                                                                                    <option value="">No</option>
                                                                                </select>
                                                                            </div>
                                                                        </td>
                                                                        <td> &nbsp;&nbsp;&nbsp;
                                                                            <div className="form-group col-md-10 min-height30">
                                                                                <input className="form-control" title="Remarks" placeholder="Write Observation Here" type="text" />
                                                                            </div>
                                                                        </td>

                                                                    </tr>
                                                                    <tr>
                                                                        <td >&nbsp;&nbsp;&nbsp; Upward Risk Movement in 6 months</td>
                                                                        <td>&nbsp;&nbsp;&nbsp;
                                                                            <div className="form-group  ">
                                                                                <select className="form-control select2 " id="generationDate">
                                                                                    {/* <option value="">select</option> */}
                                                                                    <option value="">Yes</option>
                                                                                    <option value="">No</option>
                                                                                </select>
                                                                            </div>
                                                                        </td>
                                                                        <td>&nbsp;&nbsp;&nbsp;
                                                                            <div className="form-group col-md-10 min-height30">
                                                                                <input className="form-control" title="Remarks" placeholder="Write Observation Here" type="text" />
                                                                            </div>
                                                                        </td>

                                                                    </tr>
                                                                    <tr>
                                                                        <td >&nbsp;&nbsp;&nbsp; Acquired New Customers / Orders from Disputed Countries in 6 months</td>
                                                                        <td>&nbsp;&nbsp;&nbsp;
                                                                            <div className="form-group  ">
                                                                                <select className="form-control select2 " id="generationDate">
                                                                                    {/* <option value="">select</option> */}
                                                                                    <option value="">Yes</option>
                                                                                    <option value="">No</option>
                                                                                </select>
                                                                            </div>
                                                                        </td>
                                                                        <td>&nbsp;&nbsp;&nbsp;
                                                                            <div className="form-group col-md-10 min-height30">
                                                                                <input className="form-control" title="Remarks" placeholder="Write Observation Here" type="text" />
                                                                            </div>
                                                                        </td>

                                                                    </tr>
                                                                    <tr>
                                                                        <td >&nbsp;&nbsp;&nbsp;Blacklisted anytime in 6 months</td>
                                                                        <td>&nbsp;&nbsp;&nbsp;
                                                                            <div className="form-group  ">
                                                                                <select className="form-control select2 " id="generationDate">
                                                                                    {/* <option value="">select</option> */}
                                                                                    <option value="">Yes</option>
                                                                                    <option value="">No</option>
                                                                                </select>
                                                                            </div>
                                                                        </td>
                                                                        <td>&nbsp;&nbsp;&nbsp;
                                                                            <div className="form-group col-md-10 min-height30">
                                                                                <input className="form-control" title="Remarks" placeholder="Write Observation Here" type="text" />
                                                                            </div>
                                                                        </td>

                                                                    </tr>




                                                                </tbody>
                                                            </table>

                                                            <table align="left" width="90%" >
                                                                <thead>
                                                                    <tr style={{ textAlign: 'left' }}>
                                                                        <td colSpan="1" >
                                                                            <button type="button" id="Save" style={{ borderColor: '#303974', backgroundColor: '#303974', fontSize: '15px', marginLeft: 35 }} className="btn btn-primary " onClick={() => this.Save()}>Save</button>
                                                                            {/* <button type="button" id="Save" style={{borderColor: '#303974', backgroundColor: '#303974', fontSize: '15px'}} style={{marginLeft:35}} onClick={()=>this.Save()} className="btn btn-primary ">Save</button> */}
                                                                        </td>
                                                                    </tr>
                                                                </thead>



                                                            </table>
                                                        </div>
                                                    </div>
                                                </TabPanel>
                                            </div>

                                        </div>

                                    </div>
                                </section>
                            </Tabs>

                        </div>
                    </section>
                </section>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    debugger
    const { customersLists } = state.customerlist
    const { customersaccLists } = state.customerlist
    var customertransactionList = state.customerlist.customersTransactionLists
    const { tranctionprofilemasterList } = state.deduplist
    const { riskgraphmasterList } = state.deduplist
    const { kycriskmasterList } = state.deduplist
    console.log("customerList123", customersLists)
    console.log("tranctionprofilemasterList", tranctionprofilemasterList)

    console.log("customerList", customersLists)
    return {
        Customerlists: customersLists,
        Customersacclist: customersaccLists,
        customertransactionlists: customertransactionList,
        trlists: tranctionprofilemasterList,
        riskgraph: riskgraphmasterList,
        kyclist: kycriskmasterList
    }
}
export default connect(mapStateToProps)(View_customers)

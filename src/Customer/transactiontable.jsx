import React, { Component } from 'react'
import 'react-tabs/style/react-tabs.css'
// import Footer from './../Common/Footer'
import Universal from '../common/universal'
import { handlegetTransaction } from '../actions/customer'
// import { dummyCall } from '../../actions/dummyCall';
import { connect } from 'react-redux'

class Transactiontable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Transactionlists:{
                txnNo: '123',
                txnDtTm: '2023-01-15',
                txnCreatedDtTm: '08:30:00',
                cashflowType: 'Inflow',
                txnBranchCode: 'Branch A',
                txnAmount: 150.00,
                drPartyName: 'John Doe',
                txnType: 'Debit'
            }
        }

    }

    componentDidMount() {
        debugger
        let txnNo = this.props.location.state;
        console.log("cust", txnNo)
        var txnNumber = txnNo.txn_no
        var custCode = txnNo.custCode
        console.log("cust1", txnNumber)
        console.log("cust2", custCode)
        var bankCode = localStorage.getItem("bankdata")


        console.log("urlQuery", txnNo)
        var token = (localStorage.getItem("tokendata"))
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            'bankCode': bankCode,

        }
        this.props.dispatch(handlegetTransaction(txnNumber, custCode, headers));
        //  this.props.dispatch(dummyCall())

    }

    backFromCustomerList() {
        window.history.back();
    }
    render() {
        console.log("cust23", this.props.Transactionlists.txnNo)


        return (
            <React.Fragment>

                <Universal />
                <section id="main-content">
                    <section className="wrapper">
                        <div className="content-wrapper">

                            <form>

                                <table align="center" width="35%" border="2px solid black" style={{ margin: 26 }}>
                                    <thead>



                                        <tr>
                                            <td width="40%" class="thick" style={{ textAlign: 'left', color: 'blue', background: 'lightblue' }}>Transaction No :</td>
                                            <td >
                                                <div className="form-group col-md-12 min-height30">
                                                    {/* <input style={{ border: "1px solid black" }} className="form-control" id="assignedUser" value={this.props.Transactionlists.length>0?this.props.Transactionlists[0].txnNo:[]} title="Header Color" type="text"   /> */}
                                                    <label>{this.state.Transactionlists.txnNo}</label>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td width="40%" class="thick" style={{ textAlign: 'left', color: 'blue', background: 'lightblue' }}>Transaction Date :</td>
                                            <td >
                                                <div className="form-group col-md-12 min-height30">
                                                    <label>{this.state.Transactionlists.txnDtTm}</label>
                                                </div>
                                            </td>

                                        </tr>
                                        <tr>
                                            <td width="40%" class="thick" style={{ textAlign: 'left', color: 'blue', background: 'lightblue' }} >Transaction Time :</td>
                                            <td >
                                                <div className="form-group col-md-12 min-height30">
                                                    <label>{this.state.Transactionlists.txnCreatedDtTm}</label>
                                                </div>
                                            </td>

                                        </tr>
                                        <tr>
                                            <td width="40%" class="thick" style={{ textAlign: 'left', color: 'blue', background: 'lightblue' }}>Cashflow :</td>
                                            <td >
                                                <label>{this.state.Transactionlists.cashflowType}</label>
                                            </td>

                                        </tr>
                                        <tr>
                                            <td width="40%" class="thick" style={{ textAlign: 'left', color: 'blue', background: 'lightblue' }}>Account Base Branch :</td>
                                            <td >
                                                <label>{this.state.Transactionlists.txnBranchCode}</label>
                                            </td>

                                        </tr>

                                        {/* <tr>
  <td width="40%" class="thick" style={{textAlign: 'left', color: 'blue', background: 'lightblue'}}>Origin Country:</td>
 <td >
    <label>PK</label>
 </td>
</tr> */}
                                        <tr>
                                            <td width="40%" class="thick" style={{ textAlign: 'left', color: 'blue', background: 'lightblue' }}>Currency :</td>
                                            <td >
                                                <div className="form-group col-md-12 min-height30">
                                                    <label>INR</label>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td width="40%" class="thick" style={{ textAlign: 'left', color: 'blue', background: 'lightblue' }} >Amount :</td>
                                            <td >
                                                <div className="form-group col-md-12 min-height30">
                                                    <label>{this.state.Transactionlists.txnAmount}</label>
                                                </div>
                                            </td>

                                        </tr>

                                        <td width="40%" class="thick" style={{ textAlign: 'left', color: 'blue', background: 'lightblue' }}>Particulars:</td>
                                        <td >
                                            <label>{this.state.Transactionlists.drPartyName}</label>
                                        </td>


                                        <tr>
                                            <td width="40%" class="thick" style={{ textAlign: 'left', color: 'blue', background: 'lightblue' }}>Mode  :</td>
                                            <td >
                                                <label>{this.state.Transactionlists.txnType}</label>
                                            </td>
                                        </tr>
                                    </thead>
                                </table>



                                <div className=" pull-center">
                                    <button type="button" id="Save" title="Save" onClick={() => this.backFromCustomerList()}
                                        className="btn btn-primary">Close</button>

                                </div>

                            </form>


                        </div>
                    </section>
                </section>
                {/* <Footer/> */}
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    debugger
    const { bankcode } = state.bankMaster
    const { customersTransactionList } = state.customerlist

    console.log('TransactionLists', customersTransactionList)
    return {
        bankcode,
        Transactionlists: customersTransactionList,
    }
}
export default connect(mapStateToProps)(Transactiontable)

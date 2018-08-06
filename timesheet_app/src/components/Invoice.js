import React, {Component} from 'react'
import '../index.css'
import { connect } from 'react-redux'
import Cookies from 'universal-cookie'

import * as actionCreators from '../store/actionCreators'

const cookies = new Cookies()

class Invoice extends Component {
  constructor(props) {
    super(props)

    this.props.authUser()
    if(this.props.loggedInUser) {
      this.props.onPopulateInvoice(this.props.match.params.projectID)
  }
}


  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
     // checks current props against incoming props. This method only runs when new props are coming in. (Sign-In)
    if(!this.props.loggedInUser && nextProps.loggedInUser) {
      this.props.onPopulateInvoice(this.props.match.params.projectID)
    }
  }


  render() {
    const { loggedInUser, match, invoice} = this.props

    console.log(invoice)

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    }
    if(mm<10) {
        mm = '0'+mm
    }
    today = mm + '/' + dd + '/' + yyyy;

    return (

      this.props.loggedInUser? <div className='invoice'>
      <h1 id='invoiceTitle'>INVOICE</h1>
      <div className="invoiceTitle">
      <h2>Invoice # {match.params.projectID}</h2>
      <p>Date: {today}</p>
      </div>
      <div className="fromTo">
        <div id='billTo'>
          <h4>BILL TO: <span className="billText">{match.params.clientName}</span></h4>
        </div>
        <div id='fromFrom'>
          <h4>FROM: <span className="billText">{loggedInUser.name}</span></h4>
        </div>
      </div>
        <hr/>
      <div className="projectInvDesc">
        <div className="invoiceItems">
          <h4>INVOICE ITEMS</h4>
          <h4>{invoice.projectName} </h4>
          <p>{invoice.projectDesc} </p>
        </div>
        <div className="amount">
          <h4>AMOUNT</h4>
          <p>${invoice.totalBill}</p>
        </div>
      </div>
        <hr/>
      <div>
      <div className='totalInvoice'>
        <p id='totalTotal'>Total: </p>
        <p id='totalTotalBill'>${invoice.totalBill}</p>
      </div>
      </div>
      <div className='invoiceMessage'>
        <h4>MESSAGE</h4>
        <p>Thank you for your business.</p>
      </div>
      </div> : <div>Please wait while invoice is updating...</div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    invoice : state.invoice,
    client : state.client,
    loggedInUser : state.user
  }
}

const mapDispatchToProps = (dispatch) => {

  return {
    onPopulateInvoice : (project) => dispatch(actionCreators.onPopulateInvoiceUsingThunk(project)),
    authUser : () => dispatch(actionCreators.authenticateUser()),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Invoice)

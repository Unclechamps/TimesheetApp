
import React, {Component} from 'react'
import '../index.css'
import '../queries.css'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faUser, faFileAlt } from '@fortawesome/free-solid-svg-icons'

export class Home extends Component {

  render() {
    return (
      <div className='welcomePage'>
      <div className='billboard'>
        <h1>Welcome to <span id="timekeeper">Timekeeper</span></h1>
      </div>
      <div className='blurb'>
        <p>Timkeeper is your one stop app to keep track of all your time needs for your business. Whether you are a freelancer or a small-business owner, Timekeeper will help you get organized and not miss a beat when it comes to keeping your timesheet organized.</p>
      </div>
      <hr/>
      <div className='keyFeatures'>
        <h2>Key Features</h2>
        <div className='icons'>
          <div className="indiIcons">
            <div><FontAwesomeIcon icon={faClock} /></div>
            <p>Keep track of projects. New, ongoing, or completed.</p>
          </div>
          <div className="indiIcons">
            <div><FontAwesomeIcon icon={faUser} /></div>
            <p>Add new clients to your portfolio.</p>
          </div>
          <div className="indiIcons">
            <div><FontAwesomeIcon icon={faFileAlt} /></div>
            <p>Create, manage and send invoices directly to clients.</p>
          </div>
          </div>
        </div>
        <hr/>
          <h2 className='pricingTitle'>Pricing options</h2>
        <div className="pricing">
          <div className='free'>
            <h2>Basic</h2>
            <p>Free</p>
            <p>1 client</p>
            <p>20 annual invoices</p>
            <p>100 projects</p>
            <button className='selectbtn'>Select Plan</button>
          </div>
          <div className='limited'>
            <h2>Limited</h2>
            <p>$50/month</p>
            <p>10 client</p>
            <p>100 annual invoices</p>
            <p>500 projects</p>
            <button className='selectbtn'>Select Plan</button>
          </div>
          <div className='unlimited'>
            <h2>Premium</h2>
            <p>$100/month</p>
            <p>Unlimited clients</p>
            <p>1000 annual invoices</p>
            <p>1000 projects</p>
            <button className='selectbtn'>Select Plan</button>
          </div>
      </div>
      <hr />
      <div className='footer'>
        <p>Copyright {'\u00A9'} Gabriel Frontera 2018</p>
      </div>

      </div>
    )}
  }

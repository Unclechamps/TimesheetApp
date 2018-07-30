
import React, {Component} from 'react'
import '../index.css'
import {NavLink} from 'react-router-dom'

export class Menu extends Component {

render() {
  return (
    <div className="menu">
      <p className="logo">Timekeeper</p>
      <div className="links">
        <div><NavLink exact to = "/">Home</NavLink></div>
        <div><NavLink exact to ="/sign-up">Sign Up</NavLink></div>
        <div><NavLink exact to ="/sign-in">Sign In</NavLink></div>
        <div><NavLink exact to ="/about-us">About Us</NavLink></div>
        <div><NavLink to = "/contact-us">Contact Us</NavLink></div>
      </div>
    </div>
    );
  }
}

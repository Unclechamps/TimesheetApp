import React, { Component } from 'react';
import './index.css';
import Menu1 from './components/Menu1'
import Menu2 from './components/Menu2'
import Cookies from 'universal-cookie'


const cookies = new Cookies()

class App extends Component {

  render() {

    var user = cookies.get("user")

    let menu = ''

    if(user) {
       menu = <Menu2 />
    } else {
       menu = <Menu1 />
    }

    return (
        <div>
          {menu}
          {this.props.children}
        </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './index.css';
import {Menu} from './components/Menu'


class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
        <div>
          <Menu />
          {this.props.children}
        </div>
    );
  }
}

export default App;

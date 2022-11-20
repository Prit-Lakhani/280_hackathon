import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './splitwise.css';

import Main from './main';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <BrowserRouter>
        <div className="body">
          <Main />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

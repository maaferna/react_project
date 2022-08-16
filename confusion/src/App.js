import logo from './logo.svg';
import './App.css';

import { Navbar, NavbarBrand } from 'reactstrap';
import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Papa from 'papaparse'


class App extends Component {

  state = {}


  test = ()=> {
    Papa.parse("http://a841-dotweb01.nyc.gov/datafeeds/ParkingReg/locations.CSV", {
      download: true,
      complete: function(results) {
        console.log(results.data[0]);
      }
    });
  }


  render() {
    return (
      <div>
        <button onClick={this.test}>Import</button>
    </div>
    );
  }
}

export default App;

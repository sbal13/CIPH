import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Papa from 'papaparse'
import Filter from './components/Filter'



class App extends Component {

  getLocations = () => {
    Papa.parse("http://a841-dotweb01.nyc.gov/datafeeds/ParkingReg/locations.CSV", {
      download: true,
      complete: this.parseLocationData
    });
  };

  getSigns = () => {
    Papa.parse("http://a841-dotweb01.nyc.gov/datafeeds/ParkingReg/signs.CSV", {
      download: true,
      complete: this.parseSignData
    });
  };

  state = {
    boroughFilter: "",
    filteredResults: "",
    temporaryResults: [],
    mainFilterTemp: "",
    fromFilterTemp: "",
    toFilterTemp: "",
    mainFilter: false,
    fromFilter: false,
    toFilter: false,
    locations: [],
    signs: []
  };

  parseLocationData = (results) => {
    this.setState({
          locations: results.data.map(row => {
            return  {
              borough: row[0],
              code: row[1],
              main: row[2],
              from: row[3],
              to: row[4],
              side: row[5]
            }
          })
        })
  };

  parseSignData = (results) => {
    this.setState({
          signs: results.data.map(row => {
            return  {
              borough: row[0],
              code: row[1],
              sequence: row[2],
              distance: row[3],
              arrow: row[4],
              description: row[5],
              signCode: row[6]
            }
          })
        })
  };


  changeBorough = (b) => {
    const withinBor = this.state.locations.filter(location => location.borough === b)

    this.setState({
      filteredResults: withinBor,
      boroughFilter: b,
      mainFilter: false,
      mainFilterTemp: "",
      fromFilter: false,
      fromFilterTemp: "",
      toFilter: false,
      toFilterTemp: ""
    })
  };

  changeMainFilter = (main) => {
    var sanitized = main.toUpperCase().trim().replace(/\s/g, "")
    const filteredByMain = this.state.filteredResults.filter(location =>  location.main.trim().replace(/\s/g, "").includes(sanitized))
    this.setState({
      mainFilterTemp: main,
      temporaryResults: filteredByMain,
      fromFilter: false,
      toFilter: false
    })
  };

  changeFromFilter = (fromInput) => {
    var sanitized = fromInput.toUpperCase().trim().replace(/\s/g, "")
    const filteredByFromInput = this.state.filteredResults.filter(location =>  location.from.trim().replace(/\s/g, "").includes(sanitized))
    this.setState({
      temporaryResults: filteredByFromInput,
      fromFilterTemp: fromInput,
      toFilter: false
    })
  };

  changeToFilter = (toInput) => {
    var sanitized = toInput.toUpperCase().trim().replace(/\s/g, "")
    const filteredByToInput = this.state.filteredResults.filter(location =>  location.to.trim().replace(/\s/g, "").includes(sanitized))
    this.setState({
      temporaryResults: filteredByToInput,
      toFilterTemp: toInput
    })
  };

  formSubmit = () => {
    this.setState({
      filteredResults: this.state.temporaryResults,
      mainFilter: !!this.state.mainFilterTemp,
      fromFilter: !!this.state.fromFilterTemp,
      toFilter: !!this.state.toFilterTemp,
      temporaryResults: []
    })
  }


  render() {
    return (
      <div>
        <button onClick={this.getLocations}>Import Locations</button>
        <button onClick={this.getSigns}>Import Signs</button>
        <Filter 
        
        temporaryResults={this.state.temporaryResults} 
        filteredResults={this.state.filteredResults} 

        formSubmit={this.formSubmit} 

        changeBorough={this.changeBorough} 
        changeMainFilter={this.changeMainFilter} 
        changeFromFilter={this.changeFromFilter} 
        changeToFilter={this.changeToFilter}

       
        boroughFilter={this.state.boroughFilter} 
        mainFilter={this.state.mainFilter}
        fromFilter={this.state.fromFilter}
        toFilter={this.state.toFilter}

        mainFilterTemp={this.state.mainFilterTemp} 
        fromFilterTemp={this.state.fromFilterTemp}
        toFilterTemp={this.state.toFilterTemp}

        

        />
    </div>
    );
  }
}

export default App;

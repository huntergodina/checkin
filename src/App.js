import React, { Component } from 'react';
import './App.css';
import { credentials } from './backend/Credentials';
import ReactGoogleSheets from 'react-google-sheets';
import Search from './Search';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sheetLoaded: false,
      searchTerm: '',
    }
  }

  render() {

    return (
      <div className="App">
        <header className="header">
          <h1>Welcome to UNL Dance Marathon!</h1>
        </header>
        <div className="search">
          <ReactGoogleSheets
            clientId={credentials.client_id}
            apiKey={credentials.api_key}
            spreadsheetId={credentials.spreadsheet_id}
            afterLoading={() => this.setState({sheetLoaded: true})}
          >
            {this.state.sheetLoaded ?
              <div>
                {/* Search Data */}
                <Search data={this.props.getSheetsData('Checkin Data')} props={this.props} />
                {/* Update Data */}
                <button onClick={() => this.checkIn(this.props, 16)}>Check In</button>
              </div>
              :
              'loading...'
            }
          </ReactGoogleSheets>
        </div>
      </div>
    );
  }
}

export default ReactGoogleSheets.connect(App);

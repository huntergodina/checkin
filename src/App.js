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
    }
  }

  reRender = () => {
    window.location.reload();
  }

  render() {
    return (
      <div>
        <header className="header">
          <h1>Huskerthon</h1>
          <h2>Welcome Dancers!</h2>
          <p>Search for your name or team and check in.</p>
        </header>
        <div className="search">
          <ReactGoogleSheets
            clientId={credentials.client_id}
            apiKey={credentials.api_key}
            spreadsheetId={credentials.spreadsheet_id}
            afterLoading={() => this.setState({sheetLoaded: true})}
            sheetId={credentials.sheet_id}
          >
            {this.state.sheetLoaded ?
              <div>
                {/* Search Data */}
                <Search data={this.props.getSheetsData('Dancer List')} props={this.props} callback={() => this.reRender()}/>
              </div>
              :
              'loading...'
            }
          </ReactGoogleSheets>
        </div>
        <footer className="footer">
          <p>© UNL Dance Marathon</p>
        </footer>
      </div>
    );
  }
}

export default ReactGoogleSheets.connect(App);

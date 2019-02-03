import React, { Component } from 'react';
import './App.css';
import SearchInput, {createFilter} from 'react-search-input';

const KEYS_TO_FILTERS = ['first', 'last', 'team'];

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: '',
    }
    this.searchUpdated = this.searchUpdated.bind(this)
  }

  checkIn = (dancer, props, row) => {
    props.props.updateCell(
      'Sheet1', // sheetName
      'E', // column
      row, // row
      'X', // value
      props.callback, // successCallback
      (error) => {
        console.log('error', error)
      } // errorCallback
    );
    this.setState({searchTerm: ''});
  }

  renderDancer = (dancer, props) => {
    return (
      <div style={styles.dancer} key={dancer.id}>
        <div style={styles.name} key={`${dancer.first}${dancer.last}`}>{dancer.first} {dancer.last}</div>
        <div style={styles.team} key={dancer.team}>{dancer.team}</div>
        <button onClick={() => this.checkIn(dancer, props, parseInt(dancer.id) + 1)}>Check In</button>
      </div>
    );
  }

  render() {
    let data = Object.values(this.props.data[0])[3];
    const filteredDancers = data.filter(createFilter(this.state.searchTerm),  KEYS_TO_FILTERS);

    return (
      <div>
        <SearchInput className="search-input" onChange={this.searchUpdated} fuzzy />
        {filteredDancers.map((dancer, id) => {
          if (!dancer.present) {
            return (this.renderDancer(dancer, this.props));
          }
          return null;
        })}
      </div>
    );
  }

  searchUpdated (term) {
    this.setState({searchTerm: term})
  }
}

const styles = {
  dancer: {
    padding: 4,
    color: 'black',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 'calc(4px + 2vmin)',
  },
  info: {

  },
  team: {
    paddingLeft: 10,
    fontSize: 'calc(8px + 1vmin)',
  },
}

export default Search;

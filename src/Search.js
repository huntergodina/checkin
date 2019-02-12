import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';
import './App.css';
import SearchInput, {createFilter} from 'react-search-input';

const KEYS_TO_FILTERS = ['first', 'last', 'team'];

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: '',
      open: false,
      dancer: null,
    }
    this.searchUpdated = this.searchUpdated.bind(this)
  }

  onOpenModal = (dancer) => {
    this.setState({
      open: true,
      dancer,
    });
  };

  onCloseModal = () => {
    this.setState({
      open: false,
      dancer: null,
    });
  };

  checkIn = (dancer, props, row) => {
    if (!!dancer) {
      props.props.updateCell(
        'Sheet1', // sheetName
        'L', // column
        row, // row
        'X', // value
        props.callback, // successCallback
        (error) => {
          console.log('error', error)
        } // errorCallback
      );
      this.setState({searchTerm: ''});
    }
  }

  getShirtInfo = (dancer) => {
    let size = null;
    let color = !!dancer.shirtColor ? dancer.shirtColor : null;
    if (!!dancer.s) {
      size = 'S';
    } else if (!!dancer.m) {
      size = 'M';
    } else if (!!dancer.l) {
      size = 'L';
    } else if (!!dancer.xl) {
      size = 'XL';
    } else if (!!dancer.xxl) {
      size = '2XL';
    } else if (!!dancer.xxxl) {
      size = '3XL';
    }
    return({size, color})
  }

  renderDancer = (dancer, props) => {
    return (
      <div style={styles.dancer} key={dancer.id}>
        <div style={styles.info}>
          <div style={styles.infoRow}>
            <div style={styles.name} key={`${dancer.first}${dancer.last}`}>{dancer.first} {dancer.last}</div>
            <div style={styles.team} key={dancer.team}><strong>{dancer.team}</strong></div>
          </div>
          <div style={styles.infoRow}>
            <div style={styles.shirtInfo}>Shirt Size:</div>
            <div style={styles.shirtInfo} key={dancer.shirt.size}><strong>{dancer.shirt.size}</strong></div>
            <div style={styles.shirtInfo}>Shirt Color:</div>
            <div style={styles.shirtInfo} key={dancer.shirt.color}><strong>{dancer.shirt.color}</strong></div>
          </div>
        </div>
        <div style={styles.button}><button onClick={() => this.onOpenModal(dancer)}>CHECK IN</button></div>
      </div>
    );
  }

  render() {
    let data = Object.values(this.props.data[0])[3];
    const filteredDancers = data.filter(createFilter(this.state.searchTerm),  KEYS_TO_FILTERS);

    return (
      <div>
        <SearchInput className="search-input" onChange={this.searchUpdated} fuzzy style={styles.search}/>
        <div style={styles.dancers}>
          {filteredDancers.map((dancer, id) => {
            if (!dancer.present) {
              const shirt = this.getShirtInfo(dancer);
              dancer.shirt = shirt;
              return (this.renderDancer(dancer, this.props));
            }
            return null;
          })}
        </div>
        <div>
          <Modal open={this.state.open} onClose={this.onCloseModal} center>
            <div style={styles.modalContent}>
              <h2>Are you sure you want to check in?</h2>
              <h3>{!!this.state.dancer ? this.state.dancer.first + ' ' + this.state.dancer.last  + ', ' + this.state.dancer.team : null}</h3>
              <p>{!!this.state.dancer && !!this.state.dancer.shirt ? this.state.dancer.shirt.size + ', ' + this.state.dancer.shirt.color: null}</p>
              <button onClick={() => this.checkIn(this.state.dancer, this.props, parseInt(this.state.dancer.id) + 1)}>CHECK IN!</button>
            </div>
          </Modal>
        </div>
      </div>
    );
  }

  searchUpdated (term) {
    this.setState({searchTerm: term})
  }
}

const styles = {
  search: {
    fontFamily: `'Signika Negative', sans-serif`,
    fontSize: 'calc(2vmin)',
    width: '100%',
    maxWidth: 600,
    border: '2px solid #f4f4f4',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },
  dancers: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: '#ffffff',
  },
  dancer: {
    width: '100%',
    maxWidth: 600,
    marginTop: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#f4f4f4',
    color: '#272727',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  infoRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  shirtInfo: {
    padding: 15,
    paddingRight: 1,
    paddingTop: 0,
    fontSize: 'calc(4px + 1vmin)',
  },
  name: {
    padding: 15,
    fontSize: 'calc(2vmin)',
    fontWeight: 'bold',
  },
  team: {
    fontSize: 'calc(4px + 1vmin)',
    fontWeight: 'normal',
  },
  button: {
    justifyContent: 'flex-end',
    paddingRight: 15,
  },
  modalContent: {
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: 'center',
  },
}

export default Search;

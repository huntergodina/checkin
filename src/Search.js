import React, { Component } from "react";
import ReactDOM from "react-dom";
import Modal from "react-responsive-modal";
import "./App.css";
import SearchInput, { createFilter } from "react-search-input";

const KEYS_TO_FILTERS = ["first", "last", "team"];

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      open: false,
      waiver: false,
      waiverOpen: false,
      dancer: null
    };
    this.searchUpdated = this.searchUpdated.bind(this);
  }

  getState() {
    return this.state;
  }

  onOpenWaiver = dancer => {
    this.setState({
      waiverOpen: true,
      dancer
    });
  };

  onCloseWaiver = dancer => {
    console.log("onClose has been hit");
    this.setState({
      waiverOpen: false,
      dancer
    });
    if (this.state.waiver) {
      this.setState({
        open: true
      });
    }
  };

  onOpenModal = dancer => {
    this.setState({
      open: true,
      dancer
    });
  };

  onCloseModal = () => {
    this.setState({
      open: false,
      dancer: null
    });
  };

  checkIn = (dancer, props, row) => {
    if(!!dancer && dancer.crimes.includes(true)){
      alert("You are not checked in. Please speak to a staff member.")
    }
    if(dancer.fb){
      alert("By setting up a Facebook fundraiser, you're eligible for a reward. Please ask a staff member for your Agave discount.")
    }
    if (!!dancer) {
      // Checked In "X"
      if(!dancer.crimes.includes(true)){
        props.props.updateCell(
          "Dancer Info", // sheetName
          "H", // column
          row, // row
          "X", // value
          props.callback, // successCallback
          error => {
            console.log("error", error);
          } // errorCallback
        );
      }
      // NUID
      props.props.updateCell(
        "Dancer Info", // sheetName
        "G", // column
        row, // row
        dancer.NUID, // value
        props.callback, // successCallback
        error => {
          console.log("error", error);
        } // errorCallback
      );
      // Waivers
      if(dancer.waivers[0]){
        props.props.updateCell(
          "Dancer Info", // sheetName
          "I", // column
          row, // row
          "X", // value
          props.callback, // successCallback
          error => {
            console.log("error", error);
          } // errorCallback
        );
      }
      if(dancer.waivers[1]){
        props.props.updateCell(
          "Dancer Info", // sheetName
          "J", // column
          row, // row
          "X", // value
          props.callback, // successCallback
          error => {
            console.log("error", error);
          } // errorCallback
        );
      }
      if(dancer.waivers[2]){
        props.props.updateCell(
          "Dancer Info", // sheetName
          "K", // column
          row, // row
          "X", // value
          props.callback, // successCallback
          error => {
            console.log("error", error);
          } // errorCallback
        );
      }
      // Crimes
      var crime_cols = ["L", "M", "N", "O", "P", "Q", "R", "S"]
      for(var i = 0; i < dancer.crimes.length; i++){
        if(dancer.crimes[i]){
          props.props.updateCell(
            "Dancer Info", // sheetName
            crime_cols[i], // column
            row, // row
            "X", // value
            props.callback, // successCallback
            error => {
              console.log("error", error);
            } // errorCallback
          );
        }
      }
      this.setState({ searchTerm: "" });
    }
  };

  getShirtInfo = dancer => {
    let size = !!dancer.shirtSize ? dancer.shirtSize : null;
    let color = !!dancer.shirtColor ? dancer.shirtColor : null;
    return { size, color };
  };

  renderDancer = (dancer, props) => {
    return (
      <div style={styles.dancer} key={dancer.id}>
        <div style={styles.info}>
          <div style={styles.infoRow}>
            <div style={styles.name} key={`${dancer.first}${dancer.last}`}>
              {dancer.first} {dancer.last}
            </div>
            <div style={styles.team} key={dancer.team}>
              <strong>{dancer.team}</strong>
            </div>
          </div>
          <div style={styles.infoRow}>
            <div style={styles.shirtInfo}>Shirt Size:</div>
            <div style={styles.shirtInfo} key={dancer.shirt.size}>
              <strong>{dancer.shirt.size}</strong>
            </div>
            <div style={styles.shirtInfo}>Shirt Color:</div>
            <div style={styles.shirtInfo} key={dancer.shirt.color}>
              <strong>{dancer.shirt.color}</strong>
            </div>
          </div>
        </div>
        <div style={styles.button}>
          <button onClick={() => this.onOpenWaiver(dancer)}>CHECK IN</button>
        </div>
      </div>
    );
  };

  render() {
    let data = Object.values(this.props.data[0])[3];
    const filteredDancers = data.filter(
      createFilter(this.state.searchTerm),
      KEYS_TO_FILTERS
    );

    return (
      <div>
        <SearchInput
          className="search-input"
          onChange={this.searchUpdated}
          fuzzy
          style={styles.search}
        />
        <div style={styles.dancers}>
          {filteredDancers.map((dancer, id) => {
            if (!dancer.present) {
              const shirt = this.getShirtInfo(dancer);
              dancer.shirt = shirt;
              return this.renderDancer(dancer, this.props);
            }
            return null;
          })}
        </div>
        <div>
          <Modal
            open={this.state.waiverOpen}
            onClose={this.onCloseWaiver}
            center
          >
            <div style={styles.modalContent}>
              <form onSubmit={this.checkForm}>
                <div style={styles.waiver}>
                  <h2>Please accept these terms to proceed</h2>
                  <p>
                    Releasor realizes that participation in the HuskerThon 2022
                    involves certain risks and danger and is a vigorous activity
                    involving severe respiratory and cardiovascular stress.
                    Releasor has hereby been made aware that participation in
                    HuskerThon 2022 has the following non-exclusive list of
                    certain risks which I accept: death; head, eye, neck, and
                    spinal injury resulting in complete or partial paralysis;
                    brain damage; heart attack; blisters; cuts; lacerations;
                    abrasions; concussions; contusions; strains; sprains;
                    dislocations; fractures; cold and heat injuries; water
                    immersion; drowning; lightning strikes; injury to bones,
                    joints, muscles, internal organs; and environmental
                    conditions.
                  </p>
                  <p>
                    In consideration of participation in HuskerThon 2022
                    Releasor hereby RELEASES and covenants not-to-sue the
                    UNIVERSITY for any and all present and future claims
                    resulting from ordinary negligence on the part of the
                    UNIVERSITY for property damage, personal injury, or wrongful
                    death arising as a result of my engaging in, using
                    University facilities and equipment, or receiving
                    instruction for HuskerThon 2022 or activities thereto,
                    wherever, whenever, or however the same may occur. Releasor
                    hereby voluntarily waives any and all claims or actions
                    resulting from ordinary negligence, both present and future,
                    that may be made by Releasor’s family, estate, personal
                    representative, heirs, or assigns.
                  </p>
                  <div style={styles.textCenter}>
                    <input type="checkbox" name="waiver" required></input>
                    <label>I agree</label>
                  </div>
                </div>
                <div style={styles.waiver}>
                  <h2>Please accept the Child Abuse and Neglect Including Sexual Assault Reporting Requirements</h2>
                  <p>
                  Nebraska statutes require any person (including you) who 
                  becomes aware of any child abuse or neglect, including sexual 
                  assault, to report such abuse, neglect, or assault to law 
                  enforcement or the Department of Health and Human Services. 
                  Law enforcement is likewise required to notify DHHS of any such 
                  incidents reported to them. Activity Workers are required to 
                  notify the University Police Department at 402-472-2222 
                  immediately when these situations are suspected.
                  </p>
                  <p>
                  This means that if you suspect any child abuse or neglect, 
                  including sexual assault: 1) you must report it, 2) you should 
                  give as much information about the circumstances as possible, 
                  3) you are immune from any civil or criminal liability if you 
                  have reported the information in good faith, and 4) if you know 
                  of child abuse, neglect, or sexual assault but are not 
                  reporting it, you are breaking the law. 
                  </p>
                  <p>
                  Reference: Nebraska Statutes 28-710; 28-711; 28-716; 28-717: 
                  </p>
                  <div style={styles.textCenter}>
                    <input type="checkbox" name="ca-waiver" required></input>
                    <label>
                      I understand & agree to follow the Child Abuse, Neglect, & Sexual Assault Reporting Requirements Above
                    </label>
                  </div>
                </div>
                <div style={styles.waiver}>
                  <div style={styles.textCenter}>
                    <input type="checkbox" name="ysg-waiver" required></input>
                    <label>
                    I have read, understand, and agree to adhere abide by the policies and 
                    requirements stated in the  
                    <a href={"https://drive.google.com/file/d/19eotJC0dj97569lBFOEAOvFPS0d1tE3u/view?usp=sharing"}> Youth Safety Guidelines </a>  
                    (available in person).
                    </label>
                  </div>
                </div>
                <div style={styles.waiver}>
                  <h2>
                    <strong>
                      Have you ever been convicted of any of the following
                      crimes
                    </strong>
                  </h2>
                  <ul>
                    <li>
                      <input type="checkbox" name="crime1" value="1"></input>
                      <label>
                      Felony assault, including domestic violence related incidents
                      </label>
                    </li>
                    <li>
                      <input type="checkbox" name="crime2" value="1"></input>
                      <label>
                        Child abuse, molestation or other crime involving
                        endangerment of a minor
                      </label>
                    </li>
                    <li>
                      <input type="checkbox" name="crime3" value="1"></input>
                      <label>
                      Murder
                      </label>
                    </li>
                    <li>
                      <input type="checkbox" name="crime4" value="1"></input>
                      <label>
                      Kidnapping
                      </label>
                    </li>
                    <li>
                      <input type="checkbox" name="crime5" value="1"></input>
                      <label>
                      Misdemeanor assault
                      </label>
                    </li>
                    <li>
                      <input type="checkbox" name="crime6" value="1"></input>
                      <label>
                      Drug distribution activity
                      </label>
                    </li>
                    <li>
                      <input type="checkbox" name="crime7" value="1"></input>
                      <label>
                      Felony drug possession, and any other felony
                      </label>
                    </li>
                    <li>
                      <input type="checkbox" name="crime8" value="1"></input>
                      <label>
                      Crime involving moral turpitude
                      </label>
                    </li>
                  </ul>
                </div>
                <div style={styles.waiver}>
                  <div style={styles.textCenter}>
                    <label><strong>Please enter your NUID: </strong></label>
                    <input type="text" id="NUID" minLength={8} maxLength={8} required></input>
                    <br></br>
                    <br></br>
                    <input type="submit"></input>
                  </div>
                </div>
                <div style={styles.textCenter}>
                    <input type="checkbox" name="fb-fundraiser"></input>
                    <label>
                      I have already opened a Facebook Fundraiser
                    </label>
                  </div>
              </form>
            </div>
          </Modal>
          <Modal open={this.state.open} onClose={this.onCloseModal} center>
            <h2>Are you sure you want to check in?</h2>
            <h3>
              {!!this.state.dancer
                ? this.state.dancer.first +
                  " " +
                  this.state.dancer.last +
                  ", " +
                  this.state.dancer.team
                : null}
            </h3>
            <p>
              {!!this.state.dancer && !!this.state.dancer.shirt
                ? this.state.dancer.shirt.size +
                  ", " +
                  this.state.dancer.shirt.color
                : null}
            </p>
            <button
              onClick={() =>
                this.checkIn(
                  this.state.dancer,
                  this.props,
                  parseInt(this.state.dancer.id) + 1
                ) 
              }
            >
              CHECK IN!
            </button>
          </Modal>
        </div>
      </div>
    );
  }

  checkForm = form => {
    form.preventDefault();
    console.log(document.getElementsByName("crime2"));
    const crimes = [
      document.getElementsByName("crime1")[0].checked,
      document.getElementsByName("crime2")[0].checked,
      document.getElementsByName("crime3")[0].checked,
      document.getElementsByName("crime4")[0].checked,
      document.getElementsByName("crime5")[0].checked,
      document.getElementsByName("crime6")[0].checked,
      document.getElementsByName("crime7")[0].checked,
      document.getElementsByName("crime8")[0].checked
    ];
    const waivers = [
      document.getElementsByName("waiver")[0].checked,
      document.getElementsByName("ca-waiver")[0].checked,
      document.getElementsByName("ysg-waiver")[0].checked
    ];
    const fbFundraiser = document.getElementsByName("fb-fundraiser")[0].checked;
    const id = document.getElementById("NUID").value;
    const dancer = this.state.dancer;
      this.setState({
        open: true
      });
    dancer.NUID = id;
    dancer.crimes = crimes;
    dancer.waivers = waivers;
    dancer.fb = fbFundraiser;
  };

  searchUpdated(term) {
    this.setState({ searchTerm: term });
  }
}

const styles = {
  search: {
    fontFamily: `'Signika Negative', sans-serif`,
    fontSize: "calc(2vmin)",
    width: "100%",
    maxWidth: 600,
    border: "2px solid #f4f4f4",
    borderRadius: 10,
    marginBottom: 10,
    padding: 10
  },
  dancers: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#ffffff"
  },
  dancer: {
    width: "100%",
    maxWidth: 600,
    marginTop: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#f4f4f4",
    color: "#272727"
  },
  info: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  infoRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  shirtInfo: {
    padding: 15,
    paddingRight: 1,
    paddingTop: 0,
    fontSize: "calc(4px + 1vmin)"
  },
  name: {
    padding: 15,
    fontSize: "calc(2vmin)",
    fontWeight: "bold"
  },
  team: {
    fontSize: "calc(4px + 1vmin)",
    fontWeight: "normal"
  },
  button: {
    justifyContent: "flex-end",
    paddingRight: 15
  },
  modalContent: {
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: "left"
  },
  textCenter: {
    textAlign: "center",
    paddingTop: 5,
  },
  waiver: {
    backgroundColor: "#f4f4f4",
    margin: 5,
    borderRadius: 5,
    paddingTop: 5,
    paddingBottom: 15,
    paddingRight: 10,
    paddingLeft: 10
  }
};

export default Search;

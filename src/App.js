import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Modal from 'react-bootstrap/Modal';
import DropdownButton from 'react-bootstrap/DropdownButton';
import MenuItem from '@material-ui/core/MenuItem';
import "./modal.css";

import "./App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

class App extends Component {

  state = {
    events: [
      {
        start: moment().toDate(),
        end: moment()
          .add(0, "days")
          .toDate(),
        title: "UrsaTech Meeting"
      },
      {
        start: moment('2020-04-27').toDate(),
        end: moment('2020-04-28').toDate(),
        title: "UrsaTech Meeting"
      }
    ],
    dropDownSelection: "Java 1",
    modalIsOpen: false
  };

  onchangeSelectDropdown = e => {
    this.setState({
      dropDownSelection: e
    });
  };

  openModal = e => {
    //set model to true
    this.setState({
      modalIsOpen: true
    });
  }

  closeModal = e => {
    //set model to true
    this.setState({
      modalIsOpen: false
    });
  }
  
  renderModal = () => {
    const buttonS = {
      position: "absolute",
      marginTop: "55%",
      marginLeft: "43%",
    };
    if (!this.state.modalIsOpen) return;
    return(
      <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        contentLabel="Example Modal"
        show={this.state.modalIsOpen}
      >
        <button onClick={this.closeModal} style={buttonS}>close</button>
        <div style={{ marginLeft: '40%' }}>Add event</div>
        <form>
          <input />
          <DropdownButton title={"Dates"} key="1" id="test" onSelect={this.onchangeSelectDropdown} >
            <MenuItem eventKey="Option  1"> Option 1</MenuItem>
            <MenuItem eventKey="Option 2"> Option 2</MenuItem>
            <MenuItem eventKey="Option 3"> Option 3</MenuItem>
  
            <MenuItem divider />
            <MenuItem eventKey="Other">Other</MenuItem>
          </DropdownButton>
  
          <input type="submit" value="Submit" />
        </form>
      </Modal>
    );
  }

  render() {
    const titleS = {
      position: "relative",
      marginTop: "12px",
      marginBottom: "10px",
      height: "200"
    }
    
    return (
      <div className="App">
        <h1 classname="Title" style={titleS}>
          {"UrsaTech Calendar"}
        </h1>
        <div classname="calendar">
          <Calendar
            selectable={true}
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            events={this.state.events}
            onSelectEvent={event => alert(event.title)}
            onSelectSlot={this.handleSelect}
            style={{ height: "88vh"}}
          />
          <button onClick={this.openModal}>Add an event</button>
          {this.renderModal()}
        </div>
      </div>
    );
  }
}

export default App;
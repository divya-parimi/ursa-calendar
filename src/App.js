import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Modal from 'react-bootstrap/Modal';
import DropdownButton from 'react-bootstrap/DropdownButton';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
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
        title: "UrsaTech Meeting",
        description: "WebDev",
        link: "Zoom.com",
        location: "Online"
      },
      {
        start: moment('2020.04.27').toDate(), 
        end: moment('2020-04-28').toDate(),
        title: "UrsaTech Meeting",
        description: "WebDev",
        link: "Zoom.com",
        location: "Online"
      }
    ],
    dropDownSelection: "Java 1",
    modalIsOpen: false,
    modalInfoIsOpen: false,
    start: new Date(),
    end: new Date(),
    title: "",
    description: "",
    link: "",
    location: ""
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

  openInfoModal = e => {
    //set model to true
    this.setState({
      modalInfoIsOpen: true,
      start: e.start,
      end: e.end,
      title: e.title,
      description: e.description,
      link: e.link,
      location: e.location
    });
  }

  closeInfoModal = e => {
    //set model to true
    this.setState({
      modalInfoIsOpen: false,
      start: new Date(),
      end: new Date(),
      title: "",
      description: "",
      link: "",
      location: ""
    });
  }

  handleSubmit(event) {
    event.preventDefault(event);
    moment.defaultFormat = "DD-MM-YYYY HH:mm";
    const eventsC = this.state.events.slice();
    const start = event.target.date.value + " " + event.target.startTime.value;
    const end = event.target.date.value + " " + event.target.endTime.value;
    //alert(end);
    this.setState({
      events: eventsC.concat([
        { 
          title: event.target.title.value,
          start: moment(start).toDate(),
          end: moment(end).toDate(),
          description: event.target.description.value,
          link: event.target.link.value,
          location: event.target.location.value
        }
      ])
    });
    this.closeModal();
    //alert(this.state.events);
  }
  
  renderModal = () => {
    const buttonS = {
      background: "white", 
      border: "none",
      position: "absolute",
      marginLeft: "95%",
      width: "5%",
      height: "5%"
    };

    const modalAdd = {
      position: "absolute",
      flexDirection: "column",
      paddingLeft: "5%",
    }
    
    if (!this.state.modalIsOpen) return;
    return(
      <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        contentLabel="Add event"
        show={this.state.modalIsOpen}
        style={{height: '60%'}}
      >
        <button type="button" class="close" aria-label="Close" onClick={this.closeModal} style={buttonS}>
          <span aria-hidden="true">&times;</span>
        </button>      
        <div style={{textAlign: "center" }}>Add event</div>
        <form onSubmit={(e) => this.handleSubmit(e)} style={modalAdd}>
        
          <input
              id="title"
              type="text"
              placeholder={"Title"}
              style={{marginTop: "5%"}}
            />
          <TextField
            id="date"
            label="Date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            style={{marginTop: "13%", marginLeft: "-38%"}}
          />
          <TextField
            id="startTime"
            label="Start Time"
            type="time"
            defaultValue="00:00"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            style={{marginTop: "27%", marginLeft: "-38%"}}
          />
          <TextField
            id="endTime"
            label="End Time"
            type="time"
            defaultValue="00:00"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            style={{marginTop: "25.5%", marginLeft: "5%", position: "absolute"}}
          />
          <input
              id="link"
              type="text"
              placeholder={"Link"}
              style={{marginTop: "40%", marginLeft: "-23%", position: "absolute", width: "50%"}}
          />
          <input
              id="location"
              type="text"
              placeholder={"Location"}
              style={{marginTop: "48%", marginLeft: "-23%", position: "absolute", width: "50%"}}
          />
          <textarea 
            id="description"
            type="text"
            placeholder={"Description"}
            style={{marginTop: "56%", marginLeft: "-23%", position: "absolute", width: "80%", height: "50%"}}
          />
          <input type="submit" value="Submit" style={{position: "absolute", marginLeft: "20%" , marginTop: "85%"}}/>
        </form>
      </Modal>
    );
  }

  renderInfoModal = () => {
    const buttonS = {
      background: "white", 
      border: "none",
      position: "absolute",
      marginLeft: "95%",
      width: "5%",
      height: "5%"
    };

    const modalAdd = {
      position: "absolute",
      flexDirection: "column",
      paddingLeft: "5%",
    }
    if (!this.state.modalInfoIsOpen) return;
    const startS= this.state.start + ""
    const startP = startS.split(" ");
    const endS= this.state.start + ""
    const endP = endS.split(" ");
    const date = startP[1] + " " + startP[2] + ", " + startP[3];
    const startT = startP[4]; 
    const endT = endP[4]; 
    alert(startS);
    alert(endS);
    //Mon,Apr,27,2020,00:00:00,GMT-0700,(Pacific,Daylight,Time)
    return(
      <Modal
        isOpen={this.state.modalInfoIsOpen}
        onRequestClose={this.closeInfoModal}
        contentLabel="Add event"
        show={this.state.modalInfoIsOpen}
        style={{height: '60%'}}
      >
        <button type="button" class="close" aria-label="Close" onClick={this.closeInfoModal} style={buttonS}>
          <span aria-hidden="true">&times;</span>
        </button>      
        <div style={{textAlign: "center" }}>Event Info</div>
        <div> Title: {this.state.title}</div>
        <div> Date: {date}</div>
        <div> Start Time: {startT}</div>
        <div> End Time: {endT}</div>
        <div> Link: {this.state.link}</div>
        <div> Description: {this.state.description}</div>
         
      </Modal>
    );
  }

  renderModalInfo = () => {
    
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
            onSelectEvent={event => this.openInfoModal(event)}
            onSelectSlot={this.handleSelect}
            style={{ height: "88vh"}}
          />
          <button onClick={this.openModal}>Add an event</button>
          {this.renderModal()}
          {this.renderInfoModal()}
        </div>
      </div>
    );
  }
}

//descriptions, event url, venue, add event

export default App;
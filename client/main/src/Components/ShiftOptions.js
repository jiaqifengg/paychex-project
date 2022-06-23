import React from 'react';
import "../styles/standard.css";
import Timesheet from './Timesheet';
export default class ShiftOptions extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      breakType: "",
      breakStatus: -1,
      data: []
    };
    this.clockIn = this.clockIn.bind(this);
    this.clockOut = this.clockOut.bind(this);
    this.breakStart = this.breakStart.bind(this);
    this.breakEnd = this.breakEnd.bind(this);
    this.refreshTimesheet = this.refreshTimesheet.bind(this);
  }

  refreshTimesheet(){
    fetch("http://localhost:5000/timesheet", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        token: sessionStorage.getItem("token")
      })
    })
    .then(response=>response.json())
    .then(data=>{ 
      let res_data = JSON.parse(data["res"]);
      this.setState({
        data: res_data
      })
    })
  }

  componentDidMount(){
    this.setState({
      breakType: sessionStorage.getItem("breakType"),
      breakStatus: sessionStorage.getItem("breakID")
    })
    this.refreshTimesheet();
  }

  clockIn = e =>{
    e.preventDefault();
    // if there is no shift active
    if(this.props.shiftStatus !== "-1"){
        fetch("http://localhost:5000/in", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              token: sessionStorage.getItem("token")
            })
        })
        .then(response=>response.json())
        .then(data=>{ 
            console.log(data);
            sessionStorage.setItem("shiftID", data["shiftID"]);
            this.props.updateShift(true);
            this.refreshTimesheet();
        })
    }
  }

  clockOut = e =>{
    e.preventDefault();
    let currentShift = sessionStorage.getItem("shiftID");
    console.log(currentShift);
    console.log(this.props.shiftStatus);
    // if there is no shift active
    if(this.props.shiftStatus){
        console.log("clocking out...");
        fetch("http://localhost:5000/out", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              token: sessionStorage.getItem("token"),
              shiftID: currentShift
            })
        })
        .then(response=>response.json())
        .then(data=>{ 
            console.log(data);
            sessionStorage.setItem("shiftID", "-1");
            this.props.updateShift(false);
            this.refreshTimesheet();
        })
    }
  }

  breakStart = e =>{
    e.preventDefault()
    let breakT = e.target.id;
    console.log(breakT);  
    if(this.props.shiftStatus){
        fetch("http://localhost:5000/break", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              token: sessionStorage.getItem("token"),
              breakType: breakT,
              shiftID: sessionStorage.getItem("shiftID")
            })
        })
        .then(response=>response.json())
        .then(data=>{ 
            console.log(data);
            sessionStorage.setItem("breakID", data["breakID"]);
            sessionStorage.setItem("breakType", data["breakType"]);
            this.props.updateBreak(true);
            this.refreshTimesheet();
        })
    }
  }

  breakEnd = e =>{
    e.preventDefault()
    console.log("ending break...")
    console.log(sessionStorage.getItem("breakType"))
    if(this.props.shiftStatus){
        fetch("http://localhost:5000/breakEnd", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              token: sessionStorage.getItem("token"),
              breakType: sessionStorage.getItem("breakType"),
              breakID: sessionStorage.getItem("breakID"),
              shiftID: sessionStorage.getItem("shiftID")
            })
        })
        .then(response=>response.json())
        .then(data=>{ 
            console.log(data);
            sessionStorage.setItem("breakID", "-1");
            sessionStorage.setItem("breakType", "");
            this.props.updateBreak(false);
            this.refreshTimesheet();
        })
    }
  }

  render(){
    return(
      <div id="shiftContent">
        <div id="shiftOptions">
          {sessionStorage.getItem("shiftID") === "-1" &&
          <div className='shiftButtons'>
              <button id="clockIn-btn" onClick={e => this.clockIn(e)}>Clock-In</button> 
          </div>
          }
          {sessionStorage.getItem("shiftID") !== "-1" && sessionStorage.getItem("breakID") === "-1" 
          && <div className='shiftButtons'>
              <button id="clockOut-btn" onClick={e => this.clockOut(e)}>Clock-Out</button>
            </div>}

          {sessionStorage.getItem("shiftID") !== "-1" && sessionStorage.getItem("breakID") === "-1" &&
          <>
            <div className='shiftButtons'>
              <button id="break" className="breakStart" onClick={e => this.breakStart(e)}>Start Break</button>
            </div>
            <div className='shiftButtons'>
              <button id="lunch" className="breakStart" onClick={e => this.breakStart(e)}>Start Lunch</button>
            </div>
          </>
          }
          {sessionStorage.getItem("breakID") !== "-1" && sessionStorage.getItem("breakType") === "lunch" 
          && <div className='shiftButtons'><button id="lunch" className="breakEnd" onClick={e => this.breakEnd(e)}>End Lunch</button></div>}
          {sessionStorage.getItem("breakID") !== "-1" && sessionStorage.getItem("breakType") === "break" && 
          <div className='shiftButtons'>
            <button id="break" className="breakEnd" onClick={e => this.breakEnd(e)}>End Break</button>
          </div>
          }
        </div>
        <div>
          <Timesheet data={this.state.data}></Timesheet>
        </div>
      </div>
    )
  }
}


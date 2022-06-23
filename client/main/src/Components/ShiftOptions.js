import React from 'react';
import "../styles/standard.css";

export default class ShiftOptions extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      breakType: "",
      breakStatus: -1
    };
    this.clockIn = this.clockIn.bind(this);
    this.clockOut = this.clockOut.bind(this);
    this.breakStart = this.breakStart.bind(this);
    this.breakEnd = this.breakEnd.bind(this);
  }

  componentDidMount(){
    this.setState({
      breakType: sessionStorage.getItem("breakType"),
      breakStatus: sessionStorage.getItem("breakID")
    })
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
        })
    }
  }

  render(){
    return(
      <div id="shiftOptions">
        {sessionStorage.getItem("shiftID") === "-1" &&
            <button onClick={e => this.clockIn(e)}>Clock-In</button> 
        }
        {sessionStorage.getItem("shiftID") !== "-1" && sessionStorage.getItem("breakID") === "-1" 
        && <button onClick={e => this.clockOut(e)}>Clock-Out</button>}

        {sessionStorage.getItem("shiftID") !== "-1" && sessionStorage.getItem("breakID") === "-1" &&
            <div>
                <button id="break" onClick={e => this.breakStart(e)}>Start Break</button>
                <button id="lunch" onClick={e => this.breakStart(e)}>Start Lunch</button>
            </div>
        }
        {sessionStorage.getItem("breakID") !== "-1" && sessionStorage.getItem("breakType") === "lunch" 
        && <button id="lunch" onClick={e => this.breakEnd(e)}>End Lunch</button>}
        {sessionStorage.getItem("breakID") !== "-1" && sessionStorage.getItem("breakType") === "break" && 
        <button id="lunch" onClick={e => this.breakEnd(e)}>End Break</button>}
      </div>
    )
  }
}


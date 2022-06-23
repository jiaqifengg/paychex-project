import React from 'react';
import "../styles/standard.css";

export default class ShiftOptions extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
    this.clockIn = this.clockIn.bind(this);
  }

  componentDidMount(){
    console.log("shiftID => " + sessionStorage.getItem("shiftID"));
    console.log("breakID => " + sessionStorage.getItem("breakID"));
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

  render(){
    return(
      <div id="shiftOptions">
        {sessionStorage.getItem("shiftID") === "-1" ?
            <button onClick={e => this.clockIn(e)}>Clock-In</button> :
            <button onClick={e => this.clockOut(e)}>Clock-Out</button>
        }
        {sessionStorage.getItem("shiftID") !== "-1" && sessionStorage.getItem("breakID") === "-1" &&
            <div>
                <button onClick={e => this.clockOut(e)}>Start Break</button>
                <button onClick={e => this.clockOut(e)}>Start Lunch</button>
            </div>
        }
        {sessionStorage.getItem("breakID") !== "-1" && sessionStorage.getItem("breakType") === "lunch" &&
            <button onClick={e => this.clockOut(e)}>End Lunch</button>
        }
        {sessionStorage.getItem("breakID") !== "-1" && sessionStorage.getItem("breakType") === "break" &&
            <button onClick={e => this.clockOut(e)}>End Break</button>
        }
      </div>
    )
  }
}


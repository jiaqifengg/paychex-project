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
  }

  clockIn = e =>{
    e.preventDefault();
    // if there is no shift active
    if(this.props.shiftActive !== "-1"){
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
            console.log(sessionStorage.getItem("shiftID"));
            sessionStorage.setItem("shiftID", data["shiftID"]);
            console.log(sessionStorage.getItem("shiftID"));
        })
    }
  }

  clockOut = e =>{
    console.log(sessionStorage.getItem("shiftID"));
  }
  render(){
    return(
      <div id="shiftOptions">
        {sessionStorage.getItem("shiftID") === "-1" &&
        <button onClick={e => this.clockIn(e)}>Clock-In</button> 
        }
        {sessionStorage.getItem("shiftID") !== "-1" && 
        <button onClick={e => this.clockOut(e)}>Clock-Out</button>
        }
      </div>
    )
  }
}


import React from 'react';
import "../styles/standard.css";
export default class Employee extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      shiftActive: false
    };
  }

  componentDidMount(){
    // fetch("http://127.0.0.1:5000/")
    // .then((res) => res.json())
    // .then((data) => {
    //     console.log(data);
    // })
  }
  
  render(){
    return(
      <div id="employeePortal">
        <div id="sideNav">
          <div>Employee portal</div>
          <div>Paycheck</div>
          <div>Timesheet</div>
        </div>
        <div id="portalContent">
          <button>Clock In</button>
        </div>
      </div>
    )
  }
}


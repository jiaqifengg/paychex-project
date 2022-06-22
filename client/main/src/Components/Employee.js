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
          Employee portal
          <a href="#">Paycheck</a>
          <br></br>
          <a href="#">Timesheet</a>
        </div>
        <div id="portalContent">

        </div>
      </div>
    )
  }
}


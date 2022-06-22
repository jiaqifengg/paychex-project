import React from 'react';
import "../styles/standard.css";
import Logout from "../icons/logout.png";
export default class Employee extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      shiftActive: false,
      timesheet: true
    };
  }

  componentDidMount(){
  }
  
  render(){
    const styles = {
      display: this.state.timesheet ? {border: '1px solid white'} : {border: '1px solid transparent'},
      shift: this.state.shiftActive ? {color: 'green'} : {color: 'white'},
      active: this.state.shiftActive ? 'Active' : 'Not Active'
    }
  

    return(
      <div id="employeePortal">
        <div id="sideNav">
          <div className='nav-item'>
            <h3>Welcome, name!</h3>
          </div>
          <div className='nav-item'>
            <p>Paycheck</p>
          </div>
          <div className='nav-item' style={styles.display}>
            <p>Timesheet</p>
          </div>
          <div className='active-status'>
            <p>Status: <span style={styles.shift}>{styles.active}</span></p>
          </div>
          <div className='logout-btn'>
            <img id="logout-img" src={Logout}></img>
            <p>Logout</p>
          </div>
        </div>
        <div id="portalContent">
          <button>Clock In</button>
        </div>
      </div>
    )
  }
}


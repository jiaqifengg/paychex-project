import React from 'react';
import "../styles/standard.css";
import Logout from "../icons/logout.png";
import ShiftManagement from "./ShiftOptions.js";

export default class Employee extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      shiftActive: false,
      timesheet: true
    };
    this.logoutUser = this.logoutUser.bind(this);
  }

  updateShiftActive(){
    this.setState({
      shiftActive: true
    })
  }

  componentDidMount(){
  }
  
  logoutUser = e =>{
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("firstName");
    sessionStorage.removeItem("lastName");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("admin");  
    document.location = "/";
  }

  render(){
    const styles = {
      display: this.state.timesheet ? {border: '1px solid white'} : {border: '1px solid transparent'},
      shift: this.state.shiftActive ? {color: 'green'} : {color: 'white'},
    }

    const status = {
      active: this.state.shiftActive ? 'Active' : 'Not Active'
    }
  

    return(
      <div id="employeePortal">
        <div id="sideNav">
          <div className='nav-title'>
            <h3>Welcome, {sessionStorage.getItem("firstName")}!
            <br></br>#{sessionStorage.getItem("token")}
            </h3>
          </div>
          <div className='nav-item'>
            <p>Paycheck</p>
          </div>
          <div className='nav-item' style={styles.display}>
            <p>Timesheet</p>
          </div>
          <div className='active-status'>
            <p>Status: <span style={styles.shift}>{status.active}</span></p>
          </div>
          <div className='logout-btn' onClick={e => this.logoutUser(e)}>
            <img id="logout-img" src={Logout} alt="logout icon"></img>
            <p>Logout</p>
          </div>
        </div>
        <div id="portalContent">
          <ShiftManagement activeStatus={this.state.shiftActive}></ShiftManagement>
        </div>
      </div>
    )
  }
}


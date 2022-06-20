import React from 'react';

export default class Landing extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    };
  }

  componentDidMount(){
  }
  

  render(){
    return(
      <div id="landingContent">
        <h1>Employee Portal</h1>
        <button id="login-btn" onClick={() => {document.location = "/login";}}>Login</button>
        <button id="register-btn" onClick={() => {document.location = "/register";}}>Register</button>
      </div>
    )
  }
}


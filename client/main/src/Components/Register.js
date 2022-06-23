import React from "react";

export default class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      showCriteria: false,
      missingField: false
    };
    this.strongPassword = this.strongPassword.bind(this);
  }

  componentDidMount(){
    // fetch("http://127.0.0.1:5000/")
    // .then((res) => res.json())
    // .then((data) => {
    //     console.log(data);
    // })
  }

  changeHandler(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit = e =>{
    e.preventDefault();
    let res = this.strongPassword();
    if(res === -1){
      this.setState({
        showCriteria: true
      })
    }else{
      if(this.state.firstname.length === 0 || this.state.lastname.length === 0 || this.state.username === 0){
        console.log("Missing field");
        this.setState({
          missingField: true
        })
      }else{
        console.log("Successfully registered! Attempting to post...");
        fetch("http://localhost:5000/register", {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            firstName: this.state.firstname,
            lastName: this.state.lastname,
            username: this.state.username,
            password: this.state.password,
            empType: 0
          })
        })
        .then(response=>response.json())
        .then(data=>{ console.log(data); })

        this.setState({
          firstname: "",
          lastname: "",
          username: "",
          password: "",
          showCriteria: false,
          missingField: false
        })
      }
    }
  }

  strongPassword(){
    var loweCases = /[a-z]/g;
    var upperCases = /[A-Z]/g;
    var numbers = /[0-9]/g;
    // eslint-disable-next-line
    var special = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/g;
    
    if(this.state.password.length < 8){
      return -1;
    }
    if(!this.state.password.match(loweCases)){
      return -1;
    }
  
    if(!this.state.password.match(upperCases)){
      return -1;
    }
  
    if(!this.state.password.match(numbers)){
      return -1;
    }
  
    if(!this.state.password.match(special)){
      return -1;
    }
    return 0;
  }

  render(){
    return(
      <div id="registerContent">
        <h1 id="registerTitle">Register</h1>
        {this.state.missingField && <div><h2>All fields must be filled!</h2></div>}
        <div id="registerForm">
          <form>
            <div id="f_name">
              <label className="register-labels">First Name<span style={{ color: 'red'}}>*</span></label>
              <br></br>
              <input name="firstname" placeholder="First Name" value={this.state.firstname} onChange={e => this.changeHandler(e)} type="text" required="required"></input>
            </div>
            <div id="l_name">
              <label className="register-labels">Last Name<span style={{ color: 'red'}}>*</span></label>
              <br></br>
              <input name="lastname" placeholder="Last Name" value={this.state.lastname} onChange={e => this.changeHandler(e)} type="text" required="required"></input>
            </div>
            <div id="user">
              <label className="register-labels">Username<span style={{ color: 'red'}}>*</span></label>
              <br></br>
              <input id="username" name="username" placeholder="Username" value={this.state.username} onChange={e => this.changeHandler(e)} type="text" required="required"></input>
            </div>
            <div id="passWord">
              <label className="register-labels">Password<span style={{ color: 'red'}}>*</span></label>
              <br></br>
              <input id="password" name="password" type="password" placeholder="Password" value={this.state.password} onChange={e => this.changeHandler(e)} required="required"></input>
            </div>
            <button onClick={e => this.onSubmit(e)} type="submit" id="signupIn-btn">Register</button>
          </form>
          {this.state.showCriteria &&
            <div id="password-criteria">
              <p>Password Criteria:</p>
              <ul>
                <li>MUST contain at least 8 characters.</li>
                <li>MUST contain at least one UPPERCASE letter.</li>
                <li>MUST contain at least one LOWERCASE letter.</li>
                <li>MUST contain at least one number.</li>
                <li>MUST contain at least one special character.</li>
              </ul>
            </div>
          }
          <div id="login_register">
            Have an account? <a href="/login">Sign In</a>
          </div>
        </div>
      </div>
    )
  }
}

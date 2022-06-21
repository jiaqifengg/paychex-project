import React from "react";
export default class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      showCriteria: false
    };
  }

  componentDidMount(){
    // fetch("http://127.0.0.1:5000/")
    // .then((res) => res.json())
    // .then((data) => {
    //     console.log(data);
    // })
  }
  strongPassword(){
    console.log(this.state.password);
    var loweCases = /[a-z]/g;
    var upperCases = /[A-Z]/g;
    var numbers = /[0-9]/g;
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

  changeHandler(e){
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state);
  }

  onSubmit = e =>{
    e.preventDefault();
    let res = this.strongPassword();
    if(res === -1){
      this.setState({
        showCriteria: true
      })
    }else{
      console.log("Successfully registered!");
    }
    console.log(this.state);
  }

  render(){
    return(
      <div id="registerContent">
        <h1 id="registerTitle">Register</h1>
        <div id="registerForm">
          <form>
            <div id="fullName">
              <input name="firstname" placeholder="First Name" value={this.state.firstname} onChange={e => this.changeHandler(e)} required></input>
              <input name="lastname" placeholder="Last Name" value={this.state.lastname} onChange={e => this.changeHandler(e)} required></input>
            </div>
            <input id="username" name="username" placeholder="Username" value={this.state.username} onChange={e => this.changeHandler(e)} required></input>
            <input id="password" name="password" type="password" placeholder="Password" value={this.state.password} onChange={e => this.changeHandler(e)} required></input>
            <button onClick={e => this.onSubmit(e)}>Register</button>
          </form>
          {this.state.showCriteria &&
            <div id="password-criteria">
              <ul>
                <li>MUST contain at least 8 characters.</li>
                <li>MUST contain at least one UPPERCASE letter.</li>
                <li>MUST contain at least one LOWERCASE letter.</li>
                <li>MUST contain at least one number.</li>
                <li>MUST contain at least one special character.</li>
              </ul>
            </div>
          }
        </div>
      </div>
    )
  }
}

function strongPassword(password){

}

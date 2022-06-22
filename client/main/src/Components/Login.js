import React from "react";

export default class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: "",
      missingField: false,
      error: false
    };
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
    if(this.state.password.length === 0 || this.state.username === 0){
      console.log("Missing field");
      this.setState({
        missingField: true
      })
    }else{
      console.log("Successfully registered! Attempting to post...");
      fetch("http://localhost:5000/login", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      })
      .then(response=>response.json())
      .then(data=>{ 
        console.log(data); 
        let status = data["status"];
        if(status === 200){
          let emp_id = data["emp_id"];
          let f_name = data["firstName"];
          let l_name = data["lastName"];
          let username = data["username"];
          let emp_type = data["emp_type"];
          sessionStorage.setItem("token", emp_id);
          sessionStorage.setItem("firstName", f_name);
          sessionStorage.setItem("lastName", l_name);
          sessionStorage.setItem("username", username);
          sessionStorage.setItem("admin", emp_type);  
          document.location = "/";

        }else{
          this.setState({
            error: true
          })
        }
      })
    }
  }


  render(){
    return(
      <div id="loginContent">
        <h1 id="loginTitle">Login</h1>
        {this.state.missingField && <div><h3>All fields must be filled!</h3></div>}
        {this.state.error && <div><h3>Incorrect username or password</h3></div>}
        <div id="loginForm">
          <form>
            <div id="user">
              <label className="register-labels">Username</label>
              <br></br>
              <input id="username" name="username" placeholder="Username" value={this.state.username} onChange={e => this.changeHandler(e)} type="text" required="required"></input>
            </div>
            <div id="passWord">
              <label className="register-labels">Password</label>
              <br></br>
              <input id="password" name="password" type="password" placeholder="Password" value={this.state.password} onChange={e => this.changeHandler(e)} required="required"></input>
            </div>
            <button onClick={e => this.onSubmit(e)} type="submit">Login</button>
          </form>
        </div>
      </div>
    )
  }
}


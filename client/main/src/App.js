import React from 'react';
import './App.css';
import Login from "./Components/Login.js"
import Register from "./Components/Register.js"
import Landing from "./Components/Landing.js"
import {
  BrowserRouter as Router, Route, Routes
} from 'react-router-dom';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      login: false,
      logout: false,
      admin: false,
      emp: false,
      working: false,
      data: []
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
      <div className="maincontent" id="mainContent">
        <Router>
          <Routes>
            <Route path="/register" element={<SignUp/>} />
            <Route path="/login" element={<SignIn login={this.state.login}/>} />
            <Route path="/" element={<Home login={this.state.login}/>} />
          </Routes>
        </Router>
      </div>
    )
  }
}

const SignIn = (props) =>{
  return(
    <div>
      <Login login={props.login}></Login>
    </div>
  )
}

const SignUp = (props) => {
  return(
    <div>
      <Register></Register>
    </div>
  )
}

const Home = (props) => {
  if(!sessionStorage.getItem("token") || props.login === false){
    // if the user is not logged in, show the login form.  Otherwise, show the post form
    return(
      <div>
        <Landing></Landing>
      </div>
    )
  }else{
    if(sessionStorage.getItem("admin") === 1){
      // return admin component
    }else{
      // return regular employee
    }
  }
}

export default App;

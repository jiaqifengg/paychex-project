import React from 'react';
import './App.css';
import './styles/standard.css';
import Login from "./Components/Login.js";
import Register from "./Components/Register.js";
import Landing from "./Components/Landing.js";
import Employee from './Components/Employee.js';
import Admin from './Components/Admin.js';
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
    fetch("http://127.0.0.1:5000/")
    .then(res => res.json())
    .then(data => {
        console.log(data);
    })
  }
  


  render(){
    return(
      <div className="maincontent" id="mainContent">
        <Router>
          <Routes>
            <Route path="/register" element={<SignUp/>} />
            <Route path="/login" element={<SignIn login={this.state.login}/>} />
            <Route path="/" element={<Home login={this.state.login}/>} />
            <Route path="/employee" element={<EmpTest></EmpTest>}/>
          </Routes>
        </Router>
      </div>
    )
  }
}
const EmpTest = (props) =>{
  return(
    <div>
      <Employee></Employee>
    </div>
  )
}

const SignIn = (props) =>{
  return(
    <Login login={props.login}></Login>
  )
}

const SignUp = (props) => {
  return(
    <Register></Register>
  )
}

const Home = (props) => {
  if(!sessionStorage.getItem("token")){
    // if the user is not logged in, show the login form.  Otherwise, show the post form
    return(
      <Landing></Landing>
    )
  }else{
    if(sessionStorage.getItem("admin") === 1){
      // return admin component
      return(
        <Admin></Admin>
      )
    }else{
      // return regular employee
      return(
        <Employee></Employee>
      )
    }
  }
}

export default App;

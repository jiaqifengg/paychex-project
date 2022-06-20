import React from 'react';
import './App.css';

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
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
    })
  }
  
  render(){
    return(
      <div>
        test
      </div>
    )
  }
}

export default App;

import React from 'react';
import "../styles/standard.css";
export default class Admin extends React.Component {
  constructor(props){
    super(props);
    this.state = {
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
      <div>
        Admin
      </div>
    )
  }
}


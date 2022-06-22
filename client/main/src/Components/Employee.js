import React from 'react';

export default class Employee extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      shiftActive: false
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
        Employee portal
      </div>
    )
  }
}


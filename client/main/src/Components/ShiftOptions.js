import React from 'react';
import "../styles/standard.css";

export default class ShiftOptions extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

  componentDidMount(){
  }

  render(){
    return(
      <div id="shiftOptions">
        <button>Clock In: {this.state.activeStatus}</button>
      </div>
    )
  }
}


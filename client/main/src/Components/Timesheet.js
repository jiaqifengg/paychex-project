import React from 'react';
import "../styles/standard.css";

export default class Timesheet extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount(){
    fetch("http://localhost:5000/timesheet", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          token: sessionStorage.getItem("token")
        })
        .then(res => res.json)
        .then(data => {
          console.log(data)
        })
    })
  }
  
  render(){
    return(
      <div>
        <table>
        <tr>
          <th>Shift Date</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Total Hours</th>
          <th>Total Lunches</th>
          <th>Total Breaks</th>
        </tr>
        {this.state.data.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.name}</td>
              <td>{val.age}</td>
              <td>{val.gender}</td>
            </tr>
          )
        })}
      </table>
      </div>
    )
  }
}


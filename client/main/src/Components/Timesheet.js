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
    })
    .then(response=>response.json())
    .then(data=>{ 
      let res_data = JSON.parse(data["res"]);
      this.setState({
        data: res_data
      })
    })
  }
  
  render(){
    return(
      <div>
        <table>
          <tr>
            <th className='row'>Shift Date</th>
            <th className='row'>Start Time</th>
            <th className='row'>End Time</th>
            <th className='row'>Total Time</th>
            <th className='row'>Total Lunches</th>
            <th className='row'>Total Breaks</th>
          </tr>
          <tbody>
            {this.state.data.map((val, key) => {
              return(
                <tr key={key}>
                  <td className='row'>{val.date}</td>
                  <td className='row'>{val.s_time}</td>
                  <td className='row'>{val.e_time}</td>
                  <td className='row'>{val.total_hours}</td>
                  <td className='row' id="breaks-table">{val.total_lunches}</td>
                  <td className='row' id="breaks-table">{val.total_breaks}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}


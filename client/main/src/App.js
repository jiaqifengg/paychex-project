import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      login: false,
      logout: false,
      admin: false,
      emp: false,
      working: false
    };
  }
}

export default App;

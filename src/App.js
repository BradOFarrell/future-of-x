import * as React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import StepFive from './StepFive';
import StepFour from './StepFour';
import StepOne from './StepOne';
import StepThree from './StepThree';
import StepTwo from './StepTwo';

class App extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
      searchTerm: "",
      signals: new Array(),
      drivers: new Array(),
      chosenSignal: "",
      chosenDriverA: "",
      chosenDriverB: "",
      headline: "",
      articleText: "",
      articleType: "growth"
    }
  }
  updateParent = (key, value) => {
    console.log(key)
    console.log(value)
    this.setState({ [key]: value });
    if(key == "signals"){
      localStorage.setItem("signal0", value[0]);
      localStorage.setItem("signal1", value[1]);
      localStorage.setItem("signal2", value[2]);
    } else if(key == "drivers"){
      localStorage.setItem("driver0", value[0]);
      localStorage.setItem("driver1", value[1]);
      localStorage.setItem("driver2", value[2]);
    } else {
      localStorage.setItem(key, value);
    }
  }
  getParent = (label) => {
    return this.state[label]
    console.log(JSON.stringify(this.state))
  }
  componentWillMount() {
    const drivers = [localStorage.getItem('driver0'),localStorage.getItem('driver1'),localStorage.getItem('driver2')]
    const signals = [localStorage.getItem('signal0'),localStorage.getItem('signal1'),localStorage.getItem('signal2')]
    this.setState({ searchTerm : localStorage.getItem('searchTerm'),
                    drivers : drivers, 
                    signals : signals,
                    chosenSignal : localStorage.getItem('chosenSignal'),
                    chosenDriverA : localStorage.getItem('chosenDriverA'),
                    chosenDriverB : localStorage.getItem('chosenDriverB'),
                    headline : localStorage.getItem('headline'),
                    articleText : localStorage.getItem('articleText'),
                    articleType : localStorage.getItem('articleType')
                  
                  });
  }
  resetData = () => {
    this.setState({
      searchTerm: "",
      signals: new Array(),
      drivers: new Array(),
      headline: "",
      articleText: ""});
      localStorage.clear();
  }
  render() {
  console.log(JSON.stringify(this.state))
  return (
     <Router>
      <div>
        <div style={{fontSize:"8pt", textAlign:"center"}}>
            <Link to="/">Start </Link> &nbsp;&nbsp;►&nbsp;&nbsp;
            <Link to="/one">Step 1 </Link> &nbsp;&nbsp;►&nbsp;&nbsp;
            <Link to="/two">Step 2 </Link> &nbsp;&nbsp;►&nbsp;&nbsp;
            <Link to="/three">Step 3 </Link> &nbsp;&nbsp;►&nbsp;&nbsp;
            <Link to="/four">Step 4 </Link> &nbsp;&nbsp;►&nbsp;&nbsp;
            <Link to="/five">Step 5 </Link>
        </div>
        <Route path="/one" render={() =>   (<StepOne   update={this.updateParent} get={this.getParent}/>)} />
        <Route path="/two" render={() =>   (<StepTwo   update={this.updateParent} get={this.getParent}/>)} />
        <Route path="/three" render={() => (<StepThree update={this.updateParent} get={this.getParent}/>)} />
        <Route path="/four" render={() =>  (<StepFour  update={this.updateParent} get={this.getParent}/>)} />
        <Route path="/five" render={() =>  (<StepFive  update={this.updateParent} get={this.getParent}/>)} />
        <Route exact={true} path="/" render={() =>  (<Home reset={this.resetData} update={this.updateParent} get={this.getParent}/>)} />
      </div>
    </Router>
    );        
  }
}

export default App;
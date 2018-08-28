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
      articles: new Array(),
      drivers: new Array()
    }
  }
  updateParent = (update) => {
    this.setState(update)
    console.log("updated state");
    console.log(this.state);
  }
  getParent = (label) => {
    return this.state[label]
  }
 render() {
    return (
     <Router>
      <div>
        <div style={{fontSize:"8pt"}}>
            <Link to="/">Home</Link> ►&nbsp;&nbsp;
            <Link to="/one">Step 1: Collect Signals</Link> ►&nbsp;&nbsp;
            <Link to="/two">Step 2: Identify Drivers</Link> ►&nbsp;&nbsp;
            <Link to="/three">Step 3: Reveal Unexpected</Link> ►&nbsp;&nbsp;
            <Link to="/four">Step 4: Alternative Future</Link> ►&nbsp;&nbsp;
            <Link to="/five">Step 5: Headline the Future</Link>
        </div>
        <Route path="/one" render={() =>   (<StepOne   update={this.updateParent} get={this.getParent}/>)} />
        <Route path="/two" render={() =>   (<StepTwo   update={this.updateParent} get={this.getParent}/>)} />
        <Route path="/three" render={() => (<StepThree update={this.updateParent} get={this.getParent}/>)} />
        <Route path="/four" render={() =>  (<StepFour  update={this.updateParent} get={this.getParent}/>)} />
        <Route path="/five" render={() =>  (<StepFive  update={this.updateParent} get={this.getParent}/>)} />
        <Route exact={true} path="/" component={Home} />
      </div>
    </Router>
    );        
  }
}

export default App;
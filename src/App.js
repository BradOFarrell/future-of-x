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
      drivers: new Array(),
      headline: "",
      articleText: ""
    }
  }
  updateParent = (key, value) => {
    this.setState({ [key]: value });
    localStorage.setItem(key, value);
  }
  getParent = (label) => {
    return this.state[label]
    console.log(JSON.stringify(this.state))
  }
  componentWillMount() {
    this.setState({ searchTerm : localStorage.getItem('searchTerm') });
    this.setState({ articles : localStorage.getItem('articles') });
    this.setState({ drivers : localStorage.getItem('drivers') });
    this.setState({ headline : localStorage.getItem('headline') });
    this.setState({ articleText : localStorage.getItem('articleText') });
  }
  resetData = () => {
    this.setState({
      searchTerm: "",
      articles: new Array(),
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
            <Link to="/">Home </Link> &nbsp;&nbsp;►&nbsp;&nbsp;
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
        <Route exact={true} path="/" render={() =>  (<Home reset={this.resetData} get={this.getParent}/>)} />
      </div>
    </Router>
    );        
  }
}

export default App;
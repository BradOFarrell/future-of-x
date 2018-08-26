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
    console.log(this.state);
  }
 render() {
    return (
      <Router>
      <div>
          <Link to="/">Home</Link> •&nbsp;&nbsp;
          <Link to="/one">1: Collect Signals</Link> •&nbsp;&nbsp;
          <Link to="/two">2: Collect Drivers</Link> •&nbsp;&nbsp;
          <Link to="/three">3: Reveal Possibilities</Link> •&nbsp;&nbsp;
          <Link to="/four">4: Alternative Futures</Link> •&nbsp;&nbsp;
          <Link to="/five">5: Headline the Future</Link> •&nbsp;&nbsp;
      <hr />
      <Route path="/one" render={() => (<StepOne update={this.updateParent}/>)} />
      <Route path="/two" component={StepTwo} />
      <Route path="/three" component={StepThree} />
      <Route path="/four" component={StepFour} />
      <Route path="/five" component={StepFive} />
      <Route exact={true} path="/" component={Home} />
      </div>
    </Router>
    );        
  }
}

export default App;
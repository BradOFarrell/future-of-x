import * as React from 'react';
import './App.css';
import { Route, Redirect } from 'react-router'
import example from './example.png';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstTime: false,
      nextPage: false
    }
  }
  startNew = () => {
    window.scrollTo(0,0);
    this.setState({nextPage: true});
  }
  startOver = () => {
    window.scrollTo(0,0);
    this.props.reset();
    this.setState({nextPage: true});
  }
  startButton(){
    if(this.state.firstTime){
      return (
        <div className="responsebox">
        <span className="warnerror" id="warn"></span>
        <br/>
        <p className="btn btn-primary" onClick={this.startNew}>Start</p>
        <br/>
        </div>  
      );  
    } else {
      return (
        <div className="responsebox">
        <span className="warnerror" id="warn">This will clear your old data.</span>
        <br/>
        <p className="btn btn-primary" onClick={this.startOver}>Start Over</p>
        <br/>
        </div>  
      );  
    }
  }
  componentWillMount(){
      // String will evaluate as false if empty
      if(this.props.get("searchTerm") || this.props.get("headline") || this.props.get("articleText")){
        this.setState({firstTime: false});
      } else {
        this.setState({firstTime: true});
      }
  }
  render() {
    if(this.state.nextPage){
      return (<Redirect to="/one"/>)
    } else {
      return (
<div className="App">  
  <div className="jumbotron jumbotron-fluid">
    <div className="container">
      <br/>
      <h2>The Future of [X]</h2>
      <br/>

      <div className="maintext">
        <p>This web-app will help you develop a headline describing a unique perspective on the future of an industry, a company, or even your own personal future. For example, you could use it forecast The Future of Cellphones, The Future of Baseball, or The Future of San Francisco.</p>
        <center>Example headline:<br/>
        <img src={example}/></center>
        <p>Neuroscientists have discovered techniques for increasing our cognitive flexibility, which allows us to imagine new possibilities. The purpose of this app is to help you imagine new possiblities by using Futures Thinking.</p>
      </div>
      <div className="reminderbox">
        <span className="remindertitle">What is Futures Thinking?</span>
        <br/>
        Every successful strategy is based on a great insight about the future. By systematically studying the long-term future you can make better decisions in the present. Futures Thinking provides the foresight that sparks critical new insights ultimately leading to better actions today.
      </div>
      <br/>  
      <div className="maintext">
        <p>This application is a collection of digital tools adapted from the <a href="http://www.iftf.org/iftf-you/programs-initiatives/foresight-studio/">IFTF Foresight Toolkit</a>. As you progress through each tool, you'll be building a complex model for the future that will be turned into a newspaper headline on the final step. You'll be able to save your headline as an image that you can share on social media.</p> 
        <br/> 
      </div>
    </div>
  </div>
  {this.startButton()}
</div>  
      );        
    }
  }
}

export default Home;
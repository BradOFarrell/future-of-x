import * as React from 'react';
import './App.css';
import { Route, Redirect } from 'react-router'

class StepThree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: false,
      articles: false,
      drivers: false,
      goBack: false,
      nextPage: false
    }
  }
  reroll = () =>{
    this.setState({goBack: true});
  }
  randomPrompt = () => {
    return (<div>hi</div>)
  }
  componentDidMount(){

    this.setState({
      searchTerm: this.props.get("searchTerm"),
      drivers: this.props.get("drivers"),
      articles: this.props.get("articles")});

     
      console.log( this.props.get("searchTerm"));
      console.log( this.props.get("articles"));
      console.log( this.props.get("drivers"));
    }
  render() {
    {
      if(this.state.nextPage){
        return (<Redirect to="/four"/>)
      } else if(this.state.goBack) {
        return (<Redirect to="/one"/>)
      } else {
        return (
<div className="App">
  <div className="jumbotron jumbotron-fluid">
    <div className="container">
      <br/>
      <h2 id="title">Step 3: Reveal Unexpected Possiblities</h2>
      <br/>

      <div className="maintext">
        <p>Forecasting the future is often about stacking up seemingly unrelated information to create something new. Juxtaposition and combination help us create new lenses for identifying possibilities.</p>
        <p>This tool will take signals and drivers collected on the previous steps and combine them randomly. You can use this as a prompt to write a headline for the future.</p>    
      </div>

        <button className="btn btn-primary"  onClick={this.reroll}>New Random Prompt</button>
      <div className="reminderbox">
        {this.randomPrompt()}
      </div>

      <br/>
      <div className="responsebox">
      <form onSubmit={this.handleSubmit}>
      <input type="text" size="40" placeholder="Headline (e.g. 'Astronauts Land On Mars')" className="inputText" id="headline"/><br/><br/>
      </form>
      </div>

      <div className="maintext">
        <p>
          Write a headline based on the prompt above.
          <br/><br/>
        </p>    
      </div>
    </div>
  </div>

  <div className="responsebox">
    <span className="warnerror" id="warn"></span><br/>
    <p className="btn btn-primary"  onClick={this.validateNext}>Next Step</p><br/>
  </div>
</div> 
        );   
      }     
    }
  }
}

export default StepThree;
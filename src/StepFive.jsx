import * as React from 'react';
import './App.css';
import { Route, Redirect } from 'react-router'

class StepThree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleTitle: false,
      articleBody: false,
    }
  }
  reroll = () =>{
    this.setState({goBack: true});
  }
  randomPrompt = () => {
    return (<div>hi</div>)
  }
  componentDidMount(){
      let newTitle = this.props.get("articleTitle");
      let newBody = this.props.get("articleBody");

      newTitle = "WWE Releases New “Neon Collection”; Xavier Woods Previews Kingdom Hearts III (VIDEO)";
      newBody = "Watch as Austin Creed tries out the latest build of the hotly-anticipated Kingdom Hearts III at Gamescom 2018! Grab your Keyblade and make sure you have your friends along for the journey, it's almost time to return to the wild worlds of the Disney universe!";

      this.setState({articleTitle: newTitle,
                     articleBody: newBody});

      document.getElementById("articleTitle").value = newTitle;
      document.getElementById("articleBody").value = newBody;

      const canvas = document.getElementById('canvas');
      const context = canvas.getContext('2d');
      var imageObj = new Image();
               
        imageObj.onload = function() {
          context.drawImage(imageObj, 0, 0);
        };
        imageObj.src = require("/Users/rosemary/Documents/future-of-x/src/newspaper.png");
      }
  newsPaper(){

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
      <h2 id="title">Step 5: Headlining the Future</h2>
      <br/>

      <div className="maintext">
        <p>Forecasting the future is often about stacking up seemingly unrelated information to create something new. Juxtaposition and combination help us create new lenses for identifying possibilities.</p>
        <p>This tool will take signals and drivers collected on the previous steps and combine them randomly. You can use this as a prompt to write a headline for the future.</p>    
      </div>

      <div className="reminderbox">
      <form onSubmit={this.handleSubmit}>
      <input type="text" size="40" placeholder="Headline (e.g. 'Astronauts Land On Mars')" className="inputText" id="articleTitle"/><br/><br/>
      <textarea rows="4" cols="40" id="articleBody">Text here</textarea><br/><br/>
      </form>
      </div>

      <canvas id="canvas" width="640" height="640" style={{backgroundColor: "ffffff"}}/>

      <br/>
      <div className="responsebox">

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
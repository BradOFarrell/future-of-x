import * as React from 'react';
import './App.css';
import { Route, Redirect } from 'react-router'

let topWidth = 540;
let topheight = 130;

let newsTitle = '';
let newsBody = '';

let newTitle = "WWE Releases New “Neon Collection”; Xavier Woods Previews Kingdom Hearts III (VIDEO)";
let newBody = "Watch as Austin Creed tries out the latest build of the hotly-anticipated Kingdom Hearts III at Gamescom 2018! Grab your Keyblade and make sure you have your friends along for the journey, it's almost time to return to the wild worlds of the Disney universe!";


class StepThree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleTitle: false,
      articleBody: false,
    }
  } 
  resizeCanvas = () => {
    const canvas = document.getElementById('canvas');
    const hiddenCanvas = document.getElementById('hiddenCanvas');
    const context = canvas.getContext('2d');
    const hiddenContext = hiddenCanvas.getContext('2d');


    console.log(window.innerWidth);
    canvas.width = 650;
    canvas.height = 650;
    
    
    if (window.innerWidth <= 450) {
      context.scale(.2, .2);
    }
    if (window.innerWidth <= 585) {
      context.scale(.4, .4);
    }
    if (window.innerWidth <= 885) {
      context.scale(.75, .75);
    }
    else {
      context.scale(1, 1);
    }

    this.paintNewspaper();
  }
  paintNewspaper() {
    const canvas = document.getElementById('canvas');
    const hiddenCanvas = document.getElementById('hiddenCanvas');
    const context = canvas.getContext('2d');
    const hiddenContext = hiddenCanvas.getContext('2d');
    const canvasImageUrl = canvas.toDataURL('image/jpeg', 1.0);

    let title = newsTitle;
    let body = newsBody;
    let self = this;

    var imageObj = new Image();
             
    imageObj.onload = function() {
      context.drawImage(imageObj, 0, 0);
      hiddenContext.drawImage(imageObj, 0, 0);

      self.paintHeadline(context, hiddenContext, title);
      self.paintBody(context, hiddenContext, body);

      //context.drawImage(hiddenCanvas, 0, 0);
    };
    imageObj.src = require("./newspaper.png");
  }

  paintHeadline(context, hiddenContext, headline) {
    let headlineArray = null;
    if (headline != '' && headline != null) {
      headlineArray = headline.split(" ");
    }

    context.font = "50px Futura";
    hiddenContext.font = "50px Futura";
    context.fillStyle = "gray";
    hiddenContext.fillStyle = "gray";
    
    let headlineOne = '';
    let headlineTwo = '';

    let headlineOneClosed = false;
    let headlineTwoClosed = false;

    headlineArray.forEach(headline => {

      if (!headlineOneClosed) {
        if (context.measureText(headlineOne + headline).width > 500) {
          headlineOneClosed = true;
        } 
        else {
          headlineOne += headline + ' ';
          return;
        }
      }
      
      if (!headlineTwoClosed) {
        if (context.measureText(headlineTwo + headline).width > 500) {
          headlineTwoClosed = true;
        } 
        else {
          headlineTwo += headline + ' ';
          return;
        }
      }

    });

    if (headlineOne != '') {
      context.fillText(headlineOne, 75, 175);
      hiddenContext.fillText(headlineOne, 75, 175);
    }
    if (headlineTwo != '') {
      context.fillText(headlineTwo, 75, 235);
      hiddenContext.fillText(headlineTwo, 75, 235);
    }
  }

  paintBody(context, hiddenContext, body) {

    let bodyArray = null;
    if (body != '' && body != null) {
      bodyArray = body.split(" ");
    }

    context.font = "25px Futura";
    hiddenContext.font = "25px Futura";
    context.fillStyle = "gray";
    hiddenContext.fillStyle = "gray";

    let bodyLineOne = '', bodyLineOneClosed = false;
    let bodyLineTwo = '', bodyLineTwoClosed = false;
    let bodyLineThree = '', bodyLineThreeClosed = false;
    let bodyLineFour = '', bodyLineFourClosed = false;
    let bodyLineFive = '', bodyLineFiveClosed = false;
    let bodyLineSix = '', bodyLineSixClosed = false;

    bodyArray.forEach(bodyWord => {
      if (!bodyLineOneClosed) {
        if (context.measureText(bodyLineOne + bodyWord + " ").width > 500) {
          bodyLineOneClosed = true;
        }
        else {
          bodyLineOne += bodyWord + " ";
          return;
        }
      }

      if (!bodyLineTwoClosed) {
        if (context.measureText(bodyLineTwo + bodyWord + " ").width > 500) {
          bodyLineTwoClosed = true;
        }
        else {
          bodyLineTwo += bodyWord + " ";
          return;
        }
      }

      if (!bodyLineThreeClosed) {
        if (context.measureText(bodyLineThree + bodyWord + " ").width > 500) {
          bodyLineThreeClosed = true;
        }
        else {
          bodyLineThree += bodyWord + " ";
          return;
        }
      }

      if (!bodyLineFourClosed) {
        if (context.measureText(bodyLineFour + bodyWord + " ").width > 500) {
          bodyLineFourClosed = true;
        }
        else {
          bodyLineFour += bodyWord + " ";
          return;
        }
      }

      if (!bodyLineFiveClosed) {
        if (context.measureText(bodyLineFive + bodyWord + " ").width > 500) {
          bodyLineFiveClosed = true;
        }
        else {
          bodyLineFive += bodyWord + " ";
          return;
        }
      }

      if (!bodyLineSixClosed) {
        if (context.measureText(bodyLineSix + bodyWord + " ").width > 500) {
          bodyLineSixClosed = true;
        }
        else {
          bodyLineSix += bodyWord + " ";
          return;
        }
      }
    });

    if (bodyLineOne != '') {
      context.fillText(bodyLineOne, 75, 350);
      hiddenContext.fillText(bodyLineOne, 75, 350);
    }
    if (bodyLineTwo != '') {
      context.fillText(bodyLineTwo, 45, 375);
      hiddenContext.fillText(bodyLineTwo, 45, 375);
    }
    if (bodyLineThree != '') {
      context.fillText(bodyLineThree, 45, 400);
      hiddenContext.fillText(bodyLineThree, 45, 400);
    }
    if (bodyLineFour != '') {
      context.fillText(bodyLineFour, 45, 425);
      hiddenContext.fillText(bodyLineFour, 45, 425);
    }
    if (bodyLineFive != '') {
      context.fillText(bodyLineFive, 45, 450);
      hiddenContext.fillText(bodyLineFive, 45, 450);
    }
    if (bodyLineSix != '') {
      context.fillText(bodyLineSix, 45, 475);
      hiddenContext.fillText(bodyLineSix, 45, 475);
    }
  }

  handleHeadlineChange = (e) => {
    newsTitle = e.target.value;
    this.paintNewspaper();
  }

  handleBodyChange = (e) => {
    newsBody = e.target.value;
    this.paintNewspaper();
  }

  downloadCanvas() {
    const canvas = document.getElementById('canvas');
    let imgData = canvas.toDataURL('image/png').replace("image/png", "image/octet-stream");
    var a = document.createElement('a');
    a.href = imgData;
    a.download = 'graph.png';
    a.click();
  }

  newsPaper(){
    const canvas = document.getElementById('canvas');
    const hiddenCanvas = document.getElementById('hiddenCanvas');
    let imgData = hiddenCanvas.toDataURL('image/png').replace("image/png", "image/octet-stream");
    var a = document.createElement('a');
    a.href = imgData;
    a.download = 'graph.png';
    a.click();
  }
  componentWillMount(){
    let headline =  this.props.get("headline");
    let articleText = this.props.get("articleText");

    if(headline == ""){
      headline = "Enter your own headline";
    }
    if(articleText == ""){
      articleText = "Write your article here";
    }

    newsTitle = headline;
    newsBody = articleText;
    this.setState({
      articleTitle: headline,
      articleBody: articleText});
  }
  componentDidMount(){
    document.getElementById("articleTitle").value = this.state.articleTitle;
    document.getElementById("articleBody").value = this.state.articleBody;;

    window.addEventListener('resize', this.resizeCanvas, false);
    window.addEventListener('orientationchange', this.resizeCanvas, false);

    this.paintNewspaper();
  }
  render() {
  return (
<div className="App">
  <div className="jumbotron jumbotron-fluid">
    <div className="container">
      <br/>
      <h2 id="title">Step 5: Headlining the Future</h2>
      <br/>

      <div className="maintext">
        <p>Front page news from the future can bring forecasts to life! Headlines of the futrue distill complex foresight into crisp, evocative, sharable messages, in a format that is accessible to nearly everyone. </p>
        <p>On this final step, we put everything together and into one big graphic. Edit the text as you see fit. When you're done, you can save the image to your device.</p>    
      </div>
    
      <div className="reminderbox">
      <form onSubmit={this.handleSubmit}>
      <input type="text" size="40" onChange={this.handleHeadlineChange} placeholder="Headline (e.g. 'Astronauts Land On Mars')" className="inputText" id="articleTitle"/><br/><br/>
      <textarea rows="4" cols="40" onChange={this.handleBodyChange} id="articleBody">{this.state.articleText}</textarea><br/><br/>
      </form>
      </div>

      <div className="responsebox">
      <span className="warnerror" id="warn"></span><br/>
      <p id="saveButton" className="btn btn-primary" onClick={this.newsPaper}>Save Image</p><br/>
      </div>

      <canvas id="canvas" data-paper-resize width={window.innerWidth*.75} height={window.innerHeight*.5} height="640" style={{backgroundColor: "ffffff"}}/>
      <canvas id="hiddenCanvas" className="hiddenCanvas" width="640" height="640" style={{backgroundColor: "ffffff"}}/>

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

export default StepThree;
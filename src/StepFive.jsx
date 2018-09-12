import * as React from 'react';
import './App.css';
import { Route, Redirect } from 'react-router'

let topWidth = 540;
let topheight = 130;

let newsTitle = '';
let newsBody = '';

let newTitle = "WWE Releases New “Neon Collection”; Xavier Woods Previews Kingdom Hearts III (VIDEO)";
let newBody = "Watch as Austin Creed tries out the latest build of the hotly-anticipated Kingdom Hearts III at Gamescom 2018! Grab your Keyblade and make sure you have your friends along for the journey, it's almost time to return to the wild worlds of the Disney universe!";


class StepFive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleTitle: false,
      articleBody: false,
      articleType: "growth", 
      nextPage: false
    }
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
    };
    imageObj.src = require("./newspaper"+this.state.articleType+".png");
  }

  paintHeadline(context, hiddenContext, headline) {
    let headlineArray = null;
    if (headline != '' && headline != null) {
      headlineArray = headline.split(" ");
    }

    context.font = "48px Futura";
    hiddenContext.font = "48px Futura";
    context.fillStyle = "#4c4343";
    hiddenContext.fillStyle = "#4c4343";
    
    let headlineOne = '';
    let headlineTwo = '';

    let headlineOneClosed = false;
    let headlineTwoClosed = false;

    let headlineOneWidth = 0;
    let headlineTwoWidth = 0;

    if (headlineArray != null) {
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
    }

    headlineOneWidth = context.measureText(headlineOne).width;
    headlineTwoWidth = context.measureText(headlineTwo).width;        

    let headlineOneOffset = (-1*(headlineOneWidth - 500)/2)+80
    let headlineTwoOffset = (-1*(headlineTwoWidth - 500)/2)+80

    if (headlineOne != '' && headlineTwo != '') {
      context.fillText(headlineOne, headlineOneOffset, 195);
      hiddenContext.fillText(headlineOne, headlineOneOffset, 195);
      context.fillText(headlineTwo, headlineTwoOffset, 245);
      hiddenContext.fillText(headlineTwo, headlineTwoOffset, 245);
    }
    else if (headlineOne != '' ) {
      context.fillText(headlineOne, headlineOneOffset, 220);
      hiddenContext.fillText(headlineOne, headlineOneOffset, 220);
    }
  }

  paintBody(context, hiddenContext, body) {
    //Base values for drawing the body text
    let bodyX = 80;
    let bodyY = 300;
    let bodyYModifier = 28;

    body = body + "  ";

    let bigLetter = body.charAt(0).toUpperCase();
    body = body.substring(1);

    let bodyLineOne = '', bodyLineOneClosed = false;
    let bodyLineTwo = '', bodyLineTwoClosed = false;
    let bodyLineThree = '', bodyLineThreeClosed = false;
    let bodyLineFour = '', bodyLineFourClosed = false;
    let bodyLineFive = '', bodyLineFiveClosed = false;
    let bodyLineSix = '', bodyLineSixClosed = false;

    let bodyLineSeven = '', bodyLineSevenClosed = false;
    let bodyLineEight = '', bodyLineEightClosed = false;
    let bodyLineNine = '', bodyLineNineClosed = false;
    let bodyLineTen = '', bodyLineTenClosed = false;
    let bodyLineEleven = '', bodyLineElevenClosed = false;
    let bodyLineTwelve = '', bodyLineTwelveClosed = false;

    let bodyArray = null;
    if (body != '' && body != null) {
      bodyArray = body.split(" ");
    }

    context.fillStyle = "#4c4343";
    hiddenContext.fillStyle = "#4c4343";

    context.font = "54px Courier";
    hiddenContext.font = "54px Courier";

    if (bigLetter != '') {
      context.fillText(bigLetter, bodyX+25, bodyY+15);
      hiddenContext.fillText(bigLetter, bodyX+25, bodyY+15);
    }

    context.font = "28px Times New Roman";
    hiddenContext.font = "28px Times New Roman";

    if (bodyArray != null) {
      bodyArray.forEach(bodyWord => {
        if (!bodyLineOneClosed) {
          if (context.measureText(bodyLineOne + bodyWord + " ").width > 440) {
            bodyLineOneClosed = true;
          }
          else {
            bodyLineOne += bodyWord + " ";
            return;
          }
        }

        if (!bodyLineTwoClosed) {
          if (context.measureText(bodyLineTwo + bodyWord + " ").width > 435) {
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
          if (context.measureText(bodyLineFour + bodyWord + " ").width > 320) {
            bodyLineFourClosed = true;
          }
          else {
            bodyLineFour += bodyWord + " ";
            return;
          }
        }

        if (!bodyLineFiveClosed) {
          if (context.measureText(bodyLineFive + bodyWord + " ").width > 310) {
            bodyLineFiveClosed = true;
          }
          else {
            bodyLineFive += bodyWord + " ";
            return;
          }
        }

        if (!bodyLineSixClosed) {
          if (context.measureText(bodyLineSix + bodyWord + " ").width > 310) {
            bodyLineSixClosed = true;
          }
          else {
            bodyLineSix += bodyWord + " ";
            return;
          }
        }

        if (!bodyLineSevenClosed) {
          if (context.measureText(bodyLineSeven + bodyWord + " ").width > 310) {
            bodyLineSevenClosed = true;
          }
          else {
            bodyLineSeven += bodyWord + " ";
            return;
          }
        }

        if (!bodyLineEightClosed) {
          if (context.measureText(bodyLineEight + bodyWord + " ").width > 310) {
            bodyLineEightClosed = true;
          }
          else {
            bodyLineEight += bodyWord + " ";
            return;
          }
        }

        if (!bodyLineNineClosed) {
          if (context.measureText(bodyLineNine + bodyWord + " ").width > 500) {
            bodyLineNineClosed = true;
          }
          else {
            bodyLineNine += bodyWord + " ";
            return;
          }
        }

        if (!bodyLineTenClosed) {
          if (context.measureText(bodyLineTen + bodyWord + " ").width > 500) {
            bodyLineTenClosed = true;
          }
          else {
            bodyLineTen += bodyWord + " ";
            return;
          }
        }

        if (!bodyLineElevenClosed) {
          if (context.measureText(bodyLineEleven + bodyWord + " ").width > 500) {
            bodyLineElevenClosed = true;
          }
          else {
            bodyLineEleven += bodyWord + " ";
            return;
          }
        }

        if (!bodyLineTwelveClosed) {
          if (context.measureText(bodyLineTwelve + bodyWord + " ").width > 500) {
            bodyLineTwelveClosed = true;
          }
          else {
            bodyLineTwelve += bodyWord + " ";
            return;
          }
        }

      });
    }

    if (bodyLineOne != '') {
      context.fillText(bodyLineOne, bodyX + 60, bodyY);
      hiddenContext.fillText(bodyLineOne, bodyX + 60, bodyY);

      bodyY += bodyYModifier;
    }

    if (bodyLineTwo != '') {
      context.fillText(bodyLineTwo, bodyX + 65, bodyY);
      hiddenContext.fillText(bodyLineTwo, bodyX + 65, bodyY);

      bodyY += bodyYModifier;
    }

    if (bodyLineThree != '') {
      context.fillText(bodyLineThree, bodyX, bodyY);
      hiddenContext.fillText(bodyLineThree, bodyX, bodyY);

      bodyY += bodyYModifier;
    }

    if (bodyLineFour != '') {
      context.fillText(bodyLineFour, bodyX, bodyY);
      hiddenContext.fillText(bodyLineFour, bodyX, bodyY);

      bodyY += bodyYModifier;
    }

    if (bodyLineFive != '') {
      context.fillText(bodyLineFive, bodyX, bodyY);
      hiddenContext.fillText(bodyLineFive, bodyX, bodyY);

      bodyY += bodyYModifier;
    }

    if (bodyLineSix != '') {
      context.fillText(bodyLineSix, bodyX, bodyY);
      hiddenContext.fillText(bodyLineSix, bodyX, bodyY);

      bodyY += bodyYModifier;
    }

    if (bodyLineSeven != '') {
      context.fillText(bodyLineSeven, bodyX, bodyY);
      hiddenContext.fillText(bodyLineSeven, bodyX, bodyY);

      bodyY += bodyYModifier;
    }

    if (bodyLineEight != '') {
      context.fillText(bodyLineEight, bodyX, bodyY);
      hiddenContext.fillText(bodyLineEight, bodyX, bodyY);

      bodyY += bodyYModifier;
    }

    if (bodyLineNine != '') {
      context.fillText(bodyLineNine, bodyX, bodyY);
      hiddenContext.fillText(bodyLineNine, bodyX, bodyY);

      bodyY += bodyYModifier;
    }

    if (bodyLineTen != '') {
      context.fillText(bodyLineTen, bodyX, bodyY);
      hiddenContext.fillText(bodyLineTen, bodyX, bodyY);

      bodyY += bodyYModifier;
    }

    if (bodyLineEleven != '') {
      context.fillText(bodyLineEleven, bodyX, bodyY);
      hiddenContext.fillText(bodyLineEleven, bodyX, bodyY);
      
      bodyY += bodyYModifier;
    }

    if (bodyLineTwelve != '') {
      context.fillText(bodyLineTwelve, bodyX, bodyY);
      hiddenContext.fillText(bodyLineTwelve, bodyX, bodyY);
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

  graphChange = (e) => {
    this.setState({articleType: e.target.value},()=>{
      this.paintNewspaper();
    });
  }

  downloadCanvas() {
    const canvas = document.getElementById('canvas');
    let imgData = canvas.toDataURL('image/png');
    var a = document.createElement('a');
    a.href = imgData;
    a.download = 'futureNews.png';
    a.click();
  }

  newsPaper(){
    const canvas = document.getElementById('canvas');
    const hiddenCanvas = document.getElementById('hiddenCanvas');
    let imgData = hiddenCanvas.toDataURL('image/png');
    var a = document.createElement('a');
    a.href = imgData;
    a.download = 'futureNews.png';
    a.click();
  }

  dropdown(){
    if(this.state.articleType == "transformation"){
      return (
        <select class="btn btn-secondary dropdown-toggle"  onChange={this.graphChange}>
        <option value="transformation" selected>Transformation</option>
        <option value="growth">Growth</option>
        <option value="collapse">Collapse</option>
        <option value="constraint">Constraint</option>
      </select>
      );
    } else if(this.state.articleType == "growth"){
      return (
        <select class="btn btn-secondary dropdown-toggle"  onChange={this.graphChange}>
        <option value="transformation">Transformation</option>
        <option value="growth" selected>Growth</option>
        <option value="collapse">Collapse</option>
        <option value="constraint">Constraint</option>
      </select>
      );
    } else if(this.state.articleType == "collapse"){
      return (
        <select class="btn btn-secondary dropdown-toggle"  onChange={this.graphChange}>
        <option value="transformation">Transformation</option>
        <option value="growth">Growth</option>
        <option value="collapse" selected>Collapse</option>
        <option value="constraint">Constraint</option>
      </select>
      );
    } else if(this.state.articleType == "constraint"){
      return (
        <select class="btn btn-secondary dropdown-toggle"  onChange={this.graphChange}>
        <option value="transformation">Transformation</option>
        <option value="growth">Growth</option>
        <option value="collapse">Collapse</option>
        <option value="constraint" selected>Constraint</option>
      </select>
      );
    } 
  }

  componentWillMount(){
    let headline =  this.props.get("headline");
    let articleText = this.props.get("articleText");
    let articleType = this.props.get("articleType");

    if(!(articleType == "growth" || articleType == "collapse" || articleType == "constraint" || articleType == "transformation")){
      articleType = "growth";
    }

    if(articleText == null || articleText == "null"){
      articleText = ""
    }

    if(headline == null || headline == "null"){
      headline = ""
    }

    newsTitle = headline;
    newsBody = articleText;
    this.setState({
      articleTitle: headline,
      articleBody: articleText,
      articleType: articleType});
  }
  componentDidMount(){
    document.getElementById("articleTitle").value = this.state.articleTitle;
    document.getElementById("articleBody").value = this.state.articleBody;

    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    context.scale(0.42, 0.42);

    this.paintNewspaper();
  }
  validateNext = () => {
    window.scrollTo(0,0);
    this.props.update("headline", newsTitle);
    this.props.update("articleText", newsBody);
    this.props.update("articleType", this.state.articleType);
    this.setState({nextPage: true});      
  }
  render() {
  if(this.state.nextPage){
    return (<Redirect to="/"/>)
  } else {
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
    
      <div className="reminderboxcentered">
      <form onSubmit={this.handleSubmit}>
      Headline:<br/>
      <input type="text" size="35" onChange={this.handleHeadlineChange} placeholder="Headline (e.g. 'Astronauts Land On Mars')" className="inputText" id="articleTitle"/><br/>
      Article:<br/>
      <textarea rows="4" cols="35" onChange={this.handleBodyChange} id="articleBody">{this.state.articleText}</textarea><br/>
      <span >
      Graph Type:&nbsp;&nbsp;
      {this.dropdown()}
      </span>
      </form>

      <br/>
      Preview:<br/>
      <canvas id="canvas"  width="270" height="259" style={{backgroundColor: "ffffff"}}/>
      <canvas id="hiddenCanvas" className="hiddenCanvas" width="640" height="640" style={{backgroundColor: "ffffff"}}/>

      <span id="saveButton" className="btn btn-primary" onClick={this.newsPaper}>Save Image</span>
      </div>

      <br/>

      <div className="maintext">
        <p><br/>
            Return to the home page to start your headline over from the beginning.
          <br/><br/>
        </p>    
      </div>
    </div>
  </div>

  <div className="responsebox">
    <span className="warnerror" id="warn"></span><br/>
    <p className="btn btn-primary"  onClick={this.validateNext}>Return Home</p><br/>
  </div>
</div> 
    );   
    }
  }
}

export default StepFive;	
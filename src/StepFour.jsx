import * as React from 'react';
import './App.css';
import { Route, Redirect } from 'react-router'

class StepFour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: false,
      chosenSignalTitle: false,
      chosenSignalLink: false,
      chosenSignalImg: false,
      chosenYears: false,
      chosenDriverA: false,
      chosenDriverB: false,
      headline: false,
      articleText: false,
      nextPage: false,
      goBack: false,
      transformationText: "",
      growthText: "",
      collapseText: "",
      constraintText: "",
      articleText: "",
      articleType: false
    }
  }
  resetBox(){
    this.setState({articleType: false});
  }
  checkboxChange(checkNum){
    switch (checkNum) {
        case 0:
          document.getElementById("box1").checked = false
          document.getElementById("box2").checked = false
          document.getElementById("box3").checked = false
          this.setState({articleType: "transformation"},()=>{this.handleBodyChange()})
        break;
        case 1:
          document.getElementById("box0").checked = false
          document.getElementById("box2").checked = false
          document.getElementById("box3").checked = false
          this.setState({articleType: "growth"},()=>{this.handleBodyChange()})
        break;
        case 2:
          document.getElementById("box0").checked = false
          document.getElementById("box1").checked = false
          document.getElementById("box3").checked = false
          this.setState({articleType: "collapse"},()=>{this.handleBodyChange()})
        break;
        case 3:
          document.getElementById("box0").checked = false
          document.getElementById("box1").checked = false
          document.getElementById("box2").checked = false
          this.setState({articleType: "constraint"},()=>{this.handleBodyChange()})
        break;
      }
  }
  handleBodyChange = ()=>{
    const blurb = document.getElementById("articleBody").value;
    this.setState({articleText: blurb}); 
    console.log(blurb);
  }
  multipleChoice(){
    if(this.state.headline){
      if(!this.state.articleType){
        return (<div>
          <center><h2>{this.state.headline}</h2></center>
  
          <table className="table table-striped table-dark">
                      <tr>
          <td><input type="radio" id="box0" onClick={() => this.checkboxChange(0)}></input></td>
          <td onClick={() => this.checkboxChange(0)}><span className="highlighted" style={{ textAlign: "justify"}}>Transformation</span>:&nbsp;{this.state.transformationText}</td>
          </tr>
          <tr>
          <td><input type="radio" id="box1" onClick={() => this.checkboxChange(1)}></input></td>
          <td onClick={() => this.checkboxChange(1)}><span className="highlighted">Growth</span>:&nbsp;{this.state.growthText}</td>
          </tr>
          <tr>
          <td><input type="radio" id="box2" onClick={() => this.checkboxChange(2)}></input></td>
          <td onClick={() => this.checkboxChange(2)}><span className="highlighted">Collapse</span>:&nbsp;{this.state.collapseText}</td>
          </tr>
          <tr>
          <td><input type="radio" id="box3" onClick={() => this.checkboxChange(3)}></input></td>
          <td onClick={() => this.checkboxChange(3)}><span className="highlighted">Constraint</span>:&nbsp;{this.state.constraintText}</td>
          </tr>
          </table>
          </div>)
        } else if(this.state.articleType == "transformation"){
          return (<div>
            <center><h2>{this.state.headline}</h2></center>
    
            <table className="table table-striped table-dark">
                        <tr>
            <td><input type="radio" checked onClick={() => this.resetBox()}></input></td>
            <td onClick={() => this.resetBox()}><span className="highlighted" style={{ textAlign: "justify"}}>Transformation</span>:&nbsp;{this.state.transformationText}</td>
            </tr>
            </table>
    
            <div>
            <center><textarea rows="10" cols="35" onChange={this.handleBodyChange} id="articleBody">{this.state.transformationBlurb}</textarea></center>
            </div>
            <center>Click inside the box to <b>edit</b> the text.</center>
    
            </div>)
          } else if(this.state.articleType == "growth"){
          return (<div>
            <center><h2>{this.state.headline}</h2></center>
    
            <table className="table table-striped table-dark">
                        <tr>
            <td><input type="radio" checked onClick={() => this.resetBox()}></input></td>
            <td onClick={() => this.resetBox()}><span className="highlighted" style={{ textAlign: "justify"}}>Growth</span>:&nbsp;{this.state.growthText}</td>
            </tr>
            </table>
    
            <div>
            <center><textarea rows="10" cols="35" onChange={this.handleBodyChange} id="articleBody">{this.state.growthBlurb}</textarea></center>
            </div>
            <center>Click inside the box to <b>edit</b> the text.</center>
    
            </div>)
          }  else if(this.state.articleType == "collapse"){
          return (<div>
            <center><h2>{this.state.headline}</h2></center>
    
            <table className="table table-striped table-dark">
                        <tr>
            <td><input type="radio" checked onClick={() => this.resetBox()}></input></td>
            <td onClick={() => this.resetBox()}><span className="highlighted" style={{ textAlign: "justify"}}>Collapse</span>:&nbsp;{this.state.collapseText}</td>
            </tr>
            </table>
    
            <div>
            <center><textarea rows="10" cols="35" onChange={this.handleBodyChange} id="articleBody">{this.state.collapseBlurb}</textarea></center>
            </div>
            <center>Click inside the box to <b>edit</b> the text.</center>
    
            </div>)
          }  else if(this.state.articleType == "constraint"){
          return (<div>
            <center><h2>{this.state.headline}</h2></center>
    
            <table className="table table-striped table-dark">
                        <tr>
            <td><input type="radio" checked onClick={() => this.resetBox()}></input></td>
            <td onClick={() => this.resetBox()}><span className="highlighted" style={{ textAlign: "justify"}}>Constraint</span>:&nbsp;{this.state.constraintText}</td>
            </tr>
            </table>
    
            <div>
            <center><textarea rows="10" cols="35" onChange={this.handleBodyChange} id="articleBody">{this.state.constraintBlurb}</textarea></center>
            </div>
            <center>Click inside the box to <b>edit</b> the text.</center>
    
            </div>)
          }
    } else {
      return (<div><center><span className="warnerror">You must complete step 3 to continue</span><br/><br/>
      <button className="btn btn-primary"  onClick={()=>{this.setState({goBack: true})}}>Back to Step 3</button></center></div>)
    }
  }
  componentWillMount(){
    const searchTerm = this.props.get("searchTerm");
    const headline =  this.props.get("headline");
    const chosenDriverA = this.props.get("chosenDriverA");
    const chosenDriverB = this.props.get("chosenDriverB");
    const chosenSignalTitle = this.props.get("chosenSignalTitle");
    const chosenSignalLink = this.props.get("chosenSignalLink");
    const chosenSignalImg = this.props.get("chosenSignalImg");
    const chosenYears = this.props.get("chosenYears");

    console.log(chosenYears)
    const transformationBlurb = "A surprising interaction between "+chosenDriverA+" and "+chosenDriverB+" has lead to new possibilities for "+searchTerm+". Headlines from "+chosenYears+" years ago, such as '"+chosenSignalTitle+"', seemed to foreshadow a transformative change. Experts say the transformation of "+searchTerm+" is a testament to human ingenuity.";
    const growthBlurb = "It turns out that "+chosenDriverA+" and "+chosenDriverB+" are joining forces to create explosive growth for "+searchTerm+". Headlines from "+chosenYears+" years ago, such as '"+chosenSignalTitle+"', are now being cited as an early signal of progress. Experts wonder if continuous growth could lead to new possibilities for "+searchTerm+" in the future.";
    const collapseBlurb = "The unexpected union of "+chosenDriverA+" and "+chosenDriverB+" have had a devastating impact on "+searchTerm+". Headlines from "+chosenYears+" years ago, such as '"+chosenSignalTitle+"', are now being considered as an early warning of the collapse. Experts hope that the collapse of "+searchTerm+" helps us learn how to tackle similar problems in the future.";
    const constraintBlurb = "New restrictions placed on "+searchTerm+" were largely caused by "+chosenDriverA+" and "+chosenDriverB+". Headlines from "+chosenYears+" years ago, such as '"+chosenSignalTitle+"', are now being viewed as a possible cause of the new constraints. Experts are concerned about what the constraints placed on "+searchTerm+" say about our collective values.";

    const transformationText = "This headline is exciting news about "+searchTerm+" and represents an uncertain future. After this headline, nothing will ever be the same!";
    const growthText = "This headline is good news about "+searchTerm+" and represents a positive future. Trends and conditions progress in a continuous direction.";
    const collapseText = "This headline is bad news about "+searchTerm+" and represents a stagnant future. The status quo isn't working out and things are only getting worse.";
    const constraintText = "This headline is depressing news about "+searchTerm+" and represents a modest future. External forces prevent growth, collapse, or transformation from happening.";

    this.setState({
      searchTerm: searchTerm,
      headline: headline,
      chosenDriverA: chosenDriverA,
      chosenDriverB: chosenDriverB,
      chosenSignalTitle: chosenSignalTitle,
      chosenSignalLink: chosenSignalLink,
      chosenSignalImg: chosenSignalImg,
      chosenYears: chosenYears,
      transformationText: transformationText,
      growthText: growthText,
      collapseText: collapseText,
      constraintText: constraintText,
      transformationBlurb: transformationBlurb,
      growthBlurb: growthBlurb,
      collapseBlurb: collapseBlurb,
      constraintBlurb: constraintBlurb
      });
  }
  validateNext = () => {
    if(this.state.articleText !== "" && 
    this.state.articleText !== this.state.transformationBlurb && 
    this.state.articleText !== this.state.growthBlurb && 
    this.state.articleText !== this.state.collapseBlurb && 
    this.state.articleText !== this.state.constraintBlurb){
      window.scrollTo(0,0);
      this.props.update("articleText", this.state.articleText);
      this.props.update("articleType", this.state.articleType);
      this.setState({nextPage: true});      
    } else {
      document.getElementById("warn").innerHTML = "You must <b>edit</b> your blurb to continue.";
    }
  }
  render() {
      if(this.state.nextPage){
        return (<Redirect to="/five"/>)
      } else if(this.state.goBack) {
        return (<Redirect to="/three"/>)
      } else {
        return (
<div className="App">
  <div className="jumbotron jumbotron-fluid">
    <div className="container">
      <br/>
      <h2 id="title">Step 4: Alternative Future Scenarios</h2>
      <br/>

      <div className="maintext">
        <p>When a single future cannot be predicted, alternative futures can be envisioned. Four archetypes― <em>growth, collapse, constraint,</em> and <em>transformation</em>― help us envision distinct variations of the future.</p>
        <p>On this step, we'll choose from four templates to help us write a blurb that fleshes out our headline. First choose one of the four options to generate an example blurb. Then edit the example text so that it better explains the idea behind your headline.</p> 
      </div>

      <div className="reminderbox">
      {this.multipleChoice()}
      </div>

      <div className="maintext">
        <p><br/>
            Choose a scenario and edit your blurb do continue.
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

export default StepFour;
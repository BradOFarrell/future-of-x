import * as React from 'react';
import './App.css';
import { Route, Redirect } from 'react-router'

class StepFour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: false,
      chosenSignal: false,
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
      articleText: ""
    }
  }
  checkboxChange(checkNum){
    let chosenArticleText = ""

    switch (checkNum) {
        case 0:
          chosenArticleText = this.state.transformationText
          document.getElementById("box1").checked = false
          document.getElementById("box2").checked = false
          document.getElementById("box3").checked = false
        break;
        case 1:
          chosenArticleText = this.state.growthText
          document.getElementById("box0").checked = false
          document.getElementById("box2").checked = false
          document.getElementById("box3").checked = false
        break;
        case 2:
          chosenArticleText = this.state.collapseText
          document.getElementById("box0").checked = false
          document.getElementById("box1").checked = false
          document.getElementById("box3").checked = false
        break;
        case 3:
          chosenArticleText = this.state.constraintText
          document.getElementById("box0").checked = false
          document.getElementById("box1").checked = false
          document.getElementById("box2").checked = false
        break;
      }
    this.setState({articleText: chosenArticleText});
    console.log();
  }
  multipleChoice(){
    if(this.state.headline){
      return (<div>
        <center><h2>{this.state.headline}</h2></center>

        <table className="table table-striped table-dark">
                    <tr>
        <td><input type="checkbox" id="box0" onChange={() => this.checkboxChange(0)}></input></td>
        <td><span className="highlighted">Transformation</span>:&nbsp;"{this.state.transformationText}"</td>
        </tr>
        <tr>
        <td><input type="checkbox" id="box1" onChange={() => this.checkboxChange(1)}></input></td>
        <td><span className="highlighted">Growth</span>:&nbsp;"{this.state.growthText}"</td>
        </tr>
        <tr>
        <td><input type="checkbox" id="box2" onChange={() => this.checkboxChange(2)}></input></td>
        <td><span className="highlighted">Collapse</span>:&nbsp;"{this.state.collapseText}"</td>
        </tr>
        <tr>
        <td><input type="checkbox" id="box3" onChange={() => this.checkboxChange(3)}></input></td>
        <td><span className="highlighted">Constraint</span>:&nbsp;"{this.state.constraintText}"</td>
        </tr>
        </table>
        </div>)
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
    const chosenSignal = this.props.get("chosenSignal");

    const transformationText = "A surprising interaction between "+chosenDriverA+" and "+chosenDriverB+" has lead to new possibilities for "+searchTerm+". Recent events, such as '"+chosenSignal+"', seemed to signal a transformative change.";
    const growthText = "It turns out that "+chosenDriverA+" and "+chosenDriverB+" are joining forces to create explosive growth for "+searchTerm+". Recent events, such as '"+chosenSignal+"', are now being cited as an early signal of progress.";
    const collapseText = "The unexpected union of "+chosenDriverA+" and "+chosenDriverB+" have had a devastating impact on "+searchTerm+". Recent events, such as '"+chosenSignal+"', are now being considered as a signal of the collapse.";
    const constraintText = "New restrictions placed on "+searchTerm+" were largely caused by "+chosenDriverA+" and "+chosenDriverB+". Recent events, such as '"+chosenSignal+"', are now being viewed as a signal of the new constraints.";

    this.setState({
      searchTerm: searchTerm,
      headline: headline,
      chosenDriverA: chosenDriverA,
      chosenDriverB: chosenDriverB,
      chosenSignal: chosenSignal,
      transformationText: transformationText,
      growthText: growthText,
      collapseText: collapseText,
      constraintText: constraintText
      });
  }
  validateNext = () => {
    if(this.state.articleText){
      window.scrollTo(0,0);
      this.props.update("articleText", this.state.articleText);
      this.setState({nextPage: true});      
    } else {
      document.getElementById("warn").innerHTML = "You must select an option.";
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
        <p>The following options are examples of what an article for your headline could look like. They may read like mad-libs, but they are only intended as a baseline; you will be able to edit them fully in the final step.</p>    
      </div>

      <div className="reminderbox">
      {this.multipleChoice()}
      </div>

      <div className="maintext">
        <p><br/>
            Choose a scenario to move on to the final step.
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
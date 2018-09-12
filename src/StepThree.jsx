import * as React from 'react';
import './App.css';
import { Route, Redirect } from 'react-router'

class StepThree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: false,
      signals: false,
      drivers: false,
      randomDrivers: new Array(),
      randomSignal: "",
      lastSiRan: -1,
      lastDrRan: -1,
      goBackToOne: false,
      goBackToTwo: false,
      nextPage: false
    }
  }
  reroll = () =>{
    const si = this.state.signals;
    const dr = this.state.drivers;
    let siRan = Math.floor(Math.random() * 3);
    let drRan = Math.floor(Math.random() * 3);

    console.log(siRan, drRan, this.state.lastSiRan, this.state.lastDrRan);

    while(siRan == this.state.lastSiRan || drRan == this.state.lastDrRan){
      siRan = Math.floor(Math.random() * 3);
      drRan = Math.floor(Math.random() * 3);
      console.log("reRoll")
    }

    let randomSignal = si[siRan];
    let randomDrivers = new Array();

    switch (drRan) {
      case 0:
        randomDrivers[0] = dr[0];
        randomDrivers[1] = dr[1];
        break;
      case 1:
        randomDrivers[0] = dr[1];
        randomDrivers[1] = dr[2];
        break;
      case 2:
        randomDrivers[0] = dr[2];
        randomDrivers[1] = dr[0];
        break;
      }

      this.setState({randomSignal: randomSignal,
                     randomDrivers: randomDrivers,
                     lastSiRan: siRan,
                     lastDrRan: drRan});
  }
  validateNext = () => {
    const headline = document.getElementById("headline").value;
    if(headline){
      window.scrollTo(0,0);
      this.props.update("chosenDriverA", this.state.randomDrivers[0]);
      this.props.update("chosenDriverB", this.state.randomDrivers[1]);
      this.props.update("chosenSignal", this.state.randomSignal);
      this.props.update("headline", headline);
      this.props.update("searchTerm", this.state.searchTerm);
      this.setState({nextPage: true});      
    } else {
      document.getElementById("warn").innerHTML = "You must write a headline.";
    }
  }
  randomPrompt = () => {
    const stepOneDone = (!this.state.signals || !this.state.signals[0]);
    const stepTwoDone = (!this.state.drivers || !this.state.drivers[0]);
    if(stepOneDone){
      return (<div><span className="warnerror">You must complete step 1 to continue</span><br/><br/>
      <button className="btn btn-primary"  onClick={()=>{this.setState({goBackToOne: true})}}>Back to Step 1</button></div>)
    } else if(stepTwoDone){
      return (<div><span className="warnerror">You must complete step 2 to continue</span><br/><br/>
      <button className="btn btn-primary"  onClick={()=>{this.setState({goBackToTwo: true})}}>Back to Step 2</button></div>)
    } else if(this.state.randomSignal){
      return (<div>
        
        Imagine a combination of<br/>
        <h2>{this.state.randomDrivers[0]} + {this.state.randomDrivers[1]}</h2>
        and the affect it would have on<br/>
        <span className="highlighted">{this.state.randomSignal}</span><br/><br/>

        <button className="btn btn-primary"  onClick={()=>{this.reroll()}}>Generate New Random Prompt</button>
      </div>);
    } else {
      return (<div>loading...</div>);
    }
  }
  componentWillMount(){
    this.setState({
      searchTerm: this.props.get("searchTerm"),
      drivers: this.props.get("drivers"),
      signals: this.props.get("signals")}, ()=>{
        this.reroll()}
      );
    }
  render() {
    {
      if(this.state.nextPage){
        return (<Redirect to="/four"/>)
      } else if(this.state.goBackToOne) {
        return (<Redirect to="/one"/>)
      } else if(this.state.goBackToTwo) {
        return (<Redirect to="/two"/>)
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

      <div className="reminderboxcentered">
        {this.randomPrompt()}
      </div>

      <div className="maintext">
        <p><br/>
          Write a headline based on the prompt above.<br/><br/>

          <div className="responsebox">
          <input type="text" size="30" placeholder="Headline (e.g. 'Water Found On Mars')"  id="headline"/><br/><br/>
          </div>

          If your prompts are all too similar you can go back and edit the <a href="" onClick={()=>{this.setState({goBackToOne: true})}}>signals</a> or <a  href="" onClick={()=>{this.setState({goBackToTwo: true})}}>drivers</a>.
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
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
      randomYears: -1,
      lastSiRan: -1,
      lastYrRan: -1,
      goBackToOne: false,
      goBackToTwo: false,
      nextPage: false
    }
  }
  reroll = () =>{
    const si = this.state.signals;
    const dr = this.state.drivers;
    let siRan = Math.floor(Math.random() * 3);
    let yrRan = Math.floor(Math.random() * 3);
    let drRan1 = Math.floor(Math.random() * 5);
    let drRan2 = Math.floor(Math.random() * 5);
    let randomSignal;
    let randomYears;
    let randomDrivers = new Array();

    // Reroll drivers if they are the same
    while(drRan1 == drRan2){
      drRan2 = Math.floor(Math.random() * 5);
      console.log("reRoll")
    }

    // Reroll signal if it's not a new value
    while(siRan == this.state.lastSiRan){
      siRan = Math.floor(Math.random() * 3);
      console.log("reRoll")
    }

    // Reroll years if it's not a new value
    while(yrRan == this.state.lastYrRan){
      yrRan = Math.floor(Math.random() * 3);
      console.log("reRoll")
    }

    // Set signal
    randomSignal = si[siRan];

    // Set year
           if(yrRan == 0){
      randomYears = 15;
    } else if(yrRan == 1){
      randomYears = 5;
    } else if(yrRan == 2){
      randomYears = 10;
    } 

    // Set drivers
    randomDrivers[0] = dr[drRan1];
    randomDrivers[1] = dr[drRan2];

      console.log(randomSignal,randomDrivers)

      this.setState({randomSignal: randomSignal,
                     randomDrivers: randomDrivers,
                     randomYears: randomYears,
                     lastSiRan: siRan,
                     lastYrRan: yrRan});
  }
  validateNext = () => {
    const headline = document.getElementById("headline").value;
    if(headline){
      window.scrollTo(0,0);
      this.props.update("chosenDriverA", this.state.randomDrivers[0]);
      this.props.update("chosenDriverB", this.state.randomDrivers[1]);
      this.props.update("chosenSignalTitle", this.state.randomSignal.title);
      this.props.update("chosenSignalLink", this.state.randomSignal.link);
      this.props.update("chosenSignalImg", this.state.randomSignal.img);
      this.props.update("chosenYears", this.state.randomYears);
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
      return (<div className="reminderboxcentered">
              <div><span className="warnerror">You must complete step 1 to continue</span><br/><br/>
              <button className="btn btn-primary"  onClick={()=>{this.setState({goBackToOne: true})}}>Back to Step 1</button></div>
              </div>)
    } else if(stepTwoDone){
      return (<div className="reminderboxcentered">
              <div><span className="warnerror">You must complete step 2 to continue</span><br/><br/>
              <button className="btn btn-primary"  onClick={()=>{this.setState({goBackToTwo: true})}}>Back to Step 2</button></div>
              </div>)
    } else if(this.state.randomSignal){
      return (<div className="reminderboxcentered"
      style={{backgroundColor: "#2d2d2d",
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              backgroundBlendMode: "darken",
              backgroundImage: "url(" + this.state.randomSignal.img + ")",
              backgroundSize: "contain", backgroundPosition: "50% 0"
              }}>
        
      Imagine an interaction between <span className="highlighted">"{this.state.randomDrivers[0]}"</span> and <span className="highlighted">"{this.state.randomDrivers[1]}"</span>.
      How could it affect <span className="highlighted">{this.state.searchTerm}</span> in the next <span className="highlighted">{this.state.randomYears} years</span>? What would it mean for the <span className="highlighted">future</span> of this signal:
      <br/><br/>

      <a target="_blank" href={this.state.randomSignal.link}>
      <img src={this.state.randomSignal.img} style={{margin: "0px 10px 10px 10px", borderStyle: "solid", borderWidth: "2px", float:"right", width:"100px"}}></img>
      {this.state.randomSignal.title}<br/><br/>
      </a>

            <button className="btn btn-primary"  onClick={()=>{this.reroll()}}>Generate New Random Prompt</button>
            </div>);
    } else {
      return (<div>loading...</div>);
    }
  }
  componentWillMount(){
    const getDrivers = this.props.get("drivers")
    const getSignals = this.props.get("signals")
    

    console.log(getDrivers)
    console.log(getSignals)
  
    this.setState({
      searchTerm: this.props.get("searchTerm"),
      drivers: getDrivers,
      signals: getSignals},
      ()=>{this.reroll()}
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
        <p>This tool will take signals and drivers collected on the previous steps and combine them randomly. You can use this as a prompt to write a headline from the future.</p>    
        <p>So far the data we've been collecting has been focused on recent events. But on this step we want to focus on imagining potential <b>future events</b>. Remember, you are not predicting what you think <i>will happen</i>, but simply imagining something that <i>could happen</i>.</p> 
      </div>

        {this.randomPrompt()}

      <div className="maintext">
        <p><br/>
          Write a headline based on the prompt above.<br/><br/>

          <div className="responsebox">
          <center><input type="text" size="30" placeholder="(e.g. 'Water Found On Mars')"  id="headline"/></center><br/>
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
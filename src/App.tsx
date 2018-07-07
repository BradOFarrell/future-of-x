import * as React from 'react';
import './App.css';
import Content from './Content';

class App extends React.Component {
  public render() {
    const somevar = Content.get("intro");
    if(somevar){
      return (
        <div className="App">
  
    <div className="jumbotron jumbotron-fluid">
    <div className="container">
      <br/>
      <h2>The Future of X</h2>
      <br/>
  
      <div className="reminderbox">
      <span className="remindertitle">Orient to the Future</span>
      <br/>
      Ask your teammates this question, and take a temperature of the room. The group must collectively decide on an option. Then the leader must select the option below.
      </div>
  
      <br/>
  
      <div className="promptbox">
      <p>"In my current position, I feel quite <span className="replyspan">[ Empowered / Disempowered ]</span> about helping my organization (or my client’s organization) move toward a positive future."</p>    
      </div>
  
      <div className="responsebox">
      <p className="btn btn-primary">Empowered</p> 
      <br/>
      <p className="btn btn-primary">Disempowered</p> 
      <br/>
      </div>
  
    </div>
  </div>
  <br/>
  <p className="btn btn-secondary">Go back</p>     
  <p className="backwarning">Don't use your browser's back button.</p>
  
  
        </div>
  
      );        
    }
    else {
      return (false);
    }
  }
}

export default App;
import * as React from 'react';
import './App.css';

class Home extends React.Component {
  render() {
    {
      return (
<div className="App">  
  <div className="jumbotron jumbotron-fluid">
    <div className="container">
      <br/>
      <h2>The Future of [X]</h2>
      <br/>

      <div className="maintext">
      <p>This web-app will help you develop a unique perspective on the future of an industry, a company, or even your own personal future. For example, you could use it forecast The Future of Cellphones, The Future of Baseball, or The Future of San Francisco.</p> 
      <p>Neuroscientists have discovered techniques for increasing our cognitive flexibility, which allows us to imagine new possibilities. These scientific techniques form the basis of Futures Thinking.</p>
      </div>
      <div className="reminderbox">
      <span className="remindertitle">What is Futures Thinking?</span>
      <br/>
      Every successful strategy is based on a great insight about the future. By systematically studying the long-term future you can make better decisions in the present. Futures Thinking provides the foresight that sparks critical new insights ultimately leading to better actions today.
      </div>
      <br/>  
      <div className="maintext">
      <p>This application is a collection of Futures Thinking tools, adapted from the <a href="http://www.iftf.org/futuresthinking/">IFTF Futures Thinking Toolkit</a>. As you progress through each tool, you'll be building a complex model for the future that will be displayed on the final step.</p>    
      </div>
      <br/>    
      <div className="responsebox">
      <p className="btn btn-primary"  onClick={() => {window.location = "/one"}}>Get Started</p> 
      <br/>
    </div>
    </div>
  </div>
  <br/>
  <button type="button" class="btn btn-secondary">Go back</button>     
</div>  
      );        
    }
  }
}

export default Home;
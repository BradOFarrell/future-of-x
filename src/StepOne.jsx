import * as React from 'react';
import Parser from 'rss-parser';
import './App.css';

const parser = new Parser();
let searchTerm = "";
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

(async () => {
 
  const feed = await parser.parseURL(CORS_PROXY + 'https://news.google.com/news/rss/search/section/q/fishing');
  console.log(feed.title);
})();

class StepOne extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      newsfeed: new Array()
    }
  }
  feedlist() {
    let output = {};
//    output = (<li>{this.state.newsfeed[0].title}</li>);
    if(this.state.newsfeed[0]){
      output = this.state.newsfeed.map(e =>{
        return (<tr><td><input type="checkbox"></input></td><td key={e.title}><a href={e.link} target="_blank">{e.title}</a></td></tr>);
      });  
      return (<table className="table table-striped table-dark">{output}</table>)
    } else {
      return (<p><br/>Use the search box above to generate headlines.</p>)
    }
  }
  handleChange = (e) => {
    searchTerm = e.target.value;
    console.log(searchTerm)
  }
  handleSubmit= (e) => {
    e.preventDefault();
    const output = new Array();
    (async () => {
      const feed = await parser.parseURL(CORS_PROXY + 'https://news.google.com/news/rss/search/section/q/' + searchTerm);

      feed.items.forEach(item => {
       output.push({title: item.title, link: item.link})
      });
      console.log(JSON.stringify(output));
      this.setState({newsfeed: output})
    })();
  }
  render() {
    {
      return (
        <div className="App">
  
    <div className="jumbotron jumbotron-fluid">
    <div className="container">
      <br/>
      <h2 id="title">Step 1: Look Back To Look Forward</h2>
      <br/>
  
      <div className="container-fluid maintext hide">
      <p>
        Imagining a future that is very different from today can often be challenging. But change happens – and it can happen faster than we expect.
        <br/><br/>
         Looking to the past helps us plan for the future. Use ths tool to search for recent headlines. Choose three that you think signal a dramatic change in the status quo for [X]. We will use them on a later step.</p>    
      </div>
    
      <form onSubmit={this.handleSubmit}>
      <input type="text" placeholder="SEARCH TERM" className="inputText" id="myUnit"
        onChange={this.handleChange}/>
      <button type="submit" className="btn btn-primary">GO</button>
      </form>

      <div className="reminderbox">
      {this.feedlist()}  
      </div>
  
      <br/>
  
      <div className="maintext">
      <p>Select three headlines to move on to the next step.
      </p>    
      </div>
  
      <div className="responsebox">
      <p className="btn btn-primary"  onClick={() => {window.location = "/Two"}}>Next Step</p> 
      </div>
  
    </div>
  </div>
  <br/>
  <p className="btn btn-secondary">Go back</p>     
        </div>
  
      );        
    }
  }
}

export default StepOne;
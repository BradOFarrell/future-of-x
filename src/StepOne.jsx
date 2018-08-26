import * as React from 'react';
import Parser from 'rss-parser';
import './App.css';

const parser = new Parser();
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
(async () => {
 
  const feed = await parser.parseURL(CORS_PROXY + 'https://news.google.com/news/rss/search/section/q/fishing');
  console.log(feed.title);
})();

class StepOne extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      newsfeed: new Array(),
      searchTerm: "",
      articles: new Array(),
      checkedBoxes: new Array(),
      totalCheckedBoxes: 0
    }
  }
  checkboxChange = (e) => {
    console.log(e.target.id)
    console.log(e.target.checked)  
    if(e.target.checked){
      this.state.checkedBoxes.push(e.target.id)
    } else {
      for(let i = 0; i < this.state.checkedBoxes.length; i++){
        if(this.state.checkedBoxes[i] == e.target.id)
        this.state.checkedBoxes.splice(i, 1);
      }
    }
    if(this.state.checkedBoxes.length == 3){
      document.getElementById("warn").innerHTML = "";
      for(let i = 0; i < this.state.totalCheckedBoxes; i++){
        const boxId = "checkbox"+i;
        if(boxId != this.state.checkedBoxes[0] && boxId != this.state.checkedBoxes[1] && boxId != this.state.checkedBoxes[2]){
          document.getElementById("checkboxContainer"+i).style.display = "none";
        }
      }
    } else {
      for(let i = 0; i < this.state.totalCheckedBoxes; i++){
        document.getElementById("checkboxContainer"+i).style.display = "table";
      }
    }
  }
  feedlist() {
    let output = {};
    let id = 0;
    console.log("feedlist");
    if(this.state.newsfeed[0]){
      output = this.state.newsfeed.map(e =>{
        const output = (<tr id={"checkboxContainer"+id}><td>
        <input type="checkbox" id={"checkbox"+id} onChange={this.checkboxChange}></input></td>
        <td key={e.title}><a href={e.link} target="_blank">{e.title}</a></td></tr>)
        id++;
        return (output);
      });
      this.state.totalCheckedBoxes = id;
      return (<table className="table table-striped table-dark">{output}</table>)
    } else {
      return (<p><br/>Use the search box above to generate headlines.</p>)
    }  
  }
  searchChange = (e) => {
    this.state.searchTerm = e.target.value;
    console.log(this.state.searchTerm)
  }
  handleSubmit= (e) => {
    e.preventDefault();
    const output = new Array();
    (async () => {
      const feed = await parser.parseURL(CORS_PROXY + 'https://news.google.com/news/rss/search/section/q/' + this.state.searchTerm);

      feed.items.forEach(item => {
       output.push({title: item.title, link: item.link})
      });
      console.log(JSON.stringify(output));
      this.setState({newsfeed: output})
    })();
  }
  validateNext = () => {
    if(this.state.checkedBoxes.length == 3){
      // Send data to app state
      window.location = "/two";
    } else {
      document.getElementById("warn").innerHTML = "You must select three headlines.";
    }
  }
  render() {
    {
      return (
<div className="App">
  <div className="jumbotron jumbotron-fluid">
    <div className="container">
      <br/>
      <h2 id="title">Step 1: Collect Signals</h2>
      <br/>

      <div className="container-fluid maintext hide">
        <p>
        Imagining a future that is very different from today can often be challenging. But change happens – and it can happen faster than we expect.
        <br/><br/>
        We will use this tool to look for headlines that seem to signal a change in the future. A <em>signal</em> is a recent small or local innovation with the potential to scale in impact and affect other places, people, or markets.
        <br/><br/>
        </p>    
      </div>

      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="SEARCH TERM" className="inputText" id="myUnit"
        onChange={this.searchChange}/>
        <button type="submit" className="btn btn-primary">GO</button>
      </form>

      <div className="reminderbox">
        {this.feedlist()}  
      </div>

      <br/>

      <div className="container-fluid maintext hide">
        <p>
          Select three headlines that seem to signal <em>different</em> directions for the future. 
          We will use your selection again on a later step.
          <br/><br/>
        </p>    
      </div>
    </div>
  </div>

  <div className="responsebox">
  <span className="warnerror" id="warn"></span>
  <br/>
  <p className="btn btn-primary"  onClick={this.validateNext}>Next Step</p>
  <br/>
  </div>
</div>
      );        
    }
  }
}

export default StepOne;
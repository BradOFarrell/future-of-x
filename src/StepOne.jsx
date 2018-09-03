import * as React from 'react';
import Parser from 'rss-parser';
import './App.css';
import { Route, Redirect } from 'react-router'

const parser = new Parser();
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

class StepOne extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      newsfeed: new Array(),
      searchTerm: "",
      articles: new Array(),
      checkedBoxes: new Array(),
      totalCheckedBoxes: 0,
      nextPage: false
    }
  }
  checkboxChange = (e) => {
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
  addOrRemoveTitle(title){
    const art = this.state.articles;
    console.log(title)
    if(this.state.articles.indexOf(title) > -1){
      art.splice(art.indexOf(title), 1)
    } else {
      this.state.articles.push(title)
    }
    console.log(art);
  }
  feedlist() {
    let output = {};
    let id = 0;

    if(this.state.loading){
      return (<p><br/>⌛ Searching "{this.state.searchTerm}" on Google News...</p>)
    } else {
      if(this.state.newsfeed[0]){
        output = this.state.newsfeed.map(e =>{
          const output = (<tr id={"checkboxContainer"+id}><td>
          <input type="checkbox" id={"checkbox"+id} onChange={this.checkboxChange} onClick={() => this.addOrRemoveTitle(e.title)}></input></td>
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
  }
  searchChange = (e) => {
    this.setState({searchTerm: e.target.value})    
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.generateHeadlines();
  }
  generateHeadlines = () => {
    this.setState({loading: true});    
    const output = new Array();
    console.log(this.state.searchTerm);
    (async () => {
      const feed = await parser.parseURL(CORS_PROXY + 'https://news.google.com/news/rss/search/section/q/' + this.state.searchTerm);

      feed.items.forEach(item => {
       output.push({title: item.title, link: item.link})
      });
      this.setState({loading: false});
      console.log(JSON.stringify(output));
      this.setState({newsfeed: output})
    })();
  }
  validateNext = () => {
    if(this.state.checkedBoxes.length == 3){
      window.scrollTo(0,0);
      this.props.update("searchTerm", this.state.searchTerm);
      this.props.update("articles", this.state.articles);
      this.setState({nextPage: true});
        } else {
      document.getElementById("warn").innerHTML = "You must select three headlines.";
    }
  }
  componentDidMount(){
    const term = this.props.get("searchTerm")
    if(term) {
      this.setState({searchTerm: term},()=>{
        this.generateHeadlines();
      });
      document.getElementById("searchBox").value = term;
    }
  }
  render() {
  if(this.state.nextPage){
    return (<Redirect to="/two"/>)
  } else {
    return (
<div className="App">
  <div className="jumbotron jumbotron-fluid">
    <div className="container">
      <br/>
      <h2 id="title">Step 1: Collect Signals</h2>
      <br/>

      <div className="maintext">
        <p>Imagining a future that is very different from today can often be challenging. But change happens – and it can happen faster than we expect.</p>
        <p>We will use this tool to look for headlines that seem to signal a change in the future. A <em>signal</em> is a recent small or local innovation with the potential to scale in impact and affect other places, people, or markets.</p>    
      </div>

      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="SEARCH TERM" className="inputText"  id="searchBox"
        onChange={this.searchChange}/>
        <button type="submit" className="btn btn-primary">GO</button>
      </form>

      <div className="reminderbox">
        {this.feedlist()}  
      </div>

      <br/>

      <div className="maintext">
        <p>
          Select three headlines that seem to signal <em>different</em> directions for the future. 
          We will use your selection again on a later step.
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

export default StepOne;
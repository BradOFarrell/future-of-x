import * as React from 'react';
import WordCloud from 'wordcloud';
import './App.css';
import MostCommon from 'most-common';
import Parser from 'rss-parser';
import './App.css';
import { Route, Redirect } from 'react-router'

const parser = new Parser();
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

const width = window.innerWidth;
const bgColor = "#2d2d2d";

class StepTwo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      newsfeed: new Array(),
      boxCounter: 0,
      loading: false,
      nextPage: false
    }
  }
  cloudCanvas(query, newsfeed) {
    let removedWords = [" s ", " but "," and", " yet "," of ", " the ", " in ", " on ", " at ", " to ", " a ", " an ", " for ", " is ", " will ", " be ", " news ", " if ", " about ", " after "," shit "," fuck "," undefined "];
    let processedTitles = '';
    let wordCollection = [];
    let mostCommonWords;
    let outerArray = [];

    // Add query to removed words list
    query.toLowerCase().split(' ').forEach(word => {
      removedWords.push(" "+word+" ")
      removedWords.push(" "+word+"s ")
    })

    // Grab headlines, strip out punctuation and removed words
    newsfeed.forEach(article => {
      let headline = article.title.toLowerCase();
      processedTitles += " "+ headline +" ";
    });

    // Remove special characters and banned words
    processedTitles = processedTitles.replace(/[.,\/#!$%\^&\*;:{}=\-_`'~( )?"]/g," ");
    removedWords.forEach(word => {
      processedTitles = processedTitles.replace(new RegExp(word, 'g')," ");
    })

    // Remove multiple spaces
    processedTitles = processedTitles.replace(/ +(?= )/g,'');

    // Turn headline into lis
    processedTitles.split(' ').forEach(word => {
      wordCollection.push(word)
    })

    mostCommonWords = MostCommon(wordCollection, 100);

    let highestCount = 0;
    mostCommonWords.forEach(word => {
      if (word.count > highestCount) {
        highestCount = word.count;
      }
    });

    mostCommonWords.forEach(e => {
      var innerArray = [];
      innerArray.push(e.token);

      let count = e.count;
      if (count == 1) {

        if (count == 1) {
          count += 2;
        }
      }

      innerArray.push(count);
      outerArray.push(innerArray);
    });

    var self = this;

    return WordCloud(document.getElementById('cloudCanvas'), {list:outerArray, 
                                                              clearCanvas: true,
                                                              fontFamily: "'Roboto', sans-serif",
                                                              color: "#00BAFF", 
                                                              backgroundColor: bgColor,
                                                              weightFactor: 8,
                                                              minSize: 1,
                                                              shape: "square",
                                                              click: function(item) {
                                                                self.handleCloudClick(item[0]);
                                                              }});
  }
  //Set the drivers fields if the users taps on a word from the wordcloud
  handleCloudClick(clickedString) {
    let driver1 = document.getElementById("myDriver1");
    let driver2 = document.getElementById("myDriver2");
    let driver3 = document.getElementById("myDriver3");

    if (!driver1.value) {
      driver1.value = clickedString;
      return;
    } 
    if (driver1.value && !driver2.value) {
      driver2.value = clickedString;
      return;
    } 
    if (driver1.value && driver2.value) {
      driver3.value = clickedString;
      return;
    }

  }

  //Clear the driver input fields out
  clearDrivers() {
    let driver1 = document.getElementById("myDriver1");
    let driver2 = document.getElementById("myDriver2");
    let driver3 = document.getElementById("myDriver3");

    driver1.value = "";
    driver2.value = "";
    driver3.value = "";
  }
  canvas(){
    if(this.state.loading){
      return (<p><br/>⌛ Searching "{this.state.searchTerm}" on Google News...</p>)
    } else {
      if(this.state.newsfeed[0]){
        return (<canvas id="cloudCanvas" width="270" height="270"/>);
      } else {
        return (<p><br/>Use the search box above to generate headlines.</p>);
      }
    }
  }
  generateCanvas(term){
    this.clearDrivers();
    this.setState({loading: true});    
    const output = new Array();

    console.log(term);
    (async () => {
      const feed = await parser.parseURL(CORS_PROXY + 'https://news.google.com/news/rss/search/section/q/' + term);

      feed.items.forEach(item => {
       output.push({title: item.title, link: item.link})
      });

      console.log(JSON.stringify(output));
      this.setState({newsfeed: output});

      if(this.state.newsfeed[0]){
        this.setState({loading: false});    
        this.cloudCanvas(term,this.state.newsfeed);
      } 
    })();
  }
  handleChange = (e) => {
    this.setState({searchTerm: e.target.value});
    console.log(this.state.searchTerm);
  }
  handleSubmit= (e) => {
    //Since we're doing a new search clear the drivers list
    e.preventDefault();
    this.generateCanvas(this.state.searchTerm);
  }
  validateNext = () => {
    let driver1 = document.getElementById("myDriver1").value;
    let driver2 = document.getElementById("myDriver2").value;
    let driver3 = document.getElementById("myDriver3").value;

    if(driver1 && driver2 && driver3){
      window.scrollTo(0,0);
      this.props.update("drivers", [driver1, driver2, driver3]);
      this.props.update("searchTerm", this.state.searchTerm);
      this.setState({nextPage: true});      
    } else {
      document.getElementById("warn").innerHTML = "You must input three drivers.";
    }
  }
  componentDidMount(){
    const term = this.props.get("searchTerm")
    console.log(term)
    this.setState({searchTerm: term})
    if(term) {
      document.getElementById("searchBox").value = term;
      this.generateCanvas(term);
    }
  }
  render() {
    {
      if(this.state.nextPage){
        return (<Redirect to="/three"/>)
      } else {
        return (
<div className="App"> 
  <div className="jumbotron jumbotron-fluid">
    <div className="container">
      <br/>
      <h2>2: Identify Drivers</h2>

      <div className="maintext">
      <br/>
      <p>William Gibson famously wrote, “the future is already here, it’s just not evenly distributed.” Sometimes the future is hiding in plain sight, we just have to broaden our perspective to see it.</p>
      <p>This tool will represent trends across headlines as a word cloud. You can use the word cloud to identify drivers.  Drivers are large, long-term underlying directions of change that will shape our future.</p> 
      <br/>
      </div>

      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="SEARCH TERM" className="inputText" id="searchBox"
          onChange={this.handleChange}/>
        <button type="submit" className="btn btn-primary">GO</button>
      </form>

      <div className="reminderboxcentered">
        {this.canvas()}  
      </div>
  
      <br/>
  
      <div className="maintext">
      <p>Tap any word in the cloud to add it as a driver.</p>    
      </div>
  
      <div className="responsebox">
      <form onSubmit={this.handleSubmit}>
      <input type="text" placeholder="Driver #1" className="inputText" id="myDriver1"/><br/><br/>
      <input type="text" placeholder="Driver #2" className="inputText" id="myDriver2"/><br/><br/>
      <input type="text" placeholder="Driver #3" className="inputText" id="myDriver3"/><br/><br/>
      </form>
      </div>
      <div className="maintext">
        <p>Input three drivers to continue.<br/><br/></p>    
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

export default StepTwo;
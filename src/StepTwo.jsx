import * as React from 'react';
import WordCloud from 'wordcloud';
import './App.css';
import MostCommon from 'most-common';
import Parser from 'rss-parser';
import './App.css';

const parser = new Parser();
let searchTerm = "";
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

const width = window.innerWidth;
const bgColor = "#2d2d2d";


class StepTwo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newsfeed: new Array()
    }
  }
  cloudCanvas(query, newsfeed) {
    let removedWords = [" of ", " the ", " in ", " on ", " at ", " to ", " a ", " an ", " for ", " is ", " will ", " be ", " news ", " if ", " about ", " after "];
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
      headline = headline.replace(/[.,\/#!$%\^&\*;:{}=\-_`'~()]/g,"");
      removedWords.forEach(word => {
        headline = headline.replace(word," ");
      })
      processedTitles += headline + " ";
    });

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
  handleChange = (e) => {
    searchTerm = e.target.value;
    console.log(searchTerm)
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
    if(this.state.newsfeed[0]){
      return (<canvas id="cloudCanvas" width="335" height="300"/>);
    } else {
      return (<p><br/>Use the search box above to generate headlines.</p>);
    }
  }
  handleSubmit= (e) => {
    //Since we're doing a new search clear the drivers list
    this.clearDrivers();

    e.preventDefault();
    const output = new Array();
    (async () => {
      const feed = await parser.parseURL(CORS_PROXY + 'https://news.google.com/news/rss/search/section/q/' + searchTerm);

      feed.items.forEach(item => {
       output.push({title: item.title, link: item.link})
      });

      console.log(JSON.stringify(output));
      this.setState({newsfeed: output});

      if(this.state.newsfeed[0]){
        this.cloudCanvas(searchTerm,this.state.newsfeed);
      } 
    })();
  }
  componentWillMount(){
    
  }
  render() {
    {
      return (
    <div className="App">
  
    <div className="jumbotron jumbotron-fluid">
    <div className="container">
      <br/>
      <h2>2: Collect Signals and Drivers</h2>

      <div className="maintext">
      <br/>
      <p>A signal is a recent small or local innovation with the potential to scale in impact and affect other places, people, or markets. Drivers are large, long-term underlying directions of change that will shape our future.</p>    
      <br/>
      <p>You can use the articles you've collected on the previous step to identify signals. Additionally, you may use this word cloud generator to help identify drivers in headlines; the bigger the word, the more often it appears in articles about your [X]</p> 
      <br/>
      </div>

      <form className="spacer" onSubmit={this.handleSubmit}>
      <input type="text" style={{marginRight:"15px"}} placeholder="SEARCH TERM" className="inputText" id="myUnit"
        onChange={this.handleChange}/>
      <button type="submit" className="btn btn-primary">GO</button>
      </form>

      <div className="reminderbox">
      {this.canvas()}  
      </div>
  
      <br/>
  
      <div className="maintext">
      <p>Use the word cloud tool above  A driver can be written as a single word or short phrase.</p>    
      </div>
  
      <div className="responsebox">
      <form onSubmit={this.handleSubmit}>
      <input type="text" placeholder="Driver #1" className="inputText" id="myDriver1"/><br/><br/>
      <input type="text" placeholder="Driver #2" className="inputText" id="myDriver2"/><br/><br/>
      <input type="text" placeholder="Driver #3" className="inputText" id="myDriver3"/><br/><br/>
      </form>

      <p className="btn btn-primary">Next Step</p> 
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

export default StepTwo;
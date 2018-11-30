import * as React from 'react';
import WordCloud from 'wordcloud';
import './App.css';
import MostCommon from 'most-common';
import Parser from 'rss-parser';
import './App.css';
import { Route, Redirect } from 'react-router'

const width = window.innerWidth;
const bgColor = "#2d2d2d";

const parser = new Parser();
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

class StepTwo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      currentSearch: "",
      driverNumber: 0,
      newsfeed: new Array(),
      boxCounter: 0,
      loading: false,
      nextPage: false
    }
  }
  cloudCanvas(query, newsfeed) {
    let removedWords = [" s "," ... "," … "," but "," and", " yet "," of "," from "," by "," with "," this "," the "," in ", " on ", " at ", " to ", " a ", " an ", " for ", " is ", " will ", " be ", " news ", " if ", " about ", " after "," shit "," fuck "," undefined "];
    let processedTitles = '';
    let wordCollection = [];
    let mostCommonWords;
    let outerArray = [];

    // Add query to removed words list
    query.toLowerCase().split(' ').forEach(word => {
      if(word.length > 4){
        removedWords.push(" "+word.slice(0, -1)+" ");
      }
      removedWords.push(" "+word+" ");
      removedWords.push(" "+word+"s ");
    })

    // Grab headlines, strip out punctuation and removed words
    newsfeed.forEach(article => {
      let headline = article.title.toLowerCase();
      processedTitles += " "+ headline +" ";
    });

    // Remove special characters and banned words
    processedTitles = processedTitles.replace(/[.,\/#!$%\^&\*;:{}=\-—_`'~( )?"]/g," ");
    removedWords.forEach(word => {
      processedTitles = processedTitles.replace(new RegExp(word, 'g')," ");
    })

    // Remove multiple spaces
    processedTitles = processedTitles.replace(/ +(?= )/g,'');


    // Turn headline into list
    processedTitles.split(' ').forEach(word => {
      wordCollection.push(word.charAt(0).toUpperCase()+word.substring(1))
    })

    mostCommonWords = MostCommon(wordCollection, 100);

    // Remove one-offs, blank spaces, and undefined
      console.log(mostCommonWords);
    mostCommonWords = mostCommonWords.filter(word => {
      if(word.token == "undefined"){
        return false;
      } else {
        return true;
      }
    });

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
    let driver4 = document.getElementById("myDriver4");
    let driver5 = document.getElementById("myDriver5");
    let searchBox = document.getElementById("searchBox");
    let newSearch = searchBox.value + " + " + clickedString;

    // Search again
    this.generateCanvas(newSearch);

    // Select driver position
    let driverNum = this.state.driverNumber;
    driverNum++;
    if(driverNum > 5){
      driverNum = 1;
    }
    this.setState({driverNumber: driverNum})

    // Update drivers list
    if (driverNum == 1) {
      driver1.value = clickedString;
      return;
    } else if (driverNum == 2) {
      driver2.value = clickedString;
      return;
    } else if (driverNum == 3) {
      driver3.value = clickedString;
      return;
    } else if (driverNum == 4) {
      driver4.value = clickedString;
      return;
    } else if (driverNum == 5) {
      driver5.value = clickedString;
      return;
    }
  }

  //Clear the driver input fields out
  clearDrivers() {
    let driver1 = document.getElementById("myDriver1");
    let driver2 = document.getElementById("myDriver2");
    let driver3 = document.getElementById("myDriver3");
    let driver4 = document.getElementById("myDriver4");
    let driver5 = document.getElementById("myDriver5");

    driver1.value = "";
    driver2.value = "";
    driver3.value = "";
    driver4.value = "";
    driver5.value = "";
  }
  canvas(){
    if(this.state.loading){
      return (<div  style={{height: "275px", maxHeight: "275px", display: "inline-block"}}>
              <br/><br/><br/>
              <h2>{this.state.currentSearch}</h2>
              <p><br/><br/>⌛ Searching "{this.state.currentSearch}" on Google News...</p></div>)
    } else {
      if(this.state.newsfeed[0]){
        return (<canvas id="cloudCanvas" width="270" height="270" style={{height: "275px", maxHeight: "275px", display: "inline-block"}}/>);
      } else {
        return (<p><br/>Use the search box above to generate headlines.</p>);
      }
    }
  }
  generateCanvas(term){
    this.setState({loading: true, currentSearch: term}); 
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
        this.setState({loading: false},()=>{
          if(document.getElementById("cloudCanvas")){
            this.cloudCanvas(term,this.state.newsfeed);
          }   
        });  
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
    let driver4 = document.getElementById("myDriver4").value;
    let driver5 = document.getElementById("myDriver5").value;

    if(driver1 && driver2 && driver3 && driver4 && driver5){
      window.scrollTo(0,0);
      this.props.update("drivers", [driver1, driver2, driver3, driver4, driver5]);
      this.setState({nextPage: true});      
    } else {
      document.getElementById("warn").innerHTML = "You must input five drivers.";
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
      <h2>Step 2: Identify Drivers</h2>

      <div className="maintext">
      <br/>
      <p>You have your signals of change - specific, concrete examples of things happening today. Now it’s time to add another layer by identifying five <b>“drivers of change.”</b> Drivers of change are broad, longer term forces or macro-trends that will shape the evolution of your Future of X.</p>
      <p>For each of the news stories you’ve chosen, ask yourself: what is one key driver that will affect this? Think about market trends, technology development, shifting social values, demographic  changes, climate volatility, new ways people are working and learning, even longterm geopolitical transformations. </p> 
      <p>This tool will display a cloud of common words that appear across recent news headlines. <b>Bigger words appear more often, but that doesn't necessarily mean they're drivers!</b> Use your research from the previous step and your own critical thinking to identify <b>drivers of change</b> in the word cloud. You may also write in your own drivers.</p>
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
      <p>Tap any word in the cloud to add it as a driver and refine your search. If you can't find a relevant driver within the cloud, you can generate a new cloud by using the search box. You may also enter drivers manually.</p>    
      </div>
  
      <div className="responsebox">
      <form onSubmit={this.handleSubmit}>
      <input type="text" placeholder="Driver #1" className="inputText" id="myDriver1"/><br/><br/>
      <input type="text" placeholder="Driver #2" className="inputText" id="myDriver2"/><br/><br/>
      <input type="text" placeholder="Driver #3" className="inputText" id="myDriver3"/><br/><br/>
      <input type="text" placeholder="Driver #4" className="inputText" id="myDriver4"/><br/><br/>
      <input type="text" placeholder="Driver #5" className="inputText" id="myDriver5"/><br/><br/>
      </form>
      </div>
      <div className="maintext">
        <p>Input five drivers to continue.<br/><br/></p>    
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
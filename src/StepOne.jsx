import * as React from 'react';
import Parser from 'rss-parser';
import './App.css';
import { Route, Redirect } from 'react-router'

const defaultImage = "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAKAAD/4QMfaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzEzOCA3OS4xNTk4MjQsIDIwMTYvMDkvMTQtMDE6MDk6MDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjREQTc1MDc0RUMzNjExRTg4MDRERDgxRjFFMDAyNkNDIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjREQTc1MDczRUMzNjExRTg4MDRERDgxRjFFMDAyNkNDIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IE1hY2ludG9zaCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSI1QTQwRDM1NkVCOEM5MjVGMENGNzVFQjU4QUYzRUFBRSIgc3RSZWY6ZG9jdW1lbnRJRD0iNUE0MEQzNTZFQjhDOTI1RjBDRjc1RUI1OEFGM0VBQUUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAUEBAZEhknFxcnMiYfJjIuJiYmJi4+NTU1NTU+REFBQUFBQUREREREREREREREREREREREREREREREREREREREARUZGSAcICYYGCY2JiAmNkQ2Kys2REREQjVCRERERERERERERERERERERERERERERERERERERERERERERERERET/wAARCADwASwDASIAAhEBAxEB/8QAigAAAgMBAQAAAAAAAAAAAAAABAUAAgMBBgEBAQEBAAAAAAAAAAAAAAAAAAECAxAAAgEDAgMFAwoFAwQCAwEAAQIDABEEIRIxQQVRYXEiE4EyFJGhscHRQlJyIwbw4WIzFYKSJPGiwlNDNLJzNRYRAQEBAAMBAQEBAAAAAAAAAAABESExAkFREiL/2gAMAwEAAhEDEQA/APJV0C9crQDaO+gzqV0m9coJUqVKCVKldAJ4UHBrWgTmasFC1wmort64LsbDU1tHjMwu+g+eiNyxiy6VNXGCYpOrm3dzrYLHHwHy1i89YNMTUy04gxp6xaehSSa5VxNbmeq+saoqF2CqLsTYAczROb03IwbfEJtDcDe48NOdXBj6xqesazKkcQR41thwDInjhY7Q7BS3ZemI3wo3zJkx00ZzxPAU5jxcrpOZGsQExdTa2m4fe8LVh1npa9IaLIxXYHcQN3EEc/tqmH1nNyMyOTb6rAFPTUbfKePge+pimsXWljzXOYhhO0IL6lba6+PaKthxYHUTOzAW3Eru8u1be8PbevP9cy5MrKLSRmIqAmw8fbR/QMPCyoJPiSPUB4s1tq24j66YOt0BXxPi4381t222m29vlpdmdIysLb6i3D6Ls82vZ401TAmHTPWjnYqf1PT+6Rut8vPsvR2RlZ+NJjmdFfXhHqWa1rfmt7KDyDBkJVgQw4g6WqEBqcdaYZmQXKmJ1AUh+OnbSpYH9RYjoWIUE8NaaMChFUr0WR+3MiOYQxESXUtc+Xhofn4UlkxJYwWZGChihJGgYcr1dQPUpv0TpkPUmkWWQoVUFbW+XwHOl+PiyZUoghG5ze3s5+FUYVK1lx5ISRIpXadjXGm7svWVBcGuMvMcK1ixJpo3mjQskfvsOVUsVNmBBHEHSoM6lWZbeFVqi6jnXGNXbT6qztUVypUqVUSpUqyqWoIq3rTReFTgK6iNKdq1FcVWc2XjRccKxanVvmq6qsK2XjzNCyzVntemsk9CPKWqhN65WpEtdrlSpVRKlSpQa487Y8qTJ7yEMPZT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"

const parser = new Parser({
  customFields: {
    item: [
      ['media:content', 'media:content', {keepArray: true}],
    ]
  }
})

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
  descriptionToURL(description){
    let output = description
    output = output.substring(output.search("img src=")+9)
    output = output.substring(0, output.search('" border='))
    return output;
  }
  removeObjectByKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            array.splice(i, 1);
            return true
        }
    }
    return false;
  }
  addOrRemoveArticle(title, link, img){
    const arts = this.state.articles;
    const wasRemoved = this.removeObjectByKey(arts, "title", title);
    if(!wasRemoved){
      arts.push({title: title, link: link, img: img});
    }
    console.log(arts);
  }
  feedlist() {
    let output = [];
    let id = 0;

    if(this.state.loading){
      return (<p><br/>⌛ Searching "{this.state.searchTerm}" on Google News...</p>)
    } else {
      if(this.state.newsfeed[0]){
        this.state.newsfeed.forEach(e =>{
          if(true){
            const newsItemBox = (<tr id={"checkboxContainer"+id}><td>

            <input type="checkbox" id={"checkbox"+id} onChange={this.checkboxChange} onClick={() => this.addOrRemoveArticle(e.title, e.link, e.img)}></input></td>
            <td key={e.title}><a href={e.link} target="_blank">

            <img src={e.img} 
            style={{margin: "10px 10px 10px 10px", borderStyle: "solid", borderWidth: "2px", float:"right", width:"100px"}}></img>
            
            <span style={{ textAlign: "justify", textIndent: "2em"}}>{e.title}</span>

            
            </a></td></tr>)
            id++;
            output.push(newsItemBox);  
          }
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
    this.setState({articles: new Array()});
    this.generateHeadlines();
  }
  generateHeadlines = () => {
    this.setState({loading: true});    
    let output;
    const articlesWithImages = new Array();
    const articlesWithoutImages = new Array();    
    console.log(this.state.searchTerm);
    (async () => {
      const feed = await parser.parseURL(CORS_PROXY + 'https://news.google.com/news/rss/search/section/q/' + this.state.searchTerm);
      console.log(CORS_PROXY + 'https://news.google.com/news/rss/search/section/q/' + this.state.searchTerm);
      console.log(JSON.stringify(feed));


      feed.items.forEach(item => {
        console.log(item)
        if(item["media:content"]){
          let img = item["media:content"][0].$.url;
          articlesWithImages.push({title: item.title, link: item.link, img: img})
        } else {
          let img = defaultImage
          articlesWithoutImages.push({title: item.title, link: item.link, img: img})
        }
        
       output = articlesWithImages.concat(articlesWithoutImages).slice(0,10)

      });

      this.setState({loading: false});
      console.log(JSON.stringify(output));
      this.setState({newsfeed: output})
    })();
  }
  validateNext = () => {
    if(this.state.checkedBoxes.length == 3){
      window.scrollTo(0,0);
      console.log(this.state.articles);
      this.props.update("searchTerm", this.state.searchTerm);
      this.props.update("signals", this.state.articles);
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
        <p>William Gibson famously wrote, “the future is already here, it’s just not evenly distributed.” Sometimes the future is hiding in plain sight, we just have to broaden our perspective to see it.</p>
        <p>Imagining a future that is very different from today can often be challenging. But change happens – and it can happen faster than we expect.</p>
        <p>We will use this tool to look for headlines that seem to signal a change in the future. A <em>signal</em> is a recent small or local innovation with the potential to scale in impact and affect other places, people, or markets.</p>    
      </div>

      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="SEARCH TERM" className="inputText"  id="searchBox"
        onChange={this.searchChange}/>
        <button type="submit" className="btn btn-primary">GO</button>
      </form>

      <div className="reminderboxcentered">
        {this.feedlist()}  
      </div>

      <br/>

      <div className="maintext">
        <p>
        Read through the articles-- headlines alone aren’t enough! <b>You'll use this research in the next step.</b> Then, select three articles that seem to signal <em>different</em> directions for the future. We will use these selections again on a later step, too.
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
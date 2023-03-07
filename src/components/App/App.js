import React, { Component } from 'react';
import './App.css';
import { getUrls, postUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: []
    }
  }

  componentDidMount() {
    getUrls()
    .then(data => {
      this.setState({urls: data.urls})
    })
  }



  addURL = (urlToShorten, title) => {
    console.log(this.state.urls)
    postUrls(urlToShorten, title)
    .then(data => {
      this.setState({urls: [...this.state.urls, data] })
    })
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm addURL={this.addURL} />
        </header>

        <UrlContainer urls={this.state.urls}/>
      </main>
    );
  }
}

export default App;

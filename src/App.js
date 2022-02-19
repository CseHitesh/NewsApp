import './App.css';

import React, { Component } from 'react';

import Navbar from './Component/Navbar';
import News from './Component/News';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {

  apikey = `${process.env.REACT_APP_API_KEY}`;

  state = {
    progress: 0,
  }

  setProgress = (progress) => {
    this.setState({ progress: progress })
  }
  render() {


    return (
      <>



        <BrowserRouter>
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}

          />
          <Navbar />
          <Routes>

            <Route exact path="/" element={<News apikey={this.apikey} setProgress={this.setProgress} key='General' country='in' category="general" />} />
            <Route exact path="/Business" element={<News apikey={this.apikey} setProgress={this.setProgress} key='Business' country='ind' category="business" />} />

            <Route exact path="/Entertainment" element={<News apikey={this.apikey} setProgress={this.setProgress} key='Entertainment' pagesize={6} country='ind' category="entertainment" />} />
            <Route exact path="/Health" element={<News apikey={this.apikey} setProgress={this.setProgress} key='Health' pagesize={6} country='ind' category="health" />} />
            <Route exact path="/Science" element={<News apikey={this.apikey} setProgress={this.setProgress} key='Science' pagesize={6} country='ind' category="science" />} />
            <Route exact path="/Sports" element={<News apikey={this.apikey} setProgress={this.setProgress} key='sports' pagesize={6} country='ind' category="sports" />} />
            <Route exact path="/Technology" element={<News apikey={this.apikey} setProgress={this.setProgress} key='technology' pagesize={6} country='ind' category="technology" />} />
          </Routes>

        </BrowserRouter>

      </>

    )
  }
}

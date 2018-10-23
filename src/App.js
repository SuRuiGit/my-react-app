import React, { Component } from 'react';
import './App.scss';
import {Button} from 'antd-mobile';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Button type='primary' className='App-Button'>{document.documentElement.clientWidth}</Button>
      </div>
    );
  }
}

export default App;

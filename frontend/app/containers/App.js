import React from 'react';
import SearchButtonsContainer from './searchButtonsContainer';
import DisplayContainer from './display';

const App = React.createClass({

  getInitialState: function() {
    return {
      currentLong: 0,
      currentLat: 0
    }
  },

  // Will get the current coordinates of your current location when the window loads.
  componentWillMount(){
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log(position.coords.latitude, position.coords.longitude);
    })
  },
  render: function() {
    return (
      <div className="app-container">
        <h1>Hello world</h1>
        <SearchButtonsContainer />
        <DisplayContainer />
      </div>

    )
  }
});

export default App;

import React from 'react';
import SearchButtonsContainer from './searchButtonsContainer';
import DisplayContainer from './display';
import axios from 'axios';
import ClientIdSecret from '../apiKeys';


console.log(ClientIdSecret);

const App = React.createClass({

  getInitialState: function() {
    return {
      currentLong: 0,
      currentLat: 0,
      ajaxReturn: [],

      returnName: "Establishment's Name",
      returnAddress: 'Address'
    }
  },

  // Will get the current coordinates of your current location when the window loads.
  componentWillMount(){
    navigator.geolocation.getCurrentPosition( (position) => {
      // console.log(position.coords.latitude, position.coords.longitude);
      this.setState({
        currentLat: position.coords.latitude,
        currentLong: position.coords.longitude
      })
      console.log(this.state.currentLat, this.state.currentLong);
    })
  },


  // // Will get the current coordinates of your current location when the window loads.
  // componentWillMount(){
  //   navigator.geolocation.getCurrentPosition(function(position) {
  //     console.log(position.coords.latitude, position.coords.longitude);
  //     this.setState({
  //       currentLat: position.coords.latitude,
  //       currentLong: position.coords.longitude
  //     })
  //     console.log(this.state.currentLat, this.state.currentLong);
  //   }.bind(this))
  //
  //
  // },

  fourSquareAjaxCall: function(){
    axios.get('https://api.foursquare.com/v2/venues/explore?' + ClientIdSecret + '&v=20130815&ll=' + this.state.currentLat + ',' + this.state.currentLong + '%20&query=drinks&specials=1')
    .then(function(response){
      // console.log(response.data);
     this.setState({
       ajaxReturn: response.data.response.groups[0].items
     })
     console.log('ajaxReturn: ', this.state.ajaxReturn);
    }.bind(this))
  },

  render: function() {
    return (
      <div className="app-container">
        <h1>Hello world</h1>
        <SearchButtonsContainer ajaxCallFourSquare={this.fourSquareAjaxCall}/>
        <DisplayContainer ajaxReturn={this.state.ajaxReturn}/>
      </div>

    )
  }
});

export default App;

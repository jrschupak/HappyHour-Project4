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
      returnAddress: 'Address'

    }
  },

  // handleChange: function(event) {
  //   console.log(event.target.value);
  //   console.log('handleChange being called');
  //   this.setState({zipCode: event.target.value});
  //   console.log(this.state.zipCode);
  // },

  fuck: function(){
    console.log("fuck")
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

  // 'https://api.foursquare.com/v2/venues/search?client_id=XCPZFGHVHQ4H4WZESGBBDZYPISFIMPYGBE20VQ043WTWZSPI&client_secret=OBUJAZ0IY4SH4KL2X3KAPJJK0WROS4OAXQ1GN5D3BUGP44AH&v=20130815&near=10543%20&query=drinks'

  //Function to change the state of zipCode whenever there is change in the input. From https://facebook.github.io/react/docs/forms.html


  // inputFourSquareAjaxCall: function(){
  //   console.log(this.state.zipCode);
  //   axios.get('https://api.foursquare.com/v2/venues/explore?' + ClientIdSecret + '&v=20130815&near=' + this.state.zipCode + '%20&query=drinks&specials=1')
  //   .then(function(response){
  //     console.log(response.data);
  //    this.setState({
  //      zipCodeAjaxReturn: response.data.response.groups[0].items
  //    })
  //    console.log('ajaxReturn: ', this.state.zipCodeAjaxReturn);
  //   }.bind(this))
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
        <SearchButtonsContainer ajaxCallFourSquare={this.fourSquareAjaxCall} inputFourSquareAjaxCall={this.inputFourSquareAjaxCall}/>
        <DisplayContainer ajaxReturn={this.state.ajaxReturn}/>

      </div>

    )
  }
});

export default App;

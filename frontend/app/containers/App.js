import React from 'react';
import SearchButtonsContainer from './searchButtonsContainer';
import DisplayContainer from './display';
import axios from 'axios';
import ClientIdSecret from '../apiKeys';
import Loader from 'react-loader';


console.log(ClientIdSecret);

const App = React.createClass({



  getInitialState: function() {
    return {
      currentLong: '',
      currentLat: '',
      ajaxReturn: [],
      returnAddress: 'Address',
      loaded: false,
      message: "This is the place hold for the no results message"
    }
  },

  // handleChange: function(event) {
  //   console.log(event.target.value);
  //   console.log('handleChange being called');
  //   this.setState({zipCode: event.target.value});
  //   console.log(this.state.zipCode);
  // },

  fudge: function(){
    console.log("fudge")
  },

  // Will get the current coordinates of your current location when the window loads.
  componentWillMount(){
    navigator.geolocation.getCurrentPosition( (position) => {
      // console.log(position.coords.latitude, position.coords.longitude);
      this.setState({
        currentLat: position.coords.latitude,
        currentLong: position.coords.longitude
      })
      this.coordinatesLoaded();
      console.log(this.state.currentLat, this.state.currentLong);
    })

  },

  coordinatesLoaded: function(){
    if(this.state.currentLat){
      this.setState({
        loaded: true
      })
    }
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

  noResultsMessage: function(){
    if(this.state.ajaxReturn){
      this.setState({
        message: "There are no specials going on in this area"
      })
    };
  },


  render: function() {


    var backgroundImage = {
      backgroundImage: "url('app/styles/images/party.gif')",
      webkitBackgroundSize: 'cover',
      textAlign: 'center',
      color: "white",
      fontSize: '100px',
      height: '600px'
    };

    var title = {
      fontSize: '100px',
      color: 'white',
      textAlign: 'center',
      position: 'relative',
      bottom: '434px'
    }
    var hhSpecials = {
      fontSize: '75px',
      textAlign: 'center',
      position: 'relative',
      bottom: '238px'

    }
    var footer = {
      textAlign: 'center',
    }

    var options = {
    lines: 13,
    length: 20,
    width: 10,
    radius: 30,
    corners: 1,
    rotate: 0,
    direction: 1,
    color: '#000',
    speed: 1,
    trail: 60,
    shadow: false,
    hwaccel: false,
    zIndex: 2e9,
    top: '84%',
    left: '50%',
    scale: .50
    };
    return (
      <div className="app-container">
        <p className='title' style={backgroundImage}></p>
        <p style={title}>HAPPY HOUR</p>
        <p style={hhSpecials}>Find HappyHour Specials</p>
        <Loader loaded={this.state.loaded} options={options}>
        <SearchButtonsContainer ajaxCallFourSquare={this.fourSquareAjaxCall} inputFourSquareAjaxCall={this.inputFourSquareAjaxCall}/>             </Loader>
        <h1>{this.state.message}</h1>
        <DisplayContainer ajaxReturn={this.state.ajaxReturn}/>
        <p style={footer}>Copyright 2016 Jonathan Schupak</p>
      </div>

    )
  }
});

export default App;

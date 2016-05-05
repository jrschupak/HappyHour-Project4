import React from 'react';
import axios from 'axios';
import ClientIdSecret from '../apiKeys';
import Display from './display';
import ZipCodePlaces from '../components/zipCodePlaces';


const SearchButtonsContainer = React.createClass({
  getInitialState: function(){
    return({
      zipCodeAjaxReturn: []
    })
  },

  inputFourSquareAjaxCall: function(){
    console.log(this.state.zipCode);
    axios.get('https://api.foursquare.com/v2/venues/explore?' + ClientIdSecret + '&v=20130815&near=' + this.state.zipCode + '%20&query=drinks&specials=1')
    .then(function(response){
      console.log(response.data);
     this.setState({
       zipCodeAjaxReturn: response.data.response.groups[0].items
     })
     console.log('zipCodeAjaxReturn: ', this.state.zipCodeAjaxReturn);
    }.bind(this))
  },

  handleChange: function(event){
    this.setState({
      zipCode: event.target.value
    });
    console.log(this.state.zipCode);
  },


  render: function(){
    return(
      <div className="search-buttons">
        <p>this is where the buttons will go</p>
          <div>
            <div className='current-position-button'>
              <p>This is the current position search</p>
              <button
                onClick={this.props.ajaxCallFourSquare}>Search</button>
            </div>
            <div className='postcode-search'>
              <p>This is the postal code position search</p>
              <input className="zipcode-input" type="text" placeholder="Type zipcode" value={this.props.zipCode}
              onChange={this.handleChange}/>
              <button onClick={this.inputFourSquareAjaxCall}>Search</button>
            </div>
          </div>
            <div>{this.state.zipCodeAjaxReturn.map(function(placeData) {
              return <div><h1>{placeData.venue.name}</h1> <p>{placeData.snippets.items[0].detail.object.title}</p>
              <p>{placeData.snippets.items[0].detail.object.message}</p>
              <p>{placeData.snippets.items[0].detail.object.finePrint}</p>
              <p>{placeData.venue.location.formattedAddress[0]} <br></br> {placeData.venue.location.formattedAddress[1]}</p>
              <p>{placeData.venue.contact.formattedPhone}</p>
              <p>Likes  {placeData.tips[0].likes.count}</p></div>
              })}
            </div>
      </div>

    )
  }
});

export default SearchButtonsContainer;

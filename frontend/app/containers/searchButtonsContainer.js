
import React from 'react';
import axios from 'axios';
import ClientIdSecret from '../apiKeys';
import Display from './display';
import ZipCodePlaces from '../components/zipCodePlaces';


const SearchButtonsContainer = React.createClass({
  getInitialState: function(){
    return({
      zipCodeAjaxReturn: [],
      comment2: ['hi']
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

  handleChangeComment: function(event){
    console.log('handleChangeComment is running');
    this.setState({
      comment2: event.target.value
    });
    console.log(this.state.comment);
  },

  addComment: function(){
    console.log(this.state.comment2);
    var comment2 = { comment: {
      content: this.state.comment2,
      place_id: this.props.data.snippets.items[0].detail.object.id
    }}
    axios.post('http://localhost:3000/comments.json', comment2)
    .then(function(response){
      console.log('response: ', response.data);
     this.setState({
       comment2: response.data
     })
     console.log('comment: ', this.state.comment);
    }.bind(this))
  },


  render: function(){
    var backgrImage = {
      backgroundImage: "url('app/styles/images/drinks.jpeg')",
      webkitBackgroundSize: 'cover',
      height: '300px',
      textAlign: 'center'
    };

    var style = {
      background: '#CCCACC',
      textAlign: 'center'
    }

    return(
      <div className="search">
          <div className='search-buttons' style={backgrImage}>
            <div className='search-cont'>
              <div className='current-position-container'>
                <h4>To Search specials in your current location click</h4>
                <button
                  className="current-button"
                  onClick={this.props.ajaxCallFourSquare}>Search</button>
              </div>
              <div className='postcode-search'>
                <h4>To search for specials in a specific area</h4>
                <div className='input-search'>
                  <input className="zipcode-input" type="text" placeholder="Type zipcode" value={this.props.zipCode}
                  onChange={this.handleChange}/>
                  <button
                    className="zipcode button" onClick={this.inputFourSquareAjaxCall}>Search</button>
                </div>
            </div>

            </div>
          </div>
            <div className="zipcode-display" >{this.state.zipCodeAjaxReturn.map(function(placeData) {
              return <div style={style} className='zip-comp'><h1>{placeData.venue.name}</h1> <p>{placeData.snippets.items[0].detail.object.title}</p>
              <p>{placeData.snippets.items[0].detail.object.message}</p>
              <p>{placeData.snippets.items[0].detail.object.finePrint}</p>
              <p>{placeData.venue.location.formattedAddress[0]} <br></br> {placeData.venue.location.formattedAddress[1]}</p>
              <p>{placeData.venue.contact.formattedPhone}</p>
              <p>Likes  {placeData.tips[0].likes.count}</p>


            </div>


              })}
            </div>

      </div>

    )
  }
});

export default SearchButtonsContainer;

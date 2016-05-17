
import React from 'react';
import axios from 'axios';
import ClientIdSecret from '../apiKeys';
import Display from './display';
import ZipCodePlaces from '../components/zipCodePlaces';


const SearchButtonsContainer = React.createClass({
  getInitialState: function(){
    return({
      zipCodeAjaxReturn: [],
      comment2: ['hi'],
      message: " "
    })
  },

  inputFourSquareAjaxCall: function(){
    console.log(this.state.zipCode);
    axios.get('https://api.foursquare.com/v2/venues/explore?' + ClientIdSecret + '&v=20130815&near=' + this.state.zipCode + '%20&query=drinks&specials=1')
    .then(function(response){
      console.log(response.data);
     this.setState({
       zipCodeAjaxReturn: response.data.response.groups[0].items,
       message: ''
     })
    //  this.noSpecialsMessageZip();
    if(!this.state.zipCodeAjaxReturn.length){
      this.setState({
        message: "!!There are no specials in this area at the time!!"
      })
    }
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
      textAlign: 'center',
      position: 'relative',
      bottom: '225px'
    };

    var style = {
      background: '#D7D8D9',
      textAlign: 'center',
      position: 'relative',
      bottom: '215px',
      paddingTop: '25px',
      paddingBottom: '25px',
    }

    var inputStyle = {
      width: '200px'
    }

    var buttonContainers = {
      opacity: '.75',
      borderRadius: '10%'
    }

    var buttContText = {
      opacity: '1.5'
    }

    var noResults = {
      textAlign: 'center',
      fontSize: '4em',
      position: 'relative',
      bottom: '150px'
    }

    return(
      <div className="search">
          <div className='search-buttons' style={backgrImage}>
            <div className='search-cont'>
              <div className='current-position-container' style={buttonContainers}>
                <h4 style={buttContText}>Current Location</h4>
                <button
                  className="current button"
                  onClick={this.props.ajaxCallFourSquare}>Search</button>
              </div>
              <div className='postcode-search' style={buttonContainers}>
                <h4>Search by Zipcode</h4>
                <div className='input-search'>
                  <input className="zipcode-input" type="text" placeholder="Type zipcode" value={this.props.zipCode}
                  onChange={this.handleChange}/>
                  <button
                    className="zipcode button" onClick={this.inputFourSquareAjaxCall}>Search</button>
                </div>
              </div>

            </div>

          </div>
          <div>
            <p style={noResults}>{this.state.message}</p>
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

import React from 'react';
import axios from 'axios';

const Place = React.createClass({

  getInitialState: function(){
    return({
      comment: [],
      loading: true
    })
  },

  addComment: function(){
    console.log(this.state.comment);
    var comment = { comment: {
      content: this.state.comment,
      place_id: this.props.data.snippets.items[0].detail.object.id
    }}
    axios.post('http://localhost:3000/comments.json', comment)
    .then(function(response){
      console.log('response: ', response.data);
     this.setState({
       comment: response.data
     })
     console.log('comment: ', this.state.comment);
    }.bind(this))
  },

  handleChange: function(event){
    this.setState({
      comment: event.target.value
    });
    // console.log(this.state.zipCode);
    console.log(this.state.comment);
  },
  // getInitialState: function(){
  //   return{
  //     firstname: ""
  //   }
  // },
  // componentWillMount(){
  //   if(this.props.data){
  //     console.log("data: ",this.props.data.snippets.items[0].detail.object.page.firstName);
  //     this.setState({
  //       firstName: this.props.data.snippets.items[0].detail.object.page.firstName
  //     })
  //   }
  // },


  componentDidMount: function() {
    //(1) make an ajax call to get the comments for this component
    //(2) when the data comes back, set the state appropriately
    //(3) make sure to also change the state of 'loading' to false
  },

  render: function(){
    // if (loading) {
    //   return
    //   //shittons of JSX w/ a placeholder line in the comments area
    // } else {
    //   return //shittons of JSX with the actual comments
    // }
    var style = {
      background: '#CCCACC',
      textAlign: 'center',
      position: 'relative',
      bottom: '75px'
    }

    if(this.props.data){
      console.log("data: ",this.props.data.snippets.items[0].detail.object.id);
      console.log(this.props.data.venue.name);
      // this.setState({
      //   firstname: this.props.data
      // });
    }else{
      console.log("FUUDGE")
    }
    // var fuck = this.props.data;
    // console.log("fuck:", fuck.snippets)
      return(
        <div className="place-comp" style={style}>
          <h1>{this.props.data.venue.name}</h1>
          <p>{this.props.data.snippets.items[0].detail.object.title}</p>
          <p>{this.props.data.snippets.items[0].detail.object.message}</p>
          <p>{this.props.data.snippets.items[0].detail.object.finePrint}</p>
          <p>{this.props.data.venue.location.formattedAddress[0]} <br></br> {this.props.data.venue.location.formattedAddress[1]}</p>
          <p>{this.props.data.venue.contact.formattedPhone}</p>
          <p>Likes  {this.props.data.tips[0].likes.count}</p>
          <input className="local-input" type="text" placeholder="Your Comment" value={this.props.comment}
          onChange={this.handleChange}/>
        <button onClick={this.addComment}>Add Comment</button>
          <p>Comments</p>
        </div>

      )


  }
})

export default Place;

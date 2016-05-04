import React from 'react';

const Place = React.createClass({
  getInitialState: function(){
    return{
      firstname: ""
    }
  },

  render: function(){
    if(this.props.data){
      console.log("data: ",this.props.data.snippets.items[0].detail.object);
      // this.setState({
      //   firstname: this.props.data
      // });
    }else{
      console.log("FUCK")
    }
    // var fuck = this.props.data;
    // console.log("fuck:", fuck.snippets)
    return(
      <div>
        <h1>THIS IS THE PLACE COMP</h1>
      // {this.state.firstname}
      </div>
    )
  }
})

export default Place;

import React from 'react';

const Place = React.createClass({
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


  // componentDidMount()

  render: function(){
    if(this.props.data){
      console.log("data: ",this.props.data.snippets.items[0].detail.object.id);
      console.log(this.props.data.venue.name);
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
          <h1>{this.props.data.venue.name}</h1>
          <p>{this.props.data.snippets.items[0].detail.object.title}</p>
          <p>{this.props.data.snippets.items[0].detail.object.message}</p>
          <p>{this.props.data.snippets.items[0].detail.object.finePrint}</p>

        </div>
      )


  }
})

export default Place;

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
          // <h1>NADDA</h1>
          <h1>{this.props.data.snippets.items[0].detail.object.id}</h1>

        </div>
      )


  }
})

export default Place;

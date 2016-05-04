import React from 'react';
import Place from '../components/Place';

const display = React.createClass({

  render: function(){
    console.log('ajaxReturn: ', this.props.ajaxReturn);
    return (
      <div className='display-container'>
        <p>THIS IS THE DISPLAY CONTAINER</p>
        <div>{this.props.ajaxReturn.map(function(placeData) {
          return <Place data={placeData} />;
        })}
        </div>

      </div>
    )
  }
});

export default display;

import React from 'react';
import Place from '../components/Place';
import ZipCodePlaces from '../components/zipCodePlaces';

const Display = React.createClass({

  render: function(){
    console.log('ajaxReturn: ', this.props.ajaxReturn);
    return (
      <div className='display-container'>
        <div>{this.props.ajaxReturn.map(function(placeData) {
          return <Place data={placeData} />;
        })}
        </div>
      </div>
    )
  }
});

export default Display;

import React from 'react';
import PositionSearch from '../components/searchButtons'

const searchButtonsContainer = React.createClass({
  render: function(){
    return(
      <div className="search-buttons">
        <p>this is where the buttons will go</p>
        <PositionSearch />
      </div>
    )
  }
});

export default searchButtonsContainer;

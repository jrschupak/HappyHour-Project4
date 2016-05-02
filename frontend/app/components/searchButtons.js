import React from 'react';


const PositionSearch = React.createClass({
  render: function() {
    return (
      <div>
        <div className='current-position-button'>
          <p>This is the current position search</p>
          <button>Search</button>
        </div>
        <div className='postcode-search'>
          <p>This is the postal code position search</p>
          <button>Search</button>
        </div>
      </div>

    )
  }
})

export default PositionSearch;

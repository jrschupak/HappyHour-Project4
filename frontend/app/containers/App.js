import React from 'react';
import SearchButtonsContainer from './searchButtonsContainer';

const App = React.createClass({
  render: function() {
    return (
      <div className="app-container">
        <h1>Hello world</h1>
        <SearchButtonsContainer />
      </div>

    )
  }
});

export default App;

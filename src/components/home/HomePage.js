import React from 'react';
import Hello from '../Hello/Hello';

class HomePage extends React.Component {
  render() {
    return (
      <div className='jumbotron'>
        <Hello />
      </div>
    );
  }
}

export default HomePage;

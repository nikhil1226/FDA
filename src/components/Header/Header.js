import React from 'react';
import Navbar from './NavBar';

export default class Header extends React.Component {
  render() {
    return (
      <div>
        <header className="main-header">
          <Navbar location={this.props.location} />
        </header>
      </div>
    );
  }
}

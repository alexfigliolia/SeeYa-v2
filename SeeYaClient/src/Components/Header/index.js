import { Component } from 'react';
import Burger from 'Components/Burger';
import './_Header.scss';

export default class Header extends Component {

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <header className='app-header'>
        <div>
          <button className='logo'>
            <h1>See Ya</h1>
          </button>
          <Burger />
        </div>
      </header>
    )
  }
}

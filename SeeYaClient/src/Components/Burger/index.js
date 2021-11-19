import { Component } from 'react';
import { connect } from 'react-redux';
import { toggleMenu } from 'Actions/Screen';
import './_Burger.scss';

class Burger extends Component {

  static defaultProps = {
    menuOpen: false,
    title: 'Toggle menu',
    toggleMenu: () => { }
  }

  shouldComponentUpdate({ menuOpen }) {
    return menuOpen !== this.props.menuOpen;
  }

  render() {
    const { menuOpen, toggleMenu, title } = this.props;
    return (
      <button
        className={`burger${menuOpen ? ' open' : ''}`}
        title={title}
        aria-label={title}
        onClick={toggleMenu}>
        <svg
          version='1.1'
          viewBox='0 0 500 500'
          preserveAspectRatio='xMinYMin meet'>
          <circle
            cx='250'
            cy='250'
            r='200' />
        </svg>
        <div>
          <div className='top' />
          <div className='middle' />
          <div className='bottom' />
        </div>
      </button>
    )
  }
}

const mSTP = ({ Screen }) => {
  return { menuOpen: Screen.menuOpen };
}

export default connect(mSTP, { toggleMenu })(Burger);
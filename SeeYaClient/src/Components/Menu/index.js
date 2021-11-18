import { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import Avatar from 'Components/Avatar';
import Username from 'Components/Username';
import Auth from 'Services/Auth/AuthHelpers';
import { closeMenu } from 'Actions/Screen';
import './_Menu.scss';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  static defaultProps = {
    menuOpen: false,
    closeMenu: () => { }
  }

  shouldComponentUpdate({ menuOpen }) {
    return menuOpen !== this.props.menuOpen;
  }

  getLinkClassName(active) {
    return `nav-link${active ? ' active' : ''}`;
  }

  logout() {
    Auth.logout(this.props.history);
  }

  render() {
    const { menuOpen, closeMenu } = this.props;
    return (
      <nav className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <div>
          <Avatar />
          <Username />
          <NavLink
            to='/'
            exact
            onClick={closeMenu}
            className={this.getLinkClassName}>Home</NavLink>
          <NavLink
            to='/profile'
            onClick={closeMenu}
            className={this.getLinkClassName}>Profile</NavLink>
          <button
            onClick={this.logout}
            className='logout'>Logout</button>
        </div>
      </nav>
    )
  }
}

const mSTP = ({ Screen }) => {
  return { menuOpen: Screen.menuOpen };
}

export default withRouter(connect(mSTP, { closeMenu })(Menu));
import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";
import "./Header.css"
import LoginButton from './LoginButton'
import { withAuth0 } from '@auth0/auth0-react';
import LogOutButton from './LogoutButton'

class Header extends React.Component {
  render() {
    const { isAuthenticated } = this.props.auth0;
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>My Favorite Books</Navbar.Brand>
        <NavItem className="nav"><Link to="/" className="nav-link">Home</Link></NavItem>
        {isAuthenticated && <NavItem className="nav"><Link to="/profile" className="nav-link">Profile</Link></NavItem>}
        <NavItem className="nav"><LoginButton /></NavItem>
        <NavItem className="nav"><LogOutButton /></NavItem>
      </Navbar>
    )
  }
}
export default withAuth0(Header);

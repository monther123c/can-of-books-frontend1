import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
        <Navbar.Brand >My Favorite Books</Navbar.Brand>
        <div style={{display:'flex',flexDirection:'space-between', gap:'15px'}}>
        <NavItem style={{color:'white'}}><Link to="/" className="nav-link" style={{color:'blue'}}>Home</Link></NavItem>
        <NavItem style={{color:'white'}}><Link to="/profile" className="nav-link" style={{color:'blue'}}>Profile</Link></NavItem>
        </div>
        {/* PLACEHOLDER: render a navigation link to the about page */}
      </Navbar>
    )
  }
}

export default Header;

import React from 'react';
import { Link } from 'react-router-dom';

import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';

export const TopNav = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">
        Third party login integration
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/redirectPage">
            Redirect Page
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

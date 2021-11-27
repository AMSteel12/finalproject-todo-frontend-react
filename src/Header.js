import React from 'react';
import { Navbar } from 'react-bootstrap';

import { Link } from 'react-navi';

const Header = ({ text }) => (
  <Link href="/">
    <Navbar.Brand>{text}</Navbar.Brand>
  </Link>
);

export default Header;
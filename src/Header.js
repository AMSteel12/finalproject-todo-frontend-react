import React, {useContext} from 'react'
import {ThemeContext} from './Contexts'
import {Navbar} from 'react-bootstrap'

import {Link} from 'react-navi'

const Header = ({text}) => {     
    const theme = useContext(ThemeContext)
     return <Link href="/"><Navbar.Brand style={{color: theme.primaryColor}}>{text}</Navbar.Brand></Link>
}

export default Header 

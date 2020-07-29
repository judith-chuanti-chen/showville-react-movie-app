import React from 'react';
import { Link} from '@reach/router';
// import RMDBLogo from '../images/';
import ShowvilleLogo from '../images/showville_logo_grey.png'
import {StyledHeader, StyledRMDBLogo, StyledTMDBLogo} from '../styles/StyledHeader'

//import React so that the JSX code below could be converted to React.createElement() (via Babel)
const Header = () => (
    <StyledHeader>
        <div className="header-content">
            <Link to="/">
                <StyledRMDBLogo src={ShowvilleLogo} alt='showville-logo'/>
            </Link>
        </div>
    </StyledHeader>
) //arrow function can do implicit return

export default Header;

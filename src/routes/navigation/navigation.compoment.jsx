import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import {ReactComponent as MITLogo} from '../../assets/MIT_DOME.svg';

import './navigation.styles.scss';

const Navigation = () => {
    return (
      <Fragment>
        <div className="navigation">
            <Link className="logo-container" to='/'>
                <CrwnLogo className='logo'/>
            </Link>
            <div className="nav-links-container">
                <Link className="nav-link" to='shop'>
                  <div>SHOP</div>
                </Link>
                <Link className="nav-link" to='auth'>
                  <div>SIGNIN</div>
                </Link>
                
            </div>
        </div>
        <Outlet />
      </Fragment>
    );
}

export default Navigation;
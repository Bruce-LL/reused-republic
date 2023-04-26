import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import {ReactComponent as MITLogo} from '../../assets/MIT_DOME.svg';
import { signOut } from "firebase/auth";


import './navigation.styles.scss';

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { UserContext } from "../../context/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { CartContext } from "../../context/cart.context";

const Navigation = () => {
  //useContext as a hook here, will let this Navitgation component to re-render when value in this hook has been changed
  const { currentUser, setCurrentUser} = useContext(UserContext);
  const {isCartOpen} = useContext(CartContext);
  // const signOutHandler = async () =>{
  //   const res = await signOutUser(); // inside this method, signOut(auth) will be called
  //   console.log(res);
  //   setCurrentUser(null);
  // }


  //console.log(currentUser);
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
              {  // if currentUser has been setup in the context, than show a SIGNOUT button(span)
                currentUser ? (<span className="nav-link" onClick={signOutUser}>SIGN OUT</span>)
                            : (<Link className="nav-link" to='auth'>
                                  <div>SIGNIN</div>
                               </Link>)
              }
              <CartIcon />
              
              
          </div>
          {isCartOpen && <CartDropdown />} 
      </div>
      <Outlet />
    </Fragment>
  );
}

export default Navigation;
import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import {ReactComponent as MITLogo} from '../../assets/MIT_DOME.svg';
import { signOut } from "firebase/auth";


//import './navigation.styles.scss';
import { NavigationContainer, LogoContainer, NavLinks, NavLink } from "./navigation.styles";

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
      <NavigationContainer>
          <LogoContainer to='/'>
              <CrwnLogo className='logo'/>
          </LogoContainer>
          <NavLinks>
              <NavLink to='shop'>
                <div>SHOP</div> 
              </NavLink>
              {  // if currentUser has been setup in the context, than show a SIGNOUT button(span)
                currentUser ? (<NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>)
                            : (<NavLink to='auth'>
                                  <div>SIGNIN</div>
                               </NavLink>)
              }
              <CartIcon />
              
              
          </NavLinks>
          {isCartOpen && <CartDropdown />} 
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
}

export default Navigation;
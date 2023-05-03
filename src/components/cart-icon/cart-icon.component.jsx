import { useContext } from 'react';
//import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'
import { CartContext } from '../../context/cart.context';

import { ShoppingIcon, CartIconContainer, cartCount, ItemCount } from './cart-icon.styles';


const CartIcon = () => {
    const {cartCount, isCartOpen, setIsCartOpen} = useContext(CartContext);
    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

    //{cartItems.reduce((accumlator, currentItem) => {return (accumlator + currentItem.quantity)},0)}
    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon className='shopping-icon'/>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    );
};

export default CartIcon;
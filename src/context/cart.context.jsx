import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
    //find if cartItems contain productToAdd,
    const exsitingCartItem = cartItems.find((cartItem) => cartItem.id==productToAdd.id);
    //if found, increment the quantity
    if(exsitingCartItem){
        return cartItems.map((cartItem) => {
            return cartItem.id==productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem;
        })
    }
    //return the new cartItems array
    return [...cartItems, {...productToAdd, quantity : 1}];

}

const removeCartItem = (cartItems, cartItemToRemove) => {
    //fine the cart item to remove
    const exsitingCartItem = cartItems.find(
        (cartItem) => cartItem.id==cartItemToRemove.id
    );

    // if if the quantity is equal to 1, if it is, remove that item from cart
    if(exsitingCartItem.quantity==1){
        return cartItems.filter(cartItem => cartItem.id!=cartItemToRemove.id);
    }
    // decrese the quantity by 1
    return cartItems.map((cartItem) => {
        return cartItem.id==cartItemToRemove.id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem;
    })
}

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter(cartItem => cartItem.id!=cartItemToClear.id);
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0
})

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const[cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems])

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        setCartTotal(newCartTotal);
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }
    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    }
    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear));
    }

    const value = {
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart, 
        removeItemFromCart,
        clearItemFromCart,
        cartItems, 
        cartCount,
        cartTotal,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
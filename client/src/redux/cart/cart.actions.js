import { CartActionTypes } from './cart.types';


export const toggleCartHidden = () => ({
    type: CartActionTypes.TOGGLE_CART_HIDDEN
});

export const addItem = item => ({
    type: CartActionTypes.ADD_ITEM,
    payload: item
});

export const removeItem = item => ({
    type: CartActionTypes.REMOVE_ITEM,
    payload: item
});

export const clearItemFromCart = item => ({
    type: CartActionTypes.CLEAR_ITEM_FROM_CART,
    payload: item
});

// export const cartClearStart = () => ({
//     type: CartActionTypes.CART_CLEAR_START
// });

// export const cartClearSuccess = () => ({
//     type: CartActionTypes.CART_CLEAR_SUCCESS
// });

// export const cartClearFailure = error => ({
//     type: CartActionTypes.CART_CLEAR_FAILURE,
//     payload: error
// });

export const cartClear = () => ({
    type: CartActionTypes.CART_CLEAR
});
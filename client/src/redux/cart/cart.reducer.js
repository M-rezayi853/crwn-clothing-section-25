import { CartActionTypes } from './cart.types';
import { addItemToCart, removeItemFromCart, clearItemFromCart } from './cart.utils';


const INITIAL_STATE = {
    hidden: true,
    cartItems: [],
    error: null
};

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            };
        case CartActionTypes.ADD_ITEM:
            return {
                ...state,
                cartItems: addItemToCart(state.cartItems, action.payload)
            };
        case CartActionTypes.REMOVE_ITEM:
            return {
                ...state,
                cartItems: removeItemFromCart(state.cartItems, action.payload)
            }
        // case CartActionTypes.CLEAR_ITEM_FROM_CART:
        //     return {
        //         ...state,
        //         cartItems: state.cartItems.filter(cartItem => 
        //             cartItem.id !== action.payload.id
        //         )
        //     }
        case CartActionTypes.CLEAR_ITEM_FROM_CART:
            return {
                ...state,
                cartItems: clearItemFromCart(state.cartItems, action.payload)
            }
        // case CartActionTypes.CART_CLEAR_SUCCESS:
        //     return {
        //         ...state,
        //         cartItems: [],
        //         error: null
        //     };
        // case CartActionTypes.CART_CLEAR_FAILURE:
        //     return {
        //         ...state,
        //         error: action.payload
        //     }
        case CartActionTypes.CART_CLEAR:
            return {
                ...state,
                cartItems: []
            };
        default:
            return state;
    }
};


export default cartReducer;
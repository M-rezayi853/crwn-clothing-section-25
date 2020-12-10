import { takeLatest, put, all, call } from 'redux-saga/effects';

// import { CartActionTypes } from './cart.types';
// import { cartClearSuccess, cartClearFailure } from './cart.actions';
// import { auth } from '../../firebase/firebase.utils';

import { UserActionTypes } from '../user/user.types';
import { cartClear } from './cart.actions';


// export function* cartClear() {
//     try {
//         yield auth.signOut();
//         yield put(cartClearSuccess()); 
//     } catch(error) {
//         yield put(cartClearFailure(error));
//     };
// };

// export function* onCartClearStart() {
//     yield takeLatest(CartActionTypes.CART_CLEAR_START, cartClear);
// };

// export function* cartSagas() {
//     yield all([
//         call(onCartClearStart)
//     ]);
// };


export function* cartClearOnSignOut() {
    yield put(cartClear());
};

export function* onCartClearOnSignOutSuccess() {
    yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, cartClearOnSignOut);
};


export function* cartSagas() {
    yield all([
        call(onCartClearOnSignOutSuccess)
    ]);
};

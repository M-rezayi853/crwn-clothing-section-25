import { takeLatest, put, all, call } from 'redux-saga/effects';

import { UserActionTypes } from './user.types';
import { auth, createUserProfileDocument, googleProvider, getCurrentUser } from '../../firebase/firebase.utils';
import { signInSuccess, signInFailure, signOutSuccess, signOutfailure, signUpSuccess, signUpFailure } from './user.actions';


export function* getSnapshotFromUserAuth(userAuth, additionalData) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
        const userSnapshot = yield userRef.get();
        yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}));
    } catch(error) {
        yield put(signInFailure(error));
    };
};

export function* signInWithGoogle() {
    try {
        // const userRef = yield auth.signInWithPopup(googleProvider);
        const {user} = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user);
    } catch(error) {
        yield put(signInFailure(error));
    };
};

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
};


export function* signInWithEmail({ payload: { email, password } }) {
    try {
        const {user} = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user);
    } catch(error) {
        yield put(signInFailure(error));
    };
};

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
};


export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth);
    } catch(error) {
        yield put(signInFailure(error))
    };
};

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
};


export function* signOut() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess());
    } catch(error) {
        yield put(signOutfailure(error));
    };
};

export function* OnSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
};


export function* signUp({ payload: { email, password, displayName } }) {
    try {
        const {user} = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(signUpSuccess({ user, additionalData: { displayName } }));
    } catch(error) {
        yield put(signUpFailure(error));
    };
};

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
    yield getSnapshotFromUserAuth(user, additionalData);
};

export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_SATART, signUp);
};

export function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
};


export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart), 
        call(onCheckUserSession), 
        call(OnSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ]);
};



//     try {
//       const { user } = await auth.createUserWithEmailAndPassword(
//         email,
//         password
//       );

//       await createUserProfileDocument(user, { displayName });

//       setState({
//         displayName: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//       });
//     } catch (error) {
//       console.error(error);
//     }






// auth.signOut()




// try {
//     await auth.signInWithEmailAndPassword(email, password);
//     setStste({email: "", password: ""});
// } catch (error) {
//     console.log(error);
// }




// let unsubscribeFromAuth = useRef(null);

  // useEffect (() => {
  //   unsubscribeFromAuth.current = auth.onAuthStateChanged(async userAuth => {
  //     if (userAuth) {
  //       const userRef = await createUserProfileDocument(userAuth);

  //       userRef.onSnapshot(snapShot => {
  //         setCurrentUser({
  //           id: snapShot.id,
  //           ...snapShot.data()
  //         })
  //       })
  //     }

  //     setCurrentUser(userAuth);
      

  //     return unsubscribeFromAuth;
  //   })
  // }, [setCurrentUser]);
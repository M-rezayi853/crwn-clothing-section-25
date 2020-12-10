// import React, { useEffect, useRef } from 'react';
import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Homepage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop';
import Header from './components/header/header';
import SingInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up';
import CheckoutPage from './pages/checkout/checkout';

// import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
// import './App.css';

import { GlobalStyle } from './global.styles';

// import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { checkUserSession } from './redux/user/user.actions';



// const App = ({currentUser, setCurrentUser }) => {
const App = ({ currentUser, checkUserSession }) => {

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

  useEffect(() => {

    // useEffect (() => {
    //   const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
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
        

    //     return () => unsubscribeFromAuth;
    //   })
    // }, [setCurrentUser]);


    checkUserSession();
    
  }, [checkUserSession]);



  return (
    <div>
      <GlobalStyle />
      <Header />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/shop" component={ShopPage} />
        <Route exact path="/signin" render={() => currentUser ? <Redirect to='/' /> : <SingInAndSignUp />} />
        <Route exact path="/chechout" component={CheckoutPage} />
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

// const mapDispatchToProps = dispatch => ({
//   setCurrentUser: user => dispatch(setCurrentUser(user))
// });

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});


// export default connect(mapStateToProps, mapDispatchToProps)(App);
export default connect(mapStateToProps, mapDispatchToProps)(App);


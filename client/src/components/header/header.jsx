import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { ReactComponent as LogoIcon } from '../../assets/crown.svg';

// import { auth } from '../../firebase/firebase.utils';

import CartIcon from '../cart-icon/cart-icon';
import CartDropdown from '../cart-dropdown/cart-dropdown';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
// import './header.scss';

import { HeaderContainer, Logo, Options, OptionLink } from './header.styles';

import { signOutStart } from '../../redux/user/user.actions';
// import { cartClearStart } from '../../redux/cart/cart.actions';


// const Header = ({ currentUser, hidden, signOutStart, cartClearStart }) => {
const Header = ({ currentUser, hidden, signOutStart }) => {

    return (
        <HeaderContainer>
            <Logo to="/" >
                <LogoIcon />
            </Logo>
            <Options>
                <OptionLink to="/shop" >SHOP</OptionLink>
                <OptionLink to="/shop" >CONTACT</OptionLink>
                {/* (<OptionLink as="div" onClick={() => auth.signOut()}>SIGN OUT</OptionLink>) */}
                {
                    currentUser ?
                    (<OptionLink as="div" onClick={() => {
                        signOutStart();
                        // cartClearStart();
                    }} >SIGN OUT</OptionLink>)
                    : (<OptionLink to="/signin" >SIGN IN</OptionLink>)
                }
                <CartIcon />
            </Options>
            {
                hidden ? null : <CartDropdown />
            }
        </HeaderContainer>
    );
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart()),
    // cartClearStart: () => dispatch(cartClearStart())
});


export default connect(mapStateToProps, mapDispatchToProps)(Header);
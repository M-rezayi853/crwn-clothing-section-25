import React, { useState } from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';
// import './sign-in.scss';

import { SignInContainer, Title, ButtonsBar } from './sign-in.styles';

// import { signInWithGoogle, auth } from '../../firebase/firebase.utils';

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';



const SignIn = ({ googleSignInStart, emailSignInStart }) => {
    const [state, setStste] = useState({
        email: "",
        password: ""
    });

    const { email, password } = state;

    const handleSubmite = async event => {
        event.preventDefault();

        // try {
        //     await auth.signInWithEmailAndPassword(email, password);
        //     setStste({email: "", password: ""});
        // } catch (error) {
        //     console.log(error);
        // }

        emailSignInStart(email, password);
    };

    const handleChage = event => {
        const {value, name} = event.target;

        setStste({...state, [name]: value});
    };

    return (
        <SignInContainer>
            <Title>I already have an account</Title>
            <span>sign in with your email and password</span>

            <form onSubmit={handleSubmite}>
                <FormInput 
                    name="email" 
                    type="email" 
                    value={email} 
                    required 
                    handleChange={handleChage}
                    label="email"
                />
                <FormInput 
                    name="password"
                    type="password" 
                    value={password} 
                    required
                    handleChange={handleChage}
                    label="password"
                />

                <ButtonsBar>
                    <CustomButton type="submit">Sign In</CustomButton>
                    <CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn >Sign in with Google</CustomButton>
                </ButtonsBar>
            </form>
        </SignInContainer>
    );
};

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
});


export default connect(null, mapDispatchToProps)(SignIn);
import React, { useState } from "react";
import { connect } from 'react-redux';

import FormInput from "../form-input/form-input";
import CustomButton from "../custom-button/custom-button";
// import "./sign-up.scss";

import { SignUpcontainer, Title } from './sign-up.styles';

// import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

import { signUpStart } from '../../redux/user/user.actions';


const SignUp = ({ signUpStart }) => {
  const [state, setState] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { displayName, email, password, confirmPassword } = state;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("password don't match!");
      return;
    }

    // try {
    //   const { user } = await auth.createUserWithEmailAndPassword(
    //     email,
    //     password
    //   );

    //   await createUserProfileDocument(user, { displayName });

    //   setState({
    //     displayName: "",
    //     email: "",
    //     password: "",
    //     confirmPassword: "",
    //   });
    // } catch (error) {
    //   console.error(error);
    // }

    signUpStart({ email, password, displayName });

  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setState({ ...state, [name]: value });
  };

  return (
    <SignUpcontainer>
      <Title>I do not have an account</Title>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit} className="sign-up-form">
        <FormInput
          type="text"
          name="displayName"
          value={displayName}
          handleChange={handleChange}
          label="Display Name"
          required
        />

        <FormInput
          type="email"
          name="email"
          value={email}
          handleChange={handleChange}
          label="Email"
          required
        />

        <FormInput
          type="password"
          name="password"
          value={password}
          handleChange={handleChange}
          label="Password"
          required
        />

        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          handleChange={handleChange}
          label="Confirm Password"
          required
        />

        <CustomButton type="submit">SIGN UP</CustomButton>
      </form>
    </SignUpcontainer>
  );
};

const mapDispatchToProps = dispatch => ({
  signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
});


export default connect(null, mapDispatchToProps)(SignUp);

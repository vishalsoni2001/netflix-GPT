import React, { useRef } from 'react'
import Header from './Header'
import { useState } from 'react';
import { checkValidData } from '../utils/validate';
import {createUserWithEmailAndPassword } from "firebase/auth";
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {

    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage,setErrorMessage]=useState(null)
    const email=useRef(null);
    const password=useRef(null);
    const name=useRef(null);

    const handleButtonClick = ()=>{
      //validate
      
      const message=checkValidData(email.current.value,password.current.value);
      setErrorMessage(message);
      if(message)return;
       
      if(!isSignInForm)
      {
         //sign up logic
         createUserWithEmailAndPassword(auth, email.current.value,password.current.value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;

    //user info show krne keliye
    updateProfile(user, {
      displayName: name.current.value, photoURL:"https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"
    }).then(() => {
      // Profile updated!
      
      const { uid, email, displayName,photoURL} = user;

      dispatch(addUser({uid: uid, email:email, displayName:displayName,photoURL:photoURL,}));

      navigate("/browse");
    }).catch((error) => {
      // An error occurred
      // ...
      setErrorMessage(error.message);
    });

    
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode + "-" + errorMessage);
    
  });
      }
      else
      {
        //sign in logic
        signInWithEmailAndPassword(auth, email.current.value,password.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    navigate("/browse");
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage("Wrong Email or Password");
  });

      }


    }

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    };


  return (
    
    <div>
        <Header/>
        <div className='absolute'>
         <img src="https://assets.nflxext.com/ffe/siteui/vlv3/47c2bc92-5a2a-4f33-8f91-4314e9e62ef1/web/IN-en-20240916-TRIFECTA-perspective_72df5d07-cf3f-4530-9afd-8f1d92d7f1a8_small.jpg" alt="logo"/>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="absolute w-3/12 p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
            <h1 className="font-bold text-3xl py-4">
            {isSignInForm ? "Sign In" : "Sign Up"}
            </h1>

            {!isSignInForm && <input ref={name} className="p-4 my-4 w-full bg-gray-700" type="text" placeholder="Full Name" />}
            <input ref={email} className="p-4 my-4 w-full bg-gray-700" type="text" placeholder="Email Address" />
            <input ref={password} className="p-4 my-4 w-full bg-gray-700" type="password" placeholder="Password" />

           <p className="text-red-500 font-bold py-2 text-lg">{errorMessage}</p>
            <button className="my-6 p-4 w-full bg-red-700 rounded-lg" onClick={handleButtonClick}>
               {isSignInForm ? "Sign In" : "Sign Up"}
            </button>
            <p className='p-4 cursor-pointer'onClick={toggleSignInForm}>
            {isSignInForm? "New to Netflix? Sign Up Now" : "Already registered? Sign in Now"}
            </p>

        </form>
    </div>

  )
}

export default Login
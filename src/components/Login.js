import React from 'react'
import Header from './Header'
import { useState } from 'react';

const Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true);
   
    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    };
  return (
    
    <div>
        <Header/>
        <div className='absolute'>
         <img src="https://assets.nflxext.com/ffe/siteui/vlv3/47c2bc92-5a2a-4f33-8f91-4314e9e62ef1/web/IN-en-20240916-TRIFECTA-perspective_72df5d07-cf3f-4530-9afd-8f1d92d7f1a8_small.jpg" alt="logo"/>
        </div>
        <form className="absolute w-3/12 p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
            <h1 className="font-bold text-3xl py-4">
            {isSignInForm ? "Sign In" : "Sign Up"}
            </h1>
            {!isSignInForm && <input  className="p-4 my-4 w-full bg-gray-700" type="text" placeholder="Full Name" />}
            <input className="p-4 my-4 w-full bg-gray-700" type="text" placeholder="Email Address" />
            <input  className="p-4 my-4 w-full bg-gray-700" type="password" placeholder="Password" />

           
            <button className='my-6 p-4 w-full bg-red-700 rounded-lg'>
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
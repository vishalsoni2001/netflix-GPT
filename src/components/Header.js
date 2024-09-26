import React from 'react'
import { auth } from '../utils/firebase';
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { addUser,removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constant';
import {toggleGptSearchView} from "../utils/gptSlice"
import  { SUPPORTED_LANGUAGES } from '../utils/constant';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
  
  const navigate=useNavigate();

  const dispatch=useDispatch();

  const user=useSelector(store=>store.user);
  const showGptSearch=useSelector(store=>store.gpt.showGptSearch);
   
  const handleSignOut=()=>{
    signOut(auth).then(() => {
      
    }).catch((error) => {
      // An error happened.
      navigate("/error");
    });
  }

  //useeffect
  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user

        const { uid, email, displayName,photoURL} = auth.currentUser;

        dispatch(addUser({uid: uid, email:email, displayName:displayName,photoURL:photoURL,}));
        navigate("/browse");
      
        
      } else {
        // User is signed out
        
        dispatch(removeUser());
        navigate("/");
        
      }

    });
    // Unsubscribe when component unmounts
    return ()=>unsubscribe();
  },[])
 
  const handleGptSearch=()=>{
       dispatch(toggleGptSearchView());
  }
  const handleLanguageChange=(e)=>{
      dispatch(changeLanguage(e.target.value));
  }
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
        <img className="w-44" src={LOGO} alt="logo"/>

        {user && <div className='flex p-2 '>

        {showGptSearch && <select className="p-3 m-2 bg-gray-900 text-white" onChange={handleLanguageChange}>
            {
              SUPPORTED_LANGUAGES.map((lang)=>(<option key={lang.identifier} value={lang.identifier}>{lang.name}</option>))
            }
          </select>}
          <button onClick={handleGptSearch} className="py-2 px-4 mx-4 my-2 bg-slate-500 text-white rounded-lg">
            {showGptSearch ? "Home Page ": "GPT Search"}
          </button>
          <img className="w-12" src={user?.photoURL} alt="userLogo"/>
          <button onClick={handleSignOut} className='font-bold text-white'>Sign Out</button>
        </div>}
    </div>

    

  )
}

export default Header
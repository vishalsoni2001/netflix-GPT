import React, { useEffect } from 'react'
import { createBrowserRouter} from 'react-router-dom'
import Browse from './Browse'
import Login from './Login'
import { RouterProvider } from 'react-router-dom'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../utils/firebase'
import { useDispatch } from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice'

//pahle approuter=creeate browser router then path set krke then router provider impoert
const Body = () => {

  
  const dispatch=useDispatch();
  const appRouter=createBrowserRouter([
    {
        path:"/",
        element:<Login/>
    },
    {
        path:"/browse",
        element:<Browse/>
    },
  ])
  

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user

        const { uid, email, displayName,photoURL} = auth.currentUser;

        dispatch(addUser({uid: uid, email:email, displayName:displayName,photoURL:photoURL,}));
      
        
      } else {
        // User is signed out
        
        dispatch(removeUser());
        
      }
    });
   
  },[])

  return (
   <div>
      <RouterProvider router={appRouter}/>
   </div>

  )
}

export default Body
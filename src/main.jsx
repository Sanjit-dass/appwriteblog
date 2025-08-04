
import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import store from './store/store.js';
import { Provider } from 'react-redux';
import {createBrowserRouter, RouterProvider,} from 'react-router-dom'; 
import ResetPassword from './components/ResetPassword'
import UserProfile from './components/UserProfile.jsx';
import Home from './pages/Home.jsx'
import { AuthLayout, Login } from './components/index.js'

import Signup from './pages/Signup.jsx';
import AllPosts from './pages/AllPosts';
import AddPost from './pages/AddPost';
import EditPosts from './pages/EditPosts';
import Post from './pages/Post';
import Contact from './pages/Contact.jsx';
import HelpPage from './pages/HelpPage.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
         {
            path: "/all-posts",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AllPosts />
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AddPost />
                </AuthLayout>
            ),
        },
         {
            path: "/edit-post/:slug",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditPosts />
                </AuthLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
        {
            path: "/reset-password",
            element: (
        <AuthLayout authentication={false}>
        <ResetPassword />
         </AuthLayout>
  ),
 },
 {
     path: "/profile",
  element: (
    <AuthLayout authentication>
      <UserProfile />
    </AuthLayout>
  ),
 },
 {
     path: "/contact",
  element: (
    <AuthLayout authentication>
      <Contact />
    </AuthLayout>
  ),
 },
  {
     path: "/help",
  element: (
    <AuthLayout authentication>
      <HelpPage />
    </AuthLayout>
  ),
 },
 
    ],
},
])




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      
        <RouterProvider router={router} />
      
    </Provider>
  </StrictMode>
);

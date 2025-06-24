import { lazy } from 'react';
import PublicLayout from '../layouts/public.layouts'
import Home from '../pages/home'
import Login from '../pages/login';
import SignUp from '../pages/signup';
const Listing = lazy(()=>import('../pages/property_listings'))
const PropertyDetails = lazy(()=>import('../pages/property_details_page'))

export const visitorRoutes = {
    path: '/',
    element: <PublicLayout/>,
    children: [
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <SignUp /> },
      { path: '/listing', element: <Listing /> },
      { path: '/property/:id', element: <PropertyDetails/>},
    ]
  };
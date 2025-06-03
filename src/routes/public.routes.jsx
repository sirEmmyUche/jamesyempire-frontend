import { lazy } from 'react';
import PublicLayout from '../layouts/public.layouts'
import Home from '../pages/home'
import Login from '../pages/login';
// import Listing from '../pages/property_listings';
// import PropertyDetails from '../pages/property_details';

const Listing = lazy(()=>import('../pages/property_listings'))
const PropertyDetails = lazy(()=>import('../pages/property_details_page'))

export const visitorRoutes = {
    path: '/',
    element: <PublicLayout/>,
    children: [
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/listing', element: <Listing /> },
      { path: '/property/:id', element: <PropertyDetails/>},
    ]
  };
import { lazy } from 'react';
import DashboardLayout from '../layouts/dashboard.layout'
import UploadProperty from '../pages/upload';
// import Fallback from '../components/fallback';
// import Login from '../pages/login';
import MyProperties from '../components/my_properties';
const Listing = lazy(()=>import('../pages/property_listings'))
const PropertyForm = lazy(()=>import('../components/property_form'))
const PropertyDetails = lazy(()=>import('../pages/property_details_page'))


export const userRoutes = {
    path: '/dashboard',
    element: <DashboardLayout/>,
    children: [
      { path:'/dashboard', element: <MyProperties/> },
      { path:'/dashboard/listing', element: <Listing/> },
      { path:'/dashboard/upload', element: <UploadProperty/> },
      { path: '/dashboard/property/:id', element: <PropertyDetails/>},
    ]
  };
import Home from '../pages/home'
import Login from '../pages/login';
import PublicLayout from '../layouts/public.layouts'

export const visitorRoutes = {
    path: '/',
    element: <PublicLayout/>,
    children: [
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
    ]
  };
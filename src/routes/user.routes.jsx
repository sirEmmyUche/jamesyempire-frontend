import { lazy } from 'react';
import DashboardLayout from '../layouts/dashboard.layout'
import UploadProperty from '../pages/upload';
import RequireAuth from '../components/requireAuth';
import MyProfile from '../components/my_profile';
import ChangePassword from '../components/change_password';
const MyPropertiesPage  = lazy(()=>import('../pages/my_properties'))
const ChatListPage = lazy(()=>import('../pages/chat_list'))
const Settings = lazy(()=>import('../pages/settings_page'))


export const userRoutes = {
    path: '/dashboard',
      element: (
    <RequireAuth allowedRoles={['user', 'agent', 'admin']}>
      <DashboardLayout />
    </RequireAuth>
  ),
    children: [
      { index: true, element:<MyPropertiesPage/>},
      { path:'/dashboard/upload', element: <UploadProperty/> },
      { path: '/dashboard/chat-list', element: <ChatListPage/>},
      { 
        path: '/dashboard/settings', 
        element: <Settings/>,
        children:[
          { index: true, element:<MyProfile/>},
          {path:'/dashboard/settings/security', element:<ChangePassword/>}
        ],

      },
    ]
  };
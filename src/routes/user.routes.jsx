import { lazy } from 'react';
import DashboardLayout from '../layouts/dashboard.layout'
import UploadProperty from '../pages/upload';
import RequireAuth from '../components/requireAuth';
const MyPropertiesPage  = lazy(()=>import('../pages/my_properties'))
const ChatListPage = lazy(()=>import('../pages/chat_list'))


export const userRoutes = {
    path: '/dashboard',
    // element: <DashboardLayout/>,
      element: (
    <RequireAuth allowedRoles={['user', 'agent', 'admin']}>
      <DashboardLayout />
    </RequireAuth>
  ),
    children: [
      { path:'/dashboard', element: <MyPropertiesPage/> },
      { path:'/dashboard/upload', element: <UploadProperty/> },
      { path: '/dashboard/chat-list', element: <ChatListPage/>},
    ]
  };
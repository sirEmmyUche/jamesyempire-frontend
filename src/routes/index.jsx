import { visitorRoutes } from "./public.routes";
// import from other routes folder goes here

export const routes = [
    visitorRoutes,
    // userRoutes,
    // adminRoutes,
    { path: '*', element: <div>404 Not Found</div> }, // for 404 page
  ];
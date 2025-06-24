import { visitorRoutes } from "./public.routes";
import { userRoutes } from "./user.routes";

export const routes = [
    visitorRoutes,
    userRoutes,
    // adminRoutes,
    { path: '*', element: <div>404 Not Found</div> }, // for 404 page
  ];
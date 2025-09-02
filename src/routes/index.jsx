import { visitorRoutes } from "./public.routes";
import { userRoutes } from "./user.routes";
import NotFound from "../pages/not_found";

export const routes = [
    visitorRoutes,
    userRoutes,
    // adminRoutes,
    { path: '*', element: <NotFound/> }, // for 404 page
  ];
import { user } from "../store/user";
import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ allowedRoles, children }) {
  const isUser = user((state) => state.user);
  const location = useLocation();

  if (!isUser || !isUser.role) {
    return (
      <Navigate
        to="/login"
        state={{
          message: "You must log in first.",
          from: location.pathname
        }}
        replace
      />
    );
  }

  const userRole = isUser.role;

  if (allowedRoles.includes(userRole)) {
    return children;
  } else {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
}

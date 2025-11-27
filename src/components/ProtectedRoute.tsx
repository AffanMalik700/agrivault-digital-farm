import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";

type Props = {
  children: React.ReactElement;
  allowedRoles?: string[]; // optional role restriction
};

const ProtectedRoute: React.FC<Props> = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/auth" replace />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

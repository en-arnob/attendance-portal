import React from "react";
import { Navigate } from "react-router-dom";
import { useData } from "../context/DataContext";

export default function ProtectedRoute({ children }) {
  const { currentUser } = useData();
  return currentUser ? children : <Navigate to="/login" replace />;
}

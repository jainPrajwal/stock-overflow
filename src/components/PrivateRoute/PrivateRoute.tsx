import { useAppSelector } from "../../app/hooks"
import { Navigate, useLocation } from "react-router-dom";
import React from "react";


export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const { token } = useAppSelector(state => state.auth);
    const location = useLocation();
    return token ? <>{children}</> : <Navigate to="/login" replace state={{ from: location.pathname }} />
}
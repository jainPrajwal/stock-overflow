import { useAppSelector } from "../../app/hooks"
import { Navigate } from "react-router-dom";
import React from "react";


export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const { token } = useAppSelector(state => state.auth);
    return token ? <>{children}</> : <Navigate to="/login" replace />
}
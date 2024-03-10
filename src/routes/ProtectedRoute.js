import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ login }) => {
    console.log(login);
    if (!login) {
        return <Navigate to="/" replace />;
    }
    return <Outlet/>;
};

export default ProtectedRoute;
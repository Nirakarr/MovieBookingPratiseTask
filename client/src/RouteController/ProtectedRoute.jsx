import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../Components/Header/NavBar";
export const PrivateRouteUser = ({ isAuthenticated, ...props }) => {
 const token = sessionStorage.getItem("accessToken");
 return isAuthenticated || token ? (
   <>
     <Navbar />
     <Outlet />
   </>
 ) : (
   <Navigate replace to="/userLogin" />
 );
};
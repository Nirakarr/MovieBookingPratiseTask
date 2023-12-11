import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import RouteController from "./RouteController/RouteController";
import { useEffect, useState } from "react";
import UserLogin from "./Components/User Authentication/UserLogin";
import UserRegister from "./Components/User Authentication/UserRegister";
import BookTickets from "./Components/TicketBooking/BookTickets";
import { PrivateRouteUser } from "./RouteController/ProtectedRoute";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user has an authentication token in sessionStorage
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<RouteController />} />
        <Route path="/moviedetails/:id" element={<RouteController />} />
        <Route path="/userLogin" element={<UserLogin />} />
        <Route path="/userRegister" element={<UserRegister />} />

        {/* Private route only for /booktickets */}
        <Route
          path="/booktickets"
          element={
            isAuthenticated ? <BookTickets /> : <Navigate to="/userLogin" />
          }
        />
      </Routes>
    </div>
  );
}

export default App;

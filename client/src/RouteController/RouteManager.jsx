import React from "react";
import { useLocation, useParams } from "react-router-dom";
import MovieSlider from "../Components/Main/MovieSlider";
import AllMovies from "../Components/Main/AllMovies";
import MoviesDetails from "../Components/Movies Details/MoviesDetails";

const RouteManager = () => {
  const location = useLocation(); // You missed the parentheses to call the function
  let { id } = useParams();
  const RouteNavigation = () => {
    if (location.pathname === "/") {
      return (
        <div>
          <MovieSlider />
          <AllMovies />
        </div>
      );
    } else if (location.pathname === `/moviedetails/${id}`) {
      return <MoviesDetails />;
    } else {
      return <div>Invalid Route</div>;
    }
  };
  return <div>{<RouteNavigation />}</div>;
};

export default RouteManager;

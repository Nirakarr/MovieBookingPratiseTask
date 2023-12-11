import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AllMovies = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const response = await axios.get("http://localhost:5000/movie/getMovies");
      // Sort movies by updatedAt in descending order
      const sortedMovies = response.data.allMovies.sort((a, b) => {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      });
      if (response.status === 201) {
        setIsLoading(false);
      }
      // Take the first 5 movies
      const latestMovies = sortedMovies.slice(0, 5);
      setPosts(latestMovies);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };
  if (isLoading) {
    return (
      <div className="bg-[red] font-bold flex align-center justify-center text-4xl m-auto w-full h-[auto]">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[red] font-bold flex align-center justify-center text-4xl m-auto w-full h-[auto]">
        Error: {error}
      </div>
    );
  }

  return (
    <>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 m-auto">
        {posts.map((movie, key) => (
          <Link
            to={`/moviedetails/${movie._id}`}
            key={key}
            className="hover:text-black hover:font-semibold transition-all duration-500 overflow-hidden"
          >
            <div
              className="w-full max-w-md shadow-md bg-[aliceblue] mx-auto mt-10 mb-10"
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <img
                className="object-cover object-center rounded-t-xl w-full h-48 hover:scale-95 transition-all duration-500 overflow-hidden"
                src={"http://localhost:5000/" + movie.image[0]}
                alt=""
                style={{
                  minHeight: "150px",
                  minWidth: "50px",
                  borderRadius: "10px 10px 0 0",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.5)",
                }}
              />
              <div className="p-4">
                <h4 className="text-xl font-semibold text-blue-600 truncate">
                  <ion-icon name="person-outline"></ion-icon>
                  {movie.title}
                </h4>
                <p
                  className="flex movies-center mt-2 font-semibold text-gray-700"
                  style={{ textTransform: "uppercase" }}
                >
                  <ion-icon name="copy-outline"></ion-icon>
                  {movie.genre}
                </p>
                <div
                  className="mb-2 leading-normal text-auto overflow-hidden"
                  style={{
                    maxHeight: "1.5em",
                    overflow: "hidden",
                  }}
                ></div>
                <button className="px-4 py-2 text-sm text-white bg-red-500 rounded shadow">
                  Read more
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default AllMovies;

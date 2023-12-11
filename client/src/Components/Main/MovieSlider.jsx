import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import axios from "axios";

const MovieSlider = () => {
  const [post, setPost] = useState([]);

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

      // Take the first 5 movies
      const latestMovies = sortedMovies.slice(0, 5);
      setPost(latestMovies);
    } catch (error) {
      console.log(error);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: false, // Set this to false for horizontal layout
  };
  return (
    <div className="w-2/4 m-auto">
      <div className="mt-10">
        <h1 className="text-center d-flex justify-content-center align-items-center font-weight-bold text-2xl mb-2 border">
          Top Featured Movies
        </h1>
        <Slider {...settings}>
          {post.map((d) => (
            <div key={d.name} className="bg-gray-100 h-[450px] text-black ">
              <div className="h-56 flex justify-center items-center">
                <img
                  src={"http://localhost:5000/" + d.image[0]}
                  alt="slider"
                  className="h-44 w-44"
                />
              </div>

              <div className="flex flex-col items-center justify-center gap-2 p-4">
                <p className="text-xl font-semibold">{d.title}</p>
                <p className="text-center">{d.genre}</p>
                <button className="bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default MovieSlider;

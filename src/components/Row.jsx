import axios from "axios";
import React, { useState, useEffect } from "react";
import Movie from "./Movie";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Row = ({ title, fetchURL, rowID }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(fetchURL).then((response) => {
      setMovies(response.data.results);
    });
  }, [fetchURL]);

  const slideLeft = () => {
    var scroll = document.getElementById("slider" + rowID);
    scroll.scrollLeft -= 500;
    console.log(scroll.scrollLeft);
    console.log("slide left");
  };

  const slideRight = () => {
    var scroll = document.getElementById("slider" + rowID);
    scroll.scrollLeft += 500;
    console.log(scroll.scrollLeft);
    console.log("slide right");
  };

  return (
    <>
      <h2 className="text-white md:text-xl p-4 font-bold">{title}</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          className="left-0 bg-white opacity-50 hover:opacity-100 absolute rounded-full cursor-pointer z-10 hidden group-hover:block"
          onClick={slideLeft}
          size={40}
        />
        <div
          id={"slider" + rowID}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies.map((item, id) => (
            <Movie key={id} item={item} />
          ))}
        </div>
        <MdChevronRight
          className="right-0 bg-white opacity-50 hover:opacity-100 absolute rounded-full cursor-pointer z-10 hidden group-hover:block"
          onClick={slideRight}
          size={40}
        />
      </div>
    </>
  );
};

export default Row;

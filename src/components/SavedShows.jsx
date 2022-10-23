import React, { useState, useEffect } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { AiOutlineClose } from "react-icons/ai";

const SavedShows = () => {
  const { user } = UserAuth();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setMovies(doc.data()?.savedShows);
    });
  }, [user?.email]);

  const movieRef = doc(db, "users", `${user?.email}`);
  const deleteShow = async (passedID) => {
    try {
      const result = movies.filter((item) => item.id !== passedID);
      await updateDoc(movieRef, {
        savedShows: result,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const slideLeft = () => {
    var scroll = document.getElementById("slider");
    scroll.scrollLeft -= 500;
  };

  const slideRight = () => {
    var scroll = document.getElementById("slider");
    scroll.scrollLeft += 500;
  };
  return (
    <>
      <h2 className="text-white md:text-xl p-4 font-bold">My Shows</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          className="left-0 bg-white opacity-50 hover:opacity-100 absolute rounded-full cursor-pointer z-10 hidden group-hover:block"
          onClick={slideLeft}
          size={40}
        />
        <div
          id={"slider"}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies.map((item, id) => (
            <div
              key={id}
              className="m-2 w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative"
            >
              <img
                className="w-full h-auto block"
                src={`https://image.tmdb.org/t/p/w500${item?.img}`}
                alt={item?.title}
              />
              <div className="absolute w-full h-full top-0 left-0 hover:bg-black/80 opacity-0 hover:opacity-100  text-white">
                <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
                  {item?.title}
                </p>
                <p
                  onClick={() => deleteShow(item.id)}
                  className="absolute text-gray-300 top-3 right-3"
                >
                  <AiOutlineClose />
                </p>
              </div>
            </div>
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

export default SavedShows;

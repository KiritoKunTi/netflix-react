import React from "react";
import Main from "../components/Main";
import requests from "../Requests.js";
import Row from "../components/Row.jsx";

const Home = () => {
  return (
    <>
      <Main />
      <Row title="UpComing" fetchURL={requests.requestUpcoming} />
      <Row title="Popular" fetchURL={requests.requestPopular} />
      <Row title="Trending" fetchURL={requests.requestTrending} />
      <Row title="Horror" fetchURL={requests.requestHorror} />
      <Row title="TopRated" fetchURL={requests.requestTopRated} />
    </>
  );
};

export default Home;

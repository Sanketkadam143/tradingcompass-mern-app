import React from "react";
import { Helmet } from "react-helmet-async";
import Position from "../components/Portfolio/Position";
const Portfolio = () => {
  return (
    <>
      <Helmet>
        <title> Trading Compass | Portfolio </title>
      </Helmet>
      <Position/>
    </>
  );
};

export default Portfolio;

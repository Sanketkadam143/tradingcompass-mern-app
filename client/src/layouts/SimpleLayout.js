import React from "react";
import pages from "../pages";

const { Navbar, SecNav, BottomNav } = pages;

const SimpleLayout = ({Component}) => {
  return (
    <>
      <Navbar />
      <SecNav />

      <div className="App" style={{ marginTop: "10em" }}>{<Component/>}</div>
      <BottomNav />
    </>
  );
};

export default SimpleLayout;

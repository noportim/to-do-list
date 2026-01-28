import React from "react";
import Navbar from "./Navbar";

const Loyout = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      <Navbar />
      {children}
    </React.Fragment>
  );
};

export default Loyout;

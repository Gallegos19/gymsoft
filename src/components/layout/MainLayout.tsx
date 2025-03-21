import React from "react";
import Navbar from "../NavBar";


const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
      <div>
        <Navbar/>
        <main>{children}</main>
      </div>
    );
  };
  

export default MainLayout;

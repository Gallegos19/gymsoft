// App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";

import HomePage from "../pages/HomePage";
import Members from "pages/Members";
import Assistance from "pages/Assistance";
import MyMembers from "pages/MyMembers";
import Add from "pages/Add";
import QR from "pages/QR";
import Stadistics from "pages/Stadistics";
import Routines from "pages/Routines";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<Add />} />
          <Route path="/members" element={<Members />} />
          <Route path="/qr" element={<QR />} />
          <Route path="/mymembers" element={<MyMembers />} />
          <Route path="/assistance/" element={<Assistance />} />
          <Route path="/stadistics" element={<Stadistics />} />
          <Route path="/routines" element={<Routines />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
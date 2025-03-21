import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import AllPages from "../pages/AllPages";
import PrivacyPolicies from "pages/PrivacyPolicies";
import Us from "pages/Us";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<AllPages />} />
          <Route path="/privacy-policies" element={<PrivacyPolicies />} /> 
          <Route path="/us" element={<Us />} /> 
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;

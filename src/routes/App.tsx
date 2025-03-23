import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";

import HomePage from "../pages/HomePage";
import Members from "pages/Members";
import Assistance from "pages/Assistance";
import MyMembers from "pages/MyMembers";
import Add from "pages/Add";
import QR from "pages/QR";
import Stadistics from "pages/Stadistics";
import Routines from "pages/Routines";
import Login from "pages/Login";
import { Outlet } from "react-router-dom";
import Register from "pages/Register";
import ProtectedRoute from "core/utils/ProtectedRoute";
import NotFound from "pages/NotFound";

function MainLayoutWrapper() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />

        {/* Rutas con MainLayout */}
        <Route element={<ProtectedRoute />}>
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />

          <Route element={<MainLayoutWrapper />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/add" element={<Add />} />
            <Route path="/members" element={<Members />} />
            <Route path="/qr" element={<QR />} />
            <Route path="/mymembers" element={<MyMembers />} />
            <Route path="/assistance" element={<Assistance />} />
            <Route path="/stadistics" element={<Stadistics />} />
            <Route path="/routines" element={<Routines />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

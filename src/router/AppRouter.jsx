import React from "react";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth/pages/LoginPage";
import { HomePage } from "../auth/pages/HomePage";
import { GenericasList } from "../modulos/genericas/pages/GenericasList";
import { UserList } from "../modulos/users/pages/UserList";

export const AppRouter = () => {
  const token = localStorage.getItem("access_token");
  return (
    <>
      <Routes>
        {!token && <Route path="*" element={<LoginPage />} />}
        {token && <Route path="/" element={<HomePage />} />}
        {token && <Route path="login/" element={<HomePage />} />}
        {token && <Route path="home/" element={<HomePage />} />}
        {token && <Route path="gestion_genericas/" element={<GenericasList />} />}
        {token && <Route path="gestion_usuarios/" element={<UserList />} />}
      </Routes>
    </>
  );
};

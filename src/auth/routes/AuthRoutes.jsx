import { Routes, Route, Navigate } from "react-router-dom"
import { LoginPage } from "../pages/LoginPage"
import { RegisterPage } from "../pages/RegisterPage"

export const AuthRoutes = () => {
  return(
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />

      {/* Si no está en ninguna de las anteriores, navegar a la siguiente ruta */}
      <Route path="*" element={<Navigate to="/auth/login" />} />
    </Routes>
  )
};

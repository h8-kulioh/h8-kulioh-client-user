import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserTask from "./pages/UserTask";
import LandingTask from "./pages/LandingTask";
import AllStatistics from "./pages/AllStatistics";
import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedRoute2 from "./components/ProtectedRoute2";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/login"
          // ProtectedRoute2 untuk mencegah admin yang sudah login mengakses halaman login dan register
          element={
            <ProtectedRoute2>
              <LoginPage />
            </ProtectedRoute2>
          }
        />
        <Route
          path="/register"
          // ProtectedRoute2 untuk mencegah admin yang sudah login mengakses halaman login dan register
          element={
            <ProtectedRoute2>
              <RegisterPage />
            </ProtectedRoute2>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <LandingTask />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

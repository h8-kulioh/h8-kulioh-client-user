import HomePage from "./pages/fiturSoalHarian/HomePage";
import LoginPage from "./pages/fiturLoginRegister/LoginPage";
import RegisterPage from "./pages/fiturLoginRegister/RegisterPage";
import TryOutPage from "./pages/fiturTryout/TryOutPage";
import LandingTask from "./pages/fiturToDoList/LandingTask";
import ChatPage from "./pages/fiturChat/ChatPage";
import { Routes, Route } from "react-router-dom";
import UserTask from "./pages/fiturToDoList/UserTask"
import ProfilePage from "./pages/fiturProfile/ProfilePage"

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProtectedRoute2 from "./components/ProtectedRoute/ProtectedRoute2";

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
          path="/tryout"
          element={
            <ProtectedRoute>
              <TryOutPage />
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
        <Route
          path="/tasks/:subject"
          element={
            <ProtectedRoute>
              <UserTask />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

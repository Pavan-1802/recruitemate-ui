import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router";
import Authentication from "./pages/Authentication";
import VerifyEmail from "./pages/VerifyEmail";
import Jobs from "./pages/Jobs";
import UploadCandidates from "./pages/UploadCandidates";
import Candidates from "./pages/Candidates";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import OnHold from "./pages/OnHold";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route
          path="/auth"
          element={
            <PublicRoute>
              <Authentication />
            </PublicRoute>
          }
        />
        <Route
          path="/verify/:token"
          element={
            <PublicRoute>
              <VerifyEmail />
            </PublicRoute>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />
        <Route
          path="/upload-candidates/:id"
          element={
            <ProtectedRoute>
              <UploadCandidates />
            </ProtectedRoute>
          }
        />
        <Route
          path="/candidates/:id"
          element={
            <ProtectedRoute>
              <Candidates />
            </ProtectedRoute>
          }
        />
        <Route
          path="/on-hold-resumes"
          element={
            <ProtectedRoute>
              <OnHold />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Jobs />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

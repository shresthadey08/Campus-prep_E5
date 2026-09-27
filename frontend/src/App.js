import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import AppLayout from "./components/Common/AppLayout";
import PrivateRoute from "./components/Common/PrivateRoute";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

import StudentDashboard from "./pages/student/StudentHome/StudentDashboard";
import CV from "./pages/student/CV/CV";
import CVUpload from "./pages/student/CV/CVUpload";
import EditCV from "./pages/student/CV/EditCV";
import CVPreview from "./pages/student/CV/CVPreview";
import Jobs from "./pages/student/Jobs/Jobs";
import SuggestedJobs from "./pages/student/Jobs/SuggestedJobs";
import CurrentOpenings from "./pages/student/Jobs/CurrentOpenings";
import MissingSkills from "./pages/student/Jobs/MissingSkills";
import AlternativeSkills from "./pages/student/Jobs/AlternativeSkills";
import JobDetails from "./pages/student/JobDetails/JobDetails";
import Applications from "./pages/student/Applications/Applications";
import SuggestedModules from "./pages/student/SuggestedModules/SuggestedModules";

import MentorDashboard from "./pages/mentor/MentorDashboard";
import UploadModule from "./pages/mentor/UploadModule";
import EditModule from "./pages/mentor/EditModule";
import DeleteModule from "./pages/mentor/DeleteModule";
import StudentPerformance from "./pages/mentor/StudentPerformance";

import AdminDashboard from "./pages/admin/AdminDashboard";
import Companies from "./pages/admin/Companies";
import AddJob from "./pages/admin/AddJob";
import EditJob from "./pages/admin/EditJob";
import DeleteJob from "./pages/admin/DeleteJob";
import ManageOpenings from "./pages/admin/ManageOpenings";

function NotFound() {
  return (
    <div className="container" style={{ textAlign: "center", padding: "80px 20px" }}>
      <h1 className="page-title">404</h1>
      <p className="page-subtitle">The page you're looking for doesn't exist.</p>
    </div>
  );
}

function RootRedirect() {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Home />;
  return <Navigate to={`/${user.role}`} replace />;
}

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<RootRedirect />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Student */}
      <Route
        path="/student"
        element={
          <PrivateRoute allowedRole="student">
            <AppLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<StudentDashboard />} />
        <Route path="cv" element={<CV />}>
          <Route index element={<Navigate to="upload" replace />} />
          <Route path="upload" element={<CVUpload />} />
          <Route path="edit" element={<EditCV />} />
          <Route path="preview" element={<CVPreview />} />
        </Route>
        <Route path="jobs" element={<Jobs />}>
          <Route index element={<Navigate to="suggested" replace />} />
          <Route path="suggested" element={<SuggestedJobs />} />
          <Route path="openings" element={<CurrentOpenings />} />
          <Route path="missing-skills" element={<MissingSkills />} />
          <Route path="alternative-skills" element={<AlternativeSkills />} />
        </Route>
        <Route path="jobs/:id" element={<JobDetails />} />
        <Route path="applications" element={<Applications />} />
        <Route path="modules" element={<SuggestedModules />} />
      </Route>

      {/* Mentor (UI placeholders only) */}
      <Route
        path="/mentor"
        element={
          <PrivateRoute allowedRole="mentor">
            <AppLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<MentorDashboard />} />
        <Route path="upload-module" element={<UploadModule />} />
        <Route path="edit-module" element={<EditModule />} />
        <Route path="delete-module" element={<DeleteModule />} />
        <Route path="performance" element={<StudentPerformance />} />
      </Route>

      {/* Admin (UI placeholders only) */}
      <Route
        path="/admin"
        element={
          <PrivateRoute allowedRole="admin">
            <AppLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="companies" element={<Companies />} />
        <Route path="add-job" element={<AddJob />} />
        <Route path="edit-job" element={<EditJob />} />
        <Route path="delete-job" element={<DeleteJob />} />
        <Route path="manage-openings" element={<ManageOpenings />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

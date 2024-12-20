import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import SelectUser from './SelectUser/SelectUser';
import Admindashboard from './Admin/Admindashboard/Admindashboard';
import Admision from './Admin/Admindashboard/Features/Admission/Admision';
import Navbar from './Admin/Navbar/Navbar';
import Footer from './Admin/Footer/Footer';
import Tnavbar from './Teacher/Tnavbar/Tnavbar';
import Snavbar from './Students/Snavbar/Snavbar';
import Tfooter from './Teacher/Tfooter/Tfooter';
import Sfooter from './Students/Sfooter/Sfooter'
import AddFaculty from './Admin/Admindashboard/Features/Faculty/AddFaculty/AddFaculty';
import FeeCollection from './Admin/Admindashboard/Features/Student/FeeCollection/FeeCollection';
import ViewStudentAttendences from './Admin/Admindashboard/Features/Student/ViewStudentAttendences/ViewStudentAttendences';
import ViewStudentRecord from './Admin/Admindashboard/Features/Student/ViewStudentRecord/ViewStudentRecord';
import Annoucement from './Admin/Admindashboard/Features/Annoucement/Annoucement';
import ViewFacultyRecord from './Admin/Admindashboard/Features/Faculty/ViewFacultyRecord/ViewFacultyRecord';
import MarkAttendences from './Admin/Admindashboard/Features/Faculty/MarkAttendences/MarkAttendences';
import ClassSchedule from './Admin/Admindashboard/Features/CreateSchedule/ClassSchedule/ClassSchedule';
import ExamSchedule from './Admin/Admindashboard/Features/CreateSchedule/ExamSchedule/ExamSchedule';
import TeacherLogin from './Teacher/TeacherLogin/TeacherLogin';
import AdminLogin from './Admin/AdminLogin/AdminLogin';
import StudentLogin from './Students/StudentLogin/StudentLogin';
import TeacherDashboard from './Teacher/TeacherDashboard/TeacherDashboard';
import ClassAttendance from './Teacher/TeacherDashboard/Features/ClassAttendance/ClassAttendance'
import Assignment from './Teacher/TeacherDashboard/Features/Assignment/Assignment'

function App() {
  const location = useLocation();
  const role = localStorage.getItem("role");

  const adminRoutes = [
    "/Admission",
    "/AddFaculty",
    "/FeeCollection",
    "/ViewStudentAttendences",
    "/ViewStudentRecord",
    "/Annoucement",
    "/ViewFacultyRecord",
    "/MarkAttendences",
    "/ClassSchedule",
    "/ExamSchedule",
  ];

  const teacherRoutes = [
    "/ClassAttendance",
    "/Assignment",
  ];

  const studentRoutes = [
    
  ];

  const excludeNavbarRoutes = [
    "/AdminDashboard",
    "/TeacherDashboard",
    "/",
    "/AdminLogin",
    "/TeacherLogin",
    "/StudentLogin",
  ];

  const isAdminRoute = adminRoutes.includes(location.pathname);
  const isTeacherRoute = teacherRoutes.includes(location.pathname);
  const isStudentRoute = studentRoutes.includes(location.pathname);

  const showNavbar =
    role &&
    !excludeNavbarRoutes.includes(location.pathname) &&
    ((role === "admin" && isAdminRoute) ||
      (role === "teacher" && isTeacherRoute) ||
      (role === "student" && isStudentRoute));

  const showFooter =
    role &&
    !["/AdminLogin", "/TeacherLogin", "/StudentLogin", "/"].includes(
      location.pathname
    );

  const renderNavbar = () => {
    if (role === "admin" && isAdminRoute) return <Navbar />;
    if (role === "teacher" && isTeacherRoute) return <Tnavbar />;
    if (role === "student" && isStudentRoute) return <Snavbar />;
    return null;
  };

  const renderFooter = () => {
    if (role === "admin") return <Footer />;
    if (role === "teacher") return <Tfooter />;
    if (role === "student") return <Sfooter />;
    return null;
  };

  return (
    <div className="App">
      {showNavbar && renderNavbar()}
      <Routes>
        <Route path="/" element={<SelectUser />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/TeacherLogin" element={<TeacherLogin />} />
        <Route path="/StudentLogin" element={<StudentLogin />} />

        {/* Admin Routes */}
        <Route path="/AdminDashboard" element={<Admindashboard />} />
        <Route path="/Admission" element={<Admision />} />
        <Route path="/AddFaculty" element={<AddFaculty />} />
        <Route path="/FeeCollection" element={<FeeCollection />} />
        <Route path="/ViewStudentAttendences" element={<ViewStudentAttendences />} />
        <Route path="/ViewStudentRecord" element={<ViewStudentRecord />} />
        <Route path="/Annoucement" element={<Annoucement />} />
        <Route path="/ViewFacultyRecord" element={<ViewFacultyRecord />} />
        <Route path="/MarkAttendences" element={<MarkAttendences />} />
        <Route path="/ClassSchedule" element={<ClassSchedule />} />
        <Route path="/ExamSchedule" element={<ExamSchedule />} />

        {/* Teacher Routes */}
        <Route path="/TeacherDashboard" element={<TeacherDashboard />} />
        <Route path="/ClassAttendance" element={<ClassAttendance />} />
        <Route path="/Assignment" element={<Assignment />} />

        {/* Add Student Routes Here */}
      </Routes>
      {showFooter && renderFooter()}
    </div>
  );
}

const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWrapper;

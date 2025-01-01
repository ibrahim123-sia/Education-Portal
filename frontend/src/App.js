import { BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';
import React, { useEffect, useState } from "react";
import './App.css';
import loading from './loading.gif'
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
import TeacherDashboard from './Teacher/TeacherDashboard/TeacherDashboard';
import ClassAttendance from './Teacher/TeacherDashboard/Features/ClassAttendance/ClassAttendance'
import Assignment from './Teacher/TeacherDashboard/Features/Assignment/Assignment'
import Grading from './Teacher/TeacherDashboard/Features/Grading/Grading'
import TAnnouncement from './Teacher/TeacherDashboard/Features/Announcement/Announcement'
import StudentLogin from './Students/StudentLogin/StudentLogin'
import StudentDashboard from './Students/StudentDashboard/StudentDashboard'
import Announcements from './Students/StudentDashboard/Features/Announcements/Announcements'
import SubmitAssignment from './Students/StudentDashboard/Features/SubmitAssignment/SubmitAssignment'
import ViewGrades from './Students/StudentDashboard/Features/ViewGrades/ViewGrades'
import ViewAttendance from './Students/StudentDashboard/Features/ViewAttendance/ViewAttendance'

function App() {
  const location = useLocation();
  const role = localStorage.getItem("role");
  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000); // Adjust the timeout as needed
    return () => clearTimeout(timer);
  }, []);

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
    "/Grading",
    "/TAnnouncement" 
  ];

  const studentRoutes = [
   "/ViewAttendance",
   "/SAnnouncements",
   "/ViewGrades",
   "/SubmitAssignment",
   "/SAnnouncements" 
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

  if (isLoading) {
    return (
      <div style={loadingContainerStyle}>
        <img 
          src={loading}
          alt="Loading..." 
          style={gifStyle} 
        />
      </div>
    );
  }
  
  return (
    <div className="App">
      {showNavbar && renderNavbar()}
      <Routes>
        <Route path="/" element={<SelectUser />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/TeacherLogin" element={<TeacherLogin />} />
        <Route path="/StudentLogin" element={<StudentLogin />} />

        
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

        
        <Route path="/TeacherDashboard" element={<TeacherDashboard />} />
        <Route path="/ClassAttendance" element={<ClassAttendance />} />
        <Route path="/Assignment" element={<Assignment />} />
        <Route path="/Grading" element={<Grading />} />
        <Route path="/TAnnouncement" element={<TAnnouncement />} />
      
        <Route path="/StudentLogin" element={<StudentLogin />} />
        <Route path="/StudentDashboard"  element={<StudentDashboard  />} />
        <Route path="/ViewAttendance"  element={<ViewAttendance />} />
        <Route path="/SAnnouncements"  element={<Announcements  />} />
        <Route path="/ViewGrades"  element={<ViewGrades  />} />
        <Route path="/SubmitAssignment"  element={<SubmitAssignment  />} />  

      </Routes>
      {showFooter && renderFooter()}
    </div>
  );
}
const gifStyle = {
  width: '100px',
  height: '100px',
};

const loadingContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh', 
};


const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWrapper;

import { BrowserRouter, Routes, Route,useLocation } from 'react-router-dom';
import './App.css';
import SelectUser from './SelectUser/SelectUser';
import AdminLogin from './Admin/AdminLogin/AdminLogin';
import Admindashboard from './Admin/Admindashboard/Admindashboard';
import Admision from './Admin/Admindashboard/Features/Admission/Admision';
import Navbar from './Admin/Navbar/Navbar';
import Footer from './Admin/Footer/Footer';
import AddFaculty from './Admin/Admindashboard/Features/Faculty/AddFaculty/AddFaculty';
import FeeCollection from './Admin/Admindashboard/Features/Student/FeeCollection/FeeCollection';
import ViewStudentAttendences from './Admin/Admindashboard/Features/Student/ViewStudentAttendences/ViewStudentAttendences';
import ViewStudentRecord from './Admin/Admindashboard/Features/Student/ViewStudentRecord/ViewStudentRecord';

function App() {

  const location=useLocation();
  const hideNavbar = ['/', '/AdminLogin', '/AdminDashboard'].includes(location.pathname);
  const hideFooter = ['/', '/AdminLogin', '/AdminDashboard'].includes(location.pathname);

  return (
    <div className="App">
        {!hideNavbar && <Navbar/>}
        <Routes>
          <Route path='/' element={<SelectUser/>} />
          <Route path='/AdminLogin' element={<AdminLogin/>} />
          <Route path='/AdminDashboard' element={<Admindashboard/>} />
          <Route path='/Admission' element={<Admision/>}/>
          <Route path='/AddFaculty' element={<AddFaculty/>}/>
          <Route path='/FeeCollection' element={<FeeCollection/>}/>
          <Route path='/ViewStudentAttendences' element={<ViewStudentAttendences/>}/>
          <Route path='/ViewStudentRecord' element={<ViewStudentRecord/>}/>
        </Routes>
        {!hideFooter && <Footer/>}
    </div>
  );
}

const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWrapper;

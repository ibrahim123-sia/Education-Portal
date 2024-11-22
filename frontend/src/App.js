import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SelectUser from './SelectUser/SelectUser';
import AdminLogin from './Admin/AdminLogin/AdminLogin';
import Admindashboard from './Admin/Admindashboard/Admindashboard';
import Admision from './Admin/Admindashboard/Features/Admission/Admision';
import Navbar from './Admin/Navbar/Navbar';
function App() {
  return (
    <div className="App">
        
        <Routes>
          <Route path='/' element={<SelectUser/>} />
          <Route path='/AdminLogin' element={<AdminLogin/>} />
          <Route path='/AdminDashboard' element={<Admindashboard/>} />
          <Route path='/Admission' element={<Admision/>}/>
        </Routes>
      
    </div>
  );
}

const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWrapper;

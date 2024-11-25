import React, { useState, useEffect } from 'react';
import './AddFaculty.css';
import axios from 'axios';

const AddFaculty = () => {
  const [TeacherID, setTeacherID] = useState('');
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Gender, setGender] = useState('');
  const [DOB, setDOB] = useState('');
  const [Email, setEmail] = useState('');
  const [Phone, setPhone] = useState('');
  const [CNIC, setCNIC] = useState('');
  const [City, setCity] = useState('');
  const [State, setState] = useState('');
  const [PostalCode, setPostalCode] = useState('');
  const [AddressType, setAddressType] = useState('');
  const [HouseNo, setHouseNo] = useState('');
  const [Degree, setDegree] = useState('');
  const [Institution, setInstitution] = useState('');
  const [DateCompleted, setDateCompleted] = useState('');
  const [SubjectID, setSubjectID] = useState('');
  const [SubjectName, setSubjectName] = useState('');

  const provinces = ['Punjab', 'Sindh', 'Khyber Pakhtunkhwa', 'Balochistan', 'Gilgit-Baltistan', 'Azad Jammu and Kashmir'];
  const cities = {
    Punjab: ['Lahore', 'Faisalabad', 'Rawalpindi', 'Multan'],
    Sindh: ['Karachi', 'Hyderabad', 'Sukkur'],
    'Khyber Pakhtunkhwa': ['Peshawar', 'Mardan', 'Abbottabad'],
    Balochistan: ['Quetta', 'Gwadar', 'Turbat'],
    'Gilgit-Baltistan': ['Gilgit', 'Skardu'],
    'Azad Jammu and Kashmir': ['Muzaffarabad', 'Mirpur'],
  };

  const degrees = [
    'B.Ed',
    'B.A English',
    'M.A English',
    'B.Sc Mathematics',
    'M.Sc Mathematics',
    'B.Sc Physics',
    'M.Sc Physics',
    'B.Sc Chemistry',
    'M.Sc Chemistry',
    'B.Sc Biology',
    'M.Sc Biology',
    'B.A History',
    'M.A History',
    'B.A Geography',
    'M.A Geography',
    'B.Sc Computer Science',
  ];

  const handleSubject = () => {
    switch (Degree) {
      case 'B.Ed':
        setSubjectName('General Education');
        setSubjectID('ED01');
        break;
      case 'B.A English':
        setSubjectName('English');
        setSubjectID('EN02');
        break;
      case 'M.A English':
        setSubjectName('English Literature');
        setSubjectID('EN03');
        break;
      case 'B.Sc Mathematics':
        setSubjectName('Mathematics');
        setSubjectID('MA04');
        break;
      case 'M.Sc Mathematics':
        setSubjectName('Advanced Mathematics');
        setSubjectID('MA05');
        break;
      case 'B.Sc Physics':
        setSubjectName('Physics');
        setSubjectID('PH06');
        break;
      case 'M.Sc Physics':
        setSubjectName('Advanced Physics');
        setSubjectID('PH07');
        break;
      case 'B.Sc Chemistry':
        setSubjectName('Chemistry');
        setSubjectID('CH08');
        break;
      case 'M.Sc Chemistry':
        setSubjectName('Advanced Chemistry');
        setSubjectID('CH09');
        break;
      case 'B.Sc Biology':
        setSubjectName('Biology');
        setSubjectID('BI10');
        break;
      case 'M.Sc Biology':
        setSubjectName('Advanced Biology');
        setSubjectID('BI11');
        break;
      case 'B.A History':
        setSubjectName('History');
        setSubjectID('HI12');
        break;
      case 'M.A History':
        setSubjectName('Advanced History');
        setSubjectID('HI13');
        break;
      case 'B.A Geography':
        setSubjectName('Geography');
        setSubjectID('GE14');
        break;
      case 'M.A Geography':
        setSubjectName('Advanced Geography');
        setSubjectID('GE15');
        break;
      case 'B.Sc Computer Science':
        setSubjectName('Computer Science');
        setSubjectID('CS16');
        break;
      default:
        setSubjectName('General Studies');
        setSubjectID('GS00');
    }
  };

  useEffect(() => {
    handleSubject();
  }, [Degree]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uniqueNumber = Math.floor(Math.random() * 1000);
    const generatedID = `T${uniqueNumber.toString().padStart(3, '0')}${SubjectID}`;

    setTeacherID(generatedID);

    try {
      const response = await axios.post('http://localhost:5000/AddFaculty', {
        TeacherID: generatedID,
        FirstName,
        LastName,
        Gender,
        DOB,
        Email,
        Phone,
        CNIC,
        City,
        State,
        PostalCode,
        AddressType,
        HouseNo,
        Degree,
        Institution,
        DateCompleted,
        SubjectID,
        SubjectName,
      });
      alert('Done')
      console.log(response.data);
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

  return (
    <div className="FMain">
      <div className="FForm">
        <h2>Add Faculty Member</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="FirstName" required placeholder="First Name" value={FirstName} onChange={(e) => setFirstName(e.target.value)} />
          <input type="text" name="LastName" required placeholder="Last Name" value={LastName} onChange={(e) => setLastName(e.target.value)} />
          <select name="Gender" value={Gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input type="date" name="DOB" required value={DOB} onChange={(e) => setDOB(e.target.value)} placeholder="Date Of Birth" />
          <input type="email" name="Email" required placeholder="Email" value={Email} onChange={(e) => setEmail(e.target.value)} />
          <input type="text" name="Phone" required placeholder="Phone" value={Phone} onChange={(e) => setPhone(e.target.value)} />
          <input type="text" name="CNIC" required placeholder="Enter CNIC" value={CNIC} onChange={(e) => setCNIC(e.target.value)} />
          <select name="State" value={State} required onChange={(e) => setState(e.target.value)}>
            <option value="">Select Province</option>
            {provinces.map((province) => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
          </select>
          <select name="City" required value={City} onChange={(e) => setCity(e.target.value)}>
            <option value="">Select City</option>
            {State && cities[State]?.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          <input type="text" name="PostalCode" required placeholder="Postal Code" value={PostalCode} onChange={(e) => setPostalCode(e.target.value)} />
          <input type="text" name="HouseNo" required placeholder="House No" value={HouseNo} onChange={(e) => setHouseNo(e.target.value)} />
          <select name="Degree" value={Degree} onChange={(e) => setDegree(e.target.value)}>
            <option value="">Select Degree</option>
            {degrees.map((deg) => (
              <option key={deg} value={deg}>
                {deg}
              </option>
            ))}
          </select>
          <input type="text" name="Institution" required placeholder="Institution" value={Institution} onChange={(e) => setInstitution(e.target.value)} />
          <input type="date" name="DateCompleted" required placeholder="Degree Completion Date" value={DateCompleted} onChange={(e) => setDateCompleted(e.target.value)} />
          <button type="submit">Save Faculty</button>
        </form>
      </div>
    </div>
  );
};

export default AddFaculty;

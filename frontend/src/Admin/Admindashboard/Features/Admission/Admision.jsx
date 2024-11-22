import React, { useState } from 'react';
import './Admission.css';
import axios from 'axios';

const Admission = () => {
  const [StudentID, setStudentID] = useState('');
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Age, setAge] = useState();
  const [Gender, setGender] = useState('');
  const [Email, setEmail] = useState('');
  const [Phone, setPhone] = useState('');
  const [DOB, setDOB] = useState('');  
  const [Photo, setPhoto] = useState('');  
  const [HouseNo, setHouseNo] = useState('');
  const [Street, setStreet] = useState('');
  const [City, setCity] = useState('');
  const [GuardianName, setGuardianName] = useState('');
  const [GuardianContact, setGuardianContact] = useState('');
  const [Relationship, setRelationship] = useState('');
  const [AddDate,setAddDate]=useState('')
  const [Class, setClass] = useState('');
  const [Section, setSection] = useState('SA');
  const [studentCount, setStudentCount] = useState(1);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    switch (name) {
      case 'StudentID':
        setStudentID(value);
        break;
      case 'FirstName':
        setFirstName(value);
        break;
      case 'LastName':
        setLastName(value);
        break;
      case 'Age':
        setAge(value);
        break;
      case 'Gender':
        setGender(value);
        break;
      case 'Email':
        setEmail(value);
        break;
      case 'Phone':
        setPhone(value);
        break;
      case 'DOB':
        setDOB(value);
        break;
      case 'Photo':
        setPhoto(e.target.files ? e.target.files[0] : value); 
        break;
      case 'HouseNo':
        setHouseNo(value);
        break;
      case 'Street':
        setStreet(value);
        break;
      case 'City':
        setCity(value);
        break;
      case 'GuardianName':
        setGuardianName(value);
        break;
      case 'GuardianContact':
        setGuardianContact(value);
        break;
      case 'Relationship':
        setRelationship(value);
        break;
      case 'AddDate':
        setAddDate(value);
        break;
      case 'Class':
        setClass(value);        
        break;
      default:
        break;
    }
  };
  
  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uniqueNumber = studentCount.toString().padStart(4, '0');
    const generatedID = `${'C'}${Class}-${Section}-${uniqueNumber}`;
    setStudentID(generatedID);
    setStudentCount(studentCount + 1);

    try {
      const response = await axios.post('http://localhost:5000/Admission', {
        StudentID: generatedID,
        FirstName,
        LastName,
        Age,
        Gender,
        Email,
        Phone,
        DOB,
        Photo,        
        HouseNo,
        Street,
        City,
        GuardianName,
        GuardianContact,
        Relationship,
        DateOfAdmission: new Date().toISOString().split('T')[0], 
        Class,
        Section,        
      });

      if (response.status === 200) {
        alert('Form submitted successfully!');
      } else {
        alert('Failed to submit the form.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting the form.');
    }
  };

  return (
    <div className="StudentRegistration">
  <div className="Form">
    <form onSubmit={handleSubmit}>
      <h1 className="std">Student Registration</h1>
      
      <div className="input-container">
        <label>First Name:</label>
        <input
          type="text"
          name="FirstName"
          value={FirstName}
          onChange={handleChange}
          required
          className="input"
        />
      </div>
      <div className="input-container">
        <label>Last Name:</label>
        <input
          type="text"
          name="LastName"
          value={LastName}
          onChange={handleChange}
          required
          className="input"
        />
      </div>
      <div className="input-container">
        <label>Age:</label>
        <input
          type="number"
          name="Age"
          value={Age}
          onChange={handleChange}
          required
          className="input"
          min="3"
          max="16"
        />
      </div>
      <div className="input-container">
        <label>Gender:</label>
        <select
          name="Gender"
          value={Gender}
          onChange={handleChange}
          required
          className="select"
        >
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div className="input-container">
        <label>Email Address:</label>
        <input
          type="email"
          name="Email"
          value={Email}
          onChange={handleChange}
          required
          className="input"
        />
      </div>
      <div className="input-container">
        <label>Phone Number:</label>
        <input
          type="tel"
          name="Phone"
          value={Phone}
          onChange={handleChange}
          required
          className="input"
        />
      </div>
      <div className="input-container">
        <label>Date of Birth:</label>
        <input
          type="date"
          name="DOB"
          value={DOB}
          onChange={handleChange}
          required
          className="input"
        />
      </div>
      <div className="input-container">
        <label>Profile Picture:</label>
        <input
          type="file"
          name="Photo"
          onChange={handlePhotoChange}
          accept="image/*"
          className="picture"
        />
      </div>
      <div className="input-container">
        <label>House Number:</label>
        <input
          type="text"
          name="HouseNo"
          value={HouseNo}
          onChange={handleChange}
          required
          className="input"
        />
      </div>
      <div className="input-container">
        <label>Street Name:</label>
        <input
          type="text"
          name="Street"
          value={Street}
          onChange={handleChange}
          required
          className="input"
        />
      </div>
      <div className="input-container">
        <label>City:</label>
        <select
          name="City"
          value={City}
          onChange={handleChange}
          required
          className="select"
        >
          <option value="">Select</option>
          <option value="Karachi">Karachi</option>
          <option value="Lahore">Lahore</option>
          <option value="Multan">Multan</option>
        </select>
      </div>
      <div className="input-container">
        <label>Guardian's Name:</label>
        <input
          type="text"
          name="GuardianName"
          value={GuardianName}
          onChange={handleChange}
          required
          className="input"
        />
      </div>
      <div className="input-container">
        <label>Guardian's Contact Number:</label>
        <input
          type="tel"
          name="GuardianContact"
          value={GuardianContact}
          onChange={handleChange}
          required
          className="input"
        />
      </div>
      <div className="input-container">
        <label>Relationship to Student:</label>
        <input
          type="text"
          name="Relationship"
          value={Relationship}
          onChange={handleChange}
          required
          className="input"
        />
      </div>
      <div className="input-container">
        <label>Admission Date:</label>
        <input
          type="date"
          name="AddDate"
          value={AddDate}
          onChange={handleChange}
          required
          className="input"
        />
      </div>
      <div className="input-container">
        <label>Class/Grade Applying For:</label>
        <input
          type="text"
          name="Class"
          value={Class}
          onChange={handleChange}
          required
          className="input"
        />
      </div>
      
      <button className="button" type="submit">
        Submit
      </button>
      <p>{StudentID}</p>
    </form>
  </div>
</div>

  );
};

export default Admission;

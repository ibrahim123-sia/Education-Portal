import React, { useState, useEffect } from "react";
import "./AddFaculty.css";
import axios from "axios";
import Popup from "reactjs-popup";
const AddFaculty = () => {
  const [TeacherID, setTeacherID] = useState("");
  const [TeacherPassword,setTeacherPassword]=useState('')
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Gender, setGender] = useState("");
  const [DOB, setDOB] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [CNIC, setCNIC] = useState("");
  const [City, setCity] = useState("");
  const [State, setState] = useState("");
  const [PostalCode, setPostalCode] = useState("");
  const [AddressType, setAddressType] = useState("");
  const [HouseNo, setHouseNo] = useState("");
  const [Degree, setDegree] = useState("");
  const [Institution, setInstitution] = useState("");
  const [DateCompleted, setDateCompleted] = useState("");
  const [SubjectID, setSubjectID] = useState("");
  const [SubjectName, setSubjectName] = useState("");
  const [TeacherCount, setTeacherCount] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const provinces = [
    "Punjab",
    "Sindh",
    "Khyber Pakhtunkhwa",
    "Balochistan",
    "Gilgit-Baltistan",
    "Azad Jammu and Kashmir",
  ];
  const cities = {
    Punjab: ["Lahore", "Faisalabad", "Rawalpindi", "Multan"],
    Sindh: ["Karachi", "Hyderabad", "Sukkur"],
    "Khyber Pakhtunkhwa": ["Peshawar", "Mardan", "Abbottabad"],
    Balochistan: ["Quetta", "Gwadar", "Turbat"],
    "Gilgit-Baltistan": ["Gilgit", "Skardu"],
    "Azad Jammu and Kashmir": ["Muzaffarabad", "Mirpur"],
  };

  

  const handleSubject = () => {
    switch (Degree) {
      case "B.Ed":
        setSubjectName("General Education");
        setSubjectID("ED01");
        break;
      case "B.A English":
        setSubjectName("English");
        setSubjectID("EN02");
        break;
      case "M.A English":
        setSubjectName("English Literature");
        setSubjectID("EN03");
        break;
      case "B.Sc Mathematics":
        setSubjectName("Mathematics");
        setSubjectID("MA04");
        break;
      case "M.Sc Mathematics":
        setSubjectName("Advanced Mathematics");
        setSubjectID("MA05");
        break;
      case "B.Sc Physics":
        setSubjectName("Physics");
        setSubjectID("PH06");
        break;
      case "M.Sc Physics":
        setSubjectName("Advanced Physics");
        setSubjectID("PH07");
        break;
      case "B.Sc Chemistry":
        setSubjectName("Chemistry");
        setSubjectID("CH08");
        break;
      case "M.Sc Chemistry":
        setSubjectName("Advanced Chemistry");
        setSubjectID("CH09");
        break;
      case "B.Sc Biology":
        setSubjectName("Biology");
        setSubjectID("BI10");
        break;
      case "M.Sc Biology":
        setSubjectName("Advanced Biology");
        setSubjectID("BI11");
        break;
      case "B.A History":
        setSubjectName("History");
        setSubjectID("HI12");
        break;
      case "M.A History":
        setSubjectName("Advanced History");
        setSubjectID("HI13");
        break;
      case "B.A Geography":
        setSubjectName("Geography");
        setSubjectID("GE14");
        break;
      case "M.A Geography":
        setSubjectName("Advanced Geography");
        setSubjectID("GE15");
        break;
      case "B.Sc Computer Science":
        setSubjectName("Computer Science");
        setSubjectID("CS16");
        break;
      default:
        setSubjectName("General Studies");
        setSubjectID("GS00");
    }
  };

  useEffect(() => {
    const savedCount = localStorage.getItem("TeacherCount");
    if (!savedCount) {
      localStorage.setItem("TeacherCount", 1);
    } else {
      setTeacherCount(parseInt(savedCount, 10));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("TeacherCount", TeacherCount);
  }, [TeacherCount]);

  useEffect(() => {
    handleSubject();
  }, [Degree]);

  const generatePassword = () => {
    const chars = {
      upperCase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      lowerCase: "abcdefghijklmnopqrstuvwxyz",
      numbers: "0123456789"
    };
    
    let password = "";
  
    const getRandomChars = (source, count) => {
      let result = "";
      for (let i = 0; i < count; i++) {
        result += source[Math.floor(Math.random() * source.length)];
      }
      return result;
    };

    password += getRandomChars(chars.upperCase, 2);
    password += getRandomChars(chars.lowerCase, 6);
    password += getRandomChars(chars.numbers, 2);

    password = password.split("").sort(() => Math.random() - 0.5).join("");
  
    return password;
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uniqueNumber = TeacherCount.toString().padStart(3, "0");
    const generatedID = `T${uniqueNumber}-${SubjectID}`;
    const generatedPassword = generatePassword();
    setTeacherPassword(generatedPassword);
    setTeacherID(generatedID);

    const newCount = TeacherCount + 1;
    localStorage.setItem("TeacherCount", newCount);
    setTeacherCount(newCount);

    if (!FirstName.match(/^[A-Za-z]+$/)) {
      alert("First Name should only contain alphabets.");
      return;
    }
    if (!LastName.match(/^[A-Za-z]+$/)) {
      alert("Last Name should only contain alphabets.");
      return;
    }
    if (!Email) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/AddFaculty", {
        TeacherID: generatedID,
        TeacherPassword: generatedPassword,
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

      alert("Faculty Added Successfully");
      setIsOpen(true);
      
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  return (
    <div className="StudentRegistration">
      <form onSubmit={handleSubmit} className="Form">
        <h1 className="std">Add Faculty Member</h1>

        <div className="input-container">
          <label>First Name:</label>
          <input
            type="text"
            name="FirstName"
            value={FirstName}
            onChange={(e) => setFirstName(e.target.value)}
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
            onChange={(e) => setLastName(e.target.value)}
            required
            className="input"
          />
        </div>
        <div className="input-container">
          <label>Gender:</label>
          <select
            name="Gender"
            value={Gender}
            onChange={(e) => setGender(e.target.value)}
            required
            className="select"
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="input-container">
          <label>Date of Birth:</label>
          <input
            type="date"
            name="DOB"
            value={DOB}
            onChange={(e) => setDOB(e.target.value)}
            required
            className="input"
          />
        </div>
        <div className="input-container">
          <label>Email Address:</label>
          <input
            type="email"
            name="Email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPhone(e.target.value)}
            required
            className="input"
          />
        </div>
        <div className="input-container">
          <label>CNIC:</label>
          <input
            type="text"
            name="CNIC"
            value={CNIC}
            onChange={(e) => setCNIC(e.target.value)}
            required
            className="input"
          />
        </div>
        <div className="input-container">
          <label>Province:</label>
          <select
            name="State"
            value={State}
            onChange={(e) => setState(e.target.value)}
            required
            className="select"
          >
            <option value="">Select Province</option>
            {provinces.map((province) => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
          </select>
        </div>
        <div className="input-container">
          <label>City:</label>
          <select
            name="City"
            value={City}
            onChange={(e) => setCity(e.target.value)}
            required
            className="select"
          >
            <option value="">Select City</option>
            {State &&
              cities[State]?.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
          </select>
        </div>
        <div className="input-container">
          <label>Postal Code:</label>
          <input
            type="text"
            name="PostalCode"
            value={PostalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
            className="input"
          />
        </div>
        <div className="input-container">
          <label>House No:</label>
          <input
            type="text"
            name="HouseNo"
            value={HouseNo}
            onChange={(e) => setHouseNo(e.target.value)}
            required
            className="input"
          />
        </div>
        <div className="input-container">
          <label>Degree:</label>
          <select
    name="Degree"
    value={Degree}
    onChange={(e) => setDegree(e.target.value)}
    required
    className="select"
  >
    <option value="">Select Degree</option>
    <option value="B.A Urdu">B.A Urdu</option>
    <option value="M.A Urdu">M.A Urdu</option>
    <option value="B.A Islamiat">B.A Islamiat</option>
    <option value="M.A Islamiat">M.A Islamiat</option>
    <option value="B.A Arts">B.A Arts</option>
    <option value="M.A Arts">M.A Arts</option>
    <option value="B.Ed">B.Ed</option>
    <option value="B.A English">B.A English</option>
    <option value="M.A English">M.A English</option>
    <option value="B.Sc Mathematics">B.Sc Mathematics</option>
    <option value="M.Sc Mathematics">M.Sc Mathematics</option>
    <option value="B.Sc Physics">B.Sc Physics</option>
    <option value="M.Sc Physics">M.Sc Physics</option>
    <option value="B.Sc Chemistry">B.Sc Chemistry</option>
    <option value="M.Sc Chemistry">M.Sc Chemistry</option>
    <option value="B.Sc Biology">B.Sc Biology</option>
    <option value="M.Sc Biology">M.Sc Biology</option>
    <option value="B.A History">B.A History</option>
    <option value="M.A History">M.A History</option>
    <option value="B.A Geography">B.A Geography</option>
    <option value="M.A Geography">M.A Geography</option>
    <option value="B.Sc Computer Science">B.Sc Computer Science</option>
    <option value="B.A Art and Craft">B.A Art and Craft</option>
    <option value="M.A Art and Craft">M.A Art and Craft</option>
    <option value="B.A Drawing">B.A Drawing</option>
    <option value="M.A Drawing">M.A Drawing</option>
  </select>
        </div>
        <div className="input-container">
          <label>Institution:</label>
          <input
            type="text"
            name="Institution"
            value={Institution}
            onChange={(e) => setInstitution(e.target.value)}
            required
            className="input"
          />
        </div>
        <div className="input-container">
          <label>Degree Completion Date:</label>
          <input
            type="date"
            name="DateCompleted"
            value={DateCompleted}
            onChange={(e) => setDateCompleted(e.target.value)}
            required
            className="input"
          />
        </div>

        <button type="submit" className="button">
          Save Faculty
        </button>
      </form>

      <Popup
        position="right center"
        open={isOpen}
        closeOnDocumentClick={false}
        className="custom-popup"
        onClose={() => setIsOpen(false)}
      >
        <div className="popup-content">
          <h2>ID: {TeacherID}</h2>
          <h3>Password: {TeacherPassword}</h3>
          <p>Successfully Registered!</p>
          <button onClick={() => setIsOpen(false)}>Close</button>
        </div>
      </Popup>
    </div>
  );
  
  
};

export default AddFaculty;

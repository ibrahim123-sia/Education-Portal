import React, { useEffect, useState } from "react";
import "./ViewStudentRecord.css";
import axios from "axios";

const ViewStudentRecord = () => {
  const [StudentID, setStudentID] = useState("");
  const [RecordType, setRecordType] = useState("");
  const [AllStudentRecord, setAllStudentRecord] = useState([]);
  const [AllFeeRecord, setAllFeeRecord] = useState([]);
  const [FilteredRecord, setFilteredRecord] = useState(null);

  useEffect(() => {
    const fetchStudentRecord = async () => {
      try {
        const response = await axios.get("http://localhost:5000/GetStudentRecord");
        const StudentData = response.data.students || [];
        const FeeData = response.data.fee || [];
        setAllStudentRecord(StudentData);
        setAllFeeRecord(FeeData);
      } catch (error) {
        console.error("Error fetching student records:", error);
      }
    };

    fetchStudentRecord();
  }, []);

  const handleSearch = () => {
    if (StudentID && RecordType) {
      if (RecordType === "student") {
        // Fetch Student Record
        const student = AllStudentRecord.find((s) => s.StudentID === StudentID);
        if (student) {
          setFilteredRecord({ ...student, type: "Student" });
        } else {
          alert("Student record not found!");
          setFilteredRecord(null);
        }
      } else if (RecordType === "fee") {
        // Fetch Fee Record
        const fee = AllFeeRecord.find((f) => f.StudentID === StudentID);
        if (fee) {
          setFilteredRecord({ ...fee, type: "Fee" });
        } else {
          alert("Fee record not found!");
          setFilteredRecord(null);
        }
      } else {
        alert("Invalid record type selected!");
      }
      setStudentID("");
      setRecordType("");
    } else {
      alert("Please fill in both fields before searching.");
    }
  };

  return (
    <div className="Smain">
    <div className="main-container">
      <div className="search-section">
        <h1>Search Student Records</h1>
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter Student ID"
            value={StudentID}
            onChange={(e) => setStudentID(e.target.value)}
          />
          <select
            value={RecordType}
            onChange={(e) => setRecordType(e.target.value)}
          >
            <option value="">Select Record Type</option>
            <option value="student">Student Record</option>
            <option value="fee">Fee Record</option>
          </select>
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>

      <div className="result-section">
        {FilteredRecord ? (
          FilteredRecord.type === "Student" ? (
            <div className="student-card">
              <img
                src={FilteredRecord.StudentPhoto}
                alt="Student"
                className="student-photo"
              />
              <div className="student-details">
                <h2>
                  {FilteredRecord.FirstName} {FilteredRecord.LastName}
                </h2>
                <p>Age: {FilteredRecord.Age}</p>
                <p>Email: {FilteredRecord.Email}</p>
                <p>Gender: {FilteredRecord.Gender}</p>
                <p>Date of Birth: {FilteredRecord.DOB}</p>
                <p>Phone: {FilteredRecord.Phone}</p>
              </div>
            </div>
          ) : (
            <div className="fee-card">
              <h2>Fee Record</h2>
              <p>Total Fee: {FilteredRecord.TotalFee}</p>
              <p>Paid Amount: {FilteredRecord.PaidAmount}</p>
              <p>Remaining Balance: {FilteredRecord.RemainingBalance}</p>
              <p>Payment Date: {FilteredRecord.PaymentDate}</p>
              <p>Payment Status: {FilteredRecord.PaymentStatus}</p>
            </div>
          )
        ) : (
          <p className="no-data">No data to display. Use the search bar to find a record.</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default ViewStudentRecord;

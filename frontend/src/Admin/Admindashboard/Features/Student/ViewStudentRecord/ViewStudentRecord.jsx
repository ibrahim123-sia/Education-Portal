import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewStudentRecord.css";

const ViewStudentRecord = () => {
  const [StudentID, setStudentID] = useState("");
  const [RecordType, setRecordType] = useState("");
  const [AllStudentRecord, setAllStudentRecord] = useState([]);
  const [AllFeeRecord, setAllFeeRecord] = useState([]);
  const [FilteredRecord, setFilteredRecord] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editableRecord, setEditableRecord] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);  

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
      let record;
      if (RecordType === "student") {
        record = AllStudentRecord.find((s) => s.StudentID === StudentID);
      } else if (RecordType === "fee") {
        record = AllFeeRecord.find((f) => f.StudentID === StudentID);
      }

      if (record) {
        setFilteredRecord({ ...record, type: RecordType });
        setEditableRecord({ ...record });
      } else {
        alert(`${RecordType === "student" ? "Student" : "Fee"} record not found!`);
        setFilteredRecord(null);
      }
      setHasSearched(true); 
      setStudentID("");
      setRecordType("");
    } else {
      alert("Please fill in both fields before searching.");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setEditableRecord({ ...FilteredRecord });
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      const response = await axios.post("http://localhost:5000/UpdateRecord", {
        recordType: FilteredRecord.type.toLowerCase(),
        StudentID: editableRecord.StudentID,
        FirstName: editableRecord.FirstName,
        LastName: editableRecord.LastName,
        Age: editableRecord.Age,
        Email: editableRecord.Email,
        Gender: editableRecord.Gender,
        TotalFee: editableRecord.TotalFee,
        PaidAmount: editableRecord.PaidAmount,
        RemainingBalance: editableRecord.RemainingBalance,
        PaymentDate: editableRecord.PaymentDate,
        PaymentStatus: editableRecord.PaymentStatus,
      });

      if (response.status === 200) {
        alert("Record updated successfully!");
        setFilteredRecord({ ...editableRecord });
        setIsEditing(false);
      } else {
        alert("Failed to update record. Please try again.");
      }
    } catch (error) {
      console.error("Error in handleSave:", error);
      alert("Failed to update record. Check your connection or input.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableRecord({ ...editableRecord, [name]: value });
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
            <button onClick={handleSearch} disabled={isEditing}>
              Search
            </button>
          </div>
        </div>

        <div className="result-section">
          {hasSearched && !FilteredRecord ? (
            <p>No record found. Please search for a student.</p>
          ) : (
            FilteredRecord && (
              <div className="record-card">
                {FilteredRecord.type === "student" ? (
                  <div className="record-details">
                    <h4>{FilteredRecord.StudentID}</h4>
                    <label>First Name:</label>
                    <input
                      type="text"
                      name="FirstName"
                      value={editableRecord.FirstName}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                    <label>Last Name:</label>
                    <input
                      type="text"
                      name="LastName"
                      value={editableRecord.LastName}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                    <label>Age:</label>
                    <input
                      type="number"
                      name="Age"
                      value={editableRecord.Age}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />

                    <label>Email:</label>
                    <input
                      type="email"
                      name="Email"
                      value={editableRecord.Email}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                    <label>Gender:</label>
                    <input
                      type="text"
                      name="Gender"
                      value={editableRecord.Gender}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                ) : (
                  <div className="record-details">
                    <h4>{FilteredRecord.StudentID}</h4>
                    <label>Total Fee:</label>
                    <input
                      type="number"
                      name="TotalFee"
                      value={editableRecord.TotalFee}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                    <label>Paid Amount:</label>
                    <input
                      type="number"
                      name="PaidAmount"
                      value={editableRecord.PaidAmount}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                    <label>Remaining Balance:</label>
                    <input
                      type="number"
                      name="RemainingBalance"
                      value={editableRecord.RemainingBalance}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                    <label>Payment Date:</label>
                    <input
                      type="text"
                      name="PaymentDate"
                      value={editableRecord.PaymentDate}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                    <label>Payment Status:</label>
                    <input
                      type="text"
                      name="PaymentStatus"
                      value={editableRecord.PaymentStatus}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                )}

                {isEditing ? (
                  <>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </>
                ) : (
                  <button onClick={handleEdit}>Edit</button>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewStudentRecord;

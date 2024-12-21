import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewFacultyRecord.css";

const ViewFacultyRecord = () => {
  const [TeacherID, setTeacherID] = useState("");
  const [RecordType, setRecordType] = useState("");
  const [AllTeacherRecord, setAllTeacherRecord] = useState([]);
  const [AllQualificationRecord, setAllQualificationRecord] = useState([]);
  const [FilteredRecord, setFilteredRecord] = useState(null);
  const [editableRecord, setEditableRecord] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const fetchTeacherRecord = async () => {
      try {
        const response = await axios.get("http://localhost:5000/GetTeacherRecord");
        const TeacherData = response.data.Teachers || [];
        const QualificationData = response.data.Qualifications || [];
        setAllTeacherRecord(TeacherData);
        setAllQualificationRecord(QualificationData);
      } catch (error) {
        console.error("Error fetching teacher records:", error);
      }
    };

    fetchTeacherRecord();
  }, []);

  const handleSearch = () => {
    if (TeacherID && RecordType) {
      let record;
      if (RecordType === "teacher") {
        record = AllTeacherRecord.find((t) => t.TeacherID === TeacherID);
      } else if (RecordType === "qualification") {
        record = AllQualificationRecord.find((q) => q.TeacherID === TeacherID);
      }

      if (record) {
        setFilteredRecord({ ...record, type: RecordType });
        setEditableRecord({ ...record });
      } else {
        alert(`${RecordType === "teacher" ? "Teacher" : "Qualification"} record not found!`);
        setFilteredRecord(null);
      }

      setHasSearched(true);
      setTeacherID("");
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
      const response = await axios.post("http://localhost:5000/UpdateTeacherRecord", {
        recordType: FilteredRecord.type.toLowerCase(),
        ...editableRecord,
      });

      if (response.status === 200) {
        alert("Record updated successfully!");
        setFilteredRecord({ ...editableRecord });
        setIsEditing(false);
      } else {
        alert("Failed to update the record. Please try again.");
      }
    } catch (error) {
      console.error("Error in handleSave:", error);
      alert("Failed to update the record. Check your connection or input.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableRecord({ ...editableRecord, [name]: value });
  };

  return (
    <div className="Fmain">
      <div className="FRmain-container">
        <div className="FRsearch-section">
          <h1>Search Teacher Records</h1>
          <div className="FRinput-group">
            <input
              type="text"
              placeholder="Enter Teacher ID"
              value={TeacherID}
              onChange={(e) => setTeacherID(e.target.value)}
            />
            <select
              value={RecordType}
              onChange={(e) => setRecordType(e.target.value)}
            >
              <option value="">Select Record Type</option>
              <option value="teacher">Teacher Record</option>
              <option value="qualification">Qualification Record</option>
            </select>
            <button onClick={handleSearch} disabled={isEditing}>
              Search
            </button>
          </div>
        </div>

        <div className="FRresult-section">
          {hasSearched && !FilteredRecord ? (
            <p>No record found. Please search for a teacher.</p>
          ) : (
            FilteredRecord && (
              <div className="FRrecord-card">
                {FilteredRecord.type === "teacher" ? (
                  <div className="FRrecord-details">
                    <h4>{FilteredRecord.TeacherID}</h4>
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
                    <label>Gender:</label>
                    <input
                      type="text"
                      name="Gender"
                      value={editableRecord.Gender}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                    <label>Date of Birth:</label>
                    <input
                      type="text"
                      name="DOB"
                      value={editableRecord.DOB}
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
                    <label>Phone:</label>
                    <input
                      type="text"
                      name="PhoneNumber"
                      value={editableRecord.PhoneNumber}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                    <label>CNIC:</label>
                    <input
                      type="text"
                      name="CNIC"
                      value={editableRecord.CNIC}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                ) : (
                  <div className="FRrecord-details">
                    <h4>{FilteredRecord.TeacherID}</h4>
                    <label>Degree:</label>
                    <input
                      type="text"
                      name="Degree"
                      value={editableRecord.Degree}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                    <label>Institution:</label>
                    <input
                      type="text"
                      name="Institution"
                      value={editableRecord.Institution}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                    <label>Date Completed:</label>
                    <input
                      type="text"
                      name="DateCompleted"
                      value={editableRecord.DateCompleted}
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

export default ViewFacultyRecord;

import './ClassAttendance.css';
import React, { useEffect, useState } from "react";
import axios from "axios";

const ClassAttendance = () => {
  const [students, setStudents] = useState([]); 
  const [attendanceRecords, setAttendanceRecords] = useState({}); 
  const [selectedAttendanceDate, setSelectedAttendanceDate] = useState(""); 

  
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/GetStudentRecord");
        const studentData = response.data.Students || [];
        setStudents(studentData);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    fetchStudents();
  }, []);

 
  const handleAttendanceStatusChange = (studentID, attendanceStatus) => {
    const updatedAttendanceRecords = { ...attendanceRecords };
    updatedAttendanceRecords[studentID] = { status: attendanceStatus };
    setAttendanceRecords(updatedAttendanceRecords);
  };


  const handleSaveAttendance = async (studentID) => {
    const attendanceRecord = attendanceRecords[studentID];

    if (!selectedAttendanceDate || !attendanceRecord?.status) {
      alert("Please select a date and status.");
      return;
    }

    try {
      const student = students.find((s) => s.StudentID === studentID);

      if (!student) {
        alert("Student not found.");
        return;
      }

      const payload = {
        StudentID: studentID,
        FullName: `${student.FirstName} ${student.LastName}`,
        AttendanceDate: selectedAttendanceDate,
        Status: attendanceRecord.status,
      };

      await axios.post("http://localhost:5000/SaveStudentAttendance", payload);
      alert("Attendance saved successfully!");

      
      const response = await axios.get("http://localhost:5000/GetStudentRecord");
      const updatedStudents = response.data.Students || [];
      setStudents(updatedStudents);

    } catch (error) {
      console.error("Error saving attendance:", error);
      alert("Already saved or error occurred.");
    }
  };

  return (
    <div className="CA-container">
      <h1 className="CA-title">Student Attendance</h1>

      <div className="CA-date-container">
        <label className="CA-date-label">
          Select Date:{" "}
          <input
            className="CA-date-input"
            type="date"
            value={selectedAttendanceDate}
            onChange={(e) => setSelectedAttendanceDate(e.target.value)}
          />
        </label>
      </div>

      <table className="CA-table">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Previous Total Absent</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.StudentID}>
              <td>{student.StudentID}</td>
              <td>{student.FirstName + " " + student.LastName}</td>
              <td>{student.PreviousAbsent || 0}</td>
              <td>
                <select
                  className="CA-status-select"
                  value={attendanceRecords[student.StudentID]?.status || ""}
                  onChange={(e) =>
                    handleAttendanceStatusChange(student.StudentID, e.target.value)
                  }
                >
                  <option value="">Select</option>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
              </td>
              <td>
                <button
                  className="CA-save-button"
                  onClick={() => handleSaveAttendance(student.StudentID)}
                >
                  Save
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassAttendance;

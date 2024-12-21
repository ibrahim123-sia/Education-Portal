import './MarkAttendences.css';
import React, { useEffect, useState } from "react";
import axios from "axios";

const MarkAttendances = () => {
  const [teachers, setTeachers] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState({});
  const [selectedAttendanceDate, setSelectedAttendanceDate] = useState("");

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/GetTeacherRecord");
        const teacherData = response.data.Teachers || [];
        setTeachers(teacherData);
      } catch (error) {
        console.error("Error fetching teacher data:", error);
      }
    };
    fetchTeachers();
  }, []);

  const handleAttendanceStatusChange = (teacherID, attendanceStatus) => {
    const updatedAttendanceRecords = { ...attendanceRecords };
    const updatedTeacherRecord = updatedAttendanceRecords[teacherID] || {};
    updatedTeacherRecord.status = attendanceStatus;

    updatedAttendanceRecords[teacherID] = updatedTeacherRecord;
    setAttendanceRecords(updatedAttendanceRecords);
  };

  const handleSaveAttendance = async (teacherID) => {
    const attendanceRecord = attendanceRecords[teacherID];

    if (!selectedAttendanceDate || !attendanceRecord || !attendanceRecord.status) {
      alert("Please select a date and status.");
      return;
    }

    
    const isAlreadyPresent = teachers.some(
      (teacher) =>
        teacher.TeacherID !== teacherID &&
        attendanceRecords[teacher.TeacherID]?.status === "Present" &&
        selectedAttendanceDate === selectedAttendanceDate
    );

    if (isAlreadyPresent) {
      alert("Attendance already marked as 'Present' for this date.");
      return;
    }

    try {
      
      const teacher = teachers.find((t) => t.TeacherID === teacherID);

      if (!teacher) {
        alert("Teacher not found.");
        return;
      }

      const payload = {
        TeacherID: teacherID,
        FirstName: teacher.FirstName,
        LastName:teacher.LastName,
        AttendanceDate: selectedAttendanceDate,
        Status: attendanceRecord.status,
      };

      await axios.post("http://localhost:5000/SaveAttendance", payload);
      alert("Attendance saved successfully!");

     
      const response = await axios.get("http://localhost:5000/GetTeacherRecord");
      const updatedTeachers = response.data.Teachers || [];
      setTeachers(updatedTeachers); 

    } catch (error) {
      console.error("Error saving attendance:", error);
      alert("Already saved or error occurred.");
    }
  };

  return (
  <div className="Tamain">
    <div className="TA-container">
      <h1 className="TA-title">Teacher Attendance</h1>

      <div className="TA-date-container">
        <label className="TA-date-label">
          Select Date:{" "}
          <input
            className="TA-date-input"
            type="date"
            value={selectedAttendanceDate}
            onChange={(e) => setSelectedAttendanceDate(e.target.value)}
          />
        </label>
      </div>

      <table className="TA-table">
        <thead>
          <tr>
            <th>Teacher ID</th>
            <th>Name</th>
            <th>Previous Total Absent</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.TeacherID}>
              <td>{teacher.TeacherID}</td>
              <td>{teacher.FirstName + " " + teacher.LastName}</td>
              <td>{teacher.PreviousAbsent || 0}</td> 
              <td>
                <select
                  className="TA-status-select"
                  value={attendanceRecords[teacher.TeacherID]?.status || ""}
                  onChange={(e) =>
                    handleAttendanceStatusChange(teacher.TeacherID, e.target.value)
                  }
                >
                  <option value="">Select</option>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
              </td>
              <td>
                <button
                  className="TA-save-button"
                  onClick={() => handleSaveAttendance(teacher.TeacherID)}
                >
                  Save
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default MarkAttendances;

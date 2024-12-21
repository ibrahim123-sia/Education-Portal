import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ClassAttendance.css";

const ClassAttendance = () => {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState({});
  const [selectedClassId, setSelectedClassId] = useState("");
  const [selectedSubjectName, setSelectedSubjectName] = useState("");
  const [selectedAttendanceDate, setSelectedAttendanceDate] = useState("");

  const teacherId = localStorage.getItem("teacherId");

  useEffect(() => {
    if (teacherId) {
      fetchTeacherClasses();
    } else {
      alert("Teacher not logged in.");
    }
  }, [teacherId]);

  const fetchTeacherClasses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/GetTeacherClasses", {
        params: { TeacherID: teacherId },
      });
      setClasses(response.data || []);
    } catch (error) {
      console.error("Error fetching teacher's classes:", error);
    }
  };

  useEffect(() => {
    const fetchStudents = async () => {
      if (!selectedClassId) return;
      try {
        const response = await axios.get("http://localhost:5000/GetStudentsByClass", {
          params: { ClassID: selectedClassId },
        });
        setStudents(response.data.Students || []);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, [selectedClassId]);

  const handleAttendanceStatusChange = (studentID, attendanceStatus) => {
    setAttendanceRecords((prevRecords) => ({
      ...prevRecords,
      [studentID]: { status: attendanceStatus },
    }));
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
        SubjectName: selectedSubjectName,
        AttendanceDate: selectedAttendanceDate,
        Status: attendanceRecord.status,
      };
  
      await axios.post("http://localhost:5000/SaveStudentAttendance", payload);
      alert("Attendance saved successfully!");
  
      
      setSelectedClassId("");
      setSelectedSubjectName("");
      setSelectedAttendanceDate("");
      setAttendanceRecords({});
      setStudents([]); 
    } catch (error) {
      console.error("Error saving attendance:", error);
      alert("Already saved or error occurred.");
    }
  };
  

  return (
    <div className="CAmain">
    <div className="CA-container">
      <h1 className="CA-title">Student Attendance</h1>

      <div className="CA-controls">
        <label className="CA-select-label">
          Select Class ID:
          <select
            className="CA-select-input"
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
          >
            <option value="">Select Class ID</option>
            {classes.map((cls) => (
              <option key={cls.SCID} value={cls.ClassID}>
                {cls.ClassID}
              </option>
            ))}
          </select>
        </label>

        <label className="CA-select-label">
          Select Subject:
          <select
            className="CA-select-input"
            value={selectedSubjectName}
            onChange={(e) => setSelectedSubjectName(e.target.value)}
          >
            <option value="">Select Subject</option>
            {classes.map((cls) => (
              <option key={cls.SCID} value={cls.SubjectName}>
                {cls.SubjectName}
              </option>
            ))}
          </select>
        </label>

        <label className="CA-date-label">
          Select Date:
          <input
            className="CA-date-input"
            type="date"
            value={selectedAttendanceDate}
            onChange={(e) => setSelectedAttendanceDate(e.target.value)}
          />
        </label>
      </div>

      {students.length > 0 ? (
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
      ) : (
        <p className="CA-no-students">No students found for the selected class.</p>
      )}
    </div>
    </div>
  );
};

export default ClassAttendance;

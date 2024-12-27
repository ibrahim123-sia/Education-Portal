import React, { useEffect, useState } from "react";
import "./ViewAttendance.css";
import axios from "axios";

const ViewAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [studentsData, setStudentsData] = useState([]);
  const studentId = localStorage.getItem("studentId");

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        if (studentId) {
          const response = await axios.get("http://localhost:5000/GetStudentRecord", {
            params: { studentId },
          });

          const { Students, CA } = response.data;
          setStudentsData(Students);

          
          const filteredAttendance = CA.filter(
            (record) => normalizeString(record.StudentID) === normalizeString(studentId)
          );
          setAttendanceData(filteredAttendance);
        }
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };

    fetchAttendanceData();
  }, [studentId]);

  const normalizeString = (str) => str?.trim().toLowerCase() || "";
  
  const getStudentName = (studentId) => {
    const student = studentsData.find((s) => s.StudentID === studentId);
    return student ? `${student.FirstName} ${student.LastName}` : "Unknown";
  };

  return (
    <div className="VA">
      <div className="view-attendance">
        <h1>Attendance for Today</h1>
        {attendanceData.length > 0 ? (
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>Course</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((record, index) => (
                <tr key={index}>
                  <td>{record.StudentID}</td>
                  <td>{getStudentName(record.StudentID)}</td>
                  <td>{record.SubjectName}</td>
                  <td>{record.AttendanceDate}</td>
                  <td>{record.Status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No attendance records available for today.</p>
        )}
      </div>
    </div>
  );
};

export default ViewAttendance;

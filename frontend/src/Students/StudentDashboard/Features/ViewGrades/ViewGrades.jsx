import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewGrades.css";

const ViewGrades = () => {
  const [gradesData, setGradesData] = useState({});
  const studentId = localStorage.getItem("studentId");

  useEffect(() => {
    const fetchGradesData = async () => {
      if (studentId) {
        try {
          const response = await axios.get("http://localhost:5000/GetGrades", {
            params: { studentId },
          });

          console.log("API Response:", response.data); // Debug API response

          // Grouping the data by SubjectName
          const groupedData = response.data.reduce((acc, record) => {
            const subjectName = record.SubjectName || "Unknown Subject";
            if (!acc[subjectName]) {
              acc[subjectName] = [];
            }
            acc[subjectName].push(record);
            return acc;
          }, {});

          console.log("Grouped Data:", groupedData); // Debug grouped data
          setGradesData(groupedData);
        } catch (error) {
          console.error("Error fetching grades data:", error);
        }
      } else {
        console.log("Student not logged in");
      }
    };

    fetchGradesData();
  }, [studentId]);

  return (
    <div className="VG">
      <div className="view-grades">
        <h1>Grades</h1>
        {Object.keys(gradesData).length > 0 ? (
          Object.keys(gradesData).map((subjectName) => (
            <div key={subjectName} className="subject-section">
              <h2>{`Subject: ${subjectName}`}</h2>
              <table className="grades-table">
                <thead>
                  <tr>
                    <th>Assignment Type</th>
                    <th>Assignment Name</th>
                    <th>Obtained Marks</th>
                    <th>Total Marks</th>
                  </tr>
                </thead>
                <tbody>
                  {gradesData[subjectName].map((record, index) => (
                    <tr key={index}>
                      <td>{record.AssignmentType}</td>
                      <td>{record.AssignmentName}</td>
                      <td>{record.ObtainedMarks}</td>
                      <td>{record.TotalMarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))
        ) : (
          <p>No grades available.</p>
        )}
      </div>
    </div>
  );
};

export default ViewGrades;

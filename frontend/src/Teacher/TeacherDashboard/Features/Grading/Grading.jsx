import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Grading.css";

const Grading = () => {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState({});
  const [selectedClassId, setSelectedClassId] = useState("");
  const [selectedSubjectName, setSelectedSubjectName] = useState("");

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

  const handleGradeChange = (studentID, field, value) => {
    setGrades((prevGrades) => ({
      ...prevGrades,
      [studentID]: {
        ...prevGrades[studentID],
        [field]: value,
      },
    }));
  };

  const handleSaveGrade = async (studentID) => {
    const gradeRecord = grades[studentID];
  
    if (!selectedSubjectName || !gradeRecord?.AssignmentName || !gradeRecord?.AssignmentType || !gradeRecord?.ObtainedMarks || !gradeRecord?.TotalMarks) {
      alert("Please fill all fields before saving.");
      return;
    }
  
    const payload = {
      StudentID: studentID,
      ClassID: selectedClassId,
      SubjectName: selectedSubjectName,
      AssignmentName: gradeRecord.AssignmentName,
      AssignmentType: gradeRecord.AssignmentType,
      ObtainedMarks: gradeRecord.ObtainedMarks,
      TotalMarks: gradeRecord.TotalMarks,
    };
  
    console.log("Payload to send:", payload);  // Log the payload for debugging
  
    try {
      const response = await axios.post("http://localhost:5000/SaveStudentGrade", payload);
      console.log("Response from server:", response.data);  // Log the server's response
      alert("Grade saved successfully!");
    } catch (error) {
      console.error("Error saving grade:", error);
      alert("Error occurred while saving grade.");
    }
  };
  

  return (
    <div className="CG">
      <div className="Grading-container">
        <h1 className="Grading-title">Student Grading</h1>

        <div className="Grading-controls">
          <label className="Grading-select-label">
            Select Class ID:
            <select
              className="Grading-select-input"
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
            >
              <option value="">Select Class ID</option>
              {classes.map((cls) => (
                <option key={cls.ClassID} value={cls.ClassID}>
                  {cls.ClassID}
                </option>
              ))}
            </select>
          </label>

          <label className="Grading-select-label">
            Select Subject:
            <select
              className="Grading-select-input"
              value={selectedSubjectName}
              onChange={(e) => setSelectedSubjectName(e.target.value)}
            >
              <option value="">Select Subject</option>
              {classes.map((cls) => (
                <option key={cls.SubjectName} value={cls.SubjectName}>
                  {cls.SubjectName}
                </option>
              ))}
            </select>
          </label>
        </div>

        {students.length > 0 ? (
          <table className="Grading-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Assignment Title</th>
                <th>Assignment Type</th>
                <th>Obtained Marks</th>
                <th>Total Marks</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.StudentID}>
                  <td>{student.StudentID}</td>
                  <td>{student.FirstName + " " + student.LastName}</td>
                  <td>
                    <input
                      type="text"
                      className="Grading-input"
                      placeholder="e,g A1,A2"
                      value={grades[student.StudentID]?.AssignmentName || ""}
                      onChange={(e) =>
                        handleGradeChange(student.StudentID, "AssignmentName", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <select
                      className="Grading-select-assignment"
                      value={grades[student.StudentID]?.AssignmentType || ""}
                      onChange={(e) =>
                        handleGradeChange(student.StudentID, "AssignmentType", e.target.value)
                      }
                    >
                      <option value="">Select</option>
                      <option value="quiz">Quiz</option>
                      <option value="assignment">Assignment</option>
                      <option value="mid-term">Mid-term</option>
                      <option value="final">Final</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="number"
                      className="Grading-input"
                      value={grades[student.StudentID]?.ObtainedMarks || ""}
                      onChange={(e) =>
                        handleGradeChange(student.StudentID, "ObtainedMarks", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="Grading-input"
                      value={grades[student.StudentID]?.TotalMarks || ""}
                      onChange={(e) =>
                        handleGradeChange(student.StudentID, "TotalMarks", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <button
                      className="Grading-save-button"
                      onClick={() => handleSaveGrade(student.StudentID)}
                    >
                      Save
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="Grading-no-students">No students found for the selected class.</p>
        )}
      </div>
    </div>
  );
};

export default Grading;

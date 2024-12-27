import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SubmitAssignment.css";

const SubmitAssignment = () => {
  const [pendingAssignments, setPendingAssignments] = useState([]);
  const [submittedAssignments, setSubmittedAssignments] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const studentId = localStorage.getItem("studentId");

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/GetAssignments/${studentId}`);
        setPendingAssignments(response.data.pendingAssignments);
        setSubmittedAssignments(response.data.submittedAssignments);
      } catch (error) {
        setErrorMessage("Failed to fetch assignments.");
      }
    };

    fetchAssignments();
  }, [studentId]);

  const handleSubmit = async (assignmentId, title, filePath) => {
    try {
      const response = await axios.post("http://localhost:5000/SaveSubmission", {
        assignmentID: assignmentId,
        studentID: studentId,
        filePath,
        title,
      });

      if (response.status === 200) {
        setSuccessMessage("Assignment submitted successfully!");
        setPendingAssignments((prev) =>
          prev.filter((assignment) => assignment.AssignmentID !== assignmentId)
        );

        setSubmittedAssignments((prev) => [
          ...prev,
          {
            AssignmentID: assignmentId,
            Title: title,
            Description: "",
            SubjectName: "",
            DueDate: new Date().toISOString().split("T")[0], 
            FileLink: filePath,
            SubmittedDate: new Date().toISOString().split("T")[0],
          },
        ]);
      }
    } catch (error) {
      setErrorMessage("Failed to submit the assignment. Please try again.");
    }
  };

  return (
    <div className="SA">
      <div className="SubmitAssignment">
        <h2>Submit Assignment</h2>

        <h3>Pending Assignments</h3>
        {pendingAssignments.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Subject</th>
                <th>Due Date</th>
                <th>File Link</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingAssignments.map((assignment) => (
                <tr key={assignment.AssignmentID}>
                  <td>{assignment.Title}</td>
                  <td>{assignment.Description}</td>
                  <td>{assignment.SubjectName}</td>
                  <td>{assignment.DueDate}</td>
                  <td>
                    <input
                      type="url"
                      placeholder="Enter file link"
                      onChange={(e) =>
                        setPendingAssignments((prev) =>
                          prev.map((a) =>
                            a.AssignmentID === assignment.AssignmentID
                              ? { ...a, filePath: e.target.value }
                              : a
                          )
                        )
                      }
                    />
                  </td>
                  <td>
                    <button
                      className="submit-btn"
                      onClick={() =>
                        handleSubmit(
                          assignment.AssignmentID,
                          assignment.Title,
                          assignment.filePath
                        )
                      }
                    >
                      Submit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No pending assignments to submit.</p>
        )}

        <h3>Submitted Assignments</h3>
        {submittedAssignments.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Subject</th>
                <th>Due Date</th>
                <th>File Link</th>
                <th>Submitted Date</th>
              </tr>
            </thead>
            <tbody>
              {submittedAssignments.map((assignment) => (
                <tr key={assignment.AssignmentID}>
                  <td>{assignment.Title}</td>
                  <td>{assignment.Description}</td>
                  <td>{assignment.SubjectName}</td>
                  <td>{assignment.DueDate}</td>
                  <td>
                    <a href={assignment.FileLink} target="_blank" rel="noopener noreferrer">
                      View File
                    </a>
                  </td>
                  <td>{assignment.SubmittedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No submitted assignments yet.</p>
        )}
      </div>

      {successMessage && (
        <div className="popup">
          <div className="popup-content">
            <h3>Success</h3>
            <p>{successMessage}</p>
            <button onClick={() => setSuccessMessage("")}>Close</button>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="popup">
          <div className="popup-content">
            <h3>Error</h3>
            <p>{errorMessage}</p>
            <button onClick={() => setErrorMessage("")}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmitAssignment;

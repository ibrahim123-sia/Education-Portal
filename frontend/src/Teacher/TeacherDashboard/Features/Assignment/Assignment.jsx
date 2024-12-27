import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Assignment.css";

const Assignment = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
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
      if (response.status === 200) {
        setClasses(response.data || []);
      } else {
        console.error("Unexpected response status:", response.status);
        alert("Failed to load classes. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching teacher's classes:", error.message);
      alert("Failed to fetch classes. Please check your server connection.");
    }
  };
  
  const handleSaveAssignment = async () => {
    if (!selectedClass || !selectedSubject || !title.trim() || !description.trim()) {
      alert("Please fill out all fields.");
      return;
    }
  
    const payload = {
      ClassID: selectedClass,
      SubjectName: selectedSubject, 
      Title: title,
      Description: description,
      TeacherID: teacherId,
      DueDate: new Date().toISOString(),
    };
  
    try {
      const response = await axios.post("http://localhost:5000/SaveAssignment", payload);
      if (response.status === 201) {
        alert("Assignment created successfully!");
        setSelectedClass("");
        setSelectedSubject("");
        setTitle("");
        setDescription("");
      } else {
        console.error("Unexpected response status:", response.status);
        alert("Failed to create assignment. Please try again.");
      }
    } catch (error) {
      console.error("Error saving assignment:", error.message);
      alert("Server error. Please try again later.");
    }
  };
  
  

  return (
    <div className="AS">
    <div className="assignment-container">
      <h1 className="assignment-title">Create Assignment</h1>

      <div className="form-group">
        <label htmlFor="class-select">Select Class:</label>
        <select
          id="class-select"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="">-- Select Class --</option>
          {classes.map((classItem) => (
            <option key={classItem.ClassID} value={classItem.ClassID}>
              {classItem.ClassID}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="subject-select">Select Subject:</label>
        <select
          id="subject-select"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          <option value="">-- Select Subject --</option>
          {classes.map(
            (classItem) =>
              classItem.ClassID === selectedClass && (
                <option key={classItem.SubjectName} value={classItem.SubjectName}>
                  {classItem.SubjectName}
                </option>
              )
          )}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="title-input">Title:</label>
        <input
          type="text"
          id="title-input"
          placeholder="e.g., Assignment 1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description-input">Description:</label>
        <textarea
          id="description-input"
          rows="5"
          placeholder="Write the assignment description here..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      <button className="save-button" onClick={handleSaveAssignment}>
        Save Assignment
      </button>
    </div>
    </div>
  );
};

export default Assignment;

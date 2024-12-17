import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Assignment.css";

const Assignment = () => {
  const [classes, setClasses] = useState([]); // To store the classes belonging to the teacher
  const [selectedClass, setSelectedClass] = useState(""); // To store the selected class
  const [title, setTitle] = useState(""); // Title of the assignment
  const [description, setDescription] = useState(""); // Assignment description

  // Fetch classes belonging to the logged-in teacher
  useEffect(() => {
    const fetchTeacherClasses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/GetTeacherClasses");
        const classData = response.data.Classes || [];
        setClasses(classData);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchTeacherClasses();
  }, []);

  // Submit the assignment
  const handleSaveAssignment = async () => {
    if (!selectedClass || !title.trim() || !description.trim()) {
      alert("Please fill out all fields.");
      return;
    }

    const payload = {
      ClassID: selectedClass,
      Title: title,
      Description: description,
      DueDate: new Date().toISOString().split("T")[0], // Default due date: Today
    };

    try {
      await axios.post("http://localhost:5000/SaveAssignment", payload);
      alert("Assignment created successfully!");
      setSelectedClass("");
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error saving assignment:", error);
      alert("Failed to create assignment.");
    }
  };

  return (
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
              {classItem.ClassName}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="title-input">Title:</label>
        <input
          type="text"
          id="title-input"
          placeholder="e.g., Assignment 1 or Quiz 1"
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
  );
};

export default Assignment;

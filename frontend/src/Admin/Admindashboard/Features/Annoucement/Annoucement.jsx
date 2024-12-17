import React, { useState } from 'react';
import './Annoucement.css';
import axios from 'axios';

const Annoucement = () => {
  const [Title, setTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [TargetAudience, setTargetAudience] = useState('Students');
  const [StartDate, setStartDate] = useState('');
  const [EndDate, setEndDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const announcementData = await axios.post('http://localhost:5000/Annoucement', {
        Title,
        Description,
        TargetAudience,
        StartDate,
        EndDate,
      });

      if (announcementData.status === 200) {
        alert('Form submitted successfully!');
        setTitle('');
        setDescription('');
        setTargetAudience('');
        setStartDate('');
        setEndDate('');
      } else {
        alert('Failed to submit the form.');
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      alert('An error occurred while submitting the form.');
    }
  };

  return (
    <div className='Annoucement1'>
      <div className="announcement-form-container">
        <h2>Create Announcement</h2>
        <form className="announcement-form" onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              name="Title"
              value={Title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label>
            Description:
            <textarea
              name="Description"
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </label>
          <label>
            Target Audience:
            <select
              name="Darget_audience"
              value={TargetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
            >
              <option value="Students">Students</option>
              <option value="Teachers">Teachers</option>
              <option value="All">All</option>
            </select>
          </label>
          <label>
            Start Date:
            <input
              type="datetime-local"
              name="Start_date"
              value={StartDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </label>
          <label>
            End Date:
            <input
              type="datetime-local"
              name="End_date"
              value={EndDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </label>
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default Annoucement;

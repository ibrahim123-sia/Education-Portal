import React, { useState } from 'react';
import axios from 'axios';
import './ClassSchedule.css';

const ClassSchedule = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [schedule, setSchedule] = useState({});
  const [loading, setLoading] = useState(false);

  const slots = [
    '8:00-8:45',
    '8:45-9:30',
    '9:30-10:15',
    '--Break--',
    '10:45-11:30',
    '11:30-12:15',
    '12:15-1:00',
  ];

  const subjectsData = {
    'KG': [
      { SCID: 'ENG00', SubjectName: 'English' },
      { SCID: 'MATH00', SubjectName: 'Mathematics' },
      { SCID: 'ART00', SubjectName: 'Art & Craft' },
      { SCID: 'GA00', SubjectName: 'General Awareness' },
      { SCID: 'DW01', SubjectName: 'Drawing' },
    ],
    'C1': [
      { SCID: 'ENG01', SubjectName: 'English' },
      { SCID: 'MATH01', SubjectName: 'Mathematics' },
      { SCID: 'SCI01', SubjectName: 'Science' },
      { SCID: 'ISL01', SubjectName: 'Islamiat' },
    ],
    'C2': [
      { SCID: 'ENG02', SubjectName: 'English' },
      { SCID: 'MATH02', SubjectName: 'Mathematics' },
      { SCID: 'SCI02', SubjectName: 'Science' },
      { SCID: 'ISL02', SubjectName: 'Islamiat' },
    ],
    'C3': [
      { SCID: 'ENG03', SubjectName: 'English' },
      { SCID: 'MATH03', SubjectName: 'Mathematics' },
      { SCID: 'SCI03', SubjectName: 'Science' },
      { SCID: 'URD03', SubjectName: 'Urdu' },
      { SCID: 'ISL03', SubjectName: 'Islamiat' },
      { SCID: 'PAK03', SubjectName: 'Pakistan Studies' },
    ],
    'C4': [
      { SCID: 'ENG04', SubjectName: 'English' },
      { SCID: 'MATH04', SubjectName: 'Mathematics' },
      { SCID: 'SCI04', SubjectName: 'Science' },
      { SCID: 'URD04', SubjectName: 'Urdu' },
      { SCID: 'ISL04', SubjectName: 'Islamiat' },
      { SCID: 'PAK04', SubjectName: 'Pakistan Studies' },
    ],
    'C5': [
      { SCID: 'ENG05', SubjectName: 'English' },
      { SCID: 'MATH05', SubjectName: 'Mathematics' },
      { SCID: 'SCI05', SubjectName: 'Science' },
      { SCID: 'URD05', SubjectName: 'Urdu' },
      { SCID: 'ISL05', SubjectName: 'Islamiat' },
      { SCID: 'PAK05', SubjectName: 'Pakistan Studies' },
    ],
    'C6': [
      { SCID: 'ENG06', SubjectName: 'English' },
      { SCID: 'MATH06', SubjectName: 'Mathematics' },
      { SCID: 'SCI06', SubjectName: 'Science' },
      { SCID: 'URD06', SubjectName: 'Urdu' },
      { SCID: 'ISL06', SubjectName: 'Islamiat' },
      { SCID: 'PAK06', SubjectName: 'Pakistan Studies' },
    ],
    'C7': [
      { SCID: 'ENG07', SubjectName: 'English' },
      { SCID: 'MATH07', SubjectName: 'Mathematics' },
      { SCID: 'SCI07', SubjectName: 'Science' },
      { SCID: 'URD07', SubjectName: 'Urdu' },
      { SCID: 'ISL07', SubjectName: 'Islamiat' },
      { SCID: 'PAK07', SubjectName: 'Pakistan Studies' },
    ],
    'C8': [
      { SCID: 'ENG08', SubjectName: 'English' },
      { SCID: 'MATH08', SubjectName: 'Mathematics' },
      { SCID: 'SCI08', SubjectName: 'Science' },
      { SCID: 'ISL10', SubjectName: 'Islamiat' },
      { SCID: 'URD08', SubjectName: 'Urdu' },
      { SCID: 'PAK08', SubjectName: 'Pakistan Studies' },
    ],
    'C9': [
      { SCID: 'ENG09', SubjectName: 'English' },
      { SCID: 'MATH09', SubjectName: 'Mathematics' },
      { SCID: 'PHY09', SubjectName: 'Physics' },
      { SCID: 'CHEM09', SubjectName: 'Chemistry' },
      { SCID: 'BIO09', SubjectName: 'Biology' },
      { SCID: 'PAK09', SubjectName: 'Pakistan Studies' },
    ],
    'C10': [
      { SCID: 'ENG10', SubjectName: 'English' },
      { SCID: 'MATH10', SubjectName: 'Mathematics' },
      { SCID: 'PHY10', SubjectName: 'Physics' },
      { SCID: 'CHEM10', SubjectName: 'Chemistry' },
      { SCID: 'BIO10', SubjectName: 'Biology' },
      { SCID: 'SST10', SubjectName: 'Social Studies' },
    ],
  };

  const handleClassChange = (classID) => {
    setSelectedClass(classID);
    setSchedule({});
  };

  const handleSlotChange = (slotIndex, subjectID) => {
    const updatedSchedule = { ...schedule };
    updatedSchedule[`Subject${slotIndex + 1}`] = subjectID;
    updatedSchedule[`Slot${slotIndex + 1}`] = slots[slotIndex];
    setSchedule(updatedSchedule);
  };

  const handleSaveSchedule = async () => {
    if (!selectedClass) {
      alert('Please select a class.');
      return;
    }

    if (!window.confirm('Are you sure you want to save this schedule?')) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/SaveSchedule', {
        classID: selectedClass,
        schedule,
      });
      alert('Schedule saved successfully!');
    } catch (error) {
      console.error('Error saving schedule:', error);
      alert('Failed to save schedule.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Cmain">
    <div className="cs-container">
      <h1 className="cs-title">Class Schedule Management</h1>

      <div className="cs-form-group">
        <label className="cs-label">Select Class:</label>
        <select
          className="cs-select"
          value={selectedClass}
          onChange={(e) => handleClassChange(e.target.value)}
        >
          <option value="">Select</option>
          {Object.keys(subjectsData).map((classID) => (
            <option key={classID} value={classID}>
              {classID}
            </option>
          ))}
        </select>
      </div>

      <table className="cs-table">
        <thead>
          <tr>
            <th>Slot</th>
            <th>Subject</th>
          </tr>
        </thead>
        <tbody>
          {slots.map((slot, index) => (
            <tr key={index}>
              <td>{slot}</td>
              <td>
                {slot !== '--Break--' ? (
                  <select
                    className="cs-select"
                    value={schedule[`Subject${index + 1}`] || ''}
                    onChange={(e) => handleSlotChange(index, e.target.value)}
                  >
                    <option value="">Select Subject</option>
                    <option value="FREE">Free Period</option>
                    {subjectsData[selectedClass]?.map((subject) => (
                      <option key={subject.SCID} value={subject.SCID}>
                        {subject.SubjectName}
                      </option>
                    ))}
                  </select>
                ) : (
                  'Break'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className="cs-save-button"
        onClick={handleSaveSchedule}
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Save Schedule'}
      </button>
    </div>
    </div>
  );
};

export default ClassSchedule;

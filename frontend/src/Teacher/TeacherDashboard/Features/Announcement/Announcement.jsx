import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Announcement.css';

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const role = localStorage.getItem('role');

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get('http://localhost:5000/GetAnnouncement');
        setAnnouncements(response.data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    fetchAnnouncements();
  }, []);

  const filteredAnnouncements = announcements.filter(
    (announcement) => 
      announcement.TargetAudience === 'Teachers' || 
      announcement.TargetAudience === 'All'
  );

  return (
    <div className="TA">
      <div className="announcement-container">
        {filteredAnnouncements.length === 0 ? (
          <p>No announcements available for {role}</p>
        ) : (
          filteredAnnouncements.map((announcement) => (
            <div key={announcement.AnnouncementID} className="announcement-card">
              <h3>{announcement.Title || 'No Title Available'}</h3>
              <p>{announcement.Description || 'No Description Available'}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Announcement;

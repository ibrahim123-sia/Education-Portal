const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

const config = {
  server: 'DESKTOP-HR342TM\\SQLEXPRESS',
  database: 'Education',
  user: 'Ibrahim01',
    password:'12345678',
  options: {
    trustedConnection: true,
    encrypt: true,
    trustServerCertificate: true,  
  }
};

sql.connect(config, function(err) {
  if (err) {
    console.error('Database connection error:', err);
    return;
  }

  console.log('Connected to SQL Server');
  const request = new sql.Request();
  
  request.query('SELECT * FROM AdminLogin', function(err, recordset) {
    if (err) {
      console.error('Error executing query:', err);
    } else {
      console.log('Query result:', recordset);
    }
  });
});

app.post('/Adminlogin', async (req, res) => {
  const { AdminUserID, AdminPassword } = req.body;

  try {
    const result = await sql.query`SELECT * FROM AdminLogin WHERE AdminUserID = ${AdminUserID} AND AdminPassword = ${AdminPassword}`;
    
    if (result.recordset.length > 0) {
      res.send({ message: "Login successful" });
    } else {
      res.status(401).send({ message: "Invalid AdminUserID or AdminPassword" });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send({ message: "An error occurred during login" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

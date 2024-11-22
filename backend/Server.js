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
  password: '1122',
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};


(async () => {
  try {
    await sql.connect(config);
    console.log('Connected to SQL Server');
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
})();


app.post('/Admission', async (req, res) => {
  const {
    StudentID,
    FirstName,
    LastName,
    Age,
    Gender,
    Email,
    Phone,
    DOB,
    PhotoPath,
    HouseNo,
    Street,
    City,
    GuardianName,
    GuardianContact,
    Relationship,
    DateOfAdmission,
    Class,
    Section,
  } = req.body;

  try {
    const request = new sql.Request();

    request.input('StudentID', sql.VarChar, StudentID);
    request.input('FirstName', sql.VarChar, FirstName);
    request.input('LastName', sql.VarChar, LastName);
    request.input('Age', sql.Int, Age);
    request.input('Gender', sql.VarChar, Gender);
    request.input('Email', sql.VarChar, Email);
    request.input('Phone', sql.VarChar, Phone);
    request.input('DOB', sql.Date, DOB);
    request.input('PhotoPath', sql.VarChar, PhotoPath);
    request.input('HouseNo', sql.VarChar, HouseNo);
    request.input('Street', sql.VarChar, Street);
    request.input('City', sql.VarChar, City);
    request.input('GuardianName', sql.VarChar, GuardianName);
    request.input('GuardianContact', sql.VarChar, GuardianContact);
    request.input('Relationship', sql.VarChar, Relationship);
    request.input('DateOfAdmission', sql.Date, DateOfAdmission);
    request.input('Class', sql.VarChar, Class);
    request.input('Section', sql.VarChar, Section);

    const query = `
      INSERT INTO StudentInfo (
        StudentID, FirstName, LastName, Age, Gender, Email, Phone, DOB, PhotoPath,
        HouseNo, Street, City, GuardianName, GuardianContact, 
        Relationship, DateOfAdmission, Class, Section
      ) VALUES (
        @StudentID, @FirstName, @LastName, @Age, @Gender, @Email, @Phone, @DOB, @PhotoPath,
        @HouseNo, @Street, @City, @GuardianName, @GuardianContact, 
        @Relationship, @DateOfAdmission, @Class, @Section
      )
    `;

    await request.query(query);
    res.status(200).send('Admission record added successfully.');
  } catch (error) {
    console.error('Error adding admission record:', error);
    res.status(500).send('Error adding admission record.');
  }
});




app.get('/count', async (req, res) => {
  try {
    const request = new sql.Request();
    const query = 'SELECT COUNT(StudentID) AS TotalStudents FROM StudentInfo';
    const result = await request.query(query);
    
    
    if (result.recordset && result.recordset.length > 0) {
      const totalStudents = result.recordset[0].TotalStudents;
      res.status(200).send({ totalStudents });
    } else {
      res.status(404).send({ message: 'No students found' });
    }
  } catch (error) {
    console.error('Error retrieving student count:', error);
    res.status(500).send('Error retrieving student count.');
  }
});


app.post('/Adminlogin', async (req, res) => {
  const { AdminUserID, AdminPassword } = req.body;

  try {
    const request = new sql.Request();

    
    request.input('AdminUserID', sql.VarChar, AdminUserID);
    request.input('AdminPassword', sql.VarChar, AdminPassword);

    const query = `
      SELECT * FROM AdminLogin 
      WHERE AdminUserID = @AdminUserID AND AdminPassword = @AdminPassword
    `;

    const result = await request.query(query);

    if (result.recordset.length > 0) {
      res.status(200).send({ message: 'Login successful' });
    } else {
      res.status(401).send({ message: 'Invalid AdminUserID or AdminPassword' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('An error occurred during login.');
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

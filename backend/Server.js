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

  let transaction;

  try {
      const pool = await sql.connect(config);
      console.log('Connected to the database');

      transaction = new sql.Transaction(pool);
      await transaction.begin();

      
      const studentRequest = new sql.Request(transaction);
      studentRequest.input('StudentID', sql.VarChar, StudentID);
      studentRequest.input('FirstName', sql.VarChar, FirstName);
      studentRequest.input('LastName', sql.VarChar, LastName);
      studentRequest.input('Age', sql.Int, Age);
      studentRequest.input('Gender', sql.VarChar, Gender);
      studentRequest.input('Email', sql.VarChar, Email);
      studentRequest.input('Phone', sql.VarChar, Phone);
      studentRequest.input('DOB', sql.Date, DOB);
      studentRequest.input('PhotoPath', sql.VarChar, PhotoPath);
      await studentRequest.query(`
          INSERT INTO Students (StudentID, FirstName, LastName, Age, Gender, Email, Phone, DOB, PhotoPath)
          VALUES (@StudentID, @FirstName, @LastName, @Age, @Gender, @Email, @Phone, @DOB, @PhotoPath)
      `);

      console.log('Inserting into Addresses table...');
      const addressRequest = new sql.Request(transaction);
      addressRequest.input('StudentID', sql.VarChar, StudentID);
      addressRequest.input('HouseNo', sql.VarChar, HouseNo);
      addressRequest.input('Street', sql.VarChar, Street);
      addressRequest.input('City', sql.VarChar, City);
      await addressRequest.query(`
          INSERT INTO Addresses (StudentID, HouseNo, Street, City)
          VALUES (@StudentID, @HouseNo, @Street, @City)
      `);

      
      const guardianRequest = new sql.Request(transaction);
      guardianRequest.input('StudentID', sql.VarChar, StudentID);
      guardianRequest.input('GuardianName', sql.VarChar, GuardianName);
      guardianRequest.input('GuardianContact', sql.VarChar, GuardianContact);
      guardianRequest.input('Relationship', sql.VarChar, Relationship);
      await guardianRequest.query(`
          INSERT INTO Guardians (StudentID, GuardianName, GuardianContact, Relationship)
          VALUES (@StudentID, @GuardianName, @GuardianContact, @Relationship)
      `);

      
      const admissionRequest = new sql.Request(transaction);
      admissionRequest.input('StudentID', sql.VarChar, StudentID);
      admissionRequest.input('DateOfAdmission', sql.Date, DateOfAdmission);
      admissionRequest.input('Class', sql.VarChar, Class);
      admissionRequest.input('Section', sql.VarChar, Section);
      await admissionRequest.query(`
          INSERT INTO Admissions (StudentID, DateOfAdmission, Class, Section)
          VALUES (@StudentID, @DateOfAdmission, @Class, @Section)
      `);

      await transaction.commit();
      res.status(200).send('Admission record added successfully.');
  } catch (error) {
      if (transaction) await transaction.rollback();
      console.error('Error adding admission record:', error);
      res.status(500).send({
          message: 'Error adding admission record.',
          details: error.message,
      });
  }
});

app.post('/AddFaculty', async (req, res) => {
  const {
    TeacherID,
    FirstName,
    LastName,
    Gender,
    DOB,
    Email,
    Phone, 
    CNIC,
    City,
    State,
    PostalCode,
    AddressType,
    HouseNo, 
    Degree,
    Institution,
    DateCompleted, 
    SubjectID,
    SubjectName 
  } = req.body;

  let transaction;

  try {
    
    const pool = await sql.connect(config);
    console.log('Connected to the database');
    
    transaction = new sql.Transaction(pool);
    await transaction.begin();

    
    const Teacher = new sql.Request(transaction);
    Teacher.input('TeacherID', sql.VarChar, TeacherID);
    Teacher.input('FirstName', sql.VarChar, FirstName);
    Teacher.input('LastName', sql.VarChar, LastName);
    Teacher.input('Gender', sql.VarChar, Gender);
    Teacher.input('DOB', sql.Date, DOB);
    Teacher.input('Email', sql.VarChar, Email);
    Teacher.input('Phone', sql.VarChar, Phone); 
    Teacher.input('CNIC', sql.VarChar, CNIC);
    await Teacher.query(`
      INSERT INTO Teachers (TeacherID, FirstName, LastName, Gender, DOB, Email, PhoneNumber, CNIC) 
      VALUES (@TeacherID, @FirstName, @LastName, @Gender, @DOB, @Email, @Phone, @CNIC)
    `);

    
    const TeacherAddress = new sql.Request(transaction);
    TeacherAddress.input('TeacherID', sql.VarChar, TeacherID);
    TeacherAddress.input('City', sql.VarChar, City);
    TeacherAddress.input('State', sql.VarChar, State);
    TeacherAddress.input('PostalCode', sql.VarChar, PostalCode);
    TeacherAddress.input('AddressType', sql.VarChar, AddressType);
    TeacherAddress.input('HouseNo', sql.VarChar, HouseNo);
    await TeacherAddress.query(`
      INSERT INTO TeacherAddresses (TeacherID, City, State, PostalCode, AddressType, HouseNo) 
      VALUES (@TeacherID, @City, @State, @PostalCode, @AddressType, @HouseNo)
    `);

    
    const Qualification = new sql.Request(transaction);
    Qualification.input('TeacherID', sql.VarChar, TeacherID);
    Qualification.input('Degree', sql.VarChar, Degree);
    Qualification.input('Institution', sql.VarChar, Institution);
    Qualification.input('DateCompleted', sql.Date, DateCompleted);
    await Qualification.query(`
      INSERT INTO Qualifications (TeacherID, Degree, Institution, DateCompleted) 
      VALUES (@TeacherID, @Degree, @Institution, @DateCompleted)
    `);

    const Subject = new sql.Request(transaction);
    Subject.input('TeacherID', sql.VarChar, TeacherID);
    Subject.input('SubjectID', sql.VarChar, SubjectID);
    Subject.input('SubjectName', sql.VarChar, SubjectName);
    await Subject.query(`
      INSERT INTO Subjects (TeacherID, SubjectID, SubjectName) 
      VALUES (@TeacherID, @SubjectID, @SubjectName)
    `);

    
    await transaction.commit();
    res.status(200).send({ message: 'Faculty added successfully' });

  } catch (error) {
    
    if (transaction) {
      await transaction.rollback();
    }
    console.error('Error during faculty addition:', error);
    res.status(500).send({ error: 'Failed to add faculty', details: error.message });
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

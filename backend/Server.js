const express = require("express");
const sql = require("mssql");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

const config = {
  server: "DESKTOP-HR342TM\\SQLEXPRESS",
  database: "Education",
  user: "ibrahim01",
  password: "1122",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

(async () => {
  try {
    await sql.connect(config);
    console.log("Connected to SQL Server");
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }
})();

app.post("/UpdateRecord", async (req, res) => {
  const {
    recordType,
    StudentID,
    FirstName,
    LastName,
    Age,
    Email,
    Gender,
    TotalFee,
    PaidAmount,
    RemainingBalance,
    PaymentDate,
    PaymentStatus,
  } = req.body;


  try {
    const pool = await sql.connect(config);

    if (recordType === "student") {
      const query = `
        UPDATE Students
        SET 
          FirstName = '${FirstName}',
          LastName = '${LastName}',
          Age = ${Age},
          Email = '${Email}',
          Gender = '${Gender}'
        WHERE StudentID = '${StudentID}'`;

      await pool.query(query);
    } else if (recordType === "fee") {
      const query = `
        UPDATE TuitionFee
        SET 
          TotalFee = ${TotalFee},
          PaidAmount = ${PaidAmount},
          RemainingBalance = ${RemainingBalance},
          PaymentDate = '${PaymentDate}',
          PaymentStatus = '${PaymentStatus}'
        WHERE StudentID = '${StudentID}'`;

      await pool.query(query);
    } else {
      return res.status(400).send("Invalid recordType provided.");
    }

    res.status(200).send("Record updated successfully.");
  } catch (error) {
    console.error("Error updating record:", error);
    res.status(500).send("Error updating record.");
  }
});

app.post("/UpdateTeacherRecord", async (req, res) => {
  const { recordType, TeacherID, ...updateData } = req.body;

  try {
    if (!recordType || !TeacherID) {
      return res
        .status(400)
        .send({ message: "Record type and TeacherID are required." });
    }

    let updateQuery = "";
    if (recordType === "teacher") {
      updateQuery = `
        UPDATE Teachers
        SET 
          FirstName = '${updateData.FirstName}',
          LastName = '${updateData.LastName}',
          Gender = '${updateData.Gender}',
          DOB = '${updateData.DOB}',
          Email = '${updateData.Email}',
          PhoneNumber = '${updateData.PhoneNumber}',
          CNIC = '${updateData.CNIC}'
        WHERE TeacherID = '${TeacherID}'`;
    } else if (recordType === "qualification") {
      updateQuery = `
        UPDATE Qualifications
        SET 
          Degree = '${updateData.Degree}',
          Institution = '${updateData.Institution}',
          DateCompleted = '${updateData.DateCompleted}'
        WHERE TeacherID = '${TeacherID}'`;
    } else {
      return res
        .status(400)
        .send({ message: "Invalid record type specified." });
    }

    await sql.query(updateQuery);

    res.status(200).send({ message: "Record updated successfully." });
  } catch (error) {
    console.error("Error updating record:", error);
    res.status(500).send({ message: "Error updating record.", error });
  }
});


app.get("/GetTeacherRecord", async (req, res) => {
  try {
    const pool = await sql.connect(config);

    const TeacherQuery =
      "SELECT TeacherID, FirstName, LastName, Gender, DOB, Email, PhoneNumber, CNIC FROM Teachers;";
    const Teachers = (await pool.query(TeacherQuery)).recordset || [];

    const QualificationsQuery =
      "SELECT TeacherID, Degree, Institution, DateCompleted FROM Qualifications;";
    const Qualifications = (await pool.query(QualificationsQuery)).recordset || [];

    const AbsenceQuery =
      "SELECT t.TeacherID, t.FirstName, t.LastName, " +
      "COUNT(ta.AttendanceDate) AS PreviousAbsent " +
      "FROM Teachers t " +
      "LEFT JOIN TeacherAttendance ta ON t.TeacherID = ta.TeacherID AND ta.Status = 'Absent' " +
      "GROUP BY t.TeacherID, t.FirstName, t.LastName;";
    const Absences = (await pool.query(AbsenceQuery)).recordset || [];

    const TscheduleQuery ='select * from TeacherSchedule'
    const Tschedule=((await pool.query(TscheduleQuery)).recordset || [])

    const TeachersWithAbsences = Teachers.map((teacher) => {
      const absence = Absences.find((a) => a.TeacherID === teacher.TeacherID);
      return {
        ...teacher,
        PreviousAbsent: absence ? absence.PreviousAbsent : 0,
      };
    });

    res.status(200).send({ Teachers: TeachersWithAbsences, Qualifications,Tschedule });
  } catch (error) {
    console.error("Error retrieving data", error);
    res.status(500).send("Error retrieving data.");
  }
});



app.get("/GetStudentRecord", async (req, res) => {
  try {
    const request = new sql.Request();

    const StudentQuery =
      "SELECT StudentID, FirstName, LastName, Age, Gender, Email, Phone, DOB,Photo FROM Students";
    const StudentQueryResult = await request.query(StudentQuery);

    const FeeQuery =
      "select StudentID,TotalFee,PaidAmount,RemainingBalance,PaymentDate,PaymentStatus from TuitionFee";
    const FeeQueryResult = await request.query(FeeQuery);

    const students = StudentQueryResult.recordset || [];
    const fee = FeeQueryResult.recordset || [];
    res.status(200).send({ students, fee });
  } catch (error) {
    console.error("error retreving data", error);
    res.status(500).send("Error retrieving data.");
  }
});

app.post("/SaveStudentAttendance", async (req, res) => {
  const { StudentID, FullName, AttendanceDate, Status } = req.body;

  try {
    const pool = await sql.connect(config);

    // Check if attendance already exists for the student on the given date
    const checkAttendanceQuery = `
      SELECT COUNT(*) AS AttendanceExists
      FROM ClassAttendance
      WHERE StudentID = '${StudentID}'
      AND AttendanceDate = '${AttendanceDate}'`;

    const result = (await pool.query(checkAttendanceQuery)).recordset[0];

    if (result.AttendanceExists > 0) {
      return res.status(400).send("Attendance already recorded for this date.");
    }

    // Insert the attendance record
    const insertQuery = `
      INSERT INTO ClassAttendance (StudentID, FullName, AttendanceDate, Status)
      VALUES ('${StudentID}', '${FullName}', '${AttendanceDate}', '${Status}')`;

    await pool.query(insertQuery);

    res.status(200).send("Attendance saved successfully.");
  } catch (error) {
    console.error("Error saving attendance:", error);
    res.status(500).send("Error saving attendance.");
  }
});
app.post("/SaveAttendance", async (req, res) => {
  const { TeacherID, FirstName, AttendanceDate, Status } = req.body;

  try {
    const pool = await sql.connect(config);

    const checkAttendanceQuery = `
      SELECT COUNT(*) AS AttendanceExists
      FROM TeacherAttendance
      WHERE TeacherID = '${TeacherID}'
      AND AttendanceDate = '${AttendanceDate}'`;

    const result = (await pool.query(checkAttendanceQuery)).recordset[0];
    if (result.AttendanceExists > 0) {
      return res.status(400).send("Attendance already recorded for this date.");
    }

    const insertQuery = `
      INSERT INTO TeacherAttendance (TeacherID, FirstName, AttendanceDate, Status)
      VALUES ('${TeacherID}', '${FirstName}', '${AttendanceDate}', '${Status}')`;

    await pool.query(insertQuery);
    res.status(200).send("Attendance saved successfully.");
  } catch (error) {
    console.error("Error saving attendance:", error);
    res.status(500).send("Error saving attendance.");
  }
});


app.post("/AddFaculty", async (req, res) => {
  const {
    TeacherID,
    TeacherPassword,
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
    Photo,
  } = req.body;

  const photoBuffer = Photo ? `0x${Buffer.from(Photo, "base64").toString("hex")}` : null;

  try {
    const pool = await sql.connect(config);

    await pool.query(`
      INSERT INTO Teachers (TeacherID, FirstName, LastName, Gender, DOB, Email, PhoneNumber, CNIC, Photo) 
      VALUES ('${TeacherID}', '${FirstName}', '${LastName}', '${Gender}', '${DOB}', '${Email}', '${Phone}', '${CNIC}', ${photoBuffer})`);

    await pool.query(`
      INSERT INTO TeacherAddresses (TeacherID, City, State, PostalCode, AddressType, HouseNo) 
      VALUES ('${TeacherID}', '${City}', '${State}', '${PostalCode}', '${AddressType}', '${HouseNo}')`);

    await pool.query(`
      INSERT INTO Qualifications (TeacherID, Degree, Institution, DateCompleted) 
      VALUES ('${TeacherID}', '${Degree}', '${Institution}', '${DateCompleted}')`);

    await pool.query(`
      INSERT INTO TeacherCredential (TeacherID, Password)
      VALUES ('${TeacherID}', '${TeacherPassword}')`);

    res.status(200).send({ message: "Faculty added successfully" });
  } catch (error) {
    console.error("Error during faculty addition:", error);
    res
      .status(500)
      .send({ error: "Failed to add faculty", details: error.message });
  }
});




app.post("/Admission", async (req, res) => {
  const {
    StudentID,
    StudentPassword,
    FirstName,
    LastName,
    Age,
    Gender,
    Email,
    Phone,
    DOB,
    StudentPhoto,
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
    const pool = await sql.connect(config);

    await pool.query(`
      INSERT INTO Students (StudentID, FirstName, LastName, Age, Gender, Email, Phone, DOB, Photo)
      VALUES ('${StudentID}', '${FirstName}', '${LastName}', ${Age}, '${Gender}', '${Email}', '${Phone}', '${DOB}', ${sphotoBuffer ? `'${sphotoBuffer.toString("base64")}'` : "NULL"})
    `);

    await pool.query(`
      INSERT INTO Addresses (StudentID, HouseNo, Street, City)
      VALUES ('${StudentID}', '${HouseNo}', '${Street}', '${City}')
    `);

    await pool.query(`
      INSERT INTO Guardians (StudentID, GuardianName, GuardianContact, Relationship)
      VALUES ('${StudentID}', '${GuardianName}', '${GuardianContact}', '${Relationship}')
    `);

    await pool.query(`
      INSERT INTO Admissions (StudentID, DateOfAdmission, Class, Section)
      VALUES ('${StudentID}', '${DateOfAdmission}', '${Class}', '${Section}')
    `);

    await pool.query(`
      INSERT INTO StudentCredential (StudentID, Password)
      VALUES ('${StudentID}', '${StudentPassword}')`);


    res.status(200).send("Admission record added successfully.");
  } catch (error) {
    console.error("Error adding admission record:", error);
    res.status(500).send({ message: "Error adding admission record.", details: error.message });
  }
});


app.post("/FeeCollection", async (req, res) => {
  const { ReceiptID, StudentID, TotalFee, PaidAmount, RemainingBalance, PaymentDate, PaymentStatus } = req.body;

  try {
    const pool = await sql.connect(config);

    await pool.query(`
      INSERT INTO TuitionFee (ReceiptID, StudentID, TotalFee, PaidAmount, RemainingBalance, PaymentDate, PaymentStatus)
      VALUES ('${ReceiptID}', '${StudentID}', ${TotalFee}, ${PaidAmount}, ${RemainingBalance}, '${PaymentDate}', '${PaymentStatus}')
    `);

    res.status(200).send({ message: "Fee record added successfully" });
  } catch (error) {
    console.error("Error during fee addition:", error.message);
    res.status(500).send({ error: "Failed to add fee", details: error.message });
  }
});

app.get("/count", async (req, res) => {
  try {
    const request = new sql.Request();

    const studentQuery =
      "select count(StudentID) AS 'TotalStudents' from Students";
    const studentResult = await request.query(studentQuery);

    const feeQuery =
      "SELECT SUM(PaidAmount) AS 'FeeCollection'FROM TuitionFee WHERE MONTH(PaymentDate) = MONTH(GETDATE()) AND YEAR(PaymentDate) = YEAR(GETDATE()) and PaymentStatus='Paid' or PaymentStatus='Partially Paid' ;";
    const feeResult = await request.query(feeQuery);

    const AbsentQuery =
      " SELECT count(TeacherID) AS 'Total Absent Teacher'FROm TeacherAttendance WHERE MONTH(AttendanceDate) = MONTH(GETDATE()) AND YEAR(AttendanceDate) = YEAR(GETDATE()) and Status='Absent'";
    const absentResult = await request.query(AbsentQuery);

    const totalStudents = studentResult.recordset[0]?.TotalStudents || 0;
    const feeCollection = feeResult.recordset[0]?.FeeCollection || 0;

    res.status(200).send({ totalStudents, FeeCollection: feeCollection });
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Error retrieving data.");
  }
});

app.post("/Announcements", async (req, res) => {
  const { AnnouncementID, Title, Description, Date } = req.body;

  try {
    const pool = await sql.connect(config);

    await pool.query(`
      INSERT INTO Announcements (AnnouncementID, Title, Description, Date)
      VALUES ('${AnnouncementID}', '${Title}', '${Description}', '${Date}')
    `);

    res.status(200).send({ message: "Announcement added successfully" });
  } catch (error) {
    console.error("Error during announcement addition:", error.message);
    res.status(500).send({ error: "Failed to add announcement", details: error.message });
  }
});

app.post("/TeacherLogin", async (req, res) => {
  const { TeacherID, TeacherPassword } = req.body;

  try {
    const pool = await sql.connect(config);

    const query = `
      SELECT * FROM TeacherCredential 
      WHERE TeacherID = '${TeacherID}' AND Password = '${TeacherPassword}'
    `;

    const result = await pool.query(query);

    if (result.recordset.length > 0) {
      const teacherData = result.recordset[0];
      res.status(200).send({
        message: "Login successful",
        teacherId: teacherData.TeacherID,
      });
    } else {
      res.status(401).send({ message: "Invalid TeacherID or TeacherPassword" });
    }
    
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("An error occurred during login.");
  }
});

app.post("/Adminlogin", async (req, res) => {
  const { AdminUserID, AdminPassword } = req.body;
  try {
    const request = new sql.Request();

    const query = `
      SELECT * FROM AdminLogin 
      WHERE AdminUserID = '${AdminUserID}' AND AdminPassword = '${AdminPassword}'
    `;

    const result = await request.query(query);

    if (result.recordset.length > 0) {
      res.status(200).send({ message: "Login successful" });
    } else {
      res.status(401).send({ message: "Invalid AdminUserID or AdminPassword" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("An error occurred during login.");
  }
});


app.get('/GetClasses', async (req, res) => {
  try {
    const request = new sql.Request();
    const GetClassesQuery = 'SELECT * FROM Classes';
    const ClassesResult = await request.query(GetClassesQuery);

    const AllClasses = ClassesResult.recordset || [];
    res.status(200).send(AllClasses);
  } catch (error) {
    console.error('Error retrieving classes:', error);
    res.status(500).json({ success: false, message: 'Error retrieving classes.' });
  }
});



app.post('/SaveSchedule', (req, res) => {
  const { classID, schedule } = req.body;

  const classNames = {
    'KG': 'Kindergarten',
    'C1': 'Class 1',
    'C2': 'Class 2',
    'C3': 'Class 3',
    'C4': 'Class 4',
    'C5': 'Class 5',
    'C6': 'Class 6',
    'C7': 'Class 7',
    'C8': 'Class 8',
    'C9': 'Class 9',
    'C10':'Class 10',
  };
  const className = classNames[classID];

  if (!classID || !schedule || Object.keys(schedule).length === 0) {
    return res.status(400).json({ error: 'Invalid payload.' });
  }

  if (!className) {
    return res.status(400).json({ error: 'Invalid classID: Class name not found.' });
  }

  const classSubjects = {
    'KG': ['English', 'Mathematics', 'Art & Craft', 'General Awareness', 'Drawing'],
    'C1': ['English', 'Mathematics', 'Science', 'Islamiat'],
    'C2': ['English', 'Mathematics', 'Science', 'Islamiat'],
    'C3': ['English', 'Mathematics', 'Science', 'Urdu', 'Islamiat', 'Pakistan Studies'],
    'C4': ['English', 'Mathematics', 'Science', 'Urdu', 'Islamiat', 'Pakistan Studies'],
    'C5': ['English', 'Mathematics', 'Science', 'Urdu', 'Islamiat', 'Pakistan Studies'],
    'C6': ['English', 'Mathematics', 'Science', 'Urdu', 'Islamiat', 'Pakistan Studies'],
    'C7': ['English', 'Mathematics', 'Science', 'Urdu', 'Islamiat', 'Pakistan Studies'],
    'C8': ['English', 'Mathematics', 'Science', 'Urdu', 'Islamiat', 'Pakistan Studies'],
    'C9': ['English', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Pakistan Studies'],
    'C10': ['English', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Social Studies']
  };

  const availableSubjects = classSubjects[classID];
  if (!availableSubjects) {
    return res.status(400).json({ error: 'Invalid class ID.' });
  }

  const invalidSubjects = Object.values(schedule).some(subjectID => !availableSubjects.includes(subjectID));
  if (invalidSubjects) {
    return res.status(400).json({ error: 'Invalid subject(s) selected for this class.' });
  }

  
  const deleteQuery = 'DELETE FROM ClassSchedule WHERE ClassID = ?';
  db.query(deleteQuery, [classID], (deleteErr) => {
    

  
    const columns = ['ClassID', 'ClassName'];
    const values = [classID, className];

    Object.entries(schedule).forEach(([key, value]) => {
      if (key.startsWith('Subject')) {
        columns.push(key);
        values.push(value);
      }
    });

    const insertQuery = `INSERT INTO ClassSchedule (${columns.join(', ')}) VALUES (${values.map(() => '?').join(', ')})`;
    console.log('Insert Query:', insertQuery); 
    console.log('Values:', values); 

    db.query(insertQuery, values, (insertErr) => {
      if (insertErr) {
        console.error('Error saving schedule:', insertErr);
        return res.status(500).json({ error: 'Failed to save schedule.' });
      }

      res.json({ message: 'Schedule saved successfully.' });
    });
  });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

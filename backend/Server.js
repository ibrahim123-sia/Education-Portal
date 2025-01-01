const express = require("express");
const sql = require("mssql");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

const config = {
  server: "DESKTOP-HR342TM\\SQLEXPRESS",
  database: "EducationSystem",
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


app.post("/Adminlogin", async (req, res) => {
  const { AdminUserID, AdminPassword } = req.body;
  try {
    const pool = await sql.connect(config);

    
    const result = await pool.query(`
      EXEC AdminLoginProc '${AdminUserID}', '${AdminPassword}'
    `);

    if (result.recordset.length > 0) {
      const adminData = result.recordset[0];
      res.status(200).send({
        message: "Login successful",
        adminId: adminData.AdminUserID,
      });
    } else {
      res.status(401).send({ message: "Invalid AdminUserID or AdminPassword" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("An error occurred during login.");
  }
});

app.get("/Adminlogin/:adminId", async (req, res) => {
  const { adminId } = req.params;
  try {
    const pool = await sql.connect(config); 
    const query = `
      SELECT * FROM AdminLogin WHERE AdminUserID = '${adminId}'
    `;

    const result = await pool.request().query(query); 

    if (result.recordset.length > 0) {
      res.status(200).send(result.recordset[0]);
    } else {
      res.status(404).send({ message: "Admin not found" });
    }
  } catch (error) {
    console.error("Error fetching admin data:", error);
    res.status(500).send("An error occurred while fetching admin data.");
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
      EXEC AddAdmissionRecord 
        '${StudentID}', 
        '${StudentPassword}', 
        '${FirstName}', 
        '${LastName}', 
        ${Age}, 
        '${Gender}', 
        '${Email}', 
        '${Phone}', 
        '${DOB}', 
        '${HouseNo}', 
        '${Street}', 
        '${City}', 
        '${GuardianName}', 
        '${GuardianContact}', 
        '${Relationship}', 
        '${DateOfAdmission}', 
        '${Class}', 
        '${Section}'
    `);

    
    await pool.query(`
      EXEC AssignSubjectsToStudent 
        '${StudentID}', 
        '${FirstName}', 
        '${LastName}', 
        '${Class}'
    `);

    res.status(200).send("Admission record added and subjects assigned successfully.");
  } catch (error) {
    console.error("Error processing admission:", error);
    res.status(500).send({ message: "Error processing admission.", details: error.message });
  }
});


app.get("/Studentlogin/:studentId", async (req, res) => {
  const { studentId } = req.params;
  try {
    const pool = await sql.connect(config); 
    const query = `
      select * from StudentCredential WHERE StudentID  = '${studentId}'
    `;

    const result = await pool.request().query(query); 

    if (result.recordset.length > 0) {
      res.status(200).send(result.recordset[0]);
    } else {
      res.status(404).send({ message: "Student not found" });
    }
  } catch (error) {
    console.error("Error fetching student data:", error);
    res.status(500).send("An error occurred while fetching student data.");
  }
});






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
      
      await pool.query(`
        EXEC UpdateStudentRecord '${StudentID}', '${FirstName}', '${LastName}', ${Age}, '${Email}', '${Gender}'
      `);
    } else if (recordType === "fee") {
      
      await pool.query(`
        EXEC UpdateFeeRecord '${StudentID}', ${TotalFee}, ${PaidAmount}, ${RemainingBalance}, '${PaymentDate}', '${PaymentStatus}'
      `);
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
    const pool = await sql.connect(config);

    if (recordType === "teacher") {
      await pool.query(`
        EXEC UpdateTeacherRecord 
        '${TeacherID}', 
        '${updateData.FirstName}', 
        '${updateData.LastName}', 
        '${updateData.Gender}', 
        '${updateData.DOB}', 
        '${updateData.Email}', 
        '${updateData.PhoneNumber}', 
        '${updateData.CNIC}'
      `);
    } else if (recordType === "qualification") {
      await pool.query(`
        EXEC UpdateQualificationRecord 
        '${TeacherID}', 
        '${updateData.Degree}', 
        '${updateData.Institution}', 
        '${updateData.DateCompleted}'
      `);
    } else {
      return res.status(400).send("Invalid record type specified.");
    }

    res.status(200).send("Record updated successfully.");
  } catch (error) {
    console.error("Error updating record:", error);
    res.status(500).send("Error updating record.");
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

app.get("/GetGrades", async (req, res) => {
  try {
    const pool = await sql.connect(config);

    const Grades = `
    SELECT g.StudentID, g.ClassID, g.SCID, g.AssignmentType, g.AssignmentName, g.ObtainedMarks, g.TotalMarks, s.SubjectName
FROM grades g 
JOIN Subjects s ON g.SCID = s.SCID;
  `;

    const result = await pool.query(Grades);

    res.status(200).send(result.recordset);
  } catch (error) {
    console.error("Error retrieving grades data:", error);
    res.status(500).send("Error retrieving grades data.");
  }
});






app.get("/GetStudentRecord", async (req, res) => {
  try {
    const pool = await sql.connect(config);

    const CurrAttendance="select * from StudentAttendance";
    const CA=(await pool.query(CurrAttendance)).recordset || [];

    const StudentQuery =
      "SELECT StudentID, FirstName, LastName, Gender, DOB, Email, Phone, Age FROM Students;";
    const Students = (await pool.query(StudentQuery)).recordset || [];

    
    const FeeQuery =
      "SELECT StudentID, TotalFee, PaidAmount, RemainingBalance, PaymentDate, PaymentStatus FROM TuitionFee;";
    const FeeDetails = (await pool.query(FeeQuery)).recordset || [];


    const AttendanceQuery =
      "SELECT s.StudentID, s.FirstName, s.LastName, " +
      "COUNT(sa.AttendanceDate) AS PreviousAbsent " +
      "FROM Students s " +
      "LEFT JOIN StudentAttendance sa ON s.StudentID = sa.StudentID AND sa.Status = 'Absent' " +
      "GROUP BY s.StudentID, s.FirstName, s.LastName;";
    const Attendance = (await pool.query(AttendanceQuery)).recordset || [];

   
    const ScheduleQuery = "SELECT * FROM ClassSchedule";
    const Sschedule = (await pool.query(ScheduleQuery)).recordset || [];

   
    const StudentsWithAttendance = Students.map((student) => {
      const attendance = Attendance.find((a) => a.StudentID === student.StudentID);
      return {
        ...student,
        PreviousAbsent: attendance ? attendance.PreviousAbsent : 0,
      };
    });

    
    res.status(200).send({
      Students: StudentsWithAttendance,
      FeeDetails,
      Sschedule,
      CA,
    });
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Error retrieving data.");
  }
});


app.get('/GetAnnouncement', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const GetAnn = 'SELECT * FROM Announcements';
    const AnnResult = await pool.query(GetAnn);
    res.status(200).send(AnnResult.recordset);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching announcements', error });
  }
});



app.post("/SaveAttendance", async (req, res) => {
  const { TeacherID, FirstName, LastName, AttendanceDate, Status } = req.body;

  try {
    const pool = await sql.connect(config);

    await pool.query(`
      EXEC SaveTeacherAttendance 
        '${TeacherID}', 
        '${FirstName}', 
        '${LastName}', 
        '${AttendanceDate}', 
        '${Status}'
    `);

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
    HouseNo,
    Degree,
    Institution,
    DateCompleted,
  } = req.body;

  try {
    const pool = await sql.connect(config);

    
    await pool.query(`
      EXEC AddFacultyRecord 
        '${TeacherID}', 
        '${TeacherPassword}', 
        '${FirstName}', 
        '${LastName}', 
        '${Gender}', 
        '${DOB}', 
        '${Email}', 
        '${Phone}', 
        '${CNIC}', 
        '${City}', 
        '${State}', 
        '${PostalCode}',
        '${HouseNo}', 
        '${Degree}', 
        '${Institution}', 
        '${DateCompleted}'
    `);

    await pool.query(`EXEC AssignSubjectsToTeacher '${TeacherID}', '${Degree}'`);

    res.status(200).send("Faculty record added successfully, and subjects assigned.");
  } catch (error) {
    console.error("Error adding faculty record:", error);
    res.status(500).send({ message: "Error adding faculty record.", details: error.message });
  }
});



app.post("/FeeCollection", async (req, res) => {
  const {
    ReceiptID,
    StudentID,
    TotalFee,
    PaidAmount,
    RemainingBalance,
    PaymentDate,
    PaymentStatus,
  } = req.body;

  try {
    const pool = await sql.connect(config);

    await pool.query(`
      EXEC AddFeeRecord 
        '${ReceiptID}', 
        '${StudentID}', 
        ${TotalFee}, 
        ${PaidAmount}, 
        ${RemainingBalance}, 
        '${PaymentDate}', 
        '${PaymentStatus}'
    `);

    res.status(200).send({ message: "Fee record added successfully." });
  } catch (error) {
    console.error("Error during fee addition:", error.message);
    res
      .status(500)
      .send({ error: "Failed to add fee record.", details: error.message });
  }
});


app.get("/count", async (req, res) => {
  try {
    const pool = await sql.connect(config);

   
    const studentQuery =
      "SELECT COUNT(StudentID) AS TotalStudents FROM Students";
    const studentResult = await pool.request().query(studentQuery);

    
    const feeQuery = `
      SELECT SUM(PaidAmount) AS 'FeeCollection'FROM TuitionFee WHERE MONTH(PaymentDate) = MONTH(GETDATE()) AND YEAR(PaymentDate) = YEAR(GETDATE())
      and PaymentStatus='Paid' or PaymentStatus='Partially Paid'`;
    const feeResult = await pool.request().query(feeQuery);

    const StdAbsent = "select count(StudentID) As TotalAbsentStudent From StudentAttendance Where Status='Absent' and MONTH(AttendanceDate) = MONTH(GETDATE()) AND YEAR(AttendanceDate) = YEAR(GETDATE()) and day(AttendanceDate)=day(GETDATE())"
    const StdAbsentCount=(await pool.request().query(StdAbsent));

    const absentQuery = `
      SELECT COUNT(TeacherID) AS TotalAbsentTeacher 
      FROM TeacherAttendance 
      WHERE 
        MONTH(AttendanceDate) = MONTH(GETDATE()) 
        AND YEAR(AttendanceDate) = YEAR(GETDATE()) 
        AND Status = 'Absent';`;
    const absentResult = await pool.request().query(absentQuery);

    
    const totalStudents = studentResult.recordset[0]?.TotalStudents || 0;
    const feeCollection = feeResult.recordset[0]?.FeeCollection || 0;
    const totalAbsentTeacher = absentResult.recordset[0]?.TotalAbsentTeacher || 0;
    const StdAbsentResult=StdAbsentCount.recordset[0]?.TotalAbsentStudent
    
    res.status(200).send({ totalStudents, totalAbsentTeacher, feeCollection,StdAbsentResult });
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Error retrieving data.");
  }
});


app.post("/Announcements", async (req, res) => {
  const { Title, Description, TargetAudience, StartDate, EndDate } = req.body;

  try {
    const pool = await sql.connect(config);

    await pool.query(`
      EXEC AddAnnouncementRecord
        '${Title}', 
        '${Description}', 
        '${TargetAudience}', 
        '${StartDate}', 
        '${EndDate}'
    `);

    res.status(200).send({ message: "Announcement added successfully." });
  } catch (error) {
    console.error("Error during announcement addition:", error.message);
    res
      .status(500)
      .send({ error: "Failed to add announcement.", details: error.message });
  }
});

app.post("/StudentLogin", async (req, res) => {
  const { StudentID, StudentPassword } = req.body;

  try {
      const pool = await sql.connect(config);

      const query = `
        SELECT * FROM StudentCredential
        WHERE StudentID = '${StudentID}' AND Password = '${StudentPassword}'
      `;

      const result = await pool.query(query);

      if (result.recordset.length > 0) {
          const studentData = result.recordset[0];
          res.status(200).send({
              message: "Login successful",
              studentId: studentData.StudentID,
          });
      } else {
          res.status(401).send({ message: "Invalid StudentID or StudentPassword" });
      }
  } catch (error) {
      console.error("Error during login:", error);
      res.status(500).send("An error occurred during login.");
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




app.get('/GetClasses', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const GetClassesQuery = 'SELECT * FROM Classes';
    const ClassesResult = await request.query(GetClassesQuery);

    const AllClasses = ClassesResult.recordset || [];
    res.status(200).send(AllClasses);
  } catch (error) {
    console.error('Error retrieving classes:', error);
    res.status(500).json({ success: false, message: 'Error retrieving classes.' });
  }
});


app.post('/SaveSchedule', async (req, res) => {
  const { classID, schedule } = req.body;

  
  console.log('Incoming Schedule from Frontend:', schedule);

  if (!classID || !schedule || Object.keys(schedule).length === 0) {
    return res
      .status(400)
      .json({ error: 'Invalid payload. ClassID and schedule are required.' });
  }

  try {
    const pool = await sql.connect(config);

    await pool.query(`
      EXEC SaveClassSchedule
        '${classID}', 
        '${schedule.Subject1 || null}', '${schedule.Slot1 || null}', 
        '${schedule.Subject2 || null}', '${schedule.Slot2 || null}', 
        '${schedule.Subject3 || null}', '${schedule.Slot3 || null}', 
        '${schedule.Subject4 || null}', '${schedule.Slot4 || null}', 
        '${schedule.Subject5 || null}', '${schedule.Slot5 || null}', 
        '${schedule.Subject6 || null}', '${schedule.Slot6 || null}'
    `);

    res.status(200).json({ message: 'Schedule saved successfully.' });
  } catch (err) {
    console.error('Error saving schedule:', err.message);
    res.status(500).json({ error: 'Failed to save schedule.', details: err.message });
  }
});





app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.get("/GetTeacherClasses", async (req, res) => {
  try {
    const teacherId = req.query.TeacherID;

    if (!teacherId) {
      return res.status(400).send("TeacherID is required.");
    }

    const pool = await sql.connect(config);
    const query = `
      SELECT 
        t.SCID, 
        t.TeacherID, 
        ts.SubjectName, 
        ts.ClassID
      FROM Teacher_Subjects t
      JOIN Subjects ts ON t.SCID = ts.SCID
      WHERE t.TeacherID = '${teacherId}'
    `;

    const result = await pool.query(query);
    res.status(200).send(result.recordset || []);
  } catch (error) {
    console.error("Error retrieving teacher classes:", error);
    res.status(500).send("Error retrieving classes.");
  }
});


app.get("/GetStudentsByClass", async (req, res) => {
  try {
    const classId = req.query.ClassID;

    if (!classId) {
      console.log("ClassID not provided");
      return res.status(400).send("ClassID is required.");
    }

    console.log("Received ClassID:", classId);

    
    const pool = await sql.connect(config);

    
    const query = `
      SELECT 
        s.StudentID, 
        s.FirstName, 
        s.LastName, 
        COUNT(a.Status) AS PreviousAbsent
      FROM Students s
      JOIN Student_Subjects ss ON s.StudentID = ss.StudentID
      LEFT JOIN StudentAttendance a 
        ON s.StudentID = a.StudentID 
        AND a.Status = 'Absent'
      WHERE ss.ClassID = @ClassID
      GROUP BY s.StudentID, s.FirstName, s.LastName;
    `;

    const result = await pool
      .request()
      .input("ClassID", sql.VarChar, classId)
      .query(query);

    console.log("Query Result:", result.recordset);

    res.status(200).send({ Students: result.recordset });
  } catch (error) {
    console.error("Error retrieving students by class:", error);
    res.status(500).send("Error retrieving students.");
  }
});


app.post("/SaveStudentAttendance", async (req, res) => {
  try {
    const { StudentID,SubjectName, AttendanceDate, Status } = req.body;

    
    if (!StudentID || !SubjectName || !AttendanceDate || !Status) {
      console.log("Missing required fields in request body.");
      return res.status(400).send("All fields (StudentID, SubjectName, AttendanceDate, Status) are required.");
    }

    console.log("Saving attendance for:", { StudentID, SubjectName, AttendanceDate, Status });

   
    const pool = await sql.connect(config);

    
    const checkQuery = `
      SELECT * FROM StudentAttendance
      WHERE StudentID = '${StudentID}' AND AttendanceDate = '${AttendanceDate}'
    `;
    const checkResult = await pool.query(checkQuery);

    if (checkResult.recordset.length > 0) {
      console.log("Attendance already exists for this date.");
      return res.status(400).send("Attendance for this student on the selected date already exists.");
    }

    
    const insertQuery = `
      INSERT INTO StudentAttendance (StudentID, SubjectName, AttendanceDate, Status)
      VALUES ('${StudentID}', '${SubjectName}', '${AttendanceDate}', '${Status}')
    `;
    await pool.query(insertQuery);

    console.log("Attendance saved successfully.");
    res.status(200).send("Attendance saved successfully.");
  } catch (error) {
    console.error("Error saving attendance:", error);
    res.status(500).send("Error saving attendance.");
  }
});

app.post("/SaveAssignment", async (req, res) => {
  try {
    const { ClassID,  SubjectName,Title, Description, TeacherID, DueDate } = req.body;

    
    if (!ClassID || !Title || !Description || !TeacherID || !SubjectName || !DueDate) {
      return res.status(400).send("All fields are required.");
    }

    const pool = await sql.connect(config);

   
    const subjectQuery = `
      SELECT SCID 
      FROM Subjects 
      WHERE SubjectName = '${SubjectName}';
    `;
    const subjectResult = await pool.query(subjectQuery);

    
    if (subjectResult.recordset.length === 0) {
      return res.status(404).send("Subject not found for the provided ClassID and SubjectName.");
    }

    const SCID = subjectResult.recordset[0].SCID;

    const insertQuery = `
      INSERT INTO CreateAssignment (ClassID, SCID, TeacherID,Title, Description,  DueDate, CreatedDate)
      VALUES ('${ClassID}', '${SCID}','${TeacherID}', '${Title}', '${Description}',  '${DueDate}', GETDATE());
    `;
    await pool.query(insertQuery);

    res.status(201).send("Assignment saved successfully.");
  } catch (error) {
    console.error("Error saving assignment:", error);
    res.status(500).send("Error saving assignment.");
  }
});

app.post("/SaveStudentGrade", async (req, res) => {
  try {
    const { StudentID, ClassID,SubjectName, AssignmentType, AssignmentName, ObtainedMarks, TotalMarks } = req.body;

    if (!StudentID || !ClassID || !SubjectName || !AssignmentType || !AssignmentName || !ObtainedMarks || !TotalMarks) {
      return res.status(400).send("All fields are required.");
    }

   
    console.log("Received Data:", req.body);

    const pool = await sql.connect(config);

    
    const subjectQuery = `
      SELECT SCID 
      FROM Subjects 
      WHERE SubjectName = '${SubjectName}';
    `;
    const subjectResult = await pool.query(subjectQuery);
    if (subjectResult.recordset.length === 0) {
      return res.status(404).send("Subject not found for the provided SubjectName.");
    }

    const SCID = subjectResult.recordset[0].SCID;

    
    const query = `
      INSERT INTO grades (StudentID, ClassID, SCID, AssignmentType, AssignmentName, ObtainedMarks, TotalMarks)
      VALUES ('${StudentID}', '${ClassID}', '${SCID}', '${AssignmentType}', '${AssignmentName}', ${ObtainedMarks}, ${TotalMarks});
    `;

    console.log("Executing SQL Query:", query);  

    await pool.query(query);
    res.status(200).send("Grade saved successfully.");
  } catch (error) {
    console.error("Error saving grade:", error);
    res.status(500).send("Error saving grade.");
  }
});


app.get("/GetAssignments/:studentId", async (req, res) => {
  const { studentId } = req.params;
  try {
    const pool = await sql.connect(config);

    const pendingQuery = `
      SELECT a.AssignmentID, a.Title, a.Description, sub.SubjectName, a.DueDate
      FROM CreateAssignment a
      JOIN Student_Subjects s ON a.SCID = s.SCID
      JOIN Classes c ON a.ClassID = c.ClassID
      JOIN Subjects sub ON sub.SCID = a.SCID
      WHERE c.ClassName = (
        SELECT Class FROM Admissions WHERE StudentID = '${studentId}'
      ) AND NOT EXISTS (
        SELECT 1 FROM Submissions WHERE Submissions.AssignmentID = a.AssignmentID AND Submissions.StudentID = '${studentId}'
      )
    `;

    const submittedQuery = `
      SELECT s.AssignmentID, a.Title, a.Description, sub.SubjectName, a.DueDate, s.FileLink, s.SubmittedDate
      FROM Submissions s
      JOIN CreateAssignment a ON s.AssignmentID = a.AssignmentID
      JOIN Subjects sub ON a.SCID = sub.SCID
      WHERE s.StudentID = '${studentId}'
    `;

    const pendingAssignments = (await pool.query(pendingQuery)).recordset;
    const submittedAssignments = (await pool.query(submittedQuery)).recordset;

    res.status(200).send({
      pendingAssignments,
      submittedAssignments,
    });
  } catch (error) {
    console.error("Error retrieving assignments:", error);
    res.status(500).send("Error retrieving assignments.");
  }
});



app.post("/SaveSubmission", async (req, res) => {
  const { assignmentID, studentID, filePath, title } = req.body;
  if (!assignmentID || !studentID || !filePath || !title) {
      return res.status(400).json({ error: "Invalid input: All fields are required." });
  }

  try {
      const pool = await sql.connect(config);

      await pool.query(`
          INSERT INTO Submissions (AssignmentID, StudentID, Title,FileLink, SubmittedDate)
          VALUES ('${assignmentID}', '${studentID}', '${title}','${filePath}', GETDATE())
      `);

      res.status(200).send("Assignment submitted successfully.");
  } catch (error) {
      console.error("Error saving submission:", error);
      res.status(500).send("Error saving submission.");
  }
});

app.get("/ClassSchedule/:studentId", async (req, res) => {
  const { studentId } = req.params;
  try {
    console.log("Received studentId:", studentId);

    const pool = await sql.connect(config);

    const ClassSchedule = `
      SELECT 
        cs.ClassID, 
        cs.Subject1, cs.Slot1, 
        cs.Subject2, cs.Slot2, 
        cs.Subject3, cs.Slot3, 
        cs.Subject4, cs.Slot4, 
        cs.Subject5, cs.Slot5, 
        cs.Subject6, cs.Slot6 
      FROM ClassSchedule cs
      WHERE cs.ClassID = (
        SELECT c.ClassID 
        FROM Classes c
        INNER JOIN Admissions a ON a.Class = c.ClassName
        WHERE a.StudentID = @studentId
      )
    `;

    console.log("Generated SQL Query:", ClassSchedule);

    const scheduleResult = await pool.request()
      .input('studentId', sql.VarChar, studentId)
      .query(ClassSchedule);

    console.log("Class Schedule Data:", scheduleResult.recordset);

    if (scheduleResult.recordset.length === 0) {
      return res.status(404).send({ message: "Class schedule not found for the given student ID." });
    }

    res.status(200).send(scheduleResult.recordset);
  } catch (error) {
    console.error("Error retrieving schedule:", error);
    res.status(500).send("Error retrieving schedule.");
  }
});




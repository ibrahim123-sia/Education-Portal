create database EducationSystem 

select * from AuditLog
select * from AdminLogin
select * from Announcements
select * from Teachers
select * from TeacherCredential
select * from TeacherAttendance
select * from Teacher_Subjects
select * from TeacherAddresses
select * from TeacherSchedule
select * from grades
select * from CreateAssignment
select * from Students
select * from TuitionFee
select * from Admissions
select * from Student_Subjects
select * from Addresses
select * from StudentCredential
select * from Submissions 
select * from StudentAttendance
select * from ClassSchedule
select * from Classes
select * from Subjects

CREATE TABLE grades (
    GradeID INT IDENTITY(1,1) PRIMARY KEY,
    StudentID VARCHAR(50) FOREIGN KEY REFERENCES students(StudentID),
    ClassID VARCHAR(3) FOREIGN KEY REFERENCES Classes(ClassID),
    SCID VARCHAR(10) FOREIGN KEY REFERENCES subjects(SCID),
    AssignmentType VARCHAR(50) NOT NULL,
	AssignmentName VARCHAR(50) NOT NULL,
    ObtainedMarks decimal(10,2) NOT NULL,
    TotalMarks INT NOT NULL,
);

CREATE TABLE Submissions (
    SubmissionID INT PRIMARY KEY IDENTITY(1,1),
    AssignmentID INT FOREIGN KEY REFERENCES CreateAssignment(AssignmentID),
    StudentID VARCHAR(50) FOREIGN KEY REFERENCES Students(StudentID),
	Title Varchar (50),
    FileLink VARCHAR(MAX) NOT NULL, 
	SubmittedDate DATE DEFAULT GETDATE(),
);


CREATE TABLE CreateAssignment (
    AssignmentID INT PRIMARY KEY IDENTITY(1,1),
	ClassID VARCHAR(3)  FOREIGN KEY (classID) REFERENCES Classes(ClassID),
	SCID VARCHAR(10)  FOREIGN KEY REFERENCES Subjects(SCID),
    TeacherID VARCHAR(50) FOREIGN KEY  REFERENCES Teachers(TeacherID),
    Title VARCHAR(255) NOT NULL,
    Description VARCHAR(MAX) NOT NULL,
    DueDate DATE NOT NULL,
    createdDate DATE DEFAULT GETDATE(),
);




CREATE TABLE TeacherSchedule (
    ScheduleID INT PRIMARY KEY,
    TeacherID VARCHAR(50) foreign key references Teachers(TeacherID),
    DayOfWeek VARCHAR(50),
    TimeSlot VARCHAR(50),
    Subject VARCHAR(50),
    Class VARCHAR(50)
);


CREATE TABLE StudentAttendance (
    AttendanceID INT IDENTITY(1,1) PRIMARY KEY, 
    StudentID varchar(50) foreign key references Students(StudentID),                    
    SubjectName VARCHAR(255) NOT NULL,         
    AttendanceDate DATE NOT NULL,               
    Status VARCHAR(50) NOT NULL          
);


INSERT INTO TeacherSchedule (ScheduleID,TeacherID, DayOfWeek, TimeSlot, Subject, Class)
VALUES 
(6,'T001-BI11', 'Thursday', '8:00-8:45', 'Biology', 'Class 9'),
(7,'T001-BI11', 'Friday', '8:00-8:45', 'Biology', 'Class 10')

SELECT  t.SCID,t.TeacherID,ts.SubjectName,ts.ClassID
      FROM Teacher_Subjects t
      JOIN Subjects ts ON t.SCID = ts.SCID
      WHERE t.TeacherID = 'T001-BI11'
select * from Student_Subjects s join Teacher_Subjects t on s.SCID=t.SCID
where t.TeacherID='T001-BI11'

CREATE TABLE ClassSchedule (
  ClassID VARCHAR(3) foreign key references Classes(ClassID),
  Subject1 VARCHAR(50),
  Slot1 VARCHAR(50),
  Subject2 VARCHAR(50),
  Slot2 VARCHAR(50),
  Subject3 VARCHAR(50),
  Slot3 VARCHAR(50),
  Subject4 VARCHAR(50),
  Slot4 VARCHAR(50),
  Subject5 VARCHAR(50),
  Slot5 VARCHAR(50),
  Subject6 VARCHAR(50),
  Slot6 VARCHAR(50)
);


CREATE TABLE Announcements (
    AnnouncementID INT PRIMARY KEY identity(1,1),
    Title VARCHAR(50) NOT NULL,
    TargetAudience VARCHAR(50), 
    Description VARCHAR(MAX) NOT NULL,
    StatDate DATE NOT NULL, 
    EndDate DATE NOT NULL   
);SELECT * FROM Announcements WHERE TargetAudience='Students'

CREATE TABLE TeacherAttendance (
  AttendanceID INT PRIMARY KEY IDENTITY(1,1),
  TeacherID varchar(50) foreign key references Teachers(TeacherID),
  FirstName NVARCHAR(100) NOT NULL,  
  LastName NVARCHAR(100) NOT NULL, 
  AttendanceDate DATE unique  NOT NULL,  
  Status NVARCHAR(20) NOT NULL,  
  
);


CREATE TABLE Teachers (
    TeacherID VARCHAR(50) PRIMARY KEY,
    FirstName VARCHAR(100) NOT NULL,
    LastName VARCHAR(100) NOT NULL,
    Gender VARCHAR(10) NOT NULL,
    DOB DATE NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    PhoneNumber VARCHAR(15) NOT NULL UNIQUE,
    CNIC VARCHAR(15) NOT NULL UNIQUE,
);


CREATE TABLE TeacherAddresses (
    AddressID INT IDENTITY(1,1) PRIMARY KEY,
    TeacherID VARCHAR(50) FOREIGN KEY REFERENCES Teachers(TeacherID),
    City VARCHAR(100) NOT NULL,
    State VARCHAR(100) NOT NULL,
    PostalCode VARCHAR(10) NOT NULL,
    AddressType VARCHAR(50) NOT NULL,
    HouseNo VARCHAR(50) NOT NULL, 
);


CREATE TABLE Qualifications (
    QualificationID INT IDENTITY(1,1) PRIMARY KEY,
    TeacherID VARCHAR(50) FOREIGN KEY REFERENCES Teachers(TeacherID),
    Degree VARCHAR(100) NOT NULL,
    Institution VARCHAR(200) NOT NULL,
    DateCompleted DATE NOT NULL
);
drop procedure UpdateQualificationRecord


CREATE TABLE TeacherCredential (
    CredentialID INT IDENTITY(1,1) PRIMARY KEY,
    TeacherID VARCHAR(50) FOREIGN KEY  REFERENCES Teachers(TeacherID),
    Password VARCHAR(50) NOT NULL,    
);


CREATE TABLE TuitionFee (
    ReceiptID Varchar(50) PRIMARY KEY,               
    StudentID Varchar(50) foreign key references Students(StudentID),                  
    TotalFee DECIMAL(10, 2) NOT NULL,        
    PaidAmount DECIMAL(10, 2) NOT NULL,      
    RemainingBalance DECIMAL(10, 2) NOT NULL,
    PaymentDate DATE NOT NULL,              
    PaymentStatus NVARCHAR(50) NOT NULL,
);


CREATE TABLE AdminLogin (
    AdminUserID VARCHAR(50) PRIMARY KEY, 
    AdminPassword VARCHAR(255) NOT NULL, 
	
);


CREATE TABLE Students (
    StudentID VARCHAR(50) PRIMARY KEY,
    FirstName VARCHAR(100) NOT NULL,
    LastName VARCHAR(100) NOT NULL,
    Age INT CHECK (Age >= 3 AND Age <= 16),
    Gender VARCHAR(10) CHECK (Gender IN ('Male', 'Female')),
    Email VARCHAR(100) UNIQUE NOT NULL,
    Phone VARCHAR(15) UNIQUE NOT NULL,
    DOB DATE NOT NULL
);

CREATE TABLE Addresses (
    AddressID INT IDENTITY(1,1) PRIMARY KEY,
    StudentID VARCHAR(50) NOT NULL,
    HouseNo VARCHAR(50) NOT NULL,
    Street VARCHAR(100) NOT NULL,
    City VARCHAR(100) NOT NULL,
    FOREIGN KEY (StudentID) REFERENCES Students(StudentID) ON DELETE CASCADE
);


CREATE TABLE Guardians (
    GuardianID INT IDENTITY(1,1) PRIMARY KEY,
    StudentID VARCHAR(50) NOT NULL,
    GuardianName VARCHAR(100) NOT NULL,
    GuardianContact VARCHAR(15) NOT NULL,
    Relationship VARCHAR(50) NOT NULL,
    FOREIGN KEY (StudentID) REFERENCES Students(StudentID) ON DELETE CASCADE
);

CREATE TABLE Admissions (
    AdmissionID INT IDENTITY(1,1) PRIMARY KEY,
    StudentID VARCHAR(50) NOT NULL,
    DateOfAdmission DATE NOT NULL,
    Class VARCHAR(50) NOT NULL,
    Section VARCHAR(10) NOT NULL,
    FOREIGN KEY (StudentID) REFERENCES Students(StudentID) ON DELETE CASCADE
);


CREATE TABLE StudentCredential (
    CredentialID INT IDENTITY(1,1) PRIMARY KEY,
    StudentID VARCHAR(50) NOT NULL,
    Password VARCHAR(100) NOT NULL,
    FOREIGN KEY (StudentID) REFERENCES Students(StudentID) ON DELETE CASCADE
);


CREATE TABLE Subjects (
    SCID VARCHAR(10) PRIMARY KEY , 
    ClassID varchar(3) FOREIGN KEY REFERENCES Classes(ClassID),
    SubjectName VARCHAR(100)
);


CREATE TABLE Student_Subjects (
	SCID VARCHAR(10)FOREIGN KEY REFERENCES Subjects(SCID),
    StudentID VARCHAR(50) foreign key references Students(StudentID),
	ClassID varchar(3) FOREIGN KEY REFERENCES Classes(ClassID),  
	FirstName VARCHAR(100),
	LastName  VARCHAR(100),
	
);

CREATE TABLE Teacher_Subjects (
    TeacherID VARCHAR(50) FOREIGN KEY REFERENCES Teachers(TeacherID),
    SCID VARCHAR(10) FOREIGN KEY REFERENCES Subjects(SCID),
);



INSERT INTO Subjects (SCID, ClassID, SubjectName)
VALUES
('ENG00', 'KG', 'English'),
('MATH00', 'KG', 'Mathematics'),
('ART00', 'KG', 'Art & Craft'),
('GA00', 'KG', 'General Awareness'),('DW01', 'KG', 'Drawing');


INSERT INTO Subjects (SCID, ClassID, SubjectName)
VALUES
('ENG01', 'C1', 'English'),
('MATH01', 'C1', 'Mathematics'),
('SCI01', 'C1', 'Science'),
('SST01', 'C1', 'Social Studies'),
('ISL01', 'C1', 'Islamiat');

INSERT INTO Subjects (SCID, ClassID, SubjectName)
VALUES
('ENG02', 'C2', 'English'),
('MATH02', 'C2', 'Mathematics'),
('SCI02', 'C2', 'Science'),
('SST02', 'C2', 'Social Studies'),
('ISL02', 'C2', 'Islamiat');

INSERT INTO Subjects (SCID, ClassID, SubjectName)
VALUES
('ENG03', 'C3', 'English'),
('MATH03', 'C3', 'Mathematics'),
('SCI03', 'C3', 'Science'),
('SST03', 'C3', 'Social Studies'),
('URD03', 'C3', 'Urdu'),
('ISL03', 'C3', 'Islamiat'),
('PAK03', 'C3', 'Pakistan Studies');

INSERT INTO Subjects (SCID, ClassID, SubjectName)
VALUES
('ENG04', 'C4', 'English'),
('MATH04', 'C4', 'Mathematics'),
('SCI04', 'C4', 'Science'),
('SST04', 'C4', 'Social Studies'),
('URD04', 'C4', 'Urdu'),
('ISL04', 'C4', 'Islamiat'),
('PAK04', 'C4', 'Pakistan Studies');


INSERT INTO Subjects (SCID, ClassID, SubjectName)
VALUES
('ENG05', 'C5', 'English'),
('MATH05', 'C5', 'Mathematics'),
('SCI05', 'C5', 'Science'),
('SST05', 'C5', 'Social Studies'),
('URD05', 'C5', 'Urdu'),
('ISL05', 'C5', 'Islamiat'),
('PAK05', 'C5', 'Pakistan Studies');

INSERT INTO Subjects (SCID, ClassID, SubjectName)
VALUES
('ENG06', 'C6', 'English'),
('MATH06', 'C6', 'Mathematics'),
('SCI06', 'C6', 'Science'),
('SST06', 'C6', 'Social Studies'),
('URD06', 'C6', 'Urdu'),
('ISL06', 'C6', 'Islamiat'),
('PAK06', 'C6', 'Pakistan Studies');

INSERT INTO Subjects (SCID, ClassID, SubjectName)
VALUES
('ENG07', 'C7', 'English'),
('MATH07', 'C7', 'Mathematics'),
('SCI07', 'C7', 'Science'),
('SST07', 'C7', 'Social Studies'),
('URD07', 'C7', 'Urdu'),
('ISL07', 'C7', 'Islamiat'),
('PAK07', 'C7', 'Pakistan Studies');

INSERT INTO Subjects (SCID, ClassID, SubjectName)
VALUES
('ENG08', 'C8', 'English'),
('MATH08', 'C8', 'Mathematics'),
('SCI08', 'C8', 'Science'),
('SST08', 'C8', 'Social Studies'),
('URD08', 'C8', 'Urdu'),
('ISL08', 'C8', 'Islamiat'),
('PAK08', 'C8', 'Pakistan Studies');

INSERT INTO Subjects (SCID, ClassID, SubjectName)
VALUES
('ENG09', 'C9', 'English'),
('MATH09', 'C9', 'Mathematics'),
('PHY09', 'C9', 'Physics'),
('CHEM09', 'C9', 'Chemistry'),
('BIO09', 'C9', 'Biology'),
('SST09', 'C9', 'Social Studies'),
('ISL09', 'C9', 'Islamiat'),
('PAK09', 'C9', 'Pakistan Studies');

INSERT INTO Subjects (SCID, ClassID, SubjectName)
VALUES
('ENG10', 'C10', 'English'),
('MATH10', 'C10', 'Mathematics'),
('PHY10', 'C10', 'Physics'),
('CHEM10', 'C10', 'Chemistry'),
('BIO10', 'C10', 'Biology'),
('SST10', 'C10', 'Social Studies'),
('ISL10', 'C10', 'Islamiat'),
('PAK10', 'C10', 'Pakistan Studies');



CREATE TABLE Classes (
    ClassID varchar(3) PRIMARY KEY,
    ClassName VARCHAR(50) UNIQUE
);

INSERT INTO Classes
VALUES
('KG', 'Kindergarten'),
('C1', 'Class I'),
('C2', 'Class II'),
('C3', 'Class III'),
('C4', 'Class IV'),
('C5', 'Class V'),
('C6', 'Class VI'),
('C7', 'Class VII'),
('C8', 'Class VIII'),
('C9', 'Class IX'),
('C10', 'Class X');
select * from Student_Subjects
select * from Admissions
select * from Classes
select * from Students



select * from Subjects

PROCEDURES

CREATE PROCEDURE AddAdmissionRecord
    @StudentID VARCHAR(50),
    @StudentPassword VARCHAR(255),
    @FirstName VARCHAR(50),
    @LastName VARCHAR(50),
    @Age INT,
    @Gender VARCHAR(10),
    @Email VARCHAR(100),
    @Phone VARCHAR(20),
    @DOB DATE,
    @HouseNo VARCHAR(50),
    @Street VARCHAR(100),
    @City VARCHAR(50),
    @GuardianName VARCHAR(50),
    @GuardianContact VARCHAR(20),
    @Relationship VARCHAR(50),
    @DateOfAdmission DATE,
    @Class VARCHAR(50),
    @Section VARCHAR(10)
AS
BEGIN
    BEGIN TRANSACTION;

    INSERT INTO Students (StudentID, FirstName, LastName, Age, Gender, Email, Phone, DOB)
    VALUES (@StudentID, @FirstName, @LastName, @Age, @Gender, @Email, @Phone, @DOB);

    INSERT INTO Addresses (StudentID, HouseNo, Street, City)
    VALUES (@StudentID, @HouseNo, @Street, @City);

    INSERT INTO Guardians (StudentID, GuardianName, GuardianContact, Relationship)
    VALUES (@StudentID, @GuardianName, @GuardianContact, @Relationship);

    INSERT INTO Admissions (StudentID, DateOfAdmission, Class, Section)
    VALUES (@StudentID, @DateOfAdmission, @Class, @Section);

    
    INSERT INTO StudentCredential (StudentID, Password)
    VALUES (@StudentID, @StudentPassword);

    COMMIT TRANSACTION;
END;
GO




CREATE PROCEDURE SaveTeacherAttendance
    @TeacherID VARCHAR(50),
    @FirstName VARCHAR(50),
    @LastName VARCHAR(50),
    @AttendanceDate DATE,
    @Status VARCHAR(20)
AS
BEGIN
    BEGIN TRANSACTION;
        SELECT 1
        FROM TeacherAttendance
        WHERE TeacherID = @TeacherID
          AND AttendanceDate = @AttendanceDate
    
    INSERT INTO TeacherAttendance (TeacherID, FirstName, LastName, AttendanceDate, Status)
    VALUES (@TeacherID, @FirstName, @LastName, @AttendanceDate, @Status);

    COMMIT TRANSACTION;
END;
GO

CREATE PROCEDURE AssignSubjectsToStudent
    @StudentID VARCHAR(50),
    @FirstName VARCHAR(50),
    @LastName VARCHAR(50),
    @Class VARCHAR(50)
AS
BEGIN
    
        BEGIN TRANSACTION;

        
        DECLARE @ClassID VARCHAR(50);

        SELECT @ClassID = ClassID
        FROM Classes
        WHERE ClassName = @Class;

       
        IF @ClassID IS NULL
        BEGIN
            PRINT 'Invalid class name.';
            ROLLBACK TRANSACTION;
            RETURN;
        END

        
        INSERT INTO Student_Subjects (SCID, StudentID, ClassID, FirstName, LastName)
        SELECT
            s.SCID,
            @StudentID,
            @ClassID,
            @FirstName,
            @LastName
        FROM Subjects s
        WHERE s.ClassID = @ClassID;

        PRINT 'Subjects assigned successfully.';

        COMMIT TRANSACTION;
    
END;


select * from Student_Subjects

CREATE PROCEDURE AdminLoginProc
    @AdminUserID VARCHAR(50),
    @AdminPassword VARCHAR(255)
AS
BEGIN
    SELECT AdminUserID
    FROM AdminLogin
    WHERE AdminUserID = @AdminUserID AND AdminPassword = @AdminPassword;
END;
GO

CREATE PROCEDURE UpdateFeeRecord
    @StudentID VARCHAR(50),
    @TotalFee DECIMAL(10, 2),
    @PaidAmount DECIMAL(10, 2),
    @RemainingBalance DECIMAL(10, 2),
    @PaymentDate DATE,
    @PaymentStatus VARCHAR(50)
AS
BEGIN
    UPDATE TuitionFee
    SET 
        TotalFee = @TotalFee,
        PaidAmount = @PaidAmount,
        RemainingBalance = @RemainingBalance,
        PaymentDate = @PaymentDate,
        PaymentStatus = @PaymentStatus
    WHERE StudentID = @StudentID;
END;
GO


CREATE PROCEDURE UpdateStudentRecord
	@StudentID VARCHAR(50),
    @FirstName VARCHAR(50),
    @LastName VARCHAR(50),
    @Age INT,
    @Email VARCHAR(100),
    @Gender VARCHAR(10)
AS 
BEGIN 
	UPDATE Students
	SET 
	FirstName=@FirstName,
	LastName=@LastName,
	Age = @Age,
    Email = @Email,
    Gender = @Gender
	WHERE StudentID = @StudentID;
END;
GO

CREATE PROCEDURE UpdateTeacherRecord
    @TeacherID VARCHAR(50),
    @FirstName VARCHAR(50),
    @LastName VARCHAR(50),
    @Gender VARCHAR(10),
    @DOB DATE,
    @Email VARCHAR(100),
    @PhoneNumber VARCHAR(15),
    @CNIC VARCHAR(20)
AS
BEGIN
    UPDATE Teachers
    SET 
        FirstName = @FirstName,
        LastName = @LastName,
        Gender = @Gender,
        DOB = @DOB,
        Email = @Email,
        PhoneNumber = @PhoneNumber,
        CNIC = @CNIC
    WHERE TeacherID = @TeacherID;
END;
GO



CREATE PROCEDURE AddFacultyRecord
    @TeacherID VARCHAR(50),
    @TeacherPassword VARCHAR(255),
    @FirstName VARCHAR(50),
    @LastName VARCHAR(50),
    @Gender VARCHAR(10),
    @DOB DATE,
    @Email VARCHAR(100),
    @Phone VARCHAR(20),
    @CNIC VARCHAR(20),
    @City VARCHAR(50),
    @State VARCHAR(50),
    @PostalCode VARCHAR(10),
    @HouseNo VARCHAR(50),
    @Degree VARCHAR(100),
    @Institution VARCHAR(100),
    @DateCompleted DATE
AS
BEGIN
    BEGIN TRANSACTION;

    INSERT INTO Teachers (TeacherID, FirstName, LastName, Gender, DOB, Email, PhoneNumber, CNIC)
    VALUES (@TeacherID, @FirstName, @LastName, @Gender, @DOB, @Email, @Phone, @CNIC);

    INSERT INTO TeacherAddresses (TeacherID, City, State, PostalCode, HouseNo)
    VALUES (@TeacherID, @City, @State, @PostalCode, @HouseNo);

    INSERT INTO Qualifications (TeacherID, Degree, Institution, DateCompleted)
    VALUES (@TeacherID, @Degree, @Institution, @DateCompleted);

    INSERT INTO TeacherCredential (TeacherID, Password)
    VALUES (@TeacherID, @TeacherPassword);

    COMMIT TRANSACTION;
END;
GO


CREATE PROCEDURE AddFeeRecord
  @ReceiptID VARCHAR(50),
  @StudentID VARCHAR(50),
  @TotalFee DECIMAL(10, 2),
  @PaidAmount DECIMAL(10, 2),
  @RemainingBalance DECIMAL(10, 2),
  @PaymentDate DATE,
  @PaymentStatus VARCHAR(50)
  AS
  BEGIN
	BEGIN TRANSACTION 
		INSERT INTO TuitionFee (
    ReceiptID,
    StudentID, 
    TotalFee,
    PaidAmount,
    RemainingBalance,
    PaymentDate,
    PaymentStatus
  )
  VALUES (
    @ReceiptID,
    @StudentID,
    @TotalFee,
    @PaidAmount,
    @RemainingBalance,
    @PaymentDate,
    @PaymentStatus
    
  );

	COMMIT TRANSACTION 
END
GO
select * from Announcements
CREATE PROCEDURE AddAnnouncementRecord
  @Title VARCHAR(255),
  @Description VARCHAR(max),
  @TargetAudience VARCHAR(255),
  @StartDate DATE,
  @EndDate DATE
AS
BEGIN
  INSERT INTO Announcements (
    Title,
    TargetAudience,
	Description,
    StatDate,
    EndDate
  )
  VALUES (
    @Title,
    @TargetAudience,
	@Description,
    @StartDate,
    @EndDate
  );
END;
GO
CREATE PROCEDURE SaveClassSchedule
  @ClassID VARCHAR(50),
  @Subject1 VARCHAR(100),
  @Slot1 VARCHAR(50),
  @Subject2 VARCHAR(100),
  @Slot2 VARCHAR(50),
  @Subject3 VARCHAR(100),
  @Slot3 VARCHAR(50),
  @Subject4 VARCHAR(100),
  @Slot4 VARCHAR(50),
  @Subject5 VARCHAR(100),
  @Slot5 VARCHAR(50),
  @Subject6 VARCHAR(100),
  @Slot6 VARCHAR(50)
AS
BEGIN
  INSERT INTO ClassSchedule (
    ClassID, 
    Subject1, Slot1, 
    Subject2, Slot2, 
    Subject3, Slot3, 
    Subject4, Slot4, 
    Subject5, Slot5, 
    Subject6, Slot6
  )
  VALUES (
    @ClassID, 
    @Subject1, @Slot1, 
    @Subject2, @Slot2, 
    @Subject3, @Slot3, 
    @Subject4, @Slot4, 
    @Subject5, @Slot5, 
    @Subject6, @Slot6
  );
END;
GO

CREATE PROCEDURE AssignSubjectsToTeacher
    @TeacherID VARCHAR(50),
    @Degree VARCHAR(100)
AS
BEGIN
   
    IF @Degree = 'M.Sc English'
    BEGIN
        INSERT INTO Teacher_Subjects (TeacherID, SCID)
        SELECT @TeacherID, SCID
        FROM Subjects
        WHERE SubjectName = 'English' AND ClassID IN ('C5', 'C6', 'C7', 'C8', 'C9', 'C10');
    END
    ELSE IF @Degree = 'B.Sc English'
    BEGIN
        INSERT INTO Teacher_Subjects (TeacherID, SCID)
        SELECT @TeacherID, SCID
        FROM Subjects
        WHERE SubjectName = 'English' AND ClassID IN ('C1', 'C2', 'C3', 'C4', 'C5');
    END
    ELSE IF @Degree = 'M.Sc Mathematics'
    BEGIN
        INSERT INTO Teacher_Subjects (TeacherID, SCID)
        SELECT @TeacherID, SCID
        FROM Subjects
        WHERE SubjectName = 'Mathematics' AND ClassID IN ('C6', 'C7', 'C8', 'C9', 'C10');
    END
    ELSE IF @Degree = 'B.Sc Mathematics'
    BEGIN
        INSERT INTO Teacher_Subjects (TeacherID, SCID)
        SELECT @TeacherID, SCID
        FROM Subjects
        WHERE SubjectName = 'Mathematics' AND ClassID IN ('C1', 'C2', 'C3', 'C4', 'C5');
    END
    ELSE IF @Degree = 'M.Sc Physics'
    BEGIN
        INSERT INTO Teacher_Subjects (TeacherID, SCID)
        SELECT @TeacherID, SCID
        FROM Subjects
        WHERE SubjectName = 'Physics' AND ClassID IN ('C9', 'C10');
    END
    ELSE IF @Degree = 'B.Sc Physics'
    BEGIN
        INSERT INTO Teacher_Subjects (TeacherID, SCID)
        SELECT @TeacherID, SCID
        FROM Subjects
        WHERE SubjectName = 'Physics' AND ClassID IN ('C9');
    END
    ELSE IF @Degree = 'M.Sc Chemistry'
    BEGIN
        INSERT INTO Teacher_Subjects (TeacherID, SCID)
        SELECT @TeacherID, SCID
        FROM Subjects
        WHERE SubjectName = 'Chemistry' AND ClassID IN ('C9', 'C10');
    END
    ELSE IF @Degree = 'B.Sc Chemistry'
    BEGIN
        INSERT INTO Teacher_Subjects (TeacherID, SCID)
        SELECT @TeacherID, SCID
        FROM Subjects
        WHERE SubjectName = 'Chemistry' AND ClassID IN ('C9');
    END
    ELSE IF @Degree = 'M.Sc Biology'
    BEGIN
        INSERT INTO Teacher_Subjects (TeacherID, SCID)
        SELECT @TeacherID, SCID
        FROM Subjects
        WHERE SubjectName = 'Biology' AND ClassID IN ('C9', 'C10');
    END
    ELSE IF @Degree = 'B.Sc Biology'
    BEGIN
        INSERT INTO Teacher_Subjects (TeacherID, SCID)
        SELECT @TeacherID, SCID
        FROM Subjects
        WHERE SubjectName = 'Biology' AND ClassID IN ('C9');
    END
    ELSE IF @Degree = 'B.A History'
    BEGIN
        INSERT INTO Teacher_Subjects (TeacherID, SCID)
        SELECT @TeacherID, SCID
        FROM Subjects
        WHERE SubjectName = 'Social Studies' AND ClassID IN ('C6', 'C7', 'C8', 'C9', 'C10');
    END
    ELSE IF @Degree = 'M.A History'
    BEGIN
        INSERT INTO Teacher_Subjects (TeacherID, SCID)
        SELECT @TeacherID, SCID
        FROM Subjects
        WHERE SubjectName = 'Social Studies' AND ClassID IN ('C9', 'C10');
    END
    ELSE IF @Degree = 'B.A Geography'
    BEGIN
        INSERT INTO Teacher_Subjects (TeacherID, SCID)
        SELECT @TeacherID, SCID
        FROM Subjects
        WHERE SubjectName = 'General Awareness' AND ClassID IN ('KG', 'C1', 'C2');
    END
    ELSE IF @Degree = 'M.A Geography'
    BEGIN
        INSERT INTO Teacher_Subjects (TeacherID, SCID)
        SELECT @TeacherID, SCID
        FROM Subjects
        WHERE SubjectName = 'General Awareness' AND ClassID IN ('C3', 'C4', 'C5');
    END
    ELSE IF @Degree = 'B.Sc Computer Science'
    BEGIN
        INSERT INTO Teacher_Subjects (TeacherID, SCID)
        SELECT @TeacherID, SCID
        FROM Subjects
        WHERE SubjectName = 'Computer Science' AND ClassID IN ('C9', 'C10');
    END
    ELSE IF @Degree = 'M.A Urdu' OR @Degree = 'B.A Urdu'
    BEGIN
        INSERT INTO Teacher_Subjects (TeacherID, SCID)
        SELECT @TeacherID, SCID
        FROM Subjects
        WHERE SubjectName = 'Urdu';
    END
    ELSE IF @Degree = 'M.A Islamiat' OR @Degree = 'B.A Islamiat'
    BEGIN
        INSERT INTO Teacher_Subjects (TeacherID, SCID)
        SELECT @TeacherID, SCID
        FROM Subjects
        WHERE SubjectName = 'Islamiat';
    END
    ELSE IF @Degree = 'Diploma in Art and Craft'
    BEGIN
        INSERT INTO Teacher_Subjects (TeacherID, SCID)
        SELECT @TeacherID, SCID
        FROM Subjects
        WHERE SubjectName = 'Art and Craft';
    END
    ELSE IF @Degree = 'Diploma in Drawing'
    BEGIN
        INSERT INTO Teacher_Subjects (TeacherID, SCID)
        SELECT @TeacherID, SCID
        FROM Subjects
        WHERE SubjectName = 'Drawing';
    END
END;

select * from Qualifications


select * from Teacher_Subjects
CREATE TABLE AuditLog (
    AuditID INT IDENTITY PRIMARY KEY,
    TableName VARCHAR(255),
    Operation VARCHAR(50),
    SUser VARCHAR(255),
    LogDate DATETIME DEFAULT GETDATE()
);
select * from AuditLog
select * from Students
select * from TuitionFee

create trigger Log_Table_insert_Qualification
on Qualifications after insert 
as
begin 
	insert into AuditLog (TableName,Operation,SUser)
	values('Qualification','INSERT',SYSTEM_USER)
END
create trigger Log_Table_UPDATE_Qualification
on Qualifications after update 
as
begin 
	insert into AuditLog (TableName,Operation,SUser)
	values('Qualification','UPDATE',SYSTEM_USER)
END
create trigger Log_Table
on Students after insert 
as
begin 
	insert into AuditLog (TableName,Operation,SUser)
	values('Students','INSERT',SYSTEM_USER)
END

CREATE TRIGGER trg_UpdateLog
ON Students 
AFTER UPDATE
AS
BEGIN
    INSERT INTO AuditLog (TableName, Operation, SUser)
    VALUES ('Students', 'UPDATE', SYSTEM_USER);
END;

CREATE TRIGGER InsertLog_Teachers
ON Teachers
AFTER INSERT
AS
BEGIN
    INSERT INTO AuditLog (TableName, Operation, SUser)
    VALUES ('Teachers', 'INSERT', SYSTEM_USER);
END;

CREATE TRIGGER UpdateLog_Teachers
ON Teachers
AFTER UPDATE
AS
BEGIN
    INSERT INTO AuditLog (TableName, Operation, SUser)
    VALUES ('Teachers', 'UPDATE', SYSTEM_USER);
END;

CREATE TRIGGER InsertLog_TuitionFee
ON TuitionFee
AFTER INSERT
AS
BEGIN
    INSERT INTO AuditLog (TableName, Operation, SUser)
    VALUES ('TuitionFee', 'INSERT', SYSTEM_USER);
END;

CREATE TRIGGER UpdateLog_TuitionFee
ON TuitionFee
AFTER UPDATE
AS
BEGIN
    INSERT INTO AuditLog (TableName, Operation, SUser)
    VALUES ('TuitionFee', 'UPDATE', SYSTEM_USER);
END;
# # python - sql server connection
import pyodbc
import re
import logging

# Create logger
logger = logging.getLogger(__name__)
# sql server connection
server = 'PSL-2N57XM3'
database = 'EmployeeInfo'
con = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER=' + server + ';DATABASE=' + database + ';Trusted_Connection=yes;')

# Create a cursor object to interact with the database
cursor = con.cursor()

#  SKILL TABLE
# Function to add a new skill to the table
def add_skill(skill_name):
    # Create the Skill table
    cursor.execute("""
        IF NOT EXISTS (
            SELECT *
            FROM INFORMATION_SCHEMA.TABLES
            WHERE TABLE_NAME = 'Skills'
        )
        CREATE TABLE Skills (
            ID INT IDENTITY(1,1) PRIMARY KEY,
            Skill VARCHAR(50) UNIQUE
        );
    """)

    # Commit the transaction
    con.commit()

    # Check if the skill already exists in the table
    try:
        cursor.execute("SELECT ID FROM Skills WHERE Skill = ?", skill_name)
        result = cursor.fetchone()

        if result is None:
            # Skill does not exist, insert a new row
            cursor.execute("INSERT INTO Skills (Skill) VALUES (?)", skill_name)
            con.commit()
            logger.info("Skill added in table")
        else:
            # Skill already exists, print a message
            logger.error(f"Skill already exists in table")

    except Exception as e:
        con.rollback()
        logger.error(f"Error adding skill to table: {e}")


# EMPLOYEE TABLE
def add_personal_info(employee_id,email, first_name, last_name, Contact_no, experience, gender):
    cursor.execute("""
        IF NOT EXISTS (
            SELECT *
            FROM INFORMATION_SCHEMA.TABLES
            WHERE TABLE_NAME = 'Employee'
        )
        CREATE TABLE Employee (
            Id INT PRIMARY KEY,
            First_name VARCHAR(255),
            Last_name VARCHAR(255),
            Email VARCHAR(255),
            Contact VARCHAR(255),
            WorkEx VARCHAR(255),
            Gender VARCHAR(255)
        );
    """)

    # Commit the transaction
    con.commit()

    cursor.execute("SELECT Contact,WorkEx FROM Employee WHERE Id = ?", employee_id)
    result = cursor.fetchone()

    if result is None:
        try:
            cursor.execute("INSERT INTO Employee (Id, First_name, Last_name, Email, Contact, WorkEx, Gender) VALUES (?, ?, ?, ?, ?, ?, ?)",
                        (employee_id, first_name, last_name, email, Contact_no, experience, gender))
            con.commit()
            logger.info("Personal Info added")
        except Exception as e:
            con.rollback()
            logger.error(f"Error adding employee: {e}")
    else:
        try:
            existing_contact = result[0]
            existing_experience = result[1]
            # Update the contact number if it has changed
            if Contact_no and Contact_no != existing_contact:
                cursor.execute("UPDATE Employee SET Contact = ? WHERE Id = ?", (Contact_no, employee_id))         
            # Update the experience 
            if existing_experience:
                num1, unit1 = re.match(r"(\d+)\+?\s+(\w+)", existing_experience).groups()
            else:
                num1 = 0
                unit1 = ""
            if experience:
                num2, unit2 = re.match(r"(\d+)\+?\s+(\w+)", experience).groups()
            else:
                num2 = 0
                unit2 = ""

            # convert the numeric values to integers so that they can be compared
            num1 = int(num1)
            num2 = int(num2)

            # convert the units of time to a common scale (e.g. months)
            if unit1 == "year" or unit1 == "years":
                num1 *= 12
            if unit2 == "year" or unit2 == "years":
                num2 *= 12
            # print(str(num1)+" "+unit1+str(num2)+" "+unit2+"-=================================")
            # now you can compare the two numeric values
            if num1 > num2:
                logger.info("Existing experience is greater than the current experience")
            elif num1 == num2:
                logger.info("Existing experience is same as the current experience")
            else:
                logger.info("Existing experience is less than the current experience")
                cursor.execute("UPDATE Employee SET WorkEx = ? WHERE Email = ?", (experience, email))
            con.commit()
            
        except Exception as e:
            con.rollback()
            logger.error(f"Error updating employee: {e}")
       

def employeeSkill(skill, EmpID):
    cursor.execute("""
        IF NOT EXISTS (
            SELECT *
            FROM INFORMATION_SCHEMA.TABLES
            WHERE TABLE_NAME = 'EmployeeSkill'
        )
        CREATE TABLE EmployeeSkill(
        ID INT IDENTITY(1,1),
        EmpID INT,
        SkillID INT,
        FOREIGN KEY (EmpID) REFERENCES Employee(Id) ON DELETE CASCADE,
        FOREIGN KEY (SkillID) REFERENCES Skills(ID),
        PRIMARY KEY (EmpID, Skillid)
        );
    """)
    con.commit()
    try:
        cursor.execute("SELECT ID FROM Skills WHERE Skill = ?", skill)
        skillID = cursor.fetchone()[0]

        cursor.execute("IF NOT EXISTS (SELECT * FROM EmployeeSkill WHERE EmpID = ? AND SkillID = ?) \
                            INSERT INTO EmployeeSkill (EmpID, SkillID) VALUES (?, ?)",
                            (EmpID, skillID, EmpID, skillID))
        con.commit()
        logger.info("Employee Skill added")
    except Exception as e:
        con.rollback()
        logger.error(f"Error adding employee skill: {e}")

def employeeBookedDeleteRecord(employee_ids):
    # query the INFORMATION_SCHEMA.TABLES view to check if the employee table exists
    cursor.execute("SELECT COUNT(*) FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'employee'")
    if cursor.fetchone()[0] == 1:
        # employee table exists
        if employee_ids:
            con.execute("DELETE FROM employee WHERE Id NOT IN ({})".format(",".join(str(i) for i in employee_ids)))
            con.commit()
        else:
            print("No employee IDs found in the working directory")
    else:
        print("The employee table does not exist in the database")
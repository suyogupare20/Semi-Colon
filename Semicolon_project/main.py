import os
import re
from chatGpt import resumeInfo
from sql import add_skill,add_personal_info,employeeSkill, employeeBookedDeleteRecord
import logging

logger = logging.getLogger(__name__)
def main():
    # Get current directory path
    current_path = os.getcwd()

    # Get a list of all the files in the folder
    files = os.listdir(current_path)

    # Filter the list to include only PDF files
    pdf_files = [file for file in files if file.endswith(".pdf")]

    # Print the list of PDF files
    print(pdf_files)
    employee_ids = []
    for file in pdf_files:
        match = re.search(r"^\d+", file)
        if match:
            employee_id = int(match.group())
            employee_ids.append(employee_id)
    # Delete the employee record from DB which are assigned to project
    employeeBookedDeleteRecord(employee_ids)

    for file in pdf_files:
        # Join current directory path with filename
        file_path = os.path.join(current_path, file)
        # get EmployeeID from resumeName
        match = re.search(r"^\d+", file)
        if match:
            employee_id = int(match.group())
            print(employee_id)
            try:
                logger.info("Valid employee ID:", employee_id)
                # get skills from resume using chatGPT
                response = resumeInfo(file_path)
                print(response)
                # Extract skills
                skills_text = re.findall(r"Skills: (.+)\n", response)[0]
                if(skills_text):
                    skills_list = [s.strip() for s in skills_text.split(",")]
                    logger.info("Candidate's skills: ",skills_list)
                    print(skills_list)
                else:
                    skills_list = ["NA"]
                    logger.error("No skills")
                    

                #Extract email address
                email = re.findall(r"Email Address: (.+)\n", response)[0]
                if(email):
                    email = [s.strip() for s in email.split(",")]
                    logger.info("Candidate's Email ID: ",email)
                else:
                    email = "NA"
                    logger.error("No email provided")

                #Extract Candidate's Name
                Candidate_Name = re.findall(r"Candidate Name: (.+)\n", response)[0]
                if Candidate_Name:
                    # Split the name into first name and last name
                    name_parts = [s.strip() for s in Candidate_Name.split()]
                    if len(name_parts) >= 2:
                        first_name = name_parts[0]
                        last_name = ' '.join(name_parts[1:])
                        print(f"Candidate's First Name: {first_name} ")
                        print(f"Candidate's Last Name: {last_name}")
                    else:
                        first_name = name_parts[0]
                        last_name = ""
                        logger.info(f"Candidate's Name: {first_name} {last_name}")
                else: 
                    first_name = "NA"
                    last_name = "NA"
                    logger.error("Candidate's name not found")


                #Extract Candidate's Contact Number
                Contact_no = re.findall(r"Contact Number: (.+)\n", response)[0]
                if(Contact_no):
                    Contact_no = [s.strip() for s in Contact_no.split(",")]
                    logger.info("Contact Number: ",Contact_no)
                else:
                    Contact_no = "NA"
                    logger.error("No contact provided")

                #Extract Candidate's Year's of Experience:
                years_of_experience = re.findall(r"Years of Experience: ?(\d+(\.\d+)?\+? year[s]?)? ?(\d+ month[s]?)?", response)
                if years_of_experience:
                    years, months = years_of_experience[0][0], years_of_experience[0][2]
                    if years or months:
                        experience = f"{years} {months}".strip()
                        logger.info("Year's of Experience: ",experience)
                    else:
                        logger.error("Years of experience not found.")
                else:
                    experience = "NA"
                    logger.error("Years of experience not found.")

                #Extract Candidate's Gender
                gender_match = re.search(r"Gender:\s*(.+)", response)
                if gender_match:
                    gender = gender_match.group(1)
                    logger.info(f"Gender: {gender}")
                else:
                    gender = "NA"
                    logger.error("Gender not mentioned")

                # Add skill to store in skill DB
                for skill in skills_list:
                    add_skill(skill.lower())
                # Add personal info in addemployee table
                add_personal_info(employee_id,email[0],first_name,last_name,Contact_no[0],experience,gender)

                # create employeeSkill table
                for skill in skills_list:
                    employeeSkill(skill,employee_id)

            except Exception as e:
                logger.error(f"Error processing file: {file}. {e}")
        else:
            logger.error(f"Invalid employee ID, please enter correct filename for: {file}")
            continue

main()

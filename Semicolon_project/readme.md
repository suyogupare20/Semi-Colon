## pip install pdfminer.six
- Using pdfminer you can easily extract text from PDF files

## pip install pyodbc
- pyodbc is an open source Python module that makes accessing ODBC databases simple. 
- pyodbc is an open-source Python library that provides an interface to connect Python to different databases, including SQL Server
- It implements the DB API 2.0 specification but is packed with even more Pythonic convenience.
    ```
    pip install pyodbc
    ```
- To connect to the SQL server db use following connection string syntax
    - `For Window's authentication`
    ```
    con = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER=' + server + ';DATABASE=' + database + ';Trusted_Connection=yes;')
    ```
    - `For server authentication`
    ```
    conn = pyodbc.connect('DRIVER={ODBC Driver 18 for SQL Server};SERVER=test;DATABASE=test;UID=user PWD=password')
    ```
## pip install openai
- OpenAI Python library provides a simple and convenient way to send requests to the API and handle the responses.
    - To install the OpenAI Python library, you can use pip:
    ```
    pip install openai
    ```
    - Once you have installed the library, you can set up the OpenAI API client in your Python code:
    ```
    import openai

    # Replace YOUR_API_KEY with your actual API key
    openai.api_key = "YOUR_API_KEY"
    ```

    - Send message to chatGpt 
    ```
    Response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=prompt + "\n" + text+ "\n" + "Response Format: "+response_format,
            max_tokens=1024,
            n=1,
            stop=None,
            temperature=0.5,
        )
    ```
    - `prompt` field specifies the message to send to the ChatGPT model
    - `max_tokens` field specifies the maximum number of tokens (words or characters) that the model should generate in response.
    - `temperature` field controls the "creativity" of the model. A higher temperature value will result in more unpredictable and varied responses, while a lower temperature value will produce more predictable and repetitive responses.

## Configuration file parser in Python (configparser)
- The configparser module from Python's standard library defines functionality for reading and writing configuration files as used by Microsoft Windows OS. Such files usually have .INI extension


## Extracting fields like skills, personal info etc manually by using regex
```
# def find_match(file_path):
#     # Create a ConfigParser object and read the config file
#     config = configparser.ConfigParser()
#     config.read('config.txt')

#     # Get the skill_pattern value from the config file
#     skill_pattern = config.get('regex_patterns', 'skill_pattern')
#     email_pattern = r'[a-z0-9\.\-+_]+@[a-z0-9\.\-+_]+\.[a-z]+'
#     contact_no_pattern = r'[\+\(]?[1-9][0-9 .\-\(\)]{8,}[0-9]'
#     experience_pattern = r"(?<!\S)(?:\d+(?:\.\d+)?|\d\+)\s+(?:years?|yrs?)(?!\S)"

#     # name_pattern = r"^(?P<name>[a-zA-Z' -]+)\s*(\|)?\s*[a-zA-Z' -]*\s*(\||$)"
#     text = extract_text(file_path)
#     text = text.lower()

#     skills = re.findall(skill_pattern, text)
#     emails = re.findall(email_pattern, text)
#     contacts = re.findall(contact_no_pattern, text)
#     experiences = re.findall(experience_pattern,text)

#     # name = re.findall(name_pattern, text, re.MULTILINE)

#     # Remove Duplicates
#     print("-------------------------------------------")
#     skills = list(set(skills))
#     emails = list(set(emails))
#     contacts = list(set(contacts))
#     experiences = list(set(experiences))
#     for skill in skills:
#         if skill:
#             print(skill)
#     for email in emails:
#         if email:
#             print(email)
#     for contact in contacts:
#         if contact:
#             print(contact)
#     for experience in experiences:
#         if experience:
#             print(experience)   

```



## Limitations:
- File name must start with employee ID.
- The RM needs to specify the directory path where the files containing resumes are located.
- Database fields depends on the chatGPT response 
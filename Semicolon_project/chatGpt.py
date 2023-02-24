import openai
import PyPDF2
import re
from pdfminer.high_level import extract_text
from openAIKey import api
import logging

logger = logging.getLogger(__name__)

# Set up OpenAI API credentials
openai.api_key = api

def resumeInfo(filepath):
    try:
        # Open resume PDF and extract text
        text = extract_text(filepath)
        text = re.sub(r'\n\s*\n', '\n\n', text)
        print("---------------------------------------------------------------------------------------")
        # Send text to ChatGPT for analysis
        prompt = "What are all programming skills that are mentioned in the resume?"\
            "Can you extract the email address from this resume choose only one?" \
            "What is the candidate's name in this resume?" \
            "Is there a phone number mentioned in this resume? If yes, what is it?"\
            "Can you please compare the following experiences and tell me which one has the most years of experience?"\
            "Can you find gender of candidate in the resume?"

        # Could you provide me with my maximum years of experience in the industry choose only maximum one?
        response_format = "Skills: \n Email Address: \n Candidate Name: \n Contact Number: \n Years of Experience: months/years\n Gender: "

        Response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=prompt + "\n" + text+ "\n" + "Response Format: "+response_format,
            max_tokens=1024,
            n=1,
            stop=None,
            temperature=0.5,
        )

        Response = Response.choices[0].text.strip()

        logger.info("Response from chatGPT: ",Response)
        return Response
    except Exception as e:
        logger.error(f"Error extracting information from {filepath}: {e}")
        return ""


    # prompt = "What programming languages are mentioned in the resume?"
    # response_format = "list"
    # skillResponse = openai.Completion.create(
    #     engine="text-davinci-003",
    #     prompt=prompt + "\n" + text+"\n"+ "Response Format: "+response_format,
    #     max_tokens=1024,
    #     n=1,
    #     stop=None,
    #     temperature=0.5,
    # )

    # prompt = "Can you extract the email address from this resume?"+"What is the candidate's name in this resume?"+"Is there a phone number mentioned in this resume? If yes, what is it?"
    # response_format = "list"
    # emailResponse = openai.Completion.create(
    #     engine="text-davinci-003",
    #     prompt=prompt + "\n" + text+"\n"+ "Response Format: "+response_format,
    #     max_tokens=1024,
    #     n=1,
    #     stop=None,
    #     temperature=0.5,
    # )

    # prompt = "Could you provide me with my maximum years of experience in the industry?"
    # response_format = "list"
    # experienceResponse = openai.Completion.create(
    #     engine="text-davinci-003",
    #     prompt=prompt + "\n" + text+"\n"+ "Response Format: "+response_format,
    #     max_tokens=1024,
    #     n=1,
    #     stop=None,
    #     temperature=0.5,
    # )

    # skillResponse = skillResponse.choices[0].text
    # print(skillResponse)

    # emailResponse = emailResponse.choices[0].text
    # print(emailResponse)

    # experienceResponse = experienceResponse.choices[0].text
    # print(experienceResponse)

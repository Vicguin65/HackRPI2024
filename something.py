import os
import openai
from dotenv import load_dotenv
import json

load_dotenv()
openai.api_key = os.environ.get("KEY")

# print(openai.Model.list())
course_name = '''The Multimedia Century'''
course_description = '''This course will survey the history and theory of the diverse artistic practices of the twentieth century\
      in relation to the development of the mass media and new technologies. Topics will include the Bauhaus, Surrealism, \
        Pop Art, and Postmodernism and will span a spectrum of media from the more traditional, such as painting and photography,\
              to electronic and new media, such as video and digital arts.'''

meet_days = ["Monday", "Thursday"]
meet_days = ','.join(meet_days)

start_day = "January 24, 2024"
end_day = "May 24, 2024"

response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Can you create a syllabus given this course name " + course_name + "and description" +  "which meets on" + meet_days 
         + "from" + start_day + "to" + end_day + ". For each day, draft a lesson plan with goals and objectives of the class and generate three key learning questions that can be used to gage \
             students' understandings of the material. Also add homework assignments for each week. Please return the dates in the format\
                day of week, day month, year. Please do not list it as a range of dates, but rather every single day the class will be meeting."},
             ]
)

response = str(response)
with open("syllabus.json", "w") as outfile:
    outfile.write(response)

print(response[2])
from django.shortcuts import render
from rest_framework.views import APIView
from django.http import JsonResponse
import os
import openai
from dotenv import load_dotenv
import json

# Create your views here.
class GetCourseScheduleView(APIView):
    def get(self, request):
        data = request.data
        
        load_dotenv()
        openai.api_key = os.environ.get("KEY")

        # print(openai.Model.list())

        course_name = data.get('course_name','')
        course_description = data.get('course_description', '')

        meet_days = request.GET.getlist('meetings_days','')
        if meet_days != '':
            meet_days = ','.join(meet_days)

        start_day = "January 24, 2024"
        end_day = "May 24, 2024"

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": "Can you create a syllabus given this course name " + course_name + "and description" + course_description + "which meets on" + meet_days 
                + "from" + start_day + "to" + end_day + ". For each day, draft a lesson plan and generate three key learning questions that can be used to gage \
                    students' understandings of the material. Also add homework assignments for each week. Please return the dates in the format\
                        day of week, day month, year."},
                    ]
        )

        # response = str(response)
        # with open("syllabus.json", "w") as outfile:
        #     outfile.write(response)
        # print(type(response.to_dict()))
        print(response['choices'][0])

        return JsonResponse(response['choices'][0], safe=False)
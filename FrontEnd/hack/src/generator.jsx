import { Component } from "react";
import "./generator.css";
import axios from "axios";
import { SyllabusGeneratorService } from "./services/Service.SyllabusGenerator";

class SyllabusGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: "",
      endDate: "",
      courseTitle: "",
      courseDescription: "",
      daysOfClass: [],
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleDaysChange = (event) => {
    const { options } = event.target;
    const selectedDays = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedDays.push(options[i].value);
      }
    }
    this.setState({
      daysOfClass: selectedDays,
    });
  };

  validateSyllabusData = (data) => {
    const errors = {};
    if (data.start_day === "") {
      errors.startDate = "Start Date is required";
    }
    if (data.end_day === "") {
      errors.endDate = "End Date is required";
    }
    if (data.course_name === "") {
      errors.courseTitle = "Course title is required";
    }
    if (data.course_description === "") {
      errors.courseDescription = "Course description is required";
    }
    if (data.meetings_days.length === 0) {
      errors.daysOfClass = "Days of class is required";
    }

    return errors;
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const syllabusData = {
        start_day: this.state.startDate,
        end_day: this.state.endDate,
        course_name: this.state.courseTitle,
        course_description: this.state.courseDescription,
        meetings_days: this.state.daysOfClass, 
      };

      const validationErrors = this.validateSyllabusData(syllabusData);

      if (Object.keys(validationErrors).length === 0) {
        const syllabusGenerator = new SyllabusGeneratorService();
        const generatedSyllabus = await syllabusGenerator.getSyllabus(
          syllabusData
        );
        console.log("Generated Syllabus:", generatedSyllabus);
      } else {
        console.log("error", validationErrors);
      }
    } catch (error) {
      console.error("Error generating syllabus:", error);
    }
  };

  render() {
    return (
      <div>
        <h2>Syllabus Generator</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="startDate">Start Date:</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={this.state.startDate}
              onChange={this.handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="endDate">End Date:</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={this.state.endDate}
              onChange={this.handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="courseTitle">Course Title:</label>
            <input
              type="text"
              id="courseTitle"
              name="courseTitle"
              value={this.state.courseTitle}
              onChange={this.handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="courseDescription">Course Description:</label>
            <textarea
              id="courseDescription"
              name="courseDescription"
              value={this.state.courseDescription}
              onChange={this.handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="daysOfClass">Days Class Meets:</label>
            <select
              id="daysOfClass"
              name="daysOfClass"
              multiple
              value={this.state.daysOfClass}
              onChange={this.handleDaysChange}
            >
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
            </select>
          </div>

          <button type="submit">Generate Syllabus</button>
        </form>
      </div>
    );
  }
}

export default SyllabusGenerator;

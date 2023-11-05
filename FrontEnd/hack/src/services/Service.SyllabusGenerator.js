import axios from "axios";
import { ApiService } from "./api";

export class SyllabusGeneratorService {
  async getSyllabus(payload) { 
    const response = await axios.get(
      "http://54.153.90.60/api/get-response",
      payload
    );
    console.log(response.data);
    return response.data;
  }
}

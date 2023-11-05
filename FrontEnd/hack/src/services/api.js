import axios  from "axios"; 

export class ApiService { 
  constructor() {
    this.base = axios.create({
      baseURL: "http://54.153.90.60/api",
    });
  }
}

 

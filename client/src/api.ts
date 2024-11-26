// Handles API routing based on running environment.

const runMode: string = import.meta.env.MODE;
let apiUrl: string = "https://api.quizme.naspoapps.com"; // production api url

// if in development mode, use local api
if (runMode == "development") {
  apiUrl = "http://localhost:3000"; // development api url
}

export default apiUrl;

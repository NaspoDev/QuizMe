// Handles API routing based on running environment.

const runMode: string = import.meta.env.MODE;
let apiURL: string = "https://api.quizme.naspoapps.com"; // production api url

// if in development mode, use local api
if (runMode == "development") {
  apiURL = "http://localhost:3000"; // development api url
}

export default apiURL;

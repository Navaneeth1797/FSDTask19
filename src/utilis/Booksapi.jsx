// AxiosService1.js
import axios from "axios";

// Define the base URL for API calls
let API_URL1 = "https://659b27b9d565feee2daae091.mockapi.io";

// Create an instance of Axios with a custom base URL and headers
let AxiosService1 = axios.create({
  baseURL: API_URL1,
  headers: { "Content-Type": "Application/json" },
});

// Export the Axios instance for reuse in other parts of the application
export default AxiosService1;

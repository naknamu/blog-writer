// config.js
const config = {
    apiUrl:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/api"
        : "https://blog-api-production-189.up.railway.app/api",
  };
  
  export default config;
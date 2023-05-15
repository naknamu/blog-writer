// config.js
const config = {
  apiUrl:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/api"
      : "https://blog-api-production-189.up.railway.app/api",
  
  userUrl:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/user"
      : "https://blog-api-production-189.up.railway.app/user"
};

export default config;

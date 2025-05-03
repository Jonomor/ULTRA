// backend/checkEnv.js

export function checkEnv(required = []) {
    const missing = required.filter((key) => !process.env[key]);
  
    if (missing.length > 0) {
      console.error("❌ Missing required environment variables:");
      missing.forEach((key) => console.error(`- ${key}`));
      process.exit(1);
    }
  }
  
// backend/env.sync.js

import { config } from "dotenv";
import fetch from "node-fetch";

// Load local .env
config();

const platform = process.argv[2]; // "vercel" or "render"
const token = process.env.DEPLOY_API_TOKEN;

if (!token) {
  console.error("❌ DEPLOY_API_TOKEN is missing in .env");
  process.exit(1);
}

// 🔧 Replace with your actual project IDs
const PROJECT_ID = process.env.DEPLOY_PROJECT_ID;
const ENV_VARS = {
  PORT: process.env.PORT,
  ADMIN_SECRET: process.env.ADMIN_SECRET,
  DATABASE_URL: process.env.DATABASE_URL,
  FORWARD_WEBHOOK_URL: process.env.FORWARD_WEBHOOK_URL,
  VAPID_PUBLIC_KEY: process.env.VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY: process.env.VAPID_PRIVATE_KEY,
  JWT_SECRET: process.env.JWT_SECRET,
};

async function syncToVercel() {
  for (const [key, value] of Object.entries(ENV_VARS)) {
    const res = await fetch(`https://api.vercel.com/v10/projects/${PROJECT_ID}/env`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key,
        value,
        target: ["production", "preview", "development"],
        type: "encrypted",
      }),
    });

    if (!res.ok) {
      console.error(`❌ Failed to set ${key}`, await res.text());
    } else {
      console.log(`✅ Synced ${key} to Vercel`);
    }
  }
}

async function syncToRender() {
  for (const [key, value] of Object.entries(ENV_VARS)) {
    const res = await fetch(`https://api.render.com/v1/services/${PROJECT_ID}/env-vars`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([{ key, value }]),
    });

    if (!res.ok) {
      console.error(`❌ Failed to set ${key}`, await res.text());
    } else {
      console.log(`✅ Synced ${key} to Render`);
    }
  }
}

(async () => {
  if (platform === "vercel") {
    await syncToVercel();
  } else if (platform === "render") {
    await syncToRender();
  } else {
    console.error("⚠️ Specify a platform: vercel or render");
  }
})();

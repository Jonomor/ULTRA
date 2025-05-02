// api/subscribe.js
const secret = process.env.MY_SECRET;

export default async function handler(req, res) {
  const { VITE_MAILERLITE_API_KEY, MAILERLITE_ID } = process.env;
  if (req.method !== 'POST') return res.status(405).end();
  const { email } = req.body;
  // call MailerLite
  const r = await fetch(
    `https://api.mailerlite.com/api/v2/groups/${MAILERLITE_ID}/subscribers`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-MailerLite-ApiKey': VITE_MAILERLITE_API_KEY
      },
      body: JSON.stringify({ email })
    }
  );
  if (!r.ok) return res.status(r.status).json(await r.json());
  return res.status(200).json({ success: true });
}

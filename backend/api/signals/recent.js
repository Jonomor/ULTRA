// backend/api/recent.js
router.get("/recent", async (req, res) => {
    try {
      const signals = await Signal.find().sort({ timestamp: -1 }).limit(5);
  
      const result = signals.map(s => ({
        ...s.toObject(),
        comment: s.gptReply || '', // 🔁 Ensure frontend sees 'comment'
      }));
  
      res.json(result);
    } catch (err) {
      console.error("Error fetching signals:", err);
      res.status(500).json({ error: "Failed to retrieve signals" });
    }
  });
  
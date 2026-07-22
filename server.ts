import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Server-side Gemini AI Coach endpoint
  app.post("/api/coach", async (req, res) => {
    try {
      const { message, history, context } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        // Friendly fallback response if GEMINI_API_KEY is missing
        return res.json({
          reply: `I'm here to support your wealth journey, Julian! Based on your current financial state (Net Worth: $${context?.netWorth?.toLocaleString() || '1,248,500'}, Available to spend: $${context?.availableToSpend?.toLocaleString() || '4,280.50'}), you're maintaining a great balance. What specific area of your portfolio or goals shall we examine?`,
          suggestion: "Increasing your monthly deposit by $150 could accelerate your vacation home goal by 4 months."
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const systemInstruction = `You are Wealth Coach (also known as Wealth Mentor), an empathetic, sophisticated, and serene financial coach for Zenith Finance / Empowered Serenity.
Your tone is encouraging, calm, corporate-modern, clear, concise, and non-judgmental.
You speak directly to Julian (or the user).
Always offer actionable, encouraging wealth guidance. Keep answers concise (2-4 sentences max per response) and include structured insights or gentle nudges when appropriate.

Current User Financial Summary:
- Name: Julian Sterling
- Monthly Income: $${context?.income || 10000}
- Net Worth: $${context?.netWorth || 1248500}
- Available to Spend: $${context?.availableToSpend || 4280.50}
- Monthly Spending: $${context?.monthlySpent || 4850}
- Active Goals: Emergency Fund ($25.5k/$30k), Sanctuary Beach House ($155k/$250k), New Home ($54.5k/$200k)
- Risk Profile: Moderate`;

      const contents = [];
      if (history && Array.isArray(history)) {
        for (const item of history) {
          contents.push({
            role: item.sender === "user" ? "user" : "model",
            parts: [{ text: item.text }],
          });
        }
      }
      contents.push({
        role: "user",
        parts: [{ text: message || "Hello" }],
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const replyText = response.text || "I'm analyzing your financial picture to keep you on your serene path.";

      return res.json({
        reply: replyText,
      });
    } catch (err: any) {
      console.error("Error in AI Coach endpoint:", err);
      return res.status(500).json({
        reply: "I noticed a brief pause in our connection. Let's revisit your progress—how can I help guide your wealth journey today?",
        error: err?.message || "Internal server error"
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

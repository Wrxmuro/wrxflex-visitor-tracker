const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Render terminates TLS at its proxy. Trust only the first proxy hop.
app.set("trust proxy", 1);
app.use(express.json({ limit: "10kb" }));
app.use(express.static(path.join(__dirname, "public")));

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

app.post("/api/visit", async (req, res) => {
  try {
    if (!BOT_TOKEN || !CHAT_ID) {
      return res.status(503).json({ ok: false, message: "Bildirim servisi yapılandırılmamış." });
    }

    // The visitor explicitly presses the consent button before this endpoint is called.
    const ip = req.ip || req.socket.remoteAddress || "Bilinmiyor";
    const userAgent = String(req.get("user-agent") || "Bilinmiyor").slice(0, 350);
    const timestamp = new Intl.DateTimeFormat("tr-TR", {
      dateStyle: "short",
      timeStyle: "medium",
      timeZone: "Europe/Istanbul"
    }).format(new Date());

    const message = [
      "🌐 YENİ ZİYARETÇİ (ONAYLI)",
      "",
      `IP adresi: ${ip}`,
      `Tarih / saat: ${timestamp}`,
      `Tarayıcı bilgisi: ${userAgent}`
    ].join("\n");

    const telegramResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text: message })
    });

    if (!telegramResponse.ok) {
      const details = await telegramResponse.text();
      console.error("Telegram API error:", details);
      return res.status(502).json({ ok: false, message: "Telegram bildirimi gönderilemedi." });
    }

    res.json({ ok: true });
  } catch (error) {
    console.error("Visit notification error:", error);
    res.status(500).json({ ok: false, message: "Sunucu hatası." });
  }
});

app.get("/health", (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`WRXFLEX Visitor Tracker listening on port ${PORT}`);
});

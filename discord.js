function sendToDiscord(page, name, email, message) {
  const webhookURL = "YOUR_WEBHOOK_URL_HERE";

  const content = {
    content: "<1392667822727102576>", // this pings you (optional)
    embeds: [
      {
        title: `📩 Message from ${page}`,
        color: 0x1565c0,
        fields: [
          { name: "👤 Name", value: name || "Anonymous", inline: true },
          { name: "📧 Email", value: email || "N/A", inline: true },
          { name: "💬 Message", value: message || "(No message)", inline: false }
        ],
        timestamp: new Date().toISOString(),
      }
    ]
  };

  fetch(webhookURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(content)
  }).then(() => {
    alert("✅ Sent to Discord!");
  }).catch(err => {
    alert("❌ Failed: " + err);
  });
}
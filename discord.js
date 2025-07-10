function sendToDiscord(page, name, email, message) {
  const webhookURL = "https://discord.com/api/webhooks/1392456395928113293/dQ1ZxloGuDYDdvS4vQBpDsruUnTLKQs6vuHqQ6SnH-12ubVonOtLDTFqDsKM_lWOyjhu";

  const content = {
    content: "<@1392454071369334925>", // ✅ This will ping you in Discord
    embeds: [
      {
        title: `📩 Message from ${page}`,
        color: 0x1565c0,
        fields: [
          { name: "👤 Name", value: name || "Anonymous", inline: true },
          { name: "📧 Email", value: email || "N/A", inline: true },
          { name: "💬 Message", value: message || "(No message)", inline: false }
        ],
        timestamp: new Date().toISOString()
      }
    ]
  };

  fetch(webhookURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(content)
  })
    .then(() => {
      alert("✅ Message sent to Discord!");
    })
    .catch(err => {
      alert("❌ Failed to send message: " + err);
    });
}
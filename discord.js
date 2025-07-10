function sendToDiscord(page, name, email, message, whatsapp = "", design = "", plan = "", user = null) {
  // 🔗 Webhook URLs for each page (replace if needed)
  const webhookMap = {
    "Home Page": "https://discord.com/api/webhooks/YOUR_HOME_PAGE_WEBHOOK",  // Replace with your actual home webhook
    "Order Page": "https://discord.com/api/webhooks/1392910199748300840/gw8AOisOHOC5l38EdUOKIn5f_0-IcRyM8ZLdcKK2v_XbsA0HHP-2flMaTmqr-WY9t3b8"
  };

  const webhookURL = webhookMap[page] || webhookMap["Home Page"];

  // Plan color coding
  let color = 0x90a4ae; // Default = gray
  if (plan === "Standard") color = 0x1976d2;
  if (plan === "Pro") color = 0xffc107;

  const embed = {
    title: `📩 Message from ${page}`,
    color,
    fields: [
      { name: "👤 Name", value: name || "N/A", inline: true },
      { name: "📧 Email", value: email || "N/A", inline: true }
    ],
    timestamp: new Date().toISOString()
  };

  // Extend if Order Page
  if (page === "Order Page") {
    embed.description = `**Plan Selected:** ${plan || "N/A"}`;
    embed.fields.push(
      { name: "📱 WhatsApp", value: whatsapp || "N/A", inline: true },
      { name: "🎨 Design Type", value: design || "N/A", inline: true },
      { name: "📦 Package", value: plan || "N/A", inline: true },
      { name: "🔐 User Status", value: user ? "Logged In" : "Guest", inline: true },
      { name: "📝 Notes", value: message || "(No notes provided)", inline: false }
    );
    if (user?.uid) {
      embed.fields.push({ name: "🆔 Firebase UID", value: user.uid, inline: false });
    }
  } else {
    // For Home Page or other general forms
    embed.fields.push({ name: "💬 Message", value: message || "(No message)", inline: false });
  }

  const content = {
    content: "<@1392454071369334925>", // Ping Mohiith
    embeds: [embed]
  };

  fetch(webhookURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(content)
  }).catch(err => {
    console.error("❌ Discord webhook error:", err);
  });
}
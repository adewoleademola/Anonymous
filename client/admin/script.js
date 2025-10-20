document.addEventListener("DOMContentLoaded", async () => {
  const adminData = JSON.parse(localStorage.getItem("admin"));
  const adminId = adminData?.email;

  if (!adminId) {
    alert("Admin not authenticated. Please login.");
    window.location.href = "./login/index.html";
    return;
  }

  const listContainer = document.getElementById("messageList");
  const header = document.querySelector(".message .header");

  // Create "new message" indicator
  const newMsgIndicator = document.createElement("div");
  newMsgIndicator.textContent = "New Message Received!";
  newMsgIndicator.style.cssText = `
    background-color: #00c851;
    color: white;
    padding: 8px 12px;
    border-radius: 4px;
    margin-left: 10px;
    font-weight: bold;
    display: none;
  `;
  header.appendChild(newMsgIndicator);

  async function loadMessages() {
    try {
      const response = await fetch("http://192.168.0.100:5000/api/messages/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "adminid": adminId
        }
      });

      if (!response.ok) throw new Error("Failed to fetch messages.");

      const result = await response.json();
      const messages = result.data;

      listContainer.innerHTML = ""; // Clear existing messages

      messages.forEach(msg => {
        const messageEl = document.createElement("div");
        messageEl.className = "first-list";
        messageEl.innerHTML = `
          <img src="images-removebg-preview.png" alt="">
          <h3>${msg.student}</h3>
          <p><strong>${msg.category}</strong>: ${msg.subject}</p>
          <p>${msg.description}</p>
          <p><small><strong>Location:</strong> ${msg.location || "<em> not specified </em"} | <strong>Date:</strong> ${msg.date || " <em> not specified </em"}</small></p>
          <span>&#9733;</span><span>&#9733;</span><span>&#9733;</span>
        `;
        listContainer.appendChild(messageEl);
      });
    } catch (err) {
      console.error("Error fetching messages:", err);
      alert("Could not load messages.");
    }
  }

  await loadMessages();

  // Connect to Socket.IO server
  const socket = io("http://localhost:5000");

  // Listen for new_message event
  socket.on("new_message", () => {
    // Show the new message indicator briefly
    newMsgIndicator.style.display = "inline-block";
    setTimeout(() => {
      newMsgIndicator.style.display = "none";
    }, 3000);

    // Refresh the message list
    loadMessages();
  });

  document.getElementById("logoutBtn").addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    window.location.href = "../admin/login/index.html";
  });
});

// Portfolio interactions — no API key or external AI service required.
const menuToggle = document.querySelector("#menuToggle");
const siteNav = document.querySelector("#siteNav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
    siteNav.classList.toggle("open", !isOpen);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
  });
}

const yearElement = document.querySelector("#year");
if (yearElement) yearElement.textContent = new Date().getFullYear();

// This assistant is a transparent local demo with prepared responses.
// It is not a live AI model and does not send chat messages anywhere.
const chatForm = document.querySelector("#chatForm");
const chatInput = document.querySelector("#chatInput");
const chatMessages = document.querySelector("#chatMessages");
const quickPrompts = document.querySelectorAll("[data-question]");

function getAssistantReply(question) {
  const q = question.toLowerCase();

  if (q.includes("skill") || q.includes("technology") || q.includes("tech stack")) {
    return "Mrunal's listed toolkit includes HTML, CSS, JavaScript, Bootstrap, Python, Java, C, SQL, MySQL, Git, and GitHub. Skill levels should be updated honestly as experience grows.";
  }
  if (q.includes("project") || q.includes("work") || q.includes("unipath") || q.includes("college")) {
    return "The portfolio highlights UniPath / College Finder, a responsive college-discovery website concept. It also lists an AI Study Assistant as an idea in progress. Open each GitHub link to see the real source after the placeholders are replaced.";
  }
  if (q.includes("contact") || q.includes("email") || q.includes("linkedin") || q.includes("hire") || q.includes("connect")) {
    return "You can contact Mrunal using the email or LinkedIn links in the Contact section. Those links are placeholders right now, so the owner should replace them before publishing.";
  }
  if (q.includes("education") || q.includes("study") || q.includes("degree") || q.includes("college")) {
    return "Mrunal is a BCA student at Sri Balaji University, Pune. Add the correct graduation year and any relevant education details before publishing.";
  }
  if (q.includes("ai") || q.includes("assistant") || q.includes("chatbot")) {
    return "This is a frontend demo assistant with preset answers, not a real generative AI integration. A live AI feature would need a backend to protect the API key and send requests securely.";
  }
  if (q.includes("hello") || q.includes("hi ") || q === "hi" || q.includes("hey")) {
    return "Hi there! 👋 Ask me about skills, projects, education, AI, or how to contact Mrunal.";
  }
  return "I can answer questions about skills, projects, education, AI, or contact details. Try asking: “What projects has Mrunal built?”";
}

function addMessage(message, sender) {
  const bubble = document.createElement("div");
  bubble.className = `chat-bubble ${sender === "user" ? "user-message" : "bot-message"}`;
  bubble.textContent = message; // textContent prevents user input being interpreted as HTML.
  chatMessages.appendChild(bubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleQuestion(question) {
  const cleanQuestion = question.trim();
  if (!cleanQuestion || !chatMessages) return;
  addMessage(cleanQuestion, "user");
  addMessage(getAssistantReply(cleanQuestion), "bot");
}

if (chatForm && chatInput && chatMessages) {
  chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    handleQuestion(chatInput.value);
    chatInput.value = "";
    chatInput.focus();
  });

  quickPrompts.forEach((button) => {
    button.addEventListener("click", () => handleQuestion(button.dataset.question || ""));
  });
}

// Mark placeholder links clearly instead of silently navigating to "#".
document.querySelectorAll(".demo-placeholder").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const toast = document.querySelector("#toast");
    if (toast) {
      toast.textContent = "Add your published project URL here when your live demo is ready.";
      toast.classList.add("show");
      window.setTimeout(() => toast.classList.remove("show"), 3000);
    }
  });
});

import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());

// Har item: keywords ki list + possible replies (random ek chuna jayega)
const replies = [
  {
    keywords: ["hi", "hello", "hey", "hii", "namaste"],
    answers: ["Hello! How can I help you today?", "Hey there! What's up?", "Hi! Nice to see you."],
  },
  {
    keywords: ["how are you", "how r u", "kaise ho", "whats up", "what's up"],
    answers: ["I'm doing great, thanks for asking! How about you?", "All good here! How are you?"],
  },
  {
    keywords: ["your name", "who are you", "tumhara naam", "tera naam"],
    answers: ["I'm a simple chatbot built with React and Express.", "I'm your chatbot assistant!"],
  },
  {
    keywords: ["what can you do", "help", "kya kar sakte ho"],
    answers: [
      "I can chat with you, tell the time and date, share a joke, or give a motivational quote. Try asking!",
    ],
  },
  {
    keywords: ["good morning", "suprabhat"],
    answers: ["Good morning! Hope you have a wonderful day."],
  },
  {
    keywords: ["good afternoon"],
    answers: ["Good afternoon! How's your day going?"],
  },
  {
    keywords: ["good evening"],
    answers: ["Good evening! How was your day?"],
  },
  {
    keywords: ["good night", "gn"],
    answers: ["Good night! Sleep well and sweet dreams."],
  },
  {
    keywords: ["thank", "thanks", "shukriya", "dhanyavad"],
    answers: ["You're welcome!", "Anytime! Happy to help.", "No problem at all."],
  },
  {
    keywords: ["joke", "funny", "make me laugh"],
    answers: [
      "Why do programmers prefer dark mode? Because light attracts bugs.",
      "Why did the developer go broke? Because he used up all his cache.",
      "There are 10 types of people: those who understand binary and those who don't.",
    ],
  },
  {
    keywords: ["motivate", "motivation", "inspire", "quote"],
    answers: [
      "Small progress each day adds up to big results.",
      "Don't watch the clock; do what it does. Keep going.",
      "You don't have to be perfect, you just have to start.",
    ],
  },
  {
    keywords: ["i am sad", "i'm sad", "feeling sad", "feeling low", "udaas"],
    answers: [
      "I'm sorry you're feeling that way. Want to talk about it? Sometimes sharing helps.",
      "That sounds tough. I'm here to listen. What's on your mind?",
    ],
  },
  {
    keywords: ["i am happy", "i'm happy", "feeling good", "khush"],
    answers: ["That's wonderful to hear! What made your day good?"],
  },
  {
    keywords: ["i am bored", "i'm bored", "bore"],
    answers: [
      "Let's fix that! Ask me for a joke or a quote.",
      "How about learning something new today? Tell me what interests you.",
    ],
  },
  {
    keywords: ["weather"],
    answers: ["I can't check live weather, but a weather app or website will give you an accurate forecast."],
  },
  {
    keywords: ["favorite color", "favourite colour", "favourite color"],
    answers: ["I like blue. It matches this chat's theme!"],
  },
  {
    keywords: ["who made you", "who created you", "your creator"],
    answers: ["I was built by a Md Tausim."],
  },
  {
    keywords: ["react"],
    answers: ["React is a JavaScript library for building user interfaces using components and state."],
  },
  {
    keywords: ["javascript", "js"],
    answers: ["JavaScript is the language of the web. It runs in browsers and, with Node.js, on servers too."],
  },
  {
    keywords: ["bye", "goodbye", "see you", "alvida"],
    answers: ["Goodbye! Have a great day.", "See you later! Take care."],
  },
];

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function getReply(userMessage) {
  // Special replies jo live data se aate hain
  if (userMessage.includes("time")) {
    return `The current time is ${new Date().toLocaleTimeString()}.`;
  }
  if (userMessage.includes("date") || userMessage.includes("today")) {
    return `Today's date is ${new Date().toLocaleDateString()}.`;
  }

  // Keyword matching
  for (const item of replies) {
    for (const keyword of item.keywords) {
      // Chhote keywords (hi, gn, js) ko poore word ki tarah match karo
      if (keyword.length <= 3) {
        const words = userMessage.split(/\s+/);
        if (words.includes(keyword)) return pickRandom(item.answers);
      } else if (userMessage.includes(keyword)) {
        return pickRandom(item.answers);
      }
    }
  }

  return "Sorry, I didn't understand that. Try saying hi, asking for a joke, or type 'help'.";
}

app.get("/", (req, res) => {
  res.json({ message: "Chatbot Server Running" });
});

app.post("/chat", (req, res) => {
  const { message } = req.body;

  if (message === undefined || message === null) {
    return res.status(400).json({ reply: "Message is required" });
  }

  if (typeof message !== "string") {
    return res.status(400).json({ reply: "Message must be a string" });
  }

  const userMessage = message.toLowerCase().trim();

  if (userMessage === "") {
    return res.status(400).json({ reply: "Please enter a valid message" });
  }

  res.json({ reply: getReply(userMessage) });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
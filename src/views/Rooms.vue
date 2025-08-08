<template>
  <div>
    <h1 class="text-[30px]">Rooms Page</h1>

    <div class="p-4">
      <h2>🌍 Auto Language Detection + Gemini</h2>

      <button @click="startListening" :disabled="isListening">
        ▶️ Start Listening
      </button>
      <button @click="stopListening" :disabled="!isListening">⏹ Stop</button>

      <p><strong>Heard:</strong> {{ transcript }}</p>
      <p><strong>Detected Language:</strong> {{ detectedLang }}</p>

      <button @click="sendToGemini" :disabled="!transcript">
        🔁 Send to Gemini
      </button>

      <div v-if="geminiResponse">
        <h3>🤖 Gemini Response:</h3>
        <p>{{ geminiResponse }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recognition: null,
      isListening: false,
      transcript: "",
      detectedLang: "",
      geminiResponse: "",
    };
  },

  mounted() {
    this.startListening();
  },

  methods: {
    async startListening() {
      this.transcript = "";
      this.detectedLang = "";
      this.geminiResponse = "";

      // Step 1: Start with default language
      await this.recognizeOnce("en-US");

      // Step 2: Detect language
      this.detectedLang = await this.detectLanguage(this.transcript);
      const realLang = this.mapLangCode(this.detectedLang);

      if (realLang !== "en-US") {
        // Step 3: Retry with detected language
        await this.recognizeOnce(realLang);
      }
    },

    stopListening() {
      if (this.recognition) {
        this.recognition.stop();
        this.isListening = false;
      }
    },

    recognizeOnce(langCode) {
      return new Promise((resolve) => {
        const SpeechRecognition =
          window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
          alert("SpeechRecognition is not supported");
          return resolve("");
        }

        this.recognition = new SpeechRecognition();
        this.recognition.lang = langCode;
        this.recognition.continuous = false;
        this.recognition.interimResults = false;

        this.recognition.onstart = () => {
          this.isListening = true;
        };

        this.recognition.onresult = (event) => {
          const result = event.results[0][0].transcript;
          this.transcript = result;
          resolve(result);
        };

        this.recognition.onerror = (e) => {
          console.error("Recognition error", e);
          resolve("");
        };

        this.recognition.onend = () => {
          this.isListening = false;
        };

        this.recognition.start();
      });
    },

    async detectLanguage(text) {
      try {
        const res = await fetch("https://libretranslate.com/detect", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ q: text }),
        });

        const data = await res.json();
        return data[0]?.language || "en";
      } catch (e) {
        console.error("Language detection failed:", e);
        return "en";
      }
    },

    mapLangCode(shortCode) {
      const map = {
        en: "en-US",
        ru: "ru-RU",
        uz: "uz-UZ",
        tr: "tr-TR",
      };
      return map[shortCode] || "en-US";
    },

    async sendToGemini() {
      const apiKey = "AIzaSyAk3xqAGoWlf3rraQ-qULkSvTHljG2iPc4";
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const body = {
        contents: [
          {
            parts: [{ text: this.transcript }],
          },
        ],
      };

      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        const data = await res.json();
        this.geminiResponse =
          data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
      } catch (err) {
        console.error("Gemini error:", err);
        this.geminiResponse = "Error communicating with Gemini.";
      }
    },
  },
};
</script>

<style scoped>
button {
  margin: 0.5rem;
  padding: 0.5rem 1rem;
}
</style>

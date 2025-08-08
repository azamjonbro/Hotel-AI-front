<template>
  <div class="custom-bg h-screen flex flex-col justify-center items-center">
    <div class="flex justify-between items-center mb-6 w-[600px]">
      <!-- Language Selector -->
      <div class="flex items-center gap-2">
        <img
          class="cursor-pointer"
          width="25"
          :src="globeIcon"
          alt="not found icon"
        />
        <div class="relative">
          <select
            v-model="selectedLanguage"
            class="w-[60px] h-[30px] cursor-pointer outline-none bg-white pl-2 text-[14px] appearance-none rounded-md"
          >
            <option value="UZ">UZ</option>
            <option value="EN">EN</option>
            <option value="RU">RU</option>
          </select>
          <img
            width="15"
            :src="angleDownIcon"
            alt="icon not found"
            class="absolute right-0 top-[50%] translate-[-50%]"
          />
        </div>
      </div>

      <!-- Time Display -->
      <div class="text-white text-[20px] font-semibold">
        {{ currentTime }}
      </div>

      <!-- Help Button -->
      <img
        class="cursor-pointer"
        width="25"
        :src="questionIcon"
        alt="not found icon"
      />
    </div>

    <div
      class="bg-white w-[600px] h-[500px] rounded-4xl p-5 flex flex-col items-center justify-between shadow-[0_0_5px_#a2a2a2]"
    >
      <img
        width="250"
        :src="adminstratorImage"
        alt="not found adminstratorImage"
      />
      <h1 class="text-[30px] font-bold text-[#37546F]">Hotel AI Asistant</h1>
      <h3 class="font-bold text-[#37546fd1]">Welcome to Our Hotel</h3>
      <p class="text-[#37546fd1]">
        Press the microphone button to use hotel services.
      </p>

      <div class="flex items-center justify-between gap-4 w-full mt-10">
        <textarea
          placeholder="Ask anything..."
          class="custom-scroll resize-none min-h-[40px] max-h-[200px] w-full border-1 border-solid border-[#042384] outline-none p-5 text-[#3D6089] rounded-3xl overflow-y-auto"
          rows="1"
        ></textarea>

        <!-- Microphone Button -->
        <button
          @click="microphoneClickAction"
          class="microphone w-[80px] h-[65px] rounded-[50%] flex justify-center items-center cursor-pointer hover:bg-[#BEBFC1]"
        >
          <img
            width="30"
            :src="microphoneIcon"
            alt="microphoneIcon not found"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import globeIcon from "../assets/icons/globe.svg";
import questionIcon from "../assets/icons/circle-question.svg";
import microphoneIcon from "../assets/icons/microphone.svg";
import angleDownIcon from "../assets/icons/angle-down.svg";
import adminstratorImage from "../assets/images/adminstrator.png";
export default {
  name: "HomePage",

  data() {
    return {
      globeIcon,
      questionIcon,
      adminstratorImage,
      microphoneIcon,
      angleDownIcon,
      selectedLanguage: "UZ",
      currentTime: "",
      intervalId: null,
      isActive: false,
    };
  },

  mounted() {
    this.updateTime();
    this.intervalId = setInterval(this.updateTime, 1000);
  },

  beforeUnmount() {
    clearInterval(this.intervalId);
  },

  methods: {
    updateTime() {
      const time = new Date().toLocaleTimeString("uz-UZ", {
        hour: "2-digit",
        minute: "2-digit",
      });
      this.currentTime = time;
    },

    microphoneClickAction() {
      this.isActive = !this.isActive;
    },
  },
};
</script>

<style scoped>
.custom-bg {
  background: linear-gradient(to bottom right, #021b2c, #052449, #042387);
}
.microphone {
  background: linear-gradient(to bottom right, #6788ff, #3258d5, #1b41be);
}

.custom-scroll::-webkit-scrollbar {
  width: 8px;
}
.custom-scroll::-webkit-scrollbar-track {
  background: #e0e0e0;
  border-radius: 10px;
}
.custom-scroll::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 10px;
  border: 2px solid #e0e0e0;
}
.custom-scroll::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}
</style>

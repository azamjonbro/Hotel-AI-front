<template>
  <div
    class="h-screen flex justify-center items-center flex-col gap-7 p-[50px]"
  >
    <div
      id="map"
      class="flex justify-between items-center h-full w-full border-5 border-solid border-red-500 p-1"
    ></div>
  </div>
</template>
<script>
import { onMounted } from "vue";

export default {
  name: "LocationPage",
  mounted() {
    const waitForYMaps = () => {
      if (window.ymaps) {
        window.ymaps.ready(this.initMap);
      } else {
        setTimeout(waitForYMaps, 100);
      }
    };

    waitForYMaps();
  },
  methods: {
    initMap() {
      new window.ymaps.Map("map", {
        center: [41.311081, 69.240562], // Toshkent
        zoom: 10,
        controls: ["zoomControl", "fullscreenControl"],
      });
    },
  },
};
</script>

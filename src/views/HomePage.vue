<template>
  <div
    class="h-screen flex justify-center items-center flex-col gap-7 p-[0_50px]"
  >
    <div
      class="flex justify-between items-center max-w-[800px] min-w-[600px] w-full"
    >
      <button class="w-[200px] h-[100px] bg-gray-200 rounded-xl cursor-pointer">
        Bo'sh xonalar
      </button>
      <div>
        <img width="100" src="../assets/icons/user.svg" alt="user not found" />
      </div>
      <button class="w-[200px] h-[100px] bg-gray-200 rounded-xl cursor-pointer">
        Joylashuv
      </button>
    </div>
    <h1 class="text-[44px]">Smart Hotel AI!</h1>
    <form
      class="max-w-[800px] min-w-[600px] w-full p-7 text-[20px] relative mt-30"
    >
      <input
        class="outline-none w-full pt-10 pr-15 pb-10 pl-10 rounded-3xl text-[#AFAFAF] bg-[#303030]"
        type="text"
        placeholder="ask anything"
      />
      <button
        class="absolute right-15 top-[50%] translate-y-[-50%] rounded-[50%] p-2 hover:bg-[#454545] cursor-pointer"
      >
        <img
          width="30"
          src="../assets/icons/microphone.svg"
          alt="microphone not found"
          class=""
        />
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>

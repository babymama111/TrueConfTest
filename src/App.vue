<template>
  <div class="app-container">
    <NavBar />
    <div class="content-wrapper">
      <router-view class="fade-in"></router-view>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/welcomeComponents/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>
<!-- 
<style>
html,
body {
  overflow: hidden;
  height: 100%;
}

body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #060606;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  color: #866fdb;
  align-items: center;
  margin-top: 2rem;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-in {
  animation-name: fadeIn;
  animation-duration: 3s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: both;
}
</style> -->

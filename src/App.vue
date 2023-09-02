<template>
  <div class="app-container">
    <nav class="nav">
      <router-link to="/about" class="router-link">About Me</router-link>
      <router-link to="/" class="router-link">Lift Simulator</router-link>
    </nav>
    <div class="content-wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>


<script>
import router from './router'

export default {
  name: 'App',
  router
}
</script>
<style>
/* Общие стили */
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
  background-color: #f5f5f5;
}

/* Стили для навигационной панели */
.nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  background-color: #4CAF50;
  padding: 1rem 0;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2);
}

.router-link {
  font-size: 1.2rem;
  color: #ffffff;
  text-decoration: none;
}

.router-link:hover {
  text-decoration: underline;
}

/* Стили для содержимого страницы */
.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
}
</style>




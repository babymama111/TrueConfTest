<template>
  <nav class="nav fade-in">
    <router-link to="/" class="router-link fade-in">About Me</router-link>
    <router-link to="/lift" class="router-link fade-in">Lift Simulator</router-link>
  </nav>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>
<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  background-color: #014379;
  padding: 1rem 0;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.router-link {
  font-size: 1.2rem;
  color: #fbfbfb;
  text-decoration: none;
  transition: background-color 0.25s ease-in-out; 
}
.router-link:hover {
  text-decoration: underline;
  color: #f9f9f9; 
}
</style>

<template>
  <div class="welcome-container">
    <h1>Hi, TrueConf team!</h1>
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/3/36/Логотип_TrueConf.png"
      alt="Кортиночка"
      class="vue-logo"
    />
    <p></p>
    <a
      href="https://github.com/babymama111"
      class="github-link"
      target="_blank"
      rel="noopener noreferrer"
      >My GitHub Profile</a
    >
  </div>
</template>

<style>
.welcome-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #000000;
}

h1 {
  font-size: 4rem;
  text-align: center;
  margin-bottom: 2rem;
  color: #fffbfb;
  animation: fadeIn 2s;
}

.vue-logo {
  max-width: 30%;
  height: auto;
  margin-bottom: 2rem;
  animation: fadeIn 4s;
}

p {
  font-size: 1.5rem;
  text-align: center;
  color: #000;
  font-weight: bold;
  animation: fadeIn 2s 1s both;
}

.github-link {
  font-size: 1.2rem;
  color: #ffffff;
  text-decoration: none;
  margin-top: 1rem;
  border: 2px solid #ffffff;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  transition: background-color 0.3s ease-in-out;
  animation: fadeIn 2s 2s both;
}

.github-link:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>

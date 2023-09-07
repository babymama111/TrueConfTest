<template>
  <div id="lift">
    <ElevatorItem class="elevator-item"> </ElevatorItem>
  </div>
</template>

<script>
import ElevatorItem from './liftComponents/ElevatorItem.vue'

export default {
  name: 'LiftItem',
  components: {
    ElevatorItem
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap');

#lift {
  font-family: 'Roboto', sans-serif;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 70px;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.elevator-item {
  opacity: 0;
  animation: fadeIn 3s ease-out forwards;
}
</style>

<template>
  <div id="lift">
    <ElevatorItem> </ElevatorItem>
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
#lift {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
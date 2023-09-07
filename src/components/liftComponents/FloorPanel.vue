<template>
    <div class="button-container">
          <div v-if="canUp">
            <button :key="currentFloor + 'button-up'" @click="clickButton('up')">
              <svg
                class="h-8 sm:h-10 sm:w-14 p-1"
                viewBox="0 0 1317 1024"
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
              >
                <path
                  d="M0 1024 1316.571429 1024 658.285714 0 0 1024Z"
                  :fill="upLighten ? '#fcd217' : '#cdcdcd'"
                ></path>
              </svg>
            </button>
          </div>

          <div v-if="canDown">
            <button :key="currentFloor + 'button-down'" @click="clickButton('down')">
              <svg
                class="h-8 sm:h-10 sm:w-14 p-1"
                viewBox="0 0 1317 1024"
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
              >
                <path
                  d="M0 0 1316.571429 0 658.285714 1024 0 0Z"
                  :fill="downLighten ? '#fcd217' : '#cdcdcd'"
                ></path>
              </svg>
            </button>
          </div>
          <div class="floor-display">
           {{ displayFloor() }}
        </div>
        </div>


</template>

<script>
export default {
  name: 'FloorPanel',
  props: {
    currentFloor: Number,
    canUp: Boolean,
    canDown: Boolean
  },
  data() {
    return {
      upLighten: false,
      downLighten: false
    }
  },
  methods: {
    clickButton: function (type) {
  if (type === 'up') {
    this.upLighten = true;
    this.$emit('up-request', { floor: this.currentFloor, direction: 'up' });
  } else {
    this.downLighten = true;
    this.$emit('down-request', { floor: this.currentFloor, direction: 'down' });
  }
},
    // clickButton: function (type) {
    //   if (type === 'up') {
    //     this.upLighten = true
    //     this.$emit('upRequest', this.currentFloor)
    //   } else {
    //     this.downLighten = true
    //     this.$emit('downRequest', this.currentFloor)
    //   }
    // },

    upRequestHandled: function () {
      this.upLighten = false
    },

    downRequestHandled: function () {
      this.downLighten = false
    },

    displayFloor: function () {
 
      return '' + this.currentFloor
    }
  }
}
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
}

button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease-in-out;
  margin: 5px;
}

button:hover {
  transform: scale(1.1);
}

button:active {
  transform: scale(0.95);
}

.button-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid #014379;
  border-radius: 6px;
  padding: 10px;
  margin: 5px;
}

.floor-display {
  font-size: 1.4rem;
  font-weight: bold;
  padding: 0.5rem;
  margin-top: auto;
}
</style>

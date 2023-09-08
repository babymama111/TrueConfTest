<template>
  <div class="elevator-panel">
    <h4>{{ elevName }}</h4>
    <div>
      <div
        class="elevator-door"
        :class="{ open: doorsStatus === 'open', close: doorsStatus === 'close' }"
      >
        {{ doorsStatus }}
      </div>
      <div class="floor-display">{{ displayFloor }}</div>
      <div class="floor-buttons">
        <button
          v-for="floor in floorNum"
          :key="floor"
          @click="clickFloorButton(floor)"
          :class="getButtonClass(floor)"
        >
          {{ displayButtonNumber(floor) }}
        </button>
      </div>
      <div class="emergency-buttons">
        <button @click="clickEmergencyButton" :class="{ active: emergencyActive }">
          Экстренный вызов
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ElevatorPanel',
  props: {
    floorNum: Number,
    elevName: String,
    elevIndex: Number
  },

  data() {
    return {
      currentFloor: 1,
      leftDoorOpen: false,
      rightDoorOpen: false,
      selectedFloors: [],
      goingUp: false,
      goingDown: false,
      idle: true,
      targetFloor: 0,
      emergencyActive: false
    }
  },
  created() {
    this.loadState()
  },
  methods: {
    requestUp: function (floor) {
      this.clickFloorButton(floor)
    },

    requestDown: function (floor) {
      this.clickFloorButton(floor)
    },
    displayButtonNumber(floor) {
      return floor < 10 ? '0' + floor : floor
    },
    getButtonClass(floor) {
      return {
        selected: this.selectedFloors.includes(floor),
        'floor-button': true
      }
    },
    clickFloorButton(floor) {
      if (!this.selectedFloors.includes(floor) && !this.emergencyActive) {
        this.selectedFloors.push(floor)
        this.selectedFloors.sort((a, b) => a - b)
        this.saveState()
        this.moveElevator()
      }
    },
    moveToNextFloor(floorChange) {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.currentFloor += floorChange
          resolve()
        }, 1000)
      })
    },
    async moveElevator() {
      if (this.idle && this.selectedFloors.length > 0) {
        this.idle = false
        this.targetFloor = this.selectedFloors[0]
        let floorChange = this.targetFloor > this.currentFloor ? 1 : -1
        this.goingUp = floorChange > 0
        this.goingDown = !this.goingUp

        while (this.currentFloor !== this.targetFloor) {
          await this.moveToNextFloor(floorChange)
          this.saveState()
        }
        await this.selectedFloors.shift()
        await this.$emit('dealtUpRequest', this.currentFloor)
        await this.$emit('dealtDownRequest', this.currentFloor)

        await this.delay(1000)
        await this.openDoor()
      }
    },
    async openDoor() {
      this.leftDoorOpen = true
      this.rightDoorOpen = true
      await this.delay(3000)

      if (this.currentFloor === this.targetFloor) {
        const index = this.selectedFloors.indexOf(this.currentFloor)
        if (index > -1) {
          this.selectedFloors.splice(index, 1)
        }
      }

      this.saveState()
      await this.closeDoor()
    },
    async closeDoor() {
      this.leftDoorOpen = false
      this.rightDoorOpen = false
      await this.delay(1000)
      this.goingUp = false
      this.goingDown = false
      this.idle = true
      if (this.selectedFloors.length > 0) {
        this.moveElevator()
      }
    },
    clickEmergencyButton() {
      this.emergencyActive = !this.emergencyActive
      this.saveState()
      if (this.emergencyActive) {
        this.goingUp = false
        this.goingDown = false
        this.idle = false
      } else {
        this.idle = true
        this.moveElevator()
      }
    },
    saveState() {
      const state = {
        currentFloor: this.currentFloor,
        selectedFloors: this.selectedFloors,
        emergencyActive: this.emergencyActive
      }

      let allElevatorsData = localStorage.getItem('elevators')
      if (allElevatorsData) {
        allElevatorsData = JSON.parse(allElevatorsData)
      } else {
        allElevatorsData = {}
      }

      allElevatorsData['elevator' + this.elevIndex] = state

      localStorage.setItem('elevators', JSON.stringify(allElevatorsData))
    },
    loadState() {
      const allElevatorsData = localStorage.getItem('elevators')
      if (allElevatorsData) {
        const elevatorsData = JSON.parse(allElevatorsData)
        const savedState = elevatorsData['elevator' + this.elevIndex]
        if (savedState) {
          this.currentFloor = savedState.currentFloor
          this.selectedFloors = savedState.selectedFloors
          this.emergencyActive = savedState.emergencyActive
        }
      }
    },
    delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms))
    }
  },
  computed: {
    displayFloor() {
      return this.currentFloor < 10 ? '0' + this.currentFloor : this.currentFloor
    },
    doorsStatus() {
      return this.leftDoorOpen && this.rightDoorOpen ? 'open' : 'close'
    }
  }
}
</script>

<style scoped>
.elevator-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid #014379;
  border-radius: 6px;
  padding: 10px;
  margin: 5px;
}

.elevator-door {
  font-size: 1rem;
  font-weight: bold;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 30px;
  position: relative;
  padding: 0.2rem 0.5rem;
  margin-bottom: 5px;
  border-radius: 4px;
}
.open {
  color: green;
}

.close {
  color: red;
}

.floor-display {
  font-size: 1.4rem;
  font-weight: bold;
  padding: 0.5rem;
}

.floor-button {
  cursor: pointer;
  padding: 0.2rem 0.5rem;
  margin: 0.1rem;
  background-color: #8c8c8c;
  border-radius: 3px;
  border: none;
  color: #fff;
}

.selected {
  background-color: #fcd217;
}

.emergency-buttons {
  padding: 0.5rem;
}

button {
  cursor: pointer;
  padding: 0.2rem 0.5rem;
  background-color: #8c8c8c;
  border-radius: 3px;
  border: none;
  color: #fff;
  margin-top: 5px;
}

.active {
  background-color: #fcd217;
}
</style>

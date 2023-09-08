<template>
  <div>
    <!-- <div>
      <label for="floorNumField">Число этажей:</label>
      <input id="floorNumField" type="number" v-model="tempFloorNum" />
      <button @click="updateFloors">изменить</button>
    </div>
    <div>
      <label for="elevNumField">Число лифтов:</label>
      <input id="elevNumField" type="number" v-model="tempElevNum" />
      <button @click="updateElevators">изменить</button>
    </div> -->
    <p>Лифт</p>
    <div class="elevator-panels-container">
      <ElevatorPanel
        v-for="ep in elevNum"
        :key="'elev-' + ep"
        :floor-num="floorNum"
        :elev-name="'Лифт ' + ep"
        :elev-index="ep - 1"
        ref="elevatorList"
        @dealtDownRequest="floorDownRequestDealt"
        @dealtUpRequest="floorUpRequestDealt"
        @upRequest="floorUpRequest"
        @downRequest="floorDownRequest"
        @downRequestHandled="downRequestHandled"
        @upRequestHandled="upRequestHandled"
      ></ElevatorPanel>
    </div>
    <p>Вызов лифта</p>
    <div class="floor-panels-container">
      <FloorPanel
        v-for="fp in this.floorNum"
        :key="'floor-' + fp"
        :current-floor="fp"
        @upRequest="floorUpRequest"
        @downRequest="floorDownRequest"
        @downRequestHandled="downRequestHandled"
        @upRequestHandled="upRequestHandled"
        :can-up="floorNum !== fp"
        :can-down="1 !== fp"
        ref="floorPanels"
      ></FloorPanel>
    </div>
  </div>
</template>

<script>
import ElevatorPanel from './ElevatorPanel.vue'
import FloorPanel from './FloorPanel.vue'

const UP = 1
const DOWN = 2

export default {
  name: 'ElevatorItem',
  components: { ElevatorPanel, FloorPanel },
  props: {},
  data() {
    return {
      elevNum: parseInt(import.meta.env.VITE_API_ELEVNUM),
      floorNum: parseInt(import.meta.env.VITE_API_FLOORNUM),
      // tempElevNum: 1,
      // tempFloorNum: 5,
      choice: []
    }
  },
  created() {
    this.loadSettings()
    for (let i = 0; i < this.elevNum; i++) {
      this.choice[i] = i
    }
  },
  methods: {
    // updateFloors() {
    //   this.floorNum = Math.min(parseInt(this.tempFloorNum), 150)
    //   this.saveSettings()
    // },
    // updateElevators() {
    //   this.elevNum = Math.min(parseInt(this.tempElevNum), 50)
    //   this.saveSettings()
    // },
    saveSettings() {
      const settings = {
        floorNum: this.floorNum,
        elevNum: this.elevNum
      }
      localStorage.setItem('elevatorSettings', JSON.stringify(settings))
    },
    loadSettings() {
      const savedSettings = localStorage.getItem('elevatorSettings')
      if (savedSettings) {
        const loadedSettings = JSON.parse(savedSettings)
        this.floorNum = loadedSettings.floorNum
        this.elevNum = loadedSettings.elevNum
      }
    },

    floorUpRequest: function (floor) {
      let i = this.findElevatorToDeal(floor, UP)
      console.log('Requesting to ', i, ' elevator')
      if (i !== undefined) {
        console.log(this.$refs.elevatorList[0])
        this.$refs.elevatorList[i].requestUp(floor)
      }
    },

    floorDownRequest: function (floor) {
      let i = this.findElevatorToDeal(floor, DOWN)
      console.log('Requesting to ', i, ' elevator')
      if (i !== undefined) {
        this.$refs.elevatorList[i].requestDown(floor)
      }
    },
    async floorUpRequestDealt(floor) {
      // await this.$nextTick()
      this.$refs.floorPanels[floor - 1].upRequestHandled()
    },
    async floorDownRequestDealt(floor) {
      // await this.$nextTick();
      this.$refs.floorPanels[floor - 1].downRequestHandled()
    },
    findElevatorToDeal: function (floor, direction) {
      this.choice.sort(() => {
        return 0.5 - Math.random()
      })
      let dispatchedTo = -1
      let distance = this.floorNum + 1
      let inTrailDistance = this.floorNum + 1
      let available = undefined
      for (let p = 0; p < this.elevNum; p++) {
        let i = this.choice[p]
        let elevator = this.$refs.elevatorList[i]
        if (!elevator.disabled) {
          available = i
        } else {
          continue
        }
        if (
          elevator.idle ||
          (direction === UP && elevator.goingUp) ||
          (direction === DOWN && elevator.goingDown)
        ) {
          if (elevator.currentFloor === floor) {
            return i
          }
        }
        if (direction === UP) {
          if (elevator.goingUp && elevator.currentFloor <= floor) {
            if (elevator.currentFloor === floor) return i
            if (elevator.maxInQueue > floor) {
              if (floor - elevator.currentFloor < inTrailDistance) {
                inTrailDistance = floor - elevator.currentFloor
                dispatchedTo = i
              }
            } else {
              if (
                inTrailDistance === this.floorNum + 1 &&
                floor - elevator.currentFloor < distance
              ) {
                distance = elevator.currentFloor
                dispatchedTo = i
              }
            }
          }
        } else {
          if (elevator.goingDown && elevator.currentFloor >= floor) {
            if (elevator.currentFloor === floor) return i
            if (elevator.minInQueue < floor) {
              if (elevator.currentFloor - floor < inTrailDistance) {
                inTrailDistance = elevator.currentFloor - floor
                dispatchedTo = i
              }
            } else {
              if (
                inTrailDistance === this.floorNum + 1 &&
                elevator.currentFloor - floor < distance
              ) {
                distance = elevator.currentFloor
                dispatchedTo = i
              }
            }
          }
        }
        if (dispatchedTo < 0) {
          if (elevator.idle) {
            if (distance > Math.abs(floor - elevator.currentFloor)) {
              distance = Math.abs(floor - elevator.currentFloor)
              dispatchedTo = i
            }
          }
        }
      }

      if (available === undefined) {
        if (direction === UP) {
          this.$refs.floorPanels[floor - 1].upRequestHandled()
        } else {
          this.$refs.floorPanels[floor - 1].downRequestHandled()
        }
        return undefined
      }

      if (dispatchedTo < 0) {
        console.log('Лифт не выбран!')
        let min = this.floorNum + 1
        let max = -1
        dispatchedTo = available
        for (let q = 0; q < this.elevNum; q++) {
          let j = this.choice[q]
          let elevator = this.$refs.elevatorList[j]
          if (elevator.disabled) continue
          if (direction === UP) {
            if (elevator.minInQueue !== undefined) {
              if (elevator.minInQueue < min) {
                min = elevator.minInQueue
                dispatchedTo = j
              }
            } else {
              if (elevator.currentFloor < min) {
                min = elevator.currentFloor
                dispatchedTo = j
              }
            }
          } else {
            if (elevator.maxInQueue !== undefined) {
              if (elevator.maxInQueue > max) {
                max = elevator.maxInQueue
                dispatchedTo = j
              }
            } else {
              if (elevator.currentFloor > max) {
                max = elevator.currentFloor
                dispatchedTo = j
              }
            }
          }
        }
      }

      return dispatchedTo
    }
  }
}
</script>

<style scoped>
.elevator-panels-container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  gap: 10px;
}

.floor-panels-container {
  display: inline-block;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}
</style>

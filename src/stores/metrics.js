import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMetricsStore = defineStore('metrics', () => {
  const temperature = ref(24.5)
  const humidity = ref(45)
  const voltage = ref(220)
  const power = ref(1500)
  const battery = ref(85)
  const location = ref({ lat: -33.4489, lng: -70.6693, name: 'Santiago, CL' })

  const updateMetrics = (newData) => {
    if (newData.temperature !== undefined) temperature.value = newData.temperature
    if (newData.humidity !== undefined) humidity.value = newData.humidity
    if (newData.voltage !== undefined) voltage.value = newData.voltage
    if (newData.power !== undefined) power.value = newData.power
    if (newData.battery !== undefined) battery.value = newData.battery
  }

  return { temperature, humidity, voltage, power, battery, location, updateMetrics }
})

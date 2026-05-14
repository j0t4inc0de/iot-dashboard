import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMetricsStore = defineStore('metrics', () => {
  const temperature = ref(24.5)
  const humidity = ref(45)
  const voltage = ref(220)
  const power = ref(1500)
  const battery = ref(85)
  const location = ref({ lat: -33.4489, lng: -70.6693 })

  // Acción para actualizar métricas que luego llamará MQTT o nuestro Mock
  const updateMetrics = (newData) => {
    if (newData.temperature) temperature.value = newData.temperature
    if (newData.humidity) humidity.value = newData.humidity
    if (newData.voltage) voltage.value = newData.voltage
    if (newData.power) power.value = newData.power
    if (newData.battery) battery.value = newData.battery
    if (newData.location) location.value = newData.location
  }

  return { temperature, humidity, voltage, power, battery, location, updateMetrics }
})

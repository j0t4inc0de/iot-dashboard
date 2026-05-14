import { useMetricsStore } from '../stores/metrics'

let intervalId = null

export const startMockService = () => {
  const store = useMetricsStore()

  // Generar datos cada 2 segundos para simular el tiempo real
  intervalId = setInterval(() => {
    store.updateMetrics({
      temperature: +(20 + Math.random() * 10).toFixed(1), // Entre 20 y 30
      humidity: +(40 + Math.random() * 20).toFixed(1), // Entre 40 y 60
      voltage: +(215 + Math.random() * 10).toFixed(1), // Entre 215 y 225
      power: +(1000 + Math.random() * 800).toFixed(0), // Entre 1000 y 1800
      battery: Math.max(0, store.battery - 0.1).toFixed(1), // Baja lentamente
    })
  }, 2000)
}

export const stopMockService = () => {
  if (intervalId) clearInterval(intervalId)
}

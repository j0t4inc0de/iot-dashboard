<template>
  <div class="w-full h-full flex flex-col p-6 items-start">
    <div class="flex justify-between w-full mb-4 items-center">
      <p class="label">Historial de Potencia</p>
      <span
        class="text-xs font-medium px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20 shadow-[0_0_10px_rgba(0,209,94,0.1)]"
      >
        En vivo
      </span>
    </div>

    <div
      ref="chartContainer"
      class="w-full flex-1 rounded-[1.5rem] bg-white/40 dark:bg-mako-800/30 border border-mako-300 dark:border-mako-700 transition-colors group-hover:border-primary/50 overflow-hidden relative"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { createChart } from 'lightweight-charts'

const chartContainer = ref(null)
let chart = null
let resizeObserver = null
let simulationInterval = null

onMounted(() => {
  if (!chartContainer.value) return

  chart = createChart(chartContainer.value, {
    width: chartContainer.value.clientWidth,
    height: chartContainer.value.clientHeight,
    layout: {
      background: { type: 'solid', color: 'transparent' },
      textColor: '#9ca3af',
    },
    grid: {
      vertLines: { color: 'rgba(156, 163, 175, 0.1)' },
      horzLines: { color: 'rgba(156, 163, 175, 0.1)' },
    },
    timeScale: {
      timeVisible: true,
      secondsVisible: false,
    },
    rightPriceScale: {
      borderVisible: false,
    },
  })

  const areaSeries = chart.addAreaSeries({
    lineColor: '#00D15E',
    topColor: 'rgba(0, 209, 94, 0.4)',
    bottomColor: 'rgba(0, 209, 94, 0.0)',
    lineWidth: 2,
  })

  // Datos simulados iniciales
  const data = []
  let currentTime = Math.floor(Date.now() / 1000) - 3600
  let lastValue = 220

  for (let i = 0; i < 60; i++) {
    lastValue = lastValue + (Math.random() - 0.5) * 10
    data.push({ time: currentTime, value: lastValue })
    currentTime += 60
  }

  areaSeries.setData(data)
  chart.timeScale().fitContent()

  // Redimensionar automáticamente el gráfico si la tarjeta cambia de tamaño
  resizeObserver = new ResizeObserver((entries) => {
    if (entries.length === 0 || entries[0].target !== chartContainer.value) return
    const newRect = entries[0].contentRect
    chart.applyOptions({ width: newRect.width, height: newRect.height })
  })
  resizeObserver.observe(chartContainer.value)

  // Simulación en tiempo real
  simulationInterval = setInterval(() => {
    currentTime += 60
    lastValue = lastValue + (Math.random() - 0.5) * 10
    areaSeries.update({ time: currentTime, value: lastValue })
  }, 2000)
})

onUnmounted(() => {
  if (simulationInterval) clearInterval(simulationInterval)
  if (resizeObserver) resizeObserver.disconnect()
  if (chart) chart.remove()
})
</script>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { startMockService, stopMockService } from './services/mockService'
import { useMetricsStore } from './stores/metrics'
import { useDark, useToggle } from '@vueuse/core'
import { GridStack } from 'gridstack'
import 'gridstack/dist/gridstack.min.css'

const store = useMetricsStore()
const isDark = useDark()
const toggleDark = useToggle(isDark)

let grid = null

onMounted(() => {
  startMockService()
  grid = GridStack.init({
    cellHeight: '160px',
    margin: 10,
    minRow: 1,
  })
})

onUnmounted(() => {
  stopMockService()
  if (grid) grid.destroy(false)
})
</script>

<template>
  <div
    class="min-h-screen transition-colors duration-500 bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-white font-sans selection:bg-indigo-500/30"
  >
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[120px]"
      ></div>
      <div
        class="absolute top-[20%] -right-[5%] w-[30%] h-[30%] rounded-full bg-purple-500/10 blur-[120px]"
      ></div>
    </div>

    <nav
      class="sticky top-0 z-50 px-6 py-3 border-b border-white/10 backdrop-blur-md bg-white/30 dark:bg-slate-900/40 flex justify-between items-center"
    >
      <div class="flex items-center gap-2">
        <span class="font-bold text-xl tracking-tight"
          >NET<span class="text-indigo-500">ZONA</span></span
        >
      </div>

      <div class="flex items-center gap-6">
        <button @click="toggleDark()" class="hover:bg-white/20 p-2 rounded-full transition-colors">
          <span v-if="isDark">☀️</span>
          <span v-else>🌙</span>
        </button>

        <div class="flex items-center gap-3 pl-4 border-l border-white/10">
          <div class="text-right hidden sm:block">
            <p class="text-sm font-semibold leading-none">Juan Erices</p>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Administrador</p>
          </div>
          <div
            class="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center border-2 border-white/20"
          >
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        </div>
      </div>
    </nav>

    <main class="p-6 relative">
      <div class="grid-stack">
        <div class="grid-stack-item" gs-w="3" gs-h="1">
          <div class="grid-stack-item-content glass-card group">
            <p class="label">Temperatura</p>
            <h2 class="value text-orange-500">
              {{ store.temperature }}<span class="unit">°C</span>
            </h2>
          </div>
        </div>

        <div class="grid-stack-item" gs-w="3" gs-h="1">
          <div class="grid-stack-item-content glass-card">
            <p class="label">Humedad</p>
            <h2 class="value text-blue-500">{{ store.humidity }}<span class="unit">%</span></h2>
          </div>
        </div>

        <div class="grid-stack-item" gs-w="3" gs-h="1">
          <div class="grid-stack-item-content glass-card">
            <p class="label">Batería</p>
            <h2 class="value" :class="store.battery < 20 ? 'text-red-500' : 'text-emerald-500'">
              {{ store.battery }}<span class="unit">%</span>
            </h2>
          </div>
        </div>

        <div class="grid-stack-item" gs-w="3" gs-h="1">
          <div class="grid-stack-item-content glass-card">
            <p class="label">Voltaje</p>
            <h2 class="value text-yellow-500">{{ store.voltage }}<span class="unit">V</span></h2>
          </div>
        </div>

        <div class="grid-stack-item" gs-w="4" gs-h="1">
          <div class="grid-stack-item-content glass-card">
            <p class="label">Consumo de Potencia</p>
            <h2 class="value text-purple-500">{{ store.power }}<span class="unit">W</span></h2>
          </div>
        </div>

        <div class="grid-stack-item" gs-w="8" gs-h="1">
          <div class="grid-stack-item-content glass-card flex-row justify-between">
            <div>
              <p class="label">Ubicación Actual</p>
              <h2 class="text-xl font-medium mt-1">{{ store.location.name }}</h2>
              <p class="text-xs text-slate-400">
                Lat: {{ store.location.lat }}, Lng: {{ store.location.lng }}
              </p>
            </div>
            <div class="bg-indigo-500/20 p-3 rounded-xl text-indigo-400">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style>
/* Reset básico para Gridstack para evitar scrollbars feas */
.grid-stack-item-content {
  @apply overflow-hidden;
}

/* Estilos de Tarjeta Glassmorphism */
.glass-card {
  @apply flex flex-col items-center justify-center p-6 rounded-3xl transition-all duration-300;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
}

/* Ajustes para modo claro */
.light .glass-card {
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
}

.label {
  @apply text-xs uppercase font-bold tracking-widest text-slate-500 dark:text-slate-400;
}

.value {
  @apply text-5xl font-light tracking-tighter mt-1;
}

.unit {
  @apply text-lg ml-1 font-normal opacity-50;
}
</style>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { startMockService, stopMockService } from './services/mockService'
import { useMetricsStore } from './stores/metrics'
import { useDark, useToggle } from '@vueuse/core'
import { GridStack } from 'gridstack'
import 'gridstack/dist/gridstack.min.css'

const store = useMetricsStore()
const isDark = useDark()
const toggleDark = useToggle(isDark)

const isSystemActive = ref(false)

let grid = null

const toggleSystem = () => {
  isSystemActive.value = !isSystemActive.value
  console.log('Estado del sistema:', isSystemActive.value ? 'Activado' : 'Desactivado')
}

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
    class="min-h-screen transition-colors duration-500 bg-slate-100 dark:bg-[#0f172a] text-slate-900 dark:text-white font-sans selection:bg-indigo-500/30"
  >
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div
        class="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-indigo-500/20 blur-[120px]"
      ></div>
      <div
        class="absolute top-[20%] -right-[5%] w-[30%] h-[30%] rounded-full bg-purple-500/20 blur-[120px]"
      ></div>
    </div>

    <nav
      class="sticky top-0 z-50 px-6 py-3 border-b border-slate-200 dark:border-white/10 backdrop-blur-md bg-white/50 dark:bg-slate-900/40 flex justify-between items-center"
    >
      <div class="flex items-center gap-2">
        <span class="font-bold text-xl tracking-tight"
          >NET<span class="text-indigo-500">ZONA</span></span
        >
      </div>

      <div class="flex items-center gap-6">
        <button
          @click="toggleDark()"
          class="hover:bg-slate-200 dark:hover:bg-white/20 p-2 rounded-full transition-colors text-xl"
        >
          <span v-if="isDark">☀️</span>
          <span v-else>🌙</span>
        </button>

        <div class="flex items-center gap-3 pl-4 border-l border-slate-300 dark:border-white/10">
          <div class="text-right hidden sm:block">
            <p class="text-sm font-semibold leading-none">Juan Erices</p>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Administrador</p>
          </div>
          <div
            class="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center border-2 border-white/50 shadow-md"
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

    <main class="p-6 relative z-10">
      <div class="grid-stack">
        <div class="grid-stack-item" gs-w="3" gs-h="1">
          <div class="grid-stack-item-content glass-card">
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

        <div class="grid-stack-item" gs-w="4" gs-h="1" gs-x="0" gs-y="1">
          <div class="grid-stack-item-content glass-card">
            <p class="label">Consumo de Potencia</p>
            <h2 class="value text-purple-500">{{ store.power }}<span class="unit">W</span></h2>
          </div>
        </div>

        <div class="grid-stack-item" gs-w="4" gs-h="2" gs-x="8" gs-y="1">
          <div class="grid-stack-item-content glass-card !p-0 overflow-hidden relative group">
            <div
              class="absolute inset-0 bg-slate-200 dark:bg-slate-800 flex items-center justify-center opacity-50 transition-opacity group-hover:opacity-30"
            >
              <span class="text-sm text-slate-500 dark:text-slate-400 font-medium"
                >Contenedor futuro de Leaflet Map</span
              >
            </div>
            <div
              class="absolute bottom-0 w-full p-6 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-slate-900 dark:via-slate-900/80"
            >
              <p class="label flex items-center gap-1">
                <svg
                  class="w-4 h-4 text-indigo-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                Ubicación
              </p>
              <h2 class="text-lg font-medium mt-1 text-slate-800 dark:text-white">
                {{ store.location.name }}
              </h2>
              <p class="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1">
                Lat: {{ store.location.lat }} | Lng: {{ store.location.lng }}
              </p>
            </div>
          </div>
        </div>

        <div class="grid-stack-item" gs-w="8" gs-h="2" gs-x="0" gs-y="2">
          <div class="grid-stack-item-content glass-card items-start">
            <div class="flex justify-between w-full mb-4 items-center">
              <p class="label">Historial de Potencia</p>
              <span class="text-xs font-medium px-2 py-1 bg-green-500/10 text-green-500 rounded-md"
                >En vivo</span
              >
            </div>
            <div
              class="w-full flex-1 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-white/20 dark:bg-slate-800/20 flex items-center justify-center"
            >
              <p class="text-slate-400 dark:text-slate-500 flex flex-col items-center gap-2">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                  ></path>
                </svg>
                Contenedor futuro para Lightweight Charts
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style>
/* Reset básico para Gridstack */
.grid-stack-item-content {
  @apply overflow-hidden;
}

/* --- ESTILOS MODO CLARO (Por defecto) --- */
.glass-card {
  @apply flex flex-col items-center justify-center p-6 rounded-3xl transition-all duration-300;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
}

/* --- ESTILOS MODO OSCURO (Activados por Tailwind/VueUse) --- */
.dark .glass-card {
  background: rgba(15, 23, 42, 0.4); /* Slate-900 con opacidad */
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
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

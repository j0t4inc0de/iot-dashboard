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
    margin: 16,
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
    class="min-h-screen transition-colors duration-500 bg-mako-50 dark:bg-mako-900 text-mako-900 dark:text-white font-sans selection:bg-primary/30"
  >
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div
        class="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/10 dark:bg-primary/5 blur-[120px]"
      ></div>
      <div
        class="absolute top-[30%] -right-[10%] w-[40%] h-[40%] rounded-full bg-primary/10 dark:bg-primary/5 blur-[120px]"
      ></div>
    </div>

    <nav
      class="sticky top-0 z-50 px-6 py-4 border-b border-white/20 dark:border-white/5 backdrop-blur-xl bg-white/80 dark:bg-mako-900/60 flex justify-between items-center transition-all"
    >
      <div class="flex items-center gap-2">
        <span class="font-bold text-2xl tracking-tight"
          >NET<span class="text-primary">ZONA</span></span
        >
      </div>

      <div class="flex items-center gap-6">
        <button
          @click="toggleSystem"
          class="relative overflow-hidden group px-6 py-2 rounded-full bg-primary text-mako-950 font-semibold shadow-[0_0_20px_rgba(0,209,94,0.3)] hover:shadow-[0_0_25px_rgba(0,209,94,0.5)] transition-all duration-300 hover:-translate-y-0.5"
        >
          <span class="relative z-10">{{
            isSystemActive ? 'Sistema Activo' : 'Activar Sistema'
          }}</span>
          <div
            class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-shimmer z-0"
          ></div>
        </button>

        <button
          @click="toggleDark()"
          class="hover:bg-mako-200 dark:hover:bg-white/10 p-2 rounded-full transition-colors text-xl"
        >
          <span v-if="isDark">☀️</span>
          <span v-else>🌙</span>
        </button>

        <div class="flex items-center gap-3 pl-4 border-l border-mako-300 dark:border-white/10">
          <div class="text-right hidden sm:block">
            <p class="text-sm font-semibold leading-none text-mako-800 dark:text-mako-100">
              Juan Erices
            </p>
            <p class="text-xs text-mako-500 dark:text-mako-400 mt-1">Administrador</p>
          </div>
          <div
            class="w-10 h-10 rounded-full bg-mako-200 dark:bg-mako-800 flex items-center justify-center border border-white/50 dark:border-white/10 shadow-md overflow-hidden"
          >
            <svg
              class="w-6 h-6 text-mako-500 dark:text-mako-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
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

    <main class="p-6 relative z-10 max-w-7xl mx-auto">
      <div class="grid-stack">
        <div class="grid-stack-item" gs-w="3" gs-h="1">
          <div class="grid-stack-item-content glass-card group">
            <p class="label">Temperatura</p>
            <h2 class="value text-mako-800 dark:text-white">
              {{ store.temperature }}<span class="unit text-primary">°C</span>
            </h2>
          </div>
        </div>

        <div class="grid-stack-item" gs-w="3" gs-h="1">
          <div class="grid-stack-item-content glass-card group">
            <p class="label">Humedad</p>
            <h2 class="value text-mako-800 dark:text-white">
              {{ store.humidity }}<span class="unit text-primary">%</span>
            </h2>
          </div>
        </div>

        <div class="grid-stack-item" gs-w="3" gs-h="1">
          <div class="grid-stack-item-content glass-card group">
            <p class="label">Batería</p>
            <h2
              class="value"
              :class="store.battery < 20 ? 'text-red-500' : 'text-mako-800 dark:text-white'"
            >
              {{ store.battery
              }}<span class="unit" :class="store.battery < 20 ? 'text-red-400' : 'text-primary'"
                >%</span
              >
            </h2>
          </div>
        </div>

        <div class="grid-stack-item" gs-w="3" gs-h="1">
          <div class="grid-stack-item-content glass-card group">
            <p class="label">Voltaje</p>
            <h2 class="value text-mako-800 dark:text-white">
              {{ store.voltage }}<span class="unit text-primary">V</span>
            </h2>
          </div>
        </div>

        <div class="grid-stack-item" gs-w="4" gs-h="1" gs-x="0" gs-y="1">
          <div class="grid-stack-item-content glass-card group">
            <p class="label">Consumo de Potencia</p>
            <h2 class="value text-mako-800 dark:text-white">
              {{ store.power }}<span class="unit text-primary">W</span>
            </h2>
          </div>
        </div>

        <div class="grid-stack-item" gs-w="4" gs-h="2" gs-x="8" gs-y="1">
          <div class="grid-stack-item-content glass-card !p-0 overflow-hidden relative group">
            <div
              class="absolute inset-0 bg-mako-200 dark:bg-mako-800/50 flex items-center justify-center opacity-50 transition-opacity group-hover:opacity-30"
            >
              <span class="text-sm text-mako-500 dark:text-mako-400 font-medium"
                >Contenedor futuro de Leaflet Map</span
              >
            </div>
            <div
              class="absolute bottom-0 w-full p-6 bg-gradient-to-t from-white via-white/90 to-transparent dark:from-mako-900 dark:via-mako-900/90"
            >
              <p class="label flex items-center gap-1">
                <svg
                  class="w-4 h-4 text-primary"
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
              <h2 class="text-lg font-medium mt-1 text-mako-800 dark:text-white">
                {{ store.location.name }}
              </h2>
              <p class="text-xs text-mako-500 dark:text-mako-400 mt-1">
                Lat: {{ store.location.lat }} | Lng: {{ store.location.lng }}
              </p>
            </div>
          </div>
        </div>

        <div class="grid-stack-item" gs-w="8" gs-h="2" gs-x="0" gs-y="2">
          <div class="grid-stack-item-content glass-card group items-start">
            <div class="flex justify-between w-full mb-4 items-center">
              <p class="label">Historial de Potencia</p>
              <span
                class="text-xs font-medium px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20 shadow-[0_0_10px_rgba(0,209,94,0.1)]"
                >En vivo</span
              >
            </div>
            <div
              class="w-full flex-1 rounded-[1.5rem] border border-dashed border-mako-300 dark:border-mako-700 bg-white/40 dark:bg-mako-800/30 flex items-center justify-center transition-colors group-hover:border-primary/50"
            >
              <p class="text-mako-400 dark:text-mako-500 flex flex-col items-center gap-2">
                <svg
                  class="w-8 h-8 opacity-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
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

<style lang="postcss">
/* Reset básico para Gridstack */
.grid-stack-item-content {
  @apply overflow-hidden;
}

/* --- ESTILOS GLASSMORPHISM MODERNOS --- */
.glass-card {
  @apply flex flex-col items-center justify-center p-6 bg-white/80 dark:bg-mako-900/60 backdrop-blur-xl border border-white/40 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] rounded-[2rem] transition-all duration-300 hover:-translate-y-1 hover:shadow-primary/20 dark:hover:shadow-primary/10;
}

.label {
  @apply text-xs uppercase font-bold tracking-widest text-mako-500 dark:text-mako-400 transition-colors group-hover:text-mako-700 dark:group-hover:text-mako-300;
}

.value {
  @apply text-5xl font-semibold tracking-tighter mt-1 drop-shadow-sm;
}

.unit {
  @apply text-lg ml-1 font-medium opacity-80;
}
</style>

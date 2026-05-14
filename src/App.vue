<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { startMockService, stopMockService } from './services/mockService'
import { useMetricsStore } from './stores/metrics'
import { useDark, useToggle } from '@vueuse/core'
import { GridStack } from 'gridstack'
import 'gridstack/dist/gridstack.min.css'
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'

const store = useMetricsStore()
const isDark = useDark()
const toggleDark = useToggle(isDark)
const zoom = ref(15)
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
            isSystemActive ? 'Sistema Activo' : 'Encender Sistema'
          }}</span>
          <div
            class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-shimmer z-0"
          ></div>
        </button>

        <button
          @click="toggleDark()"
          class="hover:bg-mako-200 dark:hover:bg-white/10 p-2 rounded-full transition-colors flex items-center justify-center text-mako-800 dark:text-mako-200"
        >
          <svg
            v-if="isDark"
            class="w-6 h-6"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M7 3V0H9V3H7Z" fill="currentColor"></path>
              <path d="M9 13V16H7V13H9Z" fill="currentColor"></path>
              <path
                d="M11 8C11 9.65685 9.65685 11 8 11C6.34315 11 5 9.65685 5 8C5 6.34315 6.34315 5 8 5C9.65685 5 11 6.34315 11 8Z"
                fill="currentColor"
              ></path>
              <path d="M0 9H3V7H0V9Z" fill="currentColor"></path>
              <path d="M16 7H13V9H16V7Z" fill="currentColor"></path>
              <path
                d="M3.75735 5.17157L1.63603 3.05025L3.05025 1.63603L5.17157 3.75735L3.75735 5.17157Z"
                fill="currentColor"
              ></path>
              <path
                d="M12.2426 10.8284L14.364 12.9497L12.9497 14.364L10.8284 12.2426L12.2426 10.8284Z"
                fill="currentColor"
              ></path>
              <path
                d="M3.05025 14.364L5.17157 12.2426L3.75735 10.8284L1.63603 12.9498L3.05025 14.364Z"
                fill="currentColor"
              ></path>
              <path
                d="M12.9497 1.63604L10.8284 3.75736L12.2426 5.17158L14.364 3.05026L12.9497 1.63604Z"
                fill="currentColor"
              ></path>
            </g>
          </svg>

          <svg
            v-else
            class="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.23129 2.24048C9.24338 1.78695 10.1202 2.81145 9.80357 3.70098C8.72924 6.71928 9.38932 10.1474 11.6193 12.3765C13.8606 14.617 17.3114 15.2755 20.3395 14.1819C21.2206 13.8637 22.2173 14.7319 21.7817 15.7199C21.7688 15.7491 21.7558 15.7782 21.7427 15.8074C20.9674 17.5266 19.7272 19.1434 18.1227 20.2274C16.4125 21.3828 14.3957 22.0001 12.3316 22.0001H12.3306C9.93035 21.9975 7.6057 21.1603 5.75517 19.6321C3.90463 18.1039 2.64345 15.9797 2.18793 13.6237C1.73241 11.2677 2.11094 8.82672 3.2586 6.71917C4.34658 4.72121 6.17608 3.16858 8.20153 2.25386L8.23129 2.24048Z"
                fill="currentColor"
              ></path>
            </g>
          </svg>
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
            <div class="w-full h-full z-0">
              <l-map
                ref="map"
                v-model:zoom="zoom"
                :center="[store.location.lat, store.location.lng]"
                :use-global-leaflet="false"
              >
                <l-tile-layer
                  url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                  layer-type="base"
                  name="CartoDB Voyager"
                ></l-tile-layer>

                <l-marker :lat-lng="[store.location.lat, store.location.lng]"></l-marker>
              </l-map>
            </div>

            <div
              class="absolute bottom-0 w-full p-4 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-mako-900 dark:via-mako-900/80 z-10 pointer-events-none"
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
                Ubicación en Vivo
              </p>
              <h2 class="text-sm font-semibold mt-1 text-mako-800 dark:text-white">
                {{ store.location.name }}
              </h2>
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

.dark .leaflet-tile-pane {
  filter: brightness(0.6) invert(1) contrast(3) hue-rotate(200deg) saturate(0.3) brightness(0.7);
}

.dark .leaflet-marker-icon,
.dark .leaflet-marker-shadow {
  filter: invert(1) hue-rotate(-200deg) brightness(1.5);
}

.leaflet-container {
  z-index: 1 !important;
  background: transparent !important;
}
</style>

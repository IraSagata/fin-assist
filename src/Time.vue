<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const time = getLocalTime(Intl.DateTimeFormat().resolvedOptions().timeZone)
const timezone = ref<string>('')
const selectedTz = ref<string>('UTC')
const timezones = [
    'UTC',
    'America/New_York',
    'Europe/London',
    'Asia/Tokyo',
    'Australia/Sydney',
    'Europe/Paris',
    'America/Los_Angeles',
    'Asia/Shanghai',
    'Africa/Johannesburg',
    'America/Sao_Paulo',
]

function getLocalTime(tz: string) {
    const now = new Date()
    const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: tz,
    }
    return now.toLocaleTimeString([], options)
}


</script>

<template>
  <section class="time__section">
    <div class="container-xxl time__container">

        <h1 class="time__title">Current Time</h1>
        <span class="time__current">Local Time: {{ time }}</span>
        <p class="time__current" >{{ getLocalTime(selectedTz) }}</p>
        <p class="time__current">Timezone: {{ timezone }}</p>
        <select v-model="selectedTz" class="time__select">
            <option v-for="tz in timezones" :key="tz" :value="tz">
                {{ tz }}
            </option>
        </select>
    </div>
  </section>
</template>

<style scoped>
    .time__section {
        padding: 2rem 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .time__container {
        text-align: center;
    }
    
    .time__title {
        font-size: 2rem;
        margin-bottom: 1rem;
    }
    
    .time__current {
        font-size: 1.5rem;
        color: #333;
    }

</style>

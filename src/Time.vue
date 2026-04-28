<script setup lang="ts">
import { ref } from 'vue'

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

<style scoped lang="scss">
.time__section {
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(180deg, #F7F4F2 0%, #EFEAE7 100%);

    .time__container {
        width: 100%;
        max-width: 28rem;
        padding: 2rem 1.5rem;
        border-radius: 1.5rem;
        background: rgba(255, 255, 255, 0.6);
        backdrop-filter: blur(1.25rem);
        box-shadow: 0 0.625rem 1.875rem rgba(0,0,0,0.05);
        text-align: center;

        .time__title {
            font-size: 1.8rem;
            font-weight: 600;
            color: #2B2B2B;
            margin-bottom: 1.5rem;
        }

        .time__current:first-of-type {
            font-size: 2.2rem;
            font-weight: 600;
            color: #D17862;
            margin-bottom: 0.5rem;
        }

        .time__current {
            display: block;
            font-size: 1rem;
            color: #7A7A7A;
            margin-top: 0.3rem;
        }

        .time__select {
            margin-top: 1.5rem;
            width: 100%;

            padding: 0.8rem 1rem;
            border-radius: 1rem;

            border: 0.0625rem solid #E5E5E5;
            background: #FFFFFF;

            font-size: 1rem;

            transition: all 0.2s ease;
        }

        .time__select:focus {
            outline: none;
            border-color: #D17862;
            box-shadow: 0 0 0 0.25rem rgba(209, 120, 98, 0.15);
        }
    }
}
</style>

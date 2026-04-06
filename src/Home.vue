<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { useFetch } from './scripts/fetch'

const apiBaseUrl = 'https://api.frankfurter.dev/v2'

const selectedCurrency = ref('UAH')

const targetCurrencies = reactive(['USD', 'EUR', 'PLN', 'AED', 'UAH'])

const { data: allCurrencies } = useFetch(`${apiBaseUrl}/currencies`)

const data = ref(null)

const getCurrencyName = (currency: string) => {
  return allCurrencies.value.find(item => item.iso_code === currency).name
}

// const { data, error } = useFetch(`${apiBaseUrl}/rates?base=${selectedCurrency.value}&quotes=${targetCurrencies.join(',')}`)

// https://api.frankfurter.dev/v2/rates?base=UAH&quotes=USD,EUR,PLN,AED,UAH

watch(
  selectedCurrency, 
  async () => {
    const response = await fetch(
      `${apiBaseUrl}/rates?base=${selectedCurrency.value}&quotes=${targetCurrencies.join(',')}`
    )
    data.value = await response.json()
  },
  { immediate: true }
  )
</script>

<template>
  <main>
    <section class="exchange__section">
      <div class="container-xxl">
        <h1 class="exchange__title">Exchange rate</h1>
        <label class="exchange__label" for="currencies">Choose a currency:</label>
        <select class="exchange__select" id="currencies" v-model="selectedCurrency">
          <option
            class="exchange__option"
            v-for="currency in allCurrencies"
            :key="currency"
            :value="currency.iso_code"
          >
            {{ currency.iso_code }}
          </option>
        </select>
        <div class="exchange__rates">
          <div
            v-for="item in data"
            class="exchange__rate-item"
          >
            <span class="exchange__currency">{{ getCurrencyName(item.quote) }} ({{ item.quote }})</span>
            <span class="exchange__rate">{{ item.rate }}</span>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.exchange {
  padding: 2rem;
  font-family: system-ui, -apple-system, sans-serif;
  background-color: #f9fafb;
  min-height: 100vh;
}

.exchange__control {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.exchange__label {
  font-size: 0.9rem;
  color: #555;
  margin-right: 1rem;
}

.exchange__select {
  padding: 0.6rem 0.8rem;
  border-radius: 0.5rem;
}

.exchange__select:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(3, 6, 11, 0.2);
}

.exchange__rate-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  margin-top: 0.75rem;
  max-width: 15rem;
  border-radius: 0.5rem;
  background-color: #f3f4f6;
}

.exchange__value {
  font-weight: 600;
  color: #111827;
}
</style>

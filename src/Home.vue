<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { useFetch } from './scripts/fetch'
import Banner from './components/Banner.vue'

const apiBaseUrl = 'https://api.frankfurter.dev/v2'
 
const selectedCurrency = ref('UAH')
const amount = ref(1)
const targetCurrencies = reactive(['USD', 'EUR', 'PLN', 'AED', 'UAH'])

// Load from localStorage on init
const storedTargetCurrencies = localStorage.getItem('targetCurrencies')
if (storedTargetCurrencies) {
  const parsedCurrencies = JSON.parse(storedTargetCurrencies)
  if (Array.isArray(parsedCurrencies)) {
    targetCurrencies.splice(0, targetCurrencies.length, ...parsedCurrencies)
  }
}

const { data: allCurrencies } = useFetch(`${apiBaseUrl}/currencies`)
 
const data = ref(null)

const getCurrencyName = (currencyCode: string) => {
  const allCurrenciesArray = allCurrencies.value as Array<{ iso_code: string; name: string }> | null
  const currency = allCurrenciesArray?.find(item => item.iso_code === currencyCode)
  return currency?.name
}

// const { data, error } = useFetch(`${apiBaseUrl}/rates?base=${selectedCurrency.value}&quotes=${targetCurrencies.join(',')}`)

// https://api.frankfurter.dev/v2/rates?base=UAH&quotes=USD,EUR,PLN,AED,UAH

// rozetka.ua

// api.rozetka.ua/api/

watch(
  [selectedCurrency, targetCurrencies, amount], 
  async () => {
    const response = await fetch(
      `${apiBaseUrl}/rates?base=${selectedCurrency.value}&quotes=${targetCurrencies.join(',')}`
    )
    data.value = await response.json()
  },
  { immediate: true }
)

const newCurrency = ref('')

const addCurrency = () => {
  if (!newCurrency.value) return

  if (targetCurrencies.includes(newCurrency.value)) {
    alert('Already added')
    return
  }

  targetCurrencies.push(newCurrency.value)
  newCurrency.value = ''

  localStorage.setItem('targetCurrencies', JSON.stringify(targetCurrencies))
}

</script>

<template>
  <Banner>
    <p>🚨 <strong>NEW RECIPE:</strong> Triple Chocolate Chip Cookies! 🚨</p>
  </Banner>
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
              {{ currency.iso_code }} ({{ getCurrencyName(currency.iso_code) }})
            </option>
          </select>
          <label class="exchange__amount-label" for="amount">Amount:</label>
          <input class="exchange__amount" type="number" v-model="amount" />
        <div class="exchange__rates">
            <div
              v-for="item in data"
              :key="item.quote"
              class="exchange__rate-item"
            >
              <span class="exchange__currency">
                {{ item.quote }} ({{ getCurrencyName(item.quote) }})
              </span>
              <span class="exchange__rate">
                {{ (item.rate * amount).toFixed(2) }}
              </span>
            </div>
        </div>
        <div class="exchange-add">
  <button class="add-btn">+</button>

  <select
    class="exchange__select-add"
    name="currenciesAddButton"
    v-model="newCurrency"
    @change="addCurrency"
  >
    <option disabled value="">Select currency</option>

    <option
      v-for="currency in allCurrencies"
      :key="currency.iso_code"
      :value="currency.iso_code"
    >
      {{ currency.iso_code }} ({{ getCurrencyName(currency.iso_code) }})
    </option>
  </select>
</div>
        </div>
    </section>
  </main>
</template>

<style scoped>
.exchange__label {
  font-size: 0.9rem;
  color: #555;
  margin-right: 1rem;
}

.exchange__select {
  padding: 0.6rem 0.8rem;
  border-radius: 0.5rem;
  margin-top: 0.6rem;
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
  border-radius: 0.5rem;
  background-color: #f3f4f6;
}

.exchange__value {
  font-weight: 600;
  color: #111827;
}

.exchange-add {
  position: relative;
  display: inline-block;
}

/* Your nice button */
.add-btn {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: none;
  background: #2d6cdf;
  margin-top: 1rem;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

/* Invisible select ON TOP of button */
.exchange__select-add {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  opacity: 0;        /* 👈 invisible but clickable */
  cursor: pointer;
}

.exchange__amount {
  margin-left: 1rem;
  padding: 0.6rem 0.8rem;
  border-radius: 0.5rem;
}

.exchange__amount-label {
  font-size: 0.9rem;
  color: #555;
  margin-left: 1rem;
}

</style>

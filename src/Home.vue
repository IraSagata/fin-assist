<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useFetch } from './scripts/fetch'

const apiBaseUrl = 'https://api.frankfurter.dev/v2'

const baseCurrencies = reactive(['UAH','USD', 'EUR', 'PLN'])

const targetCurrencies = reactive(['USD', 'EUR', 'PLN', 'AED'])

const { data, error } = useFetch(`${apiBaseUrl}/rates?base=${baseCurrencies[0]}&quotes=${targetCurrencies.join(',')}`)

</script>

<template>
  <label for="currencies">Choose a currency:</label>
  <select id="currencies">
    <option v-for="currency in baseCurrencies" value="{{ currency }}">{{ currency }}</option>
  </select>
  <table> 
    <tr v-for="item in data">
      <td>{{ item.quote }}</td>
      <td>{{ item.rate }}</td>
    </tr>
  </table>
</template>

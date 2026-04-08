// // composables/useRates.ts
// import { ref, watch, type Ref } from 'vue'
// import { apiClient } from './api/client'
// import type { AxiosError } from 'axios'

// interface RatesResponse {
//   base: string
//   date: string
//   rates: Record<string, number>
//   apiClient?: string
//   quote: string
//   rate: number
// }

// export function useRates(
//   selectedCurrency: Ref<string>,
//   targetCurrencies: string[]
// ) {
//   const rates = ref<RatesResponse | null>(null)
//   const error = ref<string | null>(null)
//   const isLoading = ref(false)

//   const fetchRates = async () => {
//     isLoading.value = true
//     error.value = null

//     try {
//       // Clean params via axios params option — no manual string building
//       const { data } = await apiClient.get<RatesResponse>('/rates', {
//         params: {
//           base: selectedCurrency.value,
//           quotes: targetCurrencies.join(','),
//         },
//       })

//       rates.value = data
//     } catch (err) {
//       const axiosError = err as AxiosError
//       error.value = axiosError.message
//     } finally {
//       isLoading.value = false
//     }
//   }

//   watch(selectedCurrency, fetchRates, { immediate: true })

//   return { rates, error, isLoading }
// }

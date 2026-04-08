// // composables/useFetch.ts
// import { ref, type Ref } from 'vue'
// import { apiClient } from './api/client'
// import type { AxiosError } from 'axios'

// interface UseFetchReturn<T> {
//   data: Ref<T | null>
//   error: Ref<string | null>
//   isLoading: Ref<boolean>
// }

// export function useFetch<T = unknown>(url: string): UseFetchReturn<T> {
//   const data = ref<T | null>(null) as Ref<T | null>
//   const error = ref<string | null>(null)
//   const isLoading = ref(true)

//   // No need to check res.ok — axios throws automatically on 4xx/5xx
//   apiClient
//     .get<T>(url)
//     .then((response) => {
//       data.value = response.data // no .json() needed
//     })
//     .catch((err: AxiosError) => {
//       error.value = err.message
//     })
//     .finally(() => {
//       isLoading.value = false
//     })

//   return { data, error, isLoading }
// }

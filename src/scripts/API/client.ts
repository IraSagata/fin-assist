// // api/client.ts
// import axios from 'axios'

// export const apiClient = axios.create({
//   baseURL: 'https://api.frankfurter.dev/v2',
//   timeout: 10_000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// })

// // Optional: global interceptors
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // centralized error handling (logging, toast notifications, etc.)
//     console.error('[API Error]', error.response?.status, error.message)
//     return Promise.reject(error)
//   }
// )

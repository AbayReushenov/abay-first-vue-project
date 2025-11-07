// src/composables/useFetch.ts
import { ref } from 'vue'

export function useFetch<T>(url: string) {
  const data = ref<T | null>(null)
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const execute = async () => {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(url)
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      data.value = await res.json()
    } catch (e) {
      error.value = e as Error
      data.value = null
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, execute }
}

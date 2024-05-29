export function useBaseFetch(url, options = {}) {
  const baseUrl = process.env.BASE_API_URL

  return $fetch(baseUrl + url, {
    ...options,
    timeout: 10000,
    credentials: 'include',
    onResponseError: (error) => {
      console.error('$fetch error', error.response._data.message)
    },
  })
}

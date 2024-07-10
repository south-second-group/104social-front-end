export function useBaseFetch(url, options = {}) {
  const userDataStore = useUserDataStore()
  const baseUrl = process.env.BASE_API_URL

  return $fetch(baseUrl + url, {
    ...options,
    timeout: 10000,
    // credentials: 'include',
    headers: {
      authorization: userDataStore.token || null,
      ...options.headers,
    },
    onResponseError: (error) => {
      console.error('$fetch error', error.response._data.message)
    },
  })
}

export function useSSRFetch(url, options = {}) {
  const userDataStore = useUserDataStore()
  const baseUrl = process.env.BASE_API_URL

  return useFetch(baseUrl + url, {
    ...options,
    timeout: 10000,
    // credentials: 'include',
    headers: {
      authorization: userDataStore.token || null,
      ...options.headers,
    },
    onResponseError: (error) => {
      console.error('$fetch error', error.response._data.message)
    },
  })
}

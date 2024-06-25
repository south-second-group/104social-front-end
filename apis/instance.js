export function useBaseFetch(url, options = {}) {
  // const userDataStore = useUserDataStore()
  // const token = userDataStore.userToken || ''
  const baseUrl = process.env.BASE_API_URL

  return $fetch(baseUrl + url, {
    ...options,
    timeout: 10000,
    credentials: 'include',
    // headers: {
    //   'Content-Type': 'application/json',
    //   'Authorization': token,
    // },
    onResponseError: (error) => {
      console.error('$fetch error', error.response._data.message)
    },
  })
}

import { useBaseFetch } from '../instance'

async function keywordSearch(query, body) {
  const { page, sort } = query
  const url = `/api/v1/search-list/?page=${page}&sort=${sort}`

  return useBaseFetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
}

async function getEliteList() {
  const url = `/api/v1/elite-list/`

  return useBaseFetch(url, {
    method: 'GET',
  })
}

async function maybeYouLikeSearch(query) {
  const { page, sort } = query
  const url = `/api/v1/maybe-you-like/?page=${page}&sort=${sort}`

  return useBaseFetch(url, {
    method: 'GET',
  })
}

export const searchApi = {
  keywordSearch,
  getEliteList,
  maybeYouLikeSearch,
}

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

export const searchApi = {
  keywordSearch,
}

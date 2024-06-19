import { useBaseFetch } from '../instance'

// 取得搜尋結果列表
async function getSearchResultList(params) {
  const { keyword, pageNumber, pageSize } = params
  let url = `/api/v1/search-list/keyword?pageNumber=${pageNumber}&pageSize=${pageSize}&`
  if (keyword && keyword.length > 0)
    url += `keyword=${keyword}`

  return useBaseFetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const searchApi = {
  getSearchResultList,
}

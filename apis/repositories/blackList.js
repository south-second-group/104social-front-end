import { useBaseFetch } from '../instance'

async function getBlackList() {
  return useBaseFetch('/api/v1/black-list', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

async function getBlackListDetail(id) {
  return useBaseFetch(`/api/v1/black-list/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

async function postBlackList(body) {
  return useBaseFetch('/api/v1/black-list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
}

async function deleteBlackListById(params) {
  return useBaseFetch(`/api/v1/black-list/${params}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const blackListApi = {
  getBlackList,
  getBlackListDetail,
  postBlackList,
  deleteBlackListById,
}

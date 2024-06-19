import { useBaseFetch } from '../instance'

async function getCollections() {
  return useBaseFetch('/api/v1/collections', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

async function addCollection(body) {
  return useBaseFetch('/api/v1/collections', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
}

async function deleteCollectionById(body) {
  return useBaseFetch(`/api/v1/collections`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
}

export const collectionApi = {
  getCollections,
  addCollection,
  deleteCollectionById,
}

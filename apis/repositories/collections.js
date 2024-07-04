import { useBaseFetch } from '../instance'

async function getCollections() {
  return useBaseFetch('/api/v1/user/collections', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

async function getCollectionsDetail(id) {
  return useBaseFetch(`/api/v1/user/collection/${id}`, {
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

async function deleteCollectionById(params) {
  return useBaseFetch(`/api/v1/collections/${params}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const collectionApi = {
  getCollections,
  getCollectionsDetail,
  addCollection,
  deleteCollectionById,
}

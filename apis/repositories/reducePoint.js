import { useBaseFetch } from '../instance'

async function reducePoint(params) {
  return useBaseFetch(`/api/v1/reduce-point/${params}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const reducePointApi = {
  reducePoint,
}

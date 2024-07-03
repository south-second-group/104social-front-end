import { useBaseFetch } from '../instance'

async function createOrder(body) {
  const url = `/api/v1/create-order`

  return useBaseFetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
}

async function createSubscriptionOrder(body) {
  const url = `/api/v1/create-subscription-order`

  return useBaseFetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
}

export const ordersAPI = {
  createOrder,
  createSubscriptionOrder,
}

import { useBaseFetch } from '../instance'

async function acceptInvitation(params) {
  const url = `/api/v1/who-invite-me/${params}/accept`

  return useBaseFetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

async function rejectInvitation(params) {
  const url = `/api/v1/who-invite-me/${params}/reject`

  return useBaseFetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const beInviteApi = {
  acceptInvitation,
  rejectInvitation,
}

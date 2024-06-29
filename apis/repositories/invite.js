import { useBaseFetch } from '../instance'

async function postInvitation(body) {
  const url = `/api/v1/invite`

  return useBaseFetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
}

async function cancelInvitation(params) {
  const url = `/api/v1/i-invite-who/${params}/cancel`

  return useBaseFetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

async function finishInvitationDating(params) {
  const url = `/api/v1/i-invite-who/${params}/finishDating`

  return useBaseFetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

async function deleteInvitation(params) {
  return useBaseFetch(`/api/v1/i-invite-who/${params}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const inviteApi = {
  postInvitation,
  cancelInvitation,
  finishInvitationDating,
  deleteInvitation,
}

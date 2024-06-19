import { useBaseFetch } from '../instance'

async function unlockComment(params) {
  return useBaseFetch(`/api/v1/unlock-comment/${params}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const unlockCommentApi = {
  unlockComment,
}

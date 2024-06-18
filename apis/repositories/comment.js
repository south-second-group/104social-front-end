import { useBaseFetch } from '../instance'

async function getCommentByUserId(params) {
  return useBaseFetch(`/api/v1/comment-list/${params}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

async function postComment(body) {
  return useBaseFetch(`/api/v1/comment-i-left`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
}

async function deleteComment(params) {
  return useBaseFetch(`/api/v1/comment-i-left/${params}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const commentApi = {
  getCommentByUserId,
  postComment,
  deleteComment,
}

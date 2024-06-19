import { useBaseFetch } from '../instance'

// 我留下的評價
async function getCommentByIdAndUserId(params) {
  return useBaseFetch(`/api/v1/comment-i-left/${params}`, {
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

// 該卡片用戶的評價 (多個)
async function getCommentByUserId(params) {
  return useBaseFetch(`/api/v1/comment-list/${params}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const commentApi = {
  getCommentByIdAndUserId,
  postComment,
  deleteComment,
  getCommentByUserId,
}

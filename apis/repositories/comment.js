import { useBaseFetch } from '../instance'

// 我留下的評價內頁
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

async function deleteComment(params, body) {
  return useBaseFetch(`/api/v1/comment-i-left/${params}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
}

// 我留下的評價列表
async function getCommentILiftList() {
  return useBaseFetch(`/api/v1/comment-i-left-list`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

// 該卡片用戶的評價 (多個) (需有解鎖)
async function getCommentByUserId(params) {
  return useBaseFetch(`/api/v1/comment-list/${params}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

// 無需解鎖
async function getCommentList(params) {
  return useBaseFetch(`/api/v1/comment-list-no-check/${params.id}?page=${params.page}`, {
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
  getCommentList,
  getCommentILiftList,
}

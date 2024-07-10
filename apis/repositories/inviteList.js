import { useBaseFetch } from '../instance'

/*
 * invitation-邀約
 */
// 取得邀約列表
async function getInviteWhoList(query) {
  const { page, sort } = query
  const url = `/api/v1/i-invite-who-list/?page=${page}&pageSize=${sort}`
  return useBaseFetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

// 取得邀約人詳細資料
async function getInviteWho(id) {
  return useBaseFetch(`/api/v1/i-invite-who/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

// 刪除邀約
async function deleteInviteWho(id) {
  return useBaseFetch(`/api/v1/i-invite-who/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

// 取消邀約
async function cancelInviteWho(id) {
  return useBaseFetch(`/api/v1/i-invite-who/${id}/cancel`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

// 新增邀約
async function addInvite(data) {
  return useBaseFetch('/api/v1/invite', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      invitedUserId: data.invitedUserId,
      message: {
        title: data.title,
        content: data.content,
      },
    }),
  })
}

/*
 * beInvitation-被邀約
 */
// 取得誰邀約我列表
async function getInviteMeList(query) {
  const { page, sort } = query
  const url = `/api/v1/who-invite-me-list/?page=${page}&pageSize=${sort}`
  return useBaseFetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

// 取得被邀約人詳細資料
async function getInviteMe(id) {
  return useBaseFetch(`/api/v1/who-invite-me/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

// 刪除被邀約
async function deleteInviteMe(id) {
  return useBaseFetch(`/api/v1/who-invite-me/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

// 取消邀約
async function cancelInviteMe(id) {
  return useBaseFetch(`/api/v1/who-invite-me/${id}/cancel`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

// 接受邀約
async function acceptInviteMe(id) {
  return useBaseFetch(`/api/v1/who-invite-me/${id}/accept`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const inviteListApi = {
  getInviteWhoList,
  getInviteWho,
  deleteInviteWho,
  cancelInviteWho,
  addInvite,
  getInviteMeList,
  getInviteMe,
  deleteInviteMe,
  cancelInviteMe,
  acceptInviteMe,
}

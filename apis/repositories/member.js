import { useBaseFetch } from '../instance'

// 完成編輯會員資料
async function userDataPatch(data) {
  return useBaseFetch('/api/v1/user-data', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

// 新增會員資料
async function addUserData(data) {
  return useBaseFetch('/api/v1/user-data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: data.userId,
      nickNameDetails: {
        nickName: data.nickName,
        isShow: data.isShow,
      },
    }),
  })
}

// 取得會員資料
async function getUserData() {
  return useBaseFetch('/api/v1/user-data', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const memberAPI = {
  userDataPatch,
  addUserData,
  getUserData,
}
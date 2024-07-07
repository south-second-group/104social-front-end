import { memberAPI } from '@/apis/repositories/member'
import { matchListApi } from '@/apis/repositories/matchList'

export const useMemberStore = defineStore('member', () => {
  // 暫存資料
  const tempData = reactive({})

  // 圖像預覽
  const previewImage = ref('')

  // 配對設定資料
  const matchListSelfSettingData = ref([])
  const tempMatchListData = ref([])

  // 會員基本資料
  const basicInfo = reactive({
    name: '',
    userId: '',
    email: '',
    rating: 0,
    isMatch: false,
    point: 0,
    isSubscribe: false,
  })

  // 大頭貼
  const personalPhoto = reactive({
    photo: '',
    isShow: false,
  })

  // 自我介紹
  const personalIntro = reactive({
    content: '',
    isShow: false,
  })

  // 個人資料
  const personalDetails = reactive([
    {
      label: '姓名',
      value: '',
      placeholder: '請輸入姓名',
      isShow: false,
    },
    {
      label: 'Line ID',
      value: '',
      placeholder: '請輸入Line ID',
      isShow: false,
    },
  ])

  // 熱門標籤
  const popularTags = reactive([])

  // 個人狀態
  const personalStatus = reactive({
    rating: 0,
    isShow: false,
    isMatch: true,
  })

  // 我的標籤
  const personalMyTags = reactive([])
  function addToPersonalMyTags(tag) {
    if (personalMyTags.includes(tag))
      return
    personalMyTags.push(tag)
  }
  function removeFromPersonalMyTags(tag) {
    const index = personalMyTags.indexOf(tag)
    if (index > -1)
      personalMyTags.splice(index, 1)
  }

  // 編輯狀態
  const editStatus = ref(false)
  const toggleEditStatus = (status, cancel = false) => {
    // 如果是取消編輯
    if (cancel === true) {
      basicInfo.name = tempData.basicInfo.name
      basicInfo.userId = tempData.basicInfo.userId
      basicInfo.email = tempData.basicInfo.email
      basicInfo.rating = tempData.basicInfo.rating
      basicInfo.isMatch = tempData.basicInfo.isMatch
      basicInfo.point = tempData.basicInfo.point

      personalIntro.content = tempData.personalIntro.content
      personalIntro.isShow = tempData.personalIntro.isShow

      personalDetails[0].value = tempData.personalDetails[0].value
      personalDetails[0].isShow = tempData.personalDetails[0].isShow

      personalDetails[1].value = tempData.personalDetails[1].value
      personalDetails[1].isShow = tempData.personalDetails[1].isShow

      personalMyTags.splice(0, personalMyTags.length, ...tempData.personalMyTags)

      personalStatus.rating = tempData.personalStatus.rating
      personalStatus.isShow = tempData.personalStatus.isShow
      personalStatus.isMatch = tempData.personalStatus.isMatch

      matchListSelfSettingData.value = tempMatchListData.value
    }
    editStatus.value = !status
  }

  /** 取得會員資料 */
  async function getMemberData() {
    try {
      const res = await memberAPI.getUserData()
      const tagListRes = await memberAPI.getTagList()
      const matchRes = await matchListApi.getMatchListSelf()

      if (tagListRes) {
        const { hashTags } = tagListRes.data[0]

        popularTags.splice(0, popularTags.length, ...hashTags.value)
      }

      if (matchRes) {
        const { data } = matchRes

        matchListSelfSettingData.value = data
        matchListSelfSettingData.value.searchDataBase = []

        tempMatchListData.value = JSON.parse(JSON.stringify(data))
      }
      if (res) {
        const {
          photoDetails,
          introDetails,
          nickNameDetails,
          lineDetails,
          tags,
          exposureSettings,
          userStatus,
          userInfo,
        } = res.data

        basicInfo.name = userInfo.personalInfo.username
        basicInfo.userId = userInfo._id
        basicInfo.email = userInfo.personalInfo.email
        basicInfo.rating = userStatus.rating
        basicInfo.isMatch = exposureSettings.isMatch
        basicInfo.point = userInfo.points
        basicInfo.isSubscribe = userInfo.isSubscribe

        personalPhoto.photo = photoDetails.photo
        personalPhoto.isShow = photoDetails.isShow

        personalIntro.content = introDetails.intro
        personalIntro.isShow = introDetails.isShow

        personalDetails[0].value = nickNameDetails.nickName
        personalDetails[0].isShow = nickNameDetails.isShow

        personalDetails[1].value = lineDetails.lineId
        personalDetails[1].isShow = lineDetails.isShow

        personalMyTags.splice(0, personalMyTags.length, ...tags)

        personalStatus.rating = exposureSettings.rating
        personalStatus.isShow = exposureSettings.isShow
        personalStatus.isMatch = exposureSettings.isMatch

        // 存儲初始資料到 tempData
        tempData.basicInfo = JSON.parse(JSON.stringify(basicInfo))
        tempData.personalIntro = JSON.parse(JSON.stringify(personalIntro))
        tempData.personalDetails = JSON.parse(JSON.stringify(personalDetails))
        tempData.personalMyTags = JSON.parse(JSON.stringify(personalMyTags))
        tempData.personalStatus = JSON.parse(JSON.stringify(personalStatus))
      }
      return true
    }
    catch (error) {
      console.error(error)
      return false
    }
  }

  const imageFile = ref(null)

  /** 完成編輯 */
  async function changeInfo() {
    const updateData = {
      photoDetails: {
        photo: personalPhoto.photo,
        isShow: personalPhoto.isShow,
      },
      introDetails: {
        intro: personalIntro.content,
        isShow: personalIntro.isShow,
      },
      nickNameDetails: {
        nickName: personalDetails[0].value,
        isShow: personalDetails[0].isShow,
      },
      lineDetails: {
        lineId: personalDetails[1].value,
        isShow: personalDetails[1].isShow,
      },
      tags: personalMyTags,
      exposureSettings: {
        rating: personalStatus.rating,
        isShow: personalStatus.isShow,
        isMatch: personalStatus.isMatch,
      },
    }

    // 確認是否有圖片需要上傳
    if (imageFile.value) {
      const formData = new FormData()
      formData.append('image', imageFile.value)

      try {
        const uploadRes = await memberAPI.uploadImage(formData)
        updateData.photoDetails.photo = uploadRes.data.user.photo
        personalPhoto.photo = uploadRes.data.user.photo
        previewImage.value = uploadRes.data.user.photo
      }
      catch (error) {
        updateData.photoDetails.photo = personalPhoto.photo
        previewImage.value = personalPhoto.photo
        console.error(error)
        throw new Error('照片上傳失敗')
      }
    }
    try {
      const res = await memberAPI.userDataPatch(updateData)

      // 若選兩個就清除請選擇 （暫時，之後直接改選項 為禁用請選擇 0輸入保留）
      if (matchListSelfSettingData.value.personalInfo.activities.length > 1) {
        matchListSelfSettingData.value.personalInfo.activities = matchListSelfSettingData.value.personalInfo.activities.filter(
          i => i !== 0,
        )
      }
      if (matchListSelfSettingData.value.workInfo.industry.length > 1)
        matchListSelfSettingData.value.workInfo.industry = matchListSelfSettingData.value.workInfo.industry.filter(i => i !== 0)

      await matchListApi.updateMatchListSelf(
        matchListSelfSettingData.value,
      )

      return res
    }
    catch (error) {
      console.error(error)
      throw new Error('用戶資訊修改失敗')
    }
    finally {
      await getMemberData()
    }
  }

  /** 處理圖片預覽 */
  async function handleFileChange(event) {
    imageFile.value = event.target.files[0]

    if (imageFile.value) {
      const reader = new FileReader()
      reader.onload = (e) => {
        previewImage.value = e.target.result
      }
      reader.readAsDataURL(imageFile.value)
    }
  }

  return {
    previewImage,
    matchListSelfSettingData,
    tempMatchListData,
    basicInfo,
    personalPhoto,
    personalIntro,
    personalDetails,
    personalMyTags,
    personalStatus,
    popularTags,
    editStatus,
    changeInfo,
    getMemberData,
    toggleEditStatus,
    removeFromPersonalMyTags,
    addToPersonalMyTags,
    handleFileChange,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMemberStore, import.meta.hot))

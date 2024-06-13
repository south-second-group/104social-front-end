import { memberAPI } from '@/apis/repositories/member'

export const useMemberStore = defineStore('member', () => {
  // 會員基本資料
  const basicInfo = reactive({
    name: '',
    userId: '',
    email: '',
    rating: 0,
    isMatch: false,
    point: 0,
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
      isShow: true,
    },
    {
      label: '年收入',
      value: '',
      placeholder: '請輸入年收入',
      isShow: false,
    },
    {
      label: '電話',
      value: '',
      placeholder: '請輸入電話',
      isShow: false,
    },
    {
      label: 'Line ID',
      value: '',
      placeholder: '請輸入Line ID',
      isShow: false,
    },
    {
      label: '公司',
      value: '',
      placeholder: '請輸入公司名稱',
      isShow: false,
    },
    {
      label: '職業',
      value: '',
      placeholder: '請輸入職業',
      isShow: false,
    },
  ])

  // 熱門標籤（假資料）
  const popularTags = reactive([
    '日語',
    '肉食系',
    'Cosplay',
    '愛吃好料',
    '英文',
    '素食',
    '旅遊',
    '攝影',
    '音樂',
    '運動',
    '美食',
    '閱讀',
    '藝術',
    '電影',
    '寵物',
    '科技',
  ])

  // 個人狀態
  const personalStatus = reactive({
    rating: 0,
    isShow: false,
    isMatch: true,
  })

  /** 取得會員資料 */
  // 我的標籤
  const personalMyTags = reactive([])

  async function getMemberData() {
    try {
      const res = await memberAPI.getUserData()
      if (res) {
        const {
          photoDetails,
          introDetails,
          nickNameDetails,
          phoneDetails,
          companyDetails,
          incomeDetails,
          lineDetails,
          jobDetails,
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
        basicInfo.point = userStatus.point

        personalIntro.content = introDetails.intro
        personalIntro.isShow = introDetails.isShow

        personalDetails[0].value = nickNameDetails.nickName
        personalDetails[0].isShow = nickNameDetails.isShow

        personalDetails[1].value = incomeDetails.income
        personalDetails[1].isShow = incomeDetails.isShow

        personalDetails[2].value = phoneDetails.phone
        personalDetails[2].isShow = phoneDetails.isShow

        personalDetails[3].value = lineDetails.lineId
        personalDetails[3].isShow = lineDetails.isShow

        personalDetails[4].value = companyDetails.company
        personalDetails[4].isShow = companyDetails.isShow

        personalDetails[5].value = jobDetails.job
        personalDetails[5].isShow = jobDetails.isShow

        personalMyTags.splice(0, personalMyTags.length, ...tags)

        personalStatus.rating = exposureSettings.rating
        personalStatus.isShow = exposureSettings.isShow
        personalStatus.isMatch = exposureSettings.isMatch
      }
      return true
    }
    catch (error) {
      console.error(error)
      return false
    }
  }

  /** 完成編輯 */
  async function changeInfo() {
    const updateData = {
      photoDetails: {
        photo: '',
        isShow: false,
      },
      introDetails: {
        intro: personalIntro.content,
        isShow: personalIntro.isShow,
      },
      nickNameDetails: {
        nickName: personalDetails[0].value,
        isShow: personalDetails[0].isShow,
      },
      phoneDetails: {
        phone: personalDetails[2].value,
        isShow: personalDetails[2].isShow,
      },
      companyDetails: {
        company: personalDetails[4].value,
        isShow: personalDetails[4].isShow,
      },
      incomeDetails: {
        income: personalDetails[1].value,
        isShow: personalDetails[1].isShow,
      },
      lineDetails: {
        lineId: personalDetails[3].value,
        isShow: personalDetails[3].isShow,
      },
      jobDetails: {
        job: personalDetails[5].value,
        isShow: personalDetails[5].isShow,
      },
      tags: personalMyTags,
      exposureSettings: {
        rating: personalStatus.rating,
        isShow: personalStatus.isShow,
        isMatch: personalStatus.isMatch,
      },
      // userStatus: {
      //   status: '',
      //   isShow: false,
      // },
    }

    const res = await memberAPI.userDataPatch(updateData)

    await getMemberData()

    return res
  }

  return {
    basicInfo,
    personalIntro,
    personalDetails,
    personalMyTags,
    personalStatus,
    popularTags,
    changeInfo,
    getMemberData,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMemberStore, import.meta.hot))

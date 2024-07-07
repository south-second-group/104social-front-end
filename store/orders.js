import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import * as zod from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useField } from 'vee-validate'
import { ordersAPI } from '@/apis/repositories/orders'
import { useUserDataStore } from '@/store/userData'

export const useOrderStore = defineStore('orders', () => {
  // 點數選單
  const pointsType = ['100點', '200點', '300點', '400點', '500點', '600點', '700點', '800點', '900點', '1000點']

  // 儲值方案
  const pointsSelected = ref('100點')

  // 價格換算
  const pricePerPoint = 1.5

  // 計算價格，基於選中的點數
  const totalPrice = computed(() => {
    const points = Number.parseInt(pointsSelected.value.match(/\d+/)[0])
    return points * pricePerPoint
  })

  // 電子發票選項
  const invoiceOptions = [
    { value: 'member', label: '104 會員載具' },
    { value: 'phone', label: '手機條碼載具' },
  ]

  // 選中的發票選項
  const selectedInvoice = ref('member')

  // 付款方式選項
  const paymentOptions = [
    { value: 'creditcard', label: '信用卡 / 金融卡' },
    { value: 'ATM', label: 'ATM 轉帳' },
  ]

  // 選中的付款方式
  const selectedPayment = ref('creditcard')

  // 驗證模式
  const fieldSchema = toTypedSchema(
    zod.string({ message: 'Email 為必填選項' })
      .min(1, { message: 'Email 為必填選項' })
      .email({ message: '請輸入正確的信箱格式' }),
  )

  const { value: paymentEmail, errorMessage, validate } = useField('email', fieldSchema)

  const cryptoOrderData = reactive({
    tradeSha: null,
    tradeInfo: null,
    timeStamp: null,
    MerchantOrderNo: null,
    amt: null,
    email: null,
  })

  /** 建立訂單 */
  const createOrder = async () => {
    const userDataStore = useUserDataStore()
    const orderData = {
      userId: userDataStore.userId,
      amt: totalPrice.value,
      email: paymentEmail.value,
      itemDesc: `${pointsSelected.value} 點數`,
    }

    try {
      const res = await ordersAPI.createOrder(orderData)

      if (res.data && res.data.shaEncrypt && res.data.aesEncrypt) {
        cryptoOrderData.tradeSha = res.data.shaEncrypt
        cryptoOrderData.tradeInfo = res.data.aesEncrypt
        cryptoOrderData.timeStamp = res.data.TimeStamp
        cryptoOrderData.MerchantOrderNo = res.data.MerchantOrderNo
        cryptoOrderData.amt = res.data.amt
        cryptoOrderData.email = res.data.email

        return res
      }
      else {
        throw new Error('Invalid response data')
      }
    }
    catch (error) {
      console.error('Order create failed:', error)
      throw error
    }
  }

  /** 建立訂閱訂單 */
  const createSubscriptionOrder = async () => {
    const userDataStore = useUserDataStore()
    const subscriptionData = {
      userId: userDataStore.userId,
      email: useUserDataStore.email,
      periodAmt: 99, // 每月 99 元
      ProdDesc: '104 會員訂閱方案',
      periodType: 'M', // 每月
      periodPoint: '05', // 每月的某一天
      PeriodStartType: 2, // 立即執行授權
      periodTimes: '99', // 訂閱次數
      notifyURL: process.env.SUBSCRIPTION_NOTIFY_URL,
    }

    try {
      const res = await ordersAPI.createSubscriptionOrder(subscriptionData)

      if (res.data) {
        cryptoOrderData.tradeSha = res.data.shaEncrypt
        cryptoOrderData.tradeInfo = res.data.aesEncrypt
        cryptoOrderData.timeStamp = res.data.TimeStamp
        cryptoOrderData.MerchantOrderNo = res.data.MerchantOrderNo
        cryptoOrderData.amt = res.data.amt
        cryptoOrderData.email = res.data.email

        return res.data
      }
      else {
        throw new Error('Invalid response data')
      }
    }
    catch (error) {
      console.error('Subscription order create failed:', error)
      throw error
    }
  }

  // 結帳
  const checkout = async () => {
    await validate()

    if (errorMessage.value)
      return

    try {
      const createOrderRes = await createOrder()

      if (createOrderRes.status) {
        const form = document.createElement('form')
        form.action = 'https://ccore.newebpay.com/MPG/mpg_gateway'
        form.method = 'post'

        form.innerHTML = `
          <input type="hidden" name="MerchantID" value="MS152894244">
          <input type="hidden" name="TradeSha" value="${cryptoOrderData.tradeSha}">
          <input type="hidden" name="TradeInfo" value="${cryptoOrderData.tradeInfo}">
          <input type="hidden" name="TimeStamp" value="${cryptoOrderData.timeStamp}">
          <input type="hidden" name="Version" value="2.0">
          <input type="hidden" name="MerchantOrderNo" value="${cryptoOrderData.MerchantOrderNo}">
          <input type="hidden" name="Amt" value="${cryptoOrderData.amt}">
          <input type="hidden" name="Email" value="${cryptoOrderData.email}">
        `

        document.body.appendChild(form)
        form.submit()
      }
      else {
        console.error('Order create failed:', createOrderRes)
      }
    }
    catch (error) {
      console.error('Checkout failed:', error)
    }
  }

  // 訂閱結帳
  const subscriptionCheckout = async () => {
    try {
      const createSubscriptionRes = await createSubscriptionOrder()

      if (createSubscriptionRes.MerchantID && createSubscriptionRes.aesEncrypt) {
        const form = document.createElement('form')
        form.action = 'https://ccore.newebpay.com/MPG/period'
        form.method = 'post'

        form.innerHTML = `
          <input type="hidden" name="MerchantID_" value="MS152894244">
          <input type="hidden" name="PostData_" value="${createSubscriptionRes.aesEncrypt}">
        `

        document.body.appendChild(form)
        form.submit()
      }
      else {
        console.error('Subscription order create failed:', createSubscriptionRes)
      }
    }
    catch (error) {
      console.error('Subscription checkout failed:', error)
    }
  }

  return {
    pointsType,
    pointsSelected,
    pricePerPoint,
    totalPrice,
    invoiceOptions,
    selectedInvoice,
    paymentEmail,
    paymentOptions,
    selectedPayment,
    checkout,
    subscriptionCheckout,
    paymentEmail,
    errorMessage,
    createOrder,
    createSubscriptionOrder,
    cryptoOrderData,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useOrderStore, import.meta.hot))

<script>
export default {
  name: 'MatchingSettings',
  data() {
    return {
      editMode: false,
      personalConditions: {
        age: '30-40 歲',
        gender: '男性',
        seekingGender: '不拘',
        height: '160cm',
        weight: '≦65KG',
        interests: '籃球',
        religion: '基督教',
        familyMembers: '父母雙亡、三兄三姊、一子、一女',
        maritalStatus: '單身',
        partnerPreference: '無特別偏好',
        partnerExpectation: '希望對方善良、有責任感、熱愛生活',
        personalAssets: '汽車、腳踏車',
      },
      workConditions: {
        industry: '半導體業',
        jobCategory: '主管',
        location: '北部',
        salary: '年薪 50-60K',
      },
      exclusionConditions: {
        excludedIndustry: '公務員、演藝業',
        excludedEthnicity: '外國人',
        excludedHobbies: '遊戲、抽煙、飲酒',
      },
    }
  },
  methods: {
    toggleEditMode() {
      this.editMode = !this.editMode
    },
    getKeyLabel(key) {
      const labels = {
        age: '年齡',
        gender: '生理性別',
        seekingGender: '尋找性別',
        height: '身高',
        weight: '體重',
        interests: '興趣嗜好',
        religion: '宗教信仰',
        familyMembers: '家庭成員',
        maritalStatus: '婚姻狀況',
        partnerPreference: '對象偏好',
        partnerExpectation: '伴侶期望',
        personalAssets: '個人資產',
        industry: '產業類別',
        jobCategory: '職務類別',
        location: '工作地點',
        salary: '薪資條件',
        excludedIndustry: '排除產業',
        excludedEthnicity: '排除種族',
        excludedHobbies: '排除嗜好',
      }
      return labels[key] || key
    },
  },
}
</script>

<template>
  <div class="container text-start">
    <div class="mx-auto">
      <h1 class="text-H4 md:text-H3 mb-6 mt-[80px] text-start md:mb-[20px]">
        配對設定
      </h1>

      <div class="mb-6 border-l-2 border-x-neutral-300 pl-3">
        <span class="text-B2 mr-2 text-neutral-500">
          配對通知信箱 :
        </span>
        <span class="mr-2 text-neutral-500">snowman12320@gmail.com</span>
        <button class="text-primary-dark">
          <icon-heroicons:pencil-square />
        </button>
      </div>

      <div class="grid grid-cols-12 gap-5">
        <!-- 適合我的對象 -->
        <div class="col-span-3 md:col-span-3">
          <div style="background-color: #FFF5F5;border-radius: 10px;padding: 24px;">
            <h2 class="text-B1 mb-2 text-center text-primary-dark">
              <b>適合我的對象</b>
            </h2>
            <div class="mb-2 flex justify-between">
              <div><b>智慧媒合</b></div>
              <div>999 +</div>
            </div>
            <div class="flex justify-between">
              <div><b>智能篩選</b></div>
              <div>999 +</div>
            </div>
          </div>
        </div>

        <!-- 配對條件 -->
        <div class="col-span-9 md:col-span-9">
          <div class="flex justify-between">
            <h2 class="text-H4 md:text-H3 mb-4 text-start text-primary-dark">
              配對條件
            </h2>
            <div>
              <UToggle /> <b class="ml-2">配對通知</b>
            </div>
          </div>
          <div
            class="mb-4"
            style="background-color: #FAFAFA;border-radius: 10px;padding: 24px;"
          >
            <h3 class="text-B1 mb-3">
              <b>個人條件</b>
            </h3>
            <div
              v-for="(value, key) in personalConditions"
              :key="key"
              class="mb-2 flex"
            >
              <span class="mr-4 w-24">{{ getKeyLabel(key) }}</span>
              <template v-if="editMode">
                <input
                  v-model="personalConditions[key]"
                  type="text"
                  class="flex-1 rounded border px-2 py-1"
                >
              </template>
              <template v-else>
                <span class="flex-1">{{ value }}</span>
              </template>
            </div>
          </div>

          <div
            class="mb-4"
            style="background-color: #FAFAFA;border-radius: 10px;padding: 24px;"
          >
            <h3 class="text-B1 mb-3">
              <b>工作條件</b>
            </h3>
            <div
              v-for="(value, key) in workConditions"
              :key="key"
              class="mb-2 flex"
            >
              <span class="mr-4 w-24">{{ getKeyLabel(key) }}</span>
              <template v-if="editMode">
                <input
                  v-model="workConditions[key]"
                  type="text"
                  class="flex-1 rounded border px-2 py-1"
                >
              </template>
              <template v-else>
                <span class="flex-1">{{ value }}</span>
              </template>
            </div>
          </div>

          <div style="background-color: #FAFAFA;border-radius: 10px;padding: 24px;">
            <h3 class="text-B1 mb-3">
              <b>排除條件</b>
            </h3>
            <div
              v-for="(value, key) in exclusionConditions"
              :key="key"
              class="mb-2 flex"
            >
              <span class="mr-4 w-24">{{ getKeyLabel(key) }}</span>
              <template v-if="editMode">
                <input
                  v-model="exclusionConditions[key]"
                  type="text"
                  class="flex-1 rounded border px-2 py-1"
                >
              </template>
              <template v-else>
                <span class="flex-1">{{ value }}</span>
              </template>
            </div>
          </div>

          <!-- 編輯按鈕 -->
          <div class="mt-4 w-full flex justify-end">
            <template v-if="editMode">
                <button
                type="button"
                class="btn-linear-md mr-2"
                @click="toggleEditMode"
              >
                <p>取消</p>
              </button>
              <button
                type="button"
                class="btn-linear-md"
                @click="toggleEditMode"
              >
                <p>儲存</p>
              </button>
              
            </template>
            <template v-else>
              <button
                type="submit"
                class="btn-linear-md"
                @click="toggleEditMode"
              >
                <p>編輯</p>
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
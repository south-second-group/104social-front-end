import { useRouter } from 'vue-router'

export function useNavigation() {
  const router = useRouter()

  const goToDetail = (inviteId, type) => {
    router.push(`/member/invite/${inviteId}?type=${type}`)
  }

  return {
    goToDetail,
  }
}

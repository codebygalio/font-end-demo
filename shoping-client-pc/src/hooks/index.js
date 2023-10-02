import { useIntersectionObserver, useIntervalFn } from '@vueuse/core'
import { ref, onUnmounted } from 'vue'
import dayjs from 'dayjs'

/**
 *
 * @param {Object} target - DOM对象
 * @param {Function} apiFn  - api函数
 */
export const useLazyData = (apiFn) => {
  const result = ref([])
  const target = ref(null)
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }], observerElement) => {
    //   console.log('isIntersecting=', isIntersecting)
      if (isIntersecting) {
        stop()
        apiFn().then(data => {
          result.value = data.result
        })
      }
    },
    {
      threshold: 0
    }
  )
  return { result, target }
}

/**
 * 支付倒计时函数
 * @param {Integer} countdown - 倒计时的秒数
 */
export const usePayTime = () => {
  const time = ref(0)
  const timeText = ref('0分0秒')
  const { pause, resume, isActive } = useIntervalFn(() => {
    time.value--
    timeText.value = dayjs.unix(time.value).format('mm分ss秒')
    // console.log(time.value)
    if (time.value <= 0) {
      pause()
    }
  }, 1000, { immediate: false })
  onUnmounted(() => {
    pause()
  })
  const start = countdown => {
    time.value = countdown
    if (time.value > -1) {
      timeText.value = dayjs.unix(time.value).format('mm分ss秒')
      resume()
    }
  }

  return {
    start,
    timeText
  }
}

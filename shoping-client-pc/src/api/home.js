import request from '@/utils/requests'

/**
 * 获取品牌
 * @param {Integer} limit
 * @returns Promise
 */
export function findBrand (limit = 6) {
  return request({
    url: '/home/brand',
    params: {
      limit
    }
  })
}

/**
 * 获取广告区轮播图
 * @returns Promise
 */
export function findBanner () {
  return request({
    url: '/home/banner'
  })
}

/**
 * 获取新鲜好物
 * @returns Promise
 */
export function findNew () {
  return request({
    url: '/home/new'
  })
}
/**
 * 获得人气推荐
 * @returns Promise
 */
export function findHot () {
  return request({
    url: '/home/hot'
  })
}

/**
 * 获取商品板块
 * @returns Promise
 */
export function findGoods () {
  return request({
    url: '/home/goods'
  })
}

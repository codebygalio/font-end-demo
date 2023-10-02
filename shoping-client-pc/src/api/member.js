import request from '@/utils/requests'

/**
 * 获取收藏分页数据
 * @param {Integer} collectType - 收藏类型 1商品 2专题 3品牌
 * @returns
 */
export const findCollect = ({ page = 1, pageSize = 10, collectType }) => {
  return request({
    url: '/member/collect',
    params: { page, pageSize, collectType }
  })
}

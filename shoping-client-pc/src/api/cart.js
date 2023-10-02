import request from '@/utils/requests'
/**
 * 合并购物车
 * @param {Array<object>} cartList - 购物车信息列表
 * @param {String} object.skuId - SKUID
 * @param {Boolean} object.selected - 选中状态
 * @param {Integer} object.count - 数量
 */
export const mergeCart = (data) => {
  return request({
    url: '/member/cart/merge',
    method: 'POST',
    data
  })
}

/**
 * 获取商品的 最新价格  库存  是否有效
 * @param {String} skuId - SKU id
 */
export const getNewCartGoods = (skuId) => {
  return request({
    url: `/goods/stock/${skuId}`
  })
}

/**
 *  获取商品对应的sku数据
 *  @param {String} skuId - SKU id
 */
export const getGoodsSku = (skuId) => {
  return request({
    url: `/goods/sku/${skuId}`
  })
}

/**
 * 获取购物车列表
 * @returns
 */
export const findCart = () => {
  return request({
    url: '/member/cart'
  })
}

/**
 *
 * @param {String} skuId
 * @param {Integer} count - 加入购物车数量
 * @returns
 */
export const insertCart = ({ skuId, count }) => {
  return request({
    url: '/member/cart',
    method: 'POST',
    data: { skuId, count }
  })
}

/**
 *
 * @param {Array<string>} ids - skuId 的集合
 * @returns
 */
export const deleteCart = (ids) => {
  return request({
    url: '/member/cart',
    method: 'DELETE',
    data: { ids }
  })
}

/**
 *  修改购物车商品(状态、数量)
 * @param {String} skuId
 * @param { Integer } count - 加入购物车数量
 * @param { Boolean } selected - 选中状态
 * @returns
 */
export const updateCart = ({ skuId, selected, count }) => {
  return request({
    url: `/member/cart/${skuId}`,
    method: 'PUT',
    data: { skuId, selected, count }
  })
}

/**
 * 全部选中&取消全选
 * @param {Boolean} selected - 选中状态
 * @param {Array<string>} ids - skuId 的集合
 */
export const checkAllCart = ({ selected, ids }) => {
  return request({
    url: '/member/cart/selected',
    method: 'PUT',
    data: { selected, ids }
  })
}

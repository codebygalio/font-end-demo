import request from '@/utils/requests'

/**
 *  获取所有的分类(顶级、二级、对应的商品分类数据)
 * @returns promise
 */
export function findAllCategory () {
  return request({
    url: '/home/category/head'
  })
}

/**
 * 获取顶级类目信息 (children属性)
 * @param {String} id  - 顶级类目id
 * @returns Promise
 */
export function findTopCategory (id) {
  return request({
    url: '/category',
    params: {
      id
    }
  })
}

/**
 * 获取二级类目的筛选条件数据
 * @param {*} id - 二级类目的ID
 * @returns Promise
 */
export const findSubCategoryFilter = (id) => {
  return request({
    url: '/category/sub/filter',
    params: {
      id
    }
  })
}

/**
 * 获取分类下的商品 (带筛选条件)
 * @param {Object} params
 */
export const findSubCategoryGoods = (data) => {
  return request({
    url: '/category/goods',
    method: 'post',
    data
  })
}

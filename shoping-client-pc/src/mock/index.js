import Mock from 'mockjs'
import qs from 'qs'
Mock.setup({
  timeout: '500-1000'
})

Mock.mock(/\/my\/test/, 'get', () => {
    const arr = []
    for (let i = 0; i < 5; i++){
        arr.push(Mock.mock({
            id: '@id',
            name: '@cname',
            image: '@image(200x100)'
        }))
    }
    return { msg: '获取数据成功', result: arr }
})
Mock.mock(/\/member\/collect/,'get', config => {
    const querystring = config.url.split('?')[1]
    const queryObject = qs.parse(querystring)
    const counts = 35
    const item = []
    for(let i = 0; i < +queryObject.pageSize; i++){
        item.push(Mock.mock({
            id: '@id',
            name: '@ctitle(10,20)',
            tag: '@ctitle(4,10)',
            price: '@float(100,200,2,2)',
            picture:'@image(160x160)'
        }))
    }
    return { 
        msg: '获取商品成功',
        result: {
            counts: counts,
        page: +queryObject.page,
        pageSize: +queryObject.pageSize,
        items: item
        }
    }
})
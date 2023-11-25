import request from '@/utils/request.js'

// 文章列表
export const getAticleList = params => {
   return request({
        url: '/v1_0/articles',
        method:'get',
        params
    })
}

// 获取文章
export const getArticleById = articleId => {
    return request({
        url: `/v1_0/articles/${articleId}`,
        method: 'get'
    })
}

// 收藏文章
export const addCollections = target => {
    return request({
        url:'/v1_0/article/collections',
        method:'post',
        data:{
            target
        }
    })
}

// 取消收藏文章
export const cancelCollections = target => {
    return request({
        url:`/v1_0/article/collections/${target}`,
        method:'DELETE'
    })
} 

// 点赞
export const addLiked = target => {
    return request({
        url: '/v1_0/article/likings',
        method: 'post',
        data:{
            target
        }
    })
}
// 取消点赞
export const cancelLiked = target => {
    return request({
        url: `/v1_0/article/likings/${target}`,
        method: 'delete'

    })
}
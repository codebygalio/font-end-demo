import request from '@/utils/request.js'

export const getComment = (params) => {
    return request({
        method:'get',
        url:'/v1_0/comments',
        params
    })
}

// 增加点赞

export const addLiking = (target) => {
    return request({
        method:'post',
        url:'/v1_0/comment/likings',
        data:{
            target
        }
    })
}

// 取消点赞

export const deleteCommentLike = target => {
    return request({
        method: 'delete',
        url:`/v1_0/comment/likings/${target}`
    })
}


// 发布评论

export const addComment = data => {
    return request({
        url:'/v1_0/comments',
        method:'post',
        data
    })
}
import request from '@/utils/request'

// 获取用户token
export const login = data => {
    return request({
        method: 'post',
        url: '/v1_0/authorizations',
        data
    })
}


export const sendSms = mobile => {
    return request({
        method: 'get',
        url: `/app/v1_0/sms/codes/${mobile}`
    })
}

// 获取用户信息
export const getUserInfo = () => {
    return request({
        method: 'get',
        url: `/v1_0/user`
        // headers: {
        //     Authorization: 'Bearer ${token}'
        // }
    })
}

// 获取用户频道列表
export const getUserChannels = () => {
    return request({
        url: '/v1_0/user/channels',
        method: 'get'
    })
}

// 关注用户
export const followings = userId => {
    return request({
        url: '/v1_0/user/followings',
        method: 'post',
        data: {
            "target": userId
        }
    })
}

// 取消关注用户
export const cancelFollowings = target => {
    return request({
        url: `/v1_0/user/followings/${target}`,
        method: 'DELETE'
    })
}


// 获取用户资料
export const getUserProfile = () => {
    return request({
        url: '/v1_0/user/profile',
        method: 'get'
    })
}


// 修改用户名称
export const updateUserProfile = data => {
    return request({
        url: '/v1_0/user/profile',
        method: 'patch',
        data
    })
}


export const updateUserAvatar = data => {
    return request({
        method: 'patch',
        url: '/v1_0/user/photo',
        data
    })
}
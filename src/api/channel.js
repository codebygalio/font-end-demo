import request from '@/utils/request'
export const getAllChannel = () => {
    return request({
        method: 'get',
        url: '/v1_0/channels'
    })
}
export const addUserChannel = channels => {
    // console.log({channels})
    return request({
        method: 'PATCH',
        url:'/v1_0/user/channels',
        data:{
            channels:[channels]
        }
    })
}

export const deleteUserChannel = channelId => {
    // console.log({channels})
    return request({
        method: 'DELETE',
        url:`/v1_0/user/channels/${channelId}`,
    })
}
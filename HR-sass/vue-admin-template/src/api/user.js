import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

export function getUserAvatar(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'get'
  })
}

export function getUserDetailById(id) {
    return request({
      url: `/sys/user/${id}`,
      method: 'get'
    })
  }
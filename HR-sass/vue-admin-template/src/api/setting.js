import request from '@/utils/request'
// 获取角色列表
export function getRoleList(params){
    return request({
        url: '/sys/role',
        params
    })
}

// 删除角色
export function deleteRole(id){
    return request({
        url: `/sys/role/${id}`,
        method: 'DELETE'
    })
}

// 获取角色

export function getRoleDetails(id){
    return request({
        url: `/sys/role/${id}`
    })
}

// 编辑角色
export function editRole(data){
    return request({
        url: `/sys/role/${data.id}`,
        method: 'PUT',
        data
    })
}

//新增角色
export function addRole(data){
    return request({
        url: '/sys/role',
        method: 'post',
        data
    })
}

// 给角色分配权限
export function assignPerm(data) {
    return request({
      url: '/sys/role/assignPrem',
      method: 'put',
      data
    })
  }
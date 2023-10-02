import request from '@/utils/request'
export function getEmployeeSimple() {
  return request({
    url: '/sys/user/simple'
  })
}
// 获得员工列表
export function getEmployeeList(params){
    return request({
        url: '/sys/user',
        params
    })
}
// 删除员工接口
export function delEmpoyee(id){
    return request({
        url: `/sys/user/${id}`,
        method:'delete'
    })
}
// 添加员工接口
export function addEmpoyee(data){
    return request({
        url: `/sys/user/`,
        method:'post',
        data
    })
}

// 批量添加用户接口
export function importEmpoyee(data){
    return request({
        url: '/sys/user/batch',
        method: 'post',
        data
    })
}

// 保存用户信息
export function saveUserDetailById(data){
    return request({
        url: `/sys/user/${data.id}`,
        method: 'put',
        data
    })
}

// 读取用户详情信息
export function getPersonalDetail(id){
    return request({
        url: `/employees/${id}/personalInfo`
    })
}

// 更新用户详情的基本信息
export function updatePersonal(data){
    return request({
        url: `/employees/${data.userId}/personalInfo`,
        method: 'put',
        data
    })
}

// 获取用户的岗位信息
export function getJobDetail(id){
    return request({
        url: `/employees/${id}/jobs`
    })
}

// 更新用户信息
export function updateJob(data){
    return request({
        url: `/employees/${data.userId}/jobs`,
        method: 'put',
        data
    })
}

export function assignRoles(data){
    return request({
        url: '/sys/user/assignRoles',
        data,
        method: 'put'
    })
}



/** 1
 * @description: 添加员工
 * @param {*} data
 * @return {*}
 */
export function addEmployee(data) {
    return request({
      method: 'post',
      url: '/sys/user',
      data
    })
  }
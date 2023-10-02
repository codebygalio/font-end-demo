import request from '@/utils/request'

// 获取部门
export function getDepartments() {
  return request({
    url: '/company/department',
  })
}
// 删除部门
export function deleteDepartments(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'DELETE'
  })
}
// 新增部门
export function addDepartments(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}

// 根据id查询部门
export function getDepartDetail(id){
    return request({
        url:`/company/department/${id}`,
        method:'get'
    })
}

export function updateDepartments(data){
    return request({
        url:`/company/department/${data.id}`,
        method:'put',
        data
    })
}
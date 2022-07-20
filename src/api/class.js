import request from '../main'
import qs from "qs";


/**
 * 分页查询所有
 */
export function list2(currentPage, pageSize) {
    return request({
        method: 'get',
        url: "/system/classEntity/list2",
        params: {
            pageNo: currentPage,
            pageSize: pageSize
        },
    })
}

/**
 * 批量删除
 */
export function deleteByIds(ids) {
    return request({
        method: 'get',
        url: "/system/classEntity/deleteByids",
        params: {
            ids: ids
        },
        paramsSerializer: function (params) {
            return qs.stringify(params, {arrayFormat: 'repeat'})
        }
    })
}

/**
 * 根据pkid查询
 */
export function info2(pkid) {
    return request({
        method: 'get',
        url: "/system/classEntity/info2",
        params: {
            pkid: pkid
        },
    })
}


/**
 * 更新
 */
export function update(entity) {
    return request({
        method: 'post',
        url: "/system/classEntity/update",
        data: entity
    })
}

/**
 * 添加
 */
export function createEntity(categoryEntity) {
    return request({
        method: 'post',
        url: "/system/classEntity/create",
        data: categoryEntity
    })
}

/**
 * 模糊查询分类
 */
export function searchByLike(searchParam, pageNo, pageSize) {
    return request({
        method: 'get',
        url: "/system/classEntity/searchByLike",
        params: {
            pageNo: pageNo,
            pageSize: pageSize,
            searchParam: searchParam
        },
    })
}


/**
 * 获得学院和专业的树形结构
 */
export function getCollegeAndSpecialtyTree() {
    return request({
        method: 'get',
        url: "/system/collegeEntity/getCollegeAndSpecialtyTree",
    })
}

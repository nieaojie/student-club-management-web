import request from '../main'
import qs from "qs";

// import qs from "qs";

/**
 * 分页查询所有
 */
export function list(currentPage, pageSize) {
    return request({
        method: 'get',
        url: "/system/collegeEntity/list",
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
        url: "/system/collegeEntity/deleteByids",
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
export function info(pkid) {
    return request({
        method: 'get',
        url: "/system/collegeEntity/info",
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
        url: "/system/collegeEntity/update",
        data: entity
    })
}

/**
 * 添加
 */
export function createEntity(categoryEntity) {
    return request({
        method: 'post',
        url: "/system/collegeEntity/create",
        data: categoryEntity
    })
}

/**
 * 模糊查询分类
 */
export function searchByLike(searchParam, pageNo, pageSize) {
    return request({
        method: 'get',
        url: "/system/collegeEntity/searchByLike",
        params: {
            pageNo: pageNo,
            pageSize: pageSize,
            searchParam: searchParam
        },
    })
}

/**
 * 查询所有
 */
export function listAll() {
    return request({
        method: 'get',
        url: "/system/collegeEntity/listAll",
    })
}


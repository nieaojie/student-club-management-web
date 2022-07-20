import request from '../main'
import qs from 'qs';

/**
 * 根据pkid查询
 */
export function info(pkid) {
    return request({
        method: 'get',
        url: "/system/categoryEntity/info",
        params: {
            pkid: pkid
        },
    })
}

/**
 * 分页查询所有分类
 */
export function listPage(currentPage, pageSize) {
    return request({
        method: 'get',
        url: "/system/categoryEntity/list",
        params: {
            pageNo: currentPage,
            pageSize: pageSize
        },
    })
}

/**
 * 查询所有分类
 */
export function listAll() {
    return request({
        method: 'get',
        url: "/system/categoryEntity/listAll"
    })
}

/**
 * 模糊查询分类
 */
export function searchByLike(searchParam,pageNo,pageSize) {
    return request({
        method: 'get',
        url: "/system/categoryEntity/searchByLike",
        params: {
            pageNo:pageNo,
            pageSize:pageSize,
            searchParam: searchParam
        },
    })
}

/**
 * 添加
 */
export function createEntity(categoryEntity) {
    return request({
        method: 'post',
        url: "/system/categoryEntity/create",
        data: categoryEntity
    })
}

/**
 * 更新
 */
export function update(categoryEntity) {
    return request({
        method: 'post',
        url: "/system/categoryEntity/update",
        data: categoryEntity
    })
}

/**
 * 批量删除
 */
export function deleteByIds(ids) {
    return request({
        method: 'get',
        url: "/system/categoryEntity/deleteByids",
        params:{
            ids: ids
        },
        paramsSerializer: function(params) {
            return qs.stringify(params, {arrayFormat: 'repeat'})
        }
    })
}

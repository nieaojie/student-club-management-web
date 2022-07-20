import request from '../main'
import qs from 'qs';


/**
 * 根据pkid查询
 */
export function info(pkid) {
    return request({
        method: 'get',
        url: "/system/roleEntity/info",
        params: {
            pkid: pkid
        },
    })
}

/**
 * 分页查询
 */
export function listPage(currentPage, pageSize) {
    return request({
        method: 'get',
        url: "/system/roleEntity/list",
        params: {
            pageNo: currentPage,
            pageSize: pageSize
        },
    })
}

/**
 * 模糊查询分类
 */
export function searchByLike(searchParam,pageNo,pageSize) {
    return request({
        method: 'get',
        url: "/system/roleEntity/searchByLike",
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
        url: "/system/roleEntity/create",
        data: categoryEntity
    })
}

/**
 * 更新
 */
export function update(categoryEntity) {
    return request({
        method: 'post',
        url: "/system/roleEntity/update",
        data: categoryEntity
    })
}

/**
 * 批量删除
 */
export function deleteByIds(ids) {
    return request({
        method: 'get',
        url: "/system/roleEntity/deleteByids",
        params:{
            ids: ids
        },
        paramsSerializer: function(params) {
            return qs.stringify(params, {arrayFormat: 'repeat'})
        }
    })
}

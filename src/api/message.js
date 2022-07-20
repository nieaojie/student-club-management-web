import request from '../main'
import qs from "qs";


/**
 * 根据pkid查询
 */
export function info(pkid) {
    return request({
        method: 'get',
        url: "/system/messageEntity/info",
        params: {
            pkid: pkid
        },
    })
}

/**
 * 标记已读
 */
export function markRead(messagePkid) {
    return request({
        method: 'get',
        url: "/system/messageEntity/markRead",
        params: {
            messagePkid: messagePkid
        },
    })
}

/**
 * 删除消息
 */
export function deleteById(messagePkid) {
    return request({
        method: 'get',
        url: "/system/messageEntity/delete",
        params: {
            id: messagePkid
        },
    })
}

/**
 * 分页查询
 */
export function listPage(currentPage, pageSize) {
    return request({
        method: 'get',
        url: "/system/messageEntity/list",
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
        url: "/system/messageEntity/deleteByids",
        params:{
            ids: ids
        },
        paramsSerializer: function(params) {
            return qs.stringify(params, {arrayFormat: 'repeat'})
        }
    })
}

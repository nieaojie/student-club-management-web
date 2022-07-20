import request from '../main'

// import qs from 'qs';

/**
 * 添加
 */
export function createEntity(entity) {
    return request({
        method: 'post',
        url: "/system/noticeEntity/create",
        data: entity
    })
}

/**
 * 删除
 */
export function removeById(id) {
    return request({
        method: 'get',
        url: "/system/noticeEntity/delete",
        params: {
            id: id
        },
    })
}

/**
 * 查询社团发布的公告
 */
export function getClubAllNotice(clubPkid, status) {
    return request({
        method: 'get',
        url: "/system/noticeEntity/getClubAllNotice",
        params: {
            clubPkid: clubPkid,
            status: status
        },
    })
}


/**
 * 更新
 */
export function update(entity) {
    return request({
        method: 'post',
        url: "/system/noticeEntity/update",
        data: entity
    })
}

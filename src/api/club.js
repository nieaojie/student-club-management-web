import request from '../main'
import qs from 'qs';


/**
 * 根据pkid查询
 */
export function info(pkid) {
    return request({
        method: 'get',
        url: "/system/clubEntity/info",
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
        url: "/system/clubEntity/listClubWithClubCategory",
        params: {
            pageNo: currentPage,
            pageSize: pageSize
        },
    })
}

/**
 * 模糊查询分类
 */
export function searchByLike(searchParam, pageNo, pageSize) {
    return request({
        method: 'get',
        url: "/system/clubEntity/searchByLike",
        params: {
            pageNo: pageNo,
            pageSize: pageSize,
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
        url: "/system/clubEntity/create",
        data: categoryEntity
    })
}

/**
 * 更新
 */
export function update(categoryEntity) {
    return request({
        method: 'post',
        url: "/system/clubEntity/update",
        data: categoryEntity
    })
}

/**
 * 批量删除
 */
export function deleteByIds(ids) {
    return request({
        method: 'get',
        url: "/system/clubEntity/deleteByids",
        params: {
            ids: ids
        },
        paramsSerializer: function (params) {
            return qs.stringify(params, {arrayFormat: 'repeat'})
        }
    })
}

/**
 * 同意加入社团
 */
export function agreeJoinClub(messagePkid) {
    return request({
        method: 'get',
        url: "/system/clubEntity/agreeJoinClub",
        params: {
            messagePkid: messagePkid
        },
    })
}


/**
 * 查询社团成员
 */
export function listClubMembers(clubPkid) {
    return request({
        method: 'get',
        url: "/system/clubEntity/listClubMembers",
        params: {
            clubPkid: clubPkid
        },
    })
}


/**
 * 设置会长
 */
export function setClubChairman(clubPkid, userPkid) {
    return request({
        method: 'get',
        url: "/system/clubEntity/setClubChairman",
        params: {
            clubPkid: clubPkid,
            userPkid: userPkid
        },
    })
}

/**
 * 设置副会长
 */
export function setClubViceChairman(clubPkid, userPkids) {
    return request({
        method: 'get',
        url: "/system/clubEntity/setClubViceChairman",
        params: {
            clubPkid: clubPkid,
            userPkids: userPkids
        },
        paramsSerializer: function (params) {
            return qs.stringify(params, {arrayFormat: 'repeat'})
        }
    })
}

/**
 * 从社团移除用户
 */
export function removeUserFromClub(clubPkid, userPkid) {
    return request({
        method: 'get',
        url: "/system/clubEntity/removeUserFromClub",
        params: {
            clubPkid: clubPkid,
            userPkid: userPkid
        },
    })
}

/**
 * 从社团移除用户
 */
export function disagreeJoinClub(messagePkid) {
    return request({
        method: 'get',
        url: "/system/clubEntity/disagreeJoinClub",
        params: {
            messagePkid: messagePkid
        },
    })
}

/**
 * 查询社团管理员管理的社团详细信息
 */
export function getClubDetailByClubManagePkid() {
    return request({
        method: 'get',
        url: "/system/clubEntity/getClubDetailByClubManagePkid",
    })
}

/**
 * 查询普通用户加入的社团
 */
export function getJoinClubByUserId() {
    return request({
        method: 'get',
        url: "/system/clubEntity/getJoinClubByUserId",
    })
}


/**
 * 查询普通用户加入的社团
 */
export function getAllClubByManagePkid() {
    return request({
        method: 'get',
        url: "/system/clubEntity/getAllClubByManagePkid",
    })
}


/**
 *
 */
export function getClubDetailByClubPkid(clubPkid) {
    return request({
        method: 'get',
        url: "/system/clubEntity/getClubDetailByClubPkid",
        params: {
            clubPkid: clubPkid
        }
    })
}

import request from '../main'

// import qs from "qs";

/**
 * 根据pkid查询
 */
export function joinClub(pkid) {
    return request({
        method: 'get',
        url: "/system/userEntity/joinClub",
        params: {
            clubPkid: pkid
        },
    })
}

/**
 * 判读用户当前社团的关系
 */
export function judgeClubAndUserRelation(clubPkid) {
    return request({
        method: 'get',
        url: "/system/clubEntity/judgeClubAndUserRelation",
        params: {
            clubPkid: clubPkid
        },
    })
}

/**
 * 退出社团
 */
export function exitClub(clubPkid) {
    return request({
        method: 'get',
        url: "/system/clubEntity/exitClub",
        params: {
            clubPkid: clubPkid
        },
    })
}

/**
 * 查询用户的消息:type消息的类型（0-未读，1-已读）
 */
export function searchUserMessages(status) {
    return request({
        method: 'get',
        url: "/system/messageEntity/searchUserMessages",
        params: {
            status: status
        },
    })
}

/**
 * 查询社团的详细信息
 */
export function getClubDetail(clubPkid) {
    return request({
        method: 'get',
        url: "/system/clubEntity/getClubDetail",
        params: {
            clubPkid: clubPkid
        },
    })
}


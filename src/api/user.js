import request from '../main'
import qs from "qs";

/**
 * 用户登录接口
 */
export function login(username, password) {
    return request({
        method: 'post',
        url: "/login",
        // params:{
        //
        // },
        data: {
            userUsername: username,
            userPassword: password
        }
    })
}

/**
 * 根据pkid查询userDetail
 */
export function info(pkid) {
    return request({
        method: 'get',
        url: "/system/userEntity/infoDetail",
        params: {
            pkid: pkid
        },
    })
}

/**
 * 根据pkid查询
 */
export function info2(pkid) {
    return request({
        method: 'get',
        url: "/system/userEntity/info",
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
        url: "/system/userEntity/list",
        params: {
            pageNo: currentPage,
            pageSize: pageSize
        },
    })
}

/**
 * 分页查询用户所有信息
 */
export function listUserWithOtherInfo(currentPage, pageSize) {
    return request({
        method: 'get',
        url: "/system/userEntity/listUserWithOtherInfo",
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
        url: "/system/userEntity/searchByLike",
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
export function createEntity(entity) {
    return request({
        method: 'post',
        url: "/system/userEntity/create",
        data: entity
    })
}

/**
 * 更新
 */
export function update(entity) {
    return request({
        method: 'post',
        url: "/system/userEntity/update",
        data: entity
    })
}

/**
 * 管理员修改密码
 */
export function adminModifyPass(userEntity) {
    return request({
        method: 'post',
        url: "/system/userEntity/adminModifyPass",
        data: userEntity
    })
}

/**
 * 注册
 */
export function register(userEntity) {
    return request({
        method: 'post',
        url: "/register",
        data: userEntity
    })
}

/**
 * 用户修改密码
 */
export function userModifyPass(userEntity) {
    return request({
        method: 'post',
        url: "/system/userEntity/modifyPass",
        data: userEntity
    })
}

/**
 * 删除
 */
export function deleteById(id) {
    return request({
        method: 'get',
        url: "/system/userEntity/delete",
        params: {
            id: id
        },
    })
}


/**
 * 批量删除
 */
export function deleteByIds(ids) {
    return request({
        method: 'get',
        url: "/system/userEntity/deleteByids",
        params: {
            ids: ids
        },
        paramsSerializer: function (params) {
            return qs.stringify(params, {arrayFormat: 'repeat'})
        }
    })
}

/**
 * 查询所有用户
 */
export function listAllUsers() {
    return request({
        method: 'get',
        url: "/system/userEntity/listAll",
    });
}

/**
 * 获得学院-专业-班级的树形结构
 */
export function getCollegeSpecialtyClassTree() {
    return request({
        method: 'get',
        url: "/system/collegeEntity/getCollegeSpecialtyClassTree",
    })
}

/**
 * 获得学院-专业-班级的树形结构
 */
export function userNameCanUse(username) {
    return request({
        method: 'get',
        url: "/userNameCanUse",
        param:{
            username: username
        }
    })
}

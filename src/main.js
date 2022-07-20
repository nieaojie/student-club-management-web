import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
//导入全局样式表
import './assets/css/global.css'
//导入字体图标
import './assets/font/iconfont.css'
import request from "axios";
import {Loading, Message, MessageBox} from "element-ui";

/*********************全局加载loading配置***********************/

let loading        //定义loading变量

function startLoading() {    //使用Element loading-start 方法
    loading = Loading.service({
        lock: true,
        body: true,
        text: 'Loading...',
        // spinner: 'el-icon-loading',//自定义加载图标类名
        background: 'rgba(0, 0, 0, 0.7)'
    })
}

function endLoading() {    //使用Element loading-close 方法
    loading.close()
}

//那么 showFullScreenLoading() tryHideFullScreenLoading() 要干的事儿就是将同一时刻的请求合并。
//声明一个变量 needLoadingRequestCount，每次调用showFullScreenLoading方法 needLoadingRequestCount + 1。
//调用tryHideFullScreenLoading()方法，needLoadingRequestCount - 1。needLoadingRequestCount为 0 时，结束 loading。
let needLoadingRequestCount = 0

export function showFullScreenLoading() {
    if (needLoadingRequestCount === 0) {
        startLoading()
    }
    needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
    if (needLoadingRequestCount <= 0) return
    needLoadingRequestCount--
    if (needLoadingRequestCount === 0) {
        endLoading()
    }
}

/*********************全局加载loading配置**********************/


Vue.config.productionTip = false

//配置网络请求的根路径
// request.defaults.baseURL = "http://localhost:8001/";
request.defaults.baseURL = "http://119.23.246.120:8001/";
request.defaults.timeout = 30000;
request.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
//配置请求拦截器
request.interceptors.request.use(config => {
    console.log("请求拦截器：", config.url);
    let excludeUrls = new Set();
    excludeUrls.add("/system/messageEntity/searchUserMessages");
    excludeUrls.add("/login");
    excludeUrls.add("/register");
    excludeUrls.add("/system/clubEntity/searchClubUsers");
    excludeUrls.add("/system/userEntity/listAll");
    excludeUrls.add("/system/clubEntity/agreeJoinClub");
    config.headers['X-Access-Token'] = window.sessionStorage.getItem("token");
    if (excludeUrls.has(config.url)) {
        return config;
    }
    showFullScreenLoading();
    return config;
}, error => {
    tryHideFullScreenLoading();
    Message.error({message: '请求超时!'})
    return Promise.reject(error)
});
//配置响应拦截器
request.interceptors.response.use(res => {
    // console.log(res)
    if (res.data.code === "token-2") {
        MessageBox.alert("登录已过期，请重新登录", "提示", {
                confirmButtonText: "确定",
                // eslint-disable-next-line no-unused-vars
                callback: action => {
                    window.sessionStorage.clear();
                    window.location.reload();
                }
            }
        );

        // Vue.prototype.$message({
        //     type: "error",
        //     message: "身份已过期，请重新登录"
        // });
        // window.sessionStorage.clear();
        // setTimeout(function () {
        //     window.location.reload();
        // }, 2000);
        return;
    }
    setTimeout(function () {
        tryHideFullScreenLoading();
    }, 300);
    return res;
}, (error) => {
    tryHideFullScreenLoading()
    return Promise.reject(error)
});

export default request;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')

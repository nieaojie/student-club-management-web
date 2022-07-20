import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from "@/views/Index";
import Dashboard from "@/views/Dashboard";
import ClubCategory from "@/views/table/ClubCategory";
import ClubUser from "@/views/table/ClubUser";
import ClubClub from "@/views/table/ClubClub";
import ClubRole from "@/views/table/ClubRole";
import Login from "@/components/Login";
import Rights from "@/views/power/Rights";
import Roles from "@/views/power/Roles";
import ClubDetail from "@/views/ClubDetail";
import Message from "@/views/Message";
import College from "@/views/school/College";
import Specialty from "@/views/school/Specialty";
import Class from "@/views/school/Class";
import Setting from "@/views/Setting";
import ClubManage from "@/views/ClubManage";
import MyClub from "@/views/MyClub";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        // redirect: '/dashboard'
        redirect: "/login"
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/index',
        name: 'Index',
        component: Index,
        children: [
            {
                path: '/dashboard',
                name: 'Dashboard',
                component: Dashboard
            },
            {
                path: '/message',
                name: 'Message',
                component: Message
            },
            {
                path: '/clubCategory',
                name: 'ClubCategory',
                component: ClubCategory,
            },
            {
                path: '/clubClub',
                name: 'ClubClub',
                component: ClubClub,
            },
            {
                path: '/clubRole',
                name: 'ClubRole',
                component: ClubRole,
            },
            {
                path: '/clubUser',
                name: 'ClubUser',
                component: ClubUser,
            },
            {
                path: '/rights',
                name: 'Rights',
                component: Rights,
            },
            {
                path: '/roles',
                name: 'Roles',
                component: Roles,
            },
            {
                path: '/clubDetail',
                name: 'ClubDetail',
                component: ClubDetail,
            },
            {
                path: '/college',
                name: 'College',
                component: College,
            },
            {
                path: '/specialty',
                name: 'Specialty',
                component: Specialty,
            },
            {
                path: '/class',
                name: 'Class',
                component: Class,
            },
            {
                path: '/setting',
                name: 'Setting',
                component: Setting,
            },
            {
                path: '/clubManage',
                name: 'ClubManage',
                component: ClubManage,
            },
            {
                path: '/myClub',
                name: 'MyClub',
                component: MyClub,
            },
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
//挂载路由导航守卫
router.beforeEach((to, from, next) => {
    //to将要访问的路径
    //from从哪个路径跳转而来
    //next()是一个函数,表示放行 next("/path") 强制跳转
    if (to.path === "/login") return next();
    if (!window.sessionStorage.getItem("token")) return next("/login");
    next();
});
export default router

import {baseUrl} from '../../static/baseurl'
import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL=baseUrl
axios.interceptors.request.use(
     config => {
          const token = sessionStorage.getItem('token')   
        //  let data = config.data
           console.log(token)
          if(config.method ==='post'){
               if(config.url === '/resource/add/content'){
                    let data = config.data
                     console.log(data)
                    config.headers = { 'Content-type': 'application/json;charset=UTF-8' };
                    config.data = {
                        ...config.data,
                         token: token
                    }
                    return config;
                }
               let data = qs.parse(config.data)
               config.data = qs.stringify({
                  token: token,
                   ...data
                  })  
          }else if(config.method==='get'||config.method==='delete'){
               config.params = {
                      token: token,
                    ...config.params
               }
          } 
          return config
     },function(error){
          return Promise.reject(error)
     }
)
// var http = axios.create({
//      timeout: 8000, /*设置请求超时时间*/
//      baseURL:'http://192.168.80.11:20005/api', 
     
//     });
//  export default http; 
//登录接口
export const userlogin = (parms)=>{
     return axios
     .post("/user/login",parms)
}
//登录时候左侧菜单栏
var _this = this
export const menulist = (parms) => {
    return axios
        .get('user/permissions/account', { params: parms })
}
//修改密码
export const updatepassword = (parms)=>{
     return axios
     .post("/user/update/password",parms)
}
//创建角色
export const roleadd = (parms) => {
     return axios
         .post('/role/add', parms)
 }
 //角色查询
 export const rolelist = (parms) => {
     return axios
         .get('/role/list', { params: parms })
 }
//角色权限查询
export const findpermissions = (parms) => {
     return axios
         .get('/role/find/permissions', { params: parms })
 }
//更改管理员权限
export const updatepermission = (parms) => {
     return axios
         .post('/role/update/permission', parms)
 }

 //角色删除
 export const roledelete = (parms) => {
     return axios
         .get('/role/delete', { params: parms })
 }
 //班级添加
 export const classadd =(parms) =>{
      return axios
      .post('/class/add',parms)
 }
 //班级列表
 export const classlist = (parms) => {
     return axios
         .get('/class/list', { params: parms })
 }
 //班级删除
 export const classlistdelete = (parms) => {
     return axios
         .delete('/class/delete/classId', { params: parms })
 }
//查询班级下所有学生的而信息
export const studentlist = (parms)=>{
      return axios
    .get('/class/student/list', {params: parms})
}
 //编辑编辑
 export const classupdata =(parms) =>{
     return axios
     .post('/class/update',parms)
}
//创建用户,验证用户登录名
export const usercheck = (parms) => {
     return axios
         .get('/user/check', { params: parms })
 }
 //创建新用户
 export const userAdd =(parms) =>{
     return axios
     .post('/user/add',parms)
}
//根据用户id查询用户信息


//用户更新
export const updateaccountedit =(parms) =>{
     return axios
     .post('/user/update/account',parms)
}
//用户列表
export const userlistpage = (parms) => {
     return axios
         .get('/user/list/page', { params: parms })
 }
 //用户删除
 export const deleteuid = (parms) => {
     return axios
         .get('/user/delete/account', { params: parms })
 }
 //用户批量删除
 export const deletbatch = (parms) => {
     return axios
         .get('/user/delete/batch', { params: parms })
 }
//权限-->角色分配菜单
export const permissionlistsort = (parms) => {
     return axios
         .get('/permission/list/sort', { params: parms })
 }
 //权限管理菜单管理增加
export const permissionlistfirst = (parms) => {
     return axios
         .get('/permission/list/first', { params: parms })
 }
 //权限操作相关删除接口
export const permissiondelete = (parms) => {
     return axios
         .get('/permission/delete', { params: parms })
 }
 //权限菜单的修改
export const permissionupdate = (parms) => {
     return axios
         .post('/permission/update', parms)
 }
 //课程资源接口
export const courseaddcourse = (parms) => {
     return axios
         .post('/course/add/course', parms)
 }
 //课程体系分页查询
export const courseStructurepage = (parms) => {
     return axios
         .get('/course/courseStructure/page', { params: parms })
 }
 //查询体系下面的分类
export const courseClassificationpage = (parms) => {
     return axios
         .get('/course/courseClassification/page', { params: parms })
 }
 //查询课程内容
export const courseContentpage = (parms) => {
     return axios
         .get('/course/courseContent/page', { params: parms })
 }
 //删除课程体系
export const delectcourseStructure = (parms) => {
     return axios
         .get('/course/delete/courseStructure', { params: parms })
 }
 //删除课程分类
export const delectcourseClassification = (parms) => {
     return axios
         .get('/course/delete/courseClassification', { params: parms })
 }
 //删除课程内容
export const delectcourseContent = (parms) => {
     return axios
         .get('/course/delete/courseContent', { params: parms })
 }
//编辑课程体系分类内容
export const updatecourse = (parms) => {
     return axios
         .post('/course/update/course', parms)
 }
 //获取父级结构
export const listparentStructure = (parms) => {
     return axios
         .get('/course/list/parentStructure', { params: parms })
 }
 //添加试题
 export const examinationQuestionadd = (parms) => {
     return axios
         .post('/examination/question/add', parms)
 }
//查询试题列表
export const examinationqusetionlist=(params)=>{
      return axios
      .get('/examination/question/list',{params:params})
}
//删除试题
export const questiondelete = (parms) => {
     return axios
         .post('/examination/question/delete', parms)
 }
//编辑的时候查询单个试题的
export const examinationqusetionfindone=(params)=>{
     return axios
     .get('/examination/question/findOne',{params:params})
}
//试题编辑
export const questiondeleteupdate = (parms) => {
     return axios
         .post('/examination/question/update', parms)
 }
//通过分类查询试题列表
export const   questionclassifylist =(params)=>{
     return axios
     .get('/examination/question/classify/list',{params:params})
}
//添加试卷
export const examinationpaperadd = (parms) => {
     return axios
         .post('/examination/paper/add', parms)
 }
 //试卷列表
 export const   examinationpaperlist =(params)=>{
     return axios
     .get('/examination/paper/list',{params:params})
}
//试卷删除
export const examinationdelect =(parms)=> {
     return axios
     .post('/examination/paper/delete',parms) 
}
//添加考场
export const examinationroomadd =(params) =>{
       return axios
      .post('/examination/room/add',params)
}
//查询考场列表

export const  examinationroomlist =(params)=>{
     return axios
     .get('/examination/room/list',{params:params})
}

//实验列表
export const ResourceManagementpage =(params) =>{
     return axios
     .get('/resource/ResourceManagement/page',{params:params})
}
//验证实验名称
export const checkManagementName =(params) =>{
     return axios
     .get('/resource/checkManagementName',{params:params})
}

///实验平台新增->基础信息
export const resourceaddmanagement =(params) =>{
     return axios
    .post('/resource/add/management',params)
}
//实验文档增加
export const resourceaddconcent =(params) =>{
     return axios
    .post('/resource/add/content',params)
}
//删除实验
export const  resourcedelect =(params) =>{
     return axios
    .post('/resource/delete/management',params)
}

//实验平台消息基础信息编辑

export const resourceupdatamanagement =(params) =>{
     return axios
    .post('/resource/update/management',params)
}
//增加课程资料
export const addcourseMaterial =(params) =>{
     return axios
    .post('/material/add/courseMaterial',params)
}

//根据名字查询当前创建成功的id
export const resoureNamefindid =(params) =>{
      return axios
      .get('/resource/resourceManagementName/object',{params:params})
}
//根据id查询创建的实验信息,编辑的时候用的
export const resourceManagementobject =(params) =>{
     return axios
     .get('/resource/resourceManagement/object',{params:params})
}
//根据id查询对象信息
export const resourceAllocation =(params) =>{
     return axios
     .get('/resource/resourceAllocation/object',{params:params})
}

//配置文本编辑器上传
export const resourceuploadfile =(params) =>{
     return axios
    .post('/resource/upload/file',params)
}
//首页
export const experimentpagelist =(params) =>{
     return axios
     .get('/experiment/page/list',{params:params})
}
//首页--详情页面
export const experimentcourseResourcelist =(params) =>{
     return axios
     .get('/experiment/courseResource/list',{params:params})
}
//实验环境配置
export const experimentcourseResourceinfo=(params) =>{
     return axios
     .get('/experiment/courseResource/info',{params:params})
}

//获取系统云信息
export const imagefindclouds =(params) =>{
     return axios
     .get('/image/find/clouds',{params:params})
}
//获取kubernettes模版列表
export const kubernetesTemplates =(params) =>{
     return axios
     .get('/template/find/kubernetesTemplates',{params:params})
}
//获取optenstack模版列表
export const openstackTemplates =(params) =>{
     return axios
     .get('/template/find/openstackTemplates',{params:params})
}
//新增资源配置信息
export const resourceaddallocation =(params) =>{
     return axios
    .post('/resource/add/allocation',params)
}

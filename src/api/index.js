import ajax from './ajax.js'

//处理跨域
const prefix = process.env.NODE_ENV === 'development' ? "http://localhost:3000" : "http://localhost:5000"
//发登录请求
export const Reqlogin =(username,password)=> ajax(prefix +'/login',{username,password},'POST');

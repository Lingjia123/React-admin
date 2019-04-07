import jsonp from 'jsonp';
import ajax from './ajax.js'

//处理跨域
const prefix = process.env.NODE_ENV === 'development' ? "http://localhost:3000" : "http://localhost:5000"
//发登录请求
export const Reqlogin = (username, password) => ajax(prefix + '/login', {username, password}, 'POST');

export const ReqWeather =(city)=>{
   return new Promise((resolve, reject )=>{
      jsonp(`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`,
        (err,data)=>{
        if(!err){
          const {weather,dayPictureUrl} = data.results[0].weather_data[0]
          resolve({weather,weatherImage:dayPictureUrl})

        }else{
          reject('请求失败')
        }
        }
        )
   })
}
// 请求分类列表数据函数
export const ReqCategories =(parentId)=> ajax(prefix + '/manage/category/list',{parentId});
// 请求添加分类函数
export const reqAddCategory = (parentId, categoryName) => ajax(prefix + '/manage/category/add', {parentId, categoryName}, 'POST');
// 请求修改分类函数
export const reqUpdateCategoryName=(categoryId, categoryName)=>ajax(prefix + '/manage/category/update', {categoryId, categoryName}, 'POST')

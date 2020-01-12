import axios from 'axios'
import qs from 'qs'
import router from '@/router'

// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    //if (getToken()) {
    // let each request carry token
    // ['X-Token'] is a custom headers key
    // please modify it according to the actual situation
    // 可以自定义请求头
    // config.headers['bf-token'] = getToken().user.userId
    //}
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    //登陆超时
    if (res.tokenCode == 5000) {
      Dialog.alert({
        message: '登录超时,请重新登录'
      }).then(() => {
        //先清空本地的储存
        removeToken();
        //强制跳转
        router.replace('/user');
      });
      return;
    }
    return res;
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)
// 请求分为get/post
// axios对于get和post的参数的处理方式是不同的
function http(config) {
  if (config.method.toLowerCase() === 'post') {
    // 针对对象 是无法直接处理的 ; qs是一个js库,可以方便的对对象进行序列化处理
    // myAjax  {name:'zx',age:20} ==> name=zs&age=20
    config.data = qs.stringify(config.arg, {
      arrayFormat: 'repeat',
      allowDots: true
    });
  } else {
    config.params = config.arg;
  }
  return service(config);
}

export default http
import axios from 'axios';

// 请求时的拦截器
axios.interceptors.request.use(
  config => config,
  error => Promise.reject(error),
);

// 请求完成时后的拦截器
axios.interceptors.response.use(
  response => response,
  error => Promise.resolve(error.response),

);

function errorState(response) {
  //  ..隐藏loading
  // console.log(response)
  // console.log('失败，统一判断后端返回的错误码')
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response;
  }
  return '网络异常';
}

function successState(res) {
  //  ..隐藏loading
  // console.log(res)
  // console.log('成功，统一判断后端返回的错误码')
  // 统一判断后端返回的错误码
  // if (res.data.errCode == '000002') {
  //   console.log(res.data.errDesc || '网络异常')
  // } else if (res.data.errCode != '000002' && res.data.errCode != '000000') {
  //   console.log(res.data.errDesc || '网络异常')
  // }
  return res;
}
/**
 * 从服务端获取数据
 * @param  {object} options  必传值
 * @param  {string} options.url 模块名称
 * @param  {string} options.method 请求方法 (post or get)
 * @param  {object} data 请求方法参数 选填有默认值,也可自定义
 * @param  {object} headers 请求头 选填有默认值,也可自定义
 * @return response
 * @author wyl  update(2017-11-29)
 * */
const httpServer = (options, data, headers) => {
  // 公共参数
  const Public = {
    // 'testParam': " "
  };
  // http默认配置
  const httpDefaultoptions = {
    method: options.method,
    // 请求协议
    baseURL: 'http://127.0.0.1:3004/',
    // baseURL 基础 url 前缀
    url: options.url,
    // 请求的地址
    timeout: 10000,
    // 超时时间, 单位毫秒
    params: Object.assign(Public, data),
    // get 请求时带的参数
    data: Object.assign(Public, data),
    // post 请求的数据
    // 请求头信息headers || options.method === 'get' ? {} : {'Content-Type': 'application/json'}
    headers: headers || (options.method === 'get' ? {} : { 'Content-Type': 'application/json' }),
  };

  if (options.method === 'get') {
    delete httpDefaultoptions.data;
  } else {
    delete httpDefaultoptions.params;
  }

  /*
  * 将异常部分直接封装到业务调用的 then 方法中 例如：
   promise(apiSetting.getProjects).then(
     res => {
       //... do something
     },
     error => {
       //... do something
     }
   )
 */
  const promise = new Promise(((resolve, reject) => {
    axios(httpDefaultoptions)
      .then((res) => {
        successState(res);
        resolve(res);
      })
      .catch((error) => {
        errorState(error);
        reject(error);
      });
  }));

  return promise;
};

export default httpServer;

import axios from 'axios';
import { message } from 'element-ui';
import { config } from 'vue/types/umd';

// 创建一个axios实例
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,// url=base url + request url
    timeout: 5000//请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
    config => {
        console.log('config', config);
        // 在发送请求前做些什么
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    response => {
        console.log(response);
        const res = response.data;
        // 200是自定义的状态码 根据实际情况定义
        if (res.statusCode !== 200) {
            Message({
                message: res.message || 'Error',
                type: 'error',
                duration: 5 * 1000
            });
            // 此外还可以写一些其他逻辑处理
            return Promise.reject(new Error(res.message || 'Error'));
        } else {
            return res;
        }
    },
    error => {
        console.log('err' + error);
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        });
        return Promise.reject(error);
    }
);
export default service;
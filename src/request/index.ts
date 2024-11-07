
import axios from 'axios';
import {
    ElNotification,
} from "element-plus";

const axiosInstance = axios.create({
    timeout: 20000, // 超时时间
})

// 请求拦截器
axiosInstance.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么，例如设置token、将数据转为JSON格式等
        config.headers['Authorization'] = 'Bearer your-token';
        return config;
    },
    error => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
    response => {
        if (response.status === 200) {
            if (response.data.code === 200) {
                return Promise.resolve(response.data)
            } else {
                ElNotification({
                    title: "错误",
                    message: response.data.message,
                    type: "error",
                });
                return Promise.reject(response)
            }
        } else {
            ElNotification({
                title: "错误",
                message: '请求遇到错误,请稍后再试!',
                type: "error",
            });
            return Promise.reject(response)
        }
    },
    error => {
        // 对响应错误做点什么
        return Promise.reject(error);
    })


export default axiosInstance;

import axios from 'axios';
// import _ from 'lodash';

axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
axios.defaults.timeout = 60 * 1000;
axios.defaults.headers['Cache-Control'] = 'no-cache,no-store,must-revalidate,max-age=-1,private';

let config = {
    // onUploadProgress: function (progressEvent) {},
    // onDownloadProgress: function (progressEvent) {},
};

const request = axios.create(config);

request.interceptors.request.use(
    //요청성공전
    async function (config) {
        try {
            return config;
        } catch (err) {
            console.error('[axios.interceptors.request] config : ' + err.message);
        }
    },
    //요청 에러전
    function (error) {
        try {
            alert('request : ' + error.message);
            return Promise.reject(error);
        } catch (err) {
            console.error('[_axios.interceptors.request] error : ' + err.message);
        }
    },
);

// Add a response interceptor
request.interceptors.response.use(
    //
    function (response) {
        try {
            return response;
        } catch (err) {
            console.error('[axios.interceptors.response] response : ' + err.message);
        }
    },
    function (error) {
        try {
            console.log(error);
            const errorStatus = error.response.status;

            if (errorStatus == '400') alert(error.response.data);
            if (errorStatus == '401') alert('인증에 실패했습니다.');
            if (errorStatus == '403') alert('권한이 없습니다.');
            if (errorStatus == '500') alert('서버에서 오류가 발생하였습니다.');

            return error.response;
        } catch (err) {
            console.error('[axios.interceptors.response] error : ' + err.message);
        }
    },
);

export default {
    request,
};

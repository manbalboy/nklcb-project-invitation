import axios from 'axios';

const request = (method, url, data) => {
    return axios({
        method,
        url,
        data,
    })
};

export default {
    request
}
import axios from "axios";


axios.interceptors.response.use(undefined, (err) => {
    const { config, message } = err;
    if (!config || !config.retry) {
        return Promise.reject(err);
    }

    if (!(message.includes("timeout") || message.includes("Network Error"))) {
        return Promise.reject(err);
    }

    config.retry -= 1;

    const delayRetryRequest = new Promise((resolve) => {
        setTimeout(() => {
            console.log("retrying the request", config.url);
            resolve();
        }, config.retryDelay || 1000);
    });
    return delayRetryRequest.then(() => axios(config))
})

const fetchData = async (url, loading, setter) => {
    loading(true)
    const response = await axios.get(url, {retry: 100, retryDelay: 3000})
    setter(response.data);
    loading(false)
}

export default fetchData;

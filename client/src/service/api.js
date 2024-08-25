import axios from 'axios';
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config';
import { getAccessToken, getRefreshToken, setAccessToken, getType } from '../utils/common-utils';

const API_URL = 'http://localhost:8000';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 20000, // Increased timeout to 20 seconds
    headers: {
        "content-type": "application/json"
    }
});

axiosInstance.interceptors.request.use(
    function (config) {
        const typeConfig = config.TYPE;
        if (typeConfig) {
            if (typeConfig.params) {
                config.params = typeConfig.params;
            } else if (typeConfig.query) {
                config.url = `${config.url}/${typeConfig.query}`;
            }
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    function (response) {
        return processResponse(response);
    },
    async function (error) {
        return Promise.reject(await processError(error));
    }
);

const processResponse = (response) => {
    const status = response?.status;
    if (status >= 200 && status < 300) { // Handle 2xx status codes
        return { isSuccess: true, data: response.data };
    } else {
        return {
            isFailure: true,
            status: status,
            msg: response?.data?.msg || 'Error occurred',
            code: response?.data?.code || status
        };
    }
}

const processError = async (error) => {
    const response = error.response;
    if (response) {
        if (response.status === 403) {
            // Handle token refresh here
            try {
                const refreshResponse = await axiosInstance.get('/refresh-token', {
                    headers: { authorization: getRefreshToken() }
                });
                if (refreshResponse.data.isSuccess) {
                    setAccessToken(refreshResponse.data.data.accessToken);
                    const requestData = error.config;

                    // Retry the original request with the new token
                    requestData.headers['authorization'] = getAccessToken();

                    const retryResponse = await axiosInstance(requestData);
                    return processResponse(retryResponse);
                }
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        } else {
            return {
                isError: true,
                msg: API_NOTIFICATION_MESSAGES.responseFailure,
                code: response.status
            };
        }
    } else if (error.request) {
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure,
            code: ""
        };
    } else {
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkError,
            code: ""
        };
    }
}

const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) =>
        axiosInstance({
            method: value.method,
            url: value.url,
            data: value.method === 'DELETE' ? '' : body,
            responseType: value.responseType,
            headers: {
                authorization: getAccessToken(),
            },
            TYPE: getType(value, body),
            onUploadProgress: function (progressEvent) {
                if (showUploadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showUploadProgress(percentCompleted);
                }
            },
            onDownloadProgress: function (progressEvent) {
                if (showDownloadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showDownloadProgress(percentCompleted);
                }
            }
        });
}

export { API };

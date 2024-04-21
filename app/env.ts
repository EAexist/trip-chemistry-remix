declare global {
    interface Window {
        ENV: any;
    }
}

const env = (typeof window === 'undefined') ? process.env : window.ENV

export default env

// export default {
//     NODE_ENV: ( typeof window === 'undefined') ? process.env.NODE_ENV : window.ENV.NODE_ENV,
//     REACT_APP_API_URL: ( typeof window === 'undefined') ? process.env.REACT_APP_API_URL : window.ENV.REACT_APP_API_URL,
//     REACT_APP_KAKAO_REST_API_KEY: ( typeof window === 'undefined') ? process.env.REACT_APP_KAKAO_REST_API_KEY : window.ENV.REACT_APP_KAKAO_REST_API_KEY,
//     REACT_APP_KAKAO_REDIRECT_URL: ( typeof window === 'undefined') ? process.env.REACT_APP_KAKAO_REDIRECT_URL : window.ENV.REACT_APP_KAKAO_REDIRECT_URL,
// }
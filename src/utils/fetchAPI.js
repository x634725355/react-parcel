
const BASE_URL = 'http://chengsancai.club:3000';

export class API {
    static parseQueryString(params, mark = false) {
        return (mark ? '?' : "") + Object.keys(params).map(key => `${key}=${params[key]}`).join('&');
        // 下面的方式是URLSearchParms方式
        // return (mark ? '?' : '') + new URLSearchParams(params).toString();
    }

    static async get(url, params) {
        const args = params ? API.parseQueryString(params, true) : "";

        // 如果要发送凭证 或者要在Cookie里面放东西记得添加credentials属性
        return (await fetch(BASE_URL + url + args, { xhrFields: { withCredentials: true }, credentials: 'include' })).json();
    }
}
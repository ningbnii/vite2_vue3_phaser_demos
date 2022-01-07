import request from "../utils/request";

/**
 * 获取用户信息
 * @param {*} params
 * @returns
 */
export function getUserInfo(params) {
  return request.get("/api/index/getUserInfo", params);
}

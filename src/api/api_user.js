/**
 * Created by yqr on 2018/4/13.
 */

export default {
  //登录
  login: params => {
    if (params.nickname == 'admin' && params.password == '123456') {
      return "success";
    } else {
      return "false";
    }
    //return API.POST('/api/users/login', params)
  },
  //登出
  logout: params => {
    return "success";
    //return API.GET('/api/users/logout', params)
  }
}

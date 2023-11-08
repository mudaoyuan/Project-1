//登录接口需要的类型
//用户登录接口携带参数的ts类型
export interface loginFormData {
  username: string
  password: string
}

//定义全部接口返回数据都拥有ts类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

//定义登录接口返回的数据类型

export interface loginResponseData extends ResponseData {
  data: string
}

//定义用户信息返回的数据类型
export interface userInfoResponseData extends ResponseData {
  data: {
    routes: string[]
    button: string[]
    roles: string[]
    name: string
    avatar: string
    buttons: string[]
  }
}

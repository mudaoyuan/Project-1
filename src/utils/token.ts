// 封装本地存储数据与读取数据反复噶
export const SET_TOKEN = (token: string) => {
  sessionStorage.setItem('TOKEN', token)
}

export const GET_TOKEN = () => {
  return sessionStorage.getItem('TOKEN')
}

//本地存储删除数据
export const REMOVE_TOKEN = () => {
  sessionStorage.removeItem('TOKEN')
}

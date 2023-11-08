/* eslint-disable prefer-const */
//layout组件相关配置仓库

import { defineStore } from 'pinia'

let useLayOutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      fold: false, //用户控制菜单折叠还是收起
      refsh: false, //仓库这个属性用户控制刷新效果
    }
  },
})
export default useLayOutSettingStore

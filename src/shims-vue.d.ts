/*
 * @Author: 周楠
 * @Description:
 * @Date: 2023-01-04 15:10:07
 * @LastEditTime: 2023-01-04 15:10:17
 * @LastEditors: 周楠
 */
declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
  }
  declare module 'vue/types/vue' {
    import VueRouter, { Route } from 'vue-router'
    interface Vue {
      $router: VueRouter // 这表示this下有这个东西
      $route: Route
      $http: any
      $Message: any
      $Modal: any
    }
  }

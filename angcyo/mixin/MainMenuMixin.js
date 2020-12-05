import routes from "@/router/router"

/**
 * Email:angcyo@126.com
 * @author angcyo
 * @date 2020/12/05
 */

const MainMenuMixin = {
  data: () => ({
    // 左边导航的所有菜单
    menus: [],
  }),
  created() {
    // 从路由配置中, 读取菜单导航
    let main = routes.find(item => item.path === '/')
    this.menus = main?.children
  },
  computed: {
    currentMenuIndexMixin: function () {
      // 主界面, 默认打开第一个菜单
      let currentPath = this.$route.path
      if (currentPath) {
        let index = this.menus.findIndex(item => currentPath.startsWith(`/${item.path}`))
        if (index === -1) {
          return "0"
        }
        return String(index)
      } else {
        return "0"
      }
    }
  },
  methods: {
    // 导航改变回调
    onChangeMenuIndexMixin(index) {
      this.$router.push({name: this.menus[index].name})
    },
  }
}

export default MainMenuMixin

/**
 * Email:angcyo@126.com
 * @author angcyo
 * @date 2020/12/05
 */

import routes from "@/router/router"

const RouteTabsMixin = {
  data: () => ({
    activeTab: '',
    tabs: []
  }),
  beforeCreate() {
    //this.log('beforeCreate')
  },
  created() {
    //this.log('created')
    let currentPath = this.$route.path
    this.activeTab = currentPath.subEnd('/')
    let mainRoute = routes.find(item => item.path === "/")
    if (mainRoute) {
      if (mainRoute.children) {
        let targetRoute = mainRoute.children.find(item => currentPath.startsWith(`/${item.path}`))
        if (targetRoute) {
          this.tabs = targetRoute.children
        }
      }
    }
  },
  beforeMount() {
  },
  mounted() {
    //this.log('mounted')
  },
  beforeUpdate() {
  },
  updated() {
  },
  beforeDestroy() {
  },
  destroyed() {
  },
  methods: {
    onTabClickMixin(tab) {
      //this.log(tab)
      this.$router.push(tab.name)
    }
  }
}

export default RouteTabsMixin

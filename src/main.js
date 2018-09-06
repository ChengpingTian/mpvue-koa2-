import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
// App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/books/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#EA5149',
      navigationBarTitleText: 'iread,爱阅读',
      navigationBarTextStyle: 'light'
    },
    tabBar: {
      selectedColor:"#EA5149", 
      list: [
        {
        pagePath: "pages/books/main",
        text: "看过的书",
        iconPath:"static/images/book.png",
        selectedIconPath:"static/images/book-active.png"
       },
   
      {
        pagePath: "pages/comments/main",
        text: "评论",
        iconPath:"static/images/todo.png",
        selectedIconPath:"static/images/todo-active.png"
      },
      {
        pagePath: "pages/Me/main",
        text: "个人中心",
        iconPath:"static/images/me.png",
        selectedIconPath:"static/images/me-active.png"
      }
    ]
    }
  }
}

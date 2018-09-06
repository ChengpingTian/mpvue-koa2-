import Vue from 'vue'
import books from './books'

const app = new Vue(books)
app.$mount()
export default{
    config:{
        enablePullDownRefresh: true
    }
}
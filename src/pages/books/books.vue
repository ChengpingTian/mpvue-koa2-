<template>
  <div>
    <div v-if="booklist.length==0">
      您暂未添加书籍，请到个人中心添加
    </div>
    <topswiper :tops="tops" v-if="booklist.length>9"></topswiper>
    <card :key="book.id" v-for="book in booklist" :book='book'></card>
    <p class="no-more-data " v-if='!more'>没有更多数据了</p>
  </div>
</template>
<script>
import { get } from "@/util";
import card from "@/commpents/Card";
import topswiper from "@/commpents/TopSwiper"

export default {
  components: {
    card,
    topswiper
  },
  data() {
    return {
      booklist: [],
      page: 0,
      more: true,
      tops:[]
    };
  },
  methods: {
    async getBooklist(init) {
      if (init) {
        this.page = 0;
      }
      wx.showNavigationBarLoading();
      const res = await get("/weapp/booklist", { page: this.page });
          // console.log(res.list.length)
          // console.log(this.page)
          // console.log(res.list.length < 10 && this.page > 0)
      if (res.list.length < 10 && this.page > 0) {
        
        this.more = false;
     
      }
      if (init) {
     
        this.booklist = res.list;
        wx.stopPullDownRefresh();
      } else {
       
        this.booklist = this.booklist.concat(res.list);
      }

      wx.hideNavigationBarLoading();
     
    },
    async getTop() {
      const topinfo = await get("/weapp/gettop");
      this.tops= topinfo;
      
    }
  },
  onPullDownRefresh() {
   this.more=true;
    this.getBooklist(true);
    // console.log(this.more)
    this.getTop();
  },
  onReachBottom() {
    // console.log(this.more)
   
    if (this.more) {
      // console.log(222)
      this.page = this.page + 1;
      this.getBooklist();
     
    } else {
      // console.log(111)
      return false;
    }
  },
onShow: function(){
       this.getBooklist(true);
    this.getTop();
    },
  mounted() {
    this.getBooklist(true);
    this.getTop();
  }
};
</script>
<style>
.no-more-data {
  text-align: center;
  font-size: 12px;
  color: #333333;
  margin-bottom: 10px;
}
</style>
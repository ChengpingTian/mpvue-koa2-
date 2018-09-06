<template>
  <div class="container">
    <a :href="detailUrl">
    <div class="bookpic">
      <img :src="book.image" mode='widthFix'>
    </div>
    <div class="bookinfo">
      <div class="bookinfo-row text-maincolor">
        <span class="bookname text-maincolor">
          <strong>{{book.title}}</strong>
        <span class="bookrate text-maincolor">评分：{{book.rate}}
        </span>

        </span>
      </div>
      <div class="bookinfo-row">
        <span class="bookauthor">{{book.author}}</span>
        <span class="bookvivwcount">阅读数：{{book.count}}</span>
      </div>
      <div class="bookinfo-row">
        <span class="bookpublish">{{book.publisher}}</span>
        <span class="adder">添加人：{{book.user_info.nickName}}</span>
      </div>
    </div>
    </a>
  </div>
</template>
<script>
import Rate from "@/commpents/Rate";

export default {
  components: {
    Rate
  },
  computed: {
      detailUrl(){
        return '/pages/details/main?id='+this.book.id;
      }
  },
  props: ["book"]
};
</script>
<style scoped>
.container {
  font-size: 28rpx;
  padding: 15rpx;
 
}
.container  a{
   display: flex;
}
.bookname {
  width: 50%;
  overflow: hidden;
}
.bookname {
  font-weight: 800;
  font-size: 14px;
}

.bookinfo {
  margin-left: 10px;
  width: calc(100% - 190rpx);
}
.bookpic {
  width: 190rpx;
  height: 238rpx;
}
.bookpic img {
  max-width: 100%;
  max-height: 100%;
}
.bookrate {
  display: flex;
}
.bookinfo-row span:first-child {
  width: 270rpx;
}
.bookinfo-row span:last-child {
  display: inline-block;
  
}
.bookinfo-row {
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #3a3a3a;
  justify-content: flex-start;
  line-height: 46rpx;
}
</style>


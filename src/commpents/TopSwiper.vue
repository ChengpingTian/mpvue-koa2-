<template>
  <div class='swiper'>
    <swiper 
    :indicator-dots='true'
    indicator-color='#EA5A49'
    :autoplay='true'
    :interval='6000'
    :duration='1000'
    :circular='true'>
      <div :key='imgindex' v-for='(top,imgindex) in imgUrls'>
        <swiper-item>
          <img @click='bookDetail(img)' class='slide-image' mode='aspectFit' v-for='img in top' :key='img.id' :src="img.image">
        </swiper-item>
      </div>

    </swiper>
  </div>
</template>

<script>
export default {
  props: ["tops"],
  computed: {
    imgUrls() {
      // 如果通用 请用chunk函数  比如lodash的chunk方法
      let res = this.tops.list;
      if (!res) {
        return false;
      } else {
        const length = res.length;
        // 判断不是数组，或者size没有设置，size小于1，就返回空数组
        //核心部分
        let index = 0; //用来表示切割元素的范围start
        let resIndex = 0; //用来递增表示输出数组的下标

        //根据length和size算出输出数组的长度，并且创建它。
        let result = new Array(Math.ceil(length / 3));
        //进行循环
        while (index < length) {
          //循环过程中设置result[0]和result[1]的值。该值根据array.slice切割得到。
          result[resIndex++] = res.slice(index, (index += 3));
        }
        //输出新数组
        return result;
      }
    }
  },

  methods: {
    bookDetail(item) {
      wx.navigateTo({
        url: "/pages/details/main?id=" + item.id
      });
    }
  }
};
</script>
<style lang='scss'>
.swiper {
  margin-top: 5px;
  .slide-image {
    width: 33%;
    height: 250rpx;
  }
}
</style>


<template>
  <div>
    <Bookinfo :info='info'></Bookinfo>
    <Commentlist :comments="comments"></Commentlist>
    <div class="comment"  v-if="showAdd">
      <textarea v-model='comment' class='textarea' :maxlength='100' placeholder='请输入图书短评'></textarea>
      <div class='location'>
        地理位置：
        <switch color='#EA5A49' :checked='location' @change='getGeo'></switch>
        <span class='text-primary'>{{location}}</span>
      </div>
      <div class='phone'>
        手机型号：
        <switch color='#EA5A49' :checked='phone' @change='getPhone'></switch>
        <span class='text-primary'>{{phone}}</span>
      </div>
      <button class="btn" @click="addcomment()">评论</button>
    </div>
     <div v-else="" class="text-footer">
      未登录或者已经评论过啦 
    </div> 
    <button open-type="share" class="btn">转发给好友</button> 
  </div>
</template>
<script>
import { get, post, showMdal } from "@/util";
import Bookinfo from "@/commpents/Bookinfo";
import Commentlist from "@/commpents/Commentlist";
export default {
  components: {
    Bookinfo,
     Commentlist
  },
  data() {
    return {
      comments:[],
      userinfo: {},
      bookid: "",
      info: {},
      comment: "",
      location: "",
      phone: ""
    };
  },
   computed: {
    showAdd () {
      // 没登录
      if (!this.userinfo.openId) {
        return false
      }
      // 评论页面里查到有自己的openid
      if (this.comments.filter(v => v.openid === this.userinfo.openId).length) {
        return false
      }
      return true
    }
  },
  methods: {
    async addcomment() {
      console.log(this.userinfo.openId);
      if (!this.comment) {
        showMdal("请填写评论内容");
        return;
      }
      const data = {
        openid: this.userinfo.openId,
        bookid: this.bookid,
        comment: this.comment,
        phone: this.phone,
        location: this.location
      };
      try  {
        await post('/weapp/addcomment', data)
        this.comment = ''
        this.Getcommentslist()
      } catch (e) {
        showModel('失败', e.msg)
      }

      console.log(data);
    },
    async getsetail() {
      const info = await get("/weapp/booksdetails", { id: this.bookid });
      wx.setNavigationBarTitle({
        title: info.title
      });
      this.info = info;
      console.log(info);
    },
    async Getcommentslist() {
      const comments = await get("/weapp/commentslist", {
        bookid: this.bookid
      });
       this.comments = comments.list || []
     console.log(this.comments)
    },
    getGeo(e) {
      // RmKXCpjKlwyFUVVXSCXcLF4KUsOimuuy
      const ak = "V5btq8dOuUMZ4LAfymiDPtZBd1eIoGXr";
      let url = "http://api.map.baidu.com/geocoder/v2/";

      if (e.target.value) {
        wx.getLocation({
          success: geo => {
            wx.request({
              url,
              data: {
                ak,
                precise: 1,
                location: `${geo.latitude},${geo.longitude}`,
                output: "json"
              },
              success: res => {
                console.log(res);
                if (res.data.status === 0) {
                  this.location = res.data.result.addressComponent.city;
                } else {
                  this.location = "未知地点";
                  // console.log('出错了')
                }
              }
            });
          }
        });
      } else {
        this.location = "";
      }
    },
    getPhone(e) {
      if (e.target.value) {
        const phoneInfo = wx.getSystemInfoSync();
        // console.log(phoneInfo)
        this.phone = phoneInfo.model;
      } else {
        // 没选中
        this.phone = "";
      }
    }
  },
  mounted() {
    this.bookid = this.$root.$mp.query.id;
    this.getsetail();
    this.Getcommentslist()
    

    const userinfo = wx.getStorageSync("userInfo");
    console.log(userinfo);
    if (userinfo) {
      this.userinfo = userinfo;
    }
  }
};
</script>
<style lang='scss'>
.comment {
  margin-top: 10px;
  .textarea {
    width: 730rpx;
    height: 200rpx;
    background: #eee;
    padding: 10rpx;
  }
  .location {
    margin-top: 10px;
    padding: 5px 10px;
  }
  .phone {
    margin-top: 10px;
    padding: 5px 10px;
  }
}
</style>




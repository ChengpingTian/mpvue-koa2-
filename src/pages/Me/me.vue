<template>
  <div>
    <div class="container">

      <div class="tips" v-if="isShow">
        <p>您暂未登录请点击登录按钮</p>
        <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="doLogin" class="btn">登录</button>
      </div>
      <div v-else>
        <div class="userpic">
          <img :src="userInfo.avatarUrl" alt="">
        </div>
        <p class="neckname">
          {{userInfo.nickName}}
        </p>

        <div class="scan" v-if="userInfo.openId">
          <button class="btn" @click="scanbooks">请扫描图书条形码</button>
        </div>

      </div>

    </div>
  </div>
</template>
<script>
import { get, successTips, post, showMdal } from "@/util";
import qcloud from "wafer2-client-sdk";
import config from "@/config";

export default {
  data() {
    return {
      userInfo: {
        nickName: {}
      },
      isShow: ""
    };
  },
  created() {
    //   console.log(this.userinfo.nickName)
    let user = wx.getStorageSync("userInfo");
    if (!user) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
    this.userInfo = wx.getStorageSync("userInfo");
  },
  methods: {
    doLogin: function(e) {
      var self = this;
      this.isShow = false;
      qcloud.setLoginUrl(config.loginUrl);
      qcloud.login({
        success: function(userInfo) {
          console.log("登录账号中....");
          qcloud.request({
            url: config.userUrl,
            login: true,

            success(userRes) {
              console.log(111);
              successTips("登录成功");
              self.userInfo = userRes.data.data;
              wx.setStorageSync("userInfo", userRes.data.data);
            }
          });
        },
        fail: function(err) {
          console.log(22222);
          console.log("登录失败", err);
        }
      });
    },
    async addbooks(isbn) {
      const res = await post("/weapp/addbook", {
        isbn,
        openid: this.userInfo.openId
      });
     
      if (res.title) {
        
        wx.showModal({
          title: "提示",
          content: "添加成功,是否继续添加",
          success(res) {
            if (res.confirm) {
              return false;
            } else if (res.cancel) {

              wx.switchTab({
                url: "/pages/books/main"
              });
            }
          }
        });
      }
      else{
             console.log(111111);
      }
    },
    scanbooks: function() {
      wx.scanCode({
        onlyFromCamera: true,
        success: res => {
          console.log(res.result);
          if (res.result) {
            this.addbooks(res.result);
          }
        }
      });
    }
  }
};
</script>
<style lang="scss">
.container {
  padding: 0 30rpx;
  text-align: center;
}

.userpic img {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  margin: 30rpx;
}
.scan {
  margin-top: 60rpx;
}
</style>



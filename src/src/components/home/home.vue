<!-- 路由home的展示的页面组件 -->
<template>
  <div class="home">
      <div class="main">
          <div class="content">
               <div class="header">
               <h1>
                   <a href=""><img src="./map-logo.png" alt=""></a>
               </h1>
               <span class="home-right">
                   <router-link  to="">登录</router-link>
                  <span>|</span>
                   <router-link to="">注册</router-link>
                  <router-link class="store" to="">我要开店</router-link>
               </span>
          </div>
          <div class="container">
               <h2>
                 <img src="./map-logo-center.png" alt="">
               </h2>
               <div class="search">
                    <div class="city">
                        <a class="current " href="javascript:" @click="isShow">{{current}}</a>
                        <div class="city-content" v-if="showCities">
                            <div class="city-header">
                                <div class="city-breadcrumb">
                                    <span class="highlight">选城市</span> > 定位置 > 叫外卖
                                </div>
                                <h3>请选择你所在的城市</h3>
                            </div>
                            <div class="city-guess">
                                 <div class="city-quickguess">
                                      <span class="highlight">猜你在</span>
                                      <button>{{city.name}}</button>
                                 </div>
                                 <div class="city-search">
                                      <input type="text" placeholder="请输入城市" v-model="citySearch">
                                      <ul>
                                         <li v-for="(item,index) in queryCity" v-if="index<8">
                                              <span>{{item.pinyin}}</span>
                                              <span>{{item.name}}</span>

                                         </li>
                                      </ul>
                                 </div>
                            </div>
                            <div class="city-list">
                                 <dl v-for="(value,key) in this.cityList">
                                     <dt>{{key}}</dt>
                                     <dd v-for="item in value" @click="changeCity(item.name)"><a href="javascript:">{{item.name}}</a></dd>
                                 </dl>
                            </div>
                        </div>
                    </div>
                    <div class="search-navbar">
                      <form >
                           <input type="text" v-model="query"  placeholder="请输入你的收货地址（写字楼，小区，街道或者学校）">
                           <button @click="stress">提交</button>
                      </form>
                    </div>
               </div>

          </div>
          </div>

      </div>
      <div class="footer">
          <div class="footer-app">
               <div class="footer-img"><img src="./appqc.95e532.png" alt=""><span>扫码下载 APP</span></div>
               <div class="footer-text">
                  <p>新用户首次下单</p>
                  <strong>最高立减20元</strong>
                  <p>立即下载APP，享更多优惠吧！</p>
               </div>
          </div>
          <p class="mapfooter-link">
             <a href="http://kaidian.ele.me" target="_blank">我要开店</a>
             <a href="/support/about" target="_blank">联系我们</a>
             <a href="/support/about/agreement" target="_blank">服务条款和协议</a>
             <a href="http://jobs.ele.me" target="_blank">加入我们</a>
             <a href="//fengniao.ele.me/" target="_blank">蜂鸟配送</a>
          </p>
          <div class="footer-copyright">
              <a href="http://www.shca.gov.cn/" target="_blank">沪B2-20150033</a>
              <a href="http://www.miibeian.gov.cn/" target="_blank">沪ICP备 09007032</a>
              <a href="http://www.sgs.gov.cn/lz/licenseLink.do?method=licenceView&entyId=20120305173227823" target="_blank"> Copyright ©2008-2017 上海拉扎斯信息科技有限公司, All Rights Reserved.</a>
          </div>
          <div class="footer-police">
              <a href="http://www.zx110.org/picp/?sn=310100103568" target="_blank">
                <img src="//faas.elemecdn.com/desktop/media/img/picp_bg.e373b3.jpg" alt="已通过沪公网备案，备案号 310100103568" height="30">
              </a>
          </div>

      </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
         return {
            current:'',//所在城市
            city:'',//猜你在城市
            cityList:'',//下拉列表
            citySearch:'',//下拉搜索城市
            cityDrop:[],//下拉列表大数组
            showCities:false,//展示下拉
            query:'',//搜索城市
            // suggest:''
         }
    },
    methods:{
        ajax:function(key,url) {
            axios.get(url).then((data) => {
                 this[key] = data.data;
                 if(key=='city') {
                    this.current = data.data.name;
                 }
                 if(key=='cityList') {
                     for(var keys in this.cityList) {
                          var value = this.cityList[keys];
                        this.cityDrop = this.cityDrop.concat(value)
                     }
                 }
            }).catch(() => {
                 console.log('errno')
            })
        },
        isShow() {
           this.showCities=!this.showCities
        },
        changeCity(value) {
            this.current = value;
            this.isShow()
        },
        stress() {
            this.$router.push({path:'/place'})
        }
    },
    watch:{

        query(value) {
          var url = 'https://mainsite-restapi.ele.me/v2/pois?extras%5B%5D=count&geohash=wtmknpnr9yy3&keyword=a&limit=20&type=nearby'
            axios.get(url,function(data) {

            })
        }
    },
    computed:{
      // 帅选城市
        queryCity() {
          var arr=[];
           this.cityDrop.filter((city) => {
                if(this.citySearch=='') return
               if(city.name.startsWith(this.citySearch)) {
                   arr.push(city)
               }else if (city.pinyin.startsWith(this.citySearch)) {
                   arr.push(city)
               }
           })
           return arr;
        }
    },
    created:function() {
      //请求所在城市和城市列表
      this.ajax('city','https://mainsite-restapi.ele.me/shopping/v1/cities/guess');
      this.ajax('cityList','https://mainsite-restapi.ele.me/shopping/v1/cities');

    }
}
</script>
<style lang="scss">
     .home {
      width: 100%;
      height: 500px;
      .main {
          height: 500px;
          background: url('map.a76df5.png');
          position: relative;
          .content {
              width: 1180px;
              margin: 0 auto;
              height: 100%;
              box-sizing: border-box;
              .header {
                  padding-top: 25px;
                  h1 {
                      float: left;
                      width: 220px;
                      height: 49px;
                      a {
                          display: block;
                          img {
                              width: 220px;
                          }
                      }
                  }
                  .home-right {
                      float: right;
                      word-spacing: 10px;
                      a {
                          color: white;
                          font-size: 14px;
                          display: inline-block;
                      }
                      span {
                          color: white;
                          display: inline-block;
                      }
                      .store {
                          padding: 7px 14px;
                          background-color: #5db423;
                      }
                  }
              }
              .container {
                  margin-top: 95px;
                  height: 380px;
                  position: relative;
                  &:after {
                      content: '';
                      position: absolute;
                      bottom: 0;
                      left: 0;
                      width: 447px;
                      height: 502px;
                      background: url('image_kobe.png');
                      transform: scale(.7);
                      transform-origin: left bottom;
                  }
                  h2 {
                      text-align: center;
                      margin-bottom: 53px;
                  }
                  .search {
                      width: 50%;
                      height: 56px;
                      margin: 0 auto;
                      .city {
                          float: left;
                          width: 100px;
                          position: relative;
                          .current {
                              display: block;
                              position: relative;
                              background-color: #fff;
                              text-align: center;
                              height: 56px;
                              font-size: 20px;
                              color: #333;
                              line-height: 56px;
                              overflow: hidden;
                              &:after {
                                  position: absolute;
                                  content: '';
                                  top: 45%;
                                  right: 13px;
                                  margin-left: 5px;
                                  vertical-align: middle;
                                  border-left: 5px solid transparent;
                                  border-right: 5px solid transparent;
                                  border-top: 5px solid #999;
                              }
                          }
                          .city-content {
                              position: absolute;
                              z-index: 1200;
                              top: 76px;
                              background-color: #fff;
                              width: 730px;
                              box-shadow: 0 20px 20px 0 rgba(0, 0, 0, .085);
                              padding: 0 30px 0 23px;
                              overflow-y: auto;
                              max-height: 300px;
                              &:before {
                                  content: '';
                                  position: absolute;
                                  top: 0;
                                  left: 50px;
                                  margin-top: -20px;
                                  border: 10px solid transparent;
                                  border-bottom-color: #fff;
                              }
                              .city-header {
                                  border-bottom: 1px solid #eee;
                                  h3 {
                                      padding: 16px 0;
                                      font-size: 13px;
                                  }
                                  .city-breadcrumb {
                                      font-size: 14px;
                                      float: right;
                                      padding: 16px 50px;
                                      .highlight {
                                          color: #0089dc;
                                      }
                                  }
                              }
                              .city-guess {
                                  padding: 17px 0;
                                  border-bottom: 1px solid #eee;
                                  .city-quickguess {
                                      display: inline-block;
                                      font-size: 14px;
                                      line-height: 25px;
                                      padding-right: 28px;
                                      .highlight {
                                          color: #0089dc;
                                      }
                                      button {
                                          margin: 0 0 0 14px;
                                          padding: 2px 16px;
                                          background: #ff6000;
                                          border: none;
                                          border-radius: 3px;
                                          font-size: 16px;
                                          color: #fff;
                                          cursor: pointer;
                                      }
                                  }
                                  .city-search {
                                      display: inline-block;
                                      height: 30px;
                                      border-left: 1px solid #ddd;
                                      padding-left: 28px;
                                      position: relative;
                                      input {
                                          font-size: 12px;
                                          background-color: #f5f5f5;
                                          border: 1px solid #ededed;
                                          width: 200px;
                                          line-height: 28px;
                                          padding: 0 12px 0 15px;
                                          outline: 0;
                                      }
                                      ul {
                                          position: absolute;
                                          top: 30px;
                                          left: 28px;
                                          border: 1px solid #eee;
                                          border-top: 0;
                                          background-color: white;
                                          z-index: 100;
                                          li {
                                              width: 227px;
                                              clear: both;
                                              height: 28px;
                                              padding: 0 12px;
                                              cursor: pointer;
                                              box-sizing: border-box;
                                              overflow: hidden;
                                              span {
                                                  line-height: 28px;
                                                  font-size: 12px;
                                              }
                                              span:first-child {
                                                  float: right;
                                              }
                                              &:hover {
                                                  background-color: #f2f5f7;
                                              }
                                          }
                                      }
                                  }
                              }
                              .city-list {
                                  position: relative;
                                  font-size: 14px;
                                  dl {
                                      padding-left: 45px;
                                      dt {
                                          position: absolute;
                                          left: 0;
                                          line-height: 42px;
                                      }
                                      dd {
                                          display: inline-block;
                                          width: 77px;
                                          text-align: left;
                                          line-height: 28px;
                                          white-space: nowrap;
                                          text-overflow: ellipsis;
                                          overflow: hidden;
                                      }
                                  }
                              }
                          }
                      }
                      .search-navbar {
                          width: 70%;
                          float: left;
                          height: 100%;
                          form {
                              height: 100%;
                              position: relative;
                              &:before {
                                  content: "";
                                  position: absolute;
                                  top: 13px;
                                  height: 30px;
                                  border-left: 1px solid #dcdcdc;
                              }
                              input {
                                  height: 100%;
                                  display: block;
                                  width: 100%;
                                  padding-left: 18px;
                                  border: none;
                                  outline: 0
                              }
                              button {
                                  position: absolute;
                                  right: -166px;
                                  top: 0;
                                  width: 128px;
                                  line-height: 56px;
                                  font-size: 20px;
                                  padding: 0;
                                  background-color: #f74342;
                                  border: none;
                                  color: white;
                                  &:hover {
                                      background-color: #e62625;
                                  }
                              }
                          }
                      }
                  }
              }
          }
      }
      .footer {
          width: 1180px;
          margin: 0 auto;
          background-color: #fff;
          text-align:center;
          padding-top:60px;
          .footer-app {
              display: inline-block;
              margin-bottom:60px;
               .footer-img {
                    display: inline-block;
                    width: 160px;
                    padding: 15px;
                    border: 1px solid #ddd;
                    position:relative;
                    margin-right:30px;
                    img {
                      display: block;
                      width:100%;
                      height:100%;
                    }
                    span {
                        position: absolute;
                        bottom: 0;
                        margin-bottom: -10px;
                        left: 25px;
                        right: 25px;
                        background-color: #fff;
                        text-align: center;
                        color: #999;

                    }
               }
               .footer-text {
                   display: inline-block;
                   line-height: 30px;
                   padding:30px 0;
                   vertical-align:top;
                   text-align:left;
                   strong {
                       color: red;
                       font-size:30px;
                       font-weight: bold;
                    }
               }
          }
          .mapfooter-link {
              color: #666;
              font-size: 12px;
              line-height: 1;
              margin-bottom: 10px;
          }

      }
  }

</style>

<!-- 商品list列表 -->
<template>
  <div class="list">
    <div class="shopmenu-nav" ref="shopmenu" :class="{sticky:isStatic}">
      <ul>
        <li v-for="category in categorys">{{category.name}}</li>
      </ul>
    </div>
    <div class="shopmenu-main" :style="{marginTop:shopmenuTop+'px'}">
      <!-- 默认排序 -->
      <div class="shopmenu-list" v-for="category in categorys" v-if="filterData==='default'">
        <h3>{{category.name}} <span>{{category.description}}</span></h3>
        <ul>
          <li v-for="food in category.foods">
            <span>
              <a href=""><img :src="logoUrl(food.image_path)" alt=""></a>
            </span>
            <div class="shopmenu-food-main">
              <h3 class="ellipsis ">{{food.name}}</h3>
              <p class="ellipsis ">{{food.description}}</p>
              <div>
                <div class="starrating icon-star">
                  <span class="icon-star"></span>
                </div>
                <span>({{food.rating_count}})</span>
                <span>月售{{food.month_sales}}份</span>
              </div>
            </div>
            <span v-for="(specfood,index) in food.specfoods" v-if="index<1" class="shopmenu-food-price">{{specfood.price}} <small>起</small> </span>
            <div class="spec">
              <div v-if="food.specfoods.length>1">
                <h1>规格{{food.quantity}}</h1>
                <button class="shop-cartbutton" v-if="!food.quantity" @click="spec(food)">选规格</button>
                <div class="shop-cartctrl" v-if="food.quantity">
                  <button class="ctrl minus" @click="sub(food)">-</button>
                  <input class="ctrl quantity" :value="food.quantity" type="text">
                  <button class="ctrl plus" @click="add(food)">+</button>
                </div>
              </div>
              <div v-else>
                <h1>{{food.quantity}}</h1>
                <button class="shop-cartbutton" v-if="!food.quantity" @click="add(food)">加入购物车</button>
                <div class="shop-cartctrl" v-if="food.quantity">
                  <button class="ctrl minus" @click="sub(food)">-</button>
                  <input class="ctrl quantity" :value="food.quantity" type="text">
                  <button class="ctrl plus" @click="add(food)">+</button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!-- 不同的筛选展示不同的内容 -->
      <div class="shopmenu-list" v-if="filterData!='default'">
        <h3>{{filterData}}</h3>
        <ul>
          <li v-for="food in filterCategorys">
            <span>
              <a href=""><img :src="logoUrl(food.image_path)" alt=""></a>
            </span>
            <div class="shopmenu-food-main">
              <h3 class="ellipsis ">{{food.name}}</h3>
              <p class="ellipsis ">{{food.description}}</p>
              <div>
                <div class="starrating icon-star">
                  <span class="icon-star"></span>
                </div>
                <span>({{food.rating_count}})</span>
                <span>月售{{food.month_sales}}份</span>
              </div>
            </div>
            <span v-for="(specfood,index) in food.specfoods" v-if="index<1" class="shopmenu-food-price">{{specfood.price}} <small>起</small> </span>
            <div class="spec">
              <div v-if="food.specfoods.length>1">
                <button class="shop-cartbutton" v-if="!food.quantity" @click="spec(food)">选规格</button>
                <div class="shop-cartctrl" v-if="food.quantity">
                  <button class="ctrl minus" @click="sub(food)">-</button>
                  <input class="ctrl quantity" :value="food.quantity" type="text">
                  <button class="ctrl plus" @click="add(food)">+</button>
                </div>
              </div>
              <div v-else>
                <button class="shop-cartbutton" v-if="!food.quantity" @click="add(food)">加入购物车</button>
                <div class="shop-cartctrl" v-if="food.quantity">
                  <button class="ctrl minus" @click="sub(food)">-</button>
                  <input class="ctrl quantity" :value="food.quantity" type="text">
                  <button class="ctrl plus" @click="add(food)">+</button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <spec></spec>
  </div>
</template>
<script>
import axios from 'axios';
import { logoUrl } from '@/common/js/throttle.js';
import Vue from 'vue';
import spec from '@/components/shop/spec/spec';
export default {
  data() {
    return {
      categorys: '', //类别
      logoUrl: logoUrl,
      isStatic: false,
      shopmenuTop: 0, //类别菜单的top值
      filterCategorys: [],
      hideReason: false,
      locaFood: []
    }
  },
  props: ['filterData'],
  components: {
    spec
  },
  methods: {
    getAjax(id) {
      axios.get('https://www.ele.me/restapi/shopping/v2/menu', {
        params: {
          restaurant_id: id
        }
      }).then((data) => {
        for (var i = 0; i < data.data.length; i++) {
          this.filterCategorys = this.filterCategorys.concat(data.data[i].foods);
        }
        if (JSON.parse(localStorage.CART_MAP)[this.$route.params.id]) {
          var local = JSON.parse(localStorage.CART_MAP)[this.$route.params.id][0].entities;
          for (var i = 0; i < local.length; i++) {
            for (var j = 0; j < this.filterCategorys.length; j++) {
              if (local[i].id == this.filterCategorys[j].specfoods[0].food_id) {
                Vue.set(this.filterCategorys[j], 'quantity', local[i].quantity)
              }
            }
          }
        }
        this.categorys = data.data;
      })
    },
    //菜单fixed事件
    fixMenu() {
      if (document.body.scrollTop > 260) {
        this.isStatic = true;
        this.shopmenuTop = this.$refs.shopmenu.offsetHeight;
      } else {
        this.isStatic = false;
        this.shopmenuTop = 0;
      }
    },
    //购物车减少
    sub(food) {
      var quantity = food.quantity < 0 ? 0 : --food.quantity;
      Vue.set(food, 'quantity', quantity);
      this.setLocal(food, quantity);
    },
    //购物车增加
    add(food) {
      var quantity = food.quantity ? ++food.quantity : 1;
      Vue.set(food, 'quantity', quantity);
      this.setLocal(food, quantity);
    },
    //规格
    spec(food) {
      this.hideReason = true;
    },
    //把添加的商品添加到localStorage
    setLocal(food, quantity) {
      var obj = {
        'id': food.specfoods[0].food_id,
        'quantity': quantity,
        'name': food.name,
        'price': food.specfoods[0].price,
      }
      var local = JSON.parse(localStorage.CART_MAP);
      if (JSON.parse(localStorage.CART_MAP)[this.$route.params.id]) {
      for (var i = 0; i < local[this.$route.params.id][0].entities.length; i++) {
        if (local[this.$route.params.id][0].entities[i].id == obj.id) {
          local[this.$route.params.id][0].entities.splice(i, 1)
        }
      }
    }
      local[this.$route.params.id][0].entities.push(obj);
      localStorage.CART_MAP = JSON.stringify(local)
    }
  },
  computed: {
    orderBy() {
      return this.filterCategorys
    }
  },
  created() {
    this.getAjax(this.$route.params.id);
    this.$nextTick(function() {
      window.addEventListener('scroll', this.fixMenu)
    })
  },
  //place页面和shop页面都注册了scroll事件，页面切换要移除当前的scroll事件
  destroyed() {
    window.removeEventListener('scroll', this.fixMenu)
  }
}

</script>
<style lang="scss">
.list {
  float: left;
  width: 75%;
  .shopmenu-nav {
    padding: 10px 15px 5px;
    background-color: #fff;
    border: 1px solid #eee;
    z-index: 101;
    overflow: hidden;
    li {
      float: left;
      margin: 5px;
      padding: 3px 10px;
      width: 18%;
      border-radius: 2px;
      color: #666;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      vertical-align: top;
      &:hover {
        background-color: #eee;
      }
    }
    &.sticky {
      position: fixed;
      top: 0;
      width: 885px;
    }
  }
  .shopmenu-list {
    width: 102%;
    h3 {
      padding: 20px 0 10px 15px;
      font-size: 20px;
      span {
        font-size: 12px;
        color: #999;
      }
    }
    ul {
      list-style: none;
      overflow: hidden;
      li {
        position: relative;
        margin-right: 2%;
        padding-right: 10px;
        width: 48%;
        float: left;
        margin-bottom: 12px;
        font-size: 12px;
        background-color: #fff;
        border: 1px solid #eee;
        height: 102px;
        span:first-child {
          float: left;
          img {
            margin-right: 14px;
            width: 100px;
            height: 100px;
          }
        }
        div {
          font-size: 12px;
          h3 {
            padding: 0;
            margin-top: 10px;
            font-size: 14px;
            font-weight: bold;
          }
          p {
            color: #999;
          }
          .ellipsis {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
        .shopmenu-food-price {
          position: absolute;
          bottom: 10px;
          font-size: 14px;
          font-weight: 700;
          color: #f74342;
          small {
            margin-left: 3px;
            font-size: 12px;
            color: #888;
          }
          &::before {
            content: "\00a5";
            margin-right: 3px;
            font-size: 12px;
          }
        }
        .spec {
          div {
            .shop-cartbutton,
            .shop-cartctrl {
              position: absolute;
              right: 10px;
              bottom: 10px;
              border: 0;
              cursor: pointer;
              width: 90px;
              height: 26px;
              line-height: 26px;
              border-radius: 20px;
              text-align: center;
              outline: 0;
            }
            .shop-cartbutton {
              display: inline-block;
              background-color: #0089dc;
              color: #fff;
            }
            .shop-cartctrl {
              border: 1px solid #ddd;
              .ctrl {
                position: absolute;
                top: 0;
                display: inline-block;
                height: 24px;
                border: 0;
                width: 27px;
                text-align: center;
                background-color: #eee;
                line-height: 24px;
                outline: 0;
              }
              .minus {
                left: 0;
                border-right: 1px solid #ddd;
                border-radius: 20px 0 0 20px;
                cursor: pointer;
              }
              .quantity {
                background-color: #fff;
                width: 36px;
                left: 27px;
              }
              .plus {
                right: 0;
                border-left: 1px solid #ddd;
                border-radius: 0 20px 20px 0;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
}

</style>

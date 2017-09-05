<template>
    <div class="shop">
        <navigation type="true"></navigation>
        <div class="shop-main">
            <div class="container">
                <div class="shop-info" @mouseenter="shopguideshow" @mouseleave="shopguidehide">
                    <img :src="logoUrl(restaurant.image_path)" alt="">
                    <div class="shop-info-wrapper">
                        <h1>{{restaurant.name}}</h1>
                        <div class="shopguide-info-rate">
                            <div class="starrating  icon-star">
                                <span class="icon-star" :style="{width:restaurant.rating*20+'%'}"></span>
                            </div>
                            ( <span>{{restaurant.rating_count}}</span> ) 月售
                            <span>{{restaurant.recent_order_num}}</span>单
                        </div>
                    </div>
                    <transition name="fade">
                        <div class="shopguide-info-extra" v-if="isshow">
                            <ul>
                                <li class="shopguide-extra-item shopguide-extra-compete">
                                    <div>
                                        <h2>4.4</h2>
                                        <p>综合评论</p>
                                        <p>高于周边商家33.3%</p>
                                    </div>
                                    <div>
                                        <div> 服务态度
                                            <div class="starrating icon-star">
                                                <span class="icon-star"></span>
                                            </div>
                                            <span>4.6分</span>
                                        </div>
                                        <div> 菜品评价
                                            <div class="starrating icon-star">
                                                <span class="icon-star"></span>
                                            </div>
                                            <span>4.6分</span>
                                        </div>
                                    </div>
                                </li>
                                <li class="shopguide-extra-item">
                                    <p><span>商家地址：</span><span>{{restaurant.address}}</span></p>
                                    <p><span>营业时间：</span><span>{{restaurant.opening_hours[0]}}</span></p>
                                </li>
                                <li class="shopguide-extra-item">
                                    <p>由<span>{{restaurant.name}}</span>提供配送服务</p>
                                </li>
                            </ul>
                        </div>
                    </transition>
                </div>
                <div class="shopguide-server">
                    <span><em>起送价</em><em class="shopguide-server-value">35元</em></span>
                    <span><em>配送费</em><em class="shopguide-server-value">配送4元</em></span>
                    <span><em>平均送达速度</em><em class="shopguide-server-value">38分钟</em></span>
                </div>
                <a class="shopguide-favor" href="javascript:">
           <i class="icon-favorite"></i>
           <span >收藏</span>
        </a>
            </div>
        </div>
        <div class="shopnav">
            <div class="shoptype">
                <div class="shopnav-left">
                    <router-link class="shopnav-tab" :class="{active:tab==='index'}" :to="'/shop/'+restaurantId">所有商品</router-link>
                    <router-link class="shopnav-tab" :class="{active:tab==='rate'}" :to="'/shop/'+restaurantId+'/rate'">评价</router-link>
                    <router-link class="shopnav-tab" :class="{active:tab==='info'}" :to="'/shop/'+restaurantId+'/info'">商家资质</router-link>
                    <span class="shopnav-filter ">
               <a href="javascript:;" @click="filter('default')" :class="{active:filterData==='default'}">默认排序</a>
               <a href="javascript:;" @click="filter('rating')" :class="{active:filterData==='default'}" >评分
                 <i class="icon-uniE02D"></i>
                </a>
               <a href="javascript:;" @click="filter('month_sales')" :class="{active:filterData==='default'}">销量
               <i class="icon-uniE02D"></i>
               </a>
               <a href="javascript:;" @click="filter('prices')" :class="{active:filterData==='default'}">价格 <i class="icon-uniE02D"></i></a>
                <span>
                  <a href="javascript:;" @click="changeDisplayType('grid')" class="shopnav-filter-display icon-grid"></a>
<a class="shopnav-filter-display icon-list" @click="changeDisplayType('list')" href="javascript:;"></a>
                </span>
                    </span>
                </div>
                <div class="shopnav-search">
                    <input type="text" placeholder="搜索商家,美食...">
                    <a class="icon-search"></a>
                </div>
            </div>
        </div>
        <div class="shop-product">
            <div class="shopmain">
                <router-view :filterData='filterData'></router-view>
                <div class="shopmain-right">
                    我是右边的
                </div>
            </div>
        </div>
        <cart></cart>
    </div>
</template>
<script>
import { logoUrl } from '@/common/js/throttle.js';
import navigation from '@/components/navigation/navigation.vue';
import axios from 'axios';
import Vue from 'vue';
import cart from '@/components/shop/cart/cart';

export default {
    data() {
        return {
            restaurant: '', //餐馆数据
            logoUrl: logoUrl,
            isshow: false,
            filterData: 'default',
            rating: '' //店家评分
        }
    },
    components: {
        navigation,
        cart
    },
    computed: {
        //获取商品的id
        restaurantId() {
            return this.$route.params.id
        },
        //内部路由参数
        tab() {
            return this.$route.name
        }
    },
    created: function() {
        var url = '//mainsite-restapi.ele.me/shopping/restaurant/' + this.restaurantId + '?extras%5B%5D=activities&extras%5B%5D=license&extras%5B%5D=identification&//extras%5B%5D=albums&extras%5B%5D=flavors&latitude=30.18773&longitude=120.16047';
        axios.get(url).then((data) => {
            this.restaurant = data.data;
            //初始化localStorage
            localStorage.GEOHASH = "wtw364gu0gg";
            localStorage.MYFOOTPRINT = JSON.stringify([data.data]);
            localStorage.CURRENT_RESTAURANT_ID = this.$route.params.id;
            if (!localStorage.CART_MAP) {
                localStorage.CART_MAP = JSON.stringify({
                    [this.$route.params.id]: [{ "entities": [] }], "-1": [{ "entities": [] }] });
            } else if (!JSON.parse(localStorage.CART_MAP)[this.$route.params.id]) {
                var local = JSON.parse(localStorage.CART_MAP);
                local[this.$route.params.id] = [{ "entities": [] }];
                localStorage.CART_MAP = JSON.stringify(local);

            }
        })
        var ratingUrl = '//mainsite-restapi.ele.me/ugc/v1/restaurants/' + this.restaurantId + '/rating_scores?latitude=30.32347&longitude=120.17383'
        axios.get(ratingUrl).then((data) => {
            this.rating = data;
        })
    },
    methods: {
        //浮层展示
        shopguideshow() {
            this.isshow = true;
        },
        //浮层隐藏
        shopguidehide() {
            this.isshow = false
        },
        filter(type) {
            this.filterData = type
        },
        changeDisplayType(type) {
            console.log(type)
        }
    }
}

</script>
<style lang="scss">
.fade-enter-active,
.fade-leave-active {
    opacity: 1;
}

.fade-enter,
.fade-leave-to {
    opacity: 0
}

.shop {
    .shop-main {
        padding-top: 48px;
        background: url(./shop-bg.0391dd.jpg);
        .container {
            width: 1180px;
            height: 142px;
            display: table;
            box-sizing: border-box;
            position: relative;
            .shop-info {
                display: table-cell;
                vertical-align: middle;
                color: #FFFFFF;
                position: relative;
                z-index: 1;
                img {
                    margin-right: 15px;
                    width: 95px;
                    height: 95px;
                    border-radius: 50%;
                    vertical-align: middle;
                }
                .shop-info-wrapper {
                    display: inline-block;
                    vertical-align: middle;
                    h1 {
                        font-size: 20px;
                        max-width: 270px;
                    }
                    .shopguide-info-rate {
                        margin: 10px 0;
                    }
                }
                .shopguide-info-extra {
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: -1;
                    padding-top: 142px;
                    width: 100%;
                    overflow: hidden;
                    box-shadow: 0 0 10px 0 rgba(0, 0, 0, .1);
                    transition: all 0.4s ease;
                    background: rgba(255, 255, 255, .1);
                    ul {
                        padding: 0 20px;
                        background-color: #fff;
                        color: #333;
                        .shopguide-extra-item {
                            padding: 15px 0;
                            border-top: 1px dashed #eee;
                            color: #666;
                            p {
                                line-height: 2;
                            }
                            &.shopguide-extra-compete {
                                display: table;
                                width: 100%;
                                font-size: 12px;
                                &>div {
                                    position: relative;
                                    display: table-cell;
                                    text-align: center;
                                    vertical-align: middle;
                                    h2 {
                                        font-size: 28px;
                                        color: #f74342;
                                    }
                                }
                            }
                        }
                        li:last-child span {
                            color: #0089dc;
                            margin: 0 5px;
                        }
                    }
                }
            }
            .shopguide-server {
                width: 700px;
                display: table-cell;
                padding-right: 100px;
                vertical-align: middle;
                color: #fff;
                text-align: right;
                span {
                    display: inline-block;
                    vertical-align: top;
                    text-align: center;
                    margin-left: 80px;
                    .shopguide-server-value {
                        display: block;
                        margin-top: 12px;
                        margin-bottom: 3px;
                        font-size: 18px;
                    }
                }
            }
            .shopguide-favor {
                position: absolute;
                top: 0;
                right: 0;
                padding: 10px 5px;
                width: 80px;
                text-align: center;
                background: #FFF;
                background: rgba(255, 255, 255, .1);
                border-radius: 0 0 5px 5px;
                color: #eee;
                text-align: center;
                i {
                    font-size: 20px;
                }
                span {
                    display: block;
                }
            }
        }
    }
    .shopnav {
        background-color: #fff;
        .shoptype {
            width: 1180px;
            margin: 0 auto;
            position: relative;
            overflow: hidden;
            .shopnav-left {
                float: left;
                line-height: 57px;
                width: 75%;
                .shopnav-tab {
                    display: inline-block;
                    width: 112px;
                    color: #333;
                    font-size: 16px;
                    text-align: center;
                    position: relative;
                    line-height: 57px;
                    &+.shopnav-tab:before {
                        content: "";
                        position: absolute;
                        left: 0;
                        top: 50%;
                        margin-top: -7px;
                        height: 14px;
                        width: 1px;
                        background-color: #ccc;
                    }
                    &.active:after {
                        right: 0;
                        bottom: 0;
                        border-top: 3px solid;
                        content: "";
                        position: absolute;
                        left: 0;
                        color: #0089dc;
                    }
                }
                .shopnav-filter {
                    float: right;
                    font-size: 14px;
                    a {
                        padding: 0 15px;
                        color: #333;
                        line-height: 16px;
                        border-right: 1px solid #eee;
                    }
                    a:nth-child(4) {
                        border-right: none;
                    }
                    .shopnav-filter-display {
                        padding: 8px;
                        border: 1px solid #ddd;
                    }
                    .shopnav-filter-display:first-child {
                        margin-right: -5px;
                    }
                }
            }
            .shopnav-search {
                float: right;
                height: 32px;
                border: 1px solid #ccc;
                background: #fff;
                padding-right: 10px;
                margin: 10px 0;
                a {
                    font-size: 20px;
                }
                input {
                    width: 236px;
                    border: 0;
                    outline: 0;
                    transition: width .3s ease-in-out;
                    padding: 0 8px;
                    margin: 4px 0;
                    font-size: 14px;
                    line-height: 24px;
                }
            }
        }
    }
    .shop-product {
        .shopmain {
            width: 1180px;
            margin: 20px auto 0;
            overflow: hidden;
            .shopmain-right {
                float: right;
                width: 23.6%;
            }
        }
    }
}

</style>

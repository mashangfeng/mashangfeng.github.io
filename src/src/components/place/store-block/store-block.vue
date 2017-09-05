<!-- 每个商品信息的组件 -->
<template>
    <div class="store-block ">
        <div class="place-rstbox">
            <ul>
                <li v-for="restaurant in restaurants" @mouseenter="">
                    <router-link :to="'/shop/'+restaurant.id">
                        <div class="rstblock-logo">
                            <img class="rstblock-logo-icon" :src="logoUrl(restaurant.image_path)" alt="">
                            <span v-show="restaurant.order_lead_time">{{restaurant.order_lead_time}}分钟</span>
                        </div>
                        <div class="rstblock-content">
                            <p class="rstblock-title">{{restaurant.name}}</p>
                            <div class="starrating icon-star">
                                <span class="icon-star" :style="{width:restaurant.rating*20+'%'}"></span>
                            </div>
                            <span class="rstblock-monthsales">月售{{restaurant.recent_order_num}}单</span>
                            <p class="rstblock-cost">配送费￥{{restaurant.float_delivery_fee | cost}}</p>
                            <div>
                                <i v-for="support in restaurant.supports" :style="activity(support)">{{support.icon_name}}</i>
                            </div>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import { logoUrl } from '@/common/js/throttle.js'
export default {
    data() {
        return {
            restaurantsArr: [],
            logoUrl: logoUrl

        }
    },
    created() {
        this.$store.dispatch('getAjax', 0);
    },
    computed: {
        restaurants() {
            for (var i = 0; i < this.$store.state.restaurants.length; i++) {
                if (this.$store.state.restaurants.length == 1) {
                    this.restaurantsArr = [];
                }
                this.restaurantsArr = this.restaurantsArr.concat(this.$store.state.restaurants[i])
            }
            return this.restaurantsArr
        }
    },
    filters: {
        //过滤配送费
        cost(value) {
            if (value) {
                return parseInt(value)
            }
        }
    },
    methods: {
        activity(support) {
            if (support.id == 9) { //准
                return { 'background': '#E75959' }
            } else {
                return { 'background': '#fff', 'color': '#999999', 'border': '1px solid', 'padding': 0 }
            }
        }
    }
}

</script>
<style lang="scss">
.store-block {
    margin-top: 20px;
    .place-rstbox {
        border: 1px solid #e6e6e6;
        overflow: hidden;
        ul {
            li {
                width: 25%;
                float: left;
                height: 140px;
                border-bottom: 1px #f5f5f5 solid;
                background-color: white;
                &:hover {
                    background-color: #f5f5f5;
                }
                .rstblock-logo {
                    padding: 20px;
                    color: #999;
                    text-align: center;
                    float: left;
                    .rstblock-logo-icon {
                        display: block;
                        width: 70px;
                        height: 70px;
                        margin-bottom: 10px;
                    }
                }
                .rstblock-content {
                    padding: 20px;
                    font-size: 12px;
                    .rstblock-title {
                        font-size: 16px;
                        margin-bottom: 6px;
                        font-weight: 600;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        color: #333;
                    }
                    div {
                        i {
                            display: inline-block;
                            vertical-align: middle;
                            color: #fff;
                            font-style: normal;
                            font-size: 12px;
                            line-height: 16px;
                            overflow: hidden;
                            text-align: center;
                            width: 18px;
                            border-radius: 2px;
                            margin-right: 3px;
                            padding: 1px;
                            white-space: nowrap;
                        }
                    }
                }
            }
        }
    }
}

</style>

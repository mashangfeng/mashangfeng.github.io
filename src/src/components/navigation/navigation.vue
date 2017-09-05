<!-- 头部的组件，在place页面和shop页面都展示
     可以根据路由的this.$route.matched[0].path展示不同的样式
     接受一个props参数，有这个参数展示shop头部
 -->
<template>
    <div class="content" :class="{shop:type}">
        <div class="placeheader">
            <div class="left">
                <h1>
                     <a href="#" class="icon-logo"><span>饿了吗</span></a>
                 </h1>
                <ul>
                    <li><a href="" :class="{focus:this.$route.matched[0].path==='/place'}">首页</a></li>
                    <li><a href="">我的订单</a></li>
                    <li><a href="">加盟合作</a></li>
                </ul>
            </div>
            <div class="right">
                <ul>
                    <li><a href="" class="icon-service">服务中心</a></li>
                    <li><a href="">规划中心</a></li>
                    <li><a href="" class="icon-mobile">手机应用</a></li>
                </ul>
                <div class="login">
                    <span class="icon-profile">登录/注册</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['type']

}

</script>
<style lang="scss">
.content.shop {
    line-height: 48px;
    background-color: #000;
    background-color: rgba(0, 0, 0, .4);
    color: #fff;
    position: absolute;
    height: 48px;
    .placeheader {
        line-height: 48px;
        height: 48px;
    }
}

.content {
    width: 100%;
    background-color: #1e89e0;
    margin: 0 auto;
    .placeheader {
        width: 1180px;
        margin: 0 auto;
        line-height: 60px;
        height: 60px;
        .left {
            float: left;
            h1 {
                line-height: inherit;
                display: inline-block;
                margin-right: 30px;
                .icon-logo {
                    float: left;
                    line-height: inherit;
                    &:before {
                        color: #fff;
                        font-size: 32px;
                        vertical-align: top;
                    }
                    span {
                        display: block;
                        height: 0;
                        overflow: hidden;
                        text-indent: -900em;
                    }
                }
            }
            ul {
                display: inline-block;
                line-height: inherit;
                li {
                    float: left;
                    width: 112px;
                    text-align: center;
                    a {
                        color: white;
                        display: block;
                        height: 100%;
                        width: 100%;
                        &.focus {
                            background-color: #006bc7;
                        }
                    }
                }
            }
        }
        .right {
            float: right;
            line-height: inherit;
            width: 500px;
            ul {
                float: left;
                li {
                    float: left;
                    a {
                        color: #d2e7f9;
                        width: 106px;
                        line-height: inherit;
                        display: block;
                        padding: 0 10px;
                        text-align: center;
                        font-size: 14px;
                        &:before {
                            padding-right: 5px;
                            vertical-align: middle;
                            font-size: 22px;
                        }
                        &:hover {
                            color: white;
                        }
                    }
                }
            }
            .login {
                float: right;
                .icon-profile {
                    color: white;
                    &:before {
                        padding-right: 10px;
                        color: white;
                        font-size: 22px;
                        vertical-align: middle;
                    }
                }
            }
        }
    }
}

</style>

<!-- 搜索框的组件 -->
<template>
    <div class="search">
        <div class="location">
            <span>当前位置</span>
            <span class="location-current"><a href="">拱墅区杭州北部软件园杭州运河广告产业大厦</a></span>
            <span><router-link to="/home">[切换地址]</router-link></span>
        </div>
        <div class="place-search">
            <input type="text" placeholder="搜索商家,美食...">
            <a class="icon-search"></a>
        </div>
        <div class="place-tab">
            <img src="./takeout.408a87.png" alt="">
        </div>
    </div>
</template>
<script>
export default {}

</script>
<style lang="scss">
.search {
    position: relative;
    height: 103px;
    .location {
        position: absolute;
        top: 0;
        left: 0;
        .location-current {
            a {
                color: #333;
                &:hover {
                    color: #0089dc;
                }
            }
        }
    }
    .place-search {
        position: absolute;
        top: 15px;
        right: 0;
        height: 32px;
        border: 1px solid #ccc;
        background: #fff;
        padding-right: 10px;
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
    .place-tab {
        img {
            width: 186px;
            height: 55px;
            vertical-align: middle;
            position: absolute;
            top: 57px;
            right: 0;
            z-index: 10;
        }
    }
}

</style>
